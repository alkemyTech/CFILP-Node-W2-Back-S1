const inquirer = require('inquirer')
const axios = require('axios')
const chalk = require('chalk')

const API_URL = 'http://localhost:3000'

let user = {}

let BOOKS = []

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
  if (user.rol === 'admin') console.log(chalk.bgGreen("Eres administrador\n"))
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
  try {
    const response = await axios.get(`${API_URL}/libros`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    BOOKS = response.data

    // Submenú específico para viewLibrary
    while (true) {
      clearTerminal()
      console.log(chalk.blue.bold('=== Librería ==='))
      BOOKS.forEach(book => {
        console.log(
          chalk.green("\n---"),
          chalk.cyan(book.titulo),
          chalk.yellow(`ID: ${book.id}`),
          chalk.green("---")
        )
        console.log(chalk.green("Autor:"), chalk.white(book.autor))
        console.log(chalk.green("Año:"), chalk.white(book.anio))
        console.log(
          chalk.green("Categorias:"),
          chalk.white(book.categorias).split(",").join(", ")
        )
      })
      console.log(chalk.blue('\n=== Opciones de Librería ==='))
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Selecciona una opción:',
          choices: [
            { name: '1. Ver detalles de un libro', value: 'viewBookDetails' },
            { name: '2. Añadir libro a mi biblioteca', value: 'addBook' },
            { name: '3. Volver al menú principal', value: 'back' },
          ],
        },
      ])

      switch (answers.choice) {
        case 'viewBookDetails':
          await viewBookDetails()
          break
        case 'addBook':
          await addBookToLibrary()
          break
        case 'back':
          return // Vuelve al menú principal
      }
    }
  } catch (error) {
    formatError(error, 'Error al obtener libros:')
  }
}

async function viewBookDetails() {
  try {
    const { id } = await inquirer.prompt(
      inquirerPrompt('input', 'id', 'Ingresa el ID del libro a seleccionar:')
    )
    const book = BOOKS.find(book => book.id === Number(id))
    if (!book) {
      console.log(chalk.yellow('No se encontró el libro seleccionado.'))
      return
    }
    console.log(
      chalk.green("\n---"),
      chalk.cyan(book.titulo),
      chalk.yellow(`ID: ${book.id}`),
      chalk.green("---")
    )
    console.log(chalk.green("Autor:"), chalk.white(book.autor))
    console.log(chalk.green("ISBN:"), chalk.white(book.isbn))
    console.log(chalk.green("Año:"), chalk.white(book.anio))
    console.log(
      chalk.green("Categorias:"),
      chalk.white(book.categorias).split(",").join(", ")
    )
    console.log(chalk.green("Disponibles:"), chalk.white(book.disponibilidad))
  } catch (error) {
    formatError(error, 'Error al obtener perfil:')
  }
  await inquirer.prompt(inquirerPrompt('continue'))
}

// Ver mi biblioteca
async function viewMyLibrary() {
  clearTerminal()
  console.log(chalk.blue.bold('=== Mi Biblioteca ==='))
  try {
    const response = await axios.get(`${API_URL}/prestamos/usuarioPrestamos`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    const myBooks = response.data
    if (myBooks.length === 0) {
      console.log(chalk.yellow('No tienes libros en tu biblioteca.'))
    } else {
      BOOKS.filter(book => myBooks.find(myBook => myBook.libroId === book.id)).forEach(book => { 
        console.log(
          chalk.green("\n---"),
          chalk.cyan(book.titulo),
          chalk.yellow(`ID: ${book.id}`),
          chalk.green("---")
        )
        console.log(chalk.green("Autor:"), chalk.white(book.autor))
        console.log(chalk.green("Año:"), chalk.white(book.anio))
        console.log(
          chalk.green("Categorias:"),
          chalk.white(book.categorias).split(",").join(", ")
        )
      })
      console.log("\n")
    }
  } catch (error) {
    formatError(error, 'Error al obtener perfil:')
  }
}

// Añadir un libro a mi biblioteca
async function addBookToLibrary() {
  const { id } = await inquirer.prompt(
    inquirerPrompt('input', 'id', 'Ingresa el ID del libro a añadir:')
  )

  try {
    await axios.post(`${API_URL}/prestamos`, { id },
      { headers: { Authorization: `Bearer ${user.token}` } }
    )
    console.log(chalk.green('Libro añadido a tu biblioteca.'))
  } catch (error) {
    formatError(error, 'Error al añadir libro:')
  }

  await inquirer.prompt(inquirerPrompt('continue'))
}

// Ver perfil
async function viewProfile() {
  clearTerminal()
  console.log(chalk.blue.bold('=== Mi Perfil ==='))
  try {
    console.log(chalk.cyan(`\nNombre: ${user.nombre} ${user.apellido}`))
    console.log(chalk.cyan(`\nUsuario: ${user.usuario}`))
    console.log(chalk.white(`\nCreado el ${new Date(user.createdAt).toLocaleDateString(
      'es-ES',
      { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    )}`))
    console.log("\n")
  } catch (error) {
    formatError(error, 'Error al obtener perfil:')
  }
}

async function adminUsers() {
  clearTerminal()
  console.log(chalk.blue.bold('=== Administrador Usuarios ==='))
  const answers = await inquirer.prompt([
    inquirerPrompt('list', 'choice', 'Selecciona una opción:', {
      choices: [
        { name: '1. Listar usuarios', value: 'listUsers' },
        { name: '2. Crear usuario', value: 'createUser' },
        { name: '3. Modificar usuario', value: 'modifyUser' },
        { name: '4. Borrar usuario', value: 'deleteUser' },
        { name: '5. Salir', value: 'exit' }
      ]
    })
  ])

  switch (answers.choice) {
    case 'listUsers':
      await listUsers()
      break
    case 'createUser':
      //await createUser()
      break
    case 'modifyUser':
      //await modifyUser()
      break
    case 'deleteUser':
      //await deleteUser()
      break
    case 'exit':
      return
  }
}

async function listUsers() {
  try {
    const response = await axios.get(`${API_URL}/usuarios`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    const users = response.data
    if (users.length === 0) {
      console.log(chalk.yellow('No hay usuarios en la base de datos.'))
    } else {
      users.forEach(getUser => {
        console.log(
          chalk.green("\n---"),
          chalk.cyan(getUser.usuario),
          chalk.yellow(`ID: ${getUser.id}`),
          chalk.green("---")
        )
        console.log(
          chalk.green("Nombre:"), chalk.white(`${getUser.nombre} ${getUser.apellido}`)
        )
        console.log(chalk.green("Rol:"), chalk.white(getUser.rol))
        console.log(chalk.green("Creado el:"), chalk.white(getUser.createdAt))
      })
      console.log("\n")
    }
  } catch (error) {
    formatError(error, 'Error al obtener usuarios:')
  }
}

async function adminBooks() {
  clearTerminal()
  console.log(chalk.blue.bold('=== Administrador Libros ==='))
  const answers = await inquirer.prompt([
    inquirerPrompt('list', 'choice', 'Selecciona una opción:', {
      choices: [
        { name: '1. Listar libros', value: 'listBooks' },
        { name: '2. Crear libro', value: 'createBook' },
        { name: '3. Modificar libro', value: 'modifyBook' },
        { name: '4. Borrar libro', value: 'deleteBook' },
        { name: '5. Salir', value: 'exit' }
      ]
    })
  ])

  switch (answers.choice) {
    case 'listBooks':
      await listBooks()
      break
    case 'createBook':
      //await createBook()
      break
    case 'modifyBook':
      //await modifyBook()
      break
    case 'deleteBook':
      //await deleteBook()
      break
    case 'exit':
      return
  }
}

async function listBooks() {
  try {
    const response = await axios.get(`${API_URL}/libros`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    BOOKS = response.data
    if (BOOKS.length === 0) {
      console.log(chalk.yellow('No hay libros en la base de datos.'))
    } else {
      BOOKS.forEach(book => {
        console.log(
          chalk.green("\n---"),
          chalk.cyan(book.titulo),
          chalk.yellow(`ID: ${book.id}`),
          chalk.green("---")
        )
        console.log(chalk.green("Autor:"), chalk.white(book.autor))
        console.log(chalk.green("Año:"), chalk.white(book.anio))
        console.log(
          chalk.green("Categorias:"),
          chalk.white(book.categorias).split(",").join(", ")
        )
      })
      console.log("\n")
    }
  } catch (error) {
    formatError(error, 'Error al obtener usuarios:')
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

    const choices = [
      { name: '1. Ver librería', value: 'viewLibrary' },
      { name: '2. Mi biblioteca', value: 'viewMyLibrary' },
      { name: '3. Mi perfil', value: 'viewProfile' },
      { name: '4. Cerrar sesión', value: 'logout' },
      { name: '5. Salir', value: 'exit' }
    ]

    if (user.rol === 'admin') {
      choices.push(new inquirer.Separator())
      choices.push({ name: 'Admin Usuarios', value: 'adminUsers' })
      choices.push({ name: 'Admin Libros', value: 'adminBooks' })
      choices.push({ name: 'Admin Prestamos', value: 'adminPrestamos' })
      choices.push(new inquirer.Separator())
    }

    const answers = await inquirer.prompt([
      inquirerPrompt('list', 'choice', 'Selecciona una opción:', { choices })
    ])

    switch (answers.choice) {
      case 'adminUsers':
        await adminUsers()
        await inquirer.prompt(inquirerPrompt('continue'))
        break
      case 'adminBooks':
        await adminBooks()
        await inquirer.prompt(inquirerPrompt('continue'))
        break
      case 'adminPrestamos':
        await adminPrestamos()
        await inquirer.prompt(inquirerPrompt('continue'))
        break
      case 'viewLibrary':
        await viewLibrary()
        await inquirer.prompt(inquirerPrompt('continue'))
        break
      case 'viewMyLibrary':
        await viewMyLibrary()
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
