const SuggestedJobOpeningsEmailGenerator = require('./suggested-job-openings-email-generator');

class SuggestedJobsEmailService {
  constructor(user, jobOpenings) {
    this.user = user;
    this.jobOpenings = jobOpenings;
  }

  async execute() {
    console.log(`Sending ${this.jobOpenings.length} jobs to ${this.user.email}`);
    const emailer = new SuggestedJobOpeningsEmailGenerator(this.user, this.jobOpenings);
    return emailer.execute();
  }
}

module.exports = SuggestedJobsEmailService;
