const { validationResult } = require("express-validator")

const { CustomError } = require('../utils/errorHandler')
const { textoLimpio } = require("../utils/validarCampos.js")

// Middleware para validar el login de un usuario
const validacionCamposLibro = (metodo = "POST") => [
  textoLimpio("isbn", 10, 13, "alphanumeric", metodo),
  textoLimpio("titulo", 3, 50, "alpha", metodo),
  textoLimpio("autor", 3, 30, "alpha", metodo),
  textoLimpio("anio", 4, 4, "numeric", metodo),
  textoLimpio("categorias", 1, 2, "numeric", metodo),
  textoLimpio("disponibilidad", 1, 1, "numeric", metodo),

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  // Middleware para verificar errores después de las validaciones
  (req, res, next) => {
    const errors = validationResult(req);
=======
>>>>>>> Stashed changes
    // Middleware para verificar los errores después de las validaciones
    (req, res, next) => {
      const errors = validationResult(req)
  
      // Si hay errores, agruparlos y devolverlos juntos
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map(err => ({
            field: err.param,
            message: err.msg
          }))
        })
      }
  
      // Si no hay errores, continuar con el siguiente middleware o controlador
      next()
    }
]
>>>>>>> b125c6f9f6033d18e56ec459cf74276cc25b909d

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }

    next();
  },
];

module.exports = { validacionCamposLibro };