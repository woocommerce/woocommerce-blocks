(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[31],{146:function(e,c){},167:function(e,c){},186:function(e,c,r){"use strict";r.r(c),r.d(c,"Block",(function(){return d}));var t=r(0),a=r(4),n=r.n(a),l=r(81),i=r(22),s=r(21),o=r(104),u=r(117),p=r(92),m=r(47);r(267);const d=e=>{var c,r;const{className:a,textAlign:m,isDescendentOfSingleProductTemplate:d}=e,{parentClassName:b}=Object(s.useInnerBlockLayoutContext)(),{product:y}=Object(s.useProductDataContext)(),g=Object(o.a)(e),O=Object(u.a)(e),_=Object(p.a)(e),j=n()("wc-block-components-product-price",a,g.className,{[b+"__product-price"]:b});if(!y.id&&!d)return Object(t.createElement)(l.a,{align:m,className:j});const v={...g.style,..._.style},N={...O.style},P=y.prices,f=d?Object(i.getCurrencyFromPriceResponse)():Object(i.getCurrencyFromPriceResponse)(P),w=P.price!==P.regular_price,E=n()({[b+"__product-price__value"]:b,[b+"__product-price__value--on-sale"]:w});return Object(t.createElement)(l.a,{align:m,className:j,regularPriceStyle:v,priceStyle:v,priceClassName:E,currency:f,price:d?"5000":P.price,minPrice:null==P||null===(c=P.price_range)||void 0===c?void 0:c.min_amount,maxPrice:null==P||null===(r=P.price_range)||void 0===r?void 0:r.max_amount,regularPrice:d?"5000":P.regular_price,regularPriceClassName:n()({[b+"__product-price__regular"]:b}),spacingStyle:N})};c.default=e=>e.isDescendentOfSingleProductTemplate?Object(t.createElement)(d,e):Object(m.withProductDataContext)(d)(e)},267:function(e,c){},39:function(e,c,r){"use strict";var t=r(6),a=r.n(t),n=r(0),l=r(139),i=r(4),s=r.n(i);r(146);const o=e=>({thousandSeparator:null==e?void 0:e.thousandSeparator,decimalSeparator:null==e?void 0:e.decimalSeparator,decimalScale:null==e?void 0:e.minorUnit,fixedDecimalScale:!0,prefix:null==e?void 0:e.prefix,suffix:null==e?void 0:e.suffix,isNumericString:!0});c.a=e=>{let{className:c,value:r,currency:t,onValueChange:i,displayType:u="text",...p}=e;const m="string"==typeof r?parseInt(r,10):r;if(!Number.isFinite(m))return null;const d=m/10**t.minorUnit;if(!Number.isFinite(d))return null;const b=s()("wc-block-formatted-money-amount","wc-block-components-formatted-money-amount",c),y={...p,...o(t),value:void 0,currency:void 0,onValueChange:void 0},g=i?e=>{const c=+e.value*10**t.minorUnit;i(c)}:()=>{};return Object(n.createElement)(l.a,a()({className:b,displayType:u},y,{value:d,onValueChange:g}))}},81:function(e,c,r){"use strict";var t=r(0),a=r(1),n=r(39),l=r(4),i=r.n(l),s=r(22);r(167);const o=e=>{let{currency:c,maxPrice:r,minPrice:l,priceClassName:o,priceStyle:u={}}=e;return Object(t.createElement)(t.Fragment,null,Object(t.createElement)("span",{className:"screen-reader-text"},Object(a.sprintf)(
/* translators: %1$s min price, %2$s max price */
Object(a.__)("Price between %1$s and %2$s","woo-gutenberg-products-block"),Object(s.formatPrice)(l),Object(s.formatPrice)(r))),Object(t.createElement)("span",{"aria-hidden":!0},Object(t.createElement)(n.a,{className:i()("wc-block-components-product-price__value",o),currency:c,value:l,style:u})," — ",Object(t.createElement)(n.a,{className:i()("wc-block-components-product-price__value",o),currency:c,value:r,style:u})))},u=e=>{let{currency:c,regularPriceClassName:r,regularPriceStyle:l,regularPrice:s,priceClassName:o,priceStyle:u,price:p}=e;return Object(t.createElement)(t.Fragment,null,Object(t.createElement)("span",{className:"screen-reader-text"},Object(a.__)("Previous price:","woo-gutenberg-products-block")),Object(t.createElement)(n.a,{currency:c,renderText:e=>Object(t.createElement)("del",{className:i()("wc-block-components-product-price__regular",r),style:l},e),value:s}),Object(t.createElement)("span",{className:"screen-reader-text"},Object(a.__)("Discounted price:","woo-gutenberg-products-block")),Object(t.createElement)(n.a,{currency:c,renderText:e=>Object(t.createElement)("ins",{className:i()("wc-block-components-product-price__value","is-discounted",o),style:u},e),value:p}))};c.a=e=>{let{align:c,className:r,currency:a,format:l="<price/>",maxPrice:s,minPrice:p,price:m,priceClassName:d,priceStyle:b,regularPrice:y,regularPriceClassName:g,regularPriceStyle:O,spacingStyle:_}=e;const j=i()(r,"price","wc-block-components-product-price",{["wc-block-components-product-price--align-"+c]:c});l.includes("<price/>")||(l="<price/>",console.error("Price formats need to include the `<price/>` tag."));const v=y&&m!==y;let N=Object(t.createElement)("span",{className:i()("wc-block-components-product-price__value",d)});return v?N=Object(t.createElement)(u,{currency:a,price:m,priceClassName:d,priceStyle:b,regularPrice:y,regularPriceClassName:g,regularPriceStyle:O}):void 0!==p&&void 0!==s?N=Object(t.createElement)(o,{currency:a,maxPrice:s,minPrice:p,priceClassName:d,priceStyle:b}):m&&(N=Object(t.createElement)(n.a,{className:i()("wc-block-components-product-price__value",d),currency:a,value:m,style:b})),Object(t.createElement)("span",{className:j,style:_},Object(t.createInterpolateElement)(l,{price:N}))}}}]);