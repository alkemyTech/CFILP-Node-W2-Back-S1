// UsuarioRoutes - endpoints
const express = require("express")
const usuariosController = require("../controllers/usuariosControllers")

const validateUser = require("../middleware/userMiddleware")

const usuariosRouter = express.Router()

// Consultar todos los Usuarios
usuariosRouter.get('/', usuariosController.getAllUsuarios)

// Crear un usuario
usuariosRouter.post('/', validateUser, usuariosController.createUsuario)

// Modificar un usuario
usuariosRouter.put('/:id', validateUser, usuariosController.updateUsuario)

// Borrar un usuario
usuariosRouter.delete('/:id', usuariosController.deleteUsuario)

module.exports = usuariosRouter
