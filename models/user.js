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

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
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
        notEmpty: { msg: 'Email must not be empty ' },
        isEmail: { msg: 'Must be a valid email adress ' }
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
        notEmpty: { msg: 'Nickname must not be empty ' },
        len: {
          args: [5, 30],
          msg: 'Nickname length to be between 5 and 30 characters'
        }
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


        // is: {
        //   args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]$/i,
        //   msg: 'The password must contain at least eight characters, at least one uppercase letter, one lowercase letter and one number'
        // }