// 導入 express 這個 package
const express = require("express");
// 利用 express 建立一個 express applocation app
let app = express();

// middleware 中介函式
app.use(function (req, res, next) {
  let current = new Date();
  console.log(`有人來訪問 在${current}`);
});
// 在 express 裡
// req -> router
// req -> middlewares...... -> router

// 路由  (express 會由上而下的找，找到就停止)
app.get("/", function (req, res) {
  res.send("Hello express");
});

app.get("/about", function (req, res) {
  res.send("About express");
});

app.get("/test", function (req, res) {
  res.send("Test express");
});

app.listen(3000, () => {
  console.log(`跑起來了`);
});
