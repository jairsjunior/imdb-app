const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const MovieSchema = new Schema({
    posicao: Number, 
    tituloFilme: String,
    ano: Number,
    nota: Number
})

module.exports = mongoose.model('Movie', MovieSchema);