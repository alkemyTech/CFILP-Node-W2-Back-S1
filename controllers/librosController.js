// LibrosController.js - solicitudes HTTP
const LibrosService = require('../services/librosService')

function mapCategorias(libroCategorias) {
  const categorias = ['Ficcion', 'Comedia', 'Infantil', 'Ciencia', 'Fantasia', 'Novela', 'Biografia']
  
  return libroCategorias.split(',').map(categoria => categorias[categoria])
}

class LibrosController {
  async getAllLibros(req, res) {
    const libros = await LibrosService.getAllLibros()
    res.send(libros.map(libro => ({ ...libro.dataValues, categorias: mapCategorias(libro.categorias) })))
  }

  async getLibroByID(req, res) {
    const { id } = req.params
    const libro = await LibrosService.getLibroByID(id)
    res.send({ ...libro.dataValues, categorias: mapCategorias(libro.categorias) })
  }

  // Crear Libros
  async createLibro(req, res) { 
    const { isbn, titulo, autor, categorias, disponibilidad } = req.body
    await LibrosService.createLibro({ isbn, titulo, autor, categorias, disponibilidad })
    res.send('Creado')
  }
  
  // Actualizar Libros
  async updateLibro (req, res) { 
    const { id } = req.params
    const { isbn, titulo, autor, categorias, disponibilidad } = req.body
    await LibrosService.updateLibro(id, { isbn, titulo, autor, categorias, disponibilidad })
    res.send('Actualizado')
  }
  
    // Borrar Libros
    async deleteLibro (req, res) { 
      const libro = await LibrosService.deleteLibro(req.params.id)
      res.send('Borrado')
    }
  }

module.exports = new LibrosController()
