class UserJobCreator {
  create(params) {
    return params.user.addJob(params.job);
  }
}

module.exports = UserJobCreator;
