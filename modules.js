// console.log(arguments);
// console.log(require('module').wrapper);


// module.exports
const c = require('./test-module');
const calc1 = new c();
console.log(calc1.add(2, 3));


// exports
const calc2 = require('./test-module2')
console.log(calc2.add(2, 5));


// caching
require('./test-module3')();
require('./test-module3')();
require('./test-module3')();