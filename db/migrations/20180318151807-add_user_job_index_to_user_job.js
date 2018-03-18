module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex('UserJobs', ['userId']);
    queryInterface.addIndex('UserJobs', ['jobId']);
    queryInterface.addIndex('UserJobs', ['userId', 'jobId'], {
      indexName: 'userIdjobIdIndex',
      indicesType: 'UNIQUE'
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeIndex('UserJobs', ['userId']);
    queryInterface.removeIndex('UserJobs', ['jobId']);
    queryInterface.removeIndex('UserJobs', 'userIdjobIdIndex');
  }
};
