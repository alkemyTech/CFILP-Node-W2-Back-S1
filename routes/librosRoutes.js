// LibrosRoutes.js - endpoints
const express = require("express");
const LibrosController = require("../controllers/librosController");
const { verificarRol } = require("../middleware/verificarRolMiddleware");
const { validacionCamposLibro } = require("../middleware/libroMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const librosRouter = express.Router();

librosRouter.use(authMiddleware); // Middleware global: autenticación

// Consultar libros
librosRouter.get("/", LibrosController.getAllLibros);
// Crear un libro
librosRouter.post("/",verificarRol("admin"), validacionCamposLibro("POST"),  LibrosController.createLibro);
// Modificar un libro
librosRouter.put("/:id", verificarRol("admin"),validacionCamposLibro("PUT"), LibrosController.updateLibro );
// Borrar un libro
librosRouter.delete("/:id", verificarRol("admin"), LibrosController.deleteLibro);
// Consultar libro por ID (accesible para todos)
librosRouter.get("/:id", LibrosController.getLibroByID);

module.exports = librosRouter;
