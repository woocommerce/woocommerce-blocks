(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[28],{129:function(e,c){},149:function(e,c){},290:function(e,c,r){"use strict";r.r(c);var t=r(0),a=r(4),n=r.n(a),l=r(96),i=r(27),s=r(29),o=r(56),u=r(43);c.default=Object(o.withProductDataContext)(e=>{var c,r;const{className:a,textAlign:o}=e,{parentClassName:p}=Object(s.useInnerBlockLayoutContext)(),{product:m}=Object(s.useProductDataContext)(),d=Object(u.b)(e),b=Object(u.d)(e),y=n()("wc-block-components-product-price",a,d.className,{[p+"__product-price"]:p}),g={...b.style,...d.style};if(!m.id)return Object(t.createElement)(l.a,{align:o,className:y});const _=m.prices,j=Object(i.getCurrencyFromPriceResponse)(_),O=_.price!==_.regular_price,N=n()({[p+"__product-price__value"]:p,[p+"__product-price__value--on-sale"]:O});return Object(t.createElement)(l.a,{align:o,className:y,priceStyle:g,regularPriceStyle:g,priceClassName:N,currency:j,price:_.price,minPrice:null==_||null===(c=_.price_range)||void 0===c?void 0:c.min_amount,maxPrice:null==_||null===(r=_.price_range)||void 0===r?void 0:r.max_amount,regularPrice:_.regular_price,regularPriceClassName:n()({[p+"__product-price__regular"]:p})})})},36:function(e,c,r){"use strict";var t=r(6),a=r.n(t),n=r(0),l=r(126),i=r(4),s=r.n(i);r(129);const o=e=>({thousandSeparator:e.thousandSeparator,decimalSeparator:e.decimalSeparator,decimalScale:e.minorUnit,fixedDecimalScale:!0,prefix:e.prefix,suffix:e.suffix,isNumericString:!0});c.a=e=>{let{className:c,value:r,currency:t,onValueChange:i,displayType:u="text",...p}=e;const m="string"==typeof r?parseInt(r,10):r;if(!Number.isFinite(m))return null;const d=m/10**t.minorUnit;if(!Number.isFinite(d))return null;const b=s()("wc-block-formatted-money-amount","wc-block-components-formatted-money-amount",c),y={...p,...o(t),value:void 0,currency:void 0,onValueChange:void 0},g=i?e=>{const c=+e.value*10**t.minorUnit;i(c)}:()=>{};return Object(n.createElement)(l.a,a()({className:b,displayType:u},y,{value:d,onValueChange:g}))}},96:function(e,c,r){"use strict";var t=r(0),a=r(1),n=r(36),l=r(4),i=r.n(l),s=r(27);r(149);const o=e=>{let{currency:c,maxPrice:r,minPrice:l,priceClassName:o,priceStyle:u={}}=e;return Object(t.createElement)(t.Fragment,null,Object(t.createElement)("span",{className:"screen-reader-text"},Object(a.sprintf)(
/* translators: %1$s min price, %2$s max price */
Object(a.__)("Price between %1$s and %2$s","woo-gutenberg-products-block"),Object(s.formatPrice)(l),Object(s.formatPrice)(r))),Object(t.createElement)("span",{"aria-hidden":!0},Object(t.createElement)(n.a,{className:i()("wc-block-components-product-price__value",o),currency:c,value:l,style:u})," — ",Object(t.createElement)(n.a,{className:i()("wc-block-components-product-price__value",o),currency:c,value:r,style:u})))},u=e=>{let{currency:c,regularPriceClassName:r,regularPriceStyle:l,regularPrice:s,priceClassName:o,priceStyle:u,price:p}=e;return Object(t.createElement)(t.Fragment,null,Object(t.createElement)("span",{className:"screen-reader-text"},Object(a.__)("Previous price:","woo-gutenberg-products-block")),Object(t.createElement)(n.a,{currency:c,renderText:e=>Object(t.createElement)("del",{className:i()("wc-block-components-product-price__regular",r),style:l},e),value:s}),Object(t.createElement)("span",{className:"screen-reader-text"},Object(a.__)("Discounted price:","woo-gutenberg-products-block")),Object(t.createElement)(n.a,{currency:c,renderText:e=>Object(t.createElement)("ins",{className:i()("wc-block-components-product-price__value","is-discounted",o),style:u},e),value:p}))};c.a=e=>{let{align:c,className:r,currency:a,format:l="<price/>",maxPrice:s,minPrice:p,price:m,priceClassName:d,priceStyle:b,regularPrice:y,regularPriceClassName:g,regularPriceStyle:_}=e;const j=i()(r,"price","wc-block-components-product-price",{["wc-block-components-product-price--align-"+c]:c});l.includes("<price/>")||(l="<price/>",console.error("Price formats need to include the `<price/>` tag."));const O=y&&m!==y;let N=Object(t.createElement)("span",{className:i()("wc-block-components-product-price__value",d)});return O?N=Object(t.createElement)(u,{currency:a,price:m,priceClassName:d,priceStyle:b,regularPrice:y,regularPriceClassName:g,regularPriceStyle:_}):void 0!==p&&void 0!==s?N=Object(t.createElement)(o,{currency:a,maxPrice:s,minPrice:p,priceClassName:d,priceStyle:b}):m&&(N=Object(t.createElement)(n.a,{className:i()("wc-block-components-product-price__value",d),currency:a,value:m,style:b})),Object(t.createElement)("span",{className:j},Object(t.createInterpolateElement)(l,{price:N}))}}}]);