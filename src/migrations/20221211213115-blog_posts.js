'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      
      title: { type: Sequelize.STRING },
      content: { type: Sequelize.STRING },
      
      user_id: { allowNull: false, onUpDate: 'CASCADE', onDelete: 'CASCADE', type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },

      published: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_posts');
  }
};