const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    username: String,
    email: String,
    predict: String,
    image: String,
    lugar: String,
    time: String,
    clima: String,
});

const PhotosModel = mongoose.model("photos", PhotoSchema)
module.exports = PhotosModel