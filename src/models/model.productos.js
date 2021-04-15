const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaProductos = {
    nombre: String,
    precio: Number,
    descripcion: String,
    stock: Number,
    imgsrc: String
};

module.exports = mongoose.model('productos', SchemaProductos);

