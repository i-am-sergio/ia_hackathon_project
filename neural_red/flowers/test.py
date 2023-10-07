import numpy as np
import tensorflow as tf
from keras.preprocessing import image
from PIL import Image

# Flower categories
flower_categories = ['aster', 'daffodil', 'dahlia', 'daisy', 'dandelion', 'iris', 'orchid', 'rose', 'sunflower', 'tulip']

# Load the saved model
model = tf.keras.models.load_model('./flowers.h5')

img_dir = "./Original/sunflower/10862313945_e8ed9202d9_m.jpg"
test_image = Image.open(img_dir)
test_image = test_image.resize((224, 224))  # Resize to match the model's input size
test_image = np.array(test_image)
test_image = test_image / 255.0  # Normalize the pixel values to be in the range [0, 1]

test_image = np.expand_dims(test_image, axis=0)

result = model.predict(test_image)
messaje = '*** The Flower is an'
print(result)
if result[0][0] >= 0.5:
    print(messaje, flower_categories[0])
elif result[0][1] >= 0.5:
    print(messaje, flower_categories[1])
elif result[0][2] >= 0.5:
    print(messaje, flower_categories[2])
elif result[0][3] >= 0.5:
    print(messaje, flower_categories[3])
elif result[0][4] >= 0.5:
    print(messaje, flower_categories[4])
elif result[0][5] >= 0.5:
    print(messaje, flower_categories[5])
elif result[0][6] >= 0.5:
    print(messaje, flower_categories[6])
elif result[0][7] >= 0.5:
    print(messaje, flower_categories[7])
elif result[0][8] >= 0.5:
    print(messaje, flower_categories[8])
elif result[0][9] >= 0.5:
    print(messaje, flower_categories[9])
