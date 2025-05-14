const { CustomError } = require('../utils/errorHandler')

const validateLogin = (req, res, next) => {
  const { usuario, password } = req.body

  if (!usuario || !password) {
    throw new CustomError('Usuario y Contraseña son obligatorios', 400)
  }

  next()
}

const validateUserCreate = (req, res, next) => {
  const { nombre, apellido, usuario, password } = req.body

  if (!nombre || !apellido || !usuario || !password) {
    const needCampos = Object.keys({ nombre, apellido, usuario, password }).filter(campo => !req.body[campo])
    throw new CustomError(`Los campos [${needCampos.join(', ')}] son obligatorios`, 400)
  }

  next()
}

module.exports = { validateLogin, validateUserCreate }
