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
async function awaitResponse() {
  try {
    let rfrep = await rfPromise();
    let axrep = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: "json",
          date: moment().format("YYYYMMDD"),
          stockNo: rfrep,
        },
      }
    );
    console.log(axrep.data.date);
    console.log(axrep.data.title);
  } catch (err) {
    console.log(err);
  }
}
awaitResponse();

// rfPromise().then((data) => {
//   console.log(`讀到的 stock code: ${data}`);
//   return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//     params: {
//       response: "json",
//       date: moment().format("YYYYMMDD"),
//       stockNo: data,
//     },
//   });
// });

//   .then(function (response) {
//     if (response.data.stat === "OK") {
//       console.log("選擇日期:", response.data.date);
//       console.log(response.data.title);
//     }
//   })
//   .catch((error) => {
//     console.error(err);
//   });
