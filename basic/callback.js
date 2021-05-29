let doWork = function (job, timer, cb) {
    setTimeout(() => {
      let dt = new Date();
      cb(null, `完成工作: ${job} at ${dt.toISOString()}`);
    }, timer);
  };
  
  let dt = new Date();
  console.log(`開始工作 at ${dt.toISOString()}`);

// 只用callback完成同步 （一層包一層）
// 先刷牙
  doWork("刷牙", 2000, function (err, result) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
    // 再吃早餐
    doWork("吃早餐", 2000, function (err, result) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(result);
        // 最後寫功課
        doWork("寫功課", 2000, function (err, result) {
            if (err) {
              console.error(err);
              return;
            }
            console.log(result);
          });
      });
  });
  