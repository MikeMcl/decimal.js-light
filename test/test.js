var time = process.hrtime(),
  passed = 0,
  total = 0;

console.log('\n Testing decimal.js-light\n');

[
  'abs',
  'ceil',
  'clone',
  'cmp',
  'config',
  'Decimal',
  'div',
  'divToInt',
  'dpSd',
  'exp',
  'floor',
  'immutability',
  'intPow',
  'is',
  'ln',
  'log',
  'minAndMax',
  'minus',
  'mod',
  'neg',
  'plus',
  'pow',
  'round',
  'sqrt',
  'times',
  'toDP',
  'toExponential',
  'toFixed',
  'toNumber',
  'toPrecision',
  'toSD',
  'toString',
  'trunc',
  'valueOf'
]
.forEach(function (module) {
  require('./modules/' + module);
  passed += T.result[0];
  total += T.result[1];
});

time = process.hrtime(time);
time = time[0] * 1e3 + (time[1] / 1e6 | 0);

console.log('\n In total, ' + passed + ' of ' + total + ' tests passed in ' + time + ' ms \n');
