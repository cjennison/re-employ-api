const { User } = require('../db/models');
const request = require('request');
const oktaConfig = require('../config/okta.json');

const UserCreator = require('../services/user/user-creator');
const BaseController = require('./base');

class UsersController extends BaseController {
  constructor(app) {
    super(app);

    app.get('/users', this.authenticationRequired(), (...args) => {
      this.getSubscribers(...args);
    });

    app.get('/users/:uid', this.authenticationRequired(), (...args) => {
      this.getUser(...args);
    });

    app.post('/users', (...args) => {
      this.postUsers(...args);
    });
  }

  getUsers(req, res) {
    console.log('GET /users');
    User.findAll().then((users) => {
      res.json(users);
    });
  }

  getUser(req, res) {
    console.log('GET /users/:uid');

    User.find({
      where: {
        uid: req.params.uid
      },
      include: this.modelFields(req.query.fields)
    }).then((user) => {
      if (this.userMatchesClaimId(req, user.uid)) {
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    });
  }

  postUsers(req, res) {
    console.log('POST /users');
    request(
      {
        method: 'POST',
        url: 'https://dev-535949.oktapreview.com/api/v1/users?activate=true',
        headers: {
          Authorization: `SSWS ${oktaConfig.token}`
        },
        body: {
          profile: {
            email: req.body.email,
            login: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
          },
          credentials: {
            password: {
              value: req.body.password
            }
          }
        },
        json: true,
      },
      (error, response, body) => {
        if (error || body.errorCauses) {
          console.log(error);
          res.sendStatus(400);
        } else {
          const creator = new UserCreator();
          creator.create({
            email: req.body.email,
            login: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            uid: body.id
          }).then((user) => {
            res.send(user);
          }).catch((dbError) => {
            console.log(dbError);
            res.sendStatus(400);
          });
        }
      }
    );
  }
}

module.exports = UsersController;
