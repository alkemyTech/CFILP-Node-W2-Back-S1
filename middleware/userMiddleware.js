const { validationResult } = require("express-validator")
const { textoLimpio } = require("../utils/validarCampos.js")

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

module.exports = validaCamposUsuario
