(self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[]).push([[3706,5432],{9382:(e,t,l)=>{"use strict";l.d(t,{Z:()=>o});const o={showProductLink:{type:"boolean",default:!0},showSaleBadge:{type:"boolean",default:!0},saleBadgeAlign:{type:"string",default:"right"},imageSizing:{type:"string",default:l(9252).R.SINGLE},productId:{type:"number",default:0},isDescendentOfQueryLoop:{type:"boolean",default:!1},isDescendentOfSingleProductBlock:{type:"boolean",default:!1},width:{type:"string"},height:{type:"string"},scale:{type:"string",default:"cover"},aspectRatio:{type:"string"}}},1492:(e,t,l)=>{"use strict";l.d(t,{Z:()=>y});var o=l(9307),n=l(5736),a=l(4184),s=l.n(a),r=l(4617),c=l(2864),i=l(3611),u=l(721),d=l(5918),m=l(4498),g=(l(8854),l(9252));const p=e=>(0,o.createElement)("img",{...e,src:r.PLACEHOLDER_IMG_SRC,alt:"",width:void 0,height:void 0}),h=({image:e,loaded:t,showFullSize:l,fallbackAlt:n,width:a,scale:s,height:r,aspectRatio:c})=>{const{thumbnail:i,src:u,srcset:d,sizes:m,alt:g}=e||{},h={alt:g||n,hidden:!t,src:i,...l&&{src:u,srcSet:d,sizes:m}},y={height:r,width:a,objectFit:s,aspectRatio:c};return(0,o.createElement)(o.Fragment,null,h.src&&(0,o.createElement)("img",{style:y,"data-testid":"product-image",...h}),!e&&(0,o.createElement)(p,{style:y}))},y=(0,u.withProductDataContext)((e=>{const{className:t,imageSizing:l=g.R.SINGLE,showProductLink:a=!0,showSaleBadge:r,saleBadgeAlign:u="right",height:y,width:f,scale:b,aspectRatio:v,...k}=e,w=(0,i.F)(e),{parentClassName:E}=(0,c.useInnerBlockLayoutContext)(),{product:N,isLoading:S}=(0,c.useProductDataContext)(),{dispatchStoreEvent:C}=(0,d.n)();if(!N.id)return(0,o.createElement)("div",{className:s()(t,"wc-block-components-product-image",{[`${E}__product-image`]:E},w.className),style:w.style},(0,o.createElement)(p,null));const _=!!N.images.length,x=_?N.images[0]:null,F=a?"a":o.Fragment,L=(0,n.sprintf)(/* translators: %s is referring to the product name */
(0,n.__)("Link to %s","woo-gutenberg-products-block"),N.name),R={href:N.permalink,...!_&&{"aria-label":L},onClick:()=>{C("product-view-link",{product:N})}};return(0,o.createElement)("div",{className:s()(t,"wc-block-components-product-image",{[`${E}__product-image`]:E},w.className),style:w.style},(0,o.createElement)(F,{...a&&R},!!r&&(0,o.createElement)(m.default,{align:u,...k}),(0,o.createElement)(h,{fallbackAlt:N.name,image:x,loaded:!S,showFullSize:l!==g.R.THUMBNAIL,width:f,height:y,scale:b,aspectRatio:v})))}))},2097:(e,t,l)=>{"use strict";l.r(t),l.d(t,{default:()=>s});var o=l(721),n=l(1492),a=l(9382);const s=(0,o.withFilteredAttributes)(a.Z)(n.Z)},4498:(e,t,l)=>{"use strict";l.r(t),l.d(t,{Block:()=>d,default:()=>m});var o=l(9307),n=l(5736),a=l(4184),s=l.n(a),r=l(6674),c=l(2864),i=l(3611),u=l(721);l(1314);const d=e=>{const{className:t,align:l}=e,a=(0,i.F)(e),{parentClassName:u}=(0,c.useInnerBlockLayoutContext)(),{product:d}=(0,c.useProductDataContext)();if(!(d.id&&d.on_sale||e.isDescendentOfSingleProductTemplate))return null;const m="string"==typeof l?`wc-block-components-product-sale-badge--align-${l}`:"";return(0,o.createElement)("div",{className:s()("wc-block-components-product-sale-badge",t,m,{[`${u}__product-onsale`]:u},a.className),style:a.style},(0,o.createElement)(r.Z,{label:(0,n.__)("Sale","woo-gutenberg-products-block"),screenReaderLabel:(0,n.__)("Product on sale","woo-gutenberg-products-block")}))},m=(0,u.withProductDataContext)(d)},6674:(e,t,l)=>{"use strict";l.d(t,{Z:()=>s});var o=l(9307),n=l(4184),a=l.n(n);const s=({label:e,screenReaderLabel:t,wrapperElement:l,wrapperProps:n={}})=>{let s;const r=null!=e,c=null!=t;return!r&&c?(s=l||"span",n={...n,className:a()(n.className,"screen-reader-text")},(0,o.createElement)(s,{...n},t)):(s=l||o.Fragment,r&&c&&e!==t?(0,o.createElement)(s,{...n},(0,o.createElement)("span",{"aria-hidden":"true"},e),(0,o.createElement)("span",{className:"screen-reader-text"},t)):(0,o.createElement)(s,{...n},e))}},5918:(e,t,l)=>{"use strict";l.d(t,{n:()=>s});var o=l(2694),n=l(9818),a=l(9307);const s=()=>({dispatchStoreEvent:(0,a.useCallback)(((e,t={})=>{try{(0,o.doAction)(`experimental__woocommerce_blocks-${e}`,t)}catch(e){console.error(e)}}),[]),dispatchCheckoutEvent:(0,a.useCallback)(((e,t={})=>{try{(0,o.doAction)(`experimental__woocommerce_blocks-checkout-${e}`,{...t,storeCart:(0,n.select)("wc/store/cart").getCartData()})}catch(e){console.error(e)}}),[])})},3611:(e,t,l)=>{"use strict";l.d(t,{F:()=>i});var o=l(4184),n=l.n(o),a=l(7884),s=l(2646),r=l(1473),c=l(2661);const i=e=>{const t=(e=>{const t=(0,a.Kn)(e)?e:{style:{}};let l=t.style;return(0,s.H)(l)&&(l=JSON.parse(l)||{}),(0,a.Kn)(l)||(l={}),{...t,style:l}})(e),l=(0,c.vc)(t),o=(0,c.l8)(t),i=(0,c.su)(t),u=(0,r.f)(t);return{className:n()(u.className,l.className,o.className,i.className),style:{...u.style,...l.style,...o.style,...i.style}}}},1473:(e,t,l)=>{"use strict";l.d(t,{f:()=>a});var o=l(7884),n=l(2646);const a=e=>{const t=(0,o.Kn)(e.style.typography)?e.style.typography:{},l=(0,n.H)(t.fontFamily)?t.fontFamily:"";return{className:e.fontFamily?`has-${e.fontFamily}-font-family`:l,style:{fontSize:e.fontSize?`var(--wp--preset--font-size--${e.fontSize})`:t.fontSize,fontStyle:t.fontStyle,fontWeight:t.fontWeight,letterSpacing:t.letterSpacing,lineHeight:t.lineHeight,textDecoration:t.textDecoration,textTransform:t.textTransform}}}},2661:(e,t,l)=>{"use strict";l.d(t,{l8:()=>d,su:()=>m,vc:()=>u});var o=l(4184),n=l.n(o),a=l(9784),s=l(2289),r=l(7884);function c(e={}){const t={};return(0,s.getCSSRules)(e,{selector:""}).forEach((e=>{t[e.key]=e.value})),t}function i(e,t){return e&&t?`has-${(0,a.o)(t)}-${e}`:""}function u(e){var t,l,o,a,s,u,d;const{backgroundColor:m,textColor:g,gradient:p,style:h}=e,y=i("background-color",m),f=i("color",g),b=function(e){if(e)return`has-${e}-gradient-background`}(p),v=b||(null==h||null===(t=h.color)||void 0===t?void 0:t.gradient);return{className:n()(f,b,{[y]:!v&&!!y,"has-text-color":g||(null==h||null===(l=h.color)||void 0===l?void 0:l.text),"has-background":m||(null==h||null===(o=h.color)||void 0===o?void 0:o.background)||p||(null==h||null===(a=h.color)||void 0===a?void 0:a.gradient),"has-link-color":(0,r.Kn)(null==h||null===(s=h.elements)||void 0===s?void 0:s.link)?null==h||null===(u=h.elements)||void 0===u||null===(d=u.link)||void 0===d?void 0:d.color:void 0}),style:c({color:(null==h?void 0:h.color)||{}})}}function d(e){var t;const l=(null===(t=e.style)||void 0===t?void 0:t.border)||{};return{className:function(e){var t;const{borderColor:l,style:o}=e,a=l?i("border-color",l):"";return n()({"has-border-color":!!l||!(null==o||null===(t=o.border)||void 0===t||!t.color),[a]:!!a})}(e),style:c({border:l})}}function m(e){var t;return{className:void 0,style:c({spacing:(null===(t=e.style)||void 0===t?void 0:t.spacing)||{}})}}},8519:(e,t,l)=>{"use strict";l.d(t,{F:()=>o});const o=e=>null===e},7884:(e,t,l)=>{"use strict";l.d(t,{$n:()=>a,Kn:()=>n,Qr:()=>s});var o=l(8519);const n=e=>!(0,o.F)(e)&&e instanceof Object&&e.constructor===Object;function a(e,t){return n(e)&&t in e}const s=e=>0===Object.keys(e).length},2646:(e,t,l)=>{"use strict";l.d(t,{H:()=>o});const o=e=>"string"==typeof e},8854:()=>{},1314:()=>{}}]);