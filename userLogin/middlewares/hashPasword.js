const bcrypt = require('bcrypt');

exports.hashPassword = (normalPassword) => {
    const salt = bcrypt.genSaltSync();
    const encryptedPassword = bcrypt.hashSync(normalPassword, salt);
    return encryptedPassword;
}

exports.checkPassword = (entryPassword, realPassword) => {
    const correct = bcrypt.compareSync(entryPassword, realPassword);
    return correct;
}