module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Twilios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      phoneNumber: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
      },
      accountSid: {
        type: Sequelize.INTEGER,
      },
      authToken: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface/*, Sequelize*/) => 
    queryInterface.dropTable('Twilios'),
};