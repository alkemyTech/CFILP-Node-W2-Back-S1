'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword1 = await bcrypt.hash('adminpass', 10)
    await queryInterface.bulkUpdate('Usuarios', { password: hashedPassword1 }, { id: 1 })

    const hashedPassword2 = await bcrypt.hash('userpass', 10)
    await queryInterface.bulkUpdate('Usuarios', { password: hashedPassword2 }, { id: 2 })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
