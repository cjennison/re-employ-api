/*
  A user is eligible for MA Unemployment
  when they have applied to 3 jobs for 3 days across a whole day
*/

const moment = require('moment');
const _ = require('lodash');
const { Op } = require('sequelize');
const { JobApplicationRecord } = require('../../db/models');

class MAEligibilityService {
  constructor(user) {
    this.user = user;
    this.periodStart = moment().startOf('week');
    this.periodEnd = moment(this.periodStart).add(7, 'days');
    this.errors = [];
  }

  groupByDate(records) {
    return _.groupBy(records, record => moment(record.createdAt).format('L'));
  }

  testEligibility(groupedRecords) {
    let eligibleDays = 0;
    _.forEach(groupedRecords, (dateSet) => {
      if (dateSet.length >= 3) {
        eligibleDays += 1;
      }
    });

    if (eligibleDays >= 3) {
      return { eligible: true };
    }

    this.errors.push(`Not enough Eligible Days. Found ${eligibleDays} expected 3.`);

    return { eligible: false, errors: this.errors };
  }

  async getEligibility() {
    const records = await JobApplicationRecord.findAll({
      where: {
        userId: this.user.id,
        createdAt: {
          [Op.lt]: this.periodEnd,
          [Op.gt]: this.periodStart
        }
      }
    });

    const groupedRecords = this.groupByDate(records);
    return this.testEligibility(groupedRecords);
  }
}

module.exports = MAEligibilityService;
