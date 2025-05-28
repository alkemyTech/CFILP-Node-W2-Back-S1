const express = require("express")
const prestamoRouter = express.Router()
const prestamoController = require("../controllers/prestamoController")

const authMiddleware = require("../middleware/authMiddleware")
const { validaPrestamo } = require("../middleware/prestamoMiddleware")
const { verificarRol } = require("../middleware/verificarRolMiddleware")

// Middleware global: autenticación
prestamoRouter.use(authMiddleware)

// Rutas de préstamo
<<<<<<< Updated upstream
prestamoRouter.get("/", verificarRol("admin"), prestamoController.getAllPrestamos)
=======
<<<<<<< HEAD
prestamoRoute.get("/", verificarRol("admin"), PrestamoController.getAllPrestamos);
prestamoRoute.get("/usuarioPrestamos", PrestamoController.obternerPrestamosPorUsuario);
prestamoRoute.get("/:prestamoId", verificarRol("admin"), PrestamoController.getPrestamoById);
prestamoRoute.post("/", validaPrestamo, PrestamoController.solicitarPrestamo);
prestamoRoute.post("/:prestamoId/devolver", PrestamoController.devolverLibro);
prestamoRoute.put( "/:prestamoId", verificarRol("admin"), PrestamoController.actualizarPrestamo);
prestamoRoute.delete("/:prestamoId", verificarRol("admin"), PrestamoController.eliminarPrestamo);
=======
prestamoRouter.get("/", verificarRol("admin"), prestamoController.getAllPrestamos)
>>>>>>> b125c6f9f6033d18e56ec459cf74276cc25b909d
>>>>>>> Stashed changes

prestamoRouter.get("/:prestamoId", verificarRol("admin"), prestamoController.getPrestamoById)

prestamoRouter.get("/usuarioPrestamos", prestamoController.obternerPrestamosPorUsuario)
prestamoRouter.post("/", validaPrestamo, prestamoController.solicitarPrestamo)
prestamoRouter.post("/:prestamoId/devolver", prestamoController.devolverLibro)
prestamoRouter.put( "/:prestamoId", verificarRol("admin"), prestamoController.actualizarPrestamo)
prestamoRouter.delete("/:prestamoId", verificarRol("admin"), prestamoController.eliminarPrestamo)

module.exports = prestamoRouter
