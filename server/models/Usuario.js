const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
    email: { type: String },
    password: { type: String }
});

UsuarioSchema.methods.encryptPassword = async (password) => {
    const salt =  await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

UsuarioSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = model('Usuario', UsuarioSchema);
