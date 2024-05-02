// Dependencias
const jwt = require('jsonwebtoken');
const User = require('../model/modelUsuario');
const hashing = require('../middlewares/hashPasword');

// Metodo de autenticación
exports.autenticacion = async (req,res) => {
    // Obtiene username y la clave del body
    const username = req.body.username;
    const password = req.body.password;
    try {
        // Busca el usuario ingresado en la base de datos
        const usuario = await User.findAll({
            where: {
                username: username
            }
        });
        // Si no existe, retorna un error "Credenciales incorrectas"
        if (usuario == [] || usuario == "" | usuario == undefined){
            res.status(401).json({
                estado:"Error",
                mensaje:"Las credenciales ingresadas no son correctas"
            })
        } else {
            // Verifica la contraseña del usuario, si no es igual tambien retorna un error
            let claveGuardada = usuario[0].dataValues.password
            // Compara la clave del usuario con la clave ingresada
            let correcta = hashing.checkPassword(password, claveGuardada)
            // Si la clave no coincide, no permite el acceso
            if (correcta != true){
                res.status(401).json({
                    estado:"Error",
                    mensaje:"Nombre de Usuario o Contraseña incorrectos!"
                })
            } else {
                // En cambio, si las credenciales con correctas, devuelve un token de acceso, valido por 1 hora
                const token = jwt.sign({userID: usuario.id}, 'securePassword', { expiresIn: '1h'})
                res.status(200).json({
                    estado:"Ok",
                    token: token
                })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            estado:"Error",
            mensaje:"Error del servidor"
        })
    }
}