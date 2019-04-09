const mysql = require('mysql');

//local mysql db connection
const connection = mysql.createConnection({
    host     : 'eu-cdbr-west-02.cleardb.net',
    user     : 'bdc3914efce7d4',
    password : '74899155',
    database : 'heroku_9f6b4f373cfd5f1',
    timezone : 'utc'
});

connection.connect(function(err) {
    if (err){
        console.log('Nem fut az adatbázis!')
    }
});

module.exports = connection;
