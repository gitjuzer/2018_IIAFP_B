const mysql = require('mysql');

//local mysql db connection
const pool = mysql.createPool({
    host     : 'eu-cdbr-west-02.cleardb.net',
    user     : 'bdc3914efce7d4',
    password : '74899155',
    database : 'heroku_9f6b4f373cfd5f1',
    timezone : 'utc'
});

module.exports = {
    query: function(){
        var sql_args = [];
        var args = [];
        for(var i=0; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        var callback = args[args.length-1]; //last arg is callback
        pool.getConnection(function(err, connection) {
        if(err) {
                console.log(err);
                return callback(err);
            }
            if(args.length > 2){
                sql_args = args[1];
            }
        connection.query(args[0], sql_args, function(err, results) {
          connection.release(); // always put connection back in pool after last query
          if(err){
                    console.log(err);
                    return callback(err);
                }
          callback(null, results);
        });
      });
    }
};
