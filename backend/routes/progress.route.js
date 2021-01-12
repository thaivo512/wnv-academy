
const express = require('express'); 
const validate = require('../middlewares/validate.mdw'); 
const auth = require('../middlewares/auth.mdw');
const userRole = require('../config/userRole'); 
const lessonModel = require('../models/lesson.model'); 
const progressModel = require('../models/progress.model');
 
const router = express.Router();


// PROGRESS
router.post('/', auth(userRole.STUDENT), validate(progressModel), async(req, res) => {
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