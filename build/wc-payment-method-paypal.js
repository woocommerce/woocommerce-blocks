!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){e.exports=window.wp.element},function(e,t){e.exports=window.wp.htmlEntities},function(e,t){e.exports=window.wp.i18n},function(e,t){e.exports=window.wc.wcSettings},function(e,t){e.exports=window.wc.wcBlocksRegistry},,function(e,t,n){"use strict";n.r(t);var o,r=n(0),c=n(4),i=n(2),l=n(3),u=n(1);const a=Object(l.getPaymentMethodData)("paypal",{}),p=()=>Object(u.decodeEntities)(a.description||""),d={name:"paypal",label:Object(r.createElement)("img",{src:`${l.WC_ASSET_URL}/images/paypal.png`,alt:Object(u.decodeEntities)(a.title||Object(i.__)("PayPal","woo-gutenberg-products-block"))}),placeOrderButtonLabel:Object(i.__)("Proceed to PayPal","woo-gutenberg-products-block"),content:Object(r.createElement)(p,null),edit:Object(r.createElement)(p,null),canMakePayment:()=>!0,ariaLabel:Object(u.decodeEntities)((null==a?void 0:a.title)||Object(i.__)("Payment via PayPal","woo-gutenberg-products-block")),supports:{features:null!==(o=a.supports)&&void 0!==o?o:[]}};Object(c.registerPaymentMethod)(d)}]);