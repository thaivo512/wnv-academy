
const jwt = require('jsonwebtoken');


function generate({id, username, name, email, role, is_active}){
    return jwt.sign({
        id: id,
        username: username,
        name: name,
        email: email,
        role: role,
        is_active: is_active
    }, 'SECRET_KEY', {
        expiresIn: 30//60*60*24*14 // seconds
    });
}

function validate(accessToken){
    try{
        return jwt.verify(accessToken, 'SECRET_KEY');
    }
    catch(err) {
        return null;
    }
}

function validateIgnoreExpired(accessToken){
    try{
        return jwt.verify(accessToken, 'SECRET_KEY', { ignoreExpiration: true });
    }
    catch(err) {
        return null;
    }
}


module.exports = {
    generate,
    validate,
    validateIgnoreExpired
}