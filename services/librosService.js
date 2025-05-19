// LibrosService.js - logica de negocio
const { Op } = require('sequelize')
const { Libros } = require('../models')
const { handleSequelizeError } = require('../utils/errorHandler')

class LibrosService {
<<<<<<< Updated upstream
  async getAllLibros({ disponibilidad }) {
    const where = {}
    if (disponibilidad) where.disponibilidad = disponibilidad
    return await Libros.findAll({ where })
=======
  async getAllLibros (body) {
    try { const where = {}
    if(body)
    { const { isbn, titulo, categorias, autor, anio} = body
      if (isbn) where.isbn = { [Op.like]: `%${ isbn }%` }
      if (titulo) where.isbn = { [Op.like]: `%${ titulo }%` }
      if (categorias) where.isbn = { [Op.like]: `%${ categorias }%` }
      if (autor) where.isbn = { [Op.like]: `%${ autor }%` }
      if (anio) where.isbn = { [Op.like]: `%${ anio }%` }
    }
    return await Libros.findAll( {where} )
  } catch (error) {
    throw handleSequelizeError(error)
    }
>>>>>>> Stashed changes
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
