import torch
import torch.nn as nn
from torchvision.transforms.functional import to_pil_image
import cv2
from torchvision import transforms
from PIL import Image
from src.gender_classifier.model import InceptionNet

class GenderClassifier:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        # Load the pretrained model
        self.gender_classifier = InceptionNet(num_classes=35)  # num_classes should match the PETA dataset
        checkpoint = torch.load('./src/gender_classifier/peta_epoch_31.pth.tar', map_location=self.device)  # Load to GPU if available

        # Modify the keys in the checkpoint to remove the 'module.' prefix
        new_state_dict = {key.replace("module.", ""): value for key, value in checkpoint['state_dict'].items()}

        # Load the modified state_dict into the model
        self.gender_classifier.load_state_dict(new_state_dict)
        self.gender_classifier.to(self.device)  # Move the model to the GPU

        self.gender_classifier.eval()  # Set the model to evaluation mode

        # Define the transformations as per the training setup
        self.gender_classifier_transform = transforms.Compose([
            transforms.Resize(size=(256, 128)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
    
    def gender_classifier_predict(self,image):
        """
        Perform inference on a single image and print results.
        :param image_path: Path to the image file
        """
        input_batch = self.gender_classifier_transform(image).unsqueeze(0).to(self.device)  # Move input to GPU

        # Perform inference
        with torch.no_grad():  # Disable gradient calculation for inference
            output = self.gender_classifier(input_batch)

        # Convert output to probabilities if needed
        probabilities = torch.sigmoid(output[0]).squeeze().cpu().numpy()  # Assuming multi-label classification

        # Get attribute names based on PETA dataset
        peta_attributes = [
            'Age16-30', 'Age31-45', 'Age46-60', 'AgeAbove61', 'Backpack', 'CarryingOther',
            'Casual lower', 'Casual upper', 'Formal lower', 'Formal upper', 'Hat', 'Jacket',
            'Jeans', 'Leather Shoes', 'Logo', 'Long hair', 'Male', 'Messenger Bag', 'Muffler',
            'No accessory', 'No carrying', 'Plaid', 'PlasticBags', 'Sandals', 'Shoes', 'Shorts',
            'Short Sleeve', 'Skirt', 'Sneaker', 'Stripes', 'Sunglasses', 'Trousers', 'Tshirt',
            'UpperOther', 'V-Neck'
        ]

        # Print out the predictions
        threshold = 0.5  # Adjust threshold if needed
        predicted_attributes = [peta_attributes[i] for i, prob in enumerate(probabilities) if prob > threshold]

        # print("Predicted Attributes: ",predicted_attributes)
        if "Male" in predicted_attributes:
            return "Male"
        else:
            return "Female"
