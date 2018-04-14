module.exports = (sequelize, DataTypes) => {
  const UserLocation = sequelize.define('UserLocation', {
    radius: DataTypes.INTEGER,
    primary: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  }, {});
  UserLocation.associate = (models) => {
    UserLocation.belongsTo(models.User);
    UserLocation.belongsTo(models.Location);
  };
  return UserLocation;
};
