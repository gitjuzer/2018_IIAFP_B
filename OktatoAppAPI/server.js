const https = require('https');
const app = require('./app');
const fs = require('fs')

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;

var httpsOptions ={
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.cert')
}

const server = https.createServer(httpsOptions, app);

console.log('Server is listening on port ' + process.env.PORT)
server.listen(port);