const { body } = require("express-validator")

const textoLimpio = (campo, min, max, tipo, metodo = "POST") => {
  let campoLimpio = body(campo).trim()

  if (metodo === "PUT") {
    campoLimpio = campoLimpio
      .optional()
      .notEmpty()
      .withMessage(`El campo ${campo} no puede estar vacío`)
  } else {
    campoLimpio = campoLimpio
      .notEmpty()
      .withMessage(`El campo ${campo} es obligatorio`)
  }

  campoLimpio = campoLimpio
    .isLength({ min })
    .withMessage(`El campo ${campo} debe tener al menos ${min} caracteres`)
    .isLength({ max })
    .withMessage(`El campo ${campo} no puede tener más de ${max} caracteres`)

  if (tipo === "alpha") {
    campoLimpio = campoLimpio
      .isAlpha("es-ES", { ignore: " " })
      .withMessage(`El campo ${campo} solo puede contener letras`)
  } else if (tipo === "alphanumeric") {
    campoLimpio = campoLimpio
      .isAlphanumeric("es-ES", { ignore: " " })
      .withMessage(`El campo ${campo} solo puede contener letras y números`)
  } else if (tipo === "numeric") {
    campoLimpio = campoLimpio
      .isNumeric()
      .withMessage(`El campo ${campo} solo puede contener números`)
  }

  return campoLimpio
}

module.exports = { textoLimpio }
