const mysql = require("mysql");
const dbConfig = require("./config");

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (!err) console.log("DB connection succeded.");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
});

module.exports = connection;
