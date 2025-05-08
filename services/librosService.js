// LibrosService.js - logica de negocio
const { Libros } = require('../models')

class LibrosService {
  async getAllLibros({ disponibilidad }) {
    const where = {}
    if (disponibilidad) where.disponibilidad = disponibilidad
    return await Libros.findAll({ where })
  }

  async getLibroByID(id) {
    return await Libros.findOne({ where: { id } })
  }

  async createLibro(libro) {
    return await Libros.create(libro)
  }

  async updateLibro(id, libro) {
    return await Libros.update(libro, { where: { id } })
  }

  async deleteLibro(id) {
    return await Libros.destroy({ where: { id } })
  }
}

module.exports = new LibrosService()
