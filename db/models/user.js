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
  };
  return User;
};
