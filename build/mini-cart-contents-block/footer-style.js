(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[74,71],{206:function(e,t,n){"use strict";n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return p}));var a=n(0),s=n(8),c=n(10),r=n(28),o=n.n(r),i=n(118),l=n(349);const m="payment_setup",u=Object(a.createContext)({onPaymentProcessing:()=>()=>()=>{},onPaymentSetup:()=>()=>()=>{}}),d=()=>Object(a.useContext)(u),p=e=>{let{children:t}=e;const{isProcessing:n,isIdle:r,isCalculating:d,hasError:p}=Object(s.useSelect)(e=>{const t=e(c.CHECKOUT_STORE_KEY);return{isProcessing:t.isProcessing(),isIdle:t.isIdle(),hasError:t.hasError(),isCalculating:t.isCalculating()}}),{isPaymentReady:b}=Object(s.useSelect)(e=>{const t=e(c.PAYMENT_STORE_KEY);return{isPaymentProcessing:t.isPaymentProcessing(),isPaymentReady:t.isPaymentReady()}}),{setValidationErrors:y}=Object(s.useDispatch)(c.VALIDATION_STORE_KEY),[h,g]=Object(a.useReducer)(i.b,{}),{onPaymentSetup:O}=(e=>Object(a.useMemo)(()=>({onPaymentSetup:Object(l.a)(m,e)}),[e]))(g),j=Object(a.useRef)(h);Object(a.useEffect)(()=>{j.current=h},[h]);const{__internalSetPaymentProcessing:v,__internalSetPaymentIdle:f,__internalEmitPaymentProcessingEvent:P}=Object(s.useDispatch)(c.PAYMENT_STORE_KEY);Object(a.useEffect)(()=>{!n||p||d||(v(),P(j.current,y))},[n,p,d,v,P,y]),Object(a.useEffect)(()=>{r&&!b&&f()},[r,b,f]),Object(a.useEffect)(()=>{p&&b&&f()},[p,b,f]);const E={onPaymentProcessing:Object(a.useMemo)(()=>function(){return o()("onPaymentProcessing",{alternative:"onPaymentSetup",plugin:"WooCommerce Blocks"}),O(...arguments)},[O]),onPaymentSetup:O};return Object(a.createElement)(u.Provider,{value:E},t)}},217:function(e,t,n){"use strict";var a=n(7),s=n.n(a),c=n(0),r=n(4),o=n.n(r);const i=e=>"wc-block-components-payment-method-icon wc-block-components-payment-method-icon--"+e;var l=e=>{let{id:t,src:n=null,alt:a=""}=e;return n?Object(c.createElement)("img",{className:i(t),src:n,alt:a}):null},m=n(22);const u=[{id:"alipay",alt:"Alipay",src:m.p+"payment-methods/alipay.svg"},{id:"amex",alt:"American Express",src:m.p+"payment-methods/amex.svg"},{id:"bancontact",alt:"Bancontact",src:m.p+"payment-methods/bancontact.svg"},{id:"diners",alt:"Diners Club",src:m.p+"payment-methods/diners.svg"},{id:"discover",alt:"Discover",src:m.p+"payment-methods/discover.svg"},{id:"eps",alt:"EPS",src:m.p+"payment-methods/eps.svg"},{id:"giropay",alt:"Giropay",src:m.p+"payment-methods/giropay.svg"},{id:"ideal",alt:"iDeal",src:m.p+"payment-methods/ideal.svg"},{id:"jcb",alt:"JCB",src:m.p+"payment-methods/jcb.svg"},{id:"laser",alt:"Laser",src:m.p+"payment-methods/laser.svg"},{id:"maestro",alt:"Maestro",src:m.p+"payment-methods/maestro.svg"},{id:"mastercard",alt:"Mastercard",src:m.p+"payment-methods/mastercard.svg"},{id:"multibanco",alt:"Multibanco",src:m.p+"payment-methods/multibanco.svg"},{id:"p24",alt:"Przelewy24",src:m.p+"payment-methods/p24.svg"},{id:"sepa",alt:"Sepa",src:m.p+"payment-methods/sepa.svg"},{id:"sofort",alt:"Sofort",src:m.p+"payment-methods/sofort.svg"},{id:"unionpay",alt:"Union Pay",src:m.p+"payment-methods/unionpay.svg"},{id:"visa",alt:"Visa",src:m.p+"payment-methods/visa.svg"},{id:"wechat",alt:"WeChat",src:m.p+"payment-methods/wechat.svg"}];var d=n(73);t.a=e=>{let{icons:t=[],align:n="center",className:a}=e;const r=(e=>{const t={};return e.forEach(e=>{let n={};"string"==typeof e&&(n={id:e,alt:e,src:null}),"object"==typeof e&&(n={id:e.id||"",alt:e.alt||"",src:e.src||null}),n.id&&Object(d.a)(n.id)&&!t[n.id]&&(t[n.id]=n)}),Object.values(t)})(t);if(0===r.length)return null;const i=o()("wc-block-components-payment-method-icons",{"wc-block-components-payment-method-icons--align-left":"left"===n,"wc-block-components-payment-method-icons--align-right":"right"===n},a);return Object(c.createElement)("div",{className:i},r.map(e=>{const t={...e,...(n=e.id,u.find(e=>e.id===n)||{})};var n;return Object(c.createElement)(l,s()({key:"payment-method-icon-"+e.id},t))}))}},313:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return l}));var a=n(61),s=n(33),c=n(8),r=n(10);const o=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const{paymentMethodsInitialized:t,expressPaymentMethodsInitialized:n,availablePaymentMethods:o,availableExpressPaymentMethods:i}=Object(c.useSelect)(e=>{const t=e(r.PAYMENT_STORE_KEY);return{paymentMethodsInitialized:t.paymentMethodsInitialized(),expressPaymentMethodsInitialized:t.expressPaymentMethodsInitialized(),availableExpressPaymentMethods:t.getAvailableExpressPaymentMethods(),availablePaymentMethods:t.getAvailablePaymentMethods()}}),l=Object.values(o).map(e=>{let{name:t}=e;return t}),m=Object.values(i).map(e=>{let{name:t}=e;return t}),u=Object(s.getPaymentMethods)(),d=Object(s.getExpressPaymentMethods)(),p=Object.keys(u).reduce((e,t)=>(l.includes(t)&&(e[t]=u[t]),e),{}),b=Object.keys(d).reduce((e,t)=>(m.includes(t)&&(e[t]=d[t]),e),{}),y=Object(a.a)(p),h=Object(a.a)(b);return{paymentMethods:e?h:y,isInitialized:e?n:t}},i=()=>o(!1),l=()=>o(!0)},348:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(1);const s=Object(a.__)("View my cart","woo-gutenberg-products-block")},476:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));const a=e=>Object.values(e).reduce((e,t)=>(null!==t.icons&&(e=e.concat(t.icons)),e),[])},61:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(0),s=n(27),c=n.n(s);function r(e){const t=Object(a.useRef)(e);return c()(e,t.current)||(t.current=e),t.current}},897:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n(22),c=n(79),r=n(4),o=n.n(r),i=n(250),l=n(348),m=n(278);t.default=e=>{let{className:t,cartButtonLabel:n,style:r}=e;const u=Object(i.a)({style:r});return s.d?Object(a.createElement)(c.a,{className:o()(t,u.className,"wc-block-mini-cart__footer-cart"),style:u.style,href:s.d,variant:Object(m.a)(t,"outlined")},n||l.a):null}},952:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n(1),c=n(13),r=n(29),o=n(313),i=n(49),l=n(217),m=n(476),u=n(2),d=n(206),p=n(4),b=n.n(p),y=n(897),h=n(904),g=n(278);const O=()=>{const{paymentMethods:e}=Object(o.b)();return Object(a.createElement)(l.a,{icons:Object(m.a)(e)})};t.default=e=>{let{children:t,className:n,cartButtonLabel:o,checkoutButtonLabel:l}=e;const{cartTotals:m}=Object(i.a)(),p=Object(u.getSetting)("displayCartPricesIncludingTax",!1)?parseInt(m.total_items,10)+parseInt(m.total_items_tax,10):parseInt(m.total_items,10),j=Object(g.b)(t);return Object(a.createElement)("div",{className:b()(n,"wc-block-mini-cart__footer")},Object(a.createElement)(c.TotalsItem,{className:"wc-block-mini-cart__footer-subtotal",currency:Object(r.getCurrencyFromPriceResponse)(m),label:Object(s.__)("Subtotal","woo-gutenberg-products-block"),value:p,description:Object(s.__)("Shipping, taxes, and discounts calculated at checkout.","woo-gutenberg-products-block")}),Object(a.createElement)("div",{className:"wc-block-mini-cart__footer-actions"},j?t:Object(a.createElement)(a.Fragment,null,Object(a.createElement)(y.default,{cartButtonLabel:o}),Object(a.createElement)(h.default,{checkoutButtonLabel:l}))),Object(a.createElement)(d.a,null,Object(a.createElement)(O,null)))}}}]);