(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[40],{908:function(e,t,c){"use strict";(function(e){var n=c(0),o=c(4),a=c.n(o),r=c(79),s=c(21),i=c(924),u=c(2),l=c(8),b=c(10),d=c(13),f=c(54),p=c(424),O=c(360);t.a=t=>{let{checkoutPageId:c,className:o,buttonLabel:m}=t;const j=Object(u.getSetting)("page-"+c,!1),k=Object(l.useSelect)(e=>e(b.CHECKOUT_STORE_KEY).isCalculating()),[v,h]=Object(i.a)(),[w,E]=Object(n.useState)(!1);Object(n.useEffect)(()=>{if("function"!=typeof e.addEventListener||"function"!=typeof e.removeEventListener)return;const t=()=>{E(!1)};return e.addEventListener("pageshow",t),()=>{e.removeEventListener("pageshow",t)}},[]);const g=Object(l.useSelect)(e=>e(b.CART_STORE_KEY).getCartData()),C=Object(d.applyCheckoutFilter)({filterName:"proceedToCheckoutButtonLabel",defaultValue:m||O.a,arg:{cart:g}}),_=Object(d.applyCheckoutFilter)({filterName:"proceedToCheckoutButtonLink",defaultValue:j||s.f,arg:{cart:g}}),{dispatchOnProceedToCheckout:y}=Object(p.b)(),S=Object(n.createElement)(r.a,{className:"wc-block-cart__submit-button",href:_,disabled:k,onClick:e=>{y().then(t=>{t.some(f.b)?e.preventDefault():E(!0)})},showSpinner:w},C),L=Object(n.useMemo)(()=>getComputedStyle(document.body).backgroundColor,[]);return Object(n.createElement)("div",{className:a()("wc-block-cart__submit",o)},v,Object(n.createElement)("div",{className:"wc-block-cart__submit-container"},S),"below"===h&&Object(n.createElement)("div",{className:"wc-block-cart__submit-container wc-block-cart__submit-container--sticky",style:{backgroundColor:L}},S))}}).call(this,c(909))},923:function(e,t,c){"use strict";c.r(t);var n=c(65),o=c(908),a=c(476);t.default=Object(n.withFilteredAttributes)(a.a)(o.a)},924:function(e,t,c){"use strict";c.d(t,"a",(function(){return a}));var n=c(0);const o={bottom:0,left:0,opacity:0,pointerEvents:"none",position:"absolute",right:0,top:0,zIndex:-1},a=()=>{const[e,t]=Object(n.useState)(""),c=Object(n.useRef)(null),a=Object(n.useRef)(new IntersectionObserver(e=>{e[0].isIntersecting?t("visible"):t(e[0].boundingClientRect.top>0?"below":"above")},{threshold:1}));Object(n.useLayoutEffect)(()=>{const e=c.current,t=a.current;return e&&t.observe(e),()=>{t.unobserve(e)}},[]);return[Object(n.createElement)("div",{"aria-hidden":!0,ref:c,style:o}),e]}}}]);