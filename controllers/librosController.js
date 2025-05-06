// LibrosController.js - solicitudes HTTP
const LibrosService = require('../services/librosService')

function mapCategorias(libroCategorias) {
  const categorias = ['Ficcion', 'Comedia', 'Infantil', 'Ciencia', 'Fantasia', 'Novela', 'Biografia']
  
  return libroCategorias.split(',').map(categoria => categorias[categoria])
}

class LibrosController {
  async getAllLibros(req, res) {
    const libros = await LibrosService.getAllLibros(req.query)
    res.send(libros.map(libro => ({ ...libro.dataValues, categorias: mapCategorias(libro.categorias) })))
  }

  async getLibroByID(req, res) {
    const { id } = req.params
    const libro = await LibrosService.getLibroByID(id)
    res.send({ ...libro.dataValues, categorias: mapCategorias(libro.categorias) })
  }
}

module.exports = new LibrosController()
