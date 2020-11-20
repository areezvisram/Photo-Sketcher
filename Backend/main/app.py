from flask import Flask, request, jsonify
from main.url_img import Url_Img
from main.url_image import Url_Image
from PIL import Image
from main.drawing import Drawing
from main.background_noise import BackgroundNoise
from main.outline import Outline
import cv2
import numpy
import requests
import cloudinary
from cloudinary import uploader
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def home():
    return "Home Page"

@app.route('/addPhoto', methods=['POST'])
@cross_origin()
def addPhoto():
    url = request.json.get('url')
    url_img = Url_Img(url).url_convert()
    url_image = Url_Image(url).url_convert2()

    drawing = Drawing(url_img).drawing()
    cv2.imwrite("cloudinary2.png", drawing)

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
    cv2.imwrite("cloudinary1.png", drawingColor)

       
    cloudinary_url = cloudinary.uploader.unsigned_upload("cloudinary1.png", "ml_default", cloud_name="dmlnk1kus")['url']
    cloudinary_download = cloudinary_url.split("/upload")
    download_link = cloudinary_download[0] + "/upload/fl_attachment:sketch1" + cloudinary_download[1]
    
    cloudinary_url2 = cloudinary.uploader.unsigned_upload("cloudinary2.png", "ml_default", cloud_name="dmlnk1kus")['url']
    cloudinary_download2 = cloudinary_url2.split("/upload")
    download_link2 = cloudinary_download2[0] + "/upload/fl_attachment:sketch2" + cloudinary_download[1]

    response = {'status': 1, 'sketch_url': cloudinary_url, 'download_url': download_link, 'sketch2_url': cloudinary_url2, 'download_url2': download_link2 }
    return jsonify(response)