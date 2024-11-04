import cv2
import mediapipe as mp
import time

class GestureDetection:
    def __init__(self):
        # Initialize MediaPipe Hands model
        self.mp_hands = mp.solutions.hands
        self.mp_drawing = mp.solutions.drawing_utils
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=1,
            min_detection_confidence=0.7,
            min_tracking_confidence=0.7
        )
    
    # Function to handle alerts
    def send_alert_to_emergency_services(self):
        print("Alert: Emergency services contacted!")

    # Function to detect SOS gesture
    def detect_sos_gesture(self,landmarks, state, time_in_state):
        # Define key landmarks for simplicity
        thumb_tip = landmarks[4]
        index_tip = landmarks[8]
        middle_tip = landmarks[12]
        ring_tip = landmarks[16]
        pinky_tip = landmarks[20]
        thumb_ip = landmarks[3]  # Thumb interphalangeal joint

        # Open palm: all fingers extended
        is_open_palm = (index_tip.y < landmarks[6].y and
                        middle_tip.y < landmarks[10].y and
                        ring_tip.y < landmarks[14].y and
                        pinky_tip.y < landmarks[18].y and
                        thumb_tip.x > thumb_ip.x)

        # Fist: all fingers closed over thumb
        is_fist = (index_tip.y > landmarks[6].y and
                middle_tip.y > landmarks[10].y and
                ring_tip.y > landmarks[14].y and
                pinky_tip.y > landmarks[18].y)

        # State transitions with time consistency
        current_time = time.time()
        if state == 0 and is_open_palm:
            print("Step 1: Open palm detected.")
            return 1, current_time  # Move to next step
        elif state == 1 and (current_time - time_in_state > 0.5):
            print("Step 2: Waiting for thumb tucked.")
            return 2, current_time  # Move to next step
        elif state == 2 and is_fist and (current_time - time_in_state > 0.5):
            print("Step 3: Fist made detected.")
            return 3, current_time  # Full SOS gesture recognized

        return state, time_in_state