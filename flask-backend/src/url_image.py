import io
from PIL import Image
from urllib.request import urlopen

class Url_Image:
    def __init__(self, url):
        self.url = url
    
    def url_convert2(self):
        resp = urlopen(self.url)
        image_file = io.BytesIO(resp.read())
        image = Image.open(image_file)
        return image