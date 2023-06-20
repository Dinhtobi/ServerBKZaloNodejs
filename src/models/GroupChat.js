'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupChat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GroupChat.init({
    namegroup: DataTypes.STRING,
    id_createdbyuser: DataTypes.INTEGER,
    image: DataTypes.STRING,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    namecreatedbyuser: DataTypes.STRING,
    stateofexistence: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'GroupChat',
  });
  return GroupChat;
};