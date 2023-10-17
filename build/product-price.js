(self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[]).push([[5579],{6669:(e,r,c)=>{"use strict";c.r(r),c.d(r,{Block:()=>m,default:()=>p});var t=c(9307),l=c(4184),n=c.n(l),o=c(6805),a=c(4293),s=c(2864),i=c(3611),u=c(721);const m=e=>{var r,c;const{className:l,textAlign:u,isDescendentOfSingleProductTemplate:m}=e,p=(0,i.F)(e),{parentName:d,parentClassName:y}=(0,s.useInnerBlockLayoutContext)(),{product:v}=(0,s.useProductDataContext)(),g="woocommerce/all-products"===d,f=n()("wc-block-components-product-price",l,p.className,{[`${y}__product-price`]:y});if(!v.id&&!m){const e=(0,t.createElement)(o.Z,{align:u,className:f});return g?(0,t.createElement)("div",{className:"wp-block-woocommerce-product-price"},e):e}const N=v.prices,b=m?(0,a.getCurrencyFromPriceResponse)():(0,a.getCurrencyFromPriceResponse)(N),_="5000",k=N.price!==N.regular_price,P=n()({[`${y}__product-price__value`]:y,[`${y}__product-price__value--on-sale`]:k}),S=(0,t.createElement)(o.Z,{align:u,className:f,style:p.style,regularPriceStyle:p.style,priceStyle:p.style,priceClassName:P,currency:b,price:m?_:N.price,minPrice:null==N||null===(r=N.price_range)||void 0===r?void 0:r.min_amount,maxPrice:null==N||null===(c=N.price_range)||void 0===c?void 0:c.max_amount,regularPrice:m?_:N.regular_price,regularPriceClassName:n()({[`${y}__product-price__regular`]:y})});return g?(0,t.createElement)("div",{className:"wp-block-woocommerce-product-price"},S):S},p=e=>e.isDescendentOfSingleProductTemplate?(0,t.createElement)(m,{...e}):(0,u.withProductDataContext)(m)(e)},9226:(e,r,c)=>{"use strict";c.d(r,{Z:()=>s});var t=c(9307),l=c(7333),n=c(4184),o=c.n(n);c(5476);const a=e=>({thousandSeparator:null==e?void 0:e.thousandSeparator,decimalSeparator:null==e?void 0:e.decimalSeparator,fixedDecimalScale:!0,prefix:null==e?void 0:e.prefix,suffix:null==e?void 0:e.suffix,isNumericString:!0}),s=({className:e,value:r,currency:c,onValueChange:n,displayType:s="text",...i})=>{var u;const m="string"==typeof r?parseInt(r,10):r;if(!Number.isFinite(m))return null;const p=m/10**c.minorUnit;if(!Number.isFinite(p))return null;const d=o()("wc-block-formatted-money-amount","wc-block-components-formatted-money-amount",e),y=null!==(u=i.decimalScale)&&void 0!==u?u:null==c?void 0:c.minorUnit,v={...i,...a(c),decimalScale:y,value:void 0,currency:void 0,onValueChange:void 0},g=n?e=>{const r=+e.value*10**c.minorUnit;n(r)}:()=>{};return(0,t.createElement)(l.Z,{className:d,displayType:s,...v,value:p,onValueChange:g})}},6805:(e,r,c)=>{"use strict";c.d(r,{Z:()=>m});var t=c(9307),l=c(5736),n=c(9226),o=c(4184),a=c.n(o),s=c(4293);c(5138);const i=({currency:e,maxPrice:r,minPrice:c,priceClassName:o,priceStyle:i={}})=>(0,t.createElement)(t.Fragment,null,(0,t.createElement)("span",{className:"screen-reader-text"},(0,l.sprintf)(/* translators: %1$s min price, %2$s max price */
(0,l.__)("Price between %1$s and %2$s","woo-gutenberg-products-block"),(0,s.formatPrice)(c),(0,s.formatPrice)(r))),(0,t.createElement)("span",{"aria-hidden":!0},(0,t.createElement)(n.Z,{className:a()("wc-block-components-product-price__value",o),currency:e,value:c,style:i})," — ",(0,t.createElement)(n.Z,{className:a()("wc-block-components-product-price__value",o),currency:e,value:r,style:i}))),u=({currency:e,regularPriceClassName:r,regularPriceStyle:c,regularPrice:o,priceClassName:s,priceStyle:i,price:u})=>(0,t.createElement)(t.Fragment,null,(0,t.createElement)("span",{className:"screen-reader-text"},(0,l.__)("Previous price:","woo-gutenberg-products-block")),(0,t.createElement)(n.Z,{currency:e,renderText:e=>(0,t.createElement)("del",{className:a()("wc-block-components-product-price__regular",r),style:c},e),value:o}),(0,t.createElement)("span",{className:"screen-reader-text"},(0,l.__)("Discounted price:","woo-gutenberg-products-block")),(0,t.createElement)(n.Z,{currency:e,renderText:e=>(0,t.createElement)("ins",{className:a()("wc-block-components-product-price__value","is-discounted",s),style:i},e),value:u})),m=({align:e,className:r,currency:c,format:l="<price/>",maxPrice:o,minPrice:s,price:m,priceClassName:p,priceStyle:d,regularPrice:y,regularPriceClassName:v,regularPriceStyle:g,style:f})=>{const N=a()(r,"price","wc-block-components-product-price",{[`wc-block-components-product-price--align-${e}`]:e});l.includes("<price/>")||(l="<price/>",console.error("Price formats need to include the `<price/>` tag."));const b=y&&m!==y;let _=(0,t.createElement)("span",{className:a()("wc-block-components-product-price__value",p)});return b?_=(0,t.createElement)(u,{currency:c,price:m,priceClassName:p,priceStyle:d,regularPrice:y,regularPriceClassName:v,regularPriceStyle:g}):void 0!==s&&void 0!==o?_=(0,t.createElement)(i,{currency:c,maxPrice:o,minPrice:s,priceClassName:p,priceStyle:d}):m&&(_=(0,t.createElement)(n.Z,{className:a()("wc-block-components-product-price__value",p),currency:c,value:m,style:d})),(0,t.createElement)("span",{className:N,style:f},(0,t.createInterpolateElement)(l,{price:_}))}},3611:(e,r,c)=>{"use strict";c.d(r,{F:()=>i});var t=c(4184),l=c.n(t),n=c(7884),o=c(2646),a=c(1473),s=c(2661);const i=e=>{const r=(e=>{const r=(0,n.Kn)(e)?e:{style:{}};let c=r.style;return(0,o.H)(c)&&(c=JSON.parse(c)||{}),(0,n.Kn)(c)||(c={}),{...r,style:c}})(e),c=(0,s.vc)(r),t=(0,s.l8)(r),i=(0,s.su)(r),u=(0,a.f)(r);return{className:l()(u.className,c.className,t.className,i.className),style:{...u.style,...c.style,...t.style,...i.style}}}},1473:(e,r,c)=>{"use strict";c.d(r,{f:()=>n});var t=c(7884),l=c(2646);const n=e=>{const r=(0,t.Kn)(e.style.typography)?e.style.typography:{},c=(0,l.H)(r.fontFamily)?r.fontFamily:"";return{className:e.fontFamily?`has-${e.fontFamily}-font-family`:c,style:{fontSize:e.fontSize?`var(--wp--preset--font-size--${e.fontSize})`:r.fontSize,fontStyle:r.fontStyle,fontWeight:r.fontWeight,letterSpacing:r.letterSpacing,lineHeight:r.lineHeight,textDecoration:r.textDecoration,textTransform:r.textTransform}}}},2661:(e,r,c)=>{"use strict";c.d(r,{l8:()=>m,su:()=>p,vc:()=>u});var t=c(4184),l=c.n(t),n=c(9784),o=c(2289),a=c(7884);function s(e={}){const r={};return(0,o.getCSSRules)(e,{selector:""}).forEach((e=>{r[e.key]=e.value})),r}function i(e,r){return e&&r?`has-${(0,n.o)(r)}-${e}`:""}function u(e){var r,c,t,n,o,u,m;const{backgroundColor:p,textColor:d,gradient:y,style:v}=e,g=i("background-color",p),f=i("color",d),N=function(e){if(e)return`has-${e}-gradient-background`}(y),b=N||(null==v||null===(r=v.color)||void 0===r?void 0:r.gradient);return{className:l()(f,N,{[g]:!b&&!!g,"has-text-color":d||(null==v||null===(c=v.color)||void 0===c?void 0:c.text),"has-background":p||(null==v||null===(t=v.color)||void 0===t?void 0:t.background)||y||(null==v||null===(n=v.color)||void 0===n?void 0:n.gradient),"has-link-color":(0,a.Kn)(null==v||null===(o=v.elements)||void 0===o?void 0:o.link)?null==v||null===(u=v.elements)||void 0===u||null===(m=u.link)||void 0===m?void 0:m.color:void 0}),style:s({color:(null==v?void 0:v.color)||{}})}}function m(e){var r;const c=(null===(r=e.style)||void 0===r?void 0:r.border)||{};return{className:function(e){var r;const{borderColor:c,style:t}=e,n=c?i("border-color",c):"";return l()({"has-border-color":!!c||!(null==t||null===(r=t.border)||void 0===r||!r.color),[n]:!!n})}(e),style:s({border:c})}}function p(e){var r;return{className:void 0,style:s({spacing:(null===(r=e.style)||void 0===r?void 0:r.spacing)||{}})}}},8519:(e,r,c)=>{"use strict";c.d(r,{F:()=>t});const t=e=>null===e},7884:(e,r,c)=>{"use strict";c.d(r,{$n:()=>n,Kn:()=>l,Qr:()=>o});var t=c(8519);const l=e=>!(0,t.F)(e)&&e instanceof Object&&e.constructor===Object;function n(e,r){return l(e)&&r in e}const o=e=>0===Object.keys(e).length},2646:(e,r,c)=>{"use strict";c.d(r,{H:()=>t});const t=e=>"string"==typeof e},5476:()=>{},5138:()=>{}}]);