module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('JobOpenings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      applicationUrl: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      postedDate: {
        type: Sequelize.DATE
      },
      scheduleType: {
        type: Sequelize.STRING
      },
      channel: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      hash: {
        type: Sequelize.STRING
      },
      jobId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Jobs',
          key: 'id'
        }
      },
      locationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }).then(() => {
      queryInterface.addIndex('JobOpenings', ['name']);
      queryInterface.addIndex('JobOpenings', ['channel']);
      queryInterface.addIndex('JobOpenings', ['postedDate']);
      queryInterface.addIndex('JobOpenings', ['name', 'company']);
      queryInterface.addIndex('JobOpenings', ['company']);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('JobOpenings');
  }
};