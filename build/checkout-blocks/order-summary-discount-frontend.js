(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[44],{116:function(e,t,o){"use strict";var c=o(0);o(134),t.a=()=>Object(c.createElement)("span",{className:"wc-block-components-spinner","aria-hidden":"true"})},134:function(e,t){},149:function(e,t,o){"use strict";var c=o(0),n=o(1),s=o(5),a=o.n(s),r=(o(224),o(116));t.a=e=>{let{children:t,className:o,screenReaderLabel:s,showSpinner:l=!1,isLoading:i=!0}=e;return Object(c.createElement)("div",{className:a()(o,{"wc-block-components-loading-mask":i})},i&&l&&Object(c.createElement)(r.a,null),Object(c.createElement)("div",{className:a()({"wc-block-components-loading-mask__children":i}),"aria-hidden":i},t),i&&Object(c.createElement)("span",{className:"screen-reader-text"},s||Object(n.__)("Loading…","woo-gutenberg-products-block")))}},224:function(e,t){},225:function(e,t){},226:function(e,t,o){"use strict";var c=o(0),n=o(12);const s=Object(c.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(n.Path,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"}));t.a=s},236:function(e,t,o){"use strict";var c=o(13),n=o.n(c),s=o(0),a=o(5),r=o.n(a),l=o(1),i=o(82),u=o(226);o(225);var p=e=>{let{text:t,screenReaderText:o="",element:c="li",className:a="",radius:l="small",children:i=null,...u}=e;const p=c,m=r()(a,"wc-block-components-chip","wc-block-components-chip--radius-"+l),b=Boolean(o&&o!==t);return Object(s.createElement)(p,n()({className:m},u),Object(s.createElement)("span",{"aria-hidden":b,className:"wc-block-components-chip__text"},t),b&&Object(s.createElement)("span",{className:"screen-reader-text"},o),i)};t.a=e=>{let{ariaLabel:t="",className:o="",disabled:c=!1,onRemove:a=(()=>{}),removeOnAnyClick:m=!1,text:b,screenReaderText:d="",...g}=e;const O=m?"span":"button";if(!t){const e=d&&"string"==typeof d?d:b;t="string"!=typeof e?
/* translators: Remove chip. */
Object(l.__)("Remove","woo-gutenberg-products-block"):Object(l.sprintf)(
/* translators: %s text of the chip to remove. */
Object(l.__)('Remove "%s"',"woo-gutenberg-products-block"),e)}const j={"aria-label":t,disabled:c,onClick:a,onKeyDown:e=>{"Backspace"!==e.key&&"Delete"!==e.key||a()}},v=m?j:{},C=m?{"aria-hidden":!0}:j;return Object(s.createElement)(p,n()({},g,v,{className:r()(o,"is-removable"),element:m?"button":g.element,screenReaderText:d,text:b}),Object(s.createElement)(O,n()({className:"wc-block-components-chip__remove"},C),Object(s.createElement)(i.a,{className:"wc-block-components-chip__remove-icon",icon:u.a,size:16})))}},311:function(e,t,o){"use strict";o.d(t,"a",(function(){return i}));var c=o(1),n=o(4),s=o(3),a=o(22),r=o(9),l=o(46);const i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";const{cartCoupons:t,cartIsLoading:o}=Object(l.a)(),{createErrorNotice:i}=Object(n.useDispatch)("core/notices"),{createNotice:u}=Object(n.useDispatch)("core/notices"),{setValidationErrors:p}=Object(n.useDispatch)(s.VALIDATION_STORE_KEY),{isApplyingCoupon:m,isRemovingCoupon:b}=Object(n.useSelect)(e=>{const t=e(s.CART_STORE_KEY);return{isApplyingCoupon:t.isApplyingCoupon(),isRemovingCoupon:t.isRemovingCoupon()}},[i,u]),{applyCoupon:d,removeCoupon:g}=Object(n.useDispatch)(s.CART_STORE_KEY),O=t=>d(t).then(()=>(Object(r.applyCheckoutFilter)({filterName:"showApplyCouponNotice",defaultValue:!0,arg:{couponCode:t,context:e}})&&u("info",Object(c.sprintf)(
/* translators: %s coupon code. */
Object(c.__)('Coupon code "%s" has been applied to your cart.',"woo-gutenberg-products-block"),t),{id:"coupon-form",type:"snackbar",context:e}),Promise.resolve(!0))).catch(e=>(p({coupon:{message:Object(a.decodeEntities)(e.message),hidden:!1}}),Promise.resolve(!1))),j=t=>g(t).then(()=>(Object(r.applyCheckoutFilter)({filterName:"showRemoveCouponNotice",defaultValue:!0,arg:{couponCode:t,context:e}})&&u("info",Object(c.sprintf)(
/* translators: %s coupon code. */
Object(c.__)('Coupon code "%s" has been removed from your cart.',"woo-gutenberg-products-block"),t),{id:"coupon-form",type:"snackbar",context:e}),Promise.resolve(!0))).catch(t=>(i(t.message,{id:"coupon-form",context:e}),Promise.resolve(!1)));return{appliedCoupons:t,isLoading:o,applyCoupon:O,removeCoupon:j,isApplyingCoupon:m,isRemovingCoupon:b}}},382:function(e,t){},449:function(e,t,o){"use strict";var c=o(0),n=o(1),s=o(149),a=o(236),r=o(9),l=o(2);o(382);const i={context:"summary"};t.a=e=>{let{cartCoupons:t=[],currency:o,isRemovingCoupon:u,removeCoupon:p,values:m}=e;const{total_discount:b,total_discount_tax:d}=m,g=parseInt(b,10);if(!g&&0===t.length)return null;const O=parseInt(d,10),j=Object(l.getSetting)("displayCartPricesIncludingTax",!1)?g+O:g,v=Object(r.applyCheckoutFilter)({arg:i,filterName:"coupons",defaultValue:t});return Object(c.createElement)(r.TotalsItem,{className:"wc-block-components-totals-discount",currency:o,description:0!==v.length&&Object(c.createElement)(s.a,{screenReaderLabel:Object(n.__)("Removing coupon…","woo-gutenberg-products-block"),isLoading:u,showSpinner:!1},Object(c.createElement)("ul",{className:"wc-block-components-totals-discount__coupon-list"},v.map(e=>Object(c.createElement)(a.a,{key:"coupon-"+e.code,className:"wc-block-components-totals-discount__coupon-list-item",text:e.label,screenReaderText:Object(n.sprintf)(
/* translators: %s Coupon code. */
Object(n.__)("Coupon: %s","woo-gutenberg-products-block"),e.label),disabled:u,onRemove:()=>{p(e.code)},radius:"large",ariaLabel:Object(n.sprintf)(
/* translators: %s is a coupon code. */
Object(n.__)('Remove coupon "%s"',"woo-gutenberg-products-block"),e.label)})))),label:j?Object(n.__)("Discount","woo-gutenberg-products-block"):Object(n.__)("Coupons","woo-gutenberg-products-block"),value:j?-1*j:"-"})}},530:function(e,t,o){"use strict";o.r(t);var c=o(0),n=o(449),s=o(39),a=o(46),r=o(311),l=o(9);const i=()=>{const{extensions:e,receiveCart:t,...o}=Object(a.a)(),n={extensions:e,cart:o,context:"woocommerce/checkout"};return Object(c.createElement)(l.ExperimentalDiscountsMeta.Slot,n)};t.default=e=>{let{className:t=""}=e;const{cartTotals:o,cartCoupons:u}=Object(a.a)(),{removeCoupon:p,isRemovingCoupon:m}=Object(r.a)("wc/checkout"),b=Object(s.getCurrencyFromPriceResponse)(o);return Object(c.createElement)(c.Fragment,null,Object(c.createElement)(l.TotalsWrapper,{className:t},Object(c.createElement)(n.a,{cartCoupons:u,currency:b,isRemovingCoupon:m,removeCoupon:p,values:o})),Object(c.createElement)(i,null))}}}]);