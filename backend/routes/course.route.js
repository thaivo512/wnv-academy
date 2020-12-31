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

const enrolSchema = require('../schemas/enrol.json');
const enrolModel = require('../models/enrol.model');
const watchlistSchema = require('../schemas/watchlist.json');
const watchlistModel = require('../models/watchlist.model');
const feedbackSchema = require('../schemas/feedback.json');
const feedbackModel = require('../models/feedback.model');
const progressSchema = require('../schemas/progress.json');
const progressModel = require('../models/progress.model');

const requireActive = require('../middlewares/requireActive.mdw');

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

    const course_id = req.params.course_id;
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

    const course_id = req.params.course_id;
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


    const lessons = await lessonModel.all(course_id);

    res.json({
        is_success: true,
        lessons: lessons
    })
})

router.get('/lesson/:course_id/:lession_id', auth(), async(req, res) => {

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


// ENROL
router.post('/enrol', auth(userRole.STUDENT), requireActive(), validate(enrolSchema), async(req, res) => {
    enrolCourse = req.body;
    enrolCourse.user_id = req.accessTokenPayload.id;
    enrolCourse.enrol_at = +new Date();

    const course = await courseModel.single(enrolCourse.course_id);
    if(course == null || course.status != courseStatus.PUBLIC)
        return res.json({
            is_success: false,
            message: "Ban khong the dang ky khoa hoc nay"
        })

    const isEnrolled = await enrolModel.isEnrolled(enrolCourse.user_id, enrolCourse.course_id);
    if(isEnrolled) return res.json({
        is_success: false,
        message: 'Ban da dang ky khoa hoc nay roi'
    })
    

    await enrolModel.enrol(enrolCourse);

    res.json({
        is_success: true
    })
})


// WATCH LIST
router.post('/watchlist', auth(userRole.STUDENT), validate(watchlistSchema), async(req, res) => {
    watchlist = req.body;
    watchlist.user_id = req.accessTokenPayload.id;

    const course = await courseModel.single(watchlist.course_id);
    if(course == null || course.status != courseStatus.PUBLIC)
        return res.json({
            is_success: false,
            message: "Ban khong the luu khoa hoc nay"
        })

    const isExist = await watchlistModel.exist(watchlist.user_id, watchlist.course_id);
    if(isExist) return res.json({
        is_success: false,
        message: 'Ban da them khoa hoc nay roi'
    })
    

    await watchlistModel.add(watchlist);

    res.json({
        is_success: true
    })
})


// FEEDBACK
router.post('/feedback', auth(userRole.STUDENT), validate(feedbackSchema), async(req, res) => {
    feedback = req.body;
    feedback.user_id = req.accessTokenPayload.id;
    feedback.last_update = +new Date();

    const course = await courseModel.single(feedback.course_id);
    if(course == null || course.status != courseStatus.PUBLIC)
        return res.json({
            is_success: false,
            message: "Ban khong the danh gia khoa hoc nay"
        })
 
    const isEnrolled = await enrolModel.isEnrolled(feedback.user_id, feedback.course_id);
    if(!isEnrolled) return res.json({
        is_success: false,
        message: 'Ban chua dang ky khoa hoc nen khong the danh gia'
    })
    

    await feedbackModel.add(feedback);

    res.json({
        is_success: true
    })
})

router.get('/feedback/:courseId', auth(), async(req, res) => {
    
    const course_id = req.params.courseId;

    const data = await feedbackModel.all(course_id);

    res.json({
        is_success: true,
        data: data
    })
})


// PROGRESS
router.post('/progress', auth(userRole.STUDENT), validate(progressModel), async(req, res) => {
    progress = req.body;
    progress.user_id = req.accessTokenPayload.id;
    
    const lesson = await lessonModel.single(progress.lesson_id);
    if(lesson == null)
        return res.json({
            is_success: false,
            message: "Khong tim thay bai hoc yeu cau"
        }) 
    

    await progressModel.add(progress);

    res.json({
        is_success: true
    })
})

router.get('/progress/:lessonId', auth(), async(req, res) => {
    
    const lessonId = req.params.lessonId;
    const userId = req.accessTokenPayload.id;

    const data = await progressModel.single(userId, lessonId);

    if (data == null) {
        return res.json({
            is_success: false,
            message: "Khong co du lieu"
        })
    }

    return res.json({
        is_success: true,
        data: data
    })
})


module.exports = router;