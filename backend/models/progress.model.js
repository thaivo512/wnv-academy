const db = require('../utils/db');


module.exports = {

    async done(lesson_id, user_id) {
        try {
            await db('watch_progress').insert({
                lesson_id: lesson_id,
                user_id: user_id,
                progress_time: 0,
                is_done: true
            });
        }
        catch(err) {
            await db('watch_progress').where({ 
                lesson_id: lesson_id, 
                user_id: user_id
            })
            .update({
                is_done: true
            });
        }
    },

    async tracking(lesson_id, user_id, progress_time) {
        try {
            await db('watch_progress').insert({
                lesson_id: lesson_id,
                user_id: user_id,
                progress_time: progress_time,
                is_done: false
            });
        }
        catch(err) {
            await db('watch_progress').where({ 
                lesson_id: lesson_id, 
                user_id: user_id
            })
            .update({
                progress_time: progress_time
            });
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