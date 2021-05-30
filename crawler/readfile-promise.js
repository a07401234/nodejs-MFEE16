// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210523
// &stockNo=2610

// npm i axios
// 引入 axios
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

function rfPromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
// 取得年月日
// let year = new Date().getFullYear();
// // getMonth從 0 開始計算, 所以+1取正確月份
// let month = new Date().getMonth() + 1;
// // 10月以下在日期前加上 0 來維持兩位數
// if (month < 10) {
//   month = "0" + month;
// }
// let date = new Date().getDate();
// // 取得日期如果小於10的日期一樣加上 0 補足兩位
// if (date < 10) {
//   date = "0" + date;
// }
// // 把年月日串在一起
// let today = year + month + date;
// console.log(today);

rfPromise()
  .then((data) => {
    console.log(`讀到的 stock code: ${data}`);
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: data,
      },
    });
  })
  .then(function (response) {
    if (response.data.stat === "OK") {
      console.log("選擇日期:", response.data.date);
      console.log(response.data.title);
    }
  })
  .catch((error) => {
    console.error(err);
  });
