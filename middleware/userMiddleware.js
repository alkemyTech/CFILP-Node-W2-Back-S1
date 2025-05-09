const { CustomError } = require('../utils/errorHandler')

const validateUserCreate = (req, res, next) => {
  const { nombre, apellido, usuario, password } = req.body

  if (!nombre || !apellido || !usuario || !password) {
    const needCampos = Object.keys({ nombre, apellido, usuario, password }).filter(campo => !req.body[campo])
    throw new CustomError(`Los campos [${needCampos.join(', ')}] son obligatorios`, 400)
  }

  next()
}

module.exports = { validateUserCreate }
