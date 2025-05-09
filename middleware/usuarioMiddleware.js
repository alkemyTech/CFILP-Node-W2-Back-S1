const { textoLimpio } = require("../utils/validarCampos.js");
// recibe el nombre del campo, la longitud minima y el tipo de validacion
// si no se pasa el tipo de validacion, se valida que no este vacio y que tenga la longitud minima

const validaCamposUsuario = [
    textoLimpio("nombre", 3, "alpha"),
    textoLimpio("apellido", 3, "alpha"),
    textoLimpio("usuario", 3, "alphanumeric"),
    textoLimpio("password", 6, "alphanumeric")
]

module.exports = validaCamposUsuario
