const { Router } = require('express');
const router = Router();

const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/registrar', async (req, res) => {
    const {email, password } = req.body;
    const usuario = await Usuario.findOne({email});
    if (usuario) 
        return res.status(404).send('Correo ya existe');

    const newUsuario = new Usuario({
        email: email,
        password: password
    });

    newUsuario.password = await newUsuario.encryptPassword(newUsuario.password);
    await newUsuario.save();
    
    const token = jwt.sign({_id: newUsuario._id}, 'secretkey');
    res.status(200).json({'token':token});
});

router.post('/ingresar', async (req, res) => {
    const {email, password } = req.body;
    const usuario = await Usuario.findOne({email});
    if (!usuario) 
        return res.status(404).send('Correo no existe');

    const validPassword = await usuario.validatePassword(password);
    if (!validPassword)
        return res.status(404).send('Password incorrecto');

    const token = jwt.sign({_id:usuario._id}, 'secretkey', {
        expiresIn: 60 * 60 * 24
    });
    return res.status(200).json({'token':token});
});

module.exports = router;
