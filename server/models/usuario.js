const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    gender: String,
})

const UsuariosModel = mongoose.model("usuarios", UsuariosSchema)
module.exports = UsuariosModel