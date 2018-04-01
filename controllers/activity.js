const { Activity } = require('../db/models');
const BaseController = require('./base');

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
}

module.exports = ActivityController;
