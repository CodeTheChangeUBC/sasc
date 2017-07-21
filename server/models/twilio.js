module.exports =(sequelize, DataTypes) => {
  const Twilio = sequelize.define('Twilio', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    accountSid: {
      DataTypes.INTEGER,
      allowNull: false,
    },
    authToken: {
      DataTypes.STRING
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