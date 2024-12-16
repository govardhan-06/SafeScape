import cv2
import sys
import time
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

# Initialize the components and log their creation
logging.info("Initializing components...")
try:
    tracker = CentroidTracker()
    logging.info("CentroidTracker initialized.")
    gender_classifier = GenderClassifier()
    logging.info("GenderClassifier initialized.")
    person_detector = PersonDetection()
    logging.info("PersonDetection initialized.")
    gesture_detector = GestureDetection()
    logging.info("GestureDetection initialized.")
    supabase = Supabase()
    logging.info("Supabase initialized.")
except Exception as e:
    logging.error(f"Error during initialization: {e}")
    sys.exit(1)

# Sets to track unique male and female counts
unique_males = set()
unique_females = set()

# Global variables for gesture detection
gesture_state = 0
state_time = time.time()

# Function to detect and process frames
def process_frame(frame):
    logging.info("Processing frame started.")
    
    try:
        # Convert frame to tensor and detect persons
        image = transforms.ToTensor()(frame)
        logging.info("Frame converted to tensor.")

        # Hand gesture detection logic
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = gesture_detector.hands.process(rgb_frame)
        
        global gesture_state, state_time

        if result.multi_hand_landmarks:
            for hand_landmarks in result.multi_hand_landmarks:
                logging.info("Hand landmarks detected.")
                gesture_detector.mp_drawing.draw_landmarks(
                    frame, hand_landmarks, gesture_detector.mp_hands.HAND_CONNECTIONS,
                    gesture_detector.mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
                    gesture_detector.mp_drawing.DrawingSpec(color=(255, 0, 0), thickness=2)
                )

                landmarks = hand_landmarks.landmark

                try:
                    gesture_state, state_time = gesture_detector.detect_sos_gesture(landmarks, gesture_state, state_time)
                    if gesture_state == 3:
                        logging.info("SOS gesture detected. Alerting emergency services.")
                        gesture_detector.send_alert_to_emergency_services()
                except Exception as e:
                    logging.error(f"Error during gesture detection: {e}")
        
        detections = person_detector.detect_person(image)
        logging.info(f"Detections obtained: {len(detections['boxes'])} boxes found.")

        centroids = []
        genders = []
        current_male_count = 0
        current_female_count = 0

        for i, box in enumerate(detections['boxes']):
            if detections['labels'][i] == 1 and detections['scores'][i] > 0.8:
                xmin, ymin, xmax, ymax = map(int, box)
                logging.info(f"Processing box coordinates: {xmin, ymin, xmax, ymax}")

                cropped_image = transforms.ToPILImage()(image[:, ymin:ymax, xmin:xmax])
                logging.info("Cropped image prepared for gender classification.")
                
                gender = gender_classifier.gender_classifier_predict(cropped_image)
                logging.info(f"Gender predicted: {gender}")

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

        logging.info(f"Current male count: {current_male_count}, Current female count: {current_female_count}")

        logging.info("Frame processing completed successfully.")
        
    except Exception as e:
        logging.error(f"Error during frame processing: {e}")

# Main function for video processing
def main():
    logging.info("Starting video processing.")
    cap = cv2.VideoCapture('F:/SafeScape/diya_sos.mp4')
    
    if not cap.isOpened():
        logging.error("Error opening video file.")
        return

    frame_skip = 1
    frame_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            logging.info("End of video stream or frame could not be read.")
            break

        # Check if the frame is valid
        if frame is None or frame.shape[0] == 0 or frame.shape[1] == 0:
            logging.warning("Invalid frame dimensions encountered. Skipping frame.")
            continue

        if frame_count % frame_skip == 0:
            processed_frame = process_frame(frame)

            # Ensure the processed frame is valid before displaying
            if processed_frame is not None and processed_frame.shape[0] > 0 and processed_frame.shape[1] > 0:
                cv2.imshow("Processed Frame", processed_frame)
            else:
                logging.warning("Processed frame has invalid dimensions. Skipping display.")

        frame_count += 1

        if cv2.waitKey(1) & 0xFF == ord('q'):
            logging.info("Video processing interrupted by user.")
            break

    cap.release()
    cv2.destroyAllWindows()
    logging.info("Video processing finished.")


if __name__ == "__main__":
    try:
        sys.excepthook = sys.__excepthook__
        main()
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        import traceback
        traceback.print_exc()
