const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path')
var fs = require('fs')
const message = require('./utilities/jsonmessage')

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan('dev'));
app.use(morgan('combined', { stream: accessLogStream }));
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
const myselfRoutes = require('./routes/myself')
const gamemodeRoutes = require('./routes/gamemode')
const gamesessionRoutes = require('./routes/gamesession')
const difficultyRoutes = require('./routes/difficulty')
const questionRoutes = require('./routes/question')
const wronganswerRoutes = require('./routes/wronganswer')
const correctanswerRoutes = require('./routes/correctanswer')
const statisticRoutes = require('./routes/statistic')

app.use('/OktatoAppAPI/myself', myselfRoutes)
app.use('/OktatoAppAPI/users', userRoutes);
app.use('/OktatoAppAPI/roles', roleRoutes);
app.use('/OktatoAppAPI/permissions', pemissionRoutes)
app.use('/OktatoAppAPI/classrooms', classroomRoutes)
app.use('/OktatoAppAPI/game-modes',gamemodeRoutes)
app.use('/OktatoAppAPI/game-sessions',gamesessionRoutes)
app.use('/OktatoAppAPI/difficulties',difficultyRoutes)
app.use('/OktatoAppAPI/questions',questionRoutes)
app.use('/OktatoAppAPI/wrong-answers',wronganswerRoutes)
app.use('/OktatoAppAPI/correct-answers', correctanswerRoutes)
app.use('/OktatoAppAPI/statistics', statisticRoutes)

app.use((req,res,next)=>{
    const error = new Error('Nem található');
    error.status = 404;
    next(error);
});

app.use((error, req,res,next)=>{
    res.status(error.status || 500);
    res.json(message.compose(error.status || 500, error.message));
});
module.exports = app;

//indítás: npm run server
