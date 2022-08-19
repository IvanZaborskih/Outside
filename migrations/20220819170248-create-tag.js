'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      creator: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      sortOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('tags');
  }
};