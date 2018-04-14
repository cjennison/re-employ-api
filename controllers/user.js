require('dotenv').load();

const { User, Role, UserRole } = require('../db/models');
const request = require('request');

const UserCreator = require('../services/user/user-creator');
const BaseController = require('./base');

class UsersController extends BaseController {
  constructor(app) {
    super(app);

    app.delete('/users/:userId/roles/:id', this.authenticationRequired(), (...args) => {
      this.removeRoleFromUser(...args);
    });

    app.get('/users/search', this.authenticationRequired(), (...args) => {
      this.findUser(...args);
    });

    app.get('/users', this.authenticationRequired(), (...args) => {
      this.getSubscribers(...args);
    });

    app.post('/users', (...args) => {
      this.postUsers(...args);
    });

    app.post('/users/:id/roles/:roleName', this.authenticationRequired(), (...args) => {
      this.addRoleToUser(...args);
    });

    app.get('/users/:uid', this.authenticationRequired(), (...args) => {
      this.getUser(...args);
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

  findUser(req, res) {
    console.log('GET /users/search');

    this.userHasRole(req.jwt, 'admin').then(() => {
      User.find({
        where: {
          email: req.query.email
        },
        include: this.modelFields(req.query.fields)
      }).then((user) => {
        res.json(user);
      });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(403);
    });
  }

  addRoleToUser(req, res) {
    console.log('POST /users/:id/roles/:rollName');

    this.userHasRole(req.jwt, 'admin').then(() => {
      User.findById(req.params.id).then((user) => {
        Role.findOne({ where: { name: req.params.roleName } }).then((role) => {
          role.addUser(user).then(() => {
            res.send(user);
          }).catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
        });
      });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(403);
    });
  }

  removeRoleFromUser(req, res) {
    console.log('DELETE /users/:userId/roles/:id');

    this.userHasRole(req.jwt, 'admin').then(() => {
      UserRole.destroy({
        where: {
          roleId: req.params.id,
          userId: req.params.userId
        }
      }).then(() => {
        res.sendStatus(200);
      }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(403);
    });
  }

  postUsers(req, res) {
    console.log('POST /users');
    request(
      {
        method: 'POST',
        url: 'https://dev-535949.oktapreview.com/api/v1/users?activate=true',
        headers: {
          Authorization: `SSWS ${process.env.OKTA_TOKEN}`
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
