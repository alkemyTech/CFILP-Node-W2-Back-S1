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

  async crearPrestamo({ usuarioId, titulo }) {
    const libro = await Libros.findOne({ where: { titulo } });

    if (!libro) throw new Error("Libro no encontrado");
    if (!libro.disponibilidad) throw new Error("Libro no disponible");

    const prestamo = await Prestamo.create({
      usuarioId,
      libroId: libro.id,
      fechaPrestamo: fechaOperacion,
      estado: "activo",
    });

    await libro.update({ disponibilidad: libro.disponibilidad - 1 });

    return prestamo;
  }

  async devolverPrestamo(prestamoId) {
    const prestamo = await Prestamo.findByPk(prestamoId);
    if (!prestamo) throw new Error("Préstamo no encontrado");
    if (prestamo.estado === "devuelto")
      throw new Error("Préstamo ya fue devuelto");

    // Actualizar estado del préstamo
    await prestamo.update({
      estado: "devuelto",
      fechaDevolucion: fechaOperacion, // Asignar la fecha de devolución
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
