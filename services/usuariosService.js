// Usuarios Service - logica de negocio
const { Usuarios } = require ('../models')

class UsuariosService {

  async getAllUsuarios () {
    return await Usuarios.findAll()
  }

  async createUsuario(usuario) {
    return await Usuarios.create(usuario)
  }

  async updateUsuario(id, usuario) {
    return await Usuarios.update(usuario, { where: { id } })
  }

  async deleteUsuario(id) {
    return await Usuarios.destroy({ where: { id } })
  }

}

module.exports = new UsuariosService ()
