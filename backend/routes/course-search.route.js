const express = require('express'); 
const courseModel = require('../models/course.model'); 
const auth = require('../middlewares/auth.mdw'); 
const viTextHelper = require('../utils/viTextHelper'); 
const enrolModel = require('../models/enrol.model'); 
const watchlistModel = require('../models/watchlist.model'); 

const router = express.Router();
 

// COURSE SEARCH
router.get('/top4enroll', async(req, res) => {
    const data = await courseModel.top4enroll();

    res.json({
        is_success: true,
        data: data
    });
})

router.get('/top10view', async(req, res) => {
    const data = await courseModel.top10view();

    res.json({
        is_success: true,
        data: data
    });
})


router.get('/top10new', async(req, res) => {
    const data = await courseModel.top10new();

    res.json({
        is_success: true,
        data: data
    });
})


router.get('/top5enrolSimilar/:courseId', async(req, res) => {

    const courseId = req.params.courseId;

    const course = await courseModel.single(courseId);
    if(course == null) {
        return res.json({
            is_success: false,
            message: "Khong tim thay khoa hoc yeu cau"
        })
    }

    const data = await courseModel.top5enrolSimilar(course.category_id, course.id);

    res.json({
        is_success: true,
        data: data
    });
})


router.get('/:courseId', async(req, res) => {

    const courseId = req.params.courseId;
    const userId = req.accessTokenPayload.id;

    const course = await courseModel.singleView(courseId);
    if(course == null) {
        return res.json({
            is_success: false,
            message: "Khong tim thay khoa hoc yeu cau"
        })
    }

    course.is_enrolled = await enrolModel.isEnrolled(userId, courseId);
    course.is_watchlisted = await watchlistModel.exist(userId, courseId);

    await courseModel.increaseViewCount(courseId);

    res.json({
        is_success: true,
        data: course
    });
})


router.get('/', async(req, res) => {
    
    let q = req.query.q;
    let sort = req.query.sort;
    let direct = req.query.direct;
    let categories = req.query.categories;
    let page = +req.query.page || 1;
    let size = +req.query.size || 10;
    let skip = (page-1)*size;

    if(categories) categories = categories.trim();
    if(categories) categories = categories.split(',');
    let query = viTextHelper.normalized(q).replace(/\s+/g, '&');

    let course = await courseModel.search(categories, query, sort, direct);

    res.json({
        is_success: true,
        total: course.length,
        page: page,
        size: size,
        data: course.slice(skip, skip + size)
    });
})
 

module.exports = router;