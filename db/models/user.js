module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    uid: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    User.hasMany(models.UserJob);
    User.belongsToMany(models.Job, { through: 'UserJob' });

    User.hasMany(models.UserRole);
    User.belongsToMany(models.Role, { through: 'UserRole' });

    User.hasMany(models.UserLocation);
    User.belongsToMany(models.Location, { through: 'UserLocation' });

    User.hasMany(models.JobOpeningOptOut);
    User.hasMany(models.JobOpeningShortUrl);
  };
  return User;
};
