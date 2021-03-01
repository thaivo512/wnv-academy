const db = require('../utils/db');

module.exports = {

    async add(watchlist) {
        
        await db('watchlist').insert(watchlist);
        
    },

    async exist(user_id, course_id) {
        const lessons = await db('watchlist').where({
            user_id: user_id,
            course_id: course_id
        });

        return lessons.length > 0;
    },

    async delete(user_id, course_id) {

        return db('watchlist').where({
            user_id: user_id,
            course_id: course_id
        }).delete();
    },

    async all(userId) {
        
        return await db('watchlist_view').where({ user_id: userId });
    },
};