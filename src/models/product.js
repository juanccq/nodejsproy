// import { DataTypes } from "sequelize";
// import sequelize from "../../config/database.js";

// const Product = sequelize.define( 'Product', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   }
// }, {
//   timestamps: true,
//   tableName: 'products'
// } );

// export default Product;

export default ( sequelize, DataTypes ) => {
  const Product = sequelize.define( 'Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    timestamps: true,
    tableName: 'products'
  } );

  return Product;
};