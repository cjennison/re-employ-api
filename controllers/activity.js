const { Activity } = require('../db/models');
const BaseController = require('./base');
const ActivityExporter = require('../services/exports/activity-exporter');

class ActivityController extends BaseController {
  constructor(app) {
    super(app);
    app.get('/activities', (...args) => {
      this.getActivies(...args);
    });

    app.get('/activities/:id', this.authenticationRequired(), (...args) => {
      this.getActivity(...args);
    });

    app.put('/activities/:id', this.authenticationRequired(), (...args) => {
      this.editActivity(...args);
    });

    app.delete('/activities/:id', this.authenticationRequired(), (...args) => {
      this.destroyActivity(...args);
    });

    app.post('/users/:userId/activities', this.authenticationRequired(), (...args) => {
      this.createActivityForUser(...args);
    });

    app.post('/users/:userId/activities/export', this.authenticationRequired(), (...args) => {
      this.createActivityExportForUser(...args);
    });
  }

  getActivies(req, res) {
    console.log('GET /activities');
    Activity.findAll().then((activities) => {
      res.json(activities);
    });
  }

  getActivity(req, res) {
    console.log('GET /activities/:id');
    Activity.find({
      where: {
        id: req.params.id
      }
    }).then((activity) => {
      res.json(activity);
    });
  }

  createActivityForUser(req, res) {
    console.log('POST /users/:userId/activities');
    Activity.create(req.body.activity).then((activity) => {
      res.json(activity);
    });
  }

  editActivity(req, res) {
    //TODO Does not update anything yet
    console.log('PUT /activities/:id');
    Activity.findOne({
      where: {
        id: req.params.id
      }
    }).then((activity) => {
      res.json(activity);
    });
  }

  destroyActivity(req, res) {
    console.log('DELETE /activities/:id');

    Activity.findOne({
      where: {
        id: req.params.id
      }
    }).then((activity) => {
      if (activity) {
        res.send(400, { error: 'Cannot delete Activity with user associations' });
      } else {
        Activity.destroy({
          where: {
            id: req.params.id
          }
        }).then((result) => {
          res.json(result);
        });
      }
    });
  }

  createActivityExportForUser(req, res) {
    console.log('POST /users/:userId/activities/export');
    Activity.findAll({
      where: {
        userId: req.params.userId
      }
    }).then((activities) => {
      if (activities.length) {
        const exporter = new ActivityExporter(req.params.userId, activities);
        exporter.execute().then((result) => {
          res.send(202, result);
        }).catch((error) => {
          console.log(error);
          res.send(400, error);
        });
      } else {
        res.send(400, 'No activites to export.');
      }
    });
  }
}

module.exports = ActivityController;
