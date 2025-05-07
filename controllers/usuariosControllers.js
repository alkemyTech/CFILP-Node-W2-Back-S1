//Usuarios Controller - solicitudes HTTP

const UsuariosService = require('../services/usuariosService')

class UsuariosController {
  async getAllUsuarios(req, res) {
    const usuarios = await UsuariosService.getAllUsuarios()
    res.send(usuarios)
  }
}

module.exports = new UsuariosController()
