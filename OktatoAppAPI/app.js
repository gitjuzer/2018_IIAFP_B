const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.status(200).json({
        message:"Működik!"
    });
});

module.exports = app;