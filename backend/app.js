const express = require('express');
const morgan = require('morgan');
require('express-async-errors');
const auth = require('./middlewares/auth.mdw');
const cors = require('cors'); 


const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/user', require('./routes/user.route'));


app.use(function (req, res, next) {
    res.status(404).send({
        error_message: 'Endpoint not found!'
    })
});


app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
        error_message: 'Something broke!'
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Backend api is running at http://localhost:${PORT}`);
});