
const jwt = require('jsonwebtoken');


function generate({id, name, email, role, is_active}){
    return jwt.sign({
        id: id,
        name: name,
        email: email,
        role: role,
        is_active: is_active
    }, 'SECRET_KEY', {
        expiresIn: 100 // seconds
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


module.exports = {
    generate,
    validate
}