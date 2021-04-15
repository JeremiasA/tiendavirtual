const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaCarrito = {
    nombre: String,
    precio: Number,
    cantidad: Number,
    total: Number,
    imgsrc: String,
    session: String
};

module.exports = mongoose.model('carritos', SchemaCarrito);

