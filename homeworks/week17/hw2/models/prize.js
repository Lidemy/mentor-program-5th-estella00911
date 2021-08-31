const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Prize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Prize.init({
    prizeOrder: DataTypes.INTEGER,
    prizeName: DataTypes.STRING,
    prizeItem: DataTypes.STRING,
    prizeDesc: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    prizeAmount: DataTypes.INTEGER,
    prizeProbability: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Prize'
  })
  return Prize
}
