const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

const doc = {
    info: {
        title: 'Api de Biblioteca',
        description: 'Esta Api permite gestionar usuarios y libros',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
