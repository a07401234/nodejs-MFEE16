function sum(n) {
    let num = 0;
    for(i=1; i<=n; i++)
        num += i;
    return num;
  }
  
  console.log(sum(1)); // 1
  console.log(sum(2)); // 3
  console.log(sum(10)); // 55
  console.log(sum(100000)); // 5000050000
  