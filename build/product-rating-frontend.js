(self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[]).push([[7385],{1382:(t,e,n)=>{"use strict";n.r(e),n.d(e,{Block:()=>f,default:()=>m});var r=n(9307),o=n(5736),s=n(4184),c=n.n(s),a=n(2864),l=n(3611),i=n(721),u=n(1478);n(402);const d=t=>({width:t/5*100+"%"}),p=({parentClassName:t})=>{const e=d(0);return(0,r.createElement)("div",{className:c()("wc-block-components-product-rating__norating-container",`${t}-product-rating__norating-container`)},(0,r.createElement)("div",{className:"wc-block-components-product-rating__norating",role:"img"},(0,r.createElement)("span",{style:e})),(0,r.createElement)("span",null,(0,o.__)("No Reviews","woo-gutenberg-products-block")))},v=t=>{const{rating:e,reviews:n,parentClassName:s}=t,a=d(e),l=(0,o.sprintf)(/* translators: %f is referring to the average rating value */
(0,o.__)("Rated %f out of 5","woo-gutenberg-products-block"),e),i={__html:(0,o.sprintf)(/* translators: %1$s is referring to the average rating value, %2$s is referring to the number of ratings */
(0,o._n)("Rated %1$s out of 5 based on %2$s customer rating","Rated %1$s out of 5 based on %2$s customer ratings",n,"woo-gutenberg-products-block"),(0,o.sprintf)('<strong class="rating">%f</strong>',e),(0,o.sprintf)('<span class="rating">%d</span>',n))};return(0,r.createElement)("div",{className:c()("wc-block-components-product-rating__stars",`${s}__product-rating__stars`),role:"img","aria-label":l},(0,r.createElement)("span",{style:a,dangerouslySetInnerHTML:i}))},g=t=>{const{reviews:e}=t,n=(0,o.sprintf)(/* translators: %s is referring to the total of reviews for a product */
(0,o._n)("(%s customer review)","(%s customer reviews)",e,"woo-gutenberg-products-block"),e);return(0,r.createElement)("span",{className:"wc-block-components-product-rating__reviews_count"},n)},f=t=>{const{textAlign:e,isDescendentOfSingleProductBlock:n,shouldDisplayMockedReviewsWhenProductHasNoReviews:o}=t,s=(0,l.F)(t),{parentClassName:i}=(0,a.useInnerBlockLayoutContext)(),{product:d}=(0,a.useProductDataContext)(),f=(t=>{const e=parseFloat(t.average_rating);return Number.isFinite(e)&&e>0?e:0})(d),m=(t=>{const e=(0,u.h)(t.review_count)?t.review_count:parseInt(t.review_count,10);return Number.isFinite(e)&&e>0?e:0})(d),y=c()(s.className,"wc-block-components-product-rating",{[`${i}__product-rating`]:i,[`has-text-align-${e}`]:e}),b=o?(0,r.createElement)(p,{parentClassName:i}):null,w=m?(0,r.createElement)(v,{rating:f,reviews:m,parentClassName:i}):b;if(m||o)return(0,r.createElement)("div",{className:y,style:s.style},(0,r.createElement)("div",{className:"wc-block-components-product-rating__container"},w,m&&n?(0,r.createElement)(g,{reviews:m}):null))},m=(0,i.withProductDataContext)(f)},3611:(t,e,n)=>{"use strict";n.d(e,{F:()=>i});var r=n(4184),o=n.n(r),s=n(7884),c=n(2646),a=n(1473),l=n(2661);const i=t=>{const e=(t=>{const e=(0,s.Kn)(t)?t:{style:{}};let n=e.style;return(0,c.H)(n)&&(n=JSON.parse(n)||{}),(0,s.Kn)(n)||(n={}),{...e,style:n}})(t),n=(0,l.vc)(e),r=(0,l.l8)(e),i=(0,l.su)(e),u=(0,a.f)(e);return{className:o()(u.className,n.className,r.className,i.className),style:{...u.style,...n.style,...r.style,...i.style}}}},1473:(t,e,n)=>{"use strict";n.d(e,{f:()=>s});var r=n(7884),o=n(2646);const s=t=>{const e=(0,r.Kn)(t.style.typography)?t.style.typography:{},n=(0,o.H)(e.fontFamily)?e.fontFamily:"";return{className:t.fontFamily?`has-${t.fontFamily}-font-family`:n,style:{fontSize:t.fontSize?`var(--wp--preset--font-size--${t.fontSize})`:e.fontSize,fontStyle:e.fontStyle,fontWeight:e.fontWeight,letterSpacing:e.letterSpacing,lineHeight:e.lineHeight,textDecoration:e.textDecoration,textTransform:e.textTransform}}}},2661:(t,e,n)=>{"use strict";n.d(e,{l8:()=>d,su:()=>p,vc:()=>u});var r=n(4184),o=n.n(r),s=n(9784),c=n(2289),a=n(7884);function l(t={}){const e={};return(0,c.getCSSRules)(t,{selector:""}).forEach((t=>{e[t.key]=t.value})),e}function i(t,e){return t&&e?`has-${(0,s.o)(e)}-${t}`:""}function u(t){var e,n,r,s,c,u,d;const{backgroundColor:p,textColor:v,gradient:g,style:f}=t,m=i("background-color",p),y=i("color",v),b=function(t){if(t)return`has-${t}-gradient-background`}(g),w=b||(null==f||null===(e=f.color)||void 0===e?void 0:e.gradient);return{className:o()(y,b,{[m]:!w&&!!m,"has-text-color":v||(null==f||null===(n=f.color)||void 0===n?void 0:n.text),"has-background":p||(null==f||null===(r=f.color)||void 0===r?void 0:r.background)||g||(null==f||null===(s=f.color)||void 0===s?void 0:s.gradient),"has-link-color":(0,a.Kn)(null==f||null===(c=f.elements)||void 0===c?void 0:c.link)?null==f||null===(u=f.elements)||void 0===u||null===(d=u.link)||void 0===d?void 0:d.color:void 0}),style:l({color:(null==f?void 0:f.color)||{}})}}function d(t){var e;const n=(null===(e=t.style)||void 0===e?void 0:e.border)||{};return{className:function(t){var e;const{borderColor:n,style:r}=t,s=n?i("border-color",n):"";return o()({"has-border-color":!!n||!(null==r||null===(e=r.border)||void 0===e||!e.color),[s]:!!s})}(t),style:l({border:n})}}function p(t){var e;return{className:void 0,style:l({spacing:(null===(e=t.style)||void 0===e?void 0:e.spacing)||{}})}}},8519:(t,e,n)=>{"use strict";n.d(e,{F:()=>r});const r=t=>null===t},1478:(t,e,n)=>{"use strict";n.d(e,{h:()=>r});const r=t=>"number"==typeof t},7884:(t,e,n)=>{"use strict";n.d(e,{$n:()=>s,Kn:()=>o});var r=n(8519);const o=t=>!(0,r.F)(t)&&t instanceof Object&&t.constructor===Object;function s(t,e){return o(t)&&e in t}},2646:(t,e,n)=>{"use strict";n.d(e,{H:()=>r});const r=t=>"string"==typeof t},1290:(t,e,n)=>{"use strict";n.d(e,{$:()=>s});var r=n(7582),o=n(307);function s(t,e){return void 0===e&&(e={}),(0,o.B)(t,(0,r.pi)({delimiter:"."},e))}},402:()=>{},9562:(t,e,n)=>{"use strict";function r(t){return t.toLowerCase()}n.d(e,{U:()=>r})},307:(t,e,n)=>{"use strict";n.d(e,{B:()=>c});var r=n(9562),o=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],s=/[^A-Z0-9]+/gi;function c(t,e){void 0===e&&(e={});for(var n=e.splitRegexp,c=void 0===n?o:n,l=e.stripRegexp,i=void 0===l?s:l,u=e.transform,d=void 0===u?r.U:u,p=e.delimiter,v=void 0===p?" ":p,g=a(a(t,c,"$1\0$2"),i,"\0"),f=0,m=g.length;"\0"===g.charAt(f);)f++;for(;"\0"===g.charAt(m-1);)m--;return g.slice(f,m).split("\0").map(d).join(v)}function a(t,e,n){return e instanceof RegExp?t.replace(e,n):e.reduce((function(t,e){return t.replace(e,n)}),t)}},9784:(t,e,n)=>{"use strict";n.d(e,{o:()=>s});var r=n(7582),o=n(1290);function s(t,e){return void 0===e&&(e={}),(0,o.$)(t,(0,r.pi)({delimiter:"-"},e))}},7582:(t,e,n)=>{"use strict";n.d(e,{pi:()=>r});var r=function(){return r=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)};Object.create,Object.create,"function"==typeof SuppressedError&&SuppressedError}}]);