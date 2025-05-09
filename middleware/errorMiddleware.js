const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500
  const message = error.message || 'Error interno del servidor'
  const errors = error.errors || null

  res.status(statusCode).json({
    error: {
      message,
      ...(errors && { errors }) // Devolver errores si existen
    }
  })
}

module.exports = errorMiddleware
