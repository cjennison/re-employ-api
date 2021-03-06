module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('JobApplicationRecords', {
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
      JobOpeningShortUrlId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'JobOpeningShortUrls',
          key: 'id'
        }
      },
      didApply: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('JobApplicationRecords');
  }
};