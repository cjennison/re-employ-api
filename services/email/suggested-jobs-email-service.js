const SuggestedJobOpeningsEmailGenerator = require('./suggested-job-openings-email-generator');

class SuggestedJobsEmailService {
  constructor(user, jobOpenings, shortUrls) {
    this.user = user;
    this.jobOpenings = jobOpenings;
    this.shortUrls = shortUrls;
  }

  async execute() {
    console.log(`Sending ${this.jobOpenings.length} jobs to ${this.user.email}`);
    const emailer = new SuggestedJobOpeningsEmailGenerator(
      this.user,
      this.jobOpenings,
      this.shortUrls
    );
    return emailer.execute();
  }
}

module.exports = SuggestedJobsEmailService;
