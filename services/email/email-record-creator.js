const { EmailRecord } = require('../../db/models');

class EmailRecordCreator {
  constructor(params, user) {
    if (!params || !user) {
      return new Error('Missing Params or user');
    }
    this.params = params;
    this.user = user;
  }

  create() {
    EmailRecord.create(this.params)
      .then((emailRecord) => {
        emailRecord.setUser(this.user)
          .catch((error) => {
            console.log('Could not associate email record with user', error);
          });
      })
      .catch((error) => {
        console.log('Could not create EmailRecord', error);
      });
  }
}

module.exports = EmailRecordCreator;
