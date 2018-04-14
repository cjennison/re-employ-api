module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'UserLocations',
      'primary',
      Sequelize.BOOLEAN
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn(
      'UserLocations',
      'primary'
    );
  }
};
