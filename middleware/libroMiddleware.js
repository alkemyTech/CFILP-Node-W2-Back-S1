const { CustomError } = require('../utils/errorHandler')

const validateLibroCreate = (req, res, next) => {
  const { isbn, titulo, autor, anio, categorias, disponibilidad } = req.body

  if (!isbn || !titulo || !autor || !anio || !categorias || !disponibilidad) {
    const needCampos = Object.keys({
      isbn, titulo, autor, anio, categorias, disponibilidad
    }).filter(campo => !req.body[campo])

    throw new CustomError(`Los campos [${needCampos.join(', ')}] son obligatorios`, 400)
  }

  next()
}

module.exports = { validateLibroCreate }
