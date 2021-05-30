// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210523
// &stockNo=2610

// npm i axios
// 引入 axios
const axios = require("axios");

// TODO: 從 stock.txt 讀股票代碼進來
// filesystem
// npm i fs ??? -> 不用
const fs = require("fs");

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

rfPromise()
  .then((data) => {
    console.log(`讀到的 stock code: ${data}`);
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: "20210523",
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
    console.error("讀檔錯誤", err);
  });
