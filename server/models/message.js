module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Session.hasOne(models.Session, {
          foreignKey: 'session_id',
        });
        Session.hasOne(models.Counsellor, {
          foreignKey: 'counsellor_id',
        });
        Session.hasOne(models.User, {
          foreignKey: 'user_id',
        });
      },
    },
  });
  return Message;
};