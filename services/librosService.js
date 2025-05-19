// LibrosService.js - logica de negocio
const { Libros } = require('../models')

const { Op } = require("sequelize")
const { handleSequelizeError } = require("../utils/errorHandler")

class LibrosService {
  async getAllLibros({ isbn, titulo, categorias, autor, anio, disponibilidad }) {
    try {
      const where = {}
      if (isbn) where.isbn = { [Op.like]: `%${isbn}%` }
      if (titulo) where.titulo = { [Op.like]: `%${titulo}%` }
      if (autor) where.autor = { [Op.like]: `%${autor}%` }
      if (anio) where.anio = { [Op.like]: `%${anio}%` }
      if (categorias) where.categorias = { [Op.like]: `%${categorias}%` }
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
