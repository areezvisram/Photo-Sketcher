from flask import Flask, request, jsonify
from url_img import Url_Img
from url_image import Url_Image
from PIL import Image
from drawing import Drawing
from background_noise import BackgroundNoise
from outline import Outline
import cv2
import numpy

app = Flask(__name__)

@app.route('/')
def home():
    return "Home Page"

@app.route('/addPhoto', methods=['POST'])
def addPhoto():
    url = request.json.get('url')
    url_img = Url_Img(url).url_convert()
    url_image = Url_Image(url).url_convert2()

    drawing = Drawing(url_img).drawing()
    
    background = BackgroundNoise(url_image.size, levels=6).background_noise()

    outline = Outline(url_img).outline()

    mask = outline[3]
    drawing = cv2.bitwise_and(drawing, outline, outline)
    (threshold, drawing) = cv2.threshold(drawing, 240, 255, cv2.THRESH_BINARY)
    height, width = drawing.shape[:2]
    mask = numpy.zeros((height+2, width+2), numpy.uint8)
    drawingColor = cv2.cvtColor(drawing, cv2.COLOR_GRAY2RGBA)
    white = numpy.all(drawingColor == [255, 255, 255, 255], axis=-1)
    drawingColor[white, -1] = 0
    final = Image.fromarray(drawingColor)
    final.show()

    response = {'status': 1}
    return jsonify(response)