module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex('UserJobs', ['UserId']);
    queryInterface.addIndex('UserJobs', ['JobId']);
    queryInterface.addIndex('UserJobs', ['UserId', 'JobId'], {
      indexName: 'userIdjobIdIndex',
      indicesType: 'UNIQUE'
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeIndex('UserJobs', ['UserId']);
    queryInterface.removeIndex('UserJobs', ['JobId']);
    queryInterface.removeIndex('UserJobs', 'UserIdjobIdIndex');
  }
};
