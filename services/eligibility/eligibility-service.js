const eligibilityClasses = require('./index');

class EligiblityService {
  constructor(user, location) {
    this.user = user;
    this.location = location;
  }

  getEligibilityClass() {
    return eligibilityClasses[`${this.location.state}EligibilityService`];
  }

  getEligibility() {
    return new Promise((resolve, reject) => {
      const EligibilityClass = this.getEligibilityClass();

      if (!EligibilityClass) {
        return reject(`${this.location.state} is not a supported state.`);
      }

      const eligibility = new EligibilityClass(this.user);
      eligibility.getEligibility().then((elgModel) => {
        resolve(elgModel);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = EligiblityService;
