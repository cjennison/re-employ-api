const _ = require('lodash');

class JobSearcher {
  constructor(job) {
    this.job = job;
    this.locations = [];

    this.foundOpenJobs = [];
    this.errors = [];
    this.setSearchLocations();
  }

  setSearchLocations() {
    this.locations = _.flatten(this.job.Users.map(user => user.Locations));
  }

  async execute() {
    await this.query();
    await this.save();
    return this.errors;
  }

  async query() {
    this.foundOpenJobs = [{ something: 'yeah' }];
  }

  async save() {
    console.log('Saved');
    return true;
  }
}

module.exports = JobSearcher;
