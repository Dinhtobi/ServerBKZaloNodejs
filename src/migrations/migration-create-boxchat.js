'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BoxChats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_sender: {
        type: Sequelize.INTEGER
      },
      id_receiver: {
        type: Sequelize.INTEGER
      },
      lastmessage: {
        type: Sequelize.STRING
      },
      namesender: {
        type: Sequelize.STRING
      },
      namereceiver: {
        type: Sequelize.STRING
      },
      urlsender: {
        type: Sequelize.STRING
      },
      urlreceiver: {
        type: Sequelize.STRING
      },
      namegroup: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      createAt: {
        type: Sequelize.STRING
      },
      id_groupchat: {
        type: Sequelize.INTEGER
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BoxChats');
  }
};