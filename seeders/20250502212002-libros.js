'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Libros', [
      {
        isbn: '978-950-11-3713-2',
        titulo: 'El Principito',
        categorias: '1,3,6',
        autor: 'Antoine de Saint-Exupéry',
        anio: 1943,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: '978-950-547-261-1',
        titulo: 'El Silmarillion',
        categorias: '5,6',
        autor: 'J. R. R. Tolkien',
        anio: 1977,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Libros', null, {})
  }
};
