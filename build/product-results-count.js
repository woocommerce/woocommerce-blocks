this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["product-results-count"]=function(e){function t(t){for(var r,s,u=t[0],l=t[1],i=t[2],p=0,h=[];p<u.length;p++)s=u[p],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&h.push(n[s][0]),n[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(a&&a(t);h.length;)h.shift()();return c.push.apply(c,i||[]),o()}function o(){for(var e,t=0;t<c.length;t++){for(var o=c[t],r=!0,u=1;u<o.length;u++){var l=o[u];0!==n[l]&&(r=!1)}r&&(c.splice(t--,1),e=s(s.s=o[0]))}return e}var r={},n={37:0},c=[];function s(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=e,s.c=r,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(o,r,function(t){return e[t]}.bind(null,r));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var u=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var i=0;i<u.length;i++)t(u[i]);var a=l;return c.push([528,0]),o()}({0:function(e,t){e.exports=window.wp.element},1:function(e,t){e.exports=window.wp.i18n},10:function(e,t){e.exports=window.wp.primitives},264:function(e,t,o){"use strict";var r=o(0),n=o(10);const c=Object(r.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 24 24",fill:"none"},Object(r.createElement)("path",{stroke:"currentColor",strokeWidth:"1.5",fill:"none",d:"M6 3.75h12c.69 0 1.25.56 1.25 1.25v14c0 .69-.56 1.25-1.25 1.25H6c-.69 0-1.25-.56-1.25-1.25V5c0-.69.56-1.25 1.25-1.25z"}),Object(r.createElement)("path",{fill:"currentColor",fillRule:"evenodd",d:"M6.9 7.5A1.1 1.1 0 018 6.4h8a1.1 1.1 0 011.1 1.1v2a1.1 1.1 0 01-1.1 1.1H8a1.1 1.1 0 01-1.1-1.1v-2zm1.2.1v1.8h7.8V7.6H8.1z",clipRule:"evenodd"}),Object(r.createElement)("path",{fill:"currentColor",d:"M8.5 12h1v1h-1v-1zM8.5 14h1v1h-1v-1zM8.5 16h1v1h-1v-1zM11.5 12h1v1h-1v-1zM11.5 14h1v1h-1v-1zM11.5 16h1v1h-1v-1zM14.5 12h1v1h-1v-1zM14.5 14h1v1h-1v-1zM14.5 16h1v1h-1v-1z"}));t.a=c},337:function(e){e.exports=JSON.parse('{"name":"woocommerce/product-results-count","version":"1.0.0","title":"Product Results Count","description":"Display the number of products on the archive page or search result page.","category":"woocommerce","keywords":["WooCommerce"],"supports":{"color":{"text":true,"background":false},"typography":{"fontSize":true}},"attributes":{},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}')},5:function(e,t){e.exports=window.wp.blockEditor},528:function(e,t,o){e.exports=o(590)},529:function(e,t){},590:function(e,t,o){"use strict";o.r(t);var r=o(0),n=o(8),c=o(70),s=o(264),u=o(337),l=o(5),i=o(1);o(529),Object(n.registerBlockType)(u,{icon:{src:Object(r.createElement)(c.a,{icon:s.a,className:"wc-block-editor-components-block-icon"})},attributes:{...u.attributes},edit:()=>{const e=Object(l.useBlockProps)({className:"woocommerce wc-block-product-results-count"});return Object(r.createElement)("div",e,Object(r.createElement)("p",{className:"woocommerce-result-count"},Object(i.__)("Showing 1-X of X results","woo-gutenberg-products-block")))},save:()=>null})},8:function(e,t){e.exports=window.wp.blocks}});