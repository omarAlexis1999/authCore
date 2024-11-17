'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rol', [
      {
        id: uuidv4(), // Genera un UUID automáticamente si usas UUIDs
        name: 'USER',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(), // Genera un UUID automáticamente si usas UUIDs
        name: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Esto elimina los registros si haces un rollback
    await queryInterface.bulkDelete('Rol', null, {});
  }
};
