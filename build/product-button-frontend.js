(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[73,75],{25:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return c}));const o=t=>!(t=>null===t)(t)&&t instanceof Object&&t.constructor===Object;function c(t,e){return o(t)&&e in t}},254:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var o=function(){return(o=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var c in e=arguments[n])Object.prototype.hasOwnProperty.call(e,c)&&(t[c]=e[c]);return t}).apply(this,arguments)};Object.create,Object.create},255:function(t,e,n){"use strict";function o(t){return t.toLowerCase()}n.d(e,"a",(function(){return a}));var c=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],r=/[^A-Z0-9]+/gi;function a(t,e){void 0===e&&(e={});for(var n=e.splitRegexp,a=void 0===n?c:n,i=e.stripRegexp,s=void 0===i?r:i,u=e.transform,d=void 0===u?o:u,b=e.delimiter,f=void 0===b?" ":b,p=l(l(t,a,"$1\0$2"),s,"\0"),m=0,v=p.length;"\0"===p.charAt(m);)m++;for(;"\0"===p.charAt(v-1);)v--;return p.slice(m,v).split("\0").map(d).join(f)}function l(t,e,n){return e instanceof RegExp?t.replace(e,n):e.reduce((function(t,e){return t.replace(e,n)}),t)}},263:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var o=n(254),c=n(255);function r(t,e){return void 0===e&&(e={}),function(t,e){return void 0===e&&(e={}),Object(c.a)(t,Object(o.a)({delimiter:"."},e))}(t,Object(o.a)({delimiter:"-"},e))}},264:function(t,e,n){"use strict";n.d(e,"a",(function(){return b}));var o=n(6),c=n.n(o),r=n(25),a=n(34);const l=t=>Object(a.a)(t)?JSON.parse(t)||{}:Object(r.a)(t)?t:{};var i=n(263),s=n(100);function u(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const e={};return Object(s.getCSSRules)(t,{selector:""}).forEach(t=>{e[t.key]=t.value}),e}function d(t,e){return t&&e?`has-${Object(i.a)(e)}-${t}`:""}const b=t=>{const e=Object(r.a)(t)?t:{style:{}},n=l(e.style),o=function(t){var e,n,o,a,l,i,s;const{backgroundColor:b,textColor:f,gradient:p,style:m}=t,v=d("background-color",b),g=d("color",f),y=function(t){if(t)return`has-${t}-gradient-background`}(p),O=y||(null==m||null===(e=m.color)||void 0===e?void 0:e.gradient);return{className:c()(g,y,{[v]:!O&&!!v,"has-text-color":f||(null==m||null===(n=m.color)||void 0===n?void 0:n.text),"has-background":b||(null==m||null===(o=m.color)||void 0===o?void 0:o.background)||p||(null==m||null===(a=m.color)||void 0===a?void 0:a.gradient),"has-link-color":Object(r.a)(null==m||null===(l=m.elements)||void 0===l?void 0:l.link)?null==m||null===(i=m.elements)||void 0===i||null===(s=i.link)||void 0===s?void 0:s.color:void 0})||void 0,style:u({color:(null==m?void 0:m.color)||{}})}}({...e,style:n}),i=function(t){var e;const n=(null===(e=t.style)||void 0===e?void 0:e.border)||{};return{className:function(t){var e;const{borderColor:n,style:o}=t,r=n?d("border-color",n):"";return c()({"has-border-color":n||(null==o||null===(e=o.border)||void 0===e?void 0:e.color),borderColorClass:r})}(t)||void 0,style:u({border:n})}}({...e,style:n}),s=function(t){const{style:e}=t;return{className:void 0,style:u({spacing:(null==e?void 0:e.spacing)||{}})}}({...e,style:n}),b=(t=>{const e=l(t.style),n=Object(r.a)(e.typography)?e.typography:{},o=Object(a.a)(n.fontFamily)?n.fontFamily:"";return{className:t.fontFamily?`has-${t.fontFamily}-font-family`:o,style:{fontSize:t.fontSize?`var(--wp--preset--font-size--${t.fontSize})`:n.fontSize,fontStyle:n.fontStyle,fontWeight:n.fontWeight,letterSpacing:n.letterSpacing,lineHeight:n.lineHeight,textDecoration:n.textDecoration,textTransform:n.textTransform}}})(e);return{className:c()(b.className,o.className,i.className,s.className),style:{...b.style,...o.style,...i.style,...s.style}}}},344:function(t,e){},369:function(t,e,n){"use strict";n.r(e),n.d(e,"Block",(function(){return O}));var o=n(9),c=n.n(o),r=n(0),a=n(6),l=n.n(a),i=n(1),s=n(53),u=n(370),d=n(264),b=n(20),f=n(56),p=n(2),m=n(46),v=n(113);n(344);const g=t=>{let{product:e,className:n,style:o,textAlign:a}=t;const{id:d,permalink:m,add_to_cart:v,has_options:g,is_purchasable:y,is_in_stock:O}=e,{dispatchStoreEvent:j}=Object(s.a)(),{cartQuantity:h,addingToCart:k,addToCart:_}=Object(u.a)(d),w=Number.isFinite(h)&&h>0,N=!g&&y&&O,x=Object(b.decodeEntities)((null==v?void 0:v.description)||""),C=w?Object(i.sprintf)(
/* translators: %s number of products in cart. */
Object(i._n)("%d in cart","%d in cart",h,"woo-gutenberg-products-block"),h):Object(b.decodeEntities)((null==v?void 0:v.text)||Object(i.__)("Add to cart","woo-gutenberg-products-block")),S=N?"button":"a",E={};return N?E.onClick=async()=>{await _(),j("cart-add-item",{product:e});const{cartRedirectAfterAdd:t}=Object(p.getSetting)("productsSettings");t&&(window.location.href=f.c)}:(E.href=m,E.rel="nofollow",E.onClick=()=>{j("product-view-link",{product:e})}),Object(r.createElement)(S,c()({},E,{"aria-label":x,disabled:k,className:l()(n,"wp-block-button__link","wp-element-button","add_to_cart_button","wc-block-components-product-button__button",{loading:k,added:w},{["has-text-align-"+a]:a}),style:o}),C)},y=t=>{let{className:e,style:n}=t;return Object(r.createElement)("button",{className:l()("wp-block-button__link","wp-element-button","add_to_cart_button","wc-block-components-product-button__button","wc-block-components-product-button__button--placeholder",e),style:n,disabled:!0})},O=t=>{const{className:e,textAlign:n}=t,o=Object(d.a)(t),{parentClassName:c}=Object(m.useInnerBlockLayoutContext)(),{product:a}=Object(m.useProductDataContext)();return Object(r.createElement)("div",{className:l()(e,"wp-block-button","wc-block-components-product-button",{[c+"__product-add-to-cart"]:c},{["has-text-align-"+n]:n})},a.id?Object(r.createElement)(g,{product:a,style:o.style,className:o.className}):Object(r.createElement)(y,{style:o.style,className:o.className}))};e.default=Object(v.withProductDataContext)(O)},370:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var o=n(0),c=n(5),r=n(3),a=n(20),l=n(30);const i=(t,e)=>{const n=t.find(t=>{let{id:n}=t;return n===e});return n?n.quantity:0},s=t=>{const{addItemToCart:e}=Object(c.useDispatch)(r.CART_STORE_KEY),{cartItems:n,cartIsLoading:s}=Object(l.a)(),{createErrorNotice:u,removeNotice:d}=Object(c.useDispatch)("core/notices"),[b,f]=Object(o.useState)(!1),p=Object(o.useRef)(i(n,t));return Object(o.useEffect)(()=>{const e=i(n,t);e!==p.current&&(p.current=e)},[n,t]),{cartQuantity:Number.isFinite(p.current)?p.current:0,addingToCart:b,cartIsLoading:s,addToCart:function(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return f(!0),e(t,n).then(()=>{d("add-to-cart")}).catch(t=>{u(Object(a.decodeEntities)(t.message),{id:"add-to-cart",context:"wc/all-products",isDismissible:!0})}).finally(()=>{f(!1)})}}}}}]);