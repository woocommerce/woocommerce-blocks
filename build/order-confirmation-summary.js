(()=>{var e,t={248:(e,t,r)=>{"use strict";r.r(t);var o=r(9196);const a=window.wp.blocks;var n=r(1984),i=r(6779);const c=JSON.parse('{"name":"woocommerce/order-confirmation-summary","version":"1.0.0","title":"Order Summary","description":"Display the order summary on the order confirmation page.","category":"woocommerce","keywords":["WooCommerce"],"supports":{"multiple":false,"align":["wide","full"],"html":false,"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalTextDecoration":true,"__experimentalFontStyle":true,"__experimentalFontWeight":true,"__experimentalLetterSpacing":true,"__experimentalTextTransform":true,"__experimentalDefaultControls":{"fontSize":true}},"color":{"background":true,"text":true,"gradients":true,"__experimentalDefaultControls":{"background":true,"text":true}},"__experimentalBorder":{"color":true,"radius":true,"width":true,"__experimentalDefaultControls":{"width":true,"color":true}},"spacing":{"padding":true,"margin":true,"__experimentalDefaultControls":{"margin":false,"padding":false}}},"attributes":{"align":{"type":"string","default":"wide"},"className":{"type":"string","default":""}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}'),s=window.wp.blockEditor,l=window.wp.components;var m=r(5736);const u=window.wc.priceFormat,d=window.wp.date,p=window.wc.wcSettings;r(4409);(0,a.registerBlockType)(c,{icon:{src:(0,o.createElement)(n.Z,{icon:i.Z,className:"wc-block-editor-components-block-icon"})},attributes:{...c.attributes},edit:()=>{const e=(0,s.useBlockProps)({className:"wc-block-order-confirmation-summary"});return(0,o.createElement)("div",{...e},(0,o.createElement)(l.Disabled,null,(0,o.createElement)("ul",{className:"wc-block-order-confirmation-summary-list"},(0,o.createElement)("li",{className:"wc-block-order-confirmation-summary-list-item"},(0,o.createElement)("span",{className:"wc-block-order-confirmation-summary-list-item__key"},(0,m.__)("Order number:","woo-gutenberg-products-block"))," ",(0,o.createElement)("span",{className:"wc-block-order-confirmation-summary-list-item__value"},"123")),(0,o.createElement)("li",{className:"wc-block-order-confirmation-summary-list-item"},(0,o.createElement)("span",{className:"wc-block-order-confirmation-summary-list-item__key"},(0,m.__)("Date:","woo-gutenberg-products-block"))," ",(0,o.createElement)("span",{className:"wc-block-order-confirmation-summary-list-item__value"},(0,d.date)((0,p.getSetting)("dateFormat"),new Date,void 0))),(0,o.createElement)("li",{className:"wc-block-order-confirmation-summary-list-item"},(0,o.createElement)("span",{className:"wc-block-order-confirmation-summary-list-item__key"},(0,m.__)("Total:","woo-gutenberg-products-block"))," ",(0,o.createElement)("span",{className:"wc-block-order-confirmation-summary-list-item__value"},(0,u.formatPrice)(4e3))),(0,o.createElement)("li",{className:"wc-block-order-confirmation-summary-list-item"},(0,o.createElement)("span",{className:"wc-block-order-confirmation-summary-list-item__key"},(0,m.__)("Email:","woo-gutenberg-products-block"))," ",(0,o.createElement)("span",{className:"wc-block-order-confirmation-summary-list-item__value"},"test@test.com")),(0,o.createElement)("li",{className:"wc-block-order-confirmation-summary-list-item"},(0,o.createElement)("span",{className:"wc-block-order-confirmation-summary-list-item__key"},(0,m.__)("Payment method:","woo-gutenberg-products-block"))," ",(0,o.createElement)("span",{className:"wc-block-order-confirmation-summary-list-item__value"},(0,m.__)("Credit Card","woo-gutenberg-products-block"))))))},save:()=>null})},4409:()=>{},9196:e=>{"use strict";e.exports=window.React},9307:e=>{"use strict";e.exports=window.wp.element},5736:e=>{"use strict";e.exports=window.wp.i18n},444:e=>{"use strict";e.exports=window.wp.primitives}},r={};function o(e){var a=r[e];if(void 0!==a)return a.exports;var n=r[e]={exports:{}};return t[e].call(n.exports,n,n.exports,o),n.exports}o.m=t,e=[],o.O=(t,r,a,n)=>{if(!r){var i=1/0;for(m=0;m<e.length;m++){for(var[r,a,n]=e[m],c=!0,s=0;s<r.length;s++)(!1&n||i>=n)&&Object.keys(o.O).every((e=>o.O[e](r[s])))?r.splice(s--,1):(c=!1,n<i&&(i=n));if(c){e.splice(m--,1);var l=a();void 0!==l&&(t=l)}}return t}n=n||0;for(var m=e.length;m>0&&e[m-1][2]>n;m--)e[m]=e[m-1];e[m]=[r,a,n]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.j=2205,(()=>{var e={2205:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var a,n,[i,c,s]=r,l=0;if(i.some((t=>0!==e[t]))){for(a in c)o.o(c,a)&&(o.m[a]=c[a]);if(s)var m=s(o)}for(t&&t(r);l<i.length;l++)n=i[l],o.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return o.O(m)},r=self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var a=o.O(void 0,[2869],(()=>o(248)));a=o.O(a),((this.wc=this.wc||{}).blocks=this.wc.blocks||{})["order-confirmation-summary"]=a})();