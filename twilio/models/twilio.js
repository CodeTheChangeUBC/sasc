module.exports =(sequelize, DataTypes) => {
  const Twilio = sequelize.define('Twilio', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    accountSid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    authToken: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Twilio;
};