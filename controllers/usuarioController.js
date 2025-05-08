// ARCHIVO TEMPORAL (se va a usar el de la rama Usuarios)

const usuarioService = require("../services/usuarioService")

const {
  createdResponse,
  badRequestResponse,
  internalServerErrorResponse
} = require("../middleware/respuesta&status")

class UsuarioController {
  // Método para crear un nuevo usuario
  async creaUsuario(req, res) {
    const { nombre, apellido, usuario, password, rol = "user" } = req.body
   
    try {
      // Llamada al servicio para crear el nuevo usuario
      const nuevoUsuario = await usuarioService.creaUsuario({
        nombre,
        apellido,
        usuario,
        password,
        rol
      })
      // Respuesta de éxito con el nuevo usuario creado
      return createdResponse(res, nuevoUsuario, "usuario")
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        // Manejo de error de usuario duplicado
        return badRequestResponse(res, error, "usuario", "El usuario ya existe")
      }
      // Manejo de errores internos del servidor
      console.error("Error al crear el usuario:", error) // 👈 Esto es importante
      return internalServerErrorResponse(res, error, "usuario","El usuario ya existe")
    }
  }
}

module.exports = new UsuarioController()
