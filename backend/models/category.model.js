const db = require('../utils/db');

module.exports = {

    async single(id) {
        const users = await db('category').where({
            id: id
        });

        return users.length === 0? null : users[0];
    },

    async existName(name) {
        const users = await db('category').where({
            name: name
        });

        return users.length > 0;
    },


    async add(category) {
        const ids = await db('category').insert(category).returning('id');
        
        return ids[0];
    },

    async changeName(id, name) {
        try {
            await db('category').where({ id: id }).update('name', name);

            return true;
        }
        catch(err) {
            return false;
        }
    },

    async delete(id) {
        try {
            await db('category').where({id: id}).del();

            return true;
        } 
        catch(err) {
            return false;
        }
    },


    async singleView(id) {
        const users = await db('category_view').where({
            id: id
        });

        return users.length === 0? null : users[0];
    },


    allView() {
        return db('category_view').where({parent_id: null});
    },


    topEnrolWeek() {
        return db('top_category_enroll_week').orderBy('count', 'desc');
    },
};