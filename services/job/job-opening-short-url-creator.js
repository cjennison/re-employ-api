const _ = require('lodash');
const { JobOpeningShortUrl } = require('../../db/models');

class JobOpeningShortUrlCreator {
  constructor(user, jobOpenings) {
    this.user = user;
    this.jobOpenings = jobOpenings;
  }

  async checkShortUrlExists(jobOpening) {
    const hash = JobOpeningShortUrl.generateHash(
      this.user.id,
      jobOpening.id,
      jobOpening.locationId
    );
    return JobOpeningShortUrl.findOne({ where: { hash } })
      .then(shortUrl => shortUrl);
  }

  async create() {
    const promises = [];
    _.forEach((this.jobOpenings), (jobOpening) => {
      const shortUrlPromise = new Promise((resolve, reject) => {
        this.checkShortUrlExists(jobOpening).then((url) => {
          if (!url) {
            JobOpeningShortUrl.create({
              jobOpeningId: jobOpening.id,
              hash: JobOpeningShortUrl.generateHash(this.user.id, jobOpening.id, jobOpening.locationId)
            }).then((shortUrl) => {
              console.log('Successfull Created');
              Promise.all([
                this.user.addJobOpeningShortUrl(shortUrl),
                jobOpening.addJobOpeningShortUrl(shortUrl)
              ]).then(() => resolve(shortUrl));
            }).catch((err) => {
              console.log('Could not create short url', err);
              reject(err);
            });
          } else {
            console.log('Already Exists');
            resolve(url);
          }
        });
      });

      promises.push(shortUrlPromise);
    });

    return Promise.all(promises);
  }
}

module.exports = JobOpeningShortUrlCreator;
