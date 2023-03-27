function identifyInvalidTransactions(transactions) {
  let invalid = new Set();
 
  let transactionsName = transactions.reduce(function (map, transaction) {
      let [name, time, amount, city] = transaction.split(",");
      if (!map.has(name)) {
          map.set(name, []);
      }
      map.get(name).push({ time: parseInt(time), amount: parseInt(amount), city });
      return map;
  }, new Map());
  
  for (let [name, transactions] of transactionsName.entries()) {
    for (let i = 0; i< transactions.length; i++) {
      let {time: time1, amount: amount1, city: city1} = transactions[i];
      if (amount1 > 2000) {
        invalid.add([name].concat(transactions[i]));
      }
    for (let y = i+1; y < transactions.length; y++) {
      let {time: time2, amount: amount2, city: city2} = transactions[y];
      if (Math.abs(time1 - time2) <= 60 && city1 !== city2) {
        invalid.add([name].concat(transactions[i]));
        invalid.add([name].concat(transactions[y]));
      }
      else if (Math.abs(time1 - time2) <= 60 && amount1 == amount2) {
        invalid.add([name].concat(transactions[i]));
        invalid.add([name].concat(transactions[y]));
      }  
    } 
    }
  }
  return Array.from(invalid);
}