const { validationResult } = require("express-validator");
const { CustomError } = require("../utils/errorHandler.js");
const { textoLimpio } = require("../utils/validarCampos.js");
const e = require("express");

const validaPrestamo = (metodo = "POST") => [
  textoLimpio("id", 1, 5, "numeric", metodo),
 
  // Middleware para verificar los errores después de las validaciones
  (req, res, next) => {
    const errors = validationResult(req);

    // Si hay errores, agruparlos y devolverlos juntos
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }

    // Si no hay errores, continuar con el siguiente middleware o controlador
    next();
  },
];

exports.validaPrestamo = validaPrestamo;
