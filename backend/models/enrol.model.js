const db = require('../utils/db');

module.exports = {

    async enrol(courseEnrol) {
        
        await db('course_enrol').insert(courseEnrol);
        
    },

    async isEnrolled(user_id, course_id) {
        const lessons = await db('course_enrol').where({
            user_id: user_id,
            course_id: course_id
        });

        return lessons.length > 0;
    },

    async all(userId) {
        
       return await db('course_enrol_view').where({user_id: userId});
        
    },

};