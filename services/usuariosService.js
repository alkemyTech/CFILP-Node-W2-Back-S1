// Usuarios Service - logica de negocio
const { Usuarios } = require ('../models')


class UsuariosService {
    async getAllUsuarios () {
    return await Usuarios.findAll()
  }

  async createUsuarios(usuarios) {
    return await Usuarios.create(usuarios)
  }

  async updateUsuarios(id, usuarios) {
    return await Usuarios.update(usuarios, { where: { id } })
  }

  async deleteUsuarios(id) {
    return await Usuarios.destroy({ where: { id } })
  }

}

module.exports = new UsuariosService ()
