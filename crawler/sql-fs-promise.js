// // https://www.twse.com.tw/exchangeReport/STOCK_DAY
// // ?response=json
// // &date=20210523
// // &stockNo=2610

// // npm i axios
// // 引入 axios
const axios = require("axios");
const fs = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql");
const Promise = require("bluebird");

// 設定資料庫連線
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "stock",
});
// mysql本身是沒有Promise的，所以用bluebird來將連線Promise化
connection = Promise.promisifyAll(connection);

(async function () {
  try {
    // 進行連線 (Promise之後函式後面都要加上Async)
    await connection.connectAsync();

    let stockId = await fs.readFile("stock.txt", "utf-8");
    console.log(`股票代碼：${stockId}`);
    let result = await connection.queryAsync(
      `SELECT stock_id FROM stock WHERE stock_id = ${stockId}`
    );
    // 檢查資料長度是否小於等於 0，如果是就抓資料
    if (result.length <= 0) {
      let response = await axios.get(
        `https://www.twse.com.tw/zh/api/codeQuery?query=${stockId}`
      );
      console.log(response);
      let resData = response.data.suggestions.shift();
      let resDataSplit = resDataSplit.split("\t");
      if (resDataSplit.length > 1) {
        connection.queryAsync(
          `INSERT INTO stock (stock_id, stock_name) VALUES ('${resDataSplit[0]}', '${resDataSplit[1]}');`
        );
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
})();

// fs.readFile("stock.txt", "utf8")
//   .then(function (data) {
//     console.log(`股票代碼：${data}`);

//     // 檢查是否已存在於資料庫， 1代表存在 0不存在
//     connection.query(
//       `SELECT stock_id FROM stock WHERE stock_id = ${data}`,
//       function (err, result) {
//         if (err) {
//           throw err;
//         }
//         if (result.length === 0) {
//           return axios.get(
//             `https://www.twse.com.tw/zh/api/codeQuery?query=${data}`
//           );
//         }
//       }
//     );
//   })
//   .then(function (response) {
//     let resData = response.data.suggestions.shift();
//     let resDataSplit = resData.split("\t");

//     // console.log(resDataSplit);

//     // 新增股票代號與股票名稱進資料庫
//     // 第 1位是代號，第 2位是名稱
//     if (resDataSplit.length > 1) {
//       connection.query(
//         `INSERT INTO stock (stock_id, stock_name) VALUES ('${resDataSplit[0]}', '${resDataSplit[1]}');`,
//         function (err, result) {
//           if (err) {
//             throw err;
//           }
//           console.log(result);
//         }
//       );
//     } else {
//       throw "查無名稱";
//     }
//   })
//   .catch(function (err) {
//     console.error(err);
//   })
//   // 關閉資料庫
//   .finally(function () {
//     connection.end();
//   });

// return axios
// .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//   params: {
//     response: "json",
//     date: moment().format("YYYYMMDD"),
//     stockNo: data,
//   },
// })

// .then(function (response) {
//     if (response.data.stat === "OK") {
//       console.log("選擇日期:", response.data.date);
//       console.log(response.data.title);
//     }
//   })
//   .catch((error) => {
//     console.error(err);
//   });
// });
