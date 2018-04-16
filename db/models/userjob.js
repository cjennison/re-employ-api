module.exports = (sequelize, DataTypes) => {
  const UserJob = sequelize.define('UserJob', {}, {
    indexes: [
      {
        unique: true,
        fields: ['UserId', 'JobId']
      }
    ]
  });
  UserJob.associate = (models) => {
    UserJob.belongsTo(models.User);
    UserJob.belongsTo(models.Job);
  };
  return UserJob;
};
