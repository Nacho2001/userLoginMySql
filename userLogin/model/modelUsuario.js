// Importación de dependencias: librerias y credenciales para la base de datos
const {Model, DataTypes} = require('sequelize');
const sequelize = require("../db");
class User extends Model{};

// Crea el model "User" con los valores que se quiere almacenar
User.init({
    // ID unico
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Nombre de usuario, tampoco debe repetirse
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // Clave de acceso
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    // El email solo debe estar asociado a un solo usuario, por eso también debe ser único
    email:{
        type:DataTypes.STRING,
        unique:true
    },
    // Rol del usuario
    rol:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'usuario'
    }},
    {
        sequelize,
        modelName:"User"
    }
);

// Sincronización de la base de datos, si la tabla no existe, se crea automaticamente
User.sync()
.then(() => {
    console.log("Base de datos sincronizada");
})
.catch((error) => {
    console.log(`Error al crear la tabla:
    ${error}`)
})

module.exports = User