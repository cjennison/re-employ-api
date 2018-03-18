const { User, Job, UserJob } = require('../db/models');
const BaseController = require('./base');
const UserJobCreator = require('../services/user-job/user-job-creator');

class JobsController extends BaseController {
  constructor(app) {
    super(app);
    app.get('/jobs', (...args) => {
      this.getJobs(...args);
    });

    app.get('/jobs/:id', (...args) => {
      this.getJob(...args);
    });

    app.post('/users/:userId/jobs/:id', this.authenticationRequired(), (...args) => {
      this.addJobToUser(...args);
    });

    app.delete('/users/:userId/jobs/:id', this.authenticationRequired(), (...args) => {
      this.removeJobFromUser(...args);
    });
  }

  getJobs(req, res) {
    console.log('GET /jobs');
    Job.findAll().then((job) => {
      res.json(job);
    });
  }

  getJob(req, res) {
    console.log('GET /jobs/:id');
    Job.find({
      where: {
        id: req.params.id
      }
    }).then((job) => {
      res.json(job);
    });
  }

  addJobToUser(req, res) {
    console.log('POST users/:userId/jobs/:id');

    Job.find({ where: { id: req.params.id } }).then((job) => {
      if (!job) {
        return res.sendStatus(404);
      }

      return User.find({
        where: {
          id: req.params.userId
        }
      }).then((user) => {
        if (this.userMatchesClaimId(req, user.uid)) {
          new UserJobCreator().create({
            user,
            job
          }).then((result) => {
            res.send(result);
          });
        } else {
          res.sendStatus(403);
        }
      });
    });
  }

  removeJobFromUser(req, res) {
    console.log('DELETE users/:userId/jobs/:id');

    Job.find({ where: { id: req.params.id } }).then((job) => {
      if (!job) {
        return res.sendStatus(404);
      }

      return User.find({
        where: {
          id: req.params.userId
        }
      }).then((user) => {
        UserJob.destroy({
          where: {
            userId: user.id,
            jobId: job.id
          }
        }).then(() => {
          res.send(200);
        });
      });
    });
  }
}

module.exports = JobsController;
