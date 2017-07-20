module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      begin_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false,
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
    }),
  down: (queryInterface/*, Sequelize*/) => 
    queryInterface.dropTable('Sessions'),
};