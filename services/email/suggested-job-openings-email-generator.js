const EmailGenerator = require('./email-generator');
const fs = require('fs');
const inflection = require('inflection');
const Liquid = require('liquid-node');
const config = require('../config');

const engine = new Liquid.Engine();
const templateHTML = fs.readFileSync('templates/suggested-job-email.liquid', 'utf8');


class SuggestedJobOpeningsEmailGenerator extends EmailGenerator {
  constructor(user, jobOpenings, shortUrls) {
    super(user);

    this.jobOpenings = jobOpenings;
    this.shortUrls = shortUrls;
  }

  subject() {
    return `${this.jobOpenings.length} NEW ${inflection.inflect('Job', this.jobOpenings.length)} for you! Let's get started.`;
  }

  htmlBody() {
    return new Promise((resolve, reject) => {
      engine
        .parse(templateHTML)
        .then(template => template.render({
          user: this.user,
          jobOpenings: this.jobOpenings,
          shortUrls: this.shortUrls,
          config
        }))
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }
}

module.exports = SuggestedJobOpeningsEmailGenerator;
