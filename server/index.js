const express = require('express');
const path = require('path');

const app = express();
const puerto = 3000; // Puedes cambiar el número de puerto según tus preferencias

// Configuración para servir archivos estáticos (como tu archivo HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar solicitudes GET a la raíz y enviar el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Server listening on: http://localhost:${puerto}`);
});