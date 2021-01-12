const express = require('express');
const categoryModel = require('../models/category.model');
const courseModel = require('../models/course.model');
const validate = require('../middlewares/validate.mdw');
const courseSchema = require('../schemas/course.json');
const auth = require('../middlewares/auth.mdw');
const userRole = require('../config/userRole');
const viTextHelper = require('../utils/viTextHelper');
const courseStatus = require('../config/courseStatus');  

const router = express.Router();


// COURSE
router.post('/', auth(userRole.TEACHER), validate(courseSchema), async(req, res) => {
    course = req.body;
    course.view_count = 0
    course.status = courseStatus.PRIVATE;
    course.last_update = + new Date();
    course.teacher_id = req.accessTokenPayload.id;
    course.search_term = viTextHelper.normalized(course.name);

    const category = await categoryModel.single(course.category_id);
    if(category == null) return res.json({
        is_success: false,
        message: 'Khong tim thay linh vuc yeu cau'
    })
    if(category.parent_id == null) return res.json({
        is_success: false,
        message: 'Linh vuc yeu cau khong hop le'
    })
    
    course.id = await courseModel.add(course);

    res.json({
        is_success: true,
        ...course
    })
})


router.put('/:id', auth(userRole.TEACHER), validate(courseSchema), async(req, res) => {
    course = req.body;
    course.id = req.params.id;
    course.last_update = + new Date();
    course.search_term = viTextHelper.normalized(course.name);

    const canExec = await courseModel.canModify(course.id, req.accessTokenPayload.id);
    if(!canExec) return res.json({
        is_success: false,
        message: 'Khoa hoc da hoan thanh khong the sua doi'
    })

    const category = await categoryModel.single(course.category_id);
    if(category == null) return res.json({
        is_success: false,
        message: 'Khong tim thay linh vuc yeu cau'
    })
    if(category.parent_id == null) return res.json({
        is_success: false,
        message: 'Linh vuc yeu cau khong hop le'
    })

    await courseModel.update(course);
    return res.json({
        is_success: true
    })
})


router.put('/:id/publish', auth(userRole.TEACHER), async(req, res) => {
    course_id = req.params.id;

    const canExec = await courseModel.canModify(course_id, req.accessTokenPayload.id);
    if(!canExec) return res.json({
        is_success: false,
        message: 'Khoa hoc da hoan thanh khong the sua doi'
    })

    await courseModel.publish(course_id);
    return res.json({
        is_success: true
    })
})


router.delete('/:id', auth(userRole.ADMIN), async(req, res) => {
    
    await courseModel.block(req.params.id);
    return res.json({
        is_success: true
    })
})



module.exports = router;