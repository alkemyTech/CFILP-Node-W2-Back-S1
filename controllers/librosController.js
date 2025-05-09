// LibrosController.js - solicitudes HTTP
const LibrosService = require('../services/librosService')

function mapCategorias(libroCategorias) {
  const categorias = ['Ficcion', 'Comedia', 'Infantil', 'Ciencia', 'Fantasia', 'Novela', 'Biografia']
  
  return libroCategorias.split(',').map(categoria => categorias[categoria])
}

class LibrosController {

  async getAllLibros(req, res, next) {
    try {
      const libros = await LibrosService.getAllLibros(req.query)

      res.status(200).send(libros.map(libro => ({ ...libro.dataValues, categorias: mapCategorias(libro.categorias) })))
    } catch (error) {
      next(error)
    }
  }

  async getLibroByID(req, res, next) {
    try {
      const { id } = req.params
      const libro = await LibrosService.getLibroByID(id)

      res.status(200).send({ ...libro.dataValues, categorias: mapCategorias(libro.categorias) })
    } catch (error) {
      next(error)
    }
  }

  // Crear Libros
  async createLibro(req, res, next) {
    try {
      const { isbn, titulo, autor, anio, categorias, disponibilidad } = req.body
      const nuevoLibro = await LibrosService.createLibro({
        isbn, titulo, autor, anio, categorias, disponibilidad
      })

      // 201 Created: Recurso creado
      res.status(201).json({
        message: "Libro creado correctamente",
        // Devolver usuario sin la contraseña
        libro: nuevoLibro
      })
    } catch (error) {
      next(error)
    }
  }
  
  // Actualizar Libros
  async updateLibro (req, res, next) { 
    try {
      const { id } = req.params
      const { isbn, titulo, autor, anio, categorias, disponibilidad } = req.body
      await LibrosService.updateLibro(id, { isbn, titulo, autor, anio, categorias, disponibilidad })

      res.status(200).json({ message: "Libro actualizado correctamente" })
    } catch (error) {
      next(error)
    }
  }
  
  // Borrar Libros
  async deleteLibro (req, res, next) {
    try {
      await LibrosService.deleteLibro(req.params.id)
      
      res.status(200).json({ message: "Libro eliminado exitosamente" })
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new LibrosController()
