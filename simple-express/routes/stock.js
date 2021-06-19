// routes/stock.js
const express = require("express");
const router = express.Router();

const connection = require("../utils/db");
// 可把 router 想成一個小型獨立的應用
// let app = express();
// app.use
// app.get ...
router.get("/", async (req, res) => {
  // 檢查是否有代碼
  let stockData = await connection.queryAsync("SELECT * FROM stock;");
  console.log(stockData);
  res.render("stock/list", {
    stocks: stockData,
  });
});

router.get("/:stockCode", async (req, res) => {
  let stock = await connection.queryAsync(
    "SELECT * FROM stock WHERE stock_id=?;",
    req.params.stockCode
  );
  if (stock.length === 0) {
    // 查不到 not found
    // throw new Error("查無代碼");
    next();
  }
  stock = stock[0];
  // 分頁
  // 一頁幾筆資料？
  // 現在在第幾頁？
  // 總共有多少筆數？ --> 總頁數
  // 總共有幾筆？
  let count = await connection.queryAsync(
    "SELECT count(*) as total FROM stock_price WHERE stock_id= ?",
    req.params.stockCode
  );
  // console.log(count);
  const total = count[0].total;
  const perPage = 6;
  const lastPage = Math.ceil(total / perPage);

  // 現在在第幾頁
  const currentPage = req.query.page || 1;
  const offset = (currentPage - 1) * perPage;

  let queryResults = await connection.queryAsync(
    "SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?;",
    [req.params.stockCode, perPage, offset]
  );

  res.render("stock/detail", {
    stock,
    stockPrices: queryResults,
    pagination: {
      lastPage,
      currentPage,
      total,
    },
  });
});

module.exports = router;

// router.use
// router.get ...
