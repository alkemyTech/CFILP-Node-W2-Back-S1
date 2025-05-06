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
}

module.exports = new LibrosService()
