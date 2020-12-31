const db = require('../utils/db');


module.exports = {

    async add(feedback) {
        try {
            await db('feedback').insert(feedback);
        }
        catch(err) {
            await db('feedback').where({ 
                course_id: feedback.course_id, 
                user_id: feedback.user_id
            })
            .update(feedback);
        }
    },

    async all(courseId) {
        return db('feedback_view').where({ 
            course_id: courseId
        });
    }


};