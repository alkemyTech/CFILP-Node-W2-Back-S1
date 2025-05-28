// LibrosRoutes.js - endpoints
const express = require('express')
const LibrosController = require('../controllers/librosController')

const { validacionCamposLibro } = require('../middleware/libroMiddleware')

const librosRouter = express.Router()

// Consultar libros (accesible para todos)
librosRouter.get('/', LibrosController.getAllLibros)

// Consultar libro por ID (accesible para todos)
librosRouter.get('/:id', LibrosController.getLibroByID)

// Crear un libro
librosRouter.post('/', validacionCamposLibro, LibrosController.createLibro)

// Modificar un libro
librosRouter.put('/:id', validacionCamposLibro, LibrosController.updateLibro)

// Borrar un libro
librosRouter.delete('/:id', LibrosController.deleteLibro)

module.exports = librosRouter
