if (typeof T === 'undefined') require('../setup');

T('Decimal', function () {

  Decimal.config({
    precision: 40,
    rounding: 4,
    toExpNeg: -9e15,
    toExpPos: 9e15,
    modulo: 1
  });

  var t = function (coefficient, exponent, sign, n) {
    T.assertEqualProps(coefficient, exponent, sign, new Decimal(n));
  }

  t([0], 0, 0, 0);
  t([0], 0, 0, -0);
  t([1], 0, -1, -1);
  t([10], 0, -1, -10);

  t([1], 0, 1, 1);
  t([10], 0, 1, 10);
  t([100], 0, 1, 100);
  t([1000], 0, 1, 1000);
  t([10000], 0, 1, 10000);
  t([100000], 0, 1, 100000);
  t([1000000], 0, 1, 1000000);

  t([1], 1, 1, 10000000);
  t([10], 1, 1, 100000000);
  t([100], 1, 1, 1000000000);
  t([1000], 1, 1, 10000000000);
  t([10000], 1, 1, 100000000000);
  t([100000], 1, 1, 1000000000000);
  t([1000000], 1, 1, 10000000000000);

  t([1], 2, -1, -100000000000000);
  t([10], 2, -1, -1000000000000000);
  t([100], 2, -1, -10000000000000000);
  t([1000], 2, -1, -100000000000000000);
  t([10000], 2, -1, -1000000000000000000);
  t([100000], 2, -1, -10000000000000000000);
  t([1000000], 2, -1, -100000000000000000000);

  t([1000000], -1, 1, 1e-1);
  t([100000], -1, -1, -1e-2);
  t([10000], -1, 1, 1e-3);
  t([1000], -1, -1, -1e-4);
  t([100], -1, 1, 1e-5);
  t([10], -1, -1, -1e-6);
  t([1], -1, 1, 1e-7);

  t([1000000], -2, 1, 1e-8);
  t([100000], -2, -1, -1e-9);
  t([10000], -2, 1, 1e-10);
  t([1000], -2, -1, -1e-11);
  t([100], -2, 1, 1e-12);
  t([10], -2, -1, -1e-13);
  t([1], -2, 1, 1e-14);

  t([1000000], -3, 1, 1e-15);
  t([100000], -3, -1, -1e-16);
  t([10000], -3, 1, 1e-17);
  t([1000], -3, -1, -1e-18);
  t([100], -3, 1, 1e-19);
  t([10], -3, -1, -1e-20);
  t([1], -3, 1, 1e-21);

  t([9], 0, 1, '9');
  t([99], 0, -1, '-99');
  t([999], 0, 1, '999');
  t([9999], 0, -1, '-9999');
  t([99999], 0, 1, '99999');
  t([999999], 0, -1, '-999999');
  t([9999999], 0, 1, '9999999');

  t([9, 9999999], 1, -1, '-99999999');
  t([99, 9999999], 1, 1, '999999999');
  t([999, 9999999], 1, -1, '-9999999999');
  t([9999, 9999999], 1, 1, '99999999999');
  t([99999, 9999999], 1, -1, '-999999999999');
  t([999999, 9999999], 1, 1, '9999999999999');
  t([9999999, 9999999], 1, -1, '-99999999999999');

  t([9, 9999999, 9999999], 2, 1, '999999999999999');
  t([99, 9999999, 9999999], 2, -1, '-9999999999999999');
  t([999, 9999999, 9999999], 2, 1, '99999999999999999');
  t([9999, 9999999, 9999999], 2, -1, '-999999999999999999');
  t([99999, 9999999, 9999999], 2, 1, '9999999999999999999');
  t([999999, 9999999, 9999999], 2, -1, '-99999999999999999999');
  t([9999999, 9999999, 9999999], 2, 1, '999999999999999999999');

  // Test parsing.

  t = function (expected, n) {
    T.assertEqual(expected, new Decimal(n).valueOf());
  }

  var tx = function (fn, msg) {
    T.assertException(fn, msg);
  }

  tx(function () {new Decimal(NaN)}, "NaN");
  tx(function () {new Decimal('NaN')}, "'NaN'");
  tx(function () {new Decimal('-NaN')}, "'-NaN'");
  tx(function () {new Decimal(' NaN')}, "' NaN'");
  tx(function () {new Decimal('NaN ')}, "'NaN '");
  tx(function () {new Decimal(' NaN ')}, "' NaN '");
  tx(function () {new Decimal('+NaN')}, "'+NaN'");
  tx(function () {new Decimal(' +NaN')}, "' +NaN'");
  tx(function () {new Decimal('.NaN')}, "'.NaN'");
  tx(function () {new Decimal('NaN.')}, "'NaN.'");

  tx(function () {new Decimal(Infinity)}, "Infinity");
  tx(function () {new Decimal(-Infinity)}, "-Infinity");
  tx(function () {new Decimal('Infinity')}, "'Infinity'");
  tx(function () {new Decimal('-Infinity')}, "'-Infinity'");
  tx(function () {new Decimal(' Infinity')}, "' Infinity'");
  tx(function () {new Decimal('Infinity ')}, "'Infinity '");
  tx(function () {new Decimal(' Infinity ')}, "' Infinity '");
  tx(function () {new Decimal('+Infinity')}, "'+Infinity'");
  tx(function () {new Decimal(' +Infinity')}, "' +Infinity'");
  tx(function () {new Decimal('.Infinity')}, "'.Infinity'");
  tx(function () {new Decimal('Infinity.')}, "'Infinity.'");

  t('0', 0);
  t('0', -0);
  t('0', '0');
  t('0', '-0');
  t('0', '0.');
  t('0', '-0.');
  t('0', '0.0');
  t('0', '-0.0');
  t('0', '0.00000000');
  t('0', '-0.0000000000000000000000');

  tx(function () {new Decimal(' 0')}, "' 0'");
  tx(function () {new Decimal('0 ')}, "'0 '");
  tx(function () {new Decimal(' 0 ')}, "' 0 '");
  tx(function () {new Decimal('0-')}, "'0-'");
  tx(function () {new Decimal(' -0')}, "' -0'");
  tx(function () {new Decimal('-0 ')}, "'-0 '");
  tx(function () {new Decimal('+0')}, "'+0'");
  tx(function () {new Decimal(' +0')}, "' +0'");
  tx(function () {new Decimal(' .0')}, "' .0'");
  tx(function () {new Decimal('0. ')}, "'0. '");
  tx(function () {new Decimal('+-0')}, "'+-0'");
  tx(function () {new Decimal('-+0')}, "'-+0'");
  tx(function () {new Decimal('--0')}, "'--0'");
  tx(function () {new Decimal('++0')}, "'++0'");
  tx(function () {new Decimal('.-0')}, "'.-0'");
  tx(function () {new Decimal('.+0')}, "'.+0'");
  tx(function () {new Decimal('0 .')}, "'0 .'");
  tx(function () {new Decimal('. 0')}, "'. 0'");
  tx(function () {new Decimal('..0')}, "'..0'");
  tx(function () {new Decimal('+.-0')}, "'+.-0'");
  tx(function () {new Decimal('-.+0')}, "'-.+0'");
  tx(function () {new Decimal('+. 0')}, "'+. 0'");
  tx(function () {new Decimal('.0.')}, "'.0.'");

  t('1', 1);
  t('-1', -1);
  t('1', '1');
  t('-1', '-1');
  t('0.1', '.1');
  t('0.1', '.1');
  t('-0.1', '-.1');
  t('1', '1.');
  t('1', '1.0');
  t('-1', '-1.');
  t('-1', '-1.0000');
  t('1', '1.00000000');
  t('-1', '-1.000000000000000000000000');

  tx(function () {new Decimal(' 1')}, "' 1'");
  tx(function () {new Decimal('1 ')}, "'1 '");
  tx(function () {new Decimal(' 1 ')}, "' 1 '");
  tx(function () {new Decimal('1-')}, "'1-'");
  tx(function () {new Decimal(' -1')}, "' -1'");
  tx(function () {new Decimal('-1 ')}, "'-1 '");
  tx(function () {new Decimal('+1')}, "'+1'");
  tx(function () {new Decimal(' +1')}, "' +1'");
  tx(function () {new Decimal('.1.')}, "'.1.'");
  tx(function () {new Decimal('+-1')}, "'+-1'");
  tx(function () {new Decimal('-+1')}, "'-+1'");
  tx(function () {new Decimal('--1')}, "'--1'");
  tx(function () {new Decimal('++1')}, "'++1'");
  tx(function () {new Decimal('.-1')}, "'.-1'");
  tx(function () {new Decimal('.+1')}, "'.+1'");
  tx(function () {new Decimal('1 .')}, "'1 .'");
  tx(function () {new Decimal('. 1')}, "'. 1'");
  tx(function () {new Decimal('..1')}, "'..1'");
  tx(function () {new Decimal('+.-1')}, "'+.-1'");
  tx(function () {new Decimal('-.+1')}, "'-.+1'");
  tx(function () {new Decimal('+. 1')}, "'+. 1'");
  tx(function () {new Decimal('-. 1')}, "'-. 1'");
  tx(function () {new Decimal('1..')}, "'1..'");
  tx(function () {new Decimal('+1..')}, "'+1..'");
  tx(function () {new Decimal('-1..')}, "'-1..'");
  tx(function () {new Decimal('-.1.')}, "'-.1.'");
  tx(function () {new Decimal('+.1.')}, "'+.1.'");
  tx(function () {new Decimal('.-10.')}, "'.-10.'");
  tx(function () {new Decimal('.+10.')}, "'.+10.'");
  tx(function () {new Decimal('. 10.')}, "'. 10.'");

  t('123.456789', 123.456789);
  t('-123.456789', -123.456789);
  t('123.456789', '123.456789');
  t('-123.456789', '-123.456789');

  tx(function () {new Decimal(void 0)}, "void 0");
  tx(function () {new Decimal('undefined')}, "'undefined'");
  tx(function () {new Decimal(null)}, "null");
  tx(function () {new Decimal('null')}, "'null'");
  tx(function () {new Decimal({})}, "{}");
  tx(function () {new Decimal([])}, "[]");
  tx(function () {new Decimal(function () {})}, "function () {}");
  tx(function () {new Decimal(new Date)}, "new Date");
  tx(function () {new Decimal(new RegExp)}, "new RegExp");
  tx(function () {new Decimal('')}, "''");
  tx(function () {new Decimal(' ')}, "' '");
  tx(function () {new Decimal('nan')}, "'nan'");
  tx(function () {new Decimal('23e')}, "'23e'");
  tx(function () {new Decimal('e4')}, "'e4'");
  tx(function () {new Decimal('ff')}, "'ff'");
  tx(function () {new Decimal('0xg')}, "'oxg'");
  tx(function () {new Decimal('0Xfi')}, "'0Xfi'");
  tx(function () {new Decimal('--45')}, "'--45'");
  tx(function () {new Decimal('9.99--')}, "'9.99--'");
  tx(function () {new Decimal('0 0')}, "'0 0'");
});
