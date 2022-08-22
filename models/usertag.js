'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Tag, UserTag }) {
      // define association here
    }
  }
  UserTag.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_uuid: {
      type: DataTypes.UUID
    },
    tag_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: 'users_tags',
    modelName: 'UserTag',
  });
  return UserTag;
};