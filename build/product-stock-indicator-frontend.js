(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[77],{111:function(t,o,c){"use strict";c.d(o,"a",(function(){return r}));var n=c(26),e=c(20);const r=t=>Object(n.a)(t)?JSON.parse(t)||{}:Object(e.a)(t)?t:{}},20:function(t,o,c){"use strict";c.d(o,"a",(function(){return n})),c.d(o,"b",(function(){return e}));const n=t=>!(t=>null===t)(t)&&t instanceof Object&&t.constructor===Object;function e(t,o){return n(t)&&o in t}},280:function(t,o,c){"use strict";c.d(o,"a",(function(){return s}));var n=c(55),e=c(20),r=c(111);const s=t=>{const o=Object(e.a)(t)?t:{},c=Object(r.a)(o.style);return Object(n.__experimentalUseColorProps)({...o,style:c})}},286:function(t,o,c){"use strict";c.d(o,"a",(function(){return s}));var n=c(20),e=c(26),r=c(111);const s=t=>{const o=Object(n.a)(t)?t:{},c=Object(r.a)(o.style),s=Object(n.a)(c.typography)?c.typography:{},a=Object(e.a)(s.fontFamily)?s.fontFamily:"";return{className:o.fontFamily?`has-${o.fontFamily}-font-family`:a,style:{fontSize:o.fontSize?`var(--wp--preset--font-size--${o.fontSize})`:s.fontSize,fontStyle:s.fontStyle,fontWeight:s.fontWeight,letterSpacing:s.letterSpacing,lineHeight:s.lineHeight,textDecoration:s.textDecoration,textTransform:s.textTransform}}}},421:function(t,o){},461:function(t,o,c){"use strict";c.r(o),c.d(o,"Block",(function(){return b}));var n=c(0),e=c(1),r=c(5),s=c.n(r),a=c(58),i=c(280),u=c(286),l=c(142);c(421);const b=t=>{const{className:o}=t,{parentClassName:c}=Object(a.useInnerBlockLayoutContext)(),{product:r}=Object(a.useProductDataContext)(),l=Object(i.a)(t),b=Object(u.a)(t);if(!r.id||!r.is_purchasable)return null;const f=!!r.is_in_stock,p=r.low_stock_remaining,d=r.is_on_backorder;return Object(n.createElement)("div",{className:s()(o,l.className,"wc-block-components-product-stock-indicator",{[c+"__stock-indicator"]:c,"wc-block-components-product-stock-indicator--in-stock":f,"wc-block-components-product-stock-indicator--out-of-stock":!f,"wc-block-components-product-stock-indicator--low-stock":!!p,"wc-block-components-product-stock-indicator--available-on-backorder":!!d}),style:{...l.style,...b.style}},p?(t=>Object(e.sprintf)(
/* translators: %d stock amount (number of items in stock for product) */
Object(e.__)("%d left in stock","woo-gutenberg-products-block"),t))(p):((t,o)=>o?Object(e.__)("Available on backorder","woo-gutenberg-products-block"):t?Object(e.__)("In Stock","woo-gutenberg-products-block"):Object(e.__)("Out of Stock","woo-gutenberg-products-block"))(f,d))};o.default=Object(l.withProductDataContext)(b)}}]);