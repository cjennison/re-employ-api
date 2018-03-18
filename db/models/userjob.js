module.exports = (sequelize, DataTypes) => {
  const UserJob = sequelize.define('UserJob', {
    userId: {
      type: DataTypes.INTEGER,
      unique: 'userIdjobIdIndex'
    },
    jobId: {
      type: DataTypes.INTEGER,
      unique: 'userIdjobIdIndex'
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'jobId']
      }
    ]
  });
  UserJob.associate = (models) => {
    UserJob.belongsTo(models.User);
    UserJob.belongsTo(models.Job);
  };
  return UserJob;
};
