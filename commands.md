# Comandos de referencia

# Inicializar proyecto
npm init -y

# Instalar dependencias
npm i express sequelize sequelize-cli mysql2 dotenv

# Inicializar sequelize
npx sequelize-cli init

# Generar modelos - Usuarios y Libros
npx sequelize-cli model:generate --name Usuarios --attributes nombre:string,apellido:string,usuario:string,password:string,rol:enum

npx sequelize-cli model:generate --name Libros --attributes isbn:string,titulo:string,categorias:string,autor:string,anio:integer,disponibilidad:boolean