const express = require('express');
const categoryModel = require('../models/category.model');
const courseModel = require('../models/course.model');
const validate = require('../middlewares/validate.mdw');
const courseSchema = require('../schemas/course.json');
const auth = require('../middlewares/auth.mdw');
const userRole = require('../config/userRole');
const viTextHelper = require('../utils/viTextHelper');
const courseStatus = require('../config/courseStatus');
const slideSchema = require('../schemas/slide.json');
const slideModel = require('../models/slide.model');
const lessonSchema = require('../schemas/lesson.json');
const lessonModel = require('../models/lesson.model');

const router = express.Router();


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




// SLIDE
router.post('/slide', auth(userRole.TEACHER), validate(slideSchema), async(req, res) => {
    slide = req.body;

    const canExec = await courseModel.canModify(slide.course_id, req.accessTokenPayload.id);
    if(!canExec) return res.json({
        is_success: false,
        message: 'Khoa hoc da hoan thanh khong the sua doi'
    })
    

    slide.id = await slideModel.add(slide);

    res.json({
        is_success: true,
        ...slide
    })
})

router.delete('/slide/:course_id/:slide_id', auth(userRole.TEACHER), async(req, res) => {

    const course_id = req.params.course_id;
    const slide_id = req.params.slide_id;


    const canExec = await courseModel.canModify(course_id, req.accessTokenPayload.id);
    if(!canExec) return res.json({
        is_success: false,
        message: 'Khoa hoc da hoan thanh khong the sua doi'
    })

    const isSuccess = await slideModel.delete(slide_id);

    if(isSuccess) return res.json({
        is_success: true
    })

    res.json({
        is_success: false,
        message: 'Co loi xay ra. Thu lai sau'
    })
})

router.get('/slide/:course_id', auth(), async(req, res) => {

    const slides = await slideModel.all(req.params.course_id);

    res.json({
        is_success: true,
        slides: slides
    })
})

router.get('/slide/preview/:course_id', auth(), async(req, res) => {

    const slides = await slideModel.allPreview(req.params.course_id);

    res.json(slides)
})



// LESSON

router.post('/lesson', auth(userRole.TEACHER), validate(lessonSchema), async(req, res) => {
    lesson = req.body;

    const canExec = await courseModel.canModify(lesson.course_id, req.accessTokenPayload.id);
    if(!canExec) return res.json({
        is_success: false,
        message: 'Khoa hoc da hoan thanh khong the sua doi'
    })
    

    lesson.id = await lessonModel.add(lesson);

    res.json({
        is_success: true,
        ...lesson
    })
})

router.delete('/lesson/:course_id/:lesson_id', auth(userRole.TEACHER), async(req, res) => {

    const course_id = req.params.course_id;
    const lesson_id = req.params.lesson_id;


    const canExec = await courseModel.canModify(course_id, req.accessTokenPayload.id);
    if(!canExec) return res.json({
        is_success: false,
        message: 'Khoa hoc da hoan thanh khong the sua doi'
    })

    const isSuccess = await lessonModel.delete(lesson_id);

    if(isSuccess) return res.json({
        is_success: true
    })

    res.json({
        is_success: false,
        message: 'Co loi xay ra. Thu lai sau'
    })
})

router.get('/lesson/:course_id', auth(), async(req, res) => {

    const lessons = await lessonModel.all(req.params.course_id);

    res.json({
        is_success: true,
        lessons: lessons
    })
})

router.get('/lesson/:course_id/:lession_id', auth(), async(req, res) => {

    const course_id = req.params.course_id;
    const lesson_id = req.params.lesson_id;

    const lesson = await lessonModel.single(course_id);

    res.json({
        is_success: true,
        ...lesson
    })
})



module.exports = router;