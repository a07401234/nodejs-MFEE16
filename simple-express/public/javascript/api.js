// 用jQuery ajax 取得 api/stocks的資料

$(function () {
  $.ajax({
    type: "GET",
    url: "/api/stocks",
  }).done(function (data) {
    console.log(data);
  });
});

// 使用 axios 抓 api/stocks
axios
  .get("/api/stocks")
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

// 使用 fetch 抓 api/stocks
fetch("/api/stocks")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
