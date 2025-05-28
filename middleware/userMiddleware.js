const { validationResult } = require("express-validator")

const { CustomError } = require('../utils/errorHandler')
const { textoLimpio } = require("../utils/validarCampos.js")


const validateLogin = (req, res, next) => {
  const { usuario, password } = req.body

  if (!usuario || !password) {
    throw new CustomError('Usuario y Contraseña son obligatorios', 400)
  }

  next()
}

// Definir las validaciones para los campos de usuario
const validaCamposUsuario = (metodo = "POST") => [
  textoLimpio("nombre", 3, 20, "alpha", metodo),
  textoLimpio("apellido", 3, 20, "alpha", metodo),
  textoLimpio("usuario", 3, 15, "alphanumeric", metodo),
  textoLimpio("password", 6, 20, "alphanumeric", metodo),

  // Middleware para verificar errores
  (req, res, next) => {
    const errors = validationResult(req);
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

module.exports = { validaCamposUsuario , validateLogin };