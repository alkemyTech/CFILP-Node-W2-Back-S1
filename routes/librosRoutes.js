// LibrosRoutes.js - endpoints
const express = require("express")
const LibrosController = require("../controllers/librosController")

const authMiddleware = require("../middleware/authMiddleware")
const { verificarRol } = require("../middleware/verificarRolMiddleware")
const { validacionCamposLibro } = require("../middleware/libroMiddleware")

const librosRouter = express.Router()

// Middleware autenticación
librosRouter.use(authMiddleware)

// Consultar libros
librosRouter.get("/", LibrosController.getAllLibros)

// Consultar libro por ID (accesible para todos)
librosRouter.get("/:id", LibrosController.getLibroByID)

// Las siguientes rutas son sólo para administradores
librosRouter.use(verificarRol("admin"))

// Crear un libro
librosRouter.post("/", validacionCamposLibro("POST"),  LibrosController.createLibro)

// Modificar un libro
librosRouter.put("/:id",validacionCamposLibro("PUT"), LibrosController.updateLibro )

// Borrar un libro
librosRouter.delete("/:id", LibrosController.deleteLibro)

module.exports = librosRouter
