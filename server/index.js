if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// initializations
const app = express();
require('./database');

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('common'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use('/api', require('./routes/usuarios'));
app.use('/api/contactos', require('./routes/contactos'));

// start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});