const { badRequestResponse } = require("../middleware/respuesta&status")

const validarCamposRequeridos = (req, res, next) => {
  const { nombre, apellido, usuario, password } = req.body

  // Comprobar si alguno de los campos es nulo o está vacío
  if (!nombre || !apellido || !usuario || !password) {
    return badRequestResponse(res, "Todos los campos son requeridos", "usuario")
  }

  // Si todos los campos son válidos, pasa al siguiente middleware o controlador
  next()
}

module.exports = validarCamposRequeridos
