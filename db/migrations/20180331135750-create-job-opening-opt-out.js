module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('JobOpeningOptOuts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      jobOpeningId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'jobOpenings',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('JobOpeningOptOuts');
  }
};