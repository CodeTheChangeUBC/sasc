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
        Message.hasOne(models.Session, {
          foreignKey: 'session_id',
        });
        Message.hasOne(models.Counsellor, {
          foreignKey: 'counsellor_id',
        });
        Message.hasOne(models.User, {
          foreignKey: 'user_id',
        });
      },
    },
  });
  return Message;
};