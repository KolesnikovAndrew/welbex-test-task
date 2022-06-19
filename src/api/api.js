const client = require("./connect.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.listen(3300, () => {
  console.log("Sever is now listening at port 3300");
});
app.use(bodyParser.json());
app.use(cors());
client.connect();

app.get("/welbextable/", (req, res) => {
  client.query(`Select * from welbextable`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
  });
  client.end;
});

app.get("/welbextable/:page/:maxItemsOnPage", (req, res) => {
  client.query(
    `Select * from welbextable ORDER BY id OFFSET ${req.params.page *
      req.params.maxItemsOnPage} ROWS FETCH NEXT ${
      req.params.maxItemsOnPage
    } ROWS ONLY`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        res.send(err.message);
      }
    }
  );
  client.end;
});

app.get("/welbextable&:column&:condition&:inputValue", (req, res) => {
  console.log(req.params);
  client.query(
    `Select * from welbextable WHERE ${req.params.column +
      " " +
      req.params.condition}'${req.params.inputValue}' `,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        res.send(err.message);
      }
    }
  );
  client.end;
});

app.get(
  "/welbextable&:column&:condition&:inputValue/:page&:maxItemsOnPage",
  (req, res) => {
    if (req.params.condition == "LIKE") {
      client.query(
        `Select * from welbextable WHERE ${req.params.column +
          " " +
          req.params.condition}'%${req.params.inputValue}%' OFFSET ${req.params
          .page * req.params.maxItemsOnPage} ROWS FETCH NEXT ${
          req.params.maxItemsOnPage
        } ROWS ONLY`,
        (err, result) => {
          if (!err) {
            res.send(result.rows);
          } else {
            res.send(err.message);
          }
        }
      );
    } else {
      client.query(
        `Select * from welbextable WHERE ${req.params.column +
          " " +
          req.params.condition}'${req.params.inputValue}' OFFSET ${req.params
          .page * req.params.maxItemsOnPage} ROWS FETCH NEXT ${
          req.params.maxItemsOnPage
        } ROWS ONLY`,
        (err, result) => {
          if (!err) {
            res.send(result.rows);
          } else {
            res.send(err.message);
          }
        }
      );
    }
  }
);
