const db = require('../utils/db');

module.exports = {
    all() {
        return db('users');
    },

    async single(id) {
        const users = await db('users').where('id', id);

        return users.length === 0? null : users[0];
    },

    async singleByEmail(email) {
        const users = await db('users').where('email', email);
        
        return users.length === 0? null : users[0];
    },

    async existByEmail(email) {
        const users = await db('users').where('email', email);
        
        return users.length > 0;
    },

    async add(user) {
        const ids = await db('users').insert(user);
        return ids[0];
    },

    resetPassword(id, password) {
        return db('users').where('id', id).update('password', password);
    },

    refreshToken(id, rfToken) {
        return db('users').where('id', id).update('rf_token', rfToken);
    },

    async isValidRefreshToken(id, rfToken) {
        const list = await db('users').where('id', id).andWhere('rf_token', rfToken);

        return list.length > 0;
    }
};