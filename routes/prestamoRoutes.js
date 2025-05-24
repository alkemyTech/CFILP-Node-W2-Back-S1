const express = require("express");
const PrestamoController = require("../controllers/prestamoController");
const authMiddleware = require("../middleware/authMiddleware");
const { validaPrestamo } = require("../middleware/prestamoMiddleware");
const prestamoRoute = express.Router();


// Todas las siguientes rutas requieren autenticación
prestamoRoute.use(authMiddleware);
// Rutas para manejar préstamos de libros
prestamoRoute.get("/", PrestamoController.getAllPrestamos);
prestamoRoute.post("/", validaPrestamo, PrestamoController.solicitarPrestamo);
prestamoRoute.post("/:prestamoId/devolver", PrestamoController.devolverLibro);

module.exports = prestamoRoute;
