(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[33],{282:function(e,t,n){"use strict";var c=n(13),o=n.n(c),s=n(0),r=n(71),a=n(6),i=n.n(a),u=n(148);n(283),t.a=e=>{let{className:t,showSpinner:n=!1,children:c,variant:a="contained",...b}=e;const l=i()("wc-block-components-button","wp-element-button",t,a,{"wc-block-components-button--loading":n});return Object(s.createElement)(r.a,o()({className:l},b),n&&Object(s.createElement)(u.a,null),Object(s.createElement)("span",{className:"wc-block-components-button__text"},c))}},283:function(e,t){},400:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var c=n(1);const o=Object(c.__)("Proceed to Checkout","woo-gutenberg-products-block")},434:function(e,t,n){"use strict";(function(e){var c=n(0),o=n(6),s=n.n(o),r=n(282),a=n(37),i=n(476),u=n(2),b=n(7),l=n(3),d=(n(436),n(400));t.a=t=>{let{checkoutPageId:n,className:o,buttonLabel:f}=t;const m=Object(u.getSetting)("page-"+n,!1),w=Object(b.useSelect)(e=>e(l.CHECKOUT_STORE_KEY).isCalculating()),[p,v]=Object(i.a)(),[O,j]=Object(c.useState)(!1);Object(c.useEffect)(()=>{if("function"!=typeof e.addEventListener||"function"!=typeof e.removeEventListener)return;const t=()=>{j(!1)};return e.addEventListener("pageshow",t),()=>{e.removeEventListener("pageshow",t)}},[]);const h=Object(c.createElement)(r.a,{className:"wc-block-cart__submit-button",href:m||a.d,disabled:w,onClick:()=>j(!0),showSpinner:O},f||d.a);return Object(c.createElement)("div",{className:s()("wc-block-cart__submit",o)},p,Object(c.createElement)("div",{className:"wc-block-cart__submit-container"},h),"below"===v&&Object(c.createElement)("div",{className:"wc-block-cart__submit-container wc-block-cart__submit-container--sticky"},h))}}).call(this,n(435))},435:function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},436:function(e,t){},476:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c=n(0);const o={bottom:0,left:0,opacity:0,pointerEvents:"none",position:"absolute",right:0,top:0,zIndex:-1},s=()=>{const[e,t]=Object(c.useState)(""),n=Object(c.useRef)(null),s=Object(c.useRef)(new IntersectionObserver(e=>{e[0].isIntersecting?t("visible"):t(e[0].boundingClientRect.top>0?"below":"above")},{threshold:1}));return Object(c.useLayoutEffect)(()=>{const e=n.current,t=s.current;return e&&t.observe(e),()=>{t.unobserve(e)}},[]),[Object(c.createElement)("div",{"aria-hidden":!0,ref:n,style:o}),e]}},513:function(e,t,n){"use strict";n.r(t);var c=n(135),o=n(434),s={checkoutPageId:{type:"number",default:0},lock:{type:"object",default:{move:!0,remove:!0}},buttonLabel:{type:"string",default:n(400).a}};t.default=Object(c.withFilteredAttributes)(s)(o.a)}}]);