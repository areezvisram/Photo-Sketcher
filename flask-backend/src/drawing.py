import cv2

class Drawing:
    def __init__(self, image):
        self.img = image
    
    def drawing(self):
        gray = cv2.cvtColor(self.img, cv2.COLOR_BGR2GRAY)
        inverse = 255 - gray
        blur = cv2.GaussianBlur(inverse, (13,13), 0)
        return cv2.divide(gray, 255-blur, scale=256)