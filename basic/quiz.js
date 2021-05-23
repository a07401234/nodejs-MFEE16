(1) 請問下列程式執行後的結果為何？為什麼？

1.start
2.IIFE
3.end
4.Timeout  (因為有設定1秒延遲)

console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 1000);
})();

console.log("end");


(2) 請問下列程式執行的結果為何？為什麼？

1.start
2.IIFE
3.end
4.Timeout  (Javascript 把事件分為同步跟非同步, 會先把快的先完成?)

console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 0);
})();

console.log("end");


(3) 請問下列程式執行的結果為何？為什麼？

1.foo
2.bar
3.baz

const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
    console.log("foo");
    bar();
    baz();
};

foo();


(4) 請問下列程式執行的結果為何？為什麼？

1.foo
2.bar
3.baz


const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
    console.log("foo");
    setTimeout(bar, 0);
    baz();
};

foo();