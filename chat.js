const axios = require("axios")
const chalk = require("chalk")
const readlineSync = require("readline-sync")
const { handleApiError } = require("./utils/errorHandler")

const formatError = (err) => {
  console.log(chalk.red("Error: ") + chalk.white(handleApiError(err).message))
}

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json"
  }
})

let isAdmin = false
let SCREEN = 'HOME'

// Iniciar sesión
const handleLogin = async () => {
  SCREEN = 'LOGIN'
  console.log(chalk.cyan("\nIniciar sesión"))
  const usuario = readlineSync.question(chalk.yellow("Usuario: "))
  const password = readlineSync.question(chalk.yellow("Contrasena: "), { hideEchoBack: true })

  try {
    console.log("Iniciando sesión...")
    const response = await api.post("/usuarios/login", { usuario, password })
    api.defaults.headers.common["Authorization"] = "Bearer " + response.data.token
    
    const rolResponse = await api.get("/usuarios/perfil")
    isAdmin = rolResponse.data.data.rol === "admin"

    console.log(chalk.green("Éxito: ") + chalk.white(response.data.message))

    console.log(chalk.green.bold("\n¡Bienvenido!"))
    console.log(chalk.white.bgGreen("¿Qué deseas hacer?"))
  } catch (error) {
    formatError(error)
  }
}

// Ver perfil
const handleProfile = async () => {
  SCREEN = 'PERFIL'
  console.log(chalk.cyan("\nPerfil"))
  try {
    const response = await api.get("/usuarios/perfil")
    const { nombre, apellido, usuario } = response.data.data
    if (isAdmin) console.log(chalk.white.bgGreen(" Eres Administrador "))
    console.log(chalk.green("Nombre y Apellido: ") + chalk.white(`${nombre} ${apellido}`))
    console.log(chalk.green("Usuario: ") + chalk.white(usuario))
  } catch (error) {
    formatError(error)
  }
}

const handleLogout = () => {
  SCREEN = 'HOME'
  console.log(chalk.cyan("Cerrando sesión..."))
  api.defaults.headers.common["Authorization"] = null
}

const showLibrary = async (key = null) => {
  SCREEN = 'LIBRERIA'
  console.log(chalk.cyan("Librería"))
  console.log(chalk.yellow("[S] Seleccionar un libro"))
  console.log(chalk.yellow("[M] Mis libros"))
  try {
    const response = await api.get("/libros")
    for (const book of response.data) {
      console.log(
        chalk.green("\n--- Libro"), chalk.yellow(`ID: ${book.id}`), chalk.green("---")
      )
      console.log(chalk.green("Título: ") + chalk.white(book.titulo))
      console.log(chalk.green("Autor: ") + chalk.white(book.autor))
      console.log(chalk.green("Año: ") + chalk.white(book.anio))
      console.log(chalk.green("Categorias: ") + chalk.white(book.categorias))
    }
    if (key === 's') {
      console.log(chalk.blue("\nSelecciona un libro"))
      const id = readlineSync.question(chalk.yellow("ID del libro: "))
      try {
        const response = await api.get(`/libros/${id}`)
        console.log(chalk.green("Libro seleccionado: ") + chalk.white(response.data.titulo))
        console.log(chalk.yellow("\n[1] Agregar a Mis Libros"))
        console.log(chalk.yellow("[2] Cancelar"))
        const option = readlineSync.question(chalk.cyan("Selecciona una opcion: "))
        if (option === '1') {
          try {
            const response = await api.post(`/libros/${id}/agregar`)
            console.log(chalk.green("Éxito: ") + chalk.white(response.data.message))
          } catch (error) {
            formatError(error)
          }
        } else {
          console.log(chalk.red("Operación cancelada"))
        }
      } catch (error) {
        formatError(error)
      }
    }
  } catch (error) {
    formatError(error)
  }
}

const exit = () => {
  SCREEN = 'HOME'
  console.log(chalk.cyan("¡Adiós!"))
  process.exit(0)
}

const otherOption = async (key) => {
  if (SCREEN === 'LIBRERIA') {
    await showLibrary(key)
  }
}

const notValidOption = () => {
  console.log(chalk.red("Opción inválida, intenta de nuevo."))
}

const showMenu = (isLogged) => {
  console.log(chalk.cyan.bold("\n=== Menú ==="))
  if (isLogged) {
    console.log(chalk.yellow("[1] Librería"))
    console.log(chalk.yellow("[2] Ver perfil"))
    console.log(chalk.yellow("[3] Cerrar sesión"))
    console.log(chalk.yellow("[4] Salir"))
    if (isAdmin) {
      console.log(chalk.green("\n=== Menú Administrador ==="))
      console.log(chalk.cyan("[Usuarios]"))
      console.log(chalk.yellow("[5] Crear Usuario"))
      console.log(chalk.yellow("[6] Editar Usuario"))
      console.log(chalk.yellow("[7] Eliminar Usuario"))
      console.log(chalk.cyan("[Libros]"))
      console.log(chalk.yellow("[8] Crear Libro"))
      console.log(chalk.yellow("[9] Editar Libro"))
      console.log(chalk.yellow("[0] Eliminar Libro"))
    }
  } else {
    console.log(chalk.yellow("[1] Iniciar sesión"))
    console.log(chalk.yellow("[2] Salir"))
  }
}

const runMenu = async () => {
  process.stdout.write("\x1Bc")
  console.log(chalk.cyan.bold("Bienvenido a Alke-Biblioteca"))

  while (true) {
    const isLogged = !!api.defaults.headers.common["Authorization"]

    showMenu(isLogged)

    const key = readlineSync.keyIn('', { hideEchoBack: true, mask: '' })

    process.stdout.write("\x1Bc")
    console.log(chalk.bgGreen.bold("====== [ Alke-Biblioteca ] ======\n"))

    if (isLogged) {
      switch (key) {
        case "1":
          await showLibrary()
          break
        case "2":
          await handleProfile()
          break
        case "3":
          handleLogout()
          break
        case "4":
          exit()
          break
        default:
          await otherOption(key)
      }
    } else {
      switch (key) {
        case "1":
          await handleLogin()
          break
        case "2":
          exit()
          break
        default:
          await otherOption(key)
      }
    }
  }
}

runMenu()
