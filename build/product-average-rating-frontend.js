(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[73,79],{19:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return c}));var o=n(37);const r=t=>!Object(o.a)(t)&&t instanceof Object&&t.constructor===Object;function c(t,e){return r(t)&&e in t}},28:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));const o=t=>"string"==typeof t},287:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var o=function(){return o=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},o.apply(this,arguments)};Object.create,Object.create,"function"==typeof SuppressedError&&SuppressedError},288:function(t,e,n){"use strict";function o(t){return t.toLowerCase()}n.d(e,"a",(function(){return i}));var r=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],c=/[^A-Z0-9]+/gi;function i(t,e){void 0===e&&(e={});for(var n=e.splitRegexp,i=void 0===n?r:n,a=e.stripRegexp,s=void 0===a?c:a,u=e.transform,d=void 0===u?o:u,f=e.delimiter,v=void 0===f?" ":f,b=l(l(t,i,"$1\0$2"),s,"\0"),g=0,p=b.length;"\0"===b.charAt(g);)g++;for(;"\0"===b.charAt(p-1);)p--;return b.slice(g,p).split("\0").map(d).join(v)}function l(t,e,n){return e instanceof RegExp?t.replace(e,n):e.reduce((function(t,e){return t.replace(e,n)}),t)}},291:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var o=n(287),r=n(288);function c(t,e){return void 0===e&&(e={}),function(t,e){return void 0===e&&(e={}),Object(r.a)(t,Object(o.a)({delimiter:"."},e))}(t,Object(o.a)({delimiter:"-"},e))}},293:function(t,e,n){"use strict";n.d(e,"a",(function(){return d}));var o=n(4),r=n.n(o),c=n(19),i=n(28),l=n(291),a=n(131);function s(t={}){const e={};return Object(a.getCSSRules)(t,{selector:""}).forEach((t=>{e[t.key]=t.value})),e}function u(t,e){return t&&e?`has-${Object(l.a)(e)}-${t}`:""}const d=t=>{const e=(t=>{const e=Object(c.a)(t)?t:{style:{}};let n=e.style;return Object(i.a)(n)&&(n=JSON.parse(n)||{}),Object(c.a)(n)||(n={}),{...e,style:n}})(t),n=function(t){var e,n,o,i,l,a,d;const{backgroundColor:f,textColor:v,gradient:b,style:g}=t,p=u("background-color",f),y=u("color",v),m=function(t){if(t)return`has-${t}-gradient-background`}(b),O=m||(null==g||null===(e=g.color)||void 0===e?void 0:e.gradient);return{className:r()(y,m,{[p]:!O&&!!p,"has-text-color":v||(null==g||null===(n=g.color)||void 0===n?void 0:n.text),"has-background":f||(null==g||null===(o=g.color)||void 0===o?void 0:o.background)||b||(null==g||null===(i=g.color)||void 0===i?void 0:i.gradient),"has-link-color":Object(c.a)(null==g||null===(l=g.elements)||void 0===l?void 0:l.link)?null==g||null===(a=g.elements)||void 0===a||null===(d=a.link)||void 0===d?void 0:d.color:void 0}),style:s({color:(null==g?void 0:g.color)||{}})}}(e),o=function(t){var e;const n=(null===(e=t.style)||void 0===e?void 0:e.border)||{};return{className:function(t){var e;const{borderColor:n,style:o}=t,c=n?u("border-color",n):"";return r()({"has-border-color":!!n||!(null==o||null===(e=o.border)||void 0===e||!e.color),[c]:!!c})}(t),style:s({border:n})}}(e),l=function(t){var e;return{className:void 0,style:s({spacing:(null===(e=t.style)||void 0===e?void 0:e.spacing)||{}})}}(e),a=(t=>{const e=Object(c.a)(t.style.typography)?t.style.typography:{},n=Object(i.a)(e.fontFamily)?e.fontFamily:"";return{className:t.fontFamily?`has-${t.fontFamily}-font-family`:n,style:{fontSize:t.fontSize?`var(--wp--preset--font-size--${t.fontSize})`:e.fontSize,fontStyle:e.fontStyle,fontWeight:e.fontWeight,letterSpacing:e.letterSpacing,lineHeight:e.lineHeight,textDecoration:e.textDecoration,textTransform:e.textTransform}}})(e);return{className:r()(a.className,n.className,o.className,l.className),style:{...a.style,...n.style,...o.style,...l.style}}}},37:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));const o=t=>null===t},469:function(t,e,n){"use strict";n.r(e),n.d(e,"Block",(function(){return u}));var o=n(0),r=n(4),c=n.n(r),i=n(59),l=n(293),a=n(1),s=n(144);const u=t=>{const{textAlign:e}=t,n=Object(l.a)(t),{product:r}=Object(i.useProductDataContext)(),s=c()(n.className,"wc-block-components-product-average-rating",{[`has-text-align-${e}`]:e});return Object(o.createElement)("div",{className:s,style:n.style},Number(r.average_rating)>0?r.average_rating:Object(a.__)("No ratings","woo-gutenberg-products-block"))};e.default=Object(s.withProductDataContext)(u)}}]);