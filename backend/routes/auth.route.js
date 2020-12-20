const express = require('express');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const userModel = require('../models/user.model');
const accessTokenUtils = require('../utils/auth-access-token');
const validate = require('../middlewares/validate.mdw');
const user_schema = require('../schemas/user.json');
const ggClient = require('../utils/gg-oauth-client')
const auth = require('../middlewares/auth.mdw')

const router = express.Router();


router.post('/sign-up', validate(user_schema), async (req, res) => {
    const user = req.body;

    const isExist = await userModel.existByEmail(user.email);
    if(isExist) res.json({
        is_success: false,
        message: 'Email da duoc dang ky!!!'
    }); 

    user.role = 'STUDENT';
    user.password = bcrypt.hashSync(user.password, 10);

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
            authenticated: false
        });
    }
    
    const accessToken = accessTokenUtils.generate(user);
    const refreshToken = randomstring.generate();
    await userModel.refreshToken(user.id, refreshToken);

    res.json({
        is_success: true,
        accessToken,
        refreshToken
    })
})


router.post('/gg-oauth', async (req, res) => {

    const ggTokenPayload = await ggClient.verify(req.body.ggToken);
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
        accessToken,
        refreshToken
    })
})


router.post('/refresh', async (req, res) => {
    let tokenPayload;
    const { accessToken, refreshToken } = req.body;
    try {
        tokenPayload = jwt.verify(accessToken, SECRET_KEY, { ignoreExpiration: true });
    }
    catch(err) {
        res.status(200).json({
            is_success: false,
            message: 'Invalid access token.'
        })
    }

    const isValid = await userModel.isValidRefreshToken(tokenPayload.id, refreshToken);

    if(!isValid) {
        res.status(200).json({
            is_success: false,
            message: 'Invalid refresh token.'
        })
    }

    const newAccessToken = accessTokenUtils.generate(tokenPayload)
    return res.json({
        is_success: true,
        accessToken: newAccessToken
    })
})


router.post('/reset-password', auth(), async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    
    const user = await userModel.single(req.accessTokenPayload.id);

    if(user.password == null) {
        return res.json({
            is_success: false,
            message: "Ban dang nhap bang Google OAuth khong can mat khau"
        })
    }
    if (!bcrypt.compareSync(oldPassword, user.password)) {
        return res.json({
            is_success: false,
            message: "Mat khau cu khong dung"
        });
    }
    
    const accessToken = accessTokenUtils.generate(user)
    const refreshToken = randomstring.generate(); 
    const password = bcrypt.hashSync(newPassword, 10);

    await userModel.refreshToken(user.id, refreshToken);
    await userModel.resetPassword(user.id, password);


    res.json({
        is_success: true,
        accessToken,
        refreshToken
    })
})

module.exports = router;