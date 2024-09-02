// import { DataTypes } from "sequelize";
// import sequelize from "../../config/database.js";

// const Category = sequelize.define( 'Category', {
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
//   tableName: 'categories'
// } );

// export default Category;
export default ( sequelize, DataTypes ) => {
  const Category = sequelize.define( 'Category', {
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
    tableName: 'categories'
  } );

  return Category;
};