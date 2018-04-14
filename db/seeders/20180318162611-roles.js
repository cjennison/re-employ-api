module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Roles', [{
      name: 'admin'
    }, {
      name: 'internal'
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
