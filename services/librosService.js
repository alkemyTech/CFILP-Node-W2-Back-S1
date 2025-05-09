// LibrosService.js - logica de negocio
const { Libros } = require('../models')
const { handleSequelizeError } = require("../utils/errorHandler")

class LibrosService {

  async getAllLibros({ disponibilidad }) {
    try {
      const where = {}
      if (disponibilidad) where.disponibilidad = disponibilidad
      return await Libros.findAll({ where })
    } catch (error) {
      throw handleSequelizeError(error)
    }
  }

  async getLibroByID(id) {
    try {
      return await Libros.findOne({ where: { id } })
    } catch (error) {
      throw handleSequelizeError(error)
    }
  }

  async createLibro(libro) {
    try {
      return await Libros.create(libro)
    } catch (error) {
      throw handleSequelizeError(error)
    }
  }

  async updateLibro(id, libro) {
    try {
      return await Libros.update(libro, { where: { id } })
    } catch (error) {
      throw handleSequelizeError(error)
    }
  }

  async deleteLibro(id) {
    try {
      return await Libros.destroy({ where: { id } })
    } catch (error) {
      throw handleSequelizeError(error)
    }
  }

}

module.exports = new LibrosService()
