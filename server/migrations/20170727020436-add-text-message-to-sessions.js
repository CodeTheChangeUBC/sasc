module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.addColumn(
      'Sessions',
      'text_message',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    ),
  down: (queryInterface, Sequelize) => 
    queryInterface.removeColumn('Sessions', 'text_message')
};
