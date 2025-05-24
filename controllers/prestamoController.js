const PrestamoService = require("../services/prestamoService");

class PrestamoController {
  async getAllPrestamos(req, res, next) {
    try {
      const prestamos = await PrestamoService.getAllPrestamos(req.query);
      res.status(200).send(prestamos);
    } catch (error) {
      next(error);
    }
  }

  async solicitarPrestamo(req, res, next) {
    try {
      const usuarioId = req.user.id;
      const libroId = req.body.id;

      const prestamoCreado = await PrestamoService.crearPrestamo({
        usuarioId,
        libroId,
      });

      res.status(201).json({
        message: "Préstamo registrado correctamente",
        prestamo: prestamoCreado,
      });
    } catch (error) {
      next(error);
    }
  }

  async devolverLibro(req, res, next) {
    try {
      const { prestamoId } = req.params;

      await PrestamoService.devolverPrestamo(prestamoId);

      res.status(200).json({ message: "Libro devuelto correctamente" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PrestamoController();
