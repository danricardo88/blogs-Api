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

  return User;
};