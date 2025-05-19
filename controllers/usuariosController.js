//Usuarios Controller - solicitudes HTTP
const usuariosService = require("../services/usuariosService")

class UsuariosController {
  // Obtener perfil del usuario
  async perfilUsuario(req, res, next) {
    try {
      const user = req.user

      res.status(200).json({
        message: "Perfil del usuario",
        data: user
      })
    } catch (error) {
      next(error)
    }
  }

  // Logear para obtener un token
  async loginUsuario(req, res, next) {
    try {
      const { usuario, password } = req.body
      const token = await usuariosService.login({ usuario, password })

      return res.status(200).json({
        message: "Inicio de sesión exitoso",
        token
      })
    } catch (error) {
      next(error)
    }
  }

  //Obtener Usuarios
  async getAllUsuarios(req, res, next) {
    try {
      const usuarios = await usuariosService.getAllUsuarios(req.query)

      res.status(200).send(usuarios)
    } catch (error) {
      next(error)
    }
  }

  // Crear Usuario
  async createUsuario(req, res, next) {
    try {
      const { nombre, apellido, usuario, password, rol = "user" } = req.body
      const nuevoUsuario = await usuariosService.createUsuario({
        nombre, apellido, usuario, password, rol
      })

      // 201 Created: Recurso creado
      res.status(201).json({
        message: "Usuario fue creado correctamente",
        // Devolver usuario sin la contraseña
        usuario: { ...nuevoUsuario.dataValues, password: undefined }
      })
    } catch (error) {
      next(error)
    }
  }

  // Actualizar Usuario
  async updateUsuario(req, res, next) {
    try {
      const { nombre, apellido, usuarios } = req.body
      await usuariosService.updateUsuario(req.params.id, { nombre, apellido, usuarios })

      res.status(200).json({ message: "Usuario actualizado exitosamente" })
    } catch (error) {
      next(error)
    }
  }

  // Borrar Usuario
  async deleteUsuario(req, res, next) {
    try {
      await usuariosService.deleteUsuario(req.params.id)

      res.status(200).json({ message: "Usuario fue eliminado" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UsuariosController()
