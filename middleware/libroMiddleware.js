const { textoLimpio } = require('../helpers/validacionCampos.js');

const validacionCamposLibro = [
    textoLimpio('isbn', 10, 'alphanumeric'),
    textoLimpio('titulo', 3, 'alpha'),
    textoLimpio('categorias', 1, 'numeric'), //tomando que categoria la manejamos como un numero
    textoLimpio('anio', 4, 'alphanumeric'),
    textoLimpio('autor', 3, 'alpha'),
    textoLimpio('genero', 3, 'alpha'),
    textoLimpio('disponibilidad', 1, 'numeric'), //tomando que disponibilidad la manejamos como un numero
];

module.exports = validacionCamposLibro

