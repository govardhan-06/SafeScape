import cv2
import sys
import time
import torch
from torchvision.models.detection import fasterrcnn_resnet50_fpn
from torchvision.models import resnet18
import torch.nn as nn
from torchvision.transforms.functional import to_pil_image
import mediapipe as mp
import numpy as np
from scipy.spatial import distance as dist
from collections import defaultdict
from torchvision import transforms
from PIL import Image
from src.scripts.person_detection import PersonDetection, CentroidTracker
from src.scripts.gender_classification import GenderClassifier
from src.scripts.gesture_detection import GestureDetection
from src.supabase_config import Supabase
from src.utils.logger import logging

tracker = CentroidTracker()
gender_classifier=GenderClassifier()
person_detector=PersonDetection()
gesture_detector=GestureDetection()
supabase=Supabase()

# Sets to track unique male and female counts
unique_males = set()
unique_females = set()

# Global variables for gesture detection
gesture_state = 0
state_time = time.time()

# Function to detect and process frames
def process_frame(frame):
    # Convert frame to tensor and detect persons (replace detect_person with your model's detection logic)
    image = transforms.ToTensor()(frame)
    detections = person_detector.detect_person(image)

    centroids = []
    genders = []
    current_male_count = 0
    current_female_count = 0

    for i, box in enumerate(detections['boxes']):
        if detections['labels'][i] == 1 and detections['scores'][i] > 0.8:
            xmin, ymin, xmax, ymax = map(int, box)
            cropped_image = transforms.ToPILImage()(image[:, ymin:ymax, xmin:xmax])
            gender = gender_classifier.gender_classifier_predict(cropped_image)
            centroid = ((xmin + xmax) // 2, (ymin + ymax) // 2)
            centroids.append(centroid)
            genders.append(gender)

            if gender == "Male":
                current_male_count += 1
            else:
                current_female_count += 1

            color = (0, 255, 0) if gender == "Male" else (0, 0, 255)
            cv2.rectangle(frame, (xmin, ymin), (xmax, ymax), color, 2)
            cv2.putText(frame, gender, (xmin, ymin - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

    # Hand gesture detection logic
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = gesture_detector.hands.process(rgb_frame)

    global gesture_state, state_time

    if result.multi_hand_landmarks:
        for hand_landmarks in result.multi_hand_landmarks:
            gesture_detector.mp_drawing.draw_landmarks(
                frame, hand_landmarks, gesture_detector.mp_hands.HAND_CONNECTIONS,
                gesture_detector.mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
                gesture_detector.mp_drawing.DrawingSpec(color=(255, 0, 0), thickness=2)
            )

            landmarks = hand_landmarks.landmark

            # Detect SOS gesture for any person
            gesture_state, state_time = gesture_detector.detect_sos_gesture(landmarks, gesture_state, state_time)

            if gesture_state == 3:
                gesture_detector.send_alert_to_emergency_services()
                data={
                    'intensity': 'high',
                    'location': 'xyz',
                    'type': 'sos signal detected'
                }
                supabase.insert_alert_data(data)
                print("SOS signal detected")
                logging.info("SOS signal detected")
                gesture_state = 0

    # Update tracker with new centroids and genders
    tracked_objects = tracker.update(centroids, genders)

    # Update unique male and female counts
    for obj_id, (centroid, gender) in tracked_objects.items():
        if gender == "Male":
            unique_males.add(obj_id)
        else:
            unique_females.add(obj_id)

    # Display unique counts
    cv2.putText(frame, f"Unique Males: {len(unique_males)}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
    cv2.putText(frame, f"Unique Females: {len(unique_females)}", (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
    cv2.putText(frame, f"Current Males: {current_male_count}", (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)
    cv2.putText(frame, f"Current Females: {current_female_count}", (10, 120), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

    # Lone woman detection logic
    lone_woman_detected = False
    females = [c for i, c in enumerate(centroids) if genders[i] == "Female"]

    for f in females:
        if all(np.linalg.norm(np.array(f) - np.array(c)) > 100 for c in centroids if c != f):
            lone_woman_detected = True
            break

    if lone_woman_detected:
        text = "Lone Woman Detected"
        cv2.putText(frame, text, (frame.shape[1] - 300, frame.shape[0] - 20), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    woman_surrounded_by_men_detected = False
    for f in females:
        males = [c for i, c in enumerate(centroids) if genders[i] == "Male"]
        if all(np.linalg.norm(np.array(f) - np.array(m)) < 100 for m in males):
            woman_surrounded_by_men_detected = True
            break

    if woman_surrounded_by_men_detected:
        text = "Woman Surrounded by Men"
        cv2.putText(frame, text, (10, frame.shape[0] - 20), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)

    return frame

# Main function for video processing
def main():
    cap = cv2.VideoCapture('F:/SafeScape/diya_sos.mp4')
    frame_skip = 1
    frame_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % frame_skip == 0:
            processed_frame = process_frame(frame)
            cv2.imshow(processed_frame)

        frame_count += 1

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    try:
        sys.excepthook = sys.__excepthook__
        # Call your main processing function here
        main()  # Replace with the actual function you're calling
    except Exception as e:
        import traceback
        print("An error occurred:", e)
        traceback.print_exc()
