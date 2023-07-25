this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["mini-cart"]=function(e){function t(t){for(var r,l,i=t[0],a=t[1],u=t[2],p=0,d=[];p<i.length;p++)l=i[p],Object.prototype.hasOwnProperty.call(n,l)&&n[l]&&d.push(n[l][0]),n[l]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]);for(s&&s(t);d.length;)d.shift()();return c.push.apply(c,u||[]),o()}function o(){for(var e,t=0;t<c.length;t++){for(var o=c[t],r=!0,i=1;i<o.length;i++){var a=o[i];0!==n[a]&&(r=!1)}r&&(c.splice(t--,1),e=l(l.s=o[0]))}return e}var r={},n={18:0},c=[];function l(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,l),o.l=!0,o.exports}l.m=e,l.c=r,l.d=function(e,t,o){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(l.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(o,r,function(t){return e[t]}.bind(null,r));return o},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var i=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],a=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var s=a;return c.push([501,0]),o()}({0:function(e,t){e.exports=window.wp.element},1:function(e,t){e.exports=window.wp.i18n},10:function(e,t){e.exports=window.wp.primitives},159:function(e,t,o){"use strict";o.d(t,"a",(function(){return n}));var r=o(21);const n=e=>{if(Object(r.b)(e)){const t=e.getEditedPostType();return"wp_template"===t||"wp_template_part"===t}return!1}},18:function(e,t,o){"use strict";o.d(t,"p",(function(){return c})),o.d(t,"n",(function(){return l})),o.d(t,"m",(function(){return i})),o.d(t,"o",(function(){return a})),o.d(t,"k",(function(){return u})),o.d(t,"e",(function(){return s})),o.d(t,"h",(function(){return p})),o.d(t,"l",(function(){return d})),o.d(t,"c",(function(){return b})),o.d(t,"d",(function(){return m})),o.d(t,"g",(function(){return g})),o.d(t,"a",(function(){return w})),o.d(t,"b",(function(){return O})),o.d(t,"i",(function(){return h})),o.d(t,"j",(function(){return j})),o.d(t,"f",(function(){return _}));var r,n=o(3);const c=Object(n.getSetting)("wcBlocksConfig",{buildPhase:1,pluginUrl:"",productCount:0,defaultAvatar:"",restApiRoutes:{},wordCountType:"words"}),l=c.pluginUrl+"images/",i=c.pluginUrl+"build/",a=c.buildPhase,u=null===(r=n.STORE_PAGES.shop)||void 0===r?void 0:r.permalink,s=n.STORE_PAGES.checkout.id,p=(n.STORE_PAGES.checkout.permalink,n.STORE_PAGES.privacy.permalink),d=(n.STORE_PAGES.privacy.title,n.STORE_PAGES.terms.permalink),b=(n.STORE_PAGES.terms.title,n.STORE_PAGES.cart.id),m=n.STORE_PAGES.cart.permalink,g=(n.STORE_PAGES.myaccount.permalink?n.STORE_PAGES.myaccount.permalink:Object(n.getSetting)("wpLoginUrl","/wp-login.php"),Object(n.getSetting)("localPickupEnabled",!1)),C=Object(n.getSetting)("countries",{}),f=Object(n.getSetting)("countryData",{}),w=Object.fromEntries(Object.keys(f).filter(e=>!0===f[e].allowBilling).map(e=>[e,C[e]||""])),O=Object.fromEntries(Object.keys(f).filter(e=>!0===f[e].allowBilling).map(e=>[e,f[e].states||[]])),h=Object.fromEntries(Object.keys(f).filter(e=>!0===f[e].allowShipping).map(e=>[e,C[e]||""])),j=Object.fromEntries(Object.keys(f).filter(e=>!0===f[e].allowShipping).map(e=>[e,f[e].states||[]])),_=Object.fromEntries(Object.keys(f).map(e=>[e,f[e].locale||[]]))},2:function(e,t){e.exports=window.wp.components},202:function(e){e.exports=JSON.parse('{"name":"woocommerce/mini-cart","version":"1.0.0","title":"Mini-Cart","icon":"miniCartAlt","description":"Display a button for shoppers to quickly view their cart.","category":"woocommerce","keywords":["WooCommerce"],"textdomain":"woo-gutenberg-products-block","providesContext":{"priceColorValue":"priceColorValue","iconColorValue":"iconColorValue","productCountColorValue":"productCountColorValue"},"supports":{"html":false,"multiple":false,"typography":{"fontSize":true}},"example":{"attributes":{"isPreview":true,"className":"wc-block-mini-cart--preview"}},"attributes":{"isPreview":{"type":"boolean","default":false},"miniCartIcon":{"type":"string","default":"cart"},"addToCartBehaviour":{"type":"string","default":"none"},"hasHiddenPrice":{"type":"boolean","default":false},"cartAndCheckoutRenderStyle":{"type":"string","default":"hidden"},"priceColor":{"type":"string"},"priceColorValue":{"type":"string"},"iconColor":{"type":"string"},"iconColorValue":{"type":"string"},"productCountColor":{"type":"string"},"productCountColorValue":{"type":"string"}},"apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}')},21:function(e,t,o){"use strict";o.d(t,"b",(function(){return n})),o.d(t,"c",(function(){return c})),o.d(t,"a",(function(){return l}));var r=o(40);const n=e=>!Object(r.a)(e)&&e instanceof Object&&e.constructor===Object;function c(e,t){return n(e)&&t in e}const l=e=>0===Object.keys(e).length},23:function(e,t){e.exports=window.wc.priceFormat},27:function(e,t){e.exports=window.React},3:function(e,t){e.exports=window.wc.wcSettings},40:function(e,t,o){"use strict";o.d(t,"a",(function(){return r}));const r=e=>null===e},43:function(e,t){e.exports=window.wp.hooks},5:function(e,t){e.exports=window.wp.blockEditor},501:function(e,t,o){e.exports=o(564)},502:function(e,t){},503:function(e,t){},504:function(e,t){},564:function(e,t,o){"use strict";o.r(t);var r=o(0),n=o(10),c=Object(r.createElement)(n.SVG,{viewBox:"0 0 24 24",version:"1.1",id:"svg713",xmlns:"http://www.w3.org/2000/svg"},Object(r.createElement)("defs",{id:"defs705"}),Object(r.createElement)("path",{id:"path882",d:"m 19.199219,1.4501954 a 3.8,3.8 0 0 0 -3.72461,3.0996093 H 5.1992188 l -0.8984376,-2 H 1 v 2 h 2 l 3.5996094,7.5996093 -1.2988282,2.400391 a 2,2 0 0 0 1.6992188,3 h 12 v -2 H 7 l 1.0996094,-2 h 7.4999996 a 1.9,1.9 0 0 0 1.701172,-1 L 19.240234,9.0458985 A 3.8,3.8 0 0 0 23,5.2490235 3.8,3.8 0 0 0 19.199219,1.4501954 Z M 6.1757812,6.5087891 h 9.4433598 c 0.02007,0.055814 0.0433,0.1034655 0.06445,0.15625 a 3.8,3.8 0 0 0 0.08398,0.2050781 c 0.07333,0.1598062 0.153258,0.3011377 0.236328,0.4335937 0.194879,0.3107365 0.413084,0.5552137 0.646485,0.7578126 a 3.8,3.8 0 0 0 0.324218,0.2558593 3.8,3.8 0 0 0 0.228516,0.1601563 l -1.71093,3.0722659 H 8.5175781 Z M 7,18.549805 a 2,2 0 1 0 2,2 2,2 0 0 0 -2,-2 z m 10,0 a 2,2 0 0 0 -2,2 2,2 0 0 0 2,2 2,2 0 0 0 0.617188,-3.902344 A 2,2 0 0 0 17,18.549805 Z"})),l=o(70),i=o(8),a=o(84),u=o(43),s=o(202),p=o(7),d=o.n(p),b=o(5),m=o(23),g=o(2),C=o(3),f=o(1),w=o(58),O=o(159),h=o(6),j=o(4),_=o.n(j),v=Object(r.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"none"},Object(r.createElement)("circle",{cx:"12.6667",cy:"24.6667",r:"2",fill:"currentColor"}),Object(r.createElement)("circle",{cx:"23.3333",cy:"24.6667",r:"2",fill:"currentColor"}),Object(r.createElement)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M9.28491 10.0356C9.47481 9.80216 9.75971 9.66667 10.0606 9.66667H25.3333C25.6232 9.66667 25.8989 9.79247 26.0888 10.0115C26.2787 10.2305 26.3643 10.5211 26.3233 10.8081L24.99 20.1414C24.9196 20.6341 24.4977 21 24 21H12C11.5261 21 11.1173 20.6674 11.0209 20.2034L9.08153 10.8701C9.02031 10.5755 9.09501 10.269 9.28491 10.0356ZM11.2898 11.6667L12.8136 19H23.1327L24.1803 11.6667H11.2898Z",fill:"currentColor"}),Object(r.createElement)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.66669 6.66667C5.66669 6.11438 6.1144 5.66667 6.66669 5.66667H9.33335C9.81664 5.66667 10.2308 6.01229 10.3172 6.48778L11.0445 10.4878C11.1433 11.0312 10.7829 11.5517 10.2395 11.6505C9.69614 11.7493 9.17555 11.3889 9.07676 10.8456L8.49878 7.66667H6.66669C6.1144 7.66667 5.66669 7.21895 5.66669 6.66667Z",fill:"currentColor"})),E=Object(r.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"none"},Object(r.createElement)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12.4444 14.2222C12.9354 14.2222 13.3333 14.6202 13.3333 15.1111C13.3333 15.8183 13.6143 16.4966 14.1144 16.9967C14.6145 17.4968 15.2927 17.7778 16 17.7778C16.7072 17.7778 17.3855 17.4968 17.8856 16.9967C18.3857 16.4966 18.6667 15.8183 18.6667 15.1111C18.6667 14.6202 19.0646 14.2222 19.5555 14.2222C20.0465 14.2222 20.4444 14.6202 20.4444 15.1111C20.4444 16.2898 19.9762 17.4203 19.1427 18.2538C18.3092 19.0873 17.1787 19.5555 16 19.5555C14.8212 19.5555 13.6908 19.0873 12.8573 18.2538C12.0238 17.4203 11.5555 16.2898 11.5555 15.1111C11.5555 14.6202 11.9535 14.2222 12.4444 14.2222Z",fill:"currentColor"}),Object(r.createElement)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11.2408 6.68254C11.4307 6.46089 11.7081 6.33333 12 6.33333H20C20.2919 6.33333 20.5693 6.46089 20.7593 6.68254L24.7593 11.3492C25.0134 11.6457 25.0717 12.0631 24.9085 12.4179C24.7453 12.7727 24.3905 13 24 13H8.00001C7.60948 13 7.25469 12.7727 7.0915 12.4179C6.92832 12.0631 6.9866 11.6457 7.24076 11.3492L11.2408 6.68254ZM12.4599 8.33333L10.1742 11H21.8258L19.5401 8.33333H12.4599Z",fill:"currentColor"}),Object(r.createElement)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7 12C7 11.4477 7.44772 11 8 11H24C24.5523 11 25 11.4477 25 12V25.3333C25 25.8856 24.5523 26.3333 24 26.3333H8C7.44772 26.3333 7 25.8856 7 25.3333V12ZM9 13V24.3333H23V13H9Z",fill:"currentColor"})),k=Object(r.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"none"},Object(r.createElement)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M19.5556 12.3333C19.0646 12.3333 18.6667 11.9354 18.6667 11.4444C18.6667 10.7372 18.3857 8.05893 17.8856 7.55883C17.3855 7.05873 16.7073 6.77778 16 6.77778C15.2928 6.77778 14.6145 7.05873 14.1144 7.55883C13.6143 8.05893 13.3333 10.7372 13.3333 11.4444C13.3333 11.9354 12.9354 12.3333 12.4445 12.3333C11.9535 12.3333 11.5556 11.9354 11.5556 11.4444C11.5556 10.2657 12.0238 7.13524 12.8573 6.30175C13.6908 5.46825 14.8213 5 16 5C17.1788 5 18.3092 5.46825 19.1427 6.30175C19.9762 7.13524 20.4445 10.2657 20.4445 11.4444C20.4445 11.9354 20.0465 12.3333 19.5556 12.3333Z",fill:"currentColor"}),Object(r.createElement)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.5 12C7.5 11.4477 7.94772 11 8.5 11H23.5C24.0523 11 24.5 11.4477 24.5 12V25.3333C24.5 25.8856 24.0523 26.3333 23.5 26.3333H8.5C7.94772 26.3333 7.5 25.8856 7.5 25.3333V12ZM9.5 13V24.3333H22.5V13H9.5Z",fill:"currentColor"})),y=o(18);o(504);var S=e=>{let{count:t,icon:o,iconColor:n,productCountColor:c}=e;return Object(r.createElement)("span",{className:"wc-block-mini-cart__quantity-badge"},Object(r.createElement)(l.a,{className:"wc-block-mini-cart__icon",color:n,size:20,icon:function(e){switch(e){case"cart":return v;case"bag":return E;case"bag-alt":return k;default:return v}}(o)}),Object(r.createElement)("span",{className:"wc-block-mini-cart__badge",style:{background:c}},t>0?t:""))};o(503);var x=Object(b.withColors)({priceColor:"price-color",iconColor:"icon-color",productCountColor:"product-count-color"})(e=>{let{attributes:t,setAttributes:o,clientId:n,setPriceColor:c,setIconColor:i,setProductCountColor:a}=e;const{cartAndCheckoutRenderStyle:u,addToCartBehaviour:s,hasHiddenPrice:p,priceColorValue:j,iconColorValue:x,productCountColorValue:T,miniCartIcon:P}=t,R=_()({"wc-block-mini-cart":!0,"has-price-color":j,"has-icon-color":x,"has-product-count-color":T}),A=Object(b.useBlockProps)({className:R}),V=Object(O.a)(Object(h.select)("core/edit-site")),G=Object(C.getSetting)("templatePartEditUri",""),H=Object(b.__experimentalUseMultipleOriginColorsAndGradients)(),M=[{value:j,onChange:e=>{c(e),o({priceColorValue:e})},label:Object(f.__)("Price","woo-gutenberg-products-block"),resetAllFilter:()=>{c(void 0),o({priceColorValue:void 0})}},{value:x,onChange:e=>{i(e),o({iconColorValue:e})},label:Object(f.__)("Icon","woo-gutenberg-products-block"),resetAllFilter:()=>{i(void 0),o({iconColorValue:void 0})}},{value:T,onChange:e=>{a(e),o({productCountColorValue:e})},label:Object(f.__)("Product count","woo-gutenberg-products-block"),resetAllFilter:()=>{a(void 0),o({productCountColorValue:void 0})}}];return Object(r.createElement)("div",A,Object(r.createElement)(b.InspectorControls,null,Object(r.createElement)(g.PanelBody,{title:Object(f.__)("Settings","woo-gutenberg-products-block")},Object(r.createElement)(g.__experimentalToggleGroupControl,{className:"wc-block-editor-mini-cart__cart-icon-toggle",isBlock:!0,label:Object(f.__)("Cart Icon","woo-gutenberg-products-block"),value:P,onChange:e=>{o({miniCartIcon:e})}},Object(r.createElement)(g.__experimentalToggleGroupControlOption,{value:"cart",label:Object(r.createElement)(l.a,{size:32,icon:v})}),Object(r.createElement)(g.__experimentalToggleGroupControlOption,{value:"bag",label:Object(r.createElement)(l.a,{size:32,icon:E})}),Object(r.createElement)(g.__experimentalToggleGroupControlOption,{value:"bag-alt",label:Object(r.createElement)(l.a,{size:32,icon:k})})),Object(r.createElement)(g.BaseControl,{id:"wc-block-mini-cart__display-toggle",label:Object(f.__)("Display","woo-gutenberg-products-block")},Object(r.createElement)(g.ToggleControl,{label:Object(f.__)("Display total price","woo-gutenberg-products-block"),help:Object(f.__)("Toggle to display the total price of products in the shopping cart. If no products have been added, the price will not display.","woo-gutenberg-products-block"),checked:!p,onChange:()=>o({hasHiddenPrice:!p})})),V&&Object(r.createElement)(g.__experimentalToggleGroupControl,{className:"wc-block-editor-mini-cart__render-in-cart-and-checkout-toggle",label:Object(f.__)("Mini-Cart in cart and checkout pages","woo-gutenberg-products-block"),value:u,onChange:e=>{o({cartAndCheckoutRenderStyle:e})},help:Object(f.__)("Select how the Mini-Cart behaves in the Cart and Checkout pages. This might affect the header layout.","woo-gutenberg-products-block")},Object(r.createElement)(g.__experimentalToggleGroupControlOption,{value:"hidden",label:Object(f.__)("Hide","woo-gutenberg-products-block")}),Object(r.createElement)(g.__experimentalToggleGroupControlOption,{value:"removed",label:Object(f.__)("Remove","woo-gutenberg-products-block")}))),Object(r.createElement)(g.PanelBody,{title:Object(f.__)("Cart Drawer","woo-gutenberg-products-block")},G&&Object(r.createElement)(r.Fragment,null,Object(r.createElement)("img",{className:"wc-block-editor-mini-cart__drawer-image",src:Object(f.isRTL)()?y.n+"blocks/mini-cart/cart-drawer-rtl.svg":y.n+"blocks/mini-cart/cart-drawer.svg",alt:""}),Object(r.createElement)("p",null,Object(f.__)("When opened, the Mini-Cart drawer gives shoppers quick access to view their selected products and checkout.","woo-gutenberg-products-block")),Object(r.createElement)("p",{className:"wc-block-editor-mini-cart__drawer-link"},Object(r.createElement)(g.ExternalLink,{href:G},Object(f.__)("Edit Mini-Cart Drawer template","woo-gutenberg-products-block")))),Object(r.createElement)(g.BaseControl,{id:"wc-block-mini-cart__add-to-cart-behaviour-toggle",label:Object(f.__)("Behavior","woo-gutenberg-products-block")},Object(r.createElement)(g.ToggleControl,{label:Object(f.__)("Open drawer when adding","woo-gutenberg-products-block"),onChange:e=>{o({addToCartBehaviour:e?"open_drawer":"none"})},help:Object(f.__)("Toggle to open the Mini-Cart drawer when a shopper adds a product to their cart.","woo-gutenberg-products-block"),checked:"open_drawer"===s})))),H.hasColorsOrGradients&&Object(r.createElement)(b.InspectorControls,{group:"color"},M.map(e=>{let{onChange:t,label:o,value:c,resetAllFilter:l}=e;return Object(r.createElement)(b.__experimentalColorGradientSettingsDropdown,d()({key:"mini-cart-color-"+o,__experimentalIsRenderedInSidebar:!0,settings:[{colorValue:c,label:o,onColorChange:t,isShownByDefault:!0,resetAllFilter:l,enableAlpha:!0}],panelId:n},H))})),Object(r.createElement)(w.a,null,Object(r.createElement)("button",{className:"wc-block-mini-cart__button"},!p&&Object(r.createElement)("span",{className:"wc-block-mini-cart__amount",style:{color:j}},Object(m.formatPrice)(0)),Object(r.createElement)(S,{count:0,iconColor:x,productCountColor:T,icon:P}))))});o(502);const T={...s.supports,...Object(a.b)()&&{typography:{...s.supports.typography,__experimentalFontFamily:!0,__experimentalFontWeight:!0}}};Object(i.registerBlockType)(s,{icon:{src:Object(r.createElement)(l.a,{icon:c,className:"wc-block-editor-components-block-icon wc-block-editor-mini-cart__icon"})},providesContext:{...s.providesContext},supports:{...T},example:{...s.example},attributes:{...s.attributes},edit:x,save:()=>null}),Object(u.addFilter)("blocks.registerBlockType","woocommerce/mini-cart",(function(e,t){return"core/template-part"===t?{...e,variations:e.variations.map(e=>"instance_mini-cart"===e.name?{...e,scope:[]}:e)}:e}))},58:function(e,t,o){"use strict";var r=o(7),n=o.n(r),c=o(0),l=o(79),i=o(118);const a=["BUTTON","FIELDSET","INPUT","OPTGROUP","OPTION","SELECT","TEXTAREA","A"];t.a=e=>{let{children:t,style:o={},...r}=e;const u=Object(c.useRef)(null),s=()=>{u.current&&l.focus.focusable.find(u.current).forEach(e=>{a.includes(e.nodeName)&&e.setAttribute("tabindex","-1"),e.hasAttribute("contenteditable")&&e.setAttribute("contenteditable","false")})},p=Object(i.a)(s,0,{leading:!0});return Object(c.useLayoutEffect)(()=>{let e;return s(),u.current&&(e=new window.MutationObserver(p),e.observe(u.current,{childList:!0,attributes:!0,subtree:!0})),()=>{e&&e.disconnect(),p.cancel()}},[p]),Object(c.createElement)("div",n()({ref:u,"aria-disabled":"true",style:{userSelect:"none",pointerEvents:"none",cursor:"normal",...o}},r),t)}},6:function(e,t){e.exports=window.wp.data},79:function(e,t){e.exports=window.wp.dom},8:function(e,t){e.exports=window.wp.blocks},84:function(e,t,o){"use strict";o.d(t,"c",(function(){return c})),o.d(t,"a",(function(){return l})),o.d(t,"b",(function(){return i}));var r=o(8),n=o(18);const c=(e,t)=>{if(n.o>2)return Object(r.registerBlockType)(e,t)},l=()=>n.o>2,i=()=>n.o>1}});