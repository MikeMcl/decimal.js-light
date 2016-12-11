![decimal.js-light](https://raw.githubusercontent.com/MikeMcl/decimal.js-light/gh-pages/decimaljslight.png)

The light version of [decimal.js](https://github.com/MikeMcl/decimal.js/), an arbitrary-precision Decimal type for JavaScript.

<br />
[![Build Status](https://travis-ci.org/MikeMcl/decimal.js-light.svg)](https://travis-ci.org/MikeMcl/decimal.js-light)  
<br />

The API is a subset of the API of *decimal.js*. 

![API](https://raw.githubusercontent.com/MikeMcl/decimal.js-light/gh-pages/API.png)

Size of *decimal.js-light* minified: 13.3 KB.  
Size of *decimal.js* minified: 32.1 KB. 

Other differences are that this library does not include `NaN`, `Infinity` or `-0` as legitimate values, or work with values in other bases. 

Also, here, the `Decimal.round` property is just the default rounding mode for `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`. It does not apply to arithmetic operations, which are simply truncated at the required precision.  

Further, the `exp`, `ln`, `log`, and `pow` methods have a limited precision of around 400 digits (which can be increased by adding further digits to the value of `LN10` in the source code.)

