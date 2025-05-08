const { Usuarios } = require("../models")
const { handleSequelizeError } = require("../utils/errorHandler")

class UsuarioService {
  async creaUsuario(usuarioData) {
    try {
      // Crear un nuevo usuario en la base de datos
      const nuevoUsuario = await Usuarios.create(usuarioData)
      return nuevoUsuario
    } catch (error) {
      throw handleSequelizeError(error)
    }
  }
}

module.exports = new UsuarioService()
