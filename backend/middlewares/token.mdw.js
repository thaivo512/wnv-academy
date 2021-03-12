const jwt = require('jsonwebtoken');
const accessTokenUtils = require('../utils/auth-access-token')

module.exports = (req, res, next) => {
    const accessToken = req.headers['x-access-token'];

    if (accessToken) {
        const tokenPayload = accessTokenUtils.validateIgnoreExpired(accessToken);
        req.accessTokenPayload = tokenPayload;
    }
    next();
}