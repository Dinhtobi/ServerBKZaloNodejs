'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoxChat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BoxChat.init({
    id_sender: DataTypes.INTEGER,
    id_receiver: DataTypes.INTEGER,
    lastmessage: DataTypes.STRING,
    createAt: DataTypes.STRING,
    namesender: DataTypes.STRING,
    namereceiver: DataTypes.STRING,
    urlsender: DataTypes.STRING,
    urlreceiver: DataTypes.STRING,
    id_groupchat: DataTypes.INTEGER,
    namegroup: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'BoxChat',
  });
  return BoxChat;
};