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

// 加上這個中間件，就能解讀 POST 過來的資料
app.use(express.urlencoded({ extended: false }));

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

let apiRouter = require("./routes/api");
app.use("/api", apiRouter);
// 註冊頁＆登入頁
let authRouter = require("./routes/auth");
app.use("/auth", authRouter);

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

app.use(function (req, res, next) {
  // 表示前面的路由都找不到
  // http status code: 404
  res.status(404);
  res.render("404");
});

// 500 error
// 放在所有路由後面
// function 一定要有 4 個參數 --> 最後的錯誤處理
app.use(function (err, req, res, next) {
  console.log(err.message);
  res.status(500);
  res.send("500 - Internal Server Error 請洽系統管理員");
});

app.listen(3000, async () => {
  await connection.connectAsync();
  console.log(`跑起來了`);
});
