const { validationResult } = require("express-validator");
const { textoLimpio } = require("../utils/validarCampos.js");

const validacionCamposLibro = [
    textoLimpio('isbn', 10, 'alphanumeric'),
    textoLimpio('titulo', 3, 'alpha'),
    textoLimpio('autor', 3, 'alpha'),
    textoLimpio('categorias', 1, 'numeric'), //tomando que categoria la manejamos como un numero
    textoLimpio('disponibilidad', 1, 'numeric'), //tomando que disponibilidad la manejamos como un numero

     // Middleware para verificar los errores después de las validaciones
      (req, res, next) => {
        const errors = validationResult(req);
    
        // Si hay errores, agruparlos y devolverlos juntos
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array().map(err => ({
              field: err.param,
              message: err.msg
            }))
          });
        }
    
        // Si no hay errores, continuar con el siguiente middleware o controlador
        next();
      }
];

module.exports = validacionCamposLibro

