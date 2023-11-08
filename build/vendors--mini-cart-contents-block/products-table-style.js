(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[128],{164:function(t,n,r){"use strict";var e={globalLocale:"en-US",globalFormat:"$0,0.00",globalRoundingMode:"HALF_EVEN",globalFormatRoundingMode:"HALF_AWAY_FROM_ZERO",globalExchangeRatesApi:{endpoint:void 0,headers:void 0,propertyPath:void 0}};function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t){return function(t){if(Array.isArray(t))return t}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return u(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return u(t,n)}(t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}var a={normalizePrecision:function(t){var n=t.reduce((function(t,n){return Math.max(t.getPrecision(),n.getPrecision())}));return t.map((function(t){return t.getPrecision()!==n?t.convertPrecision(n):t}))},minimum:function(t){var n=i(t),r=n[0],e=n.slice(1),o=r;return e.forEach((function(t){o=o.lessThan(t)?o:t})),o},maximum:function(t){var n=i(t),r=n[0],e=n.slice(1),o=r;return e.forEach((function(t){o=o.greaterThan(t)?o:t})),o}};function c(t){return!isNaN(parseInt(t))&&isFinite(t)}function s(t){return t%2==0}function l(t){return c(t)&&!Number.isInteger(t)}function f(t){return Math.abs(t)%1==.5}function h(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};for(var r in n)t.setRequestHeader(r,n[r]);return t}function d(t){return void 0===t}function g(){var t=function(t,n){var r=function(t){return Math.pow(10,function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=t.toString();if(n.indexOf("e-")>0)return parseInt(n.split("e-")[1]);var r=n.split(".")[1];return r?r.length:0}(t))},e=Math.max(r(t),r(n));return Math.round(t*e)*Math.round(n*e)/(e*e)},n={HALF_ODD:function(t){var n=Math.round(t);return f(t)&&s(n)?n-1:n},HALF_EVEN:function(t){var n=Math.round(t);return f(t)?s(n)?n:n-1:n},HALF_UP:function(t){return Math.round(t)},HALF_DOWN:function(t){return f(t)?Math.floor(t):Math.round(t)},HALF_TOWARDS_ZERO:function(t){return f(t)?Math.sign(t)*Math.floor(Math.abs(t)):Math.round(t)},HALF_AWAY_FROM_ZERO:function(t){return f(t)?Math.sign(t)*Math.ceil(Math.abs(t)):Math.round(t)},DOWN:function(t){return Math.floor(t)}};return{add:function(t,n){return t+n},subtract:function(t,n){return t-n},multiply:function(n,r){return l(n)||l(r)?t(n,r):n*r},divide:function(t,n){return t/n},modulo:function(t,n){return t%n},round:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"HALF_EVEN";return n[r](t)}}}var m=g();function p(t){var n=/^(?:(\$|USD)?0(?:(,)0)?(\.)?(0+)?|0(?:(,)0)?(\.)?(0+)?\s?(dollar)?)$/gm.exec(t);return{getMatches:function(){return null!==n?n.slice(1).filter((function(t){return!d(t)})):[]},getMinimumFractionDigits:function(){var t=function(t){return"."===t};return d(this.getMatches().find(t))?0:this.getMatches()[m.add(this.getMatches().findIndex(t),1)].split("").length},getCurrencyDisplay:function(){return{USD:"code",dollar:"name",$:"symbol"}[this.getMatches().find((function(t){return"USD"===t||"dollar"===t||"$"===t}))]},getStyle:function(){return d(this.getCurrencyDisplay(this.getMatches()))?"decimal":"currency"},getUseGrouping:function(){return!d(this.getMatches().find((function(t){return","===t})))}}}function v(t){var n=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1?arguments[1]:void 0;for(var r in n)t=t.replace("{{".concat(r,"}}"),n[r]);return t},r=function(r,e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(r,e){var o=Object.assign(new XMLHttpRequest,{onreadystatechange:function(){4===o.readyState&&(o.status>=200&&o.status<400?r(JSON.parse(o.responseText)):e(new Error(o.statusText)))},onerror:function(){e(new Error("Network error"))}});o.open("GET",t,!0),h(o,n.headers),o.send()}))}(n(t.endpoint,{from:r,to:e}),{headers:t.headers})};return{getExchangeRate:function(e,i){return(u=t.endpoint,!Boolean(u)||"object"!==o(u)&&"function"!=typeof u||"function"!=typeof u.then?r(e,i):t.endpoint).then((function(r){return function t(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".",e={};return Object.entries(n).forEach((function(n){if("object"===o(n[1])){var i=t(n[1]);Object.entries(i).forEach((function(t){e[n[0]+r+t[0]]=t[1]}))}else e[n[0]]=n[1]})),e}(r)[n(t.propertyPath,{from:e,to:i})]}));var u}}}function y(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Error;if(!t)throw new r(n)}function b(t){y(function(t){return c(t)&&t<=100&&t>=0}(t),"You must provide a numeric value between 0 and 100.",RangeError)}function A(t){y(Number.isInteger(t),"You must provide an integer.",TypeError)}var M=g(),O=Object.assign((function t(n){var r=Object.assign({},{amount:t.defaultAmount,currency:t.defaultCurrency,precision:t.defaultPrecision},n),e=r.amount,o=r.currency,i=r.precision;A(e),A(i);var u=t.globalLocale,a=t.globalFormat,c=t.globalRoundingMode,s=t.globalFormatRoundingMode,l=Object.assign({},t.globalExchangeRatesApi),f=function(n){var r=Object.assign({},Object.assign({},{amount:e,currency:o,precision:i},n),Object.assign({},{locale:this.locale},n));return Object.assign(t({amount:r.amount,currency:r.currency,precision:r.precision}),{locale:r.locale})},h=function(t){y(this.hasSameCurrency(t),"You must provide a Dinero instance with the same currency.",TypeError)};return{getAmount:function(){return e},getCurrency:function(){return o},getLocale:function(){return this.locale||u},setLocale:function(t){return f.call(this,{locale:t})},getPrecision:function(){return i},convertPrecision:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s;A(t);var r=this.getPrecision(),e=t>r,o=e?M.multiply:M.divide,i=e?[t,r]:[r,t],u=Math.pow(10,M.subtract.apply(M,i));return f.call(this,{amount:M.round(o(this.getAmount(),u),n),precision:t})},add:function(n){h.call(this,n);var r=t.normalizePrecision([this,n]);return f.call(this,{amount:M.add(r[0].getAmount(),r[1].getAmount()),precision:r[0].getPrecision()})},subtract:function(n){h.call(this,n);var r=t.normalizePrecision([this,n]);return f.call(this,{amount:M.subtract(r[0].getAmount(),r[1].getAmount()),precision:r[0].getPrecision()})},multiply:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c;return f.call(this,{amount:M.round(M.multiply(this.getAmount(),t),n)})},divide:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c;return f.call(this,{amount:M.round(M.divide(this.getAmount(),t),n)})},percentage:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c;return b(t),this.multiply(M.divide(t,100),n)},allocate:function(t){var n=this;!function(t){y(function(t){return t.length>0&&t.every((function(t){return t>=0}))&&t.some((function(t){return t>0}))}(t),"You must provide a non-empty array of numeric values greater than 0.",TypeError)}(t);for(var r=t.reduce((function(t,n){return M.add(t,n)})),e=this.getAmount(),o=t.map((function(t){var o=Math.floor(M.divide(M.multiply(n.getAmount(),t),r));return e=M.subtract(e,o),f.call(n,{amount:o})})),i=0;e>0;)t[i]>0&&(o[i]=o[i].add(f.call(this,{amount:1})),e=M.subtract(e,1)),i+=1;return o},convert:function(t){var n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=r.endpoint,o=void 0===e?l.endpoint:e,i=r.propertyPath,u=void 0===i?l.propertyPath||"rates.{{to}}":i,a=r.headers,s=void 0===a?l.headers:a,h=r.roundingMode,g=void 0===h?c:h,m=Object.assign({},{endpoint:o,propertyPath:u,headers:s,roundingMode:g});return v(m).getExchangeRate(this.getCurrency(),t).then((function(r){return y(!d(r),'No rate was found for the destination currency "'.concat(t,'".'),TypeError),f.call(n,{amount:M.round(M.multiply(n.getAmount(),parseFloat(r)),m.roundingMode),currency:t})}))},equalsTo:function(t){return this.hasSameAmount(t)&&this.hasSameCurrency(t)},lessThan:function(n){h.call(this,n);var r=t.normalizePrecision([this,n]);return r[0].getAmount()<r[1].getAmount()},lessThanOrEqual:function(n){h.call(this,n);var r=t.normalizePrecision([this,n]);return r[0].getAmount()<=r[1].getAmount()},greaterThan:function(n){h.call(this,n);var r=t.normalizePrecision([this,n]);return r[0].getAmount()>r[1].getAmount()},greaterThanOrEqual:function(n){h.call(this,n);var r=t.normalizePrecision([this,n]);return r[0].getAmount()>=r[1].getAmount()},isZero:function(){return 0===this.getAmount()},isPositive:function(){return this.getAmount()>=0},isNegative:function(){return this.getAmount()<0},hasSubUnits:function(){return 0!==M.modulo(this.getAmount(),Math.pow(10,i))},hasCents:function(){return 0!==M.modulo(this.getAmount(),Math.pow(10,i))},hasSameCurrency:function(t){return this.getCurrency()===t.getCurrency()},hasSameAmount:function(n){var r=t.normalizePrecision([this,n]);return r[0].getAmount()===r[1].getAmount()},toFormat:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s,r=p(t);return this.toRoundedUnit(r.getMinimumFractionDigits(),n).toLocaleString(this.getLocale(),{currencyDisplay:r.getCurrencyDisplay(),useGrouping:r.getUseGrouping(),minimumFractionDigits:r.getMinimumFractionDigits(),style:r.getStyle(),currency:this.getCurrency()})},toUnit:function(){return M.divide(this.getAmount(),Math.pow(10,i))},toRoundedUnit:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s,r=Math.pow(10,t);return M.divide(M.round(M.multiply(this.toUnit(),r),n),r)},toObject:function(){return{amount:e,currency:o,precision:i}},toJSON:function(){return this.toObject()}}}),{defaultAmount:0,defaultCurrency:"USD",defaultPrecision:2},e,a);n.a=O}}]);