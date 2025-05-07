const { Usuarios } = require("../models"); // Importa el modelo de usuario desde el archivo de modelos

class UsuarioService {
  async creaUsuario(usuarioData) {
    console.log("Datos recibidos en el service:", usuarioData);
    try {
      // Crear un nuevo usuario en la base de datos
      const nuevoUsuario = await Usuarios.create(usuarioData);
      return nuevoUsuario;
    } catch (error) {
      // Lanza un error si ocurre un problema en la creación del usuario
      throw new Error("Error al crear el usuario: " + error.message);
    }
  }
}

module.exports = new UsuarioService();
