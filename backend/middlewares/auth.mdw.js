const jwt = require('jsonwebtoken');
const accessTokenUtils = require('../utils/auth-access-token')

module.exports = (role) => (req, res, next) => {
    const accessToken = req.headers['x-access-token'];

    if (accessToken) {
        const tokenPayload = accessTokenUtils.validate(accessToken);

        if(tokenPayload == null) {
            return res.status(401).json({
                message: 'Invalid access token.'
            });
        }

        if(role && role != tokenPayload.role){
            return res.status(403).json({
                message: 'Access Deny.'
            });
        }

        req.accessTokenPayload = tokenPayload;
        next();
        
    } else {
        return res.status(400).json({
            message: 'Access token not found.'
        })
    }
}