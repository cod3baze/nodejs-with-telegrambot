const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "3ti",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("DB connection succeded.");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
});

app.listen(3000, () =>
  console.log("Express server is runnig at port no : 3000")
);
// localhost:3000/estado
//Get all Estado
app.get("/estado", (req, res) => {
  mysqlConnection.query("select * from estado", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an Estado
app.get("/estado/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM estado WHERE IdEstado = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an Estado
app.delete("/estado/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM estado WHERE IdEstado = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

//Insert an Estado
app.post("/estado", (req, res) => {
  let emp = req.body;
  var sql = "INSERT INTO ESTADO(NomeEstado) values (?)";
  mysqlConnection.query(sql, [emp.NomeEstado], (err, rows, fields) => {
    if (!err) res.send("Inserted successfully.");
    else console.log(err);
  });
});

//Update an Estado
app.put("/estado/:id", (req, res) => {
  let emp = req.body;
  var sql = "UPDATE estado SET NomeEstado=? WHERE IdEstado = ?";
  mysqlConnection.query(
    sql,
    [emp.NomeEstado, req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      else console.log(err);
    }
  );
});


// get ->   pegar informações
// post - > adicionar um novo registro
// put ->   atualizar
// dele ->  deletar