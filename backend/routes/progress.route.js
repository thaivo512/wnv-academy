
const express = require('express'); 
const validate = require('../middlewares/validate.mdw'); 
const auth = require('../middlewares/auth.mdw');
const userRole = require('../config/userRole'); 
const lessonModel = require('../models/lesson.model'); 
const progressModel = require('../models/progress.model');
const progressSchema = require('../schemas/progress.json');
 
const router = express.Router();


// PROGRESS
router.post('/done/:lesson_id', auth(userRole.STUDENT), async(req, res) => {
    const lesson_id = req.params.lesson_id;
    const user_id = req.accessTokenPayload.id;
    
    const lesson = await lessonModel.single(lesson_id);
    if(lesson == null){

        return res.json({
            is_success: false,
            message: "Khong tim thay bai hoc yeu cau"
        }) 
    }
    

    await progressModel.done(lesson_id, user_id);

    return res.json({
        is_success: true
    })
})


router.post('/tracking', auth(userRole.STUDENT), async(req, res) => {
    const { lesson_id, process_time } = req.body;
    const user_id = req.accessTokenPayload.id;
    
    const lesson = await lessonModel.single(lesson_id);
    if(lesson == null){

        return res.json({
            is_success: false,
            message: "Khong tim thay bai hoc yeu cau"
        }) 
    }
    

    await progressModel.tracking(lesson_id, user_id, process_time);

    return res.json({
        is_success: true
    })
})

router.get('/:lessonId', auth(), async(req, res) => {
    
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