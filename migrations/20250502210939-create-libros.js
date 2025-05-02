'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Libros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isbn: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categorias: {
        type: Sequelize.STRING,
        allowNull: false
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      anio: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      disponibilidad: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    // agregar indices no clusterizados
    await queryInterface.addIndex('Libros', ['isbn'], { unique: true, name: 'idx_libros_isbn' })
    await queryInterface.addIndex('Libros', ['titulo'], { name: 'idx_libros_titulo' })
    await queryInterface.addIndex('Libros', ['autor'], { name: 'idx_libros_autor' })
    await queryInterface.addIndex('Libros', ['categorias'], { name: 'idx_libros_categorias' })
    await queryInterface.addIndex('Libros', ['disponibilidad'], { name: 'idx_libros_disponibilidad' })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Libros');
  }
};