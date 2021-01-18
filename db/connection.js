const util = require("util");
const mysql = require("mysql");
// using dotenv to hide credentials
const dotenv = require('dotenv');
dotenv.config();

//please use your own login credentials to access this project
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: "tracker_DB"
});

connection.connect(function(err) {
    if (err) throw err;
  });

connection.query = util.promisify(connection.query);

module.exports=connection;

