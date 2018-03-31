module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('JobApplicationRecords', {
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
      jobOpeningShortUrlId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'jobOpeningShortUrls',
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