const inquirer = require('inquirer')
const axios = require('axios')
const chalk = require('chalk')

const API_URL = 'http://localhost:3000'

let user = {}

function formatError(error, message) {
  console.error(chalk.red(message, error.response?.data?.message || error.message))
}

function inquirerPrompt(type, name, message, opt = {}) {
  if (type === 'continue') {
    return {
      type: 'input',
      name: 'continue',
      message: 'Presiona Enter para continuar...'
    }
  }
  return { type, name, message, ...opt }
}

function clearTerminal() {
  // Código ANSI para limpiar la terminal
  process.stdout.write('\x1Bc')

  // Titulo
  console.log(chalk.blue.bold('=== Alke-Biblioteca ===\n'))
}

// Iniciar sesión
async function handleLogin() {
  clearTerminal()
  console.log(chalk.blue.bold('=== Iniciar Sesión ==='))
  const { usuario, password } = await inquirer.prompt([
    inquirerPrompt('input', 'usuario', 'Usuario:'),
    inquirerPrompt('password', 'password', 'Contraseña:', { mask: '*' })
  ])

  try {
    const response = await axios.post(`${API_URL}/usuarios/login`, { usuario, password })
    user = { ...response.data.user, token: response.data.token }
    console.log(chalk.green('¡Bienvenido!'))
    return true // Login exitoso
  } catch (error) {
    formatError(error, 'Error al iniciar sesión:')
    return false // Login falló
  }
}

// Ver librería
async function viewLibrary() {
  clearTerminal()
  console.log(chalk.blue.bold('=== Librería ==='))
  try {
    const response = await axios.get(`${API_URL}/libros`)
    const books = response.data
    books.forEach(book => {
      console.log(chalk.cyan(`- ${book.titulo} (ID: ${book.id})`))
    })
  } catch (error) {
    formatError(error, 'Error al obtener libros:')
  }
}

// Ver mi biblioteca
async function viewMyLibrary() {
  clearTerminal()
  console.log(chalk.blue.bold('=== Mi Biblioteca ==='))
  try {
    // const response = await axios.get(`${API_URL}/usuarios/${user.id}/libros`, {
    //   headers: { Authorization: `Bearer ${TOKEN}` },
    // })
    const myBooks = [] //response.data
    if (myBooks.length === 0) {
      console.log(chalk.yellow('No tienes libros en tu biblioteca.'))
    } else {
      myBooks.forEach(book => {
        console.log(chalk.cyan(`- ${book.titulo} (ID: ${book.id})`))
      })
    }
  } catch (error) {
    formatError(error, 'Error al obtener tu biblioteca:')
  }
}

// Añadir un libro a mi biblioteca
async function addBookToLibrary() {
  clearTerminal()
  console.log(chalk.blue.bold('=== Añadir Libro ==='))
  const { libroID } = await inquirer.prompt([
    inquirerPrompt('input', 'libroID', 'Ingresa el ID del libro a añadir:')
  ])

  try {
    // await axios.post(
    //   `${API_URL}/usuarios/${user.id}/libros`,
    //   { bookId: answers.bookId },
    //   { headers: { Authorization: `Bearer ${TOKEN}` } }
    // )
    console.log(chalk.green('Libro añadido a tu biblioteca.'+ libroID))
  } catch (error) {
    formatError(error, 'Error al añadir libro:')
  }
}

// Ver perfil
async function viewProfile() {
  clearTerminal()
  console.log(chalk.blue.bold('=== Mi Perfil ==='))
  try {
    console.log(chalk.cyan(`Nombre: ${user.nombre}`))
    console.log(chalk.cyan(`Usuario: ${user.usuario}`))
  } catch (error) {
    formatError(error, 'Error al obtener perfil:')
  }
}

// Menú principal (bucle)
async function runMenu() {
  while (true) {
    clearTerminal()
    console.log(chalk.blue.bold('=== Bienvenido a Alke-Biblioteca ===\n'))
    const answers = await inquirer.prompt([
      inquirerPrompt('list', 'choice', 'Selecciona una opción:', {
        choices: [
          { name: '1. Iniciar sesión', value: 'login' },
          { name: '2. Salir', value: 'exit' }
        ]
      })
    ])

    if (answers.choice === 'login') {
      const loggedIn = await handleLogin()
      if (loggedIn) {
        await loggedMenu()
      }
    } else if (answers.choice === 'exit') {
      clearTerminal()
      console.log(chalk.yellow('¡Hasta pronto!'))
      process.exit(0)
    }
  }
}

// Menú logueado (bucle)
async function loggedMenu() {
  while (true) {
    clearTerminal()
    console.log(chalk.blue.bold('=== Menú Principal ==='))
    const answers = await inquirer.prompt([
      inquirerPrompt('list', 'choice', 'Selecciona una opción:', {
        choices: [
          { name: '1. Ver librería', value: 'viewLibrary' },
          { name: '2. Mi biblioteca', value: 'viewMyLibrary' },
          { name: '3. Añadir libro a mi biblioteca', value: 'addBook' },
          { name: '4. Mi perfil', value: 'viewProfile' },
          { name: '5. Cerrar sesión', value: 'logout' },
          { name: '6. Salir', value: 'exit' }
        ]
      })
    ])

    switch (answers.choice) {
      case 'viewLibrary':
        await viewLibrary()
        await inquirer.prompt(inquirerPrompt('continue'))
        break
      case 'viewMyLibrary':
        await viewMyLibrary()
        await inquirer.prompt(inquirerPrompt('continue'))
        break
      case 'addBook':
        await addBookToLibrary()
        await inquirer.prompt(inquirerPrompt('continue'))
        break
      case 'viewProfile':
        await viewProfile()
        await inquirer.prompt(inquirerPrompt('continue'))
        break
      case 'logout':
        user = {}
        console.log(chalk.yellow('Sesión cerrada.'))
        await inquirer.prompt(inquirerPrompt('continue'))
        return // Sale del bucle logueado y vuelve al menú principal
      case 'exit':
        clearTerminal()
        console.log(chalk.yellow('¡Hasta pronto!'))
        process.exit(0)
    }
  }
}

async function startApp() {
  await runMenu()
}

startApp().catch(err => {
  formatError(err, 'Error al iniciar la aplicación:')
})
