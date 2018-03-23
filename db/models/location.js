module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {});
  Location.associate = (models) => {
    Location.hasMany(models.UserLocation);
    Location.belongsToMany(models.User, { through: 'UserLocation' });
  };
  return Location;
};
