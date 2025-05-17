const request = require("supertest");
const app = require("../app");
const {
  verificarRespuestaCreado,
  verificarStatusError,
  verificarStatusDuplicado,
} = require("../utils/errorTestCode.js");
const librosService = require("../services/librosService.js");



let campo = "libro";

const libroValido = {
  isbn: Date.now().toString(), // Genera un ISBN único usando la fecha actual
  titulo: "Test Book",
  autor: "Test Author",
  anio: 2023,
  categorias: "Ficcion",
  disponibilidad: true,
};

describe("POST /libros", () => {
  it("debería crear un nuevo libro con datos válidos, codigo 201", async () => {
    const response = await request(app).post("/libros").send(libroValido);
    console.log(libroValido);
    verificarRespuestaCreado(response, 201, campo);
  });

  it("debería devolver un error 400 con datos inválidos, isbn con menos de 10 caracteres", async () => {
    const libroInvalido = { ...libroValido, isbn: "123" };
    const response = await request(app).post("/libros").send(libroInvalido);
    verificarStatusError(response, 400);
  });

  it("debería devolver un error 400 con datos inválidos, titulo con menos de 3 letras", async () => {
    const libroInvalido = { ...libroValido, titulo: "A" };
    const response = await request(app).post("/libros").send(libroInvalido);
    verificarStatusError(response, 400);
  });

  it("debería devolver un error 400 con datos inválidos, autor con menos de 3 letras", async () => {
    const libroInvalido = { ...libroValido, autor: "A" };
    const response = await request(app).post("/libros").send(libroInvalido);
    verificarStatusError(response, 400);
  });

  it("debería devolver un error 400 con datos inválidos, anioPublicacion no es un número", async () => {
    const libroInvalido = {
      ...libroValido,
      anio: 23,
    };
    const response = await request(app).post("/libros").send(libroInvalido);
    verificarStatusError(response, 400);
  });

  it("debería devolver un error 409 con datos inválidos, isbn ya existe", async () => {
    // Primero, crea un libro con el mismo ISBN
    await request(app).post("/libros").send(libroValido);

    // Luego, intenta crear otro libro con el mismo ISBN
    const response = await request(app).post("/libros").send(libroValido);

    campo = "isbn";

    verificarStatusDuplicado(response, 409, campo);
  });

  it("debería devolver un error 500 si ocurre un error en el servidor", async () => {
    jest.spyOn(librosService, "createLibro").mockImplementation(() => {
      throw new Error("Error del servidor");
    });

    const response = await request(app).post("/libros").send(libroValido);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toHaveProperty("message", "Error del servidor");

    librosService.createLibro.mockRestore();
  });
});
