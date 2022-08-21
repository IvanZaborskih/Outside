'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users_tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      tag_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users_tags');
  }
};