(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[63],{114:function(t,e,n){"use strict";n.d(e,"a",(function(){return s})),n(103);var r=n(43);const s=()=>r.m>1},136:function(t,e,n){"use strict";n.d(e,"c",(function(){return i})),n.d(e,"d",(function(){return u})),n.d(e,"b",(function(){return l})),n.d(e,"a",(function(){return b}));var r=n(70),s=n(114),c=n(51),o=n(61);const a=t=>Object(c.a)(t)?JSON.parse(t)||{}:Object(o.a)(t)?t:{},i=t=>{if(!Object(s.a)()||"function"!=typeof r.__experimentalGetSpacingClassesAndStyles)return{style:{}};const e=Object(o.a)(t)?t:{},n=a(e.style);return Object(r.__experimentalGetSpacingClassesAndStyles)({...e,style:n})},u=t=>{const e=Object(o.a)(t)?t:{},n=a(e.style),r=Object(o.a)(n.typography)?n.typography:{};return{style:{fontSize:e.fontSize?`var(--wp--preset--font-size--${e.fontSize})`:r.fontSize,lineHeight:r.lineHeight,fontWeight:r.fontWeight,textTransform:r.textTransform,fontFamily:e.fontFamily}}},l=t=>{if(!Object(s.a)())return{className:"",style:{}};const e=Object(o.a)(t)?t:{},n=a(e.style);return Object(r.__experimentalUseColorProps)({...e,style:n})},b=t=>{if(!Object(s.a)())return{className:"",style:{}};const e=Object(o.a)(t)?t:{},n=a(e.style);return Object(r.__experimentalUseBorderProps)({...e,style:n})}},347:function(t,e){},400:function(t,e,n){"use strict";n.r(e);var r=n(0),s=n(1),c=n(4),o=n.n(c),a=n(42),i=n(120),u=(n(347),n(136));e.default=Object(i.withProductDataContext)(t=>{const{parentClassName:e}=Object(a.useInnerBlockLayoutContext)(),{product:n}=Object(a.useProductDataContext)(),c=(t=>{const e=parseFloat(t.average_rating);return Number.isFinite(e)&&e>0?e:0})(n),i=Object(u.b)(t),l=Object(u.d)(t),b=Object(u.c)(t);if(!c)return null;const f={width:c/5*100+"%"},p=Object(s.sprintf)(
/* translators: %f is referring to the average rating value */
Object(s.__)("Rated %f out of 5","woo-gutenberg-products-block"),c),d=(t=>{const e=parseInt(t.review_count,10);return Number.isFinite(e)&&e>0?e:0})(n),O={__html:Object(s.sprintf)(
/* translators: %1$s is referring to the average rating value, %2$s is referring to the number of ratings */
Object(s._n)("Rated %1$s out of 5 based on %2$s customer rating","Rated %1$s out of 5 based on %2$s customer ratings",d,"woo-gutenberg-products-block"),Object(s.sprintf)('<strong class="rating">%f</strong>',c),Object(s.sprintf)('<span class="rating">%d</span>',d))};return Object(r.createElement)("div",{className:o()(i.className,"wc-block-components-product-rating",{[e+"__product-rating"]:e}),style:{...i.style,...l.style,...b.style}},Object(r.createElement)("div",{className:o()("wc-block-components-product-rating__stars",e+"__product-rating__stars"),role:"img","aria-label":p},Object(r.createElement)("span",{style:f,dangerouslySetInnerHTML:O})))})},61:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return s}));const r=t=>!(t=>null===t)(t)&&t instanceof Object&&t.constructor===Object;function s(t,e){return r(t)&&e in t}}}]);