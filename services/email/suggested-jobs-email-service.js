class SuggestedJobsEmailService {
  constructor(user, jobOpenings) {
    this.user = user;
    this.jobOpenings = jobOpenings;
  }

  async execute() {
    console.log(`Sending ${this.jobOpenings.length} jobs to ${this.user.email}`);
    return true;
  }
}

module.exports = SuggestedJobsEmailService;
