(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[72,75],{111:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var c=n(26),a=n(20);const o=e=>Object(c.a)(e)?JSON.parse(e)||{}:Object(a.a)(e)?e:{}},146:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c=n(55),a=n(20),o=n(111);const s=e=>{const t=Object(a.a)(e)?e:{},n=Object(o.a)(t.style);return Object(c.__experimentalUseBorderProps)({...t,style:n})}},20:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return a}));const c=e=>!(e=>null===e)(e)&&e instanceof Object&&e.constructor===Object;function a(e,t){return c(e)&&t in e}},280:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c=n(55),a=n(20),o=n(111);const s=e=>{const t=Object(a.a)(e)?e:{},n=Object(o.a)(t.style);return Object(c.__experimentalUseColorProps)({...t,style:n})}},286:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c=n(20),a=n(26),o=n(111);const s=e=>{const t=Object(c.a)(e)?e:{},n=Object(o.a)(t.style),s=Object(c.a)(n.typography)?n.typography:{},l=Object(a.a)(s.fontFamily)?s.fontFamily:"";return{className:t.fontFamily?`has-${t.fontFamily}-font-family`:l,style:{fontSize:t.fontSize?`var(--wp--preset--font-size--${t.fontSize})`:s.fontSize,fontStyle:s.fontStyle,fontWeight:s.fontWeight,letterSpacing:s.letterSpacing,lineHeight:s.lineHeight,textDecoration:s.textDecoration,textTransform:s.textTransform}}}},297:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c=n(55),a=n(20),o=n(111);const s=e=>{if("function"!=typeof c.__experimentalGetSpacingClassesAndStyles)return{style:{}};const t=Object(a.a)(e)?e:{},n=Object(o.a)(t.style);return Object(c.__experimentalGetSpacingClassesAndStyles)({...t,style:n})}},330:function(e,t,n){"use strict";n.r(t),n.d(t,"Block",(function(){return m}));var c=n(0),a=n(1),o=n(5),s=n.n(o),l=n(21),r=n(58),i=n(146),u=n(280),d=n(286),b=n(297),f=n(142);n(331);const m=e=>{const{className:t,align:n}=e,{parentClassName:o}=Object(r.useInnerBlockLayoutContext)(),{product:f}=Object(r.useProductDataContext)(),m=Object(i.a)(e),p=Object(u.a)(e),g=Object(d.a)(e),O=Object(b.a)(e);if(!f.id||!f.on_sale)return null;const j="string"==typeof n?"wc-block-components-product-sale-badge--align-"+n:"";return Object(c.createElement)("div",{className:s()("wc-block-components-product-sale-badge",t,j,{[o+"__product-onsale"]:o},p.className,m.className,g.className),style:{...p.style,...m.style,...g.style,...O.style}},Object(c.createElement)(l.a,{label:Object(a.__)("Sale","woo-gutenberg-products-block"),screenReaderLabel:Object(a.__)("Product on sale","woo-gutenberg-products-block")}))};t.default=Object(f.withProductDataContext)(m)},331:function(e,t){},355:function(e,t,n){"use strict";n.d(t,"a",(function(){return y}));var c=n(13),a=n.n(c),o=n(0),s=n(1),l=n(5),r=n.n(l),i=n(2),u=n(58),d=n(286),b=n(146),f=n(297),m=n(142),p=n(72),g=n(330);n(356);const O=()=>Object(o.createElement)("img",{src:i.PLACEHOLDER_IMG_SRC,alt:"",width:void 0,height:void 0}),j=e=>{let{image:t,loaded:n,showFullSize:c,fallbackAlt:s}=e;const{thumbnail:l,src:r,srcset:i,sizes:u,alt:d}=t||{},b={alt:d||s,hidden:!n,src:l,...c&&{src:r,srcSet:i,sizes:u}};return Object(o.createElement)(o.Fragment,null,b.src&&Object(o.createElement)("img",a()({"data-testid":"product-image"},b)),!t&&Object(o.createElement)(O,null))},y=e=>{const{className:t,imageSizing:n="full-size",showProductLink:c=!0,showSaleBadge:a,saleBadgeAlign:l="right"}=e,{parentClassName:i}=Object(u.useInnerBlockLayoutContext)(),{product:m,isLoading:y}=Object(u.useProductDataContext)(),{dispatchStoreEvent:h}=Object(p.a)(),w=Object(d.a)(e),S=Object(b.a)(e),k=Object(f.a)(e);if(!m.id)return Object(o.createElement)("div",{className:r()(t,"wc-block-components-product-image",{[i+"__product-image"]:i},S.className),style:{...w.style,...S.style,...k.style}},Object(o.createElement)(O,null));const _=!!m.images.length,v=_?m.images[0]:null,E=c?"a":o.Fragment,x=Object(s.sprintf)(
/* translators: %s is referring to the product name */
Object(s.__)("Link to %s","woo-gutenberg-products-block"),m.name),C={href:m.permalink,...!_&&{"aria-label":x},onClick:()=>{h("product-view-link",{product:m})}};return Object(o.createElement)("div",{className:r()(t,"wc-block-components-product-image",{[i+"__product-image"]:i},S.className),style:{...w.style,...S.style,...k.style}},Object(o.createElement)(E,c&&C,!!a&&Object(o.createElement)(g.default,{align:l,product:m}),Object(o.createElement)(j,{fallbackAlt:m.name,image:v,loaded:!y,showFullSize:"cropped"!==n})))};t.b=Object(m.withProductDataContext)(y)},356:function(e,t){},526:function(e,t,n){"use strict";n.r(t);var c=n(142),a=n(355);t.default=Object(c.withFilteredAttributes)({showProductLink:{type:"boolean",default:!0},showSaleBadge:{type:"boolean",default:!0},saleBadgeAlign:{type:"string",default:"right"},imageSizing:{type:"string",default:"full-size"},productId:{type:"number",default:0},isDescendentOfQueryLoop:{type:"boolean",default:!1},isDescendentOfSingleProductBlock:{type:"boolean",default:!1}})(a.b)}}]);