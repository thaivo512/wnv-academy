const express = require('express');

const courseModel = require('../models/course.model');
const validate = require('../middlewares/validate.mdw');
const auth = require('../middlewares/auth.mdw');
const userRole = require('../config/userRole');
const courseStatus = require('../config/courseStatus');
const watchlistSchema = require('../schemas/watchlist.json');
const watchlistModel = require('../models/watchlist.model');

const router = express.Router(); 


// WATCH LIST
router.post('/', auth(userRole.STUDENT), validate(watchlistSchema), async(req, res) => {
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


router.get('/', auth(userRole.STUDENT), async(req, res) => {

    userId = req.accessTokenPayload.id;

    const data = await watchlistModel.all(userId);

    res.json({
        is_success: true,
        data: data
    });
})




module.exports = router;