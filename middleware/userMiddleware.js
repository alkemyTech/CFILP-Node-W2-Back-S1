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
const validaCamposUsuario = [
  textoLimpio("nombre", 3, "alpha"),
  textoLimpio("apellido", 3, "alpha"),
  textoLimpio("usuario", 3, "alphanumeric"),
  textoLimpio("password", 6, "alphanumeric"),

  // Middleware para verificar los errores después de las validaciones
  (req, res, next) => {
    const errors = validationResult(req)

    // Si hay errores, agruparlos y devolverlos juntos
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg
        }))
      })
    }

    // Si no hay errores, continuar con el siguiente middleware o controlador
    next()
  }
]

module.exports = { validateLogin, validaCamposUsuario }
