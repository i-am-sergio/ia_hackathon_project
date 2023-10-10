from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename
import os
import numpy as np
import tensorflow as tf
from keras.preprocessing import image
from PIL import Image
from flask_cors import CORS,cross_origin

app = Flask(__name__)
# CORS(app, resources={r"/upload": {"origins": "http://localhost:5173"}})
# CORS(app, resources={r"/upload": {"origins": "*"}})
# CORS(app)
CORS(app, resources={r"/upload": {"origins": "http://localhost:5173"}})

app.config["UPLOAD_FOLDER"] = "uploads"
ALLOWED_EXTENSIONS = set(["png","jpg","jpeg"])

@cross_origin()
@app.route("/ping")
def ping():
    algo = "algoooo"
    return jsonify({"message": algo})


def hacer_prediccion(model,test_image):
    result = model.predict(test_image)
    messaje = ''

    flower_categories = ['aster', 'daffodil', 'dahlia', 'daisy', 'dandelion', 'iris', 'orchid', 'rose', 'sunflower', 'tulip']
    
    if result[0][0] >= 0.5:
        messaje += flower_categories[0]
    elif result[0][1] >= 0.5:
        messaje += flower_categories[1]
    elif result[0][2] >= 0.5:
        messaje += flower_categories[2]
    elif result[0][3] >= 0.5:
        messaje += flower_categories[3]
    elif result[0][4] >= 0.5:
        messaje += flower_categories[4]
    elif result[0][5] >= 0.5:
        messaje += flower_categories[5]
    elif result[0][6] >= 0.5:
        messaje += flower_categories[6]
    elif result[0][7] >= 0.5:
        messaje += flower_categories[7]
    elif result[0][8] >= 0.5:
        messaje += flower_categories[8]
    elif result[0][9] >= 0.5:
        messaje += flower_categories[9]
    else:
        messaje = "noprediction"

    return messaje


@app.route("/upload", methods=["POST"])
@cross_origin()
def upload_image():
    # if "photo" not in request.files:
    #     return jsonify({"error": "No se recibió ninguna imagen en la solicitud"}), 400
    print("xxxxxxxxxxxxxxxxxxxxxxxxxx\n",request.files)
    file = request.files["photo"]
    filename = secure_filename(file.filename)
    print(file,file.filename)
    file.save(os.path.join(app.config["UPLOAD_FOLDER"],filename))
    # Load the saved model
    flower_categories = ['aster', 'daffodil', 'dahlia', 'daisy', 'dandelion', 'iris', 'orchid', 'rose', 'sunflower', 'tulip']
    model = tf.keras.models.load_model('flowers.h5')
    img_dir = os.path.join(app.config["UPLOAD_FOLDER"],filename)
    test_image = Image.open(img_dir).convert("RGB")
    test_image = test_image.resize((224, 224))  # Resize to match the model's input size
    test_image = np.array(test_image)
    test_image = test_image / 255.0  # Normalize the pixel values to be in the range [0, 1]
    test_image = np.expand_dims(test_image, axis=0)
    #return jsonify({"message": "LLegoooo"})
    result = hacer_prediccion(model,test_image)
    print("----------->",result)
    return jsonify({"message": result})

if __name__ == "__main__":
    app.run(debug=True, port=5000)

