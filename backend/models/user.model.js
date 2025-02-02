const db = require('../utils/db');

module.exports = {
    all(is_active, role) {
        condition = { is_deleted: false }
        role && (condition.role = role)
        if(is_active === 'false') condition.is_active = false
        if(is_active === 'true') condition.is_active = true
        

        return db('users').where(condition);
    },

    async single(id) {
        const users = await db('users').where({
            id: id,
            is_deleted: false
        });

        return users.length === 0? null : users[0];
    },

    async singleByEmail(email) {
        const users = await db('users').where({
            email: email,
            is_deleted: false
        });
        
        return users.length === 0? null : users[0];
    },

    async singleByUsername(username) {
        const users = await db('users').where({
            username: username,
            is_deleted: false
        });
        
        return users.length === 0? null : users[0];
    },

    async existByEmail(email) {
        const users = await db('users').where('email', email);
        
        return users.length > 0;
    },

    async existByUsername(username) {
        const users = await db('users').where('username', username);
        
        return users.length > 0;
    },

    async add(user) {
        const ids = await db('users').insert(user).returning('id');
        
        return ids[0];
    },

    changeName(id, name) {
        return db('users').where({
            id: id,
            is_deleted: false
        }).update('name', name);
    },

    changeEmail(id, email) {
        return db('users').where({
            id: id,
            is_deleted: false
        }).update({
            'email': email,
            'is_active': false
        });
    },

    resetPassword(id, password) {
        return db('users').where({
            id: id,
            is_deleted: false
        }).update('password', password);
    },

    refreshToken(id, rfToken) {
        return db('users').where({
            id: id,
            is_deleted: false
        }).update('rf_token', rfToken);
    },

    active(id) {
        return db('users').where({
            id: id,
            is_deleted: false
        }).update('is_active', true);
    },

    removeOTPCode(id) {
        return db('users').where({
            id: id,
            is_deleted: false
        }).update('otp_code', null);
    },

    renewOTPCode(id, code) {
        return db('users').where({
            id: id,
            is_deleted: false
        }).update('otp_code', code);
    },

    delete(id) {
        return db('users').where('id', id).update({
            is_deleted: true,
            rf_token: null
        });
    },

    async isValidRefreshToken(id, rfToken) {
        const list = await db('users').where({
            id: id,
            is_deleted: false,
            rf_token: rfToken
        });

        return list.length > 0;
    }
};