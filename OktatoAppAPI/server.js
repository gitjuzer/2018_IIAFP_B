const https = require('https');
const app = require('./app');
const fs = require('fs')

const dotenv = require('dotenv');
dotenv.config();

const https_port = process.env.HTTPS_PORT || 3000

var httpsOptions ={
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.cert')
}

const https_server = https.createServer(httpsOptions, app);
console.log('HTTPS server is listening on https://localhost:' + process.env.HTTPS_PORT)
https_server.listen(https_port)