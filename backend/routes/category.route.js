const express = require('express');
const categoryModel = require('../models/category.model');
const validate = require('../middlewares/validate.mdw');
const categorySchema = require('../schemas/category.json');
const auth = require('../middlewares/auth.mdw');
const userRole = require('../config/userRole');

const router = express.Router();


router.post('/', auth(userRole.ADMIN), validate(categorySchema), async(req, res) => {
    category = req.body;

    const isExistName = await categoryModel.existName(category.name);
    if(isExistName) return res.json({
        is_success: false,
        message: 'Ten linh vuc nay da ton tai'
    })
    
    category.id = await categoryModel.add(category);

    res.json({
        is_success: true,
        id: category.id,
        name: category.name
    })
})

router.post('/:id', auth(userRole.ADMIN), validate(categorySchema), async(req, res) => {
    category = req.body;
    category.parent_id = req.params.id;

    const isExistName = await categoryModel.existName(category.name);
    if(isExistName) return res.json({
        is_success: false,
        message: 'Ten linh vuc nay da ton tai'
    })
    const parentCategory = await categoryModel.single(category.parent_id);
    if(parentCategory == null) return res.json({
        is_success: false,
        message: 'Linh vuc goc khong tim thay'
    })
    if(parentCategory.parent_id) return res.json({
        is_success: false,
        message: 'Linh vuc goc khong hop le'
    })
    
    category.id = await categoryModel.add(category);

    res.json({
        is_success: true,
        id: category.id,
        name: category.name
    })
})

router.put('/:id', auth(userRole.ADMIN), validate(categorySchema), async(req, res) => {
    const id = req.params.id;
    const {name} = req.body;

    const isSuccess = await categoryModel.changeName(id, name);

    if(isSuccess) return res.json({
        is_success: true
    })

    res.json({
        is_success: false,
        message: "Ten linh vuc nay da ton tai"
    })
})

router.delete('/:id', auth(userRole.ADMIN), async(req, res) => {

    const isSuccess = await categoryModel.delete(req.params.id);

    if(isSuccess) return res.json({
        is_success: true
    })

    res.json({
        is_success: false,
        message: 'Khong the xoa linh vuc nay'
    })
})

router.get('/:id', auth(), async(req, res) => {

    const category = await categoryModel.singleView(req.params.id);

    if(category == null) return res.json({
        is_success: false,
        message: "Khong tim thay linh vuc yeu cau"
    })

    res.json({
        is_success: true,
        ...category
    })
})

router.get('/', auth(), async(req, res) => {

    const categories = await categoryModel.allView();

    res.json(categories)
})

router.get('/topEnrollWeek', auth(), async(req, res) => {

    const categories = await categoryModel.topEnrolWeek();

    res.json(categories)
})

module.exports = router;