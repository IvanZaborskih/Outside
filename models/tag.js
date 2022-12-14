'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, UserTag }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'creator_uuid', as: 'creator' });
      this.belongsToMany(User, { through: UserTag });
    }
  }
  Tag.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    creator_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Tag must have a name ' },
        notEmpty: { msg: 'Tag must not be empty ' },
        len: {
          args: [4, 40],
          msg: 'Name length to be between 4 and 40 characters'
        }
      }
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: 'tags',
    modelName: 'Tag',
  });
  return Tag;
};