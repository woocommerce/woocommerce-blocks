(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[77],{115:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n(53);var c=n(37);const o=()=>c.n>1},116:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var c=n(23),o=n(20);const r=t=>Object(c.a)(t)?JSON.parse(t)||{}:Object(o.a)(t)?t:{}},20:function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return o}));const c=t=>!(t=>null===t)(t)&&t instanceof Object&&t.constructor===Object;function o(t,e){return c(t)&&e in t}},285:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var c=n(66),o=n(115),r=n(20),s=n(116);const a=t=>{if(!Object(o.a)())return{className:"",style:{}};const e=Object(r.a)(t)?t:{},n=Object(s.a)(e.style);return Object(c.__experimentalUseColorProps)({...e,style:n})}},289:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var c=n(20),o=n(116);const r=t=>{const e=Object(c.a)(t)?t:{},n=Object(o.a)(e.style),r=Object(c.a)(n.typography)?n.typography:{};return{style:{fontSize:e.fontSize?`var(--wp--preset--font-size--${e.fontSize})`:r.fontSize,lineHeight:r.lineHeight,fontWeight:r.fontWeight,fontStyle:r.fontStyle,textTransform:r.textTransform,fontFamily:e.fontFamily}}}},338:function(t,e,n){"use strict";var c=n(0),o=n(132),r=n(133);const s=t=>{const e=t.indexOf("</p>");return-1===e?t:t.substr(0,e+4)},a=t=>t.replace(/<\/?[a-z][^>]*?>/gi,""),i=(t,e)=>t.replace(/[\s|\.\,]+$/i,"")+e,u=function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"&hellip;";const c=a(t),o=c.split(" ").splice(0,e).join(" ");return Object(r.autop)(i(o,n))},l=function(t,e){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"&hellip;";const o=a(t),s=o.slice(0,e);if(n)return Object(r.autop)(i(s,c));const u=s.match(/([\s]+)/g),l=u?u.length:0,p=o.slice(0,e+l);return Object(r.autop)(i(p,c))};e.a=t=>{let{source:e,maxLength:n=15,countType:a="words",className:i="",style:p={}}=t;const f=Object(c.useMemo)(()=>function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:15,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"words";const c=Object(r.autop)(t),a=Object(o.count)(c,n);if(a<=e)return c;const i=s(c),p=Object(o.count)(i,n);return p<=e?i:"words"===n?u(i,e):l(i,e,"characters_including_spaces"===n)}(e,n,a),[e,n,a]);return Object(c.createElement)(c.RawHTML,{style:p,className:i},f)}},416:function(t,e){},463:function(t,e,n){"use strict";n.r(e);var c=n(0),o=n(6),r=n.n(o),s=n(338),a=n(37),i=n(52),u=n(285),l=n(289),p=n(137);n(416),e.default=Object(p.withProductDataContext)(t=>{const{className:e}=t,{parentClassName:n}=Object(i.useInnerBlockLayoutContext)(),{product:o}=Object(i.useProductDataContext)(),p=Object(u.a)(t),f=Object(l.a)(t);if(!o)return Object(c.createElement)("div",{className:r()(e,"wc-block-components-product-summary",{[n+"__product-summary"]:n})});const b=o.short_description?o.short_description:o.description;return b?Object(c.createElement)(s.a,{className:r()(e,p.className,"wc-block-components-product-summary",{[n+"__product-summary"]:n}),source:b,maxLength:150,countType:a.o.wordCountType||"words",style:{...p.style,...f.style}}):null})},6:function(t,e,n){var c;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var t=[],e=0;e<arguments.length;e++){var c=arguments[e];if(c){var r=typeof c;if("string"===r||"number"===r)t.push(c);else if(Array.isArray(c)){if(c.length){var s=o.apply(null,c);s&&t.push(s)}}else if("object"===r)if(c.toString===Object.prototype.toString)for(var a in c)n.call(c,a)&&c[a]&&t.push(a);else t.push(c.toString())}}return t.join(" ")}t.exports?(o.default=o,t.exports=o):void 0===(c=function(){return o}.apply(e,[]))||(t.exports=c)}()}}]);