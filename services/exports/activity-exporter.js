const _ = require('lodash');
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');

const fields = ['type', 'description', 'performedAt', 'contactPhone', 'contactName', 'place'];

class ActivityExporter {
  constructor(userId, activites) {
    this.userId = userId;
    this.activites = activites;
  }

  buildJSON() {
    const exportArray = [];
    _.forEach(this.activites, (activity) => {
      const obj = {};

      obj.type = activity.type;
      obj.description = activity.description;
      obj.performedAt = activity.performedAt;
      obj.contactPhone = activity.contactPhone;
      obj.contactName = activity.contactName;
      obj.place = activity.place;

      exportArray.push(obj);
    });

    return exportArray;
  }

  execute() {
    return new Promise((resolve, reject) => {
      const data = this.buildJSON();

      try {
        const parser = new Json2csvParser({ fields });
        const csv = parser.parse(data);
        resolve(csv);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = ActivityExporter;
