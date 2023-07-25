from PIL import Image
from noise import pnoise2
import numpy

class BackgroundNoise:
    def __init__(self, dimensions, levels):
        self.dimensions = dimensions
        self.levels = levels
    
    def background_noise(self):
        texture = numpy.empty([self.dimensions[1], self.dimensions[0]])
        frequency = 16.0 * self.levels

        for i in range(self.dimensions[1]):
            for j in range(self.dimensions[0]):
                dark = int(pnoise2(i / frequency, j / frequency, self.levels) * 127.0 + 128.0)
                texture[i][j] = dark
        
        return Image.fromarray(texture).convert("RGB")