const mysql = require('mysql');

//local mysql db connection
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'oktatoappdb',
    timezone : 'utc'
});

connection.connect(function(err) {
    if (err){
        console.log('Nem fut az adatbázis!')
    }
});

module.exports = connection;
