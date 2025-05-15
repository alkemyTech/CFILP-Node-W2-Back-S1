const request = require("supertest");
const app = require("../app");
const UsuariosService = require("../services/usuariosService");
const {
  verificarRespuestaUsuarioCreado,
  verificarStatusError,
  verificarStatusDuplicado,
  verificarStatusErrorServidor,
} = require("../utils/errorTestCode.js");

const usuarioValido = {
  nombre: "Test",
  apellido: "Test",
  usuario: "TestUser7",
  password: "password123",
};

describe("POST /usuarios", () => {
  it("debería crear un nuevo usuario con datos válidos, codigo 201", async () => {
    const response = await request(app).post("/usuarios").send(usuarioValido);
    verificarRespuestaUsuarioCreado(response, 201);
  });

  it("debería devolver un error 400 con datos inválidos, nombre con menos de 3 letras", async () => {
    const usuarioInvalido = { ...usuarioValido, nombre: "M" };
    const response = await request(app).post("/usuarios").send(usuarioInvalido);

    verificarStatusError(response, 400);
  });

  it("debería devolver un error 400 con datos inválidos, apellido con menos de 3 letras", async () => {
    const usuarioInvalido = { ...usuarioValido, apellido: "A" };
    const response = await request(app).post("/usuarios").send(usuarioInvalido);

    verificarStatusError(response, 400);
  });
  it("debería devolver un error 400 con datos inválidos, usuario con menos de 3 letras", async () => {
    const usuarioInvalido = { ...usuarioValido, usuario: "T" };
    const response = await request(app).post("/usuarios").send(usuarioInvalido);
    verificarStatusError(response, 400);
  });

  it("debería devolver un error 400 con datos inválidos, password con menos de 6 letras", async () => {
    const usuarioInvalido = { ...usuarioValido, password: "E" };
    const response = await request(app).post("/usuarios").send(usuarioInvalido);
    verificarStatusError(response, 400);
  });

  it("debería devolver un error 409 con datos inválidos, usuario ya existe", async () => {
    // Primero, crea un usuario con el mismo nombre de usuario
    await request(app).post("/usuarios").send(usuarioValido);

    // Luego, intenta crear otro usuario con el mismo nombre de usuario
    const response = await request(app).post("/usuarios").send(usuarioValido);

    verificarStatusDuplicado(response, 409);
  });

  it("debería devolver un error 500 si ocurre un error en el servidor", async () => {
    jest.spyOn(UsuariosService, "createUsuario").mockImplementation(() => {
      throw new Error("Error del servidor");
    });

    const response = await request(app).post("/usuarios").send(usuarioValido);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toHaveProperty("message", "Error del servidor");

    UsuariosService.createUsuario.mockRestore();
  });
});
