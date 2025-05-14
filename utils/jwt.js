const jwt = require('jsonwebtoken')
const { CustomError } = require('./errorHandler')

const SECRET_KEY = process.env.SECRET_KEY || 'key_super_segura'

const generateToken = (user) => {
  const payload = {
    id: user.id,
    nombre: user.nombre,
    apellido: user.apellido,
    usuario: user.usuario,
    rol: user.rol
  }

  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch {
    throw new CustomError('Token no válido', 401)
  }
}

module.exports = { generateToken, verifyToken }
