module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    begin_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    textMessage: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    classMethods: {
      associate: (models) => {
        // Foreign key from Counsellors
        Session.hasOne(models.Counsellor, {
          foreignKey: 'counsellor_id',
        });
        Session.hasOne(models.User, {
          foreignKey: 'user_id',
        });
      },
    },
  });
  return Session;
};