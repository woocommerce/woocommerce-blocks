(self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[]).push([[9007,1959,458],{3611:(e,t,n)=>{"use strict";n.d(t,{F:()=>i});var s=n(4184),a=n.n(s),o=n(7884),r=n(2646),c=n(1473),l=n(2661);const i=e=>{const t=(e=>{const t=(0,o.Kn)(e)?e:{style:{}};let n=t.style;return(0,r.H)(n)&&(n=JSON.parse(n)||{}),(0,o.Kn)(n)||(n={}),{...t,style:n}})(e),n=(0,l.vc)(t),s=(0,l.l8)(t),i=(0,l.su)(t),d=(0,c.f)(t);return{className:a()(d.className,n.className,s.className,i.className),style:{...d.style,...n.style,...s.style,...i.style}}}},1473:(e,t,n)=>{"use strict";n.d(t,{f:()=>o});var s=n(7884),a=n(2646);const o=e=>{const t=(0,s.Kn)(e.style.typography)?e.style.typography:{},n=(0,a.H)(t.fontFamily)?t.fontFamily:"";return{className:e.fontFamily?`has-${e.fontFamily}-font-family`:n,style:{fontSize:e.fontSize?`var(--wp--preset--font-size--${e.fontSize})`:t.fontSize,fontStyle:t.fontStyle,fontWeight:t.fontWeight,letterSpacing:t.letterSpacing,lineHeight:t.lineHeight,textDecoration:t.textDecoration,textTransform:t.textTransform}}}},2661:(e,t,n)=>{"use strict";n.d(t,{l8:()=>u,su:()=>m,vc:()=>d});var s=n(4184),a=n.n(s),o=n(9784),r=n(2289),c=n(7884);function l(e={}){const t={};return(0,r.getCSSRules)(e,{selector:""}).forEach((e=>{t[e.key]=e.value})),t}function i(e,t){return e&&t?`has-${(0,o.o)(t)}-${e}`:""}function d(e){var t,n,s,o,r,d,u;const{backgroundColor:m,textColor:p,gradient:y,style:v}=e,g=i("background-color",m),h=i("color",p),f=function(e){if(e)return`has-${e}-gradient-background`}(y),b=f||(null==v||null===(t=v.color)||void 0===t?void 0:t.gradient);return{className:a()(h,f,{[g]:!b&&!!g,"has-text-color":p||(null==v||null===(n=v.color)||void 0===n?void 0:n.text),"has-background":m||(null==v||null===(s=v.color)||void 0===s?void 0:s.background)||y||(null==v||null===(o=v.color)||void 0===o?void 0:o.gradient),"has-link-color":(0,c.Kn)(null==v||null===(r=v.elements)||void 0===r?void 0:r.link)?null==v||null===(d=v.elements)||void 0===d||null===(u=d.link)||void 0===u?void 0:u.color:void 0}),style:l({color:(null==v?void 0:v.color)||{}})}}function u(e){var t;const n=(null===(t=e.style)||void 0===t?void 0:t.border)||{};return{className:function(e){var t;const{borderColor:n,style:s}=e,o=n?i("border-color",n):"";return a()({"has-border-color":!!n||!(null==s||null===(t=s.border)||void 0===t||!t.color),[o]:!!o})}(e),style:l({border:n})}}function m(e){var t;return{className:void 0,style:l({spacing:(null===(t=e.style)||void 0===t?void 0:t.spacing)||{}})}}},5895:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>u});var s=n(9307),a=n(5271),o=n(4877),r=n(4184),c=n.n(r),l=n(3611);const i=(0,n(5736).__)("View my cart","woo-gutenberg-products-block");var d=n(9214);const u=({className:e,cartButtonLabel:t,style:n})=>{const r=(0,l.F)({style:n});return a.fh?(0,s.createElement)(o.Z,{className:c()(e,r.className,"wc-block-mini-cart__footer-cart"),style:r.style,href:a.fh,variant:(0,d.b)(e,"outlined")},t||i):null}},9009:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>p});var s=n(9307),a=n(5271),o=n(4877),r=n(4184),c=n.n(r),l=n(3611),i=n(3691),d=n(6423);const u=(0,n(5736).__)("Go to checkout","woo-gutenberg-products-block");var m=n(9214);const p=({className:e,checkoutButtonLabel:t,style:n})=>{const r=(0,l.F)({style:n}),{dispatchOnProceedToCheckout:p}=(0,i.b)();return a.sE?(0,s.createElement)(o.Z,{className:c()(e,r.className,"wc-block-mini-cart__footer-checkout"),variant:(0,m.b)(e,"contained"),style:r.style,href:a.sE,onClick:e=>{p().then((t=>{t.some(d.qm)&&e.preventDefault()}))}},t||u):null}},9314:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>T});var s=n(9307),a=n(5736),o=n(3554),r=n(4293),c=n(9127),l=n.n(c);function i(e){const t=(0,s.useRef)(e);return l()(e,t.current)||(t.current=e),t.current}var d=n(4613),u=n(9818),m=n(4801);var p=n(4055),y=n(4184),v=n.n(y);const g=e=>`wc-block-components-payment-method-icon wc-block-components-payment-method-icon--${e}`,h=({id:e,src:t=null,alt:n=""})=>t?(0,s.createElement)("img",{className:g(e),src:t,alt:n}):null;var f=n(5271);const b=[{id:"alipay",alt:"Alipay",src:f.td+"payment-methods/alipay.svg"},{id:"amex",alt:"American Express",src:f.td+"payment-methods/amex.svg"},{id:"bancontact",alt:"Bancontact",src:f.td+"payment-methods/bancontact.svg"},{id:"diners",alt:"Diners Club",src:f.td+"payment-methods/diners.svg"},{id:"discover",alt:"Discover",src:f.td+"payment-methods/discover.svg"},{id:"eps",alt:"EPS",src:f.td+"payment-methods/eps.svg"},{id:"giropay",alt:"Giropay",src:f.td+"payment-methods/giropay.svg"},{id:"ideal",alt:"iDeal",src:f.td+"payment-methods/ideal.svg"},{id:"jcb",alt:"JCB",src:f.td+"payment-methods/jcb.svg"},{id:"laser",alt:"Laser",src:f.td+"payment-methods/laser.svg"},{id:"maestro",alt:"Maestro",src:f.td+"payment-methods/maestro.svg"},{id:"mastercard",alt:"Mastercard",src:f.td+"payment-methods/mastercard.svg"},{id:"multibanco",alt:"Multibanco",src:f.td+"payment-methods/multibanco.svg"},{id:"p24",alt:"Przelewy24",src:f.td+"payment-methods/p24.svg"},{id:"sepa",alt:"Sepa",src:f.td+"payment-methods/sepa.svg"},{id:"sofort",alt:"Sofort",src:f.td+"payment-methods/sofort.svg"},{id:"unionpay",alt:"Union Pay",src:f.td+"payment-methods/unionpay.svg"},{id:"visa",alt:"Visa",src:f.td+"payment-methods/visa.svg"},{id:"wechat",alt:"WeChat",src:f.td+"payment-methods/wechat.svg"}];var E=n(2646);n(9086);const P=({icons:e=[],align:t="center",className:n})=>{const a=(e=>{const t={};return e.forEach((e=>{let n={};"string"==typeof e&&(n={id:e,alt:e,src:null}),"object"==typeof e&&(n={id:e.id||"",alt:e.alt||"",src:e.src||null}),n.id&&(0,E.H)(n.id)&&!t[n.id]&&(t[n.id]=n)})),Object.values(t)})(e);if(0===a.length)return null;const o=v()("wc-block-components-payment-method-icons",{"wc-block-components-payment-method-icons--align-left":"left"===t,"wc-block-components-payment-method-icons--align-right":"right"===t},n);return(0,s.createElement)("div",{className:o},a.map((e=>{const t={...e,...(n=e.id,b.find((e=>e.id===n))||{})};var n;return(0,s.createElement)(h,{key:"payment-method-icon-"+e.id,...t})})))},k=e=>Object.values(e).reduce(((e,t)=>(null!==t.icons&&(e=e.concat(t.icons)),e)),[]);var _=n(4617),S=n(7180),N=n.n(S),w=n(9638),x=n(5577);const M=(0,s.createContext)({onPaymentProcessing:()=>()=>()=>{},onPaymentSetup:()=>()=>()=>{}}),C=({children:e})=>{const{isProcessing:t,isIdle:n,isCalculating:a,hasError:o}=(0,u.useSelect)((e=>{const t=e(m.CHECKOUT_STORE_KEY);return{isProcessing:t.isProcessing(),isIdle:t.isIdle(),hasError:t.hasError(),isCalculating:t.isCalculating()}})),{isPaymentReady:r}=(0,u.useSelect)((e=>{const t=e(m.PAYMENT_STORE_KEY);return{isPaymentProcessing:t.isPaymentProcessing(),isPaymentReady:t.isPaymentReady()}})),{setValidationErrors:c}=(0,u.useDispatch)(m.VALIDATION_STORE_KEY),[l,i]=(0,s.useReducer)(w.I6,{}),{onPaymentSetup:d}=(e=>(0,s.useMemo)((()=>({onPaymentSetup:(0,x.m)("payment_setup",e)})),[e]))(i),p=(0,s.useRef)(l);(0,s.useEffect)((()=>{p.current=l}),[l]);const{__internalSetPaymentProcessing:y,__internalSetPaymentIdle:v,__internalEmitPaymentProcessingEvent:g}=(0,u.useDispatch)(m.PAYMENT_STORE_KEY);(0,s.useEffect)((()=>{!t||o||a||(y(),g(p.current,c))}),[t,o,a,y,g,c]),(0,s.useEffect)((()=>{n&&!r&&v()}),[n,r,v]),(0,s.useEffect)((()=>{o&&r&&v()}),[o,r,v]);const h={onPaymentProcessing:(0,s.useMemo)((()=>function(...e){return N()("onPaymentProcessing",{alternative:"onPaymentSetup",plugin:"WooCommerce Blocks"}),d(...e)}),[d]),onPaymentSetup:d};return(0,s.createElement)(M.Provider,{value:h},e)};var O=n(5895),I=n(9009),A=n(9214);const R=()=>{const{paymentMethods:e}=((e=!1)=>{const{paymentMethodsInitialized:t,expressPaymentMethodsInitialized:n,availablePaymentMethods:s,availableExpressPaymentMethods:a}=(0,u.useSelect)((e=>{const t=e(m.PAYMENT_STORE_KEY);return{paymentMethodsInitialized:t.paymentMethodsInitialized(),expressPaymentMethodsInitialized:t.expressPaymentMethodsInitialized(),availableExpressPaymentMethods:t.getAvailableExpressPaymentMethods(),availablePaymentMethods:t.getAvailablePaymentMethods()}})),o=Object.values(s).map((({name:e})=>e)),r=Object.values(a).map((({name:e})=>e)),c=(0,d.getPaymentMethods)(),l=(0,d.getExpressPaymentMethods)(),p=Object.keys(c).reduce(((e,t)=>(o.includes(t)&&(e[t]=c[t]),e)),{}),y=Object.keys(l).reduce(((e,t)=>(r.includes(t)&&(e[t]=l[t]),e)),{}),v=i(p),g=i(y);return{paymentMethods:e?g:v,isInitialized:e?n:t}})(!1);return(0,s.createElement)(P,{icons:k(e)})},T=({children:e,className:t,cartButtonLabel:n,checkoutButtonLabel:c})=>{const{cartTotals:l}=(0,p.b)(),i=(0,_.getSetting)("displayCartPricesIncludingTax",!1)?parseInt(l.total_items,10)+parseInt(l.total_items_tax,10):parseInt(l.total_items,10),d=(0,A.g)(e);return(0,s.createElement)("div",{className:v()(t,"wc-block-mini-cart__footer")},(0,s.createElement)(o.TotalsItem,{className:"wc-block-mini-cart__footer-subtotal",currency:(0,r.getCurrencyFromPriceResponse)(l),label:(0,a.__)("Subtotal","woo-gutenberg-products-block"),value:i,description:(0,a.__)("Shipping, taxes, and discounts calculated at checkout.","woo-gutenberg-products-block")}),(0,s.createElement)("div",{className:"wc-block-mini-cart__footer-actions"},d?e:(0,s.createElement)(s.Fragment,null,(0,s.createElement)(O.default,{cartButtonLabel:n}),(0,s.createElement)(I.default,{checkoutButtonLabel:c}))),(0,s.createElement)(C,null,(0,s.createElement)(R,null)))}},9214:(e,t,n)=>{"use strict";n.d(t,{b:()=>a,g:()=>o});var s=n(7884);const a=(e="",t)=>e.includes("is-style-outline")?"outlined":e.includes("is-style-fill")?"contained":t,o=e=>e.some((e=>Array.isArray(e)?o(e):(0,s.Kn)(e)&&null!==e.key))},1290:(e,t,n)=>{"use strict";n.d(t,{$:()=>o});var s=n(7582),a=n(307);function o(e,t){return void 0===t&&(t={}),(0,a.B)(e,(0,s.pi)({delimiter:"."},t))}},9086:()=>{},9562:(e,t,n)=>{"use strict";function s(e){return e.toLowerCase()}n.d(t,{U:()=>s})},307:(e,t,n)=>{"use strict";n.d(t,{B:()=>r});var s=n(9562),a=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],o=/[^A-Z0-9]+/gi;function r(e,t){void 0===t&&(t={});for(var n=t.splitRegexp,r=void 0===n?a:n,l=t.stripRegexp,i=void 0===l?o:l,d=t.transform,u=void 0===d?s.U:d,m=t.delimiter,p=void 0===m?" ":m,y=c(c(e,r,"$1\0$2"),i,"\0"),v=0,g=y.length;"\0"===y.charAt(v);)v++;for(;"\0"===y.charAt(g-1);)g--;return y.slice(v,g).split("\0").map(u).join(p)}function c(e,t,n){return t instanceof RegExp?e.replace(t,n):t.reduce((function(e,t){return e.replace(t,n)}),e)}},9784:(e,t,n)=>{"use strict";n.d(t,{o:()=>o});var s=n(7582),a=n(1290);function o(e,t){return void 0===t&&(t={}),(0,a.$)(e,(0,s.pi)({delimiter:"-"},t))}},7582:(e,t,n)=>{"use strict";n.d(t,{pi:()=>s});var s=function(){return s=Object.assign||function(e){for(var t,n=1,s=arguments.length;n<s;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},s.apply(this,arguments)};Object.create,Object.create,"function"==typeof SuppressedError&&SuppressedError}}]);