import numpy
import cv2

class Outline:
    def __init__(self, image):
        self.img = image

        self.gray = cv2.cvtColor(self.img, cv2.COLOR_BGR2GRAY)

        self.kernel = numpy.ones((2,2), numpy.uint8)
    
    def outline(self):
        outline = cv2.Canny(self.gray, 200, 300)

        dilate = cv2.dilate(outline, self.kernel, iterations=1)

        gray_image = 255 - dilate

        return gray_image