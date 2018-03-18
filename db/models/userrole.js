module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userId: {
      type: DataTypes.INTEGER
    },
    roleId: {
      type: DataTypes.INTEGER
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'roleId']
      }
    ]
  });
  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User);
    UserRole.belongsTo(models.Role);
  };
  return UserRole;
};
