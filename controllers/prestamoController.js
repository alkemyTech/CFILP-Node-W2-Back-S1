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

  async getPrestamoById(req, res, next) {
    try {
      const { prestamoId } = req.params;
      const prestamo = await PrestamoService.getPrestamoById(prestamoId);
      if (!prestamo) {
        return res.status(404).json({ message: "Préstamo no encontrado" });
      }
      res.status(200).json(prestamo);
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

  async actualizarPrestamo(req, res, next) {
    try {
      const { prestamoId } = req.params;
      const datosActualizados = req.body;

      const prestamoActualizado = await PrestamoService.actualizarPrestamo(
        prestamoId,
        datosActualizados
      );

      res.status(200).json({
        message: "Préstamo actualizado correctamente",
        prestamo: prestamoActualizado,
      });
    } catch (error) {
      next(error);
    }
  }

  async eliminarPrestamo(req, res, next) {
    try {
      const { prestamoId } = req.params;

      await PrestamoService.eliminarPrestamo(prestamoId);

      res.status(200).json({ message: "Préstamo eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  }

  async obternerPrestamosPorUsuario(req, res, next) {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    console.log("Obteniendo préstamos por usuario");
    {
    }
=======
>>>>>>> b125c6f9f6033d18e56ec459cf74276cc25b909d
>>>>>>> Stashed changes
    try {
      const usuarioId = req.user.id;

      const prestamos = await PrestamoService.obtenerPrestamosPorUsuario(
        usuarioId
      );

      res.status(200).json(prestamos);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PrestamoController();
