// Tests immutability of operand[s] for all applicable methods.
// Also tests each Decimal.prototype method against its equivalent Decimal method where applicable.
if (typeof T === 'undefined') require('../setup');

T('immutability', function () {

  Decimal.config({
    precision: 20,
    rounding: 4,
    toExpNeg: -7,
    toExpPos: 21
  });

  // Integer [0, 9e15), with each possible number of digits, [1, 16], equally likely.
  function randInt() {
    return Math.floor(Math.random() * 9e15 / Math.pow(10, Math.random() * 16 | 0));
  }

  var a, aa, b, bb, i, k, n, t, v, x, y;

  t = T.assertEqualDecimal;

  v = [
    0,
    0.5,
    -0.5,
    1,
    -1,
    (x = new Decimal(Math.random())),
    x.neg(),
    (x = randInt()),
    -x,
    (x = new Decimal(x).plus(Math.random())),
    x.neg()
  ];

  for (i = 0; i < v.length; i++) {
    a = new Decimal(v[i]);
    aa = new Decimal(v[i]);
    k = (Math.random() * 10 | 0) / 10;
    b = k == 0.5 ? new Decimal(a) : a[k < 0.5 ? 'plus' : 'minus'](new Decimal(randInt()).plus(Math.random()));
    bb = new Decimal(b);
    n = Math.random() * 20 + 1 | 0;

    x = a.absoluteValue();
    t(a, aa);
    y = a.abs();
    t(a, aa);
    t(x, y);

    x = a.comparedTo(b);
    t(a, aa);
    t(b, bb);
    y = a.cmp(b);
    t(a, aa);
    t(b, bb);
    T.assertEqual(x, y);

    x = a.decimalPlaces();
    t(a, aa);
    y = a.dp();
    t(a, aa);
    T.assertEqual(x, y);

    x = a.dividedBy(b);
    t(a, aa);
    t(b, bb);
    y = a.div(b);
    t(a, aa);
    t(b, bb);
    t(x, y);

    x = a.dividedToIntegerBy(b);
    t(a, aa);
    t(b, bb);
    y = a.idiv(b);
    t(a, aa);
    t(b, bb);
    t(x, y);

    x = a.equals(b);
    t(a, aa);
    t(b, bb);
    y = a.eq(b);
    t(a, aa);
    t(b, bb);
    T.assertEqual(x, y);

    x = a.greaterThan(b);
    t(a, aa);
    t(b, bb);
    y = a.gt(b);
    t(a, aa);
    t(b, bb);
    T.assertEqual(x, y);

    x = a.greaterThanOrEqualTo(b);
    t(a, aa);
    t(b, bb);
    y = a.gte(b);
    t(a, aa);
    t(b, bb);
    T.assertEqual(x, y);

    x = a.isInteger();
    t(a, aa);
    y = a.isint();
    t(a, aa);
    T.assertEqual(x, y);

    x = a.isNegative();
    t(a, aa);
    y = a.isneg();
    t(a, aa);
    T.assertEqual(x, y);

    x = a.isPositive();
    t(a, aa);
    y = a.ispos();
    t(a, aa);
    T.assertEqual(x, y);

    a.isZero();
    t(a, aa);

    x = a.lessThan(b);
    t(a, aa);
    t(b, bb);
    y = a.lt(b);
    t(a, aa);
    t(b, bb);
    T.assertEqual(x, y);

    x = a.lessThanOrEqualTo(b);
    t(a, aa);
    t(b, bb);
    y = a.lte(b);
    t(a, aa);
    t(b, bb);
    T.assertEqual(x, y);

    /*
    x = a.logarithm();
    t(a, aa);
    y = a.log();
    t(a, aa);
    t(x, y);
    */

    x = a.minus(b);
    t(a, aa);
    t(b, bb);
    y = a.sub(b);
    t(a, aa);
    t(b, bb);
    t(x, y);

    /*
    x = a.modulo(b);
    t(a, aa);
    t(b, bb);
    y = a.mod(b);
    t(a, aa);
    t(b, bb);
    t(x, y);

    x = a.naturalExponential();
    t(a, aa);
    y = a.exp();
    t(a, aa);
    t(x, y);

    x = a.naturalLogarithm();
    t(a, aa);
    y = a.ln();
    t(a, aa);
    t(x, y);
    */

    x = a.negated();
    t(a, aa);
    y = a.neg();
    t(a, aa);
    t(x, y);

    x = a.plus(b);
    t(a, aa);
    t(b, bb);
    y = a.add(b);
    t(a, aa);
    t(b, bb);
    t(x, y);

    x = a.precision();
    t(a, aa);
    y = a.sd();
    t(a, aa);
    T.assertEqual(x, y);

    x = a.toInteger();
    t(a, aa);

    /*
    x = a.squareRoot();
    t(a, aa);
    y = a.sqrt();
    t(a, aa);
    t(x, y);
    */

    x = a.times(b);
    t(a, aa);
    t(b, bb);
    y = a.mul(b);
    t(a, aa);
    t(b, bb);
    t(x, y);

    x = a.toDecimalPlaces(n);
    t(a, aa);
    y = a.todp(n);
    t(a, aa);
    t(x, y);

    a.toExponential(n);
    t(a, aa);

    a.toFixed(n);
    t(a, aa);

    a.toNumber();
    t(a, aa);

    /*
    x = a.toPower(b);
    t(a, aa);
    t(b, bb);
    y = a.pow(b);
    t(a, aa);
    t(b, bb);
    t(x, y);
    */

    a.toPrecision(n);
    t(a, aa);

    x = a.toSignificantDigits(n);
    t(a, aa);
    y = a.tosd(n);
    t(a, aa);
    t(x, y);

    a.toString();
    t(a, aa);

    a.valueOf();
    t(a, aa);
  }
});
