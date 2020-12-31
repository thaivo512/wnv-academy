const db = require('../utils/db');


module.exports = {

    async add(progress) {
        try {
            await db('watch_progress').insert(progress);
        }
        catch(err) {
            await db('watch_progress').where({ 
                lesson_id: progress.lesson_id, 
                user_id: progress.user_id
            })
            .update(progress);
        }
    },

    async single(userId, lessonId) {
        const list = await db('watch_progress').where({
            user_id: userId,
            lesson_id: lessonId
        });

        return list.length > 0? list[0] : null;
    }


};