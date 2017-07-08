module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      counsellor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Counsellors',
          key: 'id',
          as: 'counsellor_id',
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'user_id',
        },
      },
      session_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sessions',
          key: 'id',
          as: 'session_id',
        },
      },
    }),
  down: (queryInterface/*, Sequelize*/) => 
     queryInterface.dropTable('Messages'),
};