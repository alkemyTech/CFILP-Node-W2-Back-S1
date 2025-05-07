// UsuarioRoutes - endpoints
const express = require ("express")
const UsuariosController = require('../controllers/usuariosControllers')

const UsuarioRouter = express.Router()

// Consultar todos los Usuarios 
UsuarioRouter.get('/', UsuariosController.getAllUsuarios)

module.exports = UsuarioRouter
