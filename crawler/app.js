// https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20190101&stockNo=0059

const axios = require("axios");
const fs = require("fs");
fs.readFile("stock.txt", "utf8", (err, data));

// Make a request for a user with a given ID
axios
  .get(
    "https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20190101&stockNo=0059"
  )
  .then(function (response) {
    // handle success
    // console.log(response.data.fields)
    console.log(response.data.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
