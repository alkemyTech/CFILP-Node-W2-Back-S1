const express = require('express')
const UsuarioController = require('../controllers/usuarioController')

const { validateUserCreate } = require('../middleware/userMiddleware')

const usuarioRoutes = express.Router()

// Crear un nuevo usuario
usuarioRoutes.post('/', validateUserCreate, UsuarioController.creaUsuario)

module.exports = usuarioRoutes
