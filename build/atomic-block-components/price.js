(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[11],{167:function(e,r,t){"use strict";var c=t(5),n=t.n(c),a=t(0),o=t(1),i=t(51),l=t(9),s=t.n(l),u=(t(2),t(250),function(e){var r=e.className,t=e.currency,c=e.maxPrice,n=e.minPrice,o=e.priceClassName,l=e.priceStyle;return Object(a.createElement)("span",{className:r},Object(a.createElement)(i.a,{className:s()("wc-block-components-product-price__value",o),currency:t,value:n,style:l})," — ",Object(a.createElement)(i.a,{className:s()("wc-block-components-product-price__value",o),currency:t,value:c,style:l}))}),p=function(e){var r=e.className,t=e.currency,c=e.regularPriceClassName,n=e.regularPriceStyle,l=e.regularPrice,u=e.priceClassName,p=e.priceStyle,m=e.price;return Object(a.createElement)("span",{className:r},Object(a.createElement)("span",{className:"screen-reader-text"},Object(o.__)("Previous price:","woo-gutenberg-products-block")),Object(a.createElement)(i.a,{currency:t,renderText:function(e){return Object(a.createElement)("del",{className:s()("wc-block-components-product-price__regular",c),style:n},e)},value:l}),Object(a.createElement)("span",{className:"screen-reader-text"},Object(o.__)("Discounted price:","woo-gutenberg-products-block")),Object(a.createElement)(i.a,{currency:t,renderText:function(e){return Object(a.createElement)("ins",{className:s()("wc-block-components-product-price__value","is-discounted",u),style:p},e)},value:m}))};r.a=function(e){var r=e.align,t=e.className,c=e.currency,o=e.maxPrice,l=void 0===o?null:o,m=e.minPrice,b=void 0===m?null:m,f=e.price,y=void 0===f?null:f,d=e.priceClassName,O=e.priceStyle,g=e.regularPrice,j=e.regularPriceClassName,v=e.regularPriceStyle,_=s()(t,"price","wc-block-components-product-price",n()({},"wc-block-components-product-price--align-".concat(r),r));return g&&y!==g?Object(a.createElement)(p,{className:_,currency:c,price:y,priceClassName:d,priceStyle:O,regularPrice:g,regularPriceClassName:j,regularPriceStyle:v}):null!==b&&null!==l?Object(a.createElement)(u,{className:_,currency:c,maxPrice:l,minPrice:b,priceClassName:d,priceStyle:O}):null!==y?Object(a.createElement)("span",{className:_},Object(a.createElement)(i.a,{className:s()("wc-block-components-product-price__value",d),currency:c,value:y,style:O})):Object(a.createElement)("span",{className:_},Object(a.createElement)("span",{className:s()("wc-block-components-product-price__value",d)}))}},202:function(e,r){},250:function(e,r){},276:function(e,r,t){"use strict";t.d(r,"c",(function(){return b})),t.d(r,"b",(function(){return f})),t.d(r,"a",(function(){return y}));var c=t(5),n=t.n(c),a=t(49),o=t.n(a),i=t(3);function l(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);r&&(c=c.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,c)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?l(Object(t),!0).forEach((function(r){n()(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var u,p,m={code:i.CURRENCY.code,symbol:i.CURRENCY.symbol,thousandSeparator:i.CURRENCY.thousandSeparator,decimalSeparator:i.CURRENCY.decimalSeparator,minorUnit:i.CURRENCY.precision,prefix:(u=i.CURRENCY.symbol,p=i.CURRENCY.symbolPosition,{left:u,left_space:" "+u,right:"",right_space:""}[p]||""),suffix:function(e,r){return{left:"",left_space:"",right:e,right_space:" "+e}[r]||""}(i.CURRENCY.symbol,i.CURRENCY.symbolPosition)},b=function(e){if(!e||"object"!==o()(e))return m;var r=e.currency_code,t=e.currency_symbol,c=e.currency_thousand_separator,n=e.currency_decimal_separator,a=e.currency_minor_unit,i=e.currency_prefix,l=e.currency_suffix;return{code:r||"USD",symbol:t||"$",thousandSeparator:"string"==typeof c?c:",",decimalSeparator:"string"==typeof n?n:".",minorUnit:Number.isFinite(a)?a:2,prefix:"string"==typeof i?i:"$",suffix:"string"==typeof l?l:""}},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return s(s({},m),e)},y=function(e,r){if(""===e||void 0===e)return"";var t=parseInt(e,10);if(!Number.isFinite(t))return"";var c=f(r),n=t/Math.pow(10,c.minorUnit),a=c.prefix+n+c.suffix,o=document.createElement("textarea");return o.innerHTML=a,o.value}},51:function(e,r,t){"use strict";var c=t(11),n=t.n(c),a=t(5),o=t.n(a),i=t(26),l=t.n(i),s=t(0),u=t(192),p=t(9),m=t.n(p);t(202);function b(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);r&&(c=c.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,c)}return t}function f(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?b(Object(t),!0).forEach((function(r){o()(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):b(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}r.a=function(e){var r=e.className,t=e.value,c=e.currency,a=e.onValueChange,o=l()(e,["className","value","currency","onValueChange"]);if("-"===t)return null;var i=t/Math.pow(10,c.minorUnit);if(!Number.isFinite(i))return null;var p=m()("wc-block-formatted-money-amount","wc-block-components-formatted-money-amount",r),b=f(f(f({displayType:"text"},o),function(e){return{thousandSeparator:e.thousandSeparator,decimalSeparator:e.decimalSeparator,decimalScale:e.minorUnit,fixedDecimalScale:!0,prefix:e.prefix,suffix:e.suffix,isNumericString:!0}}(c)),{},{value:void 0,currency:void 0,onValueChange:void 0}),y=a?function(e){var r=e.value*Math.pow(10,c.minorUnit);a(r)}:function(){};return Object(s.createElement)(u.a,n()({className:p},b,{value:i,onValueChange:y}))}},560:function(e,r,t){"use strict";t.r(r);var c=t(5),n=t.n(c),a=t(0),o=(t(2),t(9)),i=t.n(o),l=t(167),s=t(276),u=t(41),p=t(23),m=t(6),b=t(69);r.default=Object(b.withProductDataContext)((function(e){var r,t,c,o,b,f,y,d=e.className,O=e.align,g=e.fontSize,j=e.customFontSize,v=e.saleFontSize,_=e.customSaleFontSize,N=e.color,C=e.customColor,P=e.saleColor,S=e.customSaleColor,w=Object(u.useInnerBlockLayoutContext)().parentClassName,E=Object(u.useProductDataContext)().product,h=i()(d,n()({},"".concat(w,"__product-price"),w));if(!E.id)return Object(a.createElement)(l.a,{align:O,className:h});var x=Object(p.getColorClassName)("color",N),k=Object(p.getFontSizeClass)(g),R=Object(p.getColorClassName)("color",P),U=Object(p.getFontSizeClass)(v),D=i()((r={"has-text-color":N||C,"has-font-size":g||j},n()(r,x,x),n()(r,k,k),r)),z=i()((t={"has-text-color":P||S,"has-font-size":v||_},n()(t,R,R),n()(t,U,U),t)),Y={color:C,fontSize:j},F={color:S,fontSize:_},W=E.prices,M=Object(s.c)(W),T=W.price!==W.regular_price,V=T?i()((c={},n()(c,"".concat(w,"__product-price__value"),w),n()(c,z,Object(m.W)()),c)):i()((o={},n()(o,"".concat(w,"__product-price__value"),w),n()(o,D,Object(m.W)()),o)),B=T?F:Y;return Object(a.createElement)(l.a,{align:O,className:h,currency:M,price:W.price,priceClassName:V,priceStyle:Object(m.W)()?B:{},minPrice:null==W||null===(b=W.price_range)||void 0===b?void 0:b.min_amount,maxPrice:null==W||null===(f=W.price_range)||void 0===f?void 0:f.max_amount,regularPrice:W.regular_price,regularPriceClassName:i()((y={},n()(y,"".concat(w,"__product-price__regular"),w),n()(y,D,Object(m.W)()),y)),regularPriceStyle:Object(m.W)()?Y:{}})}))}}]);