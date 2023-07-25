import requests
import cv2
import numpy

class Url_Img:
    def __init__(self, url):
        self.url = url
    
    def url_convert(self):
        resp = requests.get(self.url, stream=True).raw
        img = numpy.asarray(bytearray(resp.read()), dtype="uint8")
        img = cv2.imdecode(img, cv2.IMREAD_COLOR)
        return img  