const USAJobsSearcher = require('./usajobs-searcher');

async function queryAPIs(job, locations) {
  const usajobs = new USAJobsSearcher(job, locations);
  return [await usajobs.search()];
}

module.exports = {
  queryAPIs
};
