(()=>{var e,o={5982:(e,o,t)=>{"use strict";t.r(o);var c={};t.r(c),t.d(c,{blockifyConfig:()=>j,getDescription:()=>x,getTitle:()=>P,isConversionPossible:()=>O});var r={};t.r(r),t.d(r,{blockifyConfig:()=>G,getDescription:()=>N,getTitle:()=>I,isConversionPossible:()=>A});var l=t(9307);const n=window.wp.blocks,s=window.wc.wcSettings;var a;const i=(0,s.getSetting)("wcBlocksConfig",{buildPhase:1,pluginUrl:"",productCount:0,defaultAvatar:"",restApiRoutes:{},wordCountType:"words"}),p=i.pluginUrl+"images/",d=(i.pluginUrl,i.buildPhase,null===(a=s.STORE_PAGES.shop)||void 0===a||a.permalink,s.STORE_PAGES.checkout.id,s.STORE_PAGES.checkout.permalink,s.STORE_PAGES.privacy.permalink,s.STORE_PAGES.privacy.title,s.STORE_PAGES.terms.permalink,s.STORE_PAGES.terms.title,s.STORE_PAGES.cart.id,s.STORE_PAGES.cart.permalink,s.STORE_PAGES.myaccount.permalink?s.STORE_PAGES.myaccount.permalink:(0,s.getSetting)("wpLoginUrl","/wp-login.php"),(0,s.getSetting)("localPickupEnabled",!1),(0,s.getSetting)("countries",{})),u=(0,s.getSetting)("countryData",{}),m=(Object.fromEntries(Object.keys(u).filter((e=>!0===u[e].allowBilling)).map((e=>[e,d[e]||""]))),Object.fromEntries(Object.keys(u).filter((e=>!0===u[e].allowBilling)).map((e=>[e,u[e].states||[]]))),Object.fromEntries(Object.keys(u).filter((e=>!0===u[e].allowShipping)).map((e=>[e,d[e]||""]))),Object.fromEntries(Object.keys(u).filter((e=>!0===u[e].allowShipping)).map((e=>[e,u[e].states||[]]))),Object.fromEntries(Object.keys(u).map((e=>[e,u[e].locale||[]]))),window.wp.blockEditor),b=window.wp.components;var k=t(5736),g=t(1984),h=t(8984);const w=window.wp.data,f=window.wp.notices;var _=t(444),v=t(4184),E=t.n(v);const y=(0,l.createElement)((({className:e,height:o,width:t,...c})=>(0,l.createElement)(_.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 245 145",className:E()("woo-icon",e),width:t,height:o,...c},(0,l.createElement)("path",{fill:"#7f54b3",d:"M22.76 0h199.1a22.77 22.77 0 0 1 22.8 22.76v75.92a22.77 22.77 0 0 1-22.78 22.78h-71.41l9.77 24-43.13-24H22.76C10.1946 121.449.011 111.2654 0 98.7V22.76C.011 10.1946 10.1946.011 22.76 0z"}),(0,l.createElement)("path",{fill:"#FFF",fillRule:"nonzero",d:"M12.32 20.63a8.16 8.16 0 0 1 6.25-3.09c5.0733-.36 7.9867 2.0333 8.74 7.18 3.14 20.86 6.4933 38.5633 10.06 53.11l21.92-41.69c2-3.76 4.49-5.76 7.52-6 4.3867-.3067 7.13 2.49 8.23 8.39a186 186 0 0 0 9.47 34.23c2.62-25.38 7.0133-43.7133 13.18-55a7.73 7.73 0 0 1 6.6-4.43 8.8 8.8 0 0 1 6.32 2 7.75 7.75 0 0 1 3.05 5.74 8.52 8.52 0 0 1-1 4.77c-3.9 7.24-7.12 19.28-9.66 36.12-2.48 16.2533-3.3967 28.9633-2.75 38.13a12.25 12.25 0 0 1-1.16 6.56 6.32 6.32 0 0 1-5.33 3.53c-2.6667.18-5.3033-1.0567-7.91-3.71-9.2933-9.54-16.6567-23.7267-22.09-42.56C57.3 76.7167 52.48 86.3333 49.3 92.76c-5.86 11.3333-10.89 17.13-15.09 17.39-2.7333.1933-5.0667-2.0933-7-6.86-5.1-13.0933-10.5833-38.4033-16.45-75.93a8.56 8.56 0 0 1 1.56-6.73zM227.23 36.34a23.17 23.17 0 0 0-16-11.59 26.25 26.25 0 0 0-5.42-.58c-9.5867 0-17.41 5-23.47 15a53 53 0 0 0-7.78 28.16c0 7.7333 1.6167 14.3333 4.85 19.8a23.15 23.15 0 0 0 16 11.59 26.28 26.28 0 0 0 5.42.59c9.68 0 17.5033-5 23.47-15A53.89 53.89 0 0 0 232.08 56c0-7.7333-1.6167-14.2867-4.85-19.66zm-12.61 27.72c-1.3733 6.56-3.9167 11.5-7.63 14.82-2.9267 2.6667-5.6133 3.7433-8.06 3.23-2.4467-.5133-4.4033-2.6667-5.87-6.46a25.68 25.68 0 0 1-1.76-9.09 35.9 35.9 0 0 1 .73-7.34 33 33 0 0 1 5.28-11.88c3.3333-4.8933 6.8067-6.9467 10.42-6.16 2.44.4867 4.3933 2.64 5.86 6.46a25.68 25.68 0 0 1 1.76 9.12 35.73 35.73 0 0 1-.73 7.33v-.03zM164.57 36.34a23.2 23.2 0 0 0-16-11.59 26.42 26.42 0 0 0-5.43-.58c-9.5933 0-17.4167 5-23.47 15a53 53 0 0 0-7.78 28.16c0 7.7333 1.6133 14.3333 4.84 19.8a23.19 23.19 0 0 0 16 11.59 26.44 26.44 0 0 0 5.43.59c9.68 0 17.5033-5 23.47-15A53.88 53.88 0 0 0 169.4 56c0-7.7333-1.6133-14.2867-4.84-19.66h.01zm-12.61 27.72c-1.3667 6.56-3.91 11.5-7.63 14.82-2.93 2.64-5.63 3.72-8.07 3.23-2.44-.49-4.4-2.64-5.86-6.46a25.7 25.7 0 0 1-1.77-9.09 35.9 35.9 0 0 1 .74-7.34 33 33 0 0 1 5.28-11.88c3.3333-4.8933 6.8067-6.9467 10.42-6.16 2.44.4867 4.3933 2.64 5.86 6.46a25.91 25.91 0 0 1 1.76 9.12 35.73 35.73 0 0 1-.73 7.33v-.03z"}))),null);t(9879),t(8995);const S="cart",B="checkout",C={cart:{type:S,title:(0,k.__)("Cart Shortcode","woo-gutenberg-products-block"),description:(0,k.__)("Renders the classic cart shortcode.","woo-gutenberg-products-block"),placeholder:"cart"},checkout:{type:B,title:(0,k.__)("Checkout Shortcode","woo-gutenberg-products-block"),description:(0,k.__)("Renders the classic checkout shortcode.","woo-gutenberg-products-block"),placeholder:"checkout"}},O=()=>!0,T=e=>[(0,n.createBlock)("woocommerce/checkout",{...e,className:"wc-block-checkout"})].filter(Boolean),P=()=>(0,k.__)("Checkout Shortcode","woo-gutenberg-products-block"),x=()=>(0,k.__)("This block will render the classic checkout shortcode. You can optionally transform it into blocks for more control over the checkout experience.","woo-gutenberg-products-block"),j={getButtonLabel:()=>(0,k.__)("Transform into blocks","woo-gutenberg-products-block"),onClickCallback:({clientId:e,attributes:o,getBlocks:t,replaceBlock:c,selectBlock:r})=>{c(e,T(o));const l=t().find((e=>"core/group"===e.name&&e.innerBlocks.some((e=>"woocommerce/store-notices"===e.name))));l&&r(l.clientId)},getBlockifiedTemplate:T},A=()=>!0,R=e=>[(0,n.createBlock)("woocommerce/cart",{...e,className:"wc-block-cart"})].filter(Boolean),I=()=>(0,k.__)("Cart Shortcode","woo-gutenberg-products-block"),N=()=>(0,k.__)("This block will render the classic cart shortcode. You can optionally transform it into blocks for more control over the cart experience.","woo-gutenberg-products-block"),G={getButtonLabel:()=>(0,k.__)("Transform into blocks","woo-gutenberg-products-block"),onClickCallback:({clientId:e,attributes:o,getBlocks:t,replaceBlock:c,selectBlock:r})=>{c(e,R(o));const l=t().find((e=>"core/group"===e.name&&e.innerBlocks.some((e=>"woocommerce/store-notices"===e.name))));l&&r(l.clientId)},getBlockifiedTemplate:R},M={[S]:r,[B]:c,fallback:{isConversionPossible:()=>!1,getBlockifiedTemplate:()=>[],getDescription:()=>"",onClickCallback:()=>{}}},z=({blockifyConfig:e,clientId:o,attributes:t})=>{const{getButtonLabel:c,onClickCallback:r,getBlockifiedTemplate:s}=e,[a,i]=(0,l.useState)(!1),{replaceBlock:p,selectBlock:d,replaceBlocks:u}=(0,w.useDispatch)(m.store),{getBlocks:g}=(0,w.useSelect)((e=>({getBlocks:e(m.store).getBlocks})),[]),{createInfoNotice:h}=(0,w.useDispatch)(f.store);return(0,l.createElement)("div",{className:"wp-block-woocommerce-classic-shortcode__placeholder-migration-button-container"},(0,l.createElement)(b.Button,{variant:"primary",onClick:()=>{r({clientId:o,getBlocks:g,attributes:t,replaceBlock:p,selectBlock:d}),h((0,k.__)("Template transformed into blocks!","woo-gutenberg-products-block"),{actions:[{label:(0,k.__)("Undo","woo-gutenberg-products-block"),onClick:()=>{const e=g().reduce(((e,o)=>"core/template-part"===o.name?e:[...e,o.clientId]),[]);u(e,(0,n.createBlock)("core/group",{layout:{inherit:!0,type:"constrained"}},[(0,n.createBlock)("woocommerce/classic-shortcode",{shortcode:t.shortcode})]))}}],type:"snackbar"})},onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),text:c?c():""},a&&(0,l.createElement)(b.Popover,{resize:!1,placement:"right-end"},(0,l.createElement)("div",{style:{minWidth:"250px",width:"250px",maxWidth:"250px",minHeight:"300px",height:"300px",maxHeight:"300px",cursor:"pointer"}},(0,l.createElement)(m.BlockPreview,{blocks:s(t),viewportWidth:1200,additionalStyles:[{css:"body { padding: 20px !important; height: fit-content !important; overflow:hidden}"}]})))),(0,l.createElement)(b.Button,{variant:"secondary",href:"https://woocommerce.com/document/cart-checkout-blocks-support-status/",target:"_blank"},(0,k.__)("Learn more","woo-gutenberg-products-block")))},L=({clientId:e,attributes:o})=>{var t,c;const r=(0,m.useBlockProps)(),n=function(e,o){const t=Object.keys(o);let c=null;for(let r=0;t.length>r;r++){const l=o[e.substr(0,t[r].length)];if(l){c=l;break}}return c}(o.shortcode,C),s=o.shortcode,a=null!==(t=null==n?void 0:n.placeholder)&&void 0!==t?t:"fallback",i=null!==(c=null==n?void 0:n.type)&&void 0!==c?c:"fallback",{isConversionPossible:d,getDescription:u,getTitle:h,blockifyConfig:w}=M[i],f=d(),_=h?h():(0,k.__)("Classic Shortcode Placeholder","woo-gutenberg-products-block"),v=u(s,f),E=(0,l.createInterpolateElement)((0,k.__)("You can learn more about the benefits of switching to blocks, compatibility with extensions, and how to switch back to shortcodes <a>in our documentation</a>.","woo-gutenberg-products-block"),{a:(0,l.createElement)(b.ExternalLink,{href:"https://woocommerce.com/document/cart-checkout-blocks-support-status/"})});return(0,l.createElement)("div",{...r},(0,l.createElement)(b.Placeholder,{className:"wp-block-woocommerce-classic-shortcode__placeholder"},(0,l.createElement)("div",{className:"wp-block-woocommerce-classic-shortcode__placeholder-wireframe"},(0,l.createElement)("img",{className:"wp-block-woocommerce-classic-shortcode__placeholder-image",src:`${p}template-placeholders/${a}.svg`,alt:s})),(0,l.createElement)("div",{className:"wp-block-woocommerce-classic-shortcode__placeholder-copy"},(0,l.createElement)("div",{className:"wp-block-woocommerce-classic-shortcode__placeholder-copy__icon-container"},(0,l.createElement)("span",{className:"woo-icon"},(0,l.createElement)(g.Z,{icon:y})," ",(0,k.__)("WooCommerce","woo-gutenberg-products-block")),(0,l.createElement)("span",null,_)),(0,l.createElement)("p",{dangerouslySetInnerHTML:{__html:v}}),(0,l.createElement)("p",null,E),f&&w&&(0,l.createElement)(z,{clientId:e,blockifyConfig:w,attributes:o}))))};(0,n.registerBlockType)("woocommerce/classic-shortcode",{title:(0,k.__)("Classic Shortcode","woo-gutenberg-products-block"),icon:(0,l.createElement)(g.Z,{icon:h.Z,className:"wc-block-editor-components-block-icon"}),category:"woocommerce",apiVersion:2,keywords:[(0,k.__)("WooCommerce","woo-gutenberg-products-block")],description:(0,k.__)("Renders classic WooCommerce shortcodes.","woo-gutenberg-products-block"),supports:{align:!0,html:!1,multiple:!1,reusable:!1,inserter:!1},attributes:{shortcode:{type:"string",default:"any"},align:{type:"string",default:"wide"}},edit:({attributes:e,clientId:o,setAttributes:t})=>(0,l.createElement)(L,{attributes:e,setAttributes:t,clientId:o}),save:()=>null})},9879:()=>{},8995:()=>{},9307:e=>{"use strict";e.exports=window.wp.element},5736:e=>{"use strict";e.exports=window.wp.i18n},444:e=>{"use strict";e.exports=window.wp.primitives}},t={};function c(e){var r=t[e];if(void 0!==r)return r.exports;var l=t[e]={exports:{}};return o[e].call(l.exports,l,l.exports,c),l.exports}c.m=o,e=[],c.O=(o,t,r,l)=>{if(!t){var n=1/0;for(p=0;p<e.length;p++){for(var[t,r,l]=e[p],s=!0,a=0;a<t.length;a++)(!1&l||n>=l)&&Object.keys(c.O).every((e=>c.O[e](t[a])))?t.splice(a--,1):(s=!1,l<n&&(n=l));if(s){e.splice(p--,1);var i=r();void 0!==i&&(o=i)}}return o}l=l||0;for(var p=e.length;p>0&&e[p-1][2]>l;p--)e[p]=e[p-1];e[p]=[t,r,l]},c.n=e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return c.d(o,{a:o}),o},c.d=(e,o)=>{for(var t in o)c.o(o,t)&&!c.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},c.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),c.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.j=9569,(()=>{var e={9569:0};c.O.j=o=>0===e[o];var o=(o,t)=>{var r,l,[n,s,a]=t,i=0;if(n.some((o=>0!==e[o]))){for(r in s)c.o(s,r)&&(c.m[r]=s[r]);if(a)var p=a(c)}for(o&&o(t);i<n.length;i++)l=n[i],c.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return c.O(p)},t=self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))})();var r=c.O(void 0,[2869],(()=>c(5982)));r=c.O(r),((this.wc=this.wc||{}).blocks=this.wc.blocks||{})["classic-shortcode"]=r})();