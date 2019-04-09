const https = require('https');
const http = require('http')
const app = require('./app');
//const fs = require('fs')
var ip = require('ip');

const dotenv = require('dotenv');
dotenv.config();

//const https_port = process.env.HTTPS_PORT || 3000

//var httpsOptions ={
//    key: fs.readFileSync('keys/server.key'),
//    cert: fs.readFileSync('keys/server.cert')
//}

//const https_server = https.createServer(httpsOptions, app);
//console.log('HTTPS server is listening on https://localhost:' + https_port)
//https_server.listen(https_port)

const http_port = process.env.HTTP_PORT || 3000
const http_server = http.createServer(app)
console.log('HTTP server is listening on '+ ip.address() +':' + http_port)
http_server.listen(http_port)