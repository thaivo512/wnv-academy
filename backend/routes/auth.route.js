const express = require('express');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const userModel = require('../models/user.model');
const accessTokenUtils = require('../utils/auth-access-token');
const validate = require('../middlewares/validate.mdw');
const user_schema = require('../schemas/user.json');
const ggClient = require('../utils/gg-oauth-client'); 
const mailSender = require('../utils/mail-sender');
const fs = require('fs');
const path = require('path');
const userRole = require('../config/userRole');

const router = express.Router();


router.post('/sign-up', validate(user_schema), async (req, res) => {

    const user = req.body;
    user.is_active = false;
    user.otp_code = randomstring.generate({
        length: 6,
        charset: 'numeric'
    })

    const isExist = await userModel.existByEmail(user.email);
    if(isExist) return res.json({
        is_success: false,
        message: 'Email da duoc dang ky!!!'
    }); 

    user.role = userRole.STUDENT;
    user.password = bcrypt.hashSync(user.password, 10);


    var filepath = path.join(__dirname, '..', 'config', 'mail-sign-up-template.html');
    html = fs.readFileSync(filepath, 'utf8');
    html = html.replace('{{name}}', user.name);
    html = html.replace('{{code}}', user.otp_code);
    await mailSender.send(user.email, 'Verify your WNC-Academy account', html);

    user.id = await userModel.add(user);

    res.json({
        is_success: true,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    });
})
  

router.post('/sign-in', async (req, res) => {

    const user = await userModel.singleByEmail(req.body.email);

    if (user === null) {
        return res.json({
            is_success: false,
        });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.json({
            is_success: false
        });
    }
    
    const accessToken = accessTokenUtils.generate(user);
    const refreshToken = randomstring.generate();
    await userModel.refreshToken(user.id, refreshToken);

    res.json({
        is_success: true,
        access_token : accessToken,
        refresh_token: refreshToken
    })
})


router.post('/gg-oauth', async (req, res) => {

    const ggTokenPayload = await ggClient.verify(req.body.gg_token);
    if(ggTokenPayload == null) {
        return res.json({
            is_success: false,
        });
    }
    
    const {name, email} = ggTokenPayload;
    let user = await userModel.singleByEmail(email);
    if(user === null) {
        user = {
            name: name,
            email: email,
            role: 'STUDENT',
            is_active: true
        }
        user.id = await userModel.add(user);
    }

    const accessToken = accessTokenUtils.generate(user);
    const refreshToken = randomstring.generate();
    await userModel.refreshToken(user.id, refreshToken);

    res.json({
        is_success: true,
        access_token : accessToken,
        refresh_token: refreshToken
    })
})


router.post('/refresh', async (req, res) => {
    let tokenPayload;
    const { access_token, refresh_token } = req.body;
    
    tokenPayload = accessTokenUtils.validateIgnoreExpired(access_token);
    if(tokenPayload == null) {
        return res.status(200).json({
            isSuccess: false,
            message: 'Invalid access token.'
        })
    }

    const isValid = await userModel.isValidRefreshToken(tokenPayload.id, refresh_token);

    if(!isValid) {
        return res.status(200).json({
            isSuccess: false,
            message: 'Invalid refresh token.'
        })
    }

    const newAccessToken = accessTokenUtils.generate(tokenPayload)
    return res.json({
        is_success: true,
        access_token: newAccessToken
    })
})

module.exports = router;