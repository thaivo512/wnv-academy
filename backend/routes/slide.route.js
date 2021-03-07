const express = require('express'); 
const courseModel = require('../models/course.model');
const validate = require('../middlewares/validate.mdw'); 
const auth = require('../middlewares/auth.mdw');
const userRole = require('../config/userRole'); 
const slideSchema = require('../schemas/slide.json');
const slideModel = require('../models/slide.model'); 
const enrolModel = require('../models/enrol.model'); 
const router = express.Router();


// SLIDE
router.post('/', auth(userRole.TEACHER), validate(slideSchema), async(req, res) => {
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

router.delete('/:course_id/:slide_id', auth(userRole.TEACHER), async(req, res) => {

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


    const slides = await slideModel.all(req.params.course_id);

    res.json({
        is_success: true,
        slides: slides
    })
})

router.get('/preview/:course_id', async(req, res) => {

    const slides = await slideModel.allPreview(req.params.course_id);

    res.json(slides)
})

 


module.exports = router;