(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[32],{132:function(e,t,c){"use strict";c.d(t,"a",(function(){return l}));var a=c(5),n=c(56),s=c(33),r=c(98);const l=e=>{if(!Object(n.b)())return{className:"",style:{}};const t=Object(s.a)(e)?e:{},c=Object(r.a)(t.style);return Object(a.__experimentalUseBorderProps)({...t,style:c})}},141:function(e,t,c){"use strict";c.r(t),c.d(t,"Block",(function(){return m}));var a=c(0),n=c(1),s=c(4),r=c.n(s),l=c(29),o=c(22),u=c(132),b=c(99),d=c(88),p=c(131),i=c(44);c(249);const m=e=>{const{className:t,align:c}=e,{parentClassName:s}=Object(o.useInnerBlockLayoutContext)(),{product:i}=Object(o.useProductDataContext)(),m=Object(u.a)(e),j=Object(b.a)(e),O=Object(d.a)(e),w=Object(p.a)(e);if(!i.id||!i.on_sale)return null;const f="string"==typeof c?"wc-block-components-product-sale-badge--align-"+c:"";return Object(a.createElement)("div",{className:r()("wc-block-components-product-sale-badge",t,f,{[s+"__product-onsale"]:s},j.className,m.className),style:{...j.style,...m.style,...O.style,...w.style}},Object(a.createElement)(l.a,{label:Object(n.__)("Sale","woo-gutenberg-products-block"),screenReaderLabel:Object(n.__)("Product on sale","woo-gutenberg-products-block")}))};t.default=Object(i.withProductDataContext)(m)},249:function(e,t){},29:function(e,t,c){"use strict";var a=c(0),n=c(4),s=c.n(n);t.a=e=>{let t,{label:c,screenReaderLabel:n,wrapperElement:r,wrapperProps:l={}}=e;const o=null!=c,u=null!=n;return!o&&u?(t=r||"span",l={...l,className:s()(l.className,"screen-reader-text")},Object(a.createElement)(t,l,n)):(t=r||a.Fragment,o&&u&&c!==n?Object(a.createElement)(t,l,Object(a.createElement)("span",{"aria-hidden":"true"},c),Object(a.createElement)("span",{className:"screen-reader-text"},n)):Object(a.createElement)(t,l,c))}}}]);