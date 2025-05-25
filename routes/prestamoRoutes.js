const express = require("express");
const prestamoRoute = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { validaPrestamo } = require("../middleware/prestamoMiddleware");
const { verificarRol } = require("../middleware/verificarRolMiddleware");
const PrestamoController = require("../controllers/prestamoController");

// Middleware global: autenticación
prestamoRoute.use(authMiddleware);

// Rutas de préstamo
prestamoRoute.get("/", verificarRol("admin"), PrestamoController.getAllPrestamos);
prestamoRoute.get("/:prestamoId", verificarRol("admin"), PrestamoController.getPrestamoById);
prestamoRoute.get("/usuarioPrestamos", PrestamoController.obternerPrestamosPorUsuario);
prestamoRoute.post("/", validaPrestamo, PrestamoController.solicitarPrestamo);
prestamoRoute.post("/:prestamoId/devolver", PrestamoController.devolverLibro);
prestamoRoute.put( "/:prestamoId", verificarRol("admin"), PrestamoController.actualizarPrestamo);
prestamoRoute.delete(
  "/:prestamoId", verificarRol("admin"), PrestamoController.eliminarPrestamo);

module.exports = prestamoRoute;
