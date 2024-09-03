import bcrypt from 'bcrypt';

export default ( sequelize, DataTypes ) => {
  const User = sequelize.define( 'User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: async ( user ) => {
        if( user.password ) {
          user.password = await bcrypt.hash( user.password, 10 );
        }
      }
    }
  });

  User.prototype.validatePassword = async function( password ) {
    const result = await bcrypt.compare( password, this.password);
    
    return result;
  };

  return User;
};