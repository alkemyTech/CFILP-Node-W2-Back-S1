const axios = require("axios")
const chalk = require("chalk")
const readlineSync = require("readline-sync")
const { CustomError, handleApiError } = require("./utils/errorHandler")

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json"
  }
})

// Iniciar sesión
const handleLogin = async () => {
  console.log(chalk.cyan("\nIniciar sesión"))
  const usuario = readlineSync.question(chalk.yellow("Usuario: "))
  const password = readlineSync.question(chalk.yellow("Contrasena: "), { hideEchoBack: true })

  try {
    console.log("Iniciando sesión...")
    const response = await api.post("/usuarios/login", { usuario, password })
    api.defaults.headers.common["Authorization"] = "Bearer " + response.data.token
    console.log(chalk.green("Éxito: ") + chalk.white(response.data.message))
  } catch (error) {
    const apiError = handleApiError(error)
    console.log(chalk.red("Error: ") + chalk.white(apiError.message))
  }
}

// Ver perfil
const handleProfile = async () => {
  console.log(chalk.cyan("\nVer perfil"))

  try {
    const response = await api.get("/usuarios/perfil")
    console.log(chalk.green("Perfil:"))
    console.log(chalk.white(JSON.stringify(response.data, null, 2)))
  } catch (error) {
    const apiError = handleApiError(error)
    console.log(chalk.red("Error: ") + chalk.white(apiError.message))
  }
}

const exit = () => {
  console.log(chalk.cyan("¡Adiós!"))
  process.exit(0)
}

const notValidOption = () => {
  console.log(chalk.red("Opción inválida, intenta de nuevo."))
}

const runMenu = async () => {
  process.stdout.write("\x1Bc")
  console.log(chalk.cyan.bold("Bienvenido a Alke-Biblioteca"))
  
  while (true) {
    const isLogged = !!api.defaults.headers.common["Authorization"]

    console.log(chalk.cyan.bold("\n=== Menú ==="))
    if (isLogged) {
      console.log(chalk.yellow("1. Ver perfil"))
      console.log(chalk.yellow("2. Cerrar sesión"))
      console.log(chalk.yellow("3. Salir"))
    } else {
      console.log(chalk.yellow("1. Iniciar sesión"))
      console.log(chalk.yellow("2. Salir"))
    }

    const choice = readlineSync.question(
      chalk.yellow("Selecciona una opcion: ")
    )

    process.stdout.write("\x1Bc")

    if (isLogged) {
      switch (choice) {
        case "1":
          await handleProfile()
          break
        case "2":
          console.log(chalk.cyan("Cerrando sesión..."))
          api.defaults.headers.common["Authorization"] = null
          break
        case "3":
          exit()
          break
        default:
          notValidOption()
      }
    } else {
      switch (choice) {
        case "1":
          await handleLogin()
          break
        case "2":
          exit()
          break
        default:
          notValidOption()
      }
    }
  }
}

runMenu()
