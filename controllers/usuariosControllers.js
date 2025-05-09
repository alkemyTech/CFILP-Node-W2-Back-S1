//Usuarios Controller - solicitudes HTTP
const UsuariosService = require('../services/usuariosService')

class UsuariosController {

  //Obtener Usuarios
  async getAllUsuarios(req, res) {
    const usuarios = await UsuariosService.getAllUsuarios()
    res.send(usuarios)
  }

  // Crear Usuario
  async createUsuario(req, res) { 
    const { nombre , apellido, usuario, password} = req.body
    await UsuariosService.createUsuario({ nombre , apellido, usuario, password})
    res.send('Usuario creado con exito')
  }

  // Actualizar Usuario
  async updateUsuario (req, res) { 
    const { id } = req.params
    const { nombre , apellido, usuarios} = req.body
    await UsuariosService.updateUsuario(id , {nombre , apellido, usuarios})
    res.send('Usuario Actualizado')
  }

  // Borrar Usuario
  async deleteUsuario (req, res) {
    await UsuariosService.deleteUsuario(req.params.id)
    res.send('Usuario Borrado')
  }

}

module.exports = new UsuariosController()
