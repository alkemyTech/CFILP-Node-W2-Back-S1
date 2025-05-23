const { Prestamo, Usuarios, Libros } = require("../models");
const obtenerSoloFecha = require("../utils/manejoFecha");

const fechaOperacion = obtenerSoloFecha();

class PrestamoService {
  async getAllPrestamos(query) {
    const prestamos = await Prestamo.findAll({
      include: [
        {
          model: Usuarios,
          as: "usuario",
          attributes: ["id", "nombre", "usuario"],
        },
        { model: Libros, as: "libro", attributes: ["id", "titulo", "autor"] },
      ],
      where: query,
    });
    return prestamos;
  }

  async crearPrestamo({ usuarioId, libroId }) {
    const libro = await Libros.findOne({ where: { id: libroId } });

    if (!libro) throw new Error("Libro no encontrado");
    if (!libro.disponibilidad || libro.disponibilidad <= 0)
      throw new Error("Libro no disponible");

    const prestamo = await Prestamo.create({
      usuarioId,
      libroId,
      fechaPrestamo: fechaOperacion,
      estado: "activo",
    });

    // Actualiza la disponibilidad restando 1
    await libro.update({ disponibilidad: libro.disponibilidad - 1 });

    return prestamo;
  }

  async devolverPrestamo(prestamoId) {
    const prestamo = await Prestamo.findByPk(prestamoId);
    if (!prestamo) throw new Error("Préstamo no encontrado");
    if (prestamo.estado === "devuelto") throw new Error("Préstamo ya fue devuelto");

    // Actualizar estado y fecha de devolución
    await prestamo.update({
      estado: "devuelto",
      fechaDevolucion: fechaOperacion,
    });

    // Actualizar disponibilidad del libro asociado
    const libro = await Libros.findByPk(prestamo.libroId);
    if (libro) {
      await libro.update({ disponibilidad: libro.disponibilidad + 1 });
    }

    return prestamo;
  }
}

module.exports = new PrestamoService();
