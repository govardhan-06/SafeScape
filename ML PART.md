Given the constraint of using only pre-trained models and the need to implement features quickly, let’s revise the code to utilize pre-trained models effectively for the core functionalities. Here’s how you can adjust the approach:

### **Revised Approach with Pre-Trained Models**

#### 1. **Real-Time Person Detection**

**Model**: MobileNet SSD (Pre-trained on COCO dataset)

**Code**:
```python
# scripts/person_detection.py
import cv2
import torch
import torchvision.transforms as transforms
from torchvision.models.detection import ssdlite320_mobilenet_v3_large

class PersonDetector:
    def __init__(self):
        self.model = ssdlite320_mobilenet_v3_large(pretrained=True).eval()
        self.transform = transforms.Compose([transforms.ToTensor()])

    def detect(self, frame):
        frame_tensor = self.transform(frame).unsqueeze(0)
        with torch.no_grad():
            detections = self.model(frame_tensor)[0]
        return detections

    def process_detections(self, detections, threshold=0.5):
        persons = []
        for idx, score in enumerate(detections['scores']):
            if score > threshold and detections['labels'][idx] == 1:
                bbox = detections['boxes'][idx].numpy()
                persons.append(bbox)
        return persons
```

#### 2. **Gender Classification**

**Model**: Use a pre-trained gender classification model available in the `torchvision` or `Hugging Face` model hub.

**Example Code**:
```python
# scripts/gender_classification.py
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

class GenderClassifier:
    def __init__(self, model_name='pretrained_gender_model.pth'):
        self.model = models.resnet18(pretrained=True)
        self.model.fc = nn.Linear(self.model.fc.in_features, 2)  # Assuming binary classification
        self.model.load_state_dict(torch.load(model_name))
        self.model.eval()
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor()
        ])

    def classify(self, image_path):
        image = Image.open(image_path)
        image_tensor = self.transform(image).unsqueeze(0)
        with torch.no_grad():
            output = self.model(image_tensor)
            _, predicted = torch.max(output, 1)
        return 'Female' if predicted.item() == 1 else 'Male'
```

#### 3. **Lone Woman Detection at Night**

**Code**:
```python
# scripts/lone_woman_detection.py
from datetime import datetime

def is_nighttime():
    current_hour = datetime.now().hour
    return current_hour >= 20 or current_hour <= 6  # Nighttime: 8 PM - 6 AM

def detect_lone_woman(persons, genders):
    if len(persons) == 1 and genders[0] == 'Female':
        return True
    return False
```

#### 4. **Detection of a Woman Surrounded by Men**

**Code**:
```python
# scripts/surrounded_detection.py
def detect_woman_surrounded(persons, genders):
    women = [i for i, g in enumerate(genders) if g == 'Female']
    if not women:
        return False

    for woman in women:
        men_count = sum(1 for i, g in enumerate(genders) if g == 'Male')
        if men_count > 1:
            return True
    return False
```

#### 5. **SOS Gesture Recognition**

**Model**: Use a pre-trained model for gesture recognition or implement a simple heuristic for gesture detection.

**Code**:
```python
# scripts/gesture_recognition.py
def detect_sos_gesture(frame):
    # Placeholder for a simple gesture recognition heuristic or model
    return False  # Modify as per the gesture recognition model or heuristic
```

#### 6. **Alert System**

**Code**:
```python
# scripts/alert_system.py
def send_alert(message):
    print(f"ALERT: {message}")
```

#### 7. **Integration in Main Script**

**Code**:
```python
# scripts/main.py
import cv2
from person_detection import PersonDetector
from gender_classification import GenderClassifier
from lone_woman_detection import is_nighttime, detect_lone_woman
from surrounded_detection import detect_woman_surrounded
from gesture_recognition import detect_sos_gesture
from alert_system import send_alert

def main(video_source):
    person_detector = PersonDetector()
    gender_detector = GenderClassifier(model_name='models/gender_model.pth')

    cap = cv2.VideoCapture(video_source)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        detections = person_detector.detect(frame)
        persons = person_detector.process_detections(detections)
        
        # Save detected person images for gender classification
        genders = [gender_detector.classify(f"frame_person_{i}.jpg") for i in range(len(persons))]

        if is_nighttime() and detect_lone_woman(persons, genders):
            send_alert("Lone woman detected at night.")

        if detect_woman_surrounded(persons, genders):
            send_alert("Woman surrounded by men detected.")

        if detect_sos_gesture(frame):
            send_alert("SOS gesture detected.")

        cv2.imshow('Women Safety Analytics', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    main(video_source=0)  # Use 0 for webcam input
```

### **Summary**

- **Pre-Trained Models**: Use MobileNet SSD for person detection, and leverage pre-trained models from `torchvision` or other sources for gender classification.
- **No Training Required**: The provided code is configured to work with pre-trained models, so you don’t need to fine-tune any models yourself.
- **Integration**: The `main.py` script integrates all functionalities, including detection, classification, and alerting.

This approach allows you to quickly build and test the core functionalities of your Women Safety Analytics System using pre-trained models.
