(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[69],{284:function(t,e,o){"use strict";o.d(e,"a",(function(){return n}));var n=function(){return(n=Object.assign||function(t){for(var e,o=1,n=arguments.length;o<n;o++)for(var r in e=arguments[o])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.create,Object.create},285:function(t,e,o){"use strict";function n(t){return t.toLowerCase()}o.d(e,"a",(function(){return c}));var r=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],l=/[^A-Z0-9]+/gi;function c(t,e){void 0===e&&(e={});for(var o=e.splitRegexp,c=void 0===o?r:o,i=e.stripRegexp,s=void 0===i?l:i,u=e.transform,d=void 0===u?n:u,f=e.delimiter,v=void 0===f?" ":f,b=a(a(t,c,"$1\0$2"),s,"\0"),y=0,g=b.length;"\0"===b.charAt(y);)y++;for(;"\0"===b.charAt(g-1);)g--;return b.slice(y,g).split("\0").map(d).join(v)}function a(t,e,o){return e instanceof RegExp?t.replace(e,o):e.reduce((function(t,e){return t.replace(e,o)}),t)}},288:function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var n=o(284),r=o(285);function l(t,e){return void 0===e&&(e={}),function(t,e){return void 0===e&&(e={}),Object(r.a)(t,Object(n.a)({delimiter:"."},e))}(t,Object(n.a)({delimiter:"-"},e))}},290:function(t,e,o){"use strict";o.d(e,"a",(function(){return d}));var n=o(5),r=o.n(n),l=o(21),c=o(28),a=o(288),i=o(132);function s(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const e={};return Object(i.getCSSRules)(t,{selector:""}).forEach(t=>{e[t.key]=t.value}),e}function u(t,e){return t&&e?`has-${Object(a.a)(e)}-${t}`:""}const d=t=>{const e=(t=>{const e=Object(l.a)(t)?t:{style:{}};let o=e.style;return Object(c.a)(o)&&(o=JSON.parse(o)||{}),Object(l.a)(o)||(o={}),{...e,style:o}})(t),o=function(t){var e,o,n,c,a,i,d;const{backgroundColor:f,textColor:v,gradient:b,style:y}=t,g=u("background-color",f),p=u("color",v),m=function(t){if(t)return`has-${t}-gradient-background`}(b),h=m||(null==y||null===(e=y.color)||void 0===e?void 0:e.gradient);return{className:r()(p,m,{[g]:!h&&!!g,"has-text-color":v||(null==y||null===(o=y.color)||void 0===o?void 0:o.text),"has-background":f||(null==y||null===(n=y.color)||void 0===n?void 0:n.background)||b||(null==y||null===(c=y.color)||void 0===c?void 0:c.gradient),"has-link-color":Object(l.a)(null==y||null===(a=y.elements)||void 0===a?void 0:a.link)?null==y||null===(i=y.elements)||void 0===i||null===(d=i.link)||void 0===d?void 0:d.color:void 0}),style:s({color:(null==y?void 0:y.color)||{}})}}(e),n=function(t){var e;const o=(null===(e=t.style)||void 0===e?void 0:e.border)||{};return{className:function(t){var e;const{borderColor:o,style:n}=t,l=o?u("border-color",o):"";return r()({"has-border-color":o||(null==n||null===(e=n.border)||void 0===e?void 0:e.color),borderColorClass:l})}(t),style:s({border:o})}}(e),a=function(t){var e;return{className:void 0,style:s({spacing:(null===(e=t.style)||void 0===e?void 0:e.spacing)||{}})}}(e),i=(t=>{const e=Object(l.a)(t.style.typography)?t.style.typography:{},o=Object(c.a)(e.fontFamily)?e.fontFamily:"";return{className:t.fontFamily?`has-${t.fontFamily}-font-family`:o,style:{fontSize:t.fontSize?`var(--wp--preset--font-size--${t.fontSize})`:e.fontSize,fontStyle:e.fontStyle,fontWeight:e.fontWeight,letterSpacing:e.letterSpacing,lineHeight:e.lineHeight,textDecoration:e.textDecoration,textTransform:e.textTransform}}})(e);return{className:r()(i.className,o.className,n.className,a.className),style:{...i.style,...o.style,...n.style,...a.style}}}},419:function(t,e,o){"use strict";o.r(e);var n=o(0),r=o(290),l=o(5),c=o.n(l),a=o(1);const i=Object(a.__)("Your cart","woo-gutenberg-products-block");e.default=t=>{const e=Object(r.a)(t);return Object(n.createElement)("span",{className:c()(t.className,e.className),style:e.style},t.label||i)}}}]);