const { verifyToken } = require('../utils/jwt')
const { CustomError } = require('../utils/errorHandler')

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] // Espera "Bearer <token>"
  if (!token) {
    throw new CustomError('Token no proporcionado', 401)
  }

  try {
    const decoded = verifyToken(token)
    req.user = decoded // Agrega la información del usuario al request
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authMiddleware
