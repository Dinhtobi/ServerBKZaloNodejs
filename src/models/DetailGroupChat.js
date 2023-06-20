'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailGroupChat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DetailGroupChat.init({
    id_groupchat : DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    timejoin: DataTypes.STRING,
    timeout: DataTypes.STRING,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    nameuser: DataTypes.STRING,
    namegroup: DataTypes.STRING,
    stateofexistence: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DetailGroupChat',
  });
  return DetailGroupChat;
};