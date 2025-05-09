// UsuarioRoutes - endpoints
const express = require ("express")
const UsuariosController = require('../controllers/usuariosControllers')

const UsuarioRouter = express.Router()

// Consultar todos los Usuarios 
UsuarioRouter.get('/', UsuariosController.getAllUsuarios)

// Crear un usuario
UsuarioRouter.post('/', UsuariosController.createUsuario)

// Modificar un usuario
UsuarioRouter.put('/:id', UsuariosController.updateUsuario)

// Borrar un usuario
UsuarioRouter.delete('/:id', UsuariosController.deleteUsuario)

module.exports = UsuarioRouter
