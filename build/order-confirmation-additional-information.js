(()=>{var e,t={4064:(e,t,r)=>{"use strict";r.r(t);var o=r(9307);const n=window.wp.blocks;var i=r(1984),a=r(5430);const s=JSON.parse('{"name":"woocommerce/order-confirmation-additional-information","version":"1.0.0","title":"Additional Information","description":"Displays additional information provided by third-party extensions for the current order.","category":"woocommerce","keywords":["WooCommerce"],"supports":{"multiple":false,"align":["wide","full"],"html":false,"__experimentalBorder":{"color":true,"radius":true,"width":true,"style":true,"__experimentalDefaultControls":{"width":true,"color":true}},"spacing":{"padding":true,"margin":true,"__experimentalDefaultControls":{"margin":false,"padding":false}}},"attributes":{"align":{"type":"string","default":"wide"},"className":{"type":"string","default":""}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}'),l=window.wp.blockEditor;r(8724);const c=({numberOfLines:e=1,tag:t="div",maxWidth:r="100%"})=>{const n=Array.from({length:e},((e,t)=>(0,o.createElement)("span",{className:"wc-block-components-skeleton-text-line","aria-hidden":"true",key:t})));return(0,o.createElement)(t,{className:"wc-block-components-skeleton",style:{maxWidth:r}},n)};r(9826);(0,n.registerBlockType)(s,{icon:{src:(0,o.createElement)(i.Z,{icon:a.Z,className:"wc-block-editor-components-block-icon"})},attributes:{...s.attributes},edit:()=>{const e=(0,l.useBlockProps)({className:"wc-block-order-confirmation-additional-information"});return(0,o.createElement)("div",{...e},(0,o.createElement)(c,{tag:"h3",numberOfLines:1,maxWidth:"25%"}),(0,o.createElement)(c,{numberOfLines:3}))},save:()=>null})},8724:()=>{},9826:()=>{},9307:e=>{"use strict";e.exports=window.wp.element},444:e=>{"use strict";e.exports=window.wp.primitives}},r={};function o(e){var n=r[e];if(void 0!==n)return n.exports;var i=r[e]={exports:{}};return t[e].call(i.exports,i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,r,n,i)=>{if(!r){var a=1/0;for(d=0;d<e.length;d++){for(var[r,n,i]=e[d],s=!0,l=0;l<r.length;l++)(!1&i||a>=i)&&Object.keys(o.O).every((e=>o.O[e](r[l])))?r.splice(l--,1):(s=!1,i<a&&(a=i));if(s){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[r,n,i]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.j=2315,(()=>{var e={2315:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var n,i,[a,s,l]=r,c=0;if(a.some((t=>0!==e[t]))){for(n in s)o.o(s,n)&&(o.m[n]=s[n]);if(l)var d=l(o)}for(t&&t(r);c<a.length;c++)i=a[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(d)},r=self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=o.O(void 0,[2869],(()=>o(4064)));n=o.O(n),((this.wc=this.wc||{}).blocks=this.wc.blocks||{})["order-confirmation-additional-information"]=n})();