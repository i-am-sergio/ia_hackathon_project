const { Router } = require("express");
const UsuariosModel = require("./models/usuario");
const PhotosModel = require("./models/photo");
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require("uuid")
const path = require('path');

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UsuariosModel.findOne({ email }).exec();
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }
    res.json({ message: 'Inicio de sesión exitoso', userName: user.username, userEmail: user.email });
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    res.status(500).json({ message: 'Error interno' });
  }
});

router.get("/collections/:id", () => {
  console.log("/collections/:id endpoint");
});

router.post("/check_email", async (req, res) => {
  UsuariosModel.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({ error: "El correo ya tiene una cuenta existente." });
      }
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Error al verificar el correo electrónico:", error);
      res.status(500).json({ error: "Error interno del servidor", details: error.message });
    });
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, gender } = req.body;
    const newUsuario = await UsuariosModel.create({
      username,
      email,
      password,
      firstName,
      lastName,
      gender,
    });
    res.status(201).json(newUsuario);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
});



router.post('/upload', upload.single('photo'), (req, res) => {
  const { username, email, lugar, time, clima, predict } = req.body;
  const photo = req.file;
  if (!photo) {
    return res.status(400).send('No se recibió ninguna imagen');
  }
  const fileId = uuidv4();
  const imageName = `${fileId}_captured_photo.png`;
  const imagePath = path.join(__dirname, 'uploads', imageName);
  fs.writeFile(imagePath, photo.buffer, async (err) => {
    if (err) {
      console.error('Error al guardar la imagen:', err);
      return res.status(500).send('Error interno al guardar la imagen');
    }
    try {
      const newPhoto = new PhotosModel({
        username,
        email,
        predict,
        image: `/${fileId}_captured_photo.png`,
        lugar,
        time,
        clima,
      });
      newPhoto.save()
        .then(() => {
          res.json({
            laprediccion: predict,
          });
        })
        .catch((error) => {
          console.error('Error al crear y guardar el documento de PhotosModel:', error);
          res.status(500).send('Error interno al crear y guardar el documento de PhotosModel');
        });
    } catch (error) {
      console.error('Error al crear y guardar el documento de PhotosModel:', error);
      res.status(500).send('Error interno al crear y guardar el documento de PhotosModel');
    }
  });
});


router.get('/api/images', async (req, res) => {
  try {
    const { userName, userEmail } = req.query;
    const images = await PhotosModel.find({ username: userName, email: userEmail }).exec();
    res.json(images);
  } catch (error) {
    console.error('Error al obtener las imágenes:', error);
    res.status(500).send('Error interno al obtener las imágenes');
  }
});

router.get('/api/getImageData', async (req, res) => {
  try {
    const { imageUrl, imageName } = req.query;
    const images = await PhotosModel.findOne({ image: imageUrl, predict: imageName }).exec();
    res.json(images);
  } catch (error) {
    console.error('Error al obtener las imágenes:', error);
    res.status(500).send('Error interno al obtener las imágenes');
  }
});

module.exports = router;