const express = require('express'); 
const courseModel = require('../models/course.model');
const validate = require('../middlewares/validate.mdw'); 
const auth = require('../middlewares/auth.mdw');
const userRole = require('../config/userRole'); 
const lessonSchema = require('../schemas/lesson.json');
const lessonModel = require('../models/lesson.model');
 
const enrolModel = require('../models/enrol.model'); 

const router = express.Router();




// LESSON

router.post('/', auth(userRole.TEACHER), validate(lessonSchema), async(req, res) => {
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

router.delete('/:course_id/:lesson_id', auth(userRole.TEACHER), async(req, res) => {

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

router.get('/:course_id', auth(), async(req, res) => {

    const course_id = req.params.course_id;
    const user_id = req.accessTokenPayload.id;
    const role = req.accessTokenPayload.role;

    if(role == userRole.TEACHER) {
        const isCreated = await courseModel.isCreated(course_id, user_id);
        if(!isCreated) return res.json({
            is_success: false,
            message: 'Ban khong co quyen de xem'
        })
        
    }
    else if(role == userRole.STUDENT) {
        const isEnrolled = await enrolModel.isEnrolled(user_id, course_id);
        if(!isEnrolled) return res.json({
            is_success: false,
            message: 'Ban can dang ky khoa hoc de xem'
        })
    }


    const lessons = await lessonModel.all(course_id);

    res.json({
        is_success: true,
        lessons: lessons
    })
})

router.get('/learn/:course_id', auth(), async(req, res) => {

    const course_id = req.params.course_id;
    const user_id = req.accessTokenPayload.id;
    const role = req.accessTokenPayload.role;

    if(role == userRole.TEACHER) {
        const isCreated = await courseModel.isCreated(course_id, user_id);
        if(!isCreated) return res.json({
            is_success: false,
            message: 'Ban khong co quyen de xem'
        })
        
    }
    else if(role == userRole.STUDENT) {
        const isEnrolled = await enrolModel.isEnrolled(user_id, course_id);
        if(!isEnrolled) return res.json({
            is_success: false,
            message: 'Ban can dang ky khoa hoc de xem'
        })
    }


    const lessons = await lessonModel.learn(course_id, user_id);

    res.json({
        is_success: true,
        lessons: lessons
    })
})

router.get('/:course_id/:lession_id', auth(), async(req, res) => {

    const course_id = req.params.course_id;
    const lesson_id = req.params.lesson_id;

    const user_id = req.accessTokenPayload.id;
    const role = req.accessTokenPayload.role;

    if(role == userRole.TEACHER) {
        const canExec = await courseModel.canModify(course_id, user_id);
        if(!canExec) return res.json({
            is_success: false,
            message: 'Ban khong co quyen de xem'
        })
        
    }
    else if(role == userRole.STUDENT) {
        const isEnrolled = await enrolModel.isEnrolled(user_id, course_id);
        if(isEnrolled) return res.json({
            is_success: false,
            message: 'Ban can dang ky khoa hoc de xem'
        })
    }


    const lesson = await lessonModel.single(lesson_id);

    res.json({
        is_success: true,
        ...lesson
    })
})




module.exports = router;