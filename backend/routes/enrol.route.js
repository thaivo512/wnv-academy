const express = require('express'); 
const courseModel = require('../models/course.model');
const validate = require('../middlewares/validate.mdw'); 
const auth = require('../middlewares/auth.mdw');
const userRole = require('../config/userRole'); 
const courseStatus = require('../config/courseStatus'); 
const enrolSchema = require('../schemas/enrol.json');
const enrolModel = require('../models/enrol.model'); 

const requireActive = require('../middlewares/requireActive.mdw'); 

const router = express.Router();

 

// ENROL
router.post('/', auth(), requireActive(), validate(enrolSchema), async(req, res) => {
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


router.get('/', auth(), async(req, res) => {

    userId = req.accessTokenPayload.id;

    const data = await enrolModel.all(userId);

    res.json({
        is_success: true,
        data: data
    });
})
 



module.exports = router;