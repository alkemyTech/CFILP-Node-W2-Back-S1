// Usuarios Service - logica de negocio
const { Usuarios } = require("../models")
const bcrypt = require("bcrypt")
const { Op } = require("sequelize")

const { handleSequelizeError, CustomError } = require("../utils/errorHandler")
const { generateToken } = require("../utils/jwt")

class UsuariosService {
  async login({ usuario, password }) {
    try {
      // Verificar que el usuario existe
      const user = await Usuarios.findOne({ where: { usuario } })
      if (!user) throw new CustomError("El usuario no existe", 401)

      // Verificar que la contraseña sea correcta
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) throw new CustomError("Credenciales inválidas", 401)

      const passUser = { ...user.dataValues, password: undefined }

      // Generar token
      const token = generateToken(passUser)

      // Devolver el usuario con el token y sin la contraseña
      return { user: passUser, token }
    } catch (error) {
      if (error.name.includes("Sequelize")) throw handleSequelizeError(error)
      throw error
    }
  }

  async getAllUsuarios({ nombre, apellido, usuario, rol }) {
    try {
      const where = {}
      if (nombre) where.nombre = { [Op.like]: `%${nombre}%` }
      if (apellido) where.apellido = { [Op.like]: `%${apellido}%` }
      if (usuario) where.usuario = { [Op.like]: `%${usuario}%` }
      if (rol) where.rol = { [Op.like]: `%${rol}%` }
      return await Usuarios.findAll({ where })
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

  async updateUsuario(id, nuevosDatos) {
    try {
      const usuarioExistente = await Usuarios.findByPk(id)
  
      if (!usuarioExistente) {
        throw new CustomError("Usuario no encontrado", 404)
      }
  
      const datosActualizados = { ...usuarioExistente.toJSON(), ...nuevosDatos }
  
      await usuarioExistente.update(datosActualizados)
  
      return usuarioExistente
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
