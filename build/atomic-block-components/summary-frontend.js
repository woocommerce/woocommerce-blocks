(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[11],{146:function(t,e,c){"use strict";var n=c(0),r=c(105),o=c(87),a=function(t){var e=t.indexOf("</p>");return-1===e?t:t.substr(0,e+4)},u=function(t){return t.replace(/<\/?[a-z][^>]*?>/gi,"")},s=function(t,e){return t.replace(/[\s|\.\,]+$/i,"")+e},i=function(t,e){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"&hellip;",n=u(t),r=n.split(" ").splice(0,e).join(" ");return Object(o.autop)(s(r,c))},l=function(t,e){var c=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"&hellip;",r=u(t),a=r.slice(0,e);if(c)return Object(o.autop)(s(a,n));var i=a.match(/([\s]+)/g),l=i?i.length:0,p=r.slice(0,e+l);return Object(o.autop)(s(p,n))};e.a=function(t){var e=t.source,c=t.maxLength,u=void 0===c?15:c,s=t.countType,p=void 0===s?"words":s,d=t.className,m=void 0===d?"":d,v=Object(n.useMemo)((function(){return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:15,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"words",n=Object(o.autop)(t),u=Object(r.count)(n,c);if(u<=e)return n;var s=a(n),p=Object(r.count)(s,c);return p<=e?s:"words"===c?i(s,e):l(s,e,"characters_including_spaces"===c)}(e,u,p)}),[e,u,p]);return React.createElement(n.RawHTML,{className:m},v)}},300:function(t,e){},310:function(t,e,c){"use strict";c.r(e);var n=c(7),r=c.n(n),o=(c(3),c(4)),a=c.n(o),u=c(146),s=c(13),i=c(81),l=c(208);c(300);e.default=Object(l.withProductDataContext)((function(t){var e=t.className,c=Object(i.useInnerBlockLayoutContext)().parentClassName,n=Object(i.useProductDataContext)().product;if(!n)return React.createElement("div",{className:a()(e,"wc-block-components-product-summary",r()({},"".concat(c,"__product-summary"),c))});var o=n.short_description?n.short_description:n.description;return o?React.createElement(u.a,{className:a()(e,"wc-block-components-product-summary",r()({},"".concat(c,"__product-summary"),c)),source:o,maxLength:150,countType:s.k.wordCountType||"words"}):null}))}}]);