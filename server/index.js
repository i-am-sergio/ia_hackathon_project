const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require("uuid")
// const connectDB = require("./data"); 
const UsuariosModel = require('./models/usuario')

const app = express();
const puerto = 3000; // Puedes cambiar el número de puerto según tus preferencias

// Configurar multer para manejar el almacenamiento de archivos
const storage = multer.memoryStorage(); // Almacenar el archivo en la memoria
const upload = multer({ storage: storage });

const allowedOrigins = [
  'https://4755h63w-5173.brs.devtunnels.ms',
  'https://0qh1s63v-5173.brs.devtunnels.ms',
  'https://4755h63w-3000.brs.devtunnels.ms',
  'http://localhost:5173',
  ''
];


const corsOptions = {
  origin: '*', // dominios como ['http://example.com', 'https://example2.com']
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());

// Configuración para servir archivos estáticos (como tu archivo HTML)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/model', express.static(path.join(__dirname, 'model')));
app.use('/modelflowers', express.static(path.join(__dirname, 'modelflowers')));

// Ruta para manejar solicitudes GET a la raíz y enviar el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Ruta para manejar las solicitudes POST con imágenes
app.post('/upload', upload.single('photo'), (req, res) => {
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
  fs.writeFile(imagePath, photo.buffer, (err) => {
    if (err) {
      console.error('Error al guardar la imagen:', err);
      return res.status(500).send('Error interno al guardar la imagen');
    }

    console.log('Imagen guardada con éxito:', imagePath);

    // Puedes realizar cualquier procesamiento adicional aquí, si es necesario

    // 1 cargar el model.json
    // 2 Hacer la prediccion
    // 3 Devolver la respuesta
    
    // let respuesta;
    // res.json({
      //   "laprediccion": respuesta;       
      // })
    res.send('Imagen recibida y procesada con éxito');
  });
});


app.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, gender } = req.body;
    const newUsuario = await UsuariosModel({username, email, password, firstName, lastName, gender}); 
    
    // codigo para insertar en usuario en mongodb
    // ...
    
    console.log("Usuario registrado con éxito:", newUsuario);
    res.sendStatus(201);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
});





// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Server listening on: http://localhost:${puerto}`);
  // connectDB().then(() => {
  //   console.log("Conexión exitosa a la base de datos.");
  // }).catch((error) => {
  //   console.error("Error de conexión a la base de datos:", error);
  // });
});