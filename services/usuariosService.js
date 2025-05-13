// Usuarios Service - logica de negocio
const { Usuarios } = require ('../models')
const bcrypt = require('bcrypt')

const { handleSequelizeError, CustomError } = require("../utils/errorHandler")
const { generateToken } = require('../utils/jwt')

class UsuariosService {

  async login({ usuario, password }) {
    try {
      // Verificar que el usuario existe
      const user = await Usuarios.findOne({ where: { usuario } })
      if (!user) throw new CustomError('El usuario no existe', 401)

      // Verificar que la contraseña sea correcta
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) throw new CustomError('Credenciales inválidas', 401)

      // Generar y devolver token
      return generateToken(user)
    } catch (error) {
      if (error.name.includes('Sequelize')) throw handleSequelizeError(error)
      throw error
    }
  }

  async getAllUsuarios () {
    try {
      return await Usuarios.findAll()
    } catch (error) {
      throw handleSequelizeError(error)
    }
  }

  async createUsuario(usuario) {
    try {
      const hashedPassword = await bcrypt.hash(usuario.password, 10)

      return await Usuarios.create({ ...usuario, password: hashedPassword })
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
