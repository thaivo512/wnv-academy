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
    user.role = userRole.STUDENT;
    user.password = bcrypt.hashSync(user.password, 10);
    user.otp_code = randomstring.generate({
        length: 6,
        charset: 'numeric'
    })

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



    var filepath = path.join(__dirname, '..', 'config', 'mail-sign-up-template.html');
    html = fs.readFileSync(filepath, 'utf8');
    html = html.replace('{{name}}', user.name);
    html = html.replace('{{code}}', user.otp_code);
    await mailSender.send(user.email, 'Verify your WNC-Academy account', html);

    user.id = await userModel.add(user);

    res.json({
        is_success: true,
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
    });
})
  

router.post('/sign-in', async (req, res) => {
    const {username, password} = req.body;

    const user = await userModel.singleByUsername(username);

    if (user === null) {
        return res.json({
            is_success: false,
            message: "Username hoac password khong dung"
        });
    } 
    if (!bcrypt.compareSync(password, user.password)) {
        return res.json({
            is_success: false,
            message: "Username hoac password khong dung"
        });
    }
    
    const refreshToken = randomstring.generate();
    await userModel.refreshToken(user.id, refreshToken);
    const accessToken = accessTokenUtils.generate(user);

    res.json({
        is_success: true,
        access_token : accessToken,
        refresh_token: refreshToken
    })
})


router.post('/gg-oauth', async (req, res) => {

    const {gg_token, username, password} = req.body;

    const ggTokenPayload = await ggClient.verify(gg_token);
    if(ggTokenPayload == null) {
        return res.json({
            is_success: false,
            message: "Google token khong hop le"
        });
    }
    
    const { name, email } = ggTokenPayload;
    let user = await userModel.singleByEmail(email);
    if(user === null) {
        const isExistEmail = await userModel.existByEmail(email);
        if(isExistEmail) return res.json({
            is_success: false,
            message: 'Email nay da bi chan!!!'
        }); 

        if(!username || !password) return res.json({
            is_success: true,
            access_token: null,
            refresh_token: null
        })

        const isExistUsername = await userModel.existByUsername(username);
        if(isExistUsername) return res.json({
            is_success: false,
            message: 'Username da duoc dang ky!!!'
        }); 

        user = {
            name: name,
            email: email,
            username: username,
            password: password,
            role: 'STUDENT',
            is_active: true
        }
        user.id = await userModel.add(user);
    }

    const refreshToken = randomstring.generate();
    await userModel.refreshToken(user.id, refreshToken);
    const accessToken = accessTokenUtils.generate(user);

    res.json({
        is_success: true,
        access_token : accessToken,
        refresh_token: refreshToken
    })
})


router.post('/refresh', async (req, res) => { 
    const { access_token, refresh_token } = req.body;
    
    const tokenPayload = accessTokenUtils.validateIgnoreExpired(access_token);
    if(tokenPayload == null) {
        return res.status(200).json({
            isSuccess: false,
            message: 'Access token khong hop le.'
        })
    }

    const isValid = await userModel.isValidRefreshToken(tokenPayload.id, refresh_token);

    if(!isValid) {
        return res.status(200).json({
            isSuccess: false,
            message: 'Refresh token khong hop le.'
        })
    }

    const newAccessToken = accessTokenUtils.generate(tokenPayload)
    return res.json({
        is_success: true,
        access_token: newAccessToken
    })
})

module.exports = router;