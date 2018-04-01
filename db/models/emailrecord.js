module.exports = (sequelize, DataTypes) => {
  const EMAIL_TYPES = {
    0: 'test'
  };

  const EmailRecord = sequelize.define('EmailRecord', {
    emailType: DataTypes.INTEGER,
    toAddress: DataTypes.STRING,
    fromAddress: DataTypes.STRING,
    subject: DataTypes.STRING,
    html: DataTypes.STRING
  }, {});

  EmailRecord.associate = (models) => {
    EmailRecord.belongsTo(models.User);
  };

  EmailRecord.emailType = type => EMAIL_TYPES[type];

  return EmailRecord;
};
