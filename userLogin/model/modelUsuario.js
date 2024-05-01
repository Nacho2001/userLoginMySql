const {Model, DataTypes} = require('sequelize');
const sequelize = require("../db");
class User extends Model{};

User.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true
    },
    rol:{
        type:DataTypes.STRING,
        allowNull:false
    }},
    {
        sequelize,
        modelName:"User"
    }
);

User.sync()
.then(() => {
    console.log("Base de datos sincronizada");
})
.catch((error) => {
    console.log(`Error al crear la tabla:
    ${error}`)
})

module.exports = User