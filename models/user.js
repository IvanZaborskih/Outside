'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'User must have a email ' },
        notEmpty: { msg: 'Email must not be empty ' }
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'User must have a password ' },
        notEmpty: { msg: 'Password must not be empty ' }
      }
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'User must have a nickname ' },
        notEmpty: { msg: 'Nickname must not be empty ' }
      }
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};