const { Router } = require("express");
const UsuariosModel = require("./models/usuario");
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require("uuid")
const path = require('path');
const tf = require('@tensorflow/tfjs');


const router = Router();
// Configurar multer para manejar el almacenamiento de archivos
const storage = multer.memoryStorage(); // Almacenar el archivo en la memoria
const upload = multer({ storage: storage });


router.get("/login", () => {
  console.log("/login endpoint");
  console.log(path.join(__dirname, 'modelflowers'));
});
router.get("/collections/:id", () => {
  console.log("/collections/:id endpoint");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, gender } = req.body;
    const newUsuario = await UsuariosModel({
      username,
      email,
      password,
      firstName,
      lastName,
      gender,
    });

    // codigo para insertar en usuario en mongodb
    // ...

    console.log("Usuario registrado con éxito:", newUsuario);
    res.sendStatus(201);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error.message });
  }
});


// Ruta para manejar las solicitudes POST con imágenes
router.post('/upload', upload.single('photo'), async (req, res) => {
  const photo = req.file;

  // Verificar si se recibió una imagen
  if (!photo) {
    return res.status(400).send('No se recibió ninguna imagen');
  }

  // Generar un ID único para el nombre del archivo
  const fileId = uuidv4();

  // Realizar el procesamiento necesario con la imagen
  const imageName = `${fileId}_captured_photo.png`;
  const imagePath = path.join(__dirname, 'uploads', imageName);

  // Guardar la imagen en el servidor
  // await fs.writeFile(imagePath, photo.buffer);

  // Guardar la imagen en el servidor
  fs.writeFile(imagePath, photo.buffer, async (err) => {
    if (err) {
      console.error('Error al guardar la imagen:', err);
      return res.status(500).send('Error interno al guardar la imagen');
    }

    console.log('Imagen guardada con éxito:', imagePath);

    
  });

  const modelPath = path.join(__dirname, 'modelflowers', 'model.json');
  const modelJson = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
  const model = await tf.loadLayersModel(tf.io.fromMemorySync(modelJson));

  // Leer la imagen desde el archivo
  // const imgBuffer = await fs.readFile(imagePath);
  // const img = tf.node.decodeImage(imgBuffer);
  
  // // Redimensionar y preprocesar la imagen
  // const resizedImg = tf.image.resizeBilinear(img, [224, 224]).toFloat();
  // const normalizedImg = resizedImg.div(tf.scalar(255));
  // const preprocessedImg = normalizedImg.expandDims();

  // const predictions = await model.predict(preprocessedImg).data();
  // const predictedClass = predictions.indexOf(Math.max(...predictions));

  // console.log({ prediction: flowerCategories[predictedClass] });

  res.send('Imagen recibida y procesada con éxito');


});


module.exports = router;
