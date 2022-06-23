'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workspaces extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Workspaces.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    domain: DataTypes.STRING,
    subDomain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Workspaces',
  });

  let User = sequelize.define("User")
  Workspaces.belongsTo(User,{
    foreignKey:"id"
  })
  return Workspaces;
};