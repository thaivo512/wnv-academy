const express = require('express'); 
const courseModel = require('../models/course.model');
const validate = require('../middlewares/validate.mdw'); 
const auth = require('../middlewares/auth.mdw');
const userRole = require('../config/userRole'); 
const courseStatus = require('../config/courseStatus'); 
 
const enrolModel = require('../models/enrol.model'); 
const feedbackSchema = require('../schemas/feedback.json');
const feedbackModel = require('../models/feedback.model'); 

const router = express.Router();

 
// FEEDBACK
router.post('/', auth(userRole.STUDENT), validate(feedbackSchema), async(req, res) => {
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

router.get('/:courseId', async(req, res) => {
    
    const course_id = req.params.courseId;

    const data = await feedbackModel.all(course_id);

    res.json({
        is_success: true,
        data: data
    })
})


module.exports = router;