(()=>{"use strict";var e,t={2797:(e,t,o)=>{o.r(t);var r=o(9307);const n=window.wp.blocks;var l=o(1984),c=o(3378);const i=window.wc.wcSettings;var s;const a=(0,i.getSetting)("wcBlocksConfig",{buildPhase:1,pluginUrl:"",productCount:0,defaultAvatar:"",restApiRoutes:{},wordCountType:"words"}),p=(a.pluginUrl,a.pluginUrl,a.buildPhase),u=(null===(s=i.STORE_PAGES.shop)||void 0===s||s.permalink,i.STORE_PAGES.checkout.id,i.STORE_PAGES.checkout.permalink,i.STORE_PAGES.privacy.permalink,i.STORE_PAGES.privacy.title,i.STORE_PAGES.terms.permalink,i.STORE_PAGES.terms.title,i.STORE_PAGES.cart.id,i.STORE_PAGES.cart.permalink,i.STORE_PAGES.myaccount.permalink?i.STORE_PAGES.myaccount.permalink:(0,i.getSetting)("wpLoginUrl","/wp-login.php"),(0,i.getSetting)("localPickupEnabled",!1),(0,i.getSetting)("countries",{})),m=(0,i.getSetting)("countryData",{}),d=(Object.fromEntries(Object.keys(m).filter((e=>!0===m[e].allowBilling)).map((e=>[e,u[e]||""]))),Object.fromEntries(Object.keys(m).filter((e=>!0===m[e].allowBilling)).map((e=>[e,m[e].states||[]]))),Object.fromEntries(Object.keys(m).filter((e=>!0===m[e].allowShipping)).map((e=>[e,u[e]||""]))),Object.fromEntries(Object.keys(m).filter((e=>!0===m[e].allowShipping)).map((e=>[e,m[e].states||[]]))),Object.fromEntries(Object.keys(m).map((e=>[e,m[e].locale||[]]))),JSON.parse('{"name":"woocommerce/collection-filters","version":"1.0.0","title":"Collection Filters","description":"A block that adds product filters to the product collection.","category":"woocommerce","keywords":["WooCommerce","Filters"],"textdomain":"woo-gutenberg-products-block","supports":{"html":false,"reusable":false},"usesContext":["query"],"ancestor":["woocommerce/product-collection"],"apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}')),k=window.wp.blockEditor;p>2&&(0,n.registerBlockType)(d,{icon:{src:(0,r.createElement)(l.Z,{icon:c.Z,className:"wc-block-editor-components-block-icon"})},edit:()=>{const e=(0,k.useBlockProps)(),t=(0,k.useInnerBlocksProps)(e);return(0,r.createElement)("nav",{...t})},save:function(){const e=k.useBlockProps.save(),t=k.useInnerBlocksProps.save(e);return(0,r.createElement)("nav",{...t})}})},9307:e=>{e.exports=window.wp.element},444:e=>{e.exports=window.wp.primitives}},o={};function r(e){var n=o[e];if(void 0!==n)return n.exports;var l=o[e]={exports:{}};return t[e].call(l.exports,l,l.exports,r),l.exports}r.m=t,e=[],r.O=(t,o,n,l)=>{if(!o){var c=1/0;for(p=0;p<e.length;p++){for(var[o,n,l]=e[p],i=!0,s=0;s<o.length;s++)(!1&l||c>=l)&&Object.keys(r.O).every((e=>r.O[e](o[s])))?o.splice(s--,1):(i=!1,l<c&&(c=l));if(i){e.splice(p--,1);var a=n();void 0!==a&&(t=a)}}return t}l=l||0;for(var p=e.length;p>0&&e[p-1][2]>l;p--)e[p]=e[p-1];e[p]=[o,n,l]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.j=3418,(()=>{var e={3418:0};r.O.j=t=>0===e[t];var t=(t,o)=>{var n,l,[c,i,s]=o,a=0;if(c.some((t=>0!==e[t]))){for(n in i)r.o(i,n)&&(r.m[n]=i[n]);if(s)var p=s(r)}for(t&&t(o);a<c.length;a++)l=c[a],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(p)},o=self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var n=r.O(void 0,[2869],(()=>r(2797)));n=r.O(n),((this.wc=this.wc||{}).blocks=this.wc.blocks||{})["collection-filters"]=n})();