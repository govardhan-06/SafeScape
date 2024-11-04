import torch
from torchvision.models.detection import fasterrcnn_resnet50_fpn
from torchvision.models import resnet18
import torch.nn as nn
from torchvision.transforms.functional import to_pil_image
import cv2
from collections import defaultdict
import numpy as np
from torchvision import transforms
from scipy.spatial import distance as dist
from PIL import Image

class PersonDetection:
    def __init__(self):
        # Load pre-trained Person Detection Model
        self.person_detector = fasterrcnn_resnet50_fpn(pretrained=True)
        self.person_detector.eval()

        # Define image transformations
        self.person_detector_transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])
    
    # Function to perform person detection
    def detect_person(self,image):
        with torch.no_grad():
            predictions = self.person_detector([image])
        return predictions[0]


class CentroidTracker:
    def __init__(self):
        self.next_object_id = 0
        self.objects = {}
        self.disappeared = defaultdict(int)

    def register(self, centroid, gender):
        self.objects[self.next_object_id] = (centroid, gender)
        self.next_object_id += 1

    def update(self, centroids, genders):
        if not centroids:
            return self.objects

        if len(self.objects) == 0:
            for i, centroid in enumerate(centroids):
                self.register(centroid, genders[i])
        else:
            object_ids = list(self.objects.keys())
            object_centroids = [self.objects[obj_id][0] for obj_id in object_ids]
            D = dist.cdist(np.array(object_centroids), centroids)
            rows = D.min(axis=1).argsort()
            cols = D.argmin(axis=1)[rows]

            used_rows, used_cols = set(), set()
            for row, col in zip(rows, cols):
                if row in used_rows or col in used_cols:
                    continue
                obj_id = object_ids[row]
                self.objects[obj_id] = (centroids[col], genders[col])
                used_rows.add(row)
                used_cols.add(col)

            for col in set(range(len(centroids))) - used_cols:
                self.register(centroids[col], genders[col])

        return self.objects
