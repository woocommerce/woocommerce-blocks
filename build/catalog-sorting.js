this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["catalog-sorting"]=function(e){function t(t){for(var r,l,i=t[0],s=t[1],a=t[2],p=0,f=[];p<i.length;p++)l=i[p],Object.prototype.hasOwnProperty.call(n,l)&&n[l]&&f.push(n[l][0]),n[l]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(u&&u(t);f.length;)f.shift()();return c.push.apply(c,a||[]),o()}function o(){for(var e,t=0;t<c.length;t++){for(var o=c[t],r=!0,i=1;i<o.length;i++){var s=o[i];0!==n[s]&&(r=!1)}r&&(c.splice(t--,1),e=l(l.s=o[0]))}return e}var r={},n={10:0},c=[];function l(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,l),o.l=!0,o.exports}l.m=e,l.c=r,l.d=function(e,t,o){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(l.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(o,r,function(t){return e[t]}.bind(null,r));return o},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var i=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var a=0;a<i.length;a++)t(i[a]);var u=s;return c.push([464,0]),o()}({0:function(e,t){e.exports=window.wp.element},1:function(e,t){e.exports=window.wp.i18n},10:function(e,t){e.exports=window.wp.primitives},2:function(e,t){e.exports=window.wp.components},264:function(e,t,o){"use strict";var r=o(0),n=o(10);const c=Object(r.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 24 24",fill:"none"},Object(r.createElement)("path",{stroke:"currentColor",strokeWidth:"1.5",fill:"none",d:"M6 3.75h12c.69 0 1.25.56 1.25 1.25v14c0 .69-.56 1.25-1.25 1.25H6c-.69 0-1.25-.56-1.25-1.25V5c0-.69.56-1.25 1.25-1.25z"}),Object(r.createElement)("path",{fill:"currentColor",fillRule:"evenodd",d:"M6.9 7.5A1.1 1.1 0 018 6.4h8a1.1 1.1 0 011.1 1.1v2a1.1 1.1 0 01-1.1 1.1H8a1.1 1.1 0 01-1.1-1.1v-2zm1.2.1v1.8h7.8V7.6H8.1z",clipRule:"evenodd"}),Object(r.createElement)("path",{fill:"currentColor",d:"M8.5 12h1v1h-1v-1zM8.5 14h1v1h-1v-1zM8.5 16h1v1h-1v-1zM11.5 12h1v1h-1v-1zM11.5 14h1v1h-1v-1zM11.5 16h1v1h-1v-1zM14.5 12h1v1h-1v-1zM14.5 14h1v1h-1v-1zM14.5 16h1v1h-1v-1z"}));t.a=c},330:function(e){e.exports=JSON.parse('{"name":"woocommerce/catalog-sorting","version":"1.0.0","title":"Catalog Sorting","description":"Enable customers to change the sorting order of the products.","category":"woocommerce","keywords":["WooCommerce"],"supports":{"color":{"text":true,"background":false},"typography":{"fontSize":true}},"attributes":{"fontSize":{"type":"string","default":"small"}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}')},464:function(e,t,o){e.exports=o(587)},465:function(e,t){},5:function(e,t){e.exports=window.wp.blockEditor},587:function(e,t,o){"use strict";o.r(t);var r=o(0),n=o(8),c=o(70),l=o(264),i=o(330),s=o(5),a=o(2),u=o(1);const p=()=>Object(r.createElement)("select",{className:"orderby"},Object(r.createElement)("option",null,Object(u.__)("Default sorting","woo-gutenberg-products-block")));o(465),Object(n.registerBlockType)(i,{icon:{src:Object(r.createElement)(c.a,{icon:l.a,className:"wc-block-editor-components-block-icon"})},attributes:{...i.attributes},edit:()=>{const e=Object(s.useBlockProps)({className:"woocommerce wc-block-catalog-sorting"});return Object(r.createElement)(r.Fragment,null,Object(r.createElement)("div",e,Object(r.createElement)(a.Disabled,null,Object(r.createElement)(p,null))))},save:()=>null})},8:function(e,t){e.exports=window.wp.blocks}});