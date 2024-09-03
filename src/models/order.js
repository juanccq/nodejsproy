export default ( sequelize, DataTypes ) => {
  const Order = sequelize.define( 'Order', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'orders'
  } );

  return Order;
};