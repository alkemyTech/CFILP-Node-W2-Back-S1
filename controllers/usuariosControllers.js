//Usuarios Controller - solicitudes HTTP
const UsuariosService = require("../services/usuariosService")

class UsuariosController {
  //Obtener Usuarios
  async getAllUsuarios(req, res, next) {
    try {
      const usuarios = await UsuariosService.getAllUsuarios(req.body)
      res.status(200).send(usuarios)
    } catch (error) {
      next(error)
    }
  }

  // Crear Usuario
  async createUsuarios(req, res) {
    const { nombre, apellido, usuario, password } = req.body
    await UsuariosService.createUsuario({ nombre, apellido, usuario, password })
    res.send("Usuario creado con exito")
  }

  // Actualizar Usuario
  async updateUsuarios(req, res) {
    const { id } = req.params
    const { nombre, apellido, usuarios } = req.body
    await UsuariosService.updateUsuario(id, { nombre, apellido, usuarios })
    res.send("Usuario Actualizado")
  }

  // Borrar Usuario
  async deleteUsuarios(req, res) {
    await UsuariosService.deleteUsuario(req.params.id)
    res.send("Usuario Borrado")
  }
}

module.exports = new UsuariosController()
