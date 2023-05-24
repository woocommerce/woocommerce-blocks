(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[53],{256:function(e,t,c){"use strict";var o=c(9),i=c.n(o),n=c(0),s=c(269),a=c(6),r=c.n(a);c(259);const l=e=>({thousandSeparator:null==e?void 0:e.thousandSeparator,decimalSeparator:null==e?void 0:e.decimalSeparator,fixedDecimalScale:!0,prefix:null==e?void 0:e.prefix,suffix:null==e?void 0:e.suffix,isNumericString:!0});t.a=e=>{var t;let{className:c,value:o,currency:a,onValueChange:p,displayType:d="text",...u}=e;const h="string"==typeof o?parseInt(o,10):o;if(!Number.isFinite(h))return null;const m=h/10**a.minorUnit;if(!Number.isFinite(m))return null;const b=r()("wc-block-formatted-money-amount","wc-block-components-formatted-money-amount",c),g=null!==(t=u.decimalScale)&&void 0!==t?t:null==a?void 0:a.minorUnit,k={...u,...l(a),decimalScale:g,value:void 0,currency:void 0,onValueChange:void 0},_=p?e=>{const t=+e.value*10**a.minorUnit;p(t)}:()=>{};return Object(n.createElement)(s.a,i()({className:b,displayType:d},k,{value:m,onValueChange:_}))}},259:function(e,t){},265:function(e,t,c){"use strict";var o=c(9),i=c.n(o),n=c(0),s=c(6),a=c.n(s);c(266),t.a=e=>{let{children:t,className:c,headingLevel:o,...s}=e;const r=a()("wc-block-components-title",c),l="h"+o;return Object(n.createElement)(l,i()({className:r},s),t)}},266:function(e,t){},267:function(e,t){},268:function(e,t,c){"use strict";var o=c(1);t.a=e=>{let{defaultTitle:t=Object(o.__)("Step","woo-gutenberg-products-block"),defaultDescription:c=Object(o.__)("Step description text.","woo-gutenberg-products-block"),defaultShowStepNumber:i=!0}=e;return{title:{type:"string",default:t},description:{type:"string",default:c},showStepNumber:{type:"boolean",default:i}}}},293:function(e,t,c){"use strict";var o=c(0),i=c(6),n=c.n(i),s=c(265);c(267);const a=e=>{let{title:t,stepHeadingContent:c}=e;return Object(o.createElement)("div",{className:"wc-block-components-checkout-step__heading"},Object(o.createElement)(s.a,{"aria-hidden":"true",className:"wc-block-components-checkout-step__title",headingLevel:"2"},t),!!c&&Object(o.createElement)("span",{className:"wc-block-components-checkout-step__heading-content"},c))};t.a=e=>{let{id:t,className:c,title:i,legend:s,description:r,children:l,disabled:p=!1,showStepNumber:d=!0,stepHeadingContent:u=(()=>{})}=e;const h=s||i?"fieldset":"div";return Object(o.createElement)(h,{className:n()(c,"wc-block-components-checkout-step",{"wc-block-components-checkout-step--with-step-number":d,"wc-block-components-checkout-step--disabled":p}),id:t,disabled:p},!(!s&&!i)&&Object(o.createElement)("legend",{className:"screen-reader-text"},s||i),!!i&&Object(o.createElement)(a,{title:i,stepHeadingContent:u()}),Object(o.createElement)("div",{className:"wc-block-components-checkout-step__container"},!!r&&Object(o.createElement)("p",{className:"wc-block-components-checkout-step__description"},r),Object(o.createElement)("div",{className:"wc-block-components-checkout-step__content"},l)))}},427:function(e,t){},482:function(e,t,c){"use strict";c.r(t);var o=c(0),i=c(6),n=c.n(i),s=c(113),a=c(293),r=c(5),l=c(3),p=c(88),d=c(56),u=c(1),h=c(483),m=c(481),b=c(84),g=c(468),k=c(469),_=(c(427),c(2)),w=c(35),O=c(256);const v=e=>{let{minRate:t,maxRate:c,multiple:i=!1}=e;if(void 0===t||void 0===c)return null;const n=Object(_.getSetting)("displayCartPricesIncludingTax",!1)?parseInt(t.price,10)+parseInt(t.taxes,10):parseInt(t.price,10),s=Object(_.getSetting)("displayCartPricesIncludingTax",!1)?parseInt(c.price,10)+parseInt(c.taxes,10):parseInt(c.price,10),a=0===n?Object(o.createElement)("em",null,Object(u.__)("free","woo-gutenberg-products-block")):Object(o.createElement)(O.a,{currency:Object(w.getCurrencyFromPriceResponse)(t),value:n});return Object(o.createElement)("span",{className:"wc-block-checkout__shipping-method-option-price"},n!==s||i?Object(o.createInterpolateElement)(0===n&&0===s?"<price />":Object(u.__)("from <price />","woo-gutenberg-products-block"),{price:a}):a)};var j=c(224);function f(e){return e?{min:e.reduce((e,t)=>Object(j.c)(t.method_id)?e:void 0===e||parseInt(t.price,10)<parseInt(e.price,10)?t:e,void 0),max:e.reduce((e,t)=>Object(j.c)(t.method_id)?e:void 0===e||parseInt(t.price,10)>parseInt(e.price,10)?t:e,void 0)}:{min:void 0,max:void 0}}function E(e){return e?{min:e.reduce((e,t)=>Object(j.c)(t.method_id)&&(void 0===e||t.price<e.price)?t:e,void 0),max:e.reduce((e,t)=>Object(j.c)(t.method_id)&&(void 0===e||t.price>e.price)?t:e,void 0)}:{min:void 0,max:void 0}}const x=Object(u.__)("Local Pickup","woo-gutenberg-products-block"),N=Object(u.__)("Shipping","woo-gutenberg-products-block");c(520);const C={hidden:!0,message:Object(u.__)("Shipping options are not available","woo-gutenberg-products-block")},S=e=>{let{checked:t,rate:c,showPrice:i,showIcon:s,toggleText:a,multiple:r}=e;return Object(o.createElement)(h.a,{value:"pickup",className:n()("wc-block-checkout__shipping-method-option",{"wc-block-checkout__shipping-method-option--selected":"pickup"===t})},!0===s&&Object(o.createElement)(b.a,{icon:g.a,size:28,className:"wc-block-checkout__shipping-method-option-icon"}),Object(o.createElement)("span",{className:"wc-block-checkout__shipping-method-option-title"},a),!0===i&&Object(o.createElement)(v,{multiple:r,minRate:c.min,maxRate:c.max}))},y=e=>{let{checked:t,rate:c,showPrice:i,showIcon:s,toggleText:a,shippingCostRequiresAddress:p=!1}=e;const d=p&&(()=>{const e=Object(r.select)("wc/store/validation"),t=e.getValidationError("shipping_state"),c=e.getValidationError("shipping_address_1"),o=e.getValidationError("shipping_country"),i=e.getValidationError("shipping_postcode");return[e.getValidationError("shipping_city"),t,c,o,i].some(e=>void 0!==e)})(),m=void 0!==c.min&&void 0!==c.max,{setValidationErrors:g,clearValidationError:_}=Object(r.useDispatch)(l.VALIDATION_STORE_KEY);Object(o.useEffect)(()=>{"shipping"!==t||m?_("shipping-rates-error"):g({"shipping-rates-error":C})},[t,_,m,g]);const w=void 0===c.min||d?Object(o.createElement)("span",{className:"wc-block-checkout__shipping-method-option-price"},Object(u.__)("calculated with an address","woo-gutenberg-products-block")):Object(o.createElement)(v,{minRate:c.min,maxRate:c.max});return Object(o.createElement)(h.a,{value:"shipping",className:n()("wc-block-checkout__shipping-method-option",{"wc-block-checkout__shipping-method-option--selected":"shipping"===t})},!0===s&&Object(o.createElement)(b.a,{icon:k.a,size:28,className:"wc-block-checkout__shipping-method-option-icon"}),Object(o.createElement)("span",{className:"wc-block-checkout__shipping-method-option-title"},a),!0===i&&w)};var I=e=>{var t,c;let{checked:i,onChange:n,showPrice:s,showIcon:a,localPickupText:r,shippingText:l,shippingCostRequiresAddress:d=!1}=e;const{shippingRates:u}=Object(p.a)();return Object(o.createElement)(m.a,{id:"shipping-method",className:"wc-block-checkout__shipping-method-container",label:"options",onChange:n,checked:i},Object(o.createElement)(y,{checked:i,rate:f(null===(t=u[0])||void 0===t?void 0:t.shipping_rates),showPrice:s,showIcon:a,shippingCostRequiresAddress:d,toggleText:l||N}),Object(o.createElement)(S,{checked:i,rate:E(null===(c=u[0])||void 0===c?void 0:c.shipping_rates),multiple:u.length>1,showPrice:s,showIcon:a,toggleText:r||x}))},T=c(268),P={...Object(T.a)({defaultTitle:Object(u.__)("Shipping method","woo-gutenberg-products-block"),defaultDescription:Object(u.__)("Select how you would like to receive your order.","woo-gutenberg-products-block")}),className:{type:"string",default:""},showIcon:{type:"boolean",default:!0},showPrice:{type:"boolean",default:!0},localPickupText:{type:"string",default:x},shippingText:{type:"string",default:N},lock:{type:"object",default:{move:!0,remove:!0}},shippingCostRequiresAddress:{type:"boolean",default:!1}};t.default=Object(s.withFilteredAttributes)(P)(e=>{let{title:t,description:c,showStepNumber:i,children:s,className:u,showPrice:h,showIcon:m,shippingText:b,localPickupText:g,shippingCostRequiresAddress:k}=e;const{checkoutIsProcessing:_,prefersCollection:w}=Object(r.useSelect)(e=>{const t=e(l.CHECKOUT_STORE_KEY);return{checkoutIsProcessing:t.isProcessing(),prefersCollection:t.prefersCollection()}}),{setPrefersCollection:O}=Object(r.useDispatch)(l.CHECKOUT_STORE_KEY),{shippingRates:v,needsShipping:j,hasCalculatedShipping:f,isCollectable:E}=Object(p.a)();return j&&f&&v&&E&&d.e?Object(o.createElement)(a.a,{id:"shipping-method",disabled:_,className:n()("wc-block-checkout__shipping-method",u),title:t,description:c,showStepNumber:i},Object(o.createElement)(I,{checked:w?"pickup":"shipping",onChange:e=>{O("pickup"===e)},showPrice:h,showIcon:m,localPickupText:g,shippingText:b,shippingCostRequiresAddress:k}),s):null})}}]);