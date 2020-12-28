const db = require('../utils/db');

module.exports = {

    async all(courseId) {
        const slides = await db('course_slide').where({
            course_id: courseId
        });

        return slides;
    },


    async allPreview(courseId) {
        const slides = await db('course_slide').where({
            course_id: courseId,
            is_allow_preview: true
        });

        return slides;
    },

    async add(slide) {
        const ids = await db('course_slide').insert(slide).returning('id');
        
        return ids[0];
    },

    async delete(id) {
        try {
            await db('course_slide').where({id: id}).del();

            return true;
        } 
        catch(err) {
            return false;
        }
    },

};