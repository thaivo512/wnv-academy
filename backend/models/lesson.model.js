const db = require('../utils/db');

module.exports = {

    async all(courseId) {
        const lessons = await db('course_lesson').where({
            course_id: courseId
        });

        return lessons;
    },

    async learn(courseId, userId) {
        const lessons = await db('course_lesson')
        .leftJoin('watch_progress', function(){
            this.on('course_lesson.id', 'watch_progress.lesson_id')
            .andOn('watch_progress.user_id', userId)
        })
        .where({
            course_id: courseId
        });

        return lessons;
    },

    async single(lessonId) {
        const lessons = await db('course_lesson').where({
            id: lessonId
        });

        return lessons.length === 0? null : lessons[0];
    },

    async add(slide) {
        const ids = await db('course_lesson').insert(slide).returning('id');
        
        return ids[0];
    },

    async delete(id) {
        try {
            await db('course_lesson').where({id: id}).del();

            return true;
        } 
        catch(err) {
            return false;
        }
    },

};