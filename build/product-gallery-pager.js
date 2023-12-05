(()=>{var e,t={4283:(e,t,r)=>{"use strict";r.d(t,{e:()=>l});let l=function(e){return e.DIGITS="digits",e.DOTS="dots",e.OFF="off",e}({})},7118:(e,t,r)=>{"use strict";r.d(t,{$_:()=>i,j5:()=>s,jW:()=>a,oc:()=>n,xT:()=>c});var l=r(9196),o=r(444);const n=()=>(0,l.createElement)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},(0,l.createElement)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.00018 11L7.00018 11L7.00018 13H5.00018V11ZM11.0002 11L13.0002 11V13H11.0002V11ZM17.0002 11L19.0002 11V13H17.0002V11Z",fill:"currentColor"})),c=(0,l.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 12 12"},(0,l.createElement)("circle",{cx:"6",cy:"6",r:"6",fill:"black",fillOpacity:"0.2"})),i=(0,l.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 12 12"},(0,l.createElement)("circle",{cx:"6",cy:"6",r:"6",fill:"black"})),a=()=>(0,l.createElement)(o.SVG,{width:"80",height:"36",viewBox:"0 0 80 36",fill:"none",xmlns:"http://www.w3.org/2000/svg"},(0,l.createElement)("circle",{cx:"32.6665",cy:"18",r:"3",fill:"currentColor"}),(0,l.createElement)("circle",{cx:"40.6665",cy:"18",r:"2.25",stroke:"currentColor",strokeWidth:"1.5"}),(0,l.createElement)("circle",{cx:"48.6665",cy:"18",r:"2.25",stroke:"currentColor",strokeWidth:"1.5"})),s=()=>(0,l.createElement)(o.SVG,{width:"80",height:"36",viewBox:"0 0 80 36",fill:"none",xmlns:"http://www.w3.org/2000/svg"},(0,l.createElement)("path",{d:"M30.1417 22H31.9288V14.9541H30.1417L28.3497 16.1748V17.7178L30.0489 16.5703H30.1417V22ZM36.9771 22H41.7231V21.0674H38.4663V20.9697L39.9604 19.4805C41.2397 18.2109 41.6108 17.5957 41.6108 16.7949V16.7803C41.6108 15.6182 40.644 14.7832 39.3306 14.7832C37.9146 14.7832 36.9185 15.6914 36.9136 16.9805L36.9233 16.9902H37.9487L37.9536 16.9756C37.9536 16.2041 38.481 15.6865 39.272 15.6865C40.0435 15.6865 40.5171 16.1943 40.5171 16.8828V16.8975C40.5171 17.4688 40.2485 17.8301 39.3159 18.8018L36.9771 21.2578V22ZM48.7392 22.1318C50.2333 22.1318 51.2929 21.2627 51.2929 20.0518V20.042C51.2929 19.0557 50.5995 18.4307 49.5644 18.3379V18.3135C50.4237 18.1328 51.0487 17.5469 51.0487 16.6729V16.6631C51.0487 15.5742 50.1308 14.8223 48.7294 14.8223C47.3524 14.8223 46.4149 15.6084 46.3075 16.7949L46.3026 16.8486H47.328L47.3329 16.7998C47.4013 16.1357 47.9481 15.7207 48.7294 15.7207C49.5253 15.7207 49.9843 16.1211 49.9843 16.8047V16.8145C49.9843 17.4688 49.4374 17.9424 48.6317 17.9424H47.8065V18.792H48.6659C49.6034 18.792 50.1796 19.2363 50.1796 20.0322V20.042C50.1796 20.7354 49.5985 21.2188 48.7392 21.2188C47.8651 21.2188 47.2743 20.7695 47.206 20.1299L47.2011 20.0811H46.1562L46.161 20.1396C46.2538 21.3066 47.2353 22.1318 48.7392 22.1318Z",fill:"currentColor"}))},7565:(e,t,r)=>{"use strict";r.r(t);var l=r(4981),o=r(5271),n=r(7118),c=r(9196),i=r(1984),a=r(2175),s=r(5609),p=r(4184),u=r.n(p),d=r(2742),g=r(4283);const m=()=>{const e=Array.from({length:4},((e,t)=>{const r=0===t;return(0,c.createElement)("li",{className:"wc-block-editor-product-gallery-pager__item "+(r?"is-active":""),key:t},t+1)}));return(0,c.createElement)("ul",{className:"wc-block-editor-product-gallery-pager__pager"},e)},w=e=>{const{iconClass:t}=e,r=Array.from({length:3},((e,r)=>{const l=0===r?n.$_:n.xT;return(0,c.createElement)("li",{key:r},(0,c.createElement)(i.Z,{className:t,icon:l,size:12}))}));return(0,c.createElement)("ul",{className:"wc-block-editor-product-gallery-pager__pager"},r)},b=e=>{const{pagerDisplayMode:t}=e;switch(t){case g.e.DOTS:return(0,c.createElement)(w,null);case g.e.DIGITS:return(0,c.createElement)(m,null);case g.e.OFF:return null;default:return(0,c.createElement)(w,null)}},E=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"woocommerce/product-gallery-pager","version":"1.0.0","title":"Pager","description":"Display the gallery pager.","category":"woocommerce","keywords":["WooCommerce"],"textdomain":"woo-gutenberg-products-block","ancestor":["woocommerce/product-gallery"],"usesContext":["pagerDisplayMode","productGalleryClientId","thumbnailsNumberOfThumbnails","postId"]}');r(6802),(0,o.EU)()&&(0,l.registerBlockType)(E,{icon:n.oc,edit:e=>{const{context:t}=e,r=(0,a.useBlockProps)({className:u()("wc-block-editor-product-gallery-pager","wc-block-product-gallery-pager")});return(0,c.createElement)("div",{...r},(0,c.createElement)(a.InspectorControls,null,(0,c.createElement)(s.PanelBody,null,(0,c.createElement)(d.y,{context:t}))),(0,c.createElement)(b,{pagerDisplayMode:t.pagerDisplayMode}))},save:()=>null})},2742:(e,t,r)=>{"use strict";r.d(t,{y:()=>u});var l=r(9196),o=r(2175),n=r(9818),c=r(5736),i=r(5609),a=r(4283),s=r(7118);const p=e=>{switch(e){case a.e.DIGITS:return(0,c.__)("A list of numbers will show to indicate the number of items.","woo-gutenberg-products-block");case a.e.DOTS:return(0,c.__)("A series of dots will show to indicate the number of items.","woo-gutenberg-products-block");default:return(0,c.__)("No pager will be displayed.","woo-gutenberg-products-block")}},u=({context:e})=>{const{productGalleryClientId:t,pagerDisplayMode:r}=e,{updateBlockAttributes:u}=(0,n.useDispatch)(o.store);return(0,l.createElement)(i.__experimentalToggleGroupControl,{label:(0,c.__)("Pager","woo-gutenberg-products-block"),style:{width:"100%"},onChange:e=>{u(t,{pagerDisplayMode:e})},help:p(r),value:r},(0,l.createElement)(i.__experimentalToggleGroupControlOption,{value:a.e.OFF,label:(0,c.__)("Off","woo-gutenberg-products-block")}),(0,l.createElement)(i.__experimentalToggleGroupControlOption,{value:a.e.DOTS,label:(0,l.createElement)(s.jW,null)}),(0,l.createElement)(i.__experimentalToggleGroupControlOption,{value:a.e.DIGITS,label:(0,l.createElement)(s.j5,null)}))}},7530:(e,t,r)=>{"use strict";r.d(t,{Lo:()=>w});var l,o,n,c,i,a,s,p,u,d,g=r(4617);const m=(0,g.getSetting)("wcBlocksConfig",{buildPhase:1,pluginUrl:"",productCount:0,defaultAvatar:"",restApiRoutes:{},wordCountType:"words"}),w=(m.pluginUrl,m.pluginUrl,m.buildPhase),b=(null===(l=g.STORE_PAGES.shop)||void 0===l||l.permalink,null===(o=g.STORE_PAGES.checkout)||void 0===o||o.id,null===(n=g.STORE_PAGES.checkout)||void 0===n||n.permalink,null===(c=g.STORE_PAGES.privacy)||void 0===c||c.permalink,null===(i=g.STORE_PAGES.privacy)||void 0===i||i.title,null===(a=g.STORE_PAGES.terms)||void 0===a||a.permalink,null===(s=g.STORE_PAGES.terms)||void 0===s||s.title,null===(p=g.STORE_PAGES.cart)||void 0===p||p.id,null===(u=g.STORE_PAGES.cart)||void 0===u||u.permalink,null!==(d=g.STORE_PAGES.myaccount)&&void 0!==d&&d.permalink?g.STORE_PAGES.myaccount.permalink:(0,g.getSetting)("wpLoginUrl","/wp-login.php"),(0,g.getSetting)("localPickupEnabled",!1),(0,g.getSetting)("countries",{})),E=(0,g.getSetting)("countryData",{});Object.fromEntries(Object.keys(E).filter((e=>!0===E[e].allowBilling)).map((e=>[e,b[e]||""]))),Object.fromEntries(Object.keys(E).filter((e=>!0===E[e].allowBilling)).map((e=>[e,E[e].states||[]]))),Object.fromEntries(Object.keys(E).filter((e=>!0===E[e].allowShipping)).map((e=>[e,b[e]||""]))),Object.fromEntries(Object.keys(E).filter((e=>!0===E[e].allowShipping)).map((e=>[e,E[e].states||[]]))),Object.fromEntries(Object.keys(E).map((e=>[e,E[e].locale||[]])))},4478:(e,t,r)=>{"use strict";r.d(t,{EU:()=>o}),r(4981);var l=r(7530);const o=()=>l.Lo>2},5271:(e,t,r)=>{"use strict";r.d(t,{EU:()=>l.EU});var l=r(4478)},6802:()=>{},9196:e=>{"use strict";e.exports=window.React},4617:e=>{"use strict";e.exports=window.wc.wcSettings},2175:e=>{"use strict";e.exports=window.wp.blockEditor},4981:e=>{"use strict";e.exports=window.wp.blocks},5609:e=>{"use strict";e.exports=window.wp.components},9818:e=>{"use strict";e.exports=window.wp.data},9307:e=>{"use strict";e.exports=window.wp.element},5736:e=>{"use strict";e.exports=window.wp.i18n},444:e=>{"use strict";e.exports=window.wp.primitives}},r={};function l(e){var o=r[e];if(void 0!==o)return o.exports;var n=r[e]={exports:{}};return t[e].call(n.exports,n,n.exports,l),n.exports}l.m=t,e=[],l.O=(t,r,o,n)=>{if(!r){var c=1/0;for(p=0;p<e.length;p++){for(var[r,o,n]=e[p],i=!0,a=0;a<r.length;a++)(!1&n||c>=n)&&Object.keys(l.O).every((e=>l.O[e](r[a])))?r.splice(a--,1):(i=!1,n<c&&(c=n));if(i){e.splice(p--,1);var s=o();void 0!==s&&(t=s)}}return t}n=n||0;for(var p=e.length;p>0&&e[p-1][2]>n;p--)e[p]=e[p-1];e[p]=[r,o,n]},l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var r in t)l.o(t,r)&&!l.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.j=5609,(()=>{var e={5609:0};l.O.j=t=>0===e[t];var t=(t,r)=>{var o,n,[c,i,a]=r,s=0;if(c.some((t=>0!==e[t]))){for(o in i)l.o(i,o)&&(l.m[o]=i[o]);if(a)var p=a(l)}for(t&&t(r);s<c.length;s++)n=c[s],l.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return l.O(p)},r=self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=l.O(void 0,[2869],(()=>l(7565)));o=l.O(o),((this.wc=this.wc||{}).blocks=this.wc.blocks||{})["product-gallery-pager"]=o})();