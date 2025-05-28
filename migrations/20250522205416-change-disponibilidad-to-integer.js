'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Libros', 'disponibilidad', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Libros', 'disponibilidad', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });
  }
};
