(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[69],{252:function(t,e,o){"use strict";o.d(e,"a",(function(){return n}));var n=function(){return(n=Object.assign||function(t){for(var e,o=1,n=arguments.length;o<n;o++)for(var r in e=arguments[o])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.create,Object.create},253:function(t,e,o){"use strict";function n(t){return t.toLowerCase()}o.d(e,"a",(function(){return c}));var r=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],l=/[^A-Z0-9]+/gi;function c(t,e){void 0===e&&(e={});for(var o=e.splitRegexp,c=void 0===o?r:o,a=e.stripRegexp,s=void 0===a?l:a,u=e.transform,d=void 0===u?n:u,f=e.delimiter,v=void 0===f?" ":f,b=i(i(t,c,"$1\0$2"),s,"\0"),y=0,p=b.length;"\0"===b.charAt(y);)y++;for(;"\0"===b.charAt(p-1);)p--;return b.slice(y,p).split("\0").map(d).join(v)}function i(t,e,o){return e instanceof RegExp?t.replace(e,o):e.reduce((function(t,e){return t.replace(e,o)}),t)}},263:function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var n=o(252),r=o(253);function l(t,e){return void 0===e&&(e={}),function(t,e){return void 0===e&&(e={}),Object(r.a)(t,Object(n.a)({delimiter:"."},e))}(t,Object(n.a)({delimiter:"-"},e))}},264:function(t,e,o){"use strict";o.d(e,"a",(function(){return f}));var n=o(6),r=o.n(n),l=o(25),c=o(35);const i=t=>Object(c.a)(t)?JSON.parse(t)||{}:Object(l.a)(t)?t:{};var a=o(263),s=o(99);function u(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const e={};return Object(s.getCSSRules)(t,{selector:""}).forEach(t=>{e[t.key]=t.value}),e}function d(t,e){return t&&e?`has-${Object(a.a)(e)}-${t}`:""}const f=t=>{const e=Object(l.a)(t)?t:{style:{}},o=i(e.style),n=function(t){var e,o,n,c,i,a,s;const{backgroundColor:f,textColor:v,gradient:b,style:y}=t,p=d("background-color",f),g=d("color",v),m=function(t){if(t)return`has-${t}-gradient-background`}(b),h=m||(null==y||null===(e=y.color)||void 0===e?void 0:e.gradient);return{className:r()(g,m,{[p]:!h&&!!p,"has-text-color":v||(null==y||null===(o=y.color)||void 0===o?void 0:o.text),"has-background":f||(null==y||null===(n=y.color)||void 0===n?void 0:n.background)||b||(null==y||null===(c=y.color)||void 0===c?void 0:c.gradient),"has-link-color":Object(l.a)(null==y||null===(i=y.elements)||void 0===i?void 0:i.link)?null==y||null===(a=y.elements)||void 0===a||null===(s=a.link)||void 0===s?void 0:s.color:void 0})||void 0,style:u({color:(null==y?void 0:y.color)||{}})}}({...e,style:o}),a=function(t){var e;const o=(null===(e=t.style)||void 0===e?void 0:e.border)||{};return{className:function(t){var e;const{borderColor:o,style:n}=t,l=o?d("border-color",o):"";return r()({"has-border-color":o||(null==n||null===(e=n.border)||void 0===e?void 0:e.color),borderColorClass:l})}(t)||void 0,style:u({border:o})}}({...e,style:o}),s=function(t){const{style:e}=t;return{className:void 0,style:u({spacing:(null==e?void 0:e.spacing)||{}})}}({...e,style:o}),f=(t=>{const e=i(t.style),o=Object(l.a)(e.typography)?e.typography:{},n=Object(c.a)(o.fontFamily)?o.fontFamily:"";return{className:t.fontFamily?`has-${t.fontFamily}-font-family`:n,style:{fontSize:t.fontSize?`var(--wp--preset--font-size--${t.fontSize})`:o.fontSize,fontStyle:o.fontStyle,fontWeight:o.fontWeight,letterSpacing:o.letterSpacing,lineHeight:o.lineHeight,textDecoration:o.textDecoration,textTransform:o.textTransform}}})(e);return{className:r()(f.className,n.className,a.className,s.className),style:{...f.style,...n.style,...a.style,...s.style}}}},390:function(t,e,o){"use strict";o.r(e);var n=o(0),r=o(30),l=o(6),c=o.n(l),i=o(1),a=o(264);e.default=t=>{const{cartItemsCount:e}=Object(r.a)(),o=Object(a.a)(t);return Object(n.createElement)("span",{className:c()(t.className,o.className),style:o.style},Object(i.sprintf)(
/* translators: %d is the count of items in the cart. */
Object(i._n)("(%d item)","(%d items)",e,"woo-gutenberg-products-block"),e))}}}]);