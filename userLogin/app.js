// Importacion librerias
const express = require('express');
const app = express();
const cors = require('cors');

// Datos de acceso a la base
const sequelize = require('./db');

// Obtiene los archivo de rutas
const UserRoutes = require('./routes/userRoutes');
const AuthRoute = require('./routes/authRoute');
const registerRoute = require('./routes/registerRoute');

// Autenticación en la base
sequelize.authenticate()
.then(() => {
    console.log("Conexion con la base exitosa")
})
.catch((error) => {
    console.log(`Error al conectar con la base: ${error}`)
})

// Llamado a los middlewares
app.use(express.json());
app.use(cors());

// Configuración de los endpoints
app.use('/users', UserRoutes);
app.use('/login', AuthRoute);
app.use('/register', registerRoute);

// Define el puerto de la api
const PORT = 3579
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})