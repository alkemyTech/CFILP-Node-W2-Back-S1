// Usuarios Service - logica de negocio
const { Usuarios } = require("../models")
const { handleSequelizeError } = require("../utils/errorHandler")

const { Op } = require("sequelize")

class UsuariosService {
  async getAllUsuarios(body) {
    try {
      const where = {}
      if (body) {
        const { nombre, apellido, usuario, rol } = body
        if (nombre) where.nombre = { [Op.like]: `%${nombre}%` }
        if (apellido) where.apellido = { [Op.like]: `%${apellidok}%` }
        if (usuario) where.usuario = { [Op.like]: `%${usuario}%` }
        if (rol) where.rol = { [Op.like]: `%${rol}%` }
      }
      return await Usuarios.findAll({ where })
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

module.exports = new UsuariosService()
