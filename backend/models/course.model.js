const db = require('../utils/db');
const courseStatus = require('../config/courseStatus')

module.exports = {

    async single(id) {
        const course = await db('course').where({
            id: id
        });

        return course.length === 0? null : course[0];
    },

    async canModify(id, teacher_id) {
        const course = await db('course').where({
            id: id,
            teacher_id: teacher_id,
            status: courseStatus.PRIVATE
        });

        return course.length > 0;
    },

    async add(course) {
        const ids = await db('course').insert(course).returning('id');
        
        return ids[0];
    },

    async update(course) {
        try {
            await db('course').where({ id: course.id }).update(course);

            return true;
        }
        catch(err) {
            return false;
        }
    },

    async publish(id) {
        try {
            await db('course').where({ id: id }).update({status: courseStatus.PUBLIC});

            return true;
        }
        catch(err) { 
            return false;
        }
    },


    async block(id) {
        try {
            await db('course').where({ id: id }).update({status: courseStatus.BLOCKED});

            return true;
        }
        catch(err) {
            return false;
        }
    }

};