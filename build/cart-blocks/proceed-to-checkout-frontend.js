(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[33],{148:function(e,t,c){"use strict";var n=c(13),o=c.n(n),a=c(0),r=c(74),s=c(5),u=c.n(s),i=c(116);c(223),t.a=e=>{let{className:t,showSpinner:c=!1,children:n,variant:s="contained",...l}=e;const b=u()("wc-block-components-button","wp-element-button",t,s,{"wc-block-components-button--loading":c});return Object(a.createElement)(r.a,o()({className:b},l),c&&Object(a.createElement)(i.a,null),Object(a.createElement)("span",{className:"wc-block-components-button__text"},n))}},223:function(e,t){},408:function(e,t,c){"use strict";c.d(t,"a",(function(){return o}));var n=c(1);const o=Object(n.__)("Proceed to Checkout","woo-gutenberg-products-block")},443:function(e,t,c){"use strict";(function(e){var n=c(0),o=c(5),a=c.n(o),r=c(148),s=c(26),u=c(476),i=c(2),l=c(4),b=c(3),d=c(9),m=c(37),p=c(275),f=c(408);t.a=t=>{let{checkoutPageId:c,className:o,buttonLabel:w}=t;const O=Object(i.getSetting)("page-"+c,!1),k=Object(l.useSelect)(e=>e(b.CHECKOUT_STORE_KEY).isCalculating()),[h,j]=Object(u.a)(),[v,g]=Object(n.useState)(!1);Object(n.useEffect)(()=>{if("function"!=typeof e.addEventListener||"function"!=typeof e.removeEventListener)return;const t=()=>{g(!1)};return e.addEventListener("pageshow",t),()=>{e.removeEventListener("pageshow",t)}},[]);const E=Object(l.useSelect)(e=>e(b.CART_STORE_KEY).getCartData()),_=Object(d.applyCheckoutFilter)({filterName:"proceedToCheckoutButtonLabel",defaultValue:w||f.a,arg:{cart:E}}),y=Object(d.applyCheckoutFilter)({filterName:"proceedToCheckoutButtonLink",defaultValue:O||s.d,arg:{cart:E}}),{dispatchOnProceedToCheckout:C}=Object(p.b)(),N=Object(n.createElement)(r.a,{className:"wc-block-cart__submit-button",href:y,disabled:k,onClick:e=>{C().then(t=>{t.some(m.b)?e.preventDefault():g(!0)})},showSpinner:v},_),S=Object(n.useMemo)(()=>getComputedStyle(document.body).backgroundColor,[]);return Object(n.createElement)("div",{className:a()("wc-block-cart__submit",o)},h,Object(n.createElement)("div",{className:"wc-block-cart__submit-container"},N),"below"===j&&Object(n.createElement)("div",{className:"wc-block-cart__submit-container wc-block-cart__submit-container--sticky",style:{backgroundColor:S}},N))}}).call(this,c(444))},444:function(e,t){var c;c=function(){return this}();try{c=c||new Function("return this")()}catch(e){"object"==typeof window&&(c=window)}e.exports=c},476:function(e,t,c){"use strict";c.d(t,"a",(function(){return a}));var n=c(0);const o={bottom:0,left:0,opacity:0,pointerEvents:"none",position:"absolute",right:0,top:0,zIndex:-1},a=()=>{const[e,t]=Object(n.useState)(""),c=Object(n.useRef)(null),a=Object(n.useRef)(new IntersectionObserver(e=>{e[0].isIntersecting?t("visible"):t(e[0].boundingClientRect.top>0?"below":"above")},{threshold:1}));return Object(n.useLayoutEffect)(()=>{const e=c.current,t=a.current;return e&&t.observe(e),()=>{t.unobserve(e)}},[]),[Object(n.createElement)("div",{"aria-hidden":!0,ref:c,style:o}),e]}},515:function(e,t,c){"use strict";c.r(t);var n=c(147),o=c(443),a={checkoutPageId:{type:"number",default:0},lock:{type:"object",default:{move:!0,remove:!0}},buttonLabel:{type:"string",default:c(408).a}};t.default=Object(n.withFilteredAttributes)(a)(o.a)}}]);