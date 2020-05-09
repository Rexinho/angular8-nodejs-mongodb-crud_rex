const { Router } = require('express');
const router = Router();

const Contacto = require('../models/Contacto');
const jwt = require('jsonwebtoken');

router.get('/', verificarToken, async (req, res) => {
    const contactos = await Contacto.find().sort('-_id');
    res.json(contactos);
});

router.get('/:id', verificarToken, async (req, res) => {
    const contacto = await Contacto.findById(req.params.id);
    res.json(contacto);
});

router.post('/', verificarToken, async (req, res) => {

    const newContacto = new Contacto({
        tipo_documento: req.body.tipo_documento,
        numero_documento: req.body.numero_documento,
        nombres: req.body.nombres,
        primer_apellido: req.body.primer_apellido,
        segundo_apellido: req.body.segundo_apellido,
        fecha_nacimiento: req.body.fecha_nacimiento,
        correo: req.body.correo,
        direccion: req.body.direccion,
        celular: req.body.celular,
        distrito: req.body.distrito
    });

    //console.log(newContacto)
    await newContacto.save();
    res.json({'message': 'Contacto Saved'});
});

router.put('/:id', verificarToken, async (req, res) => {
    
    const contacto = await Contacto.findById(req.params.id);
    contacto.tipo_documento = req.body.tipo_documento;
    contacto.numero_documento = req.body.numero_documento;
    contacto.nombres = req.body.nombres;
    contacto.primer_apellido = req.body.primer_apellido;
    contacto.segundo_apellido = req.body.segundo_apellido;
    contacto.fecha_nacimiento = req.body.fecha_nacimiento;
    contacto.correo = req.body.correo;
    contacto.direccion = req.body.direccion;
    contacto.celular = req.body.celular;
    contacto.distrito = req.body.distrito;
    
    await contacto.save();
    res.json({'message': 'Contacto Updated'});
});

router.delete('/:id', verificarToken, async (req, res) => {
    const contacto = await Contacto.findByIdAndDelete(req.params.id);
    res.json({message: 'Contacto Deleted'});
});

module.exports = router;

function verificarToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(404).send('Token no autorizado');
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(404).send('Token no autorizado');
    }

    const payload = jwt.verify(token, 'secretkey');
    req.userid = payload._id;
    next();
}