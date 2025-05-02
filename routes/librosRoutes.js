// LibrosRoutes.js - endpoints
const express = require('express')
const LibrosController = require('../controllers/librosController')

const librosRouter = express.Router()

// Consultar libros (accesible para todos)
librosRouter.get('/', LibrosController.getAllLibros)

// Consultar libro por ID (accesible para todos)
librosRouter.get('/:id', LibrosController.getLibroByID)

module.exports = librosRouter
