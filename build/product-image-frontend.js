(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[74,75,77],{255:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var o=function(){return(o=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};Object.create,Object.create},256:function(e,t,n){"use strict";function o(e){return e.toLowerCase()}n.d(t,"a",(function(){return l}));var r=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],c=/[^A-Z0-9]+/gi;function l(e,t){void 0===t&&(t={});for(var n=t.splitRegexp,l=void 0===n?r:n,i=t.stripRegexp,s=void 0===i?c:i,u=t.transform,d=void 0===u?o:u,b=t.delimiter,f=void 0===b?" ":b,g=a(a(e,l,"$1\0$2"),s,"\0"),m=0,p=g.length;"\0"===g.charAt(m);)m++;for(;"\0"===g.charAt(p-1);)p--;return g.slice(m,p).split("\0").map(d).join(f)}function a(e,t,n){return t instanceof RegExp?e.replace(t,n):t.reduce((function(e,t){return e.replace(t,n)}),e)}},264:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var o=n(255),r=n(256);function c(e,t){return void 0===t&&(t={}),function(e,t){return void 0===t&&(t={}),Object(r.a)(e,Object(o.a)({delimiter:"."},t))}(e,Object(o.a)({delimiter:"-"},t))}},265:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var o=n(6),r=n.n(o),c=n(27),l=n(36),a=n(264),i=n(100);function s(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t={};return Object(i.getCSSRules)(e,{selector:""}).forEach(e=>{t[e.key]=e.value}),t}function u(e,t){return e&&t?`has-${Object(a.a)(t)}-${e}`:""}const d=e=>{const t=(e=>{const t=Object(c.a)(e)?e:{style:{}};let n=t.style;return Object(l.a)(n)&&(n=JSON.parse(n)||{}),Object(c.a)(n)||(n={}),{...t,style:n}})(e),n=function(e){var t,n,o,l,a,i,d;const{backgroundColor:b,textColor:f,gradient:g,style:m}=e,p=u("background-color",b),v=u("color",f),y=function(e){if(e)return`has-${e}-gradient-background`}(g),O=y||(null==m||null===(t=m.color)||void 0===t?void 0:t.gradient);return{className:r()(v,y,{[p]:!O&&!!p,"has-text-color":f||(null==m||null===(n=m.color)||void 0===n?void 0:n.text),"has-background":b||(null==m||null===(o=m.color)||void 0===o?void 0:o.background)||g||(null==m||null===(l=m.color)||void 0===l?void 0:l.gradient),"has-link-color":Object(c.a)(null==m||null===(a=m.elements)||void 0===a?void 0:a.link)?null==m||null===(i=m.elements)||void 0===i||null===(d=i.link)||void 0===d?void 0:d.color:void 0}),style:s({color:(null==m?void 0:m.color)||{}})}}(t),o=function(e){var t;const n=(null===(t=e.style)||void 0===t?void 0:t.border)||{};return{className:function(e){var t;const{borderColor:n,style:o}=e,c=n?u("border-color",n):"";return r()({"has-border-color":n||(null==o||null===(t=o.border)||void 0===t?void 0:t.color),borderColorClass:c})}(e),style:s({border:n})}}(t),a=function(e){var t;return{className:void 0,style:s({spacing:(null===(t=e.style)||void 0===t?void 0:t.spacing)||{}})}}(t),i=(e=>{const t=Object(c.a)(e.style.typography)?e.style.typography:{},n=Object(l.a)(t.fontFamily)?t.fontFamily:"";return{className:e.fontFamily?`has-${e.fontFamily}-font-family`:n,style:{fontSize:e.fontSize?`var(--wp--preset--font-size--${e.fontSize})`:t.fontSize,fontStyle:t.fontStyle,fontWeight:t.fontWeight,letterSpacing:t.letterSpacing,lineHeight:t.lineHeight,textDecoration:t.textDecoration,textTransform:t.textTransform}}})(t);return{className:r()(i.className,n.className,o.className,a.className),style:{...i.style,...n.style,...o.style,...a.style}}}},27:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return r}));const o=e=>!(e=>null===e)(e)&&e instanceof Object&&e.constructor===Object;function r(e,t){return o(e)&&t in e}},314:function(e,t,n){"use strict";n.r(t),n.d(t,"Block",(function(){return d}));var o=n(0),r=n(1),c=n(6),l=n.n(c),a=n(26),i=n(47),s=n(265),u=n(113);n(315);const d=e=>{const{className:t,align:n}=e,c=Object(s.a)(e),{parentClassName:u}=Object(i.useInnerBlockLayoutContext)(),{product:d}=Object(i.useProductDataContext)();if(!d.id||!d.on_sale)return null;const b="string"==typeof n?"wc-block-components-product-sale-badge--align-"+n:"";return Object(o.createElement)("div",{className:l()("wc-block-components-product-sale-badge",t,b,{[u+"__product-onsale"]:u},c.className),style:c.style},Object(o.createElement)(a.a,{label:Object(r.__)("Sale","woo-gutenberg-products-block"),screenReaderLabel:Object(r.__)("Product on sale","woo-gutenberg-products-block")}))};t.default=Object(u.withProductDataContext)(d)},315:function(e,t){},316:function(e,t,n){"use strict";let o;n.d(t,"a",(function(){return o})),function(e){e.SINGLE="single",e.THUMBNAIL="thumbnail"}(o||(o={}))},340:function(e,t,n){"use strict";n.d(t,"a",(function(){return y}));var o=n(9),r=n.n(o),c=n(0),l=n(1),a=n(6),i=n.n(a),s=n(2),u=n(47),d=n(265),b=n(113),f=n(54),g=n(314),m=(n(341),n(316));const p=()=>Object(c.createElement)("img",{src:s.PLACEHOLDER_IMG_SRC,alt:"",width:void 0,height:void 0}),v=e=>{let{image:t,loaded:n,showFullSize:o,fallbackAlt:l}=e;const{thumbnail:a,src:i,srcset:s,sizes:u,alt:d}=t||{},b={alt:d||l,hidden:!n,src:a,...o&&{src:i,srcSet:s,sizes:u}};return Object(c.createElement)(c.Fragment,null,b.src&&Object(c.createElement)("img",r()({"data-testid":"product-image"},b)),!t&&Object(c.createElement)(p,null))},y=e=>{const{className:t,imageSizing:n=m.a.SINGLE,showProductLink:o=!0,showSaleBadge:a,saleBadgeAlign:s="right",...b}=e,y=Object(d.a)(e),{parentClassName:O}=Object(u.useInnerBlockLayoutContext)(),{product:j,isLoading:h}=Object(u.useProductDataContext)(),{dispatchStoreEvent:k}=Object(f.a)();if(!j.id)return Object(c.createElement)("div",{className:i()(t,"wc-block-components-product-image",{[O+"__product-image"]:O},y.className),style:y.style},Object(c.createElement)(p,null));const w=!!j.images.length,N=w?j.images[0]:null,S=o?"a":c.Fragment,E=Object(l.sprintf)(
/* translators: %s is referring to the product name */
Object(l.__)("Link to %s","woo-gutenberg-products-block"),j.name),C={href:j.permalink,...!w&&{"aria-label":E},onClick:()=>{k("product-view-link",{product:j})}};return Object(c.createElement)("div",{className:i()(t,"wc-block-components-product-image",{[O+"__product-image"]:O},y.className),style:y.style},Object(c.createElement)(S,o&&C,!!a&&Object(c.createElement)(g.default,r()({align:s},b)),Object(c.createElement)(v,{fallbackAlt:j.name,image:N,loaded:!h,showFullSize:n!==m.a.THUMBNAIL})))};t.b=Object(b.withProductDataContext)(y)},341:function(e,t){},523:function(e,t,n){"use strict";n.r(t);var o=n(113),r=n(340),c={showProductLink:{type:"boolean",default:!0},showSaleBadge:{type:"boolean",default:!0},saleBadgeAlign:{type:"string",default:"right"},imageSizing:{type:"string",default:n(316).a.SINGLE},productId:{type:"number",default:0},isDescendentOfQueryLoop:{type:"boolean",default:!1},isDescendentOfSingleProductBlock:{type:"boolean",default:!1}};t.default=Object(o.withFilteredAttributes)(c)(r.b)}}]);