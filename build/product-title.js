(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[41],{113:function(e,t,r){"use strict";var n=r(6),c=r.n(n),o=r(0),s=r(14),i=r(4),a=r.n(i);r(177),t.a=e=>{let{className:t="",disabled:r=!1,name:n,permalink:i="",target:l,rel:d,style:u,onClick:p,...b}=e;const _=a()("wc-block-components-product-name",t);if(r){const e=b;return Object(o.createElement)("span",c()({className:_},e,{dangerouslySetInnerHTML:{__html:Object(s.decodeEntities)(n)}}))}return Object(o.createElement)("a",c()({className:_,href:i,target:l},b,{dangerouslySetInnerHTML:{__html:Object(s.decodeEntities)(n)},style:u}))}},177:function(e,t){},210:function(e,t,r){"use strict";r.d(t,"a",(function(){return b}));var n=r(0),c=r(4),o=r.n(c),s=r(26),i=r(81),a=r(53),l=r(113),d=r(90),u=r(87);r(267);const p=e=>{let{children:t,headingLevel:r,elementType:c="h"+r,...o}=e;return Object(n.createElement)(c,o,t)},b=e=>{const{className:t,headingLevel:r=2,showProductLink:c=!0,linkTarget:a,align:b}=e,_=Object(u.a)(e),{parentClassName:m}=Object(s.useInnerBlockLayoutContext)(),{product:g}=Object(s.useProductDataContext)(),{dispatchStoreEvent:v}=Object(d.a)();return g.id?Object(n.createElement)(p,{headingLevel:r,className:o()(t,_.className,"wc-block-components-product-title",{[m+"__product-title"]:m,["wc-block-components-product-title--align-"+b]:b&&Object(i.b)()}),style:Object(i.b)()?_.style:{}},Object(n.createElement)(l.a,{disabled:!c,name:g.name,permalink:g.permalink,target:a,onClick:()=>{v("product-view-link",{product:g})}})):Object(n.createElement)(p,{headingLevel:r,className:o()(t,_.className,"wc-block-components-product-title",{[m+"__product-title"]:m,["wc-block-components-product-title--align-"+b]:b&&Object(i.b)()}),style:Object(i.b)()?_.style:{}})};t.b=Object(a.withProductDataContext)(b)},264:function(e,t,r){"use strict";r.d(t,"b",(function(){return o})),r.d(t,"a",(function(){return s}));const n=window.CustomEvent||null,c=(e,t)=>{let{bubbles:r=!1,cancelable:c=!1,element:o,detail:s={}}=t;if(!n)return;o||(o=document.body);const i=new n(e,{bubbles:r,cancelable:c,detail:s});o.dispatchEvent(i)},o=e=>{let{preserveCartData:t=!1}=e;c("wc-blocks_added_to_cart",{bubbles:!0,cancelable:!0,detail:{preserveCartData:t}})},s=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if("function"!=typeof jQuery)return()=>{};const o=()=>{c(t,{bubbles:r,cancelable:n})};return jQuery(document).on(e,o),()=>jQuery(document).off(e,o)}},265:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return i})),r.d(t,"c",(function(){return a}));var n=r(99),c=(r(15),r(3)),o=r(14);const s=e=>{const t=Object.keys(c.defaultAddressFields),r=Object(n.a)(t,{},e.country),o=Object.assign({},e);return r.forEach(t=>{let{key:r="",hidden:n=!1}=t;n&&((e,t)=>e in t)(r,e)&&(o[r]="")}),o},i=e=>{if(0===Object.values(e).length)return null;const t=Object(c.getSetting)("shippingCountries",{}),r=Object(c.getSetting)("shippingStates",{}),n="string"==typeof t[e.country]?Object(o.decodeEntities)(t[e.country]):"",s="object"==typeof r[e.country]&&"string"==typeof r[e.country][e.state]?Object(o.decodeEntities)(r[e.country][e.state]):e.state,i=[];i.push(e.postcode.toUpperCase()),i.push(e.city),i.push(s),i.push(n);return i.filter(Boolean).join(", ")||null},a=e=>!!e.city&&!!e.country},267:function(e,t){},336:function(e,t,r){"use strict";var n=r(81);let c={headingLevel:{type:"number",default:2},showProductLink:{type:"boolean",default:!0},linkTarget:{type:"string"},productId:{type:"number",default:0}};Object(n.b)()&&(c={...c,align:{type:"string"}}),t.a=c},48:function(e,t,r){"use strict";r.d(t,"a",(function(){return w}));var n=r(122),c=r.n(n),o=r(0),s=r(9),i=r(7),a=r(14),l=r(265),d=r(89);var u=r(264);const p=e=>{const t=null==e?void 0:e.detail;t&&t.preserveCartData||Object(i.dispatch)(s.CART_STORE_KEY).invalidateResolutionForStore()},b=e=>{(null!=e&&e.persisted||"back_forward"===(window.performance&&window.performance.getEntriesByType("navigation").length?window.performance.getEntriesByType("navigation")[0].type:""))&&Object(i.dispatch)(s.CART_STORE_KEY).invalidateResolutionForStore()},_=()=>{1===window.wcBlocksStoreCartListeners.count&&window.wcBlocksStoreCartListeners.remove(),window.wcBlocksStoreCartListeners.count--},m=()=>{Object(o.useEffect)(()=>((()=>{if(window.wcBlocksStoreCartListeners||(window.wcBlocksStoreCartListeners={count:0,remove:()=>{}}),(null===(e=window.wcBlocksStoreCartListeners)||void 0===e?void 0:e.count)>0)return void window.wcBlocksStoreCartListeners.count++;var e;document.body.addEventListener("wc-blocks_added_to_cart",p),document.body.addEventListener("wc-blocks_removed_from_cart",p),window.addEventListener("pageshow",b);const t=Object(u.a)("added_to_cart","wc-blocks_added_to_cart"),r=Object(u.a)("removed_from_cart","wc-blocks_removed_from_cart");window.wcBlocksStoreCartListeners.count=1,window.wcBlocksStoreCartListeners.remove=()=>{document.body.removeEventListener("wc-blocks_added_to_cart",p),document.body.removeEventListener("wc-blocks_removed_from_cart",p),window.removeEventListener("pageshow",b),t(),r()}})(),_),[])},g={first_name:"",last_name:"",company:"",address_1:"",address_2:"",city:"",state:"",postcode:"",country:"",phone:""},v={...g,email:""},h={total_items:"",total_items_tax:"",total_fees:"",total_fees_tax:"",total_discount:"",total_discount_tax:"",total_shipping:"",total_shipping_tax:"",total_price:"",total_tax:"",tax_lines:s.EMPTY_TAX_LINES,currency_code:"",currency_symbol:"",currency_minor_unit:2,currency_decimal_separator:"",currency_thousand_separator:"",currency_prefix:"",currency_suffix:""},E=e=>Object.fromEntries(Object.entries(e).map(e=>{let[t,r]=e;return[t,Object(a.decodeEntities)(r)]})),f={cartCoupons:s.EMPTY_CART_COUPONS,cartItems:s.EMPTY_CART_ITEMS,cartFees:s.EMPTY_CART_FEES,cartItemsCount:0,cartItemsWeight:0,crossSellsProducts:s.EMPTY_CART_CROSS_SELLS,cartNeedsPayment:!0,cartNeedsShipping:!0,cartItemErrors:s.EMPTY_CART_ITEM_ERRORS,cartTotals:h,cartIsLoading:!0,cartErrors:s.EMPTY_CART_ERRORS,billingAddress:v,shippingAddress:g,shippingRates:s.EMPTY_SHIPPING_RATES,isLoadingRates:!1,cartHasCalculatedShipping:!1,paymentMethods:s.EMPTY_PAYMENT_METHODS,paymentRequirements:s.EMPTY_PAYMENT_REQUIREMENTS,receiveCart:()=>{},receiveCartContents:()=>{},extensions:s.EMPTY_EXTENSIONS},w=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{shouldSelect:!0};const{isEditor:t,previewData:r}=Object(d.b)(),n=null==r?void 0:r.previewCart,{shouldSelect:a}=e,u=Object(o.useRef)();m();const p=Object(i.useSelect)((e,r)=>{let{dispatch:c}=r;if(!a)return f;if(t)return{cartCoupons:n.coupons,cartItems:n.items,crossSellsProducts:n.cross_sells,cartFees:n.fees,cartItemsCount:n.items_count,cartItemsWeight:n.items_weight,cartNeedsPayment:n.needs_payment,cartNeedsShipping:n.needs_shipping,cartItemErrors:s.EMPTY_CART_ITEM_ERRORS,cartTotals:n.totals,cartIsLoading:!1,cartErrors:s.EMPTY_CART_ERRORS,billingData:v,billingAddress:v,shippingAddress:g,extensions:s.EMPTY_EXTENSIONS,shippingRates:n.shipping_rates,isLoadingRates:!1,cartHasCalculatedShipping:n.has_calculated_shipping,paymentRequirements:n.paymentRequirements,receiveCart:"function"==typeof(null==n?void 0:n.receiveCart)?n.receiveCart:()=>{},receiveCartContents:"function"==typeof(null==n?void 0:n.receiveCartContents)?n.receiveCartContents:()=>{}};const o=e(s.CART_STORE_KEY),i=o.getCartData(),d=o.getCartErrors(),u=o.getCartTotals(),p=!o.hasFinishedResolution("getCartData"),b=o.isCustomerDataUpdating(),{receiveCart:_,receiveCartContents:m}=c(s.CART_STORE_KEY),h=E(i.billingAddress),w=i.needsShipping?E(i.shippingAddress):h,C=i.fees.length>0?i.fees.map(e=>E(e)):s.EMPTY_CART_FEES;return{cartCoupons:i.coupons.length>0?i.coupons.map(e=>({...e,label:e.code})):s.EMPTY_CART_COUPONS,cartItems:i.items,crossSellsProducts:i.crossSells,cartFees:C,cartItemsCount:i.itemsCount,cartItemsWeight:i.itemsWeight,cartNeedsPayment:i.needsPayment,cartNeedsShipping:i.needsShipping,cartItemErrors:i.errors,cartTotals:u,cartIsLoading:p,cartErrors:d,billingData:Object(l.a)(h),billingAddress:Object(l.a)(h),shippingAddress:Object(l.a)(w),extensions:i.extensions,shippingRates:i.shippingRates,isLoadingRates:b,cartHasCalculatedShipping:i.hasCalculatedShipping,paymentRequirements:i.paymentRequirements,receiveCart:_,receiveCartContents:m}},[a]);return u.current&&c()(u.current,p)||(u.current=p),u.current}},611:function(e,t,r){"use strict";r.r(t);var n=r(53),c=r(210),o=r(336);t.default=Object(n.withFilteredAttributes)(o.a)(c.b)},81:function(e,t,r){"use strict";r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return i}));var n=r(8),c=r(18);const o=(e,t)=>{if(c.n>2)return Object(n.registerBlockType)(e,t)},s=()=>c.n>2,i=()=>c.n>1},89:function(e,t,r){"use strict";r.d(t,"b",(function(){return s})),r.d(t,"a",(function(){return i}));var n=r(0),c=r(7);const o=Object(n.createContext)({isEditor:!1,currentPostId:0,currentView:"",previewData:{},getPreviewData:()=>({})}),s=()=>Object(n.useContext)(o),i=e=>{let{children:t,currentPostId:r=0,previewData:s={},currentView:i="",isPreview:a=!1}=e;const l=Object(c.useSelect)(e=>r||e("core/editor").getCurrentPostId(),[r]),d=Object(n.useCallback)(e=>s&&e in s?s[e]:{},[s]),u={isEditor:!0,currentPostId:l,currentView:i,previewData:s,getPreviewData:d,isPreview:a};return Object(n.createElement)(o.Provider,{value:u},t)}},90:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(47),c=r(0),o=r(48);const s=()=>{const e=Object(o.a)(),t=Object(c.useRef)(e);return Object(c.useEffect)(()=>{t.current=e},[e]),{dispatchStoreEvent:Object(c.useCallback)((function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};try{Object(n.doAction)("experimental__woocommerce_blocks-"+e,t)}catch(e){console.error(e)}}),[]),dispatchCheckoutEvent:Object(c.useCallback)((function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};try{Object(n.doAction)("experimental__woocommerce_blocks-checkout-"+e,{...r,storeCart:t.current})}catch(e){console.error(e)}}),[])}}},99:function(e,t,r){"use strict";var n=r(3),c=r(1),o=r(137),s=r(107);const i=Object(n.getSetting)("countryLocale",{}),a=e=>{const t={};return void 0!==e.label&&(t.label=e.label),void 0!==e.required&&(t.required=e.required),void 0!==e.hidden&&(t.hidden=e.hidden),void 0===e.label||e.optionalLabel||(t.optionalLabel=Object(c.sprintf)(
/* translators: %s Field label. */
Object(c.__)("%s (optional)","woo-gutenberg-products-block"),e.label)),e.priority&&(Object(o.a)(e.priority)&&(t.index=e.priority),Object(s.a)(e.priority)&&(t.index=parseInt(e.priority,10))),e.hidden&&(t.required=!1),t},l=Object.entries(i).map(e=>{let[t,r]=e;return[t,Object.entries(r).map(e=>{let[t,r]=e;return[t,a(r)]}).reduce((e,t)=>{let[r,n]=t;return e[r]=n,e},{})]}).reduce((e,t)=>{let[r,n]=t;return e[r]=n,e},{});t.a=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";const c=r&&void 0!==l[r]?l[r]:{};return e.map(e=>({key:e,...n.defaultAddressFields[e]||{},...c[e]||{},...t[e]||{}})).sort((e,t)=>e.index-t.index)}}}]);