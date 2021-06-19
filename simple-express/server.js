const connection = require("./utils/db");

// 導入 express 這個 package
const express = require("express");
const { render } = require("pug");
// 利用 express 建立一個 express applocation app
let app = express();

// middleware 中介函式
// 在 express 裡
// req -> router
// req -> middlewares...... -> router

app.use(express.static("public"));

// 第一個是變數 views
// 第二個是檔案夾名稱
app.set("views", "views");
// 告訴 express 我們用的 view engine 是 pug
app.set("view engine", "pug");

app.use(function (req, res, next) {
  let current = new Date();
  console.log(`有人來訪問 在${current}`);
  // 幾乎都要呼叫，讓他往下繼續
  next();
});
// 所有中間件底下
let stockRouter = require("./routes/stock");
app.use("/stock", stockRouter);

// 路由  (express 會由上而下的找，找到就停止)
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/test", function (req, res) {
  res.render("test");
});

app.listen(3000, async () => {
  await connection.connectAsync();
  console.log(`跑起來了`);
});