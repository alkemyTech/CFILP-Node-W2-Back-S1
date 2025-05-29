// UsuarioRoutes - endpoints
const express = require("express");
const usuariosController = require("../controllers/usuariosController");
const { validaCamposUsuario, validateLogin } = require("../middleware/userMiddleware");
const { verificarRol } = require("../middleware/verificarRolMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const usuariosRouter = express.Router();

// Logear para obtener un token
usuariosRouter.post("/login", validateLogin, usuariosController.loginUsuario);

// Crear un usuario
usuariosRouter.post("/", validaCamposUsuario("POST"), usuariosController.createUsuario);

// Todas las siguientes rutas requieren autenticación
usuariosRouter.use(authMiddleware);

// Obtener perfil del usuario
usuariosRouter.get("/perfil", usuariosController.perfilUsuario);

// Consultar todos los Usuarios
usuariosRouter.get(
  "/", verificarRol("admin"), usuariosController.getAllUsuarios
);

// Modificar un usuario
usuariosRouter.put(
  "/:id", verificarRol("admin"), validaCamposUsuario("PUT"), usuariosController.updateUsuario
);

// Borrar un usuario
usuariosRouter.delete(
  "/:id", verificarRol("admin"), usuariosController.deleteUsuario
);

module.exports = usuariosRouter;
