(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[43],{143:function(e,o,t){"use strict";var n=t(0);t(210),o.a=()=>Object(n.createElement)("span",{className:"wc-block-components-spinner","aria-hidden":"true"})},144:function(e,o,t){"use strict";var n=t(0),c=t(1),a=t(5),s=t.n(a),r=(t(212),t(143));o.a=e=>{let{children:o,className:t,screenReaderLabel:a,showSpinner:l=!1,isLoading:i=!0}=e;return Object(n.createElement)("div",{className:s()(t,{"wc-block-components-loading-mask":i})},i&&l&&Object(n.createElement)(r.a,null),Object(n.createElement)("div",{className:s()({"wc-block-components-loading-mask__children":i}),"aria-hidden":i},o),i&&Object(n.createElement)("span",{className:"screen-reader-text"},a||Object(c.__)("Loading…","woo-gutenberg-products-block")))}},210:function(e,o){},212:function(e,o){},272:function(e,o,t){"use strict";var n=t(13),c=t.n(n),a=t(0),s=t(62),r=t(5),l=t.n(r),i=t(143);t(273),o.a=e=>{let{className:o,showSpinner:t=!1,children:n,variant:r="contained",...p}=e;const u=l()("wc-block-components-button","wp-element-button",o,r,{"wc-block-components-button--loading":t});return Object(a.createElement)(s.a,c()({className:u},p),t&&Object(a.createElement)(i.a,null),Object(a.createElement)("span",{className:"wc-block-components-button__text"},n))}},273:function(e,o){},302:function(e,o,t){"use strict";t.d(o,"a",(function(){return i}));var n=t(1),c=t(6),a=t(3),s=t(22),r=t(11),l=t(42);const i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";const{cartCoupons:o,cartIsLoading:t}=Object(l.a)(),{createErrorNotice:i}=Object(c.useDispatch)("core/notices"),{createNotice:p}=Object(c.useDispatch)("core/notices"),{setValidationErrors:u}=Object(c.useDispatch)(a.VALIDATION_STORE_KEY),{isApplyingCoupon:b,isRemovingCoupon:m}=Object(c.useSelect)(e=>{const o=e(a.CART_STORE_KEY);return{isApplyingCoupon:o.isApplyingCoupon(),isRemovingCoupon:o.isRemovingCoupon()}},[i,p]),{applyCoupon:d,removeCoupon:O}=Object(c.useDispatch)(a.CART_STORE_KEY),g=o=>d(o).then(()=>(Object(r.applyCheckoutFilter)({filterName:"showApplyCouponNotice",defaultValue:!0,arg:{couponCode:o,context:e}})&&p("info",Object(n.sprintf)(
/* translators: %s coupon code. */
Object(n.__)('Coupon code "%s" has been applied to your cart.',"woo-gutenberg-products-block"),o),{id:"coupon-form",type:"snackbar",context:e}),Promise.resolve(!0))).catch(e=>(u({coupon:{message:Object(s.decodeEntities)(e.message),hidden:!1}}),Promise.resolve(!1))),j=o=>O(o).then(()=>(Object(r.applyCheckoutFilter)({filterName:"showRemoveCouponNotice",defaultValue:!0,arg:{couponCode:o,context:e}})&&p("info",Object(n.sprintf)(
/* translators: %s coupon code. */
Object(n.__)('Coupon code "%s" has been removed from your cart.',"woo-gutenberg-products-block"),o),{id:"coupon-form",type:"snackbar",context:e}),Promise.resolve(!0))).catch(o=>(i(o.message,{id:"coupon-form",context:e}),Promise.resolve(!1)));return{appliedCoupons:o,isLoading:t,applyCoupon:g,removeCoupon:j,isApplyingCoupon:b,isRemovingCoupon:m}}},376:function(e,o){},439:function(e,o,t){"use strict";var n=t(0),c=t(1),a=t(272),s=t(144),r=t(10),l=t(11),i=t(6),p=t(3),u=t(5),b=t.n(u);t(376),o.a=Object(r.withInstanceId)(e=>{let{instanceId:o,isLoading:t=!1,onSubmit:r,displayCouponForm:u=!1}=e;const[m,d]=Object(n.useState)(""),[O,g]=Object(n.useState)(!u),j="wc-block-components-totals-coupon__input-"+o,_=b()("wc-block-components-totals-coupon__content",{"screen-reader-text":O}),{validationErrorId:w}=Object(i.useSelect)(e=>({validationErrorId:e(p.VALIDATION_STORE_KEY).getValidationErrorId(j)}));return Object(n.createElement)("div",{className:"wc-block-components-totals-coupon"},O?Object(n.createElement)("a",{role:"button",href:"#wc-block-components-totals-coupon__form",className:"wc-block-components-totals-coupon-link","aria-label":Object(c.__)("Add a coupon","woo-gutenberg-products-block"),onClick:e=>{e.preventDefault(),g(!1)}},Object(c.__)("Add a coupon","woo-gutenberg-products-block")):Object(n.createElement)(s.a,{screenReaderLabel:Object(c.__)("Applying coupon…","woo-gutenberg-products-block"),isLoading:t,showSpinner:!1},Object(n.createElement)("div",{className:_},Object(n.createElement)("form",{className:"wc-block-components-totals-coupon__form",id:"wc-block-components-totals-coupon__form"},Object(n.createElement)(l.ValidatedTextInput,{id:j,errorId:"coupon",className:"wc-block-components-totals-coupon__input",label:Object(c.__)("Enter code","woo-gutenberg-products-block"),value:m,ariaDescribedBy:w,onChange:e=>{d(e)},focusOnMount:!0,showError:!1}),Object(n.createElement)(a.a,{className:"wc-block-components-totals-coupon__button",disabled:t||!m,showSpinner:t,onClick:e=>{e.preventDefault(),void 0!==r?r(m).then(e=>{e&&(d(""),g(!0))}):(d(""),g(!0))},type:"submit"},Object(c.__)("Apply","woo-gutenberg-products-block"))),Object(n.createElement)(l.ValidationInputError,{propertyName:"coupon",elementId:j}))))})},523:function(e,o,t){"use strict";t.r(o);var n=t(0),c=t(439),a=t(302),s=t(2),r=t(11);o.default=e=>{let{className:o=""}=e;const t=Object(s.getSetting)("couponsEnabled",!0),{applyCoupon:l,isApplyingCoupon:i}=Object(a.a)("wc/checkout");return t?Object(n.createElement)(r.TotalsWrapper,{className:o},Object(n.createElement)(c.a,{onSubmit:l,isLoading:i})):null}}}]);