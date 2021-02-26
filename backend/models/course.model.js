const db = require('../utils/db');
const courseStatus = require('../config/courseStatus')

module.exports = {

    async single(id) {
        const course = await db('course').where({
            id: id
        });

        return course.length === 0? null : course[0];
    },

    async increaseViewCount(id) {
        
        await db('course')
            .where('id', '=', id)
            .increment('view_count', 1);
    },

    async canModify(id, teacher_id) {
        const course = await db('course').where({
            id: id,
            teacher_id: teacher_id,
            status: courseStatus.PRIVATE
        });

        return course.length > 0;
    },


    async isCreated(id, teacher_id) {
        const course = await db('course').where({
            id: id,
            teacher_id: teacher_id
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
    },


    async top3enrollweek() {
        return await db('course_view')
            .where('status', courseStatus.PUBLIC)
            .orderBy('week_enrol', 'desc')
            .limit(3);

    },

    async top10view() {
        return await db('course_view')
            .where('status', courseStatus.PUBLIC)
            .orderBy('view_count', 'desc')
            .limit(10);

    },

    async top10new() {
        return await db('course_view')
            .where('status', courseStatus.PUBLIC)
            .orderBy('last_update', 'desc')
            .limit(10);

    },

    async top5enrolSimilar(categoryId, courseId) {
        return await db('course_view')
            .where({
                category_id: categoryId,
                status: courseStatus.PUBLIC
            })
            .whereNot('id', courseId)
            .orderBy('view_count', 'desc')
            .limit(5);

    },

    async singleView(courseId) {
        const course = await db('course_view')
            .where({
                id: courseId
            });

        if (course.length == 0) return null;
        return course[0];
    },

    async createdBy(teacherId) {
        return db('course_view')
            .where({
                teacher_id: teacherId
            }); 
    },

    async search(categories, query, sort, direct) {

        if(categories && categories.length > 0) {
            if(query && query.length > 0)
                return await db('course_view')
                    .where('status', courseStatus.PUBLIC)
                    .whereIn('category_id', categories)
                    .where(db.raw(`to_tsvector(search_term) @@ to_tsquery(?)`, query))
                    .orderBy(sort, direct); 

            return await db('course_view')
                .where('status', courseStatus.PUBLIC)
                .whereIn('category_id', categories)
                .orderBy(sort, direct); 
        }

        return await db('course_view')
            .where('status', courseStatus.PUBLIC)
            .where(db.raw(`to_tsvector(search_term) @@ to_tsquery(?)`, query))
            .orderBy(sort, direct); 
    },
};
