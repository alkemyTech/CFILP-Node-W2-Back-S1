const { body } = require("express-validator")

//esta funcion recibe el campo y elimina el espacio en blanco al principio y al final,
// luego valida que el campo no este vacio y que tenga una longitud minima,
// si el tipo es alpha valida que solo contenga letras,
// si es alphanumeric valida que contenga letras y numeros
// si no es ninguno de los dos tipos no hace nada

const textoLimpio = (campo, min, tipo) => {
  let campoLimpio = body(campo)
    .trim()
    .notEmpty()
    .withMessage(`El campo ${campo} es obligatorio`)
    .isLength({ min })
    .withMessage(`El campo ${campo} debe tener al menos ${min} caracteres`)

  if (tipo === "alpha") {
    campoLimpio = campoLimpio
      .isAlpha("es-ES", { ignore: " " })
      .withMessage(`El campo ${campo} solo puede contener letras`)
  } else if (tipo === "alphanumeric") {
    campoLimpio = campoLimpio
      .isAlphanumeric("es-ES", { ignore: " " })
      .withMessage(`El campo ${campo} solo puede contener letras y números`)
  }
  return campoLimpio
}

module.exports = { textoLimpio }
