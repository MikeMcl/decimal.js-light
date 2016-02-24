if (typeof T === 'undefined') require('../setup');

T('config', function () {
  var MAX_DIGITS = 1e9;

  var t = function (actual) {
    T.assert(actual);
  }

  var tx = function (fn, msg) {
    T.assertException(fn, msg);
  }

  /*
    precision  {number} [1, MAX_DIGITS]
    rounding   {number} [0, 8]
    toExpNeg   {number} [-1 / 0, 0]
    toExpPos   {number} [0, 1 / 0]
  */

  t(Decimal.config({}) === Decimal);

  tx(function () {Decimal.config()}, "config()");
  tx(function () {Decimal.config(null)}, "config(null)");
  tx(function () {Decimal.config(undefined)}, "config(undefined)");
  tx(function () {Decimal.config(0)}, "config(0)");
  tx(function () {Decimal.config('')}, "config('')");
  tx(function () {Decimal.config('hi')}, "config('hi')");
  tx(function () {Decimal.config('123')}, "config('123')");

  Decimal.config({
    precision: 20,
    rounding: 4,
    toExpNeg: -7,
    toExpPos: 21
  });

  t(Decimal.precision === 20);
  t(Decimal.rounding === 4);
  t(Decimal.toExpNeg === -7);
  t(Decimal.toExpPos === 21);

  Decimal.config({
    precision: 40,
    rounding : 4,
    toExpNeg: -1000,
    toExpPos: 1000
  });

  t(Decimal.precision === 40);
  t(Decimal.rounding === 4);
  t(Decimal.toExpNeg === -1000);
  t(Decimal.toExpPos === 1000);

  Decimal.config({
    toExpNeg: -7,
    toExpPos: 21
  });

  t(Decimal.toExpNeg === -7);
  t(Decimal.toExpPos === 21);

  // precision

  t = function (expected, obj) {
    Decimal.config(obj);
    T.assertEqual(expected, Decimal.precision);
  }

  t(1, {precision: 1});
  t(1, {precision: void 0});
  t(20, {precision: 20});
  t(300000,{precision: 300000});
  t(4e+8, {precision: 4e8});
  t(1e9, {precision: 1e9});
  t(MAX_DIGITS, {precision: MAX_DIGITS});

  tx(function () {Decimal.config({precision: 0})}, "precision: 0");
  tx(function () {Decimal.config({precision: MAX_DIGITS + 1})}, "precision: MAX_DIGITS + 1");
  tx(function () {Decimal.config({precision: MAX_DIGITS + 0.1})}, "precision: MAX_DIGITS + 0.1");
  tx(function () {Decimal.config({precision: '0'})}, "precision: '0'");
  tx(function () {Decimal.config({precision: '1'})}, "precision: '1'");
  tx(function () {Decimal.config({precision: '123456789'})}, "precision: '123456789'");
  tx(function () {Decimal.config({precision: -1})}, "precision: -1");
  tx(function () {Decimal.config({precision: 0.1})}, "precision: 0.1");
  tx(function () {Decimal.config({precision: 1.1})}, "precision: 1.1");
  tx(function () {Decimal.config({precision: -1.1})}, "precision: -1.1");
  tx(function () {Decimal.config({precision: 8.1})}, "precision: 8.1");
  tx(function () {Decimal.config({precision: 1e+9 + 1})}, "precision: 1e9 + 1");
  tx(function () {Decimal.config({precision: []})}, "precision: []");
  tx(function () {Decimal.config({precision: {}})}, "precision: {}");
  tx(function () {Decimal.config({precision: ''})}, "precision: ''");
  tx(function () {Decimal.config({precision: 'hi'})}, "precision: 'hi'");
  tx(function () {Decimal.config({precision: '1e+9'})}, "precision: '1e+9'");
  tx(function () {Decimal.config({precision: null})}, "precision: null");
  tx(function () {Decimal.config({precision: NaN})}, "precision: NaN");
  tx(function () {Decimal.config({precision: Infinity})}, "precision: Infinity");

  t(MAX_DIGITS, {precision: void 0});

  // rounding

  t = function (expected, obj) {
    Decimal.config(obj);
    T.assertEqual(expected, Decimal.rounding);
  }

  t(4, {rounding: void 0});
  t(0, {rounding: 0});
  t(1, {rounding: 1});
  t(2, {rounding: 2});
  t(3, {rounding: 3});
  t(4, {rounding: 4});
  t(5, {rounding: 5});
  t(6, {rounding: 6});
  t(7, {rounding: 7});
  t(8, {rounding: 8});

  tx(function () {Decimal.config({rounding: -1})}, "rounding : -1");
  tx(function () {Decimal.config({rounding: 0.1})}, "rounding : 0.1");
  tx(function () {Decimal.config({rounding: 8.1})}, "rounding : 8.1");
  tx(function () {Decimal.config({rounding: 9})}, "rounding : 9");
  tx(function () {Decimal.config({rounding: '0'})}, "rounding: '0'");
  tx(function () {Decimal.config({rounding: '1'})}, "rounding: '1'");
  tx(function () {Decimal.config({rounding: '123456789'})}, "rounding: '123456789'");
  tx(function () {Decimal.config({rounding: 1.1})}, "rounding : 1.1");
  tx(function () {Decimal.config({rounding: -1.1})}, "rounding : -1.1");
  tx(function () {Decimal.config({rounding: 11})}, "rounding : 11");
  tx(function () {Decimal.config({rounding: []})}, "rounding : []");
  tx(function () {Decimal.config({rounding: {}})}, "rounding : {}");
  tx(function () {Decimal.config({rounding: ''})}, "rounding : ''");
  tx(function () {Decimal.config({rounding: 'hi'})}, "rounding : 'hi'");
  tx(function () {Decimal.config({rounding: null})}, "rounding : null");
  tx(function () {Decimal.config({rounding: NaN})}, "rounding : NaN");
  tx(function () {Decimal.config({rounding: Infinity})}, "rounding : Infinity");

  t(8, {rounding: void 0});

  // toExpNeg

  t = function (expected, obj) {
    Decimal.config(obj);
    T.assertEqual(expected, Decimal.toExpNeg);
  }

  t(-7, {toExpNeg: void 0});
  t(0, {toExpNeg: 0});
  t(-1, {toExpNeg: -1});
  t(-999, {toExpNeg: -999});
  t(-5675367, {toExpNeg: -5675367});
  t(-98770170790791, {toExpNeg: -98770170790791});

  tx(function () {Decimal.config({toExpNeg: '-7'})}, "toExpNeg: '-7'");
  tx(function () {Decimal.config({toExpNeg: -0.1})}, "toExpNeg: -0.1");
  tx(function () {Decimal.config({toExpNeg: 0.1})}, "toExpNeg: 0.1");
  tx(function () {Decimal.config({toExpNeg: 1})}, "toExpNeg: 1");
  tx(function () {Decimal.config({toExpNeg: NaN})}, "toExpNeg: NaN");
  tx(function () {Decimal.config({toExpNeg: null})}, "toExpNeg: null");
  tx(function () {Decimal.config({toExpNeg: {}})}, "toExpNeg: {}");

  // toExpPos

  t = function (expected, obj) {
    Decimal.config(obj);
    T.assertEqual(expected, Decimal.toExpPos);
  }

  t(21, {toExpPos: void 0});
  t(0, {toExpPos: 0});
  t(1, {toExpPos: 1});
  t(999, {toExpPos: 999});
  t(5675367, {toExpPos: 5675367});
  t(98770170790791, {toExpPos: 98770170790791});

  tx(function () {Decimal.config({toExpPos: '21'})}, "toExpPos: '21'");
  tx(function () {Decimal.config({toExpPos: -0.1})}, "toExpPos: -0.1");
  tx(function () {Decimal.config({toExpPos: 0.1})}, "toExpPos: 0.1");
  tx(function () {Decimal.config({toExpPos: -1})}, "toExpPos: -1");
  tx(function () {Decimal.config({toExpPos: NaN})}, "toExpPos: NaN");
  tx(function () {Decimal.config({toExpPos: null})}, "toExpPos: null");
  tx(function () {Decimal.config({toExpPos: {}})}, "toExpPos: {}");
});
