const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');

app.use('/OktatoAppAPI/users', userRoutes);
app.use('/OktatoAppAPI/roles', roleRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});
module.exports = app;

//indítás: npm run server