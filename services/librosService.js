// LibrosService.js - logica de negocio
const { Libros } = require('../models')

class LibrosService {
  async getAllLibros() {
    return await Libros.findAll()
  }

  async getLibroByID(id) {
    return await Libros.findOne({ where: { id } })
  }
}

module.exports = new LibrosService()
