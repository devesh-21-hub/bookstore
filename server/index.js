//Since the type is module, we can ES6 module system  // const and require keywords are used in case of CommonJS module system
import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from "cors";

import { createServer } from "http";

//Database = bookStoreDB
//Table = books

//port: process.env.DB_ROOT

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "@Devesh_123",
  port: 3306,
  database: "booksdb",
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
const server = createServer(app);

//If there is a auth problem execute below command in MySQL Workbench
//ALTER USER "root"@"localhost" IDENTIFIED WITH mysql_native_password BY "@Devesh_123"

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";

  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const { title, description, cover, price } = req.body;
  const q =
    "INSERT INTO books (`title`, `description`, `cover`, `price`) VALUES (?)";
  const values = [title, description, cover, price];
  console.log(values);

  db.query(q, [values], (err, data) => {
    if (err) return res.json({ message: err.message });
    else return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const { title, description, cover, price } = req.body;
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [title, description, cover, price];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

server.listen(9000, () => {
  console.log("Server running on port 9000!");
});
