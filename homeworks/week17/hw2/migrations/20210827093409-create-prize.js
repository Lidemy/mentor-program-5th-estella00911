module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('Prizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prizeOrder: {
        type: Sequelize.INTEGER
      },
      prizeName: {
        type: Sequelize.STRING
      },
      prizeItem: {
        type: Sequelize.STRING
      },
      prizeDesc: {
        type: Sequelize.STRING
      },
      imageURL: {
        type: Sequelize.STRING
      },
      prizeAmount: {
        type: Sequelize.INTEGER
      },
      prizeProbability: {
        type: Sequelize.DECIMAL(10, 2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('Prizes')
  }
}
