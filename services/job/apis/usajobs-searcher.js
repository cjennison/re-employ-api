//  https://developer.usajobs.gov/Tutorials/Search-Jobs

const _ = require('lodash');
const request = require('request');
const APIKeys = require('../../../config/api.json');

const host = 'data.usajobs.gov';
const userAgent = APIKeys.USAJobs.email;
const authKey = APIKeys.USAJobs.key;

const whoMayApply = 'public';

class USAJobsSearcher {
  constructor(job, locations) {
    this.job = job;
    this.locations = locations;
  }

  url() {
    let url = 'https://data.usajobs.gov/api/Search?fields=all';
    url += `&Keyword=${this.job.name}`;
    url += '&KeywordFilter=exact';
    url += `&WhoMayApply=${whoMayApply}`;

    const searchLocationArray = _.map(this.locations, (searchLocation) => {
      return `${searchLocation.city}, ${searchLocation.state}`;
    });

    url += `&LocationName=${searchLocationArray.join(';')}`;
    return url;
  }

  createJobRecords(items) {
    return items.map((item) => {
      const descriptor = item.MatchedObjectDescriptor;

      //  TODO: Consider storing USAJobs descriptor in JSON Storage DB
      return {
        jobId: this.job.id,
        company: descriptor.OrganizationName,
        department: descriptor.DepartmentName,
        name: descriptor.PositionTitle,
        applicationUrl: descriptor.ApplyURI[0],
        locations: descriptor.PositionLocation,
        scheduleType: descriptor.PositionSchedule[0].Name.toLowerCase(),
        postedDate: descriptor.PublicationStartDate,
        description: descriptor.UserArea.Details.JobSummary
      };
    });
  }

  //  Avoid saving jobs outside of the search query location
  //  TODO: Missing State Lookup
  locationInSearchQuery(location) {
    return _.find(this.locations, searchLocation => searchLocation.city === location.LocationName.split(',')[0]);
  }

  //  Some jobs have multiple applicable locations, duplicate them for each location
  duplicateRecordsPerLocation(records) {
    const expandedRecords = [];
    _.forEach(records, (record) => {
      _.forEach(record.locations, (location) => {
        const matchingLocation = this.locationInSearchQuery(location);
        if (matchingLocation) {
          const newRecord = {
            channel: 'USAJobs',
            company: record.company,
            department: record.department,
            locationId: matchingLocation.id,
            jobId: record.jobId,
            name: record.name,
            scheduleType: record.scheduleType,
            postedDate: record.postedDate,
            applicationUrl: record.applicationUrl,
            description: record.description
          };

          expandedRecords.push(newRecord);
        }
      });
    });

    return expandedRecords;
  }

  async search() {
    return new Promise((resolve, reject) => {
      const url = this.url();
      request({
        url,
        method: 'GET',
        headers: {
          'Host': host,
          'User-Agent': userAgent,
          'Authorization-Key': authKey
        }
      }, (error, response, body) => {
        if (error) {
          console.log('Could not load USAJobs', error);
          return reject(error);
        }
        const data = JSON.parse(body);
        let records = this.createJobRecords(data.SearchResult.SearchResultItems);
        records = this.duplicateRecordsPerLocation(records);
        resolve(records);
      });
    });
  }
}

module.exports = USAJobsSearcher;
