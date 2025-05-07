// Usuarios Service - logica de negocio
const { Usuarios } = require ('../models')


class UsuariosService {
    async getAllUsuarios () {
    return await Usuarios.findAll()
  }
}

module.exports = new UsuariosService ()
