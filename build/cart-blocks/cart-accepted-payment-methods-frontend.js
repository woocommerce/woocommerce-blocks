(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[17],{26:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(0),s=n(13),c=n.n(s);function o(e){const t=Object(a.useRef)(e);return c()(e,t.current)||(t.current=e),t.current}},315:function(e,t){},323:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return d}));var a=n(26),s=n(20),c=n(5),o=n(3);const i=(e=!1)=>{const{paymentMethodsInitialized:t,expressPaymentMethodsInitialized:n,availablePaymentMethods:i,availableExpressPaymentMethods:r}=Object(c.useSelect)((e=>{const t=e(o.PAYMENT_STORE_KEY);return{paymentMethodsInitialized:t.paymentMethodsInitialized(),expressPaymentMethodsInitialized:t.expressPaymentMethodsInitialized(),availableExpressPaymentMethods:t.getAvailableExpressPaymentMethods(),availablePaymentMethods:t.getAvailablePaymentMethods()}})),d=Object.values(i).map((({name:e})=>e)),l=Object.values(r).map((({name:e})=>e)),m=Object(s.getPaymentMethods)(),p=Object(s.getExpressPaymentMethods)(),u=Object.keys(m).reduce(((e,t)=>(d.includes(t)&&(e[t]=m[t]),e)),{}),y=Object.keys(p).reduce(((e,t)=>(l.includes(t)&&(e[t]=p[t]),e)),{}),h=Object(a.a)(u),b=Object(a.a)(y);return{paymentMethods:e?b:h,isInitialized:e?n:t}},r=()=>i(!1),d=()=>i(!0)},336:function(e,t,n){"use strict";var a=n(0),s=n(4),c=n.n(s);const o=e=>`wc-block-components-payment-method-icon wc-block-components-payment-method-icon--${e}`;var i=({id:e,src:t=null,alt:n=""})=>t?Object(a.createElement)("img",{className:o(e),src:t,alt:n}):null,r=n(29);const d=[{id:"alipay",alt:"Alipay",src:r.n+"payment-methods/alipay.svg"},{id:"amex",alt:"American Express",src:r.n+"payment-methods/amex.svg"},{id:"bancontact",alt:"Bancontact",src:r.n+"payment-methods/bancontact.svg"},{id:"diners",alt:"Diners Club",src:r.n+"payment-methods/diners.svg"},{id:"discover",alt:"Discover",src:r.n+"payment-methods/discover.svg"},{id:"eps",alt:"EPS",src:r.n+"payment-methods/eps.svg"},{id:"giropay",alt:"Giropay",src:r.n+"payment-methods/giropay.svg"},{id:"ideal",alt:"iDeal",src:r.n+"payment-methods/ideal.svg"},{id:"jcb",alt:"JCB",src:r.n+"payment-methods/jcb.svg"},{id:"laser",alt:"Laser",src:r.n+"payment-methods/laser.svg"},{id:"maestro",alt:"Maestro",src:r.n+"payment-methods/maestro.svg"},{id:"mastercard",alt:"Mastercard",src:r.n+"payment-methods/mastercard.svg"},{id:"multibanco",alt:"Multibanco",src:r.n+"payment-methods/multibanco.svg"},{id:"p24",alt:"Przelewy24",src:r.n+"payment-methods/p24.svg"},{id:"sepa",alt:"Sepa",src:r.n+"payment-methods/sepa.svg"},{id:"sofort",alt:"Sofort",src:r.n+"payment-methods/sofort.svg"},{id:"unionpay",alt:"Union Pay",src:r.n+"payment-methods/unionpay.svg"},{id:"visa",alt:"Visa",src:r.n+"payment-methods/visa.svg"},{id:"wechat",alt:"WeChat",src:r.n+"payment-methods/wechat.svg"}];var l=n(28);n(315),t.a=({icons:e=[],align:t="center",className:n})=>{const s=(e=>{const t={};return e.forEach((e=>{let n={};"string"==typeof e&&(n={id:e,alt:e,src:null}),"object"==typeof e&&(n={id:e.id||"",alt:e.alt||"",src:e.src||null}),n.id&&Object(l.a)(n.id)&&!t[n.id]&&(t[n.id]=n)})),Object.values(t)})(e);if(0===s.length)return null;const o=c()("wc-block-components-payment-method-icons",{"wc-block-components-payment-method-icons--align-left":"left"===t,"wc-block-components-payment-method-icons--align-right":"right"===t},n);return Object(a.createElement)("div",{className:o},s.map((e=>{const t={...e,...(n=e.id,d.find((e=>e.id===n))||{})};var n;return Object(a.createElement)(i,{key:"payment-method-icon-"+e.id,...t})})))}},449:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));const a=e=>Object.values(e).reduce(((e,t)=>(null!==t.icons&&(e=e.concat(t.icons)),e)),[])},523:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n(336),c=n(323),o=n(449);t.default=({className:e})=>{const{paymentMethods:t}=Object(c.b)();return Object(a.createElement)(s.a,{className:e,icons:Object(o.a)(t)})}}}]);