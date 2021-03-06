module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('JobOpeningShortUrls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      JobOpeningId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'JobOpenings',
          key: 'id'
        }
      },
      hash: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('JobOpeningShortUrls');
  }
};
