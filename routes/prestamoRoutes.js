const express = require("express")
const prestamoRouter = express.Router()
const prestamoController = require("../controllers/prestamoController")

const authMiddleware = require("../middleware/authMiddleware")
const { validaPrestamo } = require("../middleware/prestamoMiddleware")
const { verificarRol } = require("../middleware/verificarRolMiddleware")

// Middleware global: autenticación
prestamoRouter.use(authMiddleware)

// Rutas de préstamo
prestamoRouter.get("/", verificarRol("admin"), prestamoController.getAllPrestamos)
prestamoRouter.get("/:prestamoId", verificarRol("admin"), prestamoController.getPrestamoById)
prestamoRouter.get("/usuarioPrestamos", prestamoController.obternerPrestamosPorUsuario)
prestamoRouter.post("/", validaPrestamo, prestamoController.solicitarPrestamo)
prestamoRouter.post("/:prestamoId/devolver", prestamoController.devolverLibro)
prestamoRouter.put("/:prestamoId", verificarRol("admin"), prestamoController.actualizarPrestamo)
prestamoRouter.delete("/:prestamoId", verificarRol("admin"), prestamoController.eliminarPrestamo)

module.exports = prestamoRouter
