// PrestamoRoutes.js - endpoints
const express = require("express")
const prestamoController = require("../controllers/prestamoController")

const authMiddleware = require("../middleware/authMiddleware")
const { validaPrestamo } = require("../middleware/prestamoMiddleware")
const { verificarRol } = require("../middleware/verificarRolMiddleware")

const prestamoRouter = express.Router()

// Middleware global: autenticación
prestamoRouter.use(authMiddleware)

prestamoRouter.get("/usuarioPrestamos", prestamoController.obternerPrestamosPorUsuario)

prestamoRouter.post("/", validaPrestamo, prestamoController.solicitarPrestamo)

prestamoRouter.post("/:prestamoId/devolver", prestamoController.devolverLibro)

// Las siguientes rutas son sólo para administradores
prestamoRouter.use(verificarRol("admin"))

prestamoRouter.get("/", prestamoController.getAllPrestamos)

prestamoRouter.get("/:prestamoId", prestamoController.getPrestamoById)

prestamoRouter.put("/:prestamoId", prestamoController.actualizarPrestamo)

prestamoRouter.delete("/:prestamoId", prestamoController.eliminarPrestamo)

module.exports = prestamoRouter
