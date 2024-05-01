const User = require("../model/modelUsuario");
const TokenCheck = require("../middlewares/jwt");
const hashing = require("../middlewares/hashPasword");

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    const tokenValido = TokenCheck.verificacion(req,res);
    if (tokenValido == true) {
        try {
            const users = await User.findAll()
            res.status(200).json({
                estado:'Ok',
                users
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                estado:'Error',
                mensaje: 'Error del servidor'
            })
        }
    }
}

// Busqueda de usuario por id
exports.getUniqueUser = async (req,res) => {
    const tokenValido = TokenCheck.verificacion(req,res);
    if (tokenValido == true) {
        const usuarioSolicitado = req.params.usuario
        try { // Busca en la BD un usuario por la clave primaria, en este caso, el id
            const usuarioBuscado = await User.findAll({
                where: {
                    username: usuarioSolicitado
                }
            });
            if (usuarioBuscado == null){
                res.status(404).json({
                    estado:"error",
                    mensaje:"No se ha encontrado el usuario solicitado"
                })
            } else {
                res.status(200).json({ // Si tuvo exito, devuelve el usuario solicitado
                    estado: "Ok",
                    usuarioBuscado
                })
            }
        } catch (error) { // sino, obtiene el mensaje de error
            console.error(error);
            res.status(500).json({
                estado:"Error",
                mensaje: "No se ha podido obtener los datos"
            })
        }
    }
}

exports.createUser = async(req,res )=> {
    try {
        // Verifica si el usuario ya está creado
        const commingUser = req.body;
        const searchUsername = await User.findAll({
            where: {
                username:commingUser.username
            }
        });
        if (searchUsername.length == 0) {
            const searchEmail = await User.findAll({
                where:{
                    email: commingUser.email
                }
            })
            if (searchEmail == 0) {
                // Antes de crear el usuario, encripta la clave que guardará
                const closedPassword = hashing.hashPassword(commingUser.password);
                // Luego reemplaza la clave no encriptada por la clave generada
                commingUser.password = closedPassword
                console.log(commingUser);
                // Si el usuario no existe, lo crea
                await User.create(req.body);
                res.status(201).json({
                    estado:'Ok',
                    mensaje:`Usuario ${commingUser.username} creado exitosamente`
                })
            } else {
                res.status(400).json({
                    estado:'Error',
                    mensaje:`El email ${commingUser.username} ya se encuentra asociado a otro usuario, ingresar otro`
                })
            }
        } else {
            res.status(400).json({
                estado:'Error',
                mensaje:`El nombre de usuario ${commingUser.username} ya se encuentra ocupado, ingresar otro`
            })
        }
    } catch (error) {
        //console.error(error);
        res.status(500).json({
            estado:"Error",
            mensaje:'Nose han podido obtener los datos'
        })
    }
}

// Borrar usuario
exports.deleteUser = async (req,res) => {
    const validado = TokenCheck.verificacion(req,res);
    if (validado == true) {
        try { // Borra un usuario con el metodo destroy, buscando el usuario que coincida con el id enviado
            const usuario = await User.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({ // Si lo pudo eliminar, devuleve un ok y el mensaje de operación exitosa
                estado:"Ok",
                message:`Usuario ${usuario.username} eliminado`
            })
        } catch(error) { // Si falló devuelve error en "estado" y los detalles del mismo por consola
            console.error(error);
            res.status(500).json({
                estado:"Error",
                mensaje:"Ocurrió un error al eliminar el usuario"
            })
        }
    }
}

//Actualizar usuario
exports.updateUser = async (req,res) => {
    const validado = TokenCheck.verificacion(req,res);
    if (validado == true) {
        // Crea las contantes con el id y los datos actualizados...
        const userId = req.params.id;
        const dataUsuario = req.body;
        // Para luego crear el objeto usuario listo para lanzar con el update
        const usuario = { userId, ...dataUsuario }
        try { // Utiliza el metodo update con la informacion actualizada donde el id coincida con el del usuario que se queiere corregir
            await User.update({ ...usuario }, {
                where: { 
                    id:userId
                }
            })
            res.status(200).json({
                estado:"OK",
                mensaje:"Usuario actualizado"
            })
        } catch (error) { // Igual que las consultas anteriores, si falla retorna el error 500 y el mensaje por terminal
            console.error(error);
            res.status(500).json({
                estado:"Error",
                mensaje:"Error al actualizar el usuario"
            })
        }   
    }
}