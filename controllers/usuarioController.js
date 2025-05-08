const usuarioService = require("../services/usuarioService")

class UsuarioController {
  // Método para crear un nuevo usuario
  async creaUsuario(req, res, next) {
    const { nombre, apellido, usuario, password, rol = "user" } = req.body
   
    try {
      // Llamada al servicio para crear el nuevo usuario
      const nuevoUsuario = await usuarioService.creaUsuario({
        nombre, apellido, usuario, password, rol
      })

      // 201 Created: Recurso creado
      return res.status(201).json({
        message: "El usuario fue creado correctamente",
        // Devolver usuario sin la contraseña
        usuario: { ...nuevoUsuario.dataValues, password: undefined }
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UsuarioController()
