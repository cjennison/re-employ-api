const _ = require('lodash');
const APIs = require('./apis/index');
const JobOpeningBulkCreator = require('./job-opening-bulk-creator');

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
    console.log('Finding Job Openings for', this.job.name);
    await this.query();
    await this.save();
    console.log('Completed');
  }

  async query() {
    this.jobOpenings = await APIs.queryAPIs(this.job, this.locations);
    this.jobOpenings = _.flatten(this.jobOpenings);
  }

  async save() {
    const bulkCreator = new JobOpeningBulkCreator(this.jobOpenings, this.job, this.locations);
    return bulkCreator.execute();
  }
}

module.exports = JobSearcher;
