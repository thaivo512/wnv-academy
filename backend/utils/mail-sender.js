const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hungsieuga1997@gmail.com',
        pass: 'Hungga97'
    }
});


function send(to, subject, html){
    transporter.sendMail({
        from: 'hungsieuga1997@gmail.com',
        to,
        subject,
        html
    }, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports = {
    send
}