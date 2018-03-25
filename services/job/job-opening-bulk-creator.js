const _ = require('lodash');
const { JobOpening } = require('../../db/models');

class JobOpeningBulkCreator {
  constructor(openings, job, searchLocations) {
    this.openings = openings;
    this.job = job;
    this.searchLocations = searchLocations;
  }

  findLocation(locationId) {
    return _.find(this.searchLocations, location => location.id === locationId);
  }

  createJobOpening(opening, location, resolve, reject) {
    return JobOpening.create(opening)
      .then((newJobOpening) => {
        Promise.all([
          this.job.addJobOpening(newJobOpening),
          location.addJobOpening(newJobOpening)])
          .then(() => resolve(newJobOpening))
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
  }

  searchFor(hash) {
    return JobOpening.findOne({
      where: { hash }
    });
  }

  uniqueOpenings(openings) {
    //  remove collisions in the same data set
    const uniqueOpenings = [];
    _.forEach(openings, (opening) => {
      const hash = JobOpening.generateHash(opening);
      const newOpening = opening;
      newOpening.hash = hash;

      const matchingOpening = _.find(uniqueOpenings, op => op.hash === hash);
      if (!matchingOpening) {
        uniqueOpenings.push(newOpening);
      }
    });

    return uniqueOpenings;
  }

  async execute() {
    console.log('Creating', this.openings.length, 'jobs');
    const promises = [];
    _.forEach(this.uniqueOpenings(this.openings), (opening) => {
      const createPromise = new Promise((resolve, reject) => {
        const hash = JobOpening.generateHash(opening);
        this.searchFor(hash).then((jobOpening) => {
          if (!jobOpening) {
            const modelParams = opening;
            modelParams.hash = hash;

            const location = this.findLocation(modelParams.locationId);
            return this.createJobOpening(modelParams, location, resolve, reject);
          }
          return resolve(jobOpening);
        }).catch((error) => {
          console.log('Error', error);
          reject(error);
        });
      });

      promises.push(createPromise);
    });

    return Promise.all(promises);
  }
}

module.exports = JobOpeningBulkCreator;
