const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
   /*  id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    }, */
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cost:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image:{
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "https://www.abrafersrl.com.ar/wp-content/uploads/logo-producto-generico-768x768.jpg",
    },
    code:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  });
};
