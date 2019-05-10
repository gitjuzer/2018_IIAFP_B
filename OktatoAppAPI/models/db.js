const mysql = require('mysql');

const pool = mysql.createPool({
    host     : 'kcpgm0ka8vudfq76.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    user     : 'xsr7mhrk38tvki9b',
    password : 'gfk5x28jdwcfgbvt',
    database : 'q0o8wzvtnt0izlgf',
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
                return callback(err);
            }
            if(args.length > 2){
                sql_args = args[1];
            }
        connection.query(args[0], sql_args, function(err, results) {
          connection.release(); // always put connection back in pool after last query
          if(err){
                    return callback(err);
                }
          callback(null, results);
        });
      });
    }
};
