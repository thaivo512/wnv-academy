const express = require('express');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const userModel = require('../models/user.model');
const accessTokenUtils = require('../utils/auth-access-token');
const auth = require('../middlewares/auth.mdw');
const mailSender = require('../utils/mail-sender');
const fs = require('fs');
const path = require('path');
const userRole = require('../config/userRole');
const validate = require('../middlewares/validate.mdw');
const user_schema = require('../schemas/user.json');

const router = express.Router();


router.post('/request-otp', auth(), async (req, res) => {
    
    const user = await userModel.single(req.accessTokenPayload.id);
    if(user == null) return res.json({
        is_success: false,
        message: 'Khong tim thay user'
    })

    user.otp_code = randomstring.generate({
        length: 6,
        charset: 'numeric'
    })
    
    await userModel.renewOTPCode(user.id, user.otp_code);
    var filepath = path.join(__dirname, '..', 'config', 'mail-sign-up-template.html');
    html = fs.readFileSync(filepath, 'utf8');
    html = html.replace('{{name}}', user.name);
    html = html.replace('{{code}}', user.otp_code);
    await mailSender.send(user.email, 'Verify your WNC-Academy account', html);

    return res.json({
        is_success: true
    })
})

router.post('/verify-email', auth(), async (req, res) => {

    const { otp_code } = req.body;
    
    const user = await userModel.single(req.accessTokenPayload.id);
    if(user == null) return res.json({
        is_success: false,
        message: 'Khong tim thay user'
    })

    if(user.otp_code && user.otp_code == otp_code) {
        const accessToken = accessTokenUtils.generate(user);
        const refreshToken = randomstring.generate();

        await userModel.active(user.id);
        await userModel.refreshToken(user.id, refreshToken);
        await userModel.removeOTPCode(user.id);

        return res.json({
            is_success: true,
            access_token: accessToken,
            refresh_token: refreshToken
        })
    }


    await userModel.removeOTPCode(user.id);
    return res.json({
        is_success: false,
        message: 'OTP code khong hop le'
    })
})

router.post('/reset-password', auth(), async (req, res) => {

    const { old_password, new_password } = req.body;
    
    const user = await userModel.single(req.accessTokenPayload.id);

    if(user == null) return res.json({
        is_success: false,
        message: 'Khong tim thay user'
    })
    if (!bcrypt.compareSync(old_password, user.password)) {
        return res.json({
            is_success: false,
            message: "Mat khau cu khong dung"
        });
    }
    
    const accessToken = accessTokenUtils.generate(user)
    const refreshToken = randomstring.generate(); 
    const password = bcrypt.hashSync(new_password, 10);

    await userModel.resetPassword(user.id, password);
    await userModel.refreshToken(user.id, refreshToken);

    res.json({
        is_success: true,
        access_token: accessToken,
        refresh_token: refreshToken
    })
})

router.put('/change-name', auth(), async (req, res) => {

    const { name } = req.body;
    
    await userModel.changeName(req.accessTokenPayload.id, name);
    
    const user = await userModel.single(req.accessTokenPayload.id);
    if(user == null) return res.json({
        is_success: false,
        message: 'Khong tim thay user'
    })

    const accessToken = accessTokenUtils.generate(user)

    res.json({
        is_success: true,
        access_token: accessToken
    })
})

router.put('/change-email', auth(), async (req, res) => {

    const { email } = req.body;
    
    await userModel.changeEmail(req.accessTokenPayload.id, email);
    
    const user = await userModel.single(req.accessTokenPayload.id);
    if(user == null) return res.json({
        is_success: false,
        message: 'Khong tim thay user'
    })


    otp_code = randomstring.generate({
        length: 6,
        charset: 'numeric'
    })
    await userModel.renewOTPCode(user.id, otp_code);
    const accessToken = accessTokenUtils.generate(user);

    var filepath = path.join(__dirname, '..', 'config', 'mail-sign-up-template.html');
    html = fs.readFileSync(filepath, 'utf8');
    html = html.replace('{{name}}', user.name);
    html = html.replace('{{code}}', otp_code);
    await mailSender.send(user.email, 'Verify your WNC-Academy account', html);

    res.json({
        is_success: true,
        access_token: accessToken
    })
})

router.get('/me', auth(), async (req, res) => {    
    const user = await userModel.single(req.accessTokenPayload.id);

    if(user == null) {
        return res.json({
            is_success: false,
            message: 'Khong tim thay user'
        })
    }  

    res.json({
        is_success: true,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active
    })
})

router.post('/teachers', validate(user_schema), auth(userRole.ADMIN), async (req, res) => {    
    const user = req.body;
    user.is_active = true;
    user.role = userRole.TEACHER;
    user.password = bcrypt.hashSync(user.password, 10);

    const isExistEmail = await userModel.existByEmail(user.email);
    if(isExistEmail) return res.json({
        is_success: false,
        message: 'Email da duoc dang ky!!!'
    }); 
    const isExistUsername = await userModel.existByUsername(user.username);
    if(isExistUsername) return res.json({
        is_success: false,
        message: 'Username da duoc dang ky!!!'
    }); 

    user.id = await userModel.add(user);

    res.json({
        is_success: true,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    });
})


router.get('/', auth(userRole.ADMIN), async (req, res) => {
    
    const user = await userModel.all(req.query.is_active, req.query.role);

    res.json(user.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        is_active: u.is_active
    })))
})

router.get('/:id', auth(userRole.ADMIN), async (req, res) => {
    
    const user = await userModel.single(req.params.id);
    
    if (user == null) return res.json({
        is_success: false,
        message: 'Khong tim thay user'
    })

    res.json({
        is_success: true,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active
    })
})

router.delete('/:id', auth(userRole.ADMIN), async (req, res) => {
    
     await userModel.delete(req.params.id);
  
    res.json({
        is_success: true
    })
})



module.exports = router;