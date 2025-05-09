// Usuarios Service - logica de negocio
const { Usuarios } = require ('../models')
const { handleSequelizeError } = require("../utils/errorHandler")

class UsuariosService {

  async getAllUsuarios () {
    try {
      return await Usuarios.findAll()
    } catch (error) {
      throw handleSequelizeError(error)
    }
  }

  async createUsuario(usuario) {
    try {
      return await Usuarios.create(usuario)
    } catch (error) {
      throw handleSequelizeError(error)
    }
  }

  async updateUsuario(id, usuario) {
    try {
      return await Usuarios.update(usuario, { where: { id } })
    } catch (error) {
      throw handleSequelizeError(error)
    }
  }

  async deleteUsuario(id) {
    try {
      return await Usuarios.destroy({ where: { id } })
    } catch (error) {
      throw handleSequelizeError(error)
    }
  }

}

module.exports = new UsuariosService ()
