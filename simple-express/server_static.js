// 導入 express 這個 package
const express = require("express");
// 利用 express 建立一個 express applocation app
let app = express();

// middleware 中介函式
// 在 express 裡
// req -> router
// req -> middlewares...... -> router

app.use(express.static("public"));

app.use(function (req, res, next) {
  let current = new Date();
  console.log(`有人來訪問 在${current}`);
  // 幾乎都要呼叫，讓他往下繼續
  next();
});

// 路由  (express 會由上而下的找，找到就停止)
app.get("/", function (req, res) {
  res.send("首頁");
});

app.get("/about", function (req, res) {
  res.send("關於我們");
});

app.get("/test", function (req, res) {
  res.send("測試頁面");
});

app.listen(3000, () => {
  console.log(`跑起來了`);
});
