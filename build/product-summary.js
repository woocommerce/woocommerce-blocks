(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[42],{133:function(t,e,c){"use strict";var n=c(0),o=c(52),s=c(285),r=c(103);const u=t=>{const e=t.indexOf("</p>");return-1===e?t:t.substr(0,e+4)};e.a=t=>{let{source:e,maxLength:c=15,countType:a="words",className:i="",style:l={}}=t;const p=Object(n.useMemo)(()=>function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:15,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"words";const n=Object(o.autop)(t),a=Object(r.count)(n,c);if(a<=e)return n;const i=u(n),l=Object(r.count)(i,c);return l<=e?i:"words"===c?Object(s.b)(i,e):Object(s.a)(i,e,"characters_including_spaces"===c)}(e,c,a),[e,c,a]);return Object(n.createElement)(n.RawHTML,{style:l,className:i},p)}},285:function(t,e,c){"use strict";c.d(e,"b",(function(){return r})),c.d(e,"a",(function(){return u}));var n=c(52);const o=t=>t.replace(/<\/?[a-z][^>]*?>/gi,""),s=(t,e)=>t.replace(/[\s|\.\,]+$/i,"")+e,r=function(t,e){let c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"&hellip;",r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];const u=o(t),a=u.split(" ").splice(0,e).join(" ");return a===u?r?Object(n.autop)(u):u:r?Object(n.autop)(s(a,c)):s(a,c)},u=function(t,e){let c=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"&hellip;",u=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];const a=o(t),i=a.slice(0,e);if(i===a)return u?Object(n.autop)(a):a;if(c)return Object(n.autop)(s(i,r));const l=i.match(/([\s]+)/g),p=l?l.length:0,d=a.slice(0,e+p);return u?Object(n.autop)(s(d,r)):s(d,r)}},358:function(t,e,c){"use strict";c.r(e);var n=c(0),o=c(4),s=c.n(o),r=c(133),u=c(18),a=c(25),i=c(86),l=c(50);c(390),e.default=Object(l.withProductDataContext)(t=>{const{className:e}=t,{parentClassName:c}=Object(a.useInnerBlockLayoutContext)(),{product:o}=Object(a.useProductDataContext)(),l=Object(i.a)(t);if(!o)return Object(n.createElement)("div",{className:s()(e,"wc-block-components-product-summary",{[c+"__product-summary"]:c})});const p=o.short_description?o.short_description:o.description;return p?Object(n.createElement)(r.a,{className:s()(e,l.className,"wc-block-components-product-summary",{[c+"__product-summary"]:c}),source:p,maxLength:150,countType:u.p.wordCountType||"words",style:l.style}):null})},390:function(t,e){}}]);