const { Schema, model } = require('mongoose');

const ContactoSchema = new Schema({
    tipo_documento: { type: String },
    numero_documento: { type: String },
    nombres: { type: String },
    primer_apellido: { type: String },
    segundo_apellido: { type: String },
    fecha_nacimiento: { type: Date, default: Date.now },
    correo: { type: String },
    direccion: { type: String },
    celular: { type: String },
    distrito: { type: String }
});

module.exports = model('Contacto', ContactoSchema);

