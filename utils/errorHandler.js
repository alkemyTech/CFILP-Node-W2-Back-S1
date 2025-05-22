// Clase para errores personalizados con un statusCode y mensaje
class CustomError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
    this.errors = errors
  }
}

// Errores de Sequelize
const handleSequelizeError = (error) => {
  if (error.name === 'SequelizeValidationError') {
    const errors = error.errors.map((err) => ({
      field: err.path,
      message: err.message
    }))
    // Error 400: Bad Request | El cliente envió datos inválidos
    return new CustomError('Errores de validación', 400, errors)
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    const field = error.errors[0].path
    // Error 409: Conflict | El cliente intenta crear un recurso ya existente
    return new CustomError(`El ${field} ya está en uso`, 409)
  }

  // Error 500: Internal Server Error
  return new CustomError('Error interno del servidor', 500)
}

// Manejar errores de axios
const handleApiError = (error) => {
  if (error.response) {
    return new CustomError(
      error.response.data.error?.message || 'Error en la solicitud',
      error.response.status
    )
  }
  return new CustomError('Error de conexión con el servidor', 500)
}

module.exports = { CustomError, handleSequelizeError, handleApiError }
