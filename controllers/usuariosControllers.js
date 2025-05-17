//Usuarios Controller - solicitudes HTTP
const UsuariosService = require("../services/usuariosService");

class UsuariosController {
  //Obtener Usuarios
  async getAllUsuarios(req, res, next) {
    try {
      const usuarios = await UsuariosService.getAllUsuarios();

      res.status(200).send(usuarios);
    } catch (error) {
      next(error);
    }
  }

  // Crear Usuario
async createUsuario(req, res, next) {
  try {
    const { nombre, apellido, usuario, password } = req.body;
    const nuevoUsuario = await UsuariosService.createUsuario({ nombre, apellido, usuario, password });
    return res.status(201).json({ usuario: nuevoUsuario });
  } catch (error) {
    next(error);
  }
}

  // Actualizar Usuario
  async updateUsuario(req, res, next) {
    try {
      const { id } = req.params;
      const { nombre, apellido, usuarios } = req.body;
      await UsuariosService.updateUsuario(id, { nombre, apellido, usuarios });

      return res
        .status(200)
        .json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
      next(error);
    }
  }

  // Borrar Usuario
  async deleteUsuario(req, res, next) {
    try {
      await UsuariosService.deleteUsuario(req.params.id);

      return res.status(200).json({ message: "Usuario fue eliminado" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsuariosController();
