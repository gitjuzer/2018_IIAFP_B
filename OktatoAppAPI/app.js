const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');
const pemissionRoutes = require('./routes/permission');
const classroomRoutes = require('./routes/classroom')


app.use('/OktatoAppAPI/users', userRoutes);
app.use('/OktatoAppAPI/roles', roleRoutes);
app.use('/OktatoAppAPI/permissions', pemissionRoutes)
app.use('/OktatoAppAPI/classrooms', classroomRoutes)

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