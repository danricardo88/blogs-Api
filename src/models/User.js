module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      // display_name: DataTypes.STRING,
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image:{ type: DataTypes.STRING, defaultValue: null },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'user_id', as: 'user'
    });
  };

  return User;
};