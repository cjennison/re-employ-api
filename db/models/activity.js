module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    timeOccured: DataTypes.DATE,
    contactPhone: DataTypes.STRING,
    contactName: DataTypes.STRING,
    place: DataTypes.STRING
  }, {});
  Activity.associate = (models) => {
    Activity.belongsTo(models.JobApplicationRecord);
    Activity.belongsTo(models.User);
  };
  return Activity;
};
