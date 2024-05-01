const jwt = require("jsonwebtoken");

// validacion del cliente
exports.verificacion = (req, res) => {
    let state = false;
    if (!req.headers.token){
        res.status(401).json({
            estado:"Error",
            mensaje:"No se ha proporcionado ningún token"
        })
    } else {
       jwt.verify(req.headers.token, 'securePassword', (err, decoded) => {
        if (err){
            res.status(401).json({
                estado: "error",
                mensaje: "El token no es válido"
            })
        } else {
            req.userId = decoded.userId;
            state = true
        }
       })
       return state
    }
}