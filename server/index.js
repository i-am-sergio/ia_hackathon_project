const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require("./routes")
const connectDB = require("./data"); 

const app = express();
const puerto = 3000; // Puedes cambiar el número de puerto según tus preferencias

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

app.use(routes);

// Ruta para manejar solicitudes GET a la raíz y enviar el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Server listening on: http://localhost:${puerto}`);
  connectDB().then(() => {
    console.log("Conexión exitosa a la base de datos.");
  }).catch((error) => {
    console.error("Error de conexión a la base de datos:", error);
  });
});