this.wc=this.wc||{},this.wc.wcBlocksMiddleware=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=178)}({178:function(e,t,n){"use strict";n.r(t);var o=n(18),r=n.n(o);let i="",c=0;try{const e=window.localStorage.getItem("storeApiNonce"),t=e?JSON.parse(e):{};i=(null==t?void 0:t.nonce)||"",c=(null==t?void 0:t.timestamp)||0}catch{}const u=(e,t)=>{e!==i&&(c&&t<c||(i=e,c=t||Date.now()/1e3,window.localStorage.setItem("storeApiNonce",JSON.stringify({nonce:i,timestamp:c}))))},a=e=>{const t=e.headers||{};return e.headers={...t,Nonce:i},e};r.a.use((e,t)=>{var n,o;return(e=>{const t=e.url||e.path;return!(!t||!e.method||"GET"===e.method)&&null!==/wc\/store\/v1\//.exec(t)})(e)&&(e=a(e),Array.isArray(null===(n=e)||void 0===n||null===(o=n.data)||void 0===o?void 0:o.requests)&&(e.data.requests=e.data.requests.map(a))),t(e,t)}),r.a.setNonce=e=>{const t="function"==typeof(null==e?void 0:e.get)?e.get("Nonce"):e.Nonce,n="function"==typeof(null==e?void 0:e.get)?e.get("Nonce-Timestamp"):e["Nonce-Timestamp"];t&&u(t,n)},u(wcBlocksMiddlewareConfig.storeApiNonce,wcBlocksMiddlewareConfig.storeApiNonceTimestamp)},18:function(e,t){e.exports=window.wp.apiFetch}});