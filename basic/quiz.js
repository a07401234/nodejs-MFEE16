// (1) 請問下列程式執行後的結果為何？為什麼？

// 1.start
// 2.IIFE
// 3.end
// 4.Timeout  （setTimeout會把這個function丟到webAPIs執行等待1秒，再丟到Callback Queue等待stack清空後在丟回stack執行)

// console.log("start");

// (function () {
//   console.log("IIFE");
//   setTimeout(function () {
//     console.log("Timeout");
//   }, 1000);
// })();

// console.log("end");


// (2) 請問下列程式執行的結果為何？為什麼？

// 1.start
// 2.IIFE
// 3.end
// 4.Timeout  (與第一題同理，雖然setTimeout設定0毫秒，但一樣會丟到webAPIs並在一瞬間再丟到Callback queue等待stack清空才丟回stack執行))

// console.log("start");

// (function () {
//   console.log("IIFE");
//   setTimeout(function () {
//     console.log("Timeout");
//   }, 0);
// })();

// console.log("end");


// (3) 請問下列程式執行的結果為何？為什麼？

// 1.foo   (先呼叫foo，foo會先console.log "foo")
// 2.bar   (然後再呼叫bar console.log "bar")
// 3.baz   (最後呼叫baz console.log "baz")
//         (程式由上往下跑，到了最後呼叫了foo函式，foo內由上開始先回傳"foo"再分別呼叫了bar與baz的函式)
// const bar = () => console.log("bar");

// const baz = () => console.log("baz");

// const foo = () => {
//     console.log("foo");
//     bar();
//     baz();
// };

// foo();


// (4) 請問下列程式執行的結果為何？為什麼？

// 1.foo
// 2.bar
// 3.baz    
// (console.log執行上是很快的，然後setTimeout設定是0毫秒，也就是說在一瞬間就已經在Callback queue內排隊了，在呼叫
//   baz之後有個空檔bar會先進來最後才是呼叫baz)

// const bar = () => console.log("bar");

// const baz = () => console.log("baz");

// const foo = () => {
//     console.log("foo");
//     setTimeout(bar, 0);
//     baz();
// };

// foo();