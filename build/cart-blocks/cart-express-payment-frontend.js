(self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[]).push([[2030],{1333:(e,t,s)=>{"use strict";s.d(t,{C:()=>a});var o=s(5271);const n=[{id:"alipay",alt:"Alipay",src:o.td+"payment-methods/alipay.svg"},{id:"amex",alt:"American Express",src:o.td+"payment-methods/amex.svg"},{id:"bancontact",alt:"Bancontact",src:o.td+"payment-methods/bancontact.svg"},{id:"diners",alt:"Diners Club",src:o.td+"payment-methods/diners.svg"},{id:"discover",alt:"Discover",src:o.td+"payment-methods/discover.svg"},{id:"eps",alt:"EPS",src:o.td+"payment-methods/eps.svg"},{id:"giropay",alt:"Giropay",src:o.td+"payment-methods/giropay.svg"},{id:"ideal",alt:"iDeal",src:o.td+"payment-methods/ideal.svg"},{id:"jcb",alt:"JCB",src:o.td+"payment-methods/jcb.svg"},{id:"laser",alt:"Laser",src:o.td+"payment-methods/laser.svg"},{id:"maestro",alt:"Maestro",src:o.td+"payment-methods/maestro.svg"},{id:"mastercard",alt:"Mastercard",src:o.td+"payment-methods/mastercard.svg"},{id:"multibanco",alt:"Multibanco",src:o.td+"payment-methods/multibanco.svg"},{id:"p24",alt:"Przelewy24",src:o.td+"payment-methods/p24.svg"},{id:"sepa",alt:"Sepa",src:o.td+"payment-methods/sepa.svg"},{id:"sofort",alt:"Sofort",src:o.td+"payment-methods/sofort.svg"},{id:"unionpay",alt:"Union Pay",src:o.td+"payment-methods/unionpay.svg"},{id:"visa",alt:"Visa",src:o.td+"payment-methods/visa.svg"},{id:"wechat",alt:"WeChat",src:o.td+"payment-methods/wechat.svg"}],a=e=>n.find((t=>t.id===e))||{}},7445:(e,t,s)=>{"use strict";s.d(t,{Z:()=>l});var o=s(9196),n=s(4184),a=s.n(n),r=s(2114),c=s(1333),i=s(8718);s(9086);const l=({icons:e=[],align:t="center",className:s})=>{const n=(0,i.L)(e);if(0===n.length)return null;const l=a()("wc-block-components-payment-method-icons",{"wc-block-components-payment-method-icons--align-left":"left"===t,"wc-block-components-payment-method-icons--align-right":"right"===t},s);return(0,o.createElement)("div",{className:l},n.map((e=>{const t={...e,...(0,c.C)(e.id)};return(0,o.createElement)(r.Z,{key:"payment-method-icon-"+e.id,...t})})))}},2114:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});var o=s(9196);const n=e=>`wc-block-components-payment-method-icon wc-block-components-payment-method-icon--${e}`,a=({id:e,src:t=null,alt:s=""})=>t?(0,o.createElement)("img",{className:n(e),src:t,alt:s}):null},8718:(e,t,s)=>{"use strict";s.d(t,{L:()=>n});var o=s(2646);const n=e=>{const t={};return e.forEach((e=>{let s={};"string"==typeof e&&(s={id:e,alt:e,src:null}),"object"==typeof e&&(s={id:e.id||"",alt:e.alt||"",src:e.src||null}),s.id&&(0,o.H)(s.id)&&!t[s.id]&&(t[s.id]=s)})),Object.values(t)}},1137:(e,t,s)=>{"use strict";s.d(t,{K:()=>l});var o=s(5736),n=s(9818),a=s(4801),r=s(2629),c=s(3554),i=s(4055);const l=(e="")=>{const{cartCoupons:t,cartIsLoading:s}=(0,i.b)(),{createErrorNotice:l}=(0,n.useDispatch)("core/notices"),{createNotice:p}=(0,n.useDispatch)("core/notices"),{setValidationErrors:m}=(0,n.useDispatch)(a.VALIDATION_STORE_KEY),{isApplyingCoupon:d,isRemovingCoupon:u}=(0,n.useSelect)((e=>{const t=e(a.CART_STORE_KEY);return{isApplyingCoupon:t.isApplyingCoupon(),isRemovingCoupon:t.isRemovingCoupon()}}),[l,p]),{applyCoupon:h,removeCoupon:g}=(0,n.useDispatch)(a.CART_STORE_KEY);return{appliedCoupons:t,isLoading:s,applyCoupon:t=>h(t).then((()=>((0,c.applyCheckoutFilter)({filterName:"showApplyCouponNotice",defaultValue:!0,arg:{couponCode:t,context:e}})&&p("info",(0,o.sprintf)(/* translators: %s coupon code. */
(0,o.__)('Coupon code "%s" has been applied to your cart.',"woo-gutenberg-products-block"),t),{id:"coupon-form",type:"snackbar",context:e}),Promise.resolve(!0)))).catch((e=>(m({coupon:{message:(0,r.decodeEntities)(e.message),hidden:!1}}),Promise.resolve(!1)))),removeCoupon:t=>g(t).then((()=>((0,c.applyCheckoutFilter)({filterName:"showRemoveCouponNotice",defaultValue:!0,arg:{couponCode:t,context:e}})&&p("info",(0,o.sprintf)(/* translators: %s coupon code. */
(0,o.__)('Coupon code "%s" has been removed from your cart.',"woo-gutenberg-products-block"),t),{id:"coupon-form",type:"snackbar",context:e}),Promise.resolve(!0)))).catch((t=>(l(t.message,{id:"coupon-form",context:e}),Promise.resolve(!1)))),isApplyingCoupon:d,isRemovingCoupon:u}}},9576:(e,t,s)=>{"use strict";s.d(t,{E:()=>i,X:()=>l});var o=s(9075),n=s(4613),a=s(9818),r=s(4801);const c=(e=!1)=>{const{paymentMethodsInitialized:t,expressPaymentMethodsInitialized:s,availablePaymentMethods:c,availableExpressPaymentMethods:i}=(0,a.useSelect)((e=>{const t=e(r.PAYMENT_STORE_KEY);return{paymentMethodsInitialized:t.paymentMethodsInitialized(),expressPaymentMethodsInitialized:t.expressPaymentMethodsInitialized(),availableExpressPaymentMethods:t.getAvailableExpressPaymentMethods(),availablePaymentMethods:t.getAvailablePaymentMethods()}})),l=Object.values(c).map((({name:e})=>e)),p=Object.values(i).map((({name:e})=>e)),m=(0,n.getPaymentMethods)(),d=(0,n.getExpressPaymentMethods)(),u=Object.keys(m).reduce(((e,t)=>(l.includes(t)&&(e[t]=m[t]),e)),{}),h=Object.keys(d).reduce(((e,t)=>(p.includes(t)&&(e[t]=d[t]),e)),{}),g=(0,o.s)(u),y=(0,o.s)(h);return{paymentMethods:e?y:g,isInitialized:e?s:t}},i=()=>c(!1),l=()=>c(!0)},9075:(e,t,s)=>{"use strict";s.d(t,{s:()=>r});var o=s(9307),n=s(9127),a=s.n(n);function r(e){const t=(0,o.useRef)(e);return a()(e,t.current)||(t.current=e),t.current}},1556:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>H});var o=s(9196),n=s(4055),a=s(4184),r=s.n(a),c=s(5736),i=s(9576),l=s(6423),p=s(711),m=s(1193),d=s(9818),u=s(4801),h=s(4293),g=s(9307),y=s(444);const v=(0,o.createElement)(y.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)("g",{fill:"none",fillRule:"evenodd"},(0,o.createElement)("path",{d:"M0 0h24v24H0z"}),(0,o.createElement)("path",{fill:"#000",fillRule:"nonzero",d:"M17.3 8v1c1 .2 1.4.9 1.4 1.7h-1c0-.6-.3-1-1-1-.8 0-1.3.4-1.3.9 0 .4.3.6 1.4 1 1 .2 2 .6 2 1.9 0 .9-.6 1.4-1.5 1.5v1H16v-1c-.9-.1-1.6-.7-1.7-1.7h1c0 .6.4 1 1.3 1 1 0 1.2-.5 1.2-.8 0-.4-.2-.8-1.3-1.1-1.3-.3-2.1-.8-2.1-1.8 0-.9.7-1.5 1.6-1.6V8h1.3zM12 10v1H6v-1h6zm2-2v1H6V8h8zM2 4v16h20V4H2zm2 14V6h16v12H4z"}),(0,o.createElement)("path",{stroke:"#000",strokeLinecap:"round",d:"M6 16c2.6 0 3.9-3 1.7-3-2 0-1 3 1.5 3 1 0 1-.8 2.8-.8"}))),E=(0,o.createElement)(y.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(y.Path,{fillRule:"evenodd",d:"M18.646 9H20V8l-1-.5L12 4 5 7.5 4 8v1h14.646zm-3-1.5L12 5.677 8.354 7.5h7.292zm-7.897 9.44v-6.5h-1.5v6.5h1.5zm5-6.5v6.5h-1.5v-6.5h1.5zm5 0v6.5h-1.5v-6.5h1.5zm2.252 8.81c0 .414-.334.75-.748.75H4.752a.75.75 0 010-1.5h14.5a.75.75 0 01.749.75z",clipRule:"evenodd"})),b=(0,o.createElement)(y.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(y.Path,{d:"M3.25 12a8.75 8.75 0 1117.5 0 8.75 8.75 0 01-17.5 0zM12 4.75a7.25 7.25 0 100 14.5 7.25 7.25 0 000-14.5zm-1.338 4.877c-.314.22-.412.452-.412.623 0 .171.098.403.412.623.312.218.783.377 1.338.377.825 0 1.605.233 2.198.648.59.414 1.052 1.057 1.052 1.852 0 .795-.461 1.438-1.052 1.852-.41.286-.907.486-1.448.582v.316a.75.75 0 01-1.5 0v-.316a3.64 3.64 0 01-1.448-.582c-.59-.414-1.052-1.057-1.052-1.852a.75.75 0 011.5 0c0 .171.098.403.412.623.312.218.783.377 1.338.377s1.026-.159 1.338-.377c.314-.22.412-.452.412-.623 0-.171-.098-.403-.412-.623-.312-.218-.783-.377-1.338-.377-.825 0-1.605-.233-2.198-.648-.59-.414-1.052-1.057-1.052-1.852 0-.795.461-1.438 1.052-1.852a3.64 3.64 0 011.448-.582V7.5a.75.75 0 011.5 0v.316c.54.096 1.039.296 1.448.582.59.414 1.052 1.057 1.052 1.852a.75.75 0 01-1.5 0c0-.171-.098-.403-.412-.623-.312-.218-.783-.377-1.338-.377s-1.026.159-1.338.377z"})),P=(0,o.createElement)(y.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(y.Path,{fillRule:"evenodd",d:"M5.5 9.5v-2h13v2h-13zm0 3v4h13v-4h-13zM4 7a1 1 0 011-1h14a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V7z",clipRule:"evenodd"}));var S=s(1984),k=s(2646),C=s(7884);s(4948);const _={bank:E,bill:b,card:P,checkPayment:v},w=({icon:e="",text:t=""})=>{const s=!!e,n=(0,g.useCallback)((e=>s&&(0,k.H)(e)&&(0,C.$n)(_,e)),[s]),a=r()("wc-block-components-payment-method-label",{"wc-block-components-payment-method-label--with-icon":s});return(0,o.createElement)("span",{className:a},n(e)?(0,o.createElement)(S.Z,{icon:_[e]}):e,t)};var f=s(7445),R=s(4617),x=s(7180),M=s.n(x),A=s(1137),I=s(5999),T=s(9727),N=s(5810);const z=(e,t)=>{const s=[],o=(t,s)=>{const o=s+"_tax",n=(0,C.$n)(e,s)&&(0,k.H)(e[s])?parseInt(e[s],10):0;return{key:s,label:t,value:n,valueWithTax:n+((0,C.$n)(e,o)&&(0,k.H)(e[o])?parseInt(e[o],10):0)}};return s.push(o((0,c.__)("Subtotal:","woo-gutenberg-products-block"),"total_items")),s.push(o((0,c.__)("Fees:","woo-gutenberg-products-block"),"total_fees")),s.push(o((0,c.__)("Discount:","woo-gutenberg-products-block"),"total_discount")),s.push({key:"total_tax",label:(0,c.__)("Taxes:","woo-gutenberg-products-block"),value:parseInt(e.total_tax,10),valueWithTax:parseInt(e.total_tax,10)}),t&&s.push(o((0,c.__)("Shipping:","woo-gutenberg-products-block"),"total_shipping")),s};var V=s(5027),D=s(8832);const O=({isEditor:e,children:t})=>{const[s]=(0,g.useState)(""),[n]=(0,g.useState)(!1);if(n){let t=(0,c.__)("We are experiencing difficulties with this payment method. Please contact us for assistance.","woo-gutenberg-products-block");(e||R.CURRENT_USER_IS_ADMIN)&&(t=s||(0,c.__)("There was an error with this payment method. Please verify it's configured correctly.","woo-gutenberg-products-block"));const n=[{id:"0",content:t,isDismissible:!1,status:"error"}];return(0,o.createElement)(p.StoreNoticesContainer,{additionalNotices:n,context:l.n7.PAYMENTS})}return(0,o.createElement)(o.Fragment,null,t)},B="wc/store/payment",F=()=>{const{isEditor:e}=(0,D._)(),{activePaymentMethod:t,paymentMethodData:s}=(0,d.useSelect)((e=>{const t=e(B);return{activePaymentMethod:t.getActivePaymentMethod(),paymentMethodData:t.getPaymentMethodData()}})),{__internalSetActivePaymentMethod:a,__internalSetExpressPaymentStarted:r,__internalSetPaymentIdle:y,__internalSetPaymentError:v,__internalSetPaymentMethodData:E,__internalSetExpressPaymentError:b}=(0,d.useDispatch)(B),{paymentMethods:P}=(0,i.X)(),S=(()=>{const{onCheckoutBeforeProcessing:e,onCheckoutValidationBeforeProcessing:t,onCheckoutAfterProcessingWithSuccess:s,onCheckoutAfterProcessingWithError:o,onSubmit:a,onCheckoutSuccess:r,onCheckoutFail:i,onCheckoutValidation:y}=(0,I.U)(),{isCalculating:v,isComplete:E,isIdle:b,isProcessing:P,customerId:S}=(0,d.useSelect)((e=>{const t=e(u.CHECKOUT_STORE_KEY);return{isComplete:t.isComplete(),isIdle:t.isIdle(),isProcessing:t.isProcessing(),customerId:t.getCustomerId(),isCalculating:t.isCalculating()}})),{paymentStatus:k,activePaymentMethod:C,shouldSavePayment:_}=(0,d.useSelect)((e=>{const t=e(u.PAYMENT_STORE_KEY);return{paymentStatus:{get isPristine(){return M()("isPristine",{since:"9.6.0",alternative:"isIdle",plugin:"WooCommerce Blocks",link:"https://github.com/woocommerce/woocommerce-blocks/pull/8110"}),t.isPaymentIdle()},isIdle:t.isPaymentIdle(),isStarted:t.isExpressPaymentStarted(),isProcessing:t.isPaymentProcessing(),get isFinished(){return M()("isFinished",{since:"9.6.0",plugin:"WooCommerce Blocks",link:"https://github.com/woocommerce/woocommerce-blocks/pull/8110"}),t.hasPaymentError()||t.isPaymentReady()},hasError:t.hasPaymentError(),get hasFailed(){return M()("hasFailed",{since:"9.6.0",plugin:"WooCommerce Blocks",link:"https://github.com/woocommerce/woocommerce-blocks/pull/8110"}),t.hasPaymentError()},get isSuccessful(){return M()("isSuccessful",{since:"9.6.0",plugin:"WooCommerce Blocks",link:"https://github.com/woocommerce/woocommerce-blocks/pull/8110"}),t.isPaymentReady()},isReady:t.isPaymentReady(),isDoingExpressPayment:t.isExpressPaymentMethodActive()},activePaymentMethod:t.getActivePaymentMethod(),shouldSavePayment:t.getShouldSavePaymentMethod()}})),{__internalSetExpressPaymentError:x}=(0,d.useDispatch)(u.PAYMENT_STORE_KEY),{onPaymentProcessing:D,onPaymentSetup:O}=(0,T.P)(),{shippingErrorStatus:B,shippingErrorTypes:F,onShippingRateSuccess:Y,onShippingRateFail:H,onShippingRateSelectSuccess:K,onShippingRateSelectFail:L}=(0,N.d)(),{shippingRates:W,isLoadingRates:j,selectedRates:Z,isSelectingRate:U,selectShippingRate:G,needsShipping:$}=(0,V.V)(),{billingAddress:X,shippingAddress:J}=(0,d.useSelect)((e=>e(u.CART_STORE_KEY).getCustomerData())),{setShippingAddress:q}=(0,d.useDispatch)(u.CART_STORE_KEY),{cartItems:Q,cartFees:ee,cartTotals:te,extensions:se}=(0,n.b)(),{appliedCoupons:oe}=(0,A.K)(),ne=(0,g.useRef)(z(te,$)),ae=(0,g.useRef)({label:(0,c.__)("Total","woo-gutenberg-products-block"),value:parseInt(te.total_price,10)});(0,g.useEffect)((()=>{ne.current=z(te,$),ae.current={label:(0,c.__)("Total","woo-gutenberg-products-block"),value:parseInt(te.total_price,10)}}),[te,$]);const re=(0,g.useCallback)(((e="")=>{M()("setExpressPaymentError should only be used by Express Payment Methods (using the provided onError handler).",{alternative:"",plugin:"woocommerce-gutenberg-products-block",link:"https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4228"}),x(e)}),[x]);return{activePaymentMethod:C,billing:{appliedCoupons:oe,billingAddress:X,billingData:X,cartTotal:ae.current,cartTotalItems:ne.current,currency:(0,h.getCurrencyFromPriceResponse)(te),customerId:S,displayPricesIncludingTax:(0,R.getSetting)("displayCartPricesIncludingTax",!1)},cartData:{cartItems:Q,cartFees:ee,extensions:se},checkoutStatus:{isCalculating:v,isComplete:E,isIdle:b,isProcessing:P},components:{LoadingMask:m.Z,PaymentMethodIcons:f.Z,PaymentMethodLabel:w,ValidationInputError:p.ValidationInputError},emitResponse:{noticeContexts:l.n7,responseTypes:l.dO},eventRegistration:{onCheckoutAfterProcessingWithError:o,onCheckoutAfterProcessingWithSuccess:s,onCheckoutBeforeProcessing:e,onCheckoutValidationBeforeProcessing:t,onCheckoutSuccess:r,onCheckoutFail:i,onCheckoutValidation:y,onPaymentProcessing:D,onPaymentSetup:O,onShippingRateFail:H,onShippingRateSelectFail:L,onShippingRateSelectSuccess:K,onShippingRateSuccess:Y},onSubmit:a,paymentStatus:k,setExpressPaymentError:re,shippingData:{isSelectingRate:U,needsShipping:$,selectedRates:Z,setSelectedRates:G,setShippingAddress:q,shippingAddress:J,shippingRates:W,shippingRatesLoading:j},shippingStatus:{shippingErrorStatus:B,shippingErrorTypes:F},shouldSavePayment:_}})(),k=(0,g.useRef)(t),C=(0,g.useRef)(s),_=(0,g.useCallback)((e=>()=>{k.current=t,C.current=s,r(),a(e)}),[t,s,a,r]),x=(0,g.useCallback)((()=>{y(),a(k.current,C.current)}),[a,y]),F=(0,g.useCallback)((e=>{v(),E(e),b(e),a(k.current,C.current)}),[a,v,E,b]),Y=(0,g.useCallback)(((e="")=>{M()("Express Payment Methods should use the provided onError handler instead.",{alternative:"onError",plugin:"woocommerce-gutenberg-products-block",link:"https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4228"}),e?F(e):b("")}),[b,F]),H=Object.entries(P),K=H.length>0?H.map((([t,s])=>{const n=e?s.edit:s.content;return(0,g.isValidElement)(n)?(0,o.createElement)("li",{key:t,id:`express-payment-method-${t}`},(0,g.cloneElement)(n,{...S,onClick:_(t),onClose:x,onError:F,setExpressPaymentError:Y})):null})):(0,o.createElement)("li",{key:"noneRegistered"},(0,c.__)("No registered Payment Methods","woo-gutenberg-products-block"));return(0,o.createElement)(O,{isEditor:e},(0,o.createElement)("ul",{className:"wc-block-components-express-payment__event-buttons"},K))};s(6620);const Y=()=>{const{paymentMethods:e,isInitialized:t}=(0,i.X)(),{isCalculating:s,isProcessing:n,isAfterProcessing:a,isBeforeProcessing:r,isComplete:h,hasError:g}=(0,d.useSelect)((e=>{const t=e(u.CHECKOUT_STORE_KEY);return{isCalculating:t.isCalculating(),isProcessing:t.isProcessing(),isAfterProcessing:t.isAfterProcessing(),isBeforeProcessing:t.isBeforeProcessing(),isComplete:t.isComplete(),hasError:t.hasError()}})),y=(0,d.useSelect)((e=>e(u.PAYMENT_STORE_KEY).isExpressPaymentMethodActive()));if(!t||t&&0===Object.keys(e).length)return null;const v=n||a||r||h&&!g;return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(m.Z,{isLoading:s||v||y},(0,o.createElement)("div",{className:"wc-block-components-express-payment wc-block-components-express-payment--cart"},(0,o.createElement)("div",{className:"wc-block-components-express-payment__content"},(0,o.createElement)(p.StoreNoticesContainer,{context:l.n7.EXPRESS_PAYMENTS}),(0,o.createElement)(F,null)))),(0,o.createElement)("div",{className:"wc-block-components-express-payment-continue-rule wc-block-components-express-payment-continue-rule--cart"},(0,c.__)("Or","woo-gutenberg-products-block")))},H=({className:e})=>{const{cartNeedsPayment:t}=(0,n.b)();return t?(0,o.createElement)("div",{className:r()("wc-block-cart__payment-options",e)},(0,o.createElement)(Y,null)):null}},9086:()=>{},4948:()=>{},6620:()=>{}}]);