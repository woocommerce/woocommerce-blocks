(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[53],{116:function(e,t,n){"use strict";var c=n(0);n(134),t.a=()=>Object(c.createElement)("span",{className:"wc-block-components-spinner","aria-hidden":"true"})},117:function(e,t,n){"use strict";var c=n(13),s=n.n(c),r=n(0),a=n(150),i=n(5),o=n.n(i);n(222);const l=e=>({thousandSeparator:null==e?void 0:e.thousandSeparator,decimalSeparator:null==e?void 0:e.decimalSeparator,fixedDecimalScale:!0,prefix:null==e?void 0:e.prefix,suffix:null==e?void 0:e.suffix,isNumericString:!0});t.a=e=>{var t;let{className:n,value:c,currency:i,onValueChange:u,displayType:p="text",...d}=e;const b="string"==typeof c?parseInt(c,10):c;if(!Number.isFinite(b))return null;const m=b/10**i.minorUnit;if(!Number.isFinite(m))return null;const g=o()("wc-block-formatted-money-amount","wc-block-components-formatted-money-amount",n),h=null!==(t=d.decimalScale)&&void 0!==t?t:null==i?void 0:i.minorUnit,O={...d,...l(i),decimalScale:h,value:void 0,currency:void 0,onValueChange:void 0},j=u?e=>{const t=+e.value*10**i.minorUnit;u(t)}:()=>{};return Object(r.createElement)(a.a,s()({className:g,displayType:p},O,{value:m,onValueChange:j}))}},134:function(e,t){},148:function(e,t,n){"use strict";var c=n(13),s=n.n(c),r=n(0),a=n(74),i=n(5),o=n.n(i),l=n(116);n(223),t.a=e=>{let{className:t,showSpinner:n=!1,children:c,variant:i="contained",...u}=e;const p=o()("wc-block-components-button","wp-element-button",t,i,{"wc-block-components-button--loading":n});return Object(r.createElement)(a.a,s()({className:p},u),n&&Object(r.createElement)(l.a,null),Object(r.createElement)("span",{className:"wc-block-components-button__text"},c))}},149:function(e,t,n){"use strict";var c=n(0),s=n(1),r=n(5),a=n.n(r),i=(n(224),n(116));t.a=e=>{let{children:t,className:n,screenReaderLabel:r,showSpinner:o=!1,isLoading:l=!0}=e;return Object(c.createElement)("div",{className:a()(n,{"wc-block-components-loading-mask":l})},l&&o&&Object(c.createElement)(i.a,null),Object(c.createElement)("div",{className:a()({"wc-block-components-loading-mask__children":l}),"aria-hidden":l},t),l&&Object(c.createElement)("span",{className:"screen-reader-text"},r||Object(s.__)("Loading…","woo-gutenberg-products-block")))}},20:function(e,t,n){"use strict";var c=n(0),s=n(5),r=n.n(s);t.a=e=>{let t,{label:n,screenReaderLabel:s,wrapperElement:a,wrapperProps:i={}}=e;const o=null!=n,l=null!=s;return!o&&l?(t=a||"span",i={...i,className:r()(i.className,"screen-reader-text")},Object(c.createElement)(t,i,s)):(t=a||c.Fragment,o&&l&&n!==s?Object(c.createElement)(t,i,Object(c.createElement)("span",{"aria-hidden":"true"},n),Object(c.createElement)("span",{className:"screen-reader-text"},s)):Object(c.createElement)(t,i,n))}},222:function(e,t){},223:function(e,t){},224:function(e,t){},277:function(e,t,n){"use strict";var c=n(0),s=n(12);const r=Object(c.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(s.Path,{d:"M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"}));t.a=r},291:function(e,t,n){"use strict";var c=n(0),s=n(5),r=n.n(s),a=n(292);t.a=e=>{let{checked:t,name:n,onChange:s,option:i}=e;const{value:o,label:l,description:u,secondaryLabel:p,secondaryDescription:d}=i;return Object(c.createElement)("label",{className:r()("wc-block-components-radio-control__option",{"wc-block-components-radio-control__option-checked":t}),htmlFor:`${n}-${o}`},Object(c.createElement)("input",{id:`${n}-${o}`,className:"wc-block-components-radio-control__input",type:"radio",name:n,value:o,onChange:e=>s(e.target.value),checked:t,"aria-describedby":r()({[`${n}-${o}__label`]:l,[`${n}-${o}__secondary-label`]:p,[`${n}-${o}__description`]:u,[`${n}-${o}__secondary-description`]:d})}),Object(c.createElement)(a.a,{id:`${n}-${o}`,label:l,secondaryLabel:p,description:u,secondaryDescription:d}))}},292:function(e,t,n){"use strict";var c=n(0);t.a=e=>{let{label:t,secondaryLabel:n,description:s,secondaryDescription:r,id:a}=e;return Object(c.createElement)("div",{className:"wc-block-components-radio-control__option-layout"},Object(c.createElement)("div",{className:"wc-block-components-radio-control__label-group"},t&&Object(c.createElement)("span",{id:a&&a+"__label",className:"wc-block-components-radio-control__label"},t),n&&Object(c.createElement)("span",{id:a&&a+"__secondary-label",className:"wc-block-components-radio-control__secondary-label"},n)),(s||r)&&Object(c.createElement)("div",{className:"wc-block-components-radio-control__description-group"},s&&Object(c.createElement)("span",{id:a&&a+"__description",className:"wc-block-components-radio-control__description"},s),r&&Object(c.createElement)("span",{id:a&&a+"__secondary-description",className:"wc-block-components-radio-control__secondary-description"},r)))}},293:function(e,t,n){"use strict";var c=n(13),s=n.n(c),r=n(0),a=n(5),i=n.n(a);n(294),t.a=e=>{let{children:t,className:n,headingLevel:c,...a}=e;const o=i()("wc-block-components-title",n),l="h"+c;return Object(r.createElement)(l,s()({className:o},a),t)}},294:function(e,t){},295:function(e,t){},296:function(e,t,n){"use strict";var c=n(1);t.a=e=>{let{defaultTitle:t=Object(c.__)("Step","woo-gutenberg-products-block"),defaultDescription:n=Object(c.__)("Step description text.","woo-gutenberg-products-block"),defaultShowStepNumber:s=!0}=e;return{title:{type:"string",default:t},description:{type:"string",default:n},showStepNumber:{type:"boolean",default:s}}}},299:function(e,t,n){"use strict";var c=n(0),s=n(5),r=n.n(s),a=n(11),i=n(291);n(302);const o=e=>{let{className:t="",id:n,selected:s="",onChange:l,options:u=[]}=e;const p=Object(a.useInstanceId)(o),d=n||p;return u.length?Object(c.createElement)("div",{className:r()("wc-block-components-radio-control",t)},u.map(e=>Object(c.createElement)(i.a,{key:`${d}-${e.value}`,name:"radio-control-"+d,checked:e.value===s,option:e,onChange:t=>{l(t),"function"==typeof e.onChange&&e.onChange(t)}}))):null};t.a=o},300:function(e,t,n){"use strict";var c=n(0),s=n(5),r=n.n(s),a=n(1),i=n(82),o=n(277),l=(n(315),n(343)),u=n(12),p=Object(c.createElement)(u.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(u.Path,{d:"M12 3.2c-4.8 0-8.8 3.9-8.8 8.8 0 4.8 3.9 8.8 8.8 8.8 4.8 0 8.8-3.9 8.8-8.8 0-4.8-4-8.8-8.8-8.8zm0 16c-4 0-7.2-3.3-7.2-7.2C4.8 8 8 4.8 12 4.8s7.2 3.3 7.2 7.2c0 4-3.2 7.2-7.2 7.2zM11 17h2v-6h-2v6zm0-8h2V7h-2v2z"})),d=Object(c.createElement)(u.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(u.Path,{fillRule:"evenodd",d:"M6.863 13.644L5 13.25h-.5a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5H5L18 6.5h2V16h-2l-3.854-.815.026.008a3.75 3.75 0 01-7.31-1.549zm1.477.313a2.251 2.251 0 004.356.921l-4.356-.921zm-2.84-3.28L18.157 8h.343v6.5h-.343L5.5 11.823v-1.146z",clipRule:"evenodd"}));const b=e=>{switch(e){case"success":case"warning":case"info":case"default":return"polite";case"error":default:return"assertive"}},m=e=>{switch(e){case"success":return l.a;case"warning":case"info":case"error":return p;default:return d}};var g=n(148),h=n(30);t.a=e=>{let{className:t,status:n="default",children:s,spokenMessage:l=s,onRemove:u=(()=>{}),isDismissible:p=!0,politeness:d=b(n),summary:O}=e;return((e,t)=>{const n="string"==typeof e?e:Object(c.renderToString)(e);Object(c.useEffect)(()=>{n&&Object(h.speak)(n,t)},[n,t])})(l,d),Object(c.createElement)("div",{className:r()(t,"wc-block-components-notice-banner","is-"+n,{"is-dismissible":p})},Object(c.createElement)(i.a,{icon:m(n)}),Object(c.createElement)("div",{className:"wc-block-components-notice-banner__content"},O&&Object(c.createElement)("p",{className:"wc-block-components-notice-banner__summary"},O),s),!!p&&Object(c.createElement)(g.a,{className:"wc-block-components-notice-banner__dismiss",icon:o.a,label:Object(a.__)("Dismiss this notice","woo-gutenberg-products-block"),onClick:e=>{"function"==typeof(null==e?void 0:e.preventDefault)&&e.preventDefault&&e.preventDefault(),u()},showTooltip:!1}))}},302:function(e,t){},313:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var c=n(4),s=n(3);const r=()=>{const{customerData:e,isInitialized:t}=Object(c.useSelect)(e=>{const t=e(s.CART_STORE_KEY);return{customerData:t.getCustomerData(),isInitialized:t.hasFinishedResolution("getCartData")}}),{setShippingAddress:n,setBillingAddress:r}=Object(c.useDispatch)(s.CART_STORE_KEY);return{isInitialized:t,billingAddress:e.billingAddress,shippingAddress:e.shippingAddress,setBillingAddress:r,setShippingAddress:n}}},314:function(e,t){},315:function(e,t){},316:function(e,t,n){"use strict";var c=n(0),s=n(5),r=n.n(s),a=n(1),i=n(22),o=n(9),l=n(20),u=n(94),p=n(75),d=n(319),b=n.n(d);const m=["a","b","em","i","strong","p","br"],g=["target","href","rel","name","download"],h=(e,t)=>{const n=(null==t?void 0:t.tags)||m,c=(null==t?void 0:t.attr)||g;return b.a.sanitize(e,{ALLOWED_TAGS:n,ALLOWED_ATTR:c})};var O=n(55),j=n(299),f=n(292),_=n(39),w=n(117),v=n(2);const E=e=>{const t=Object(v.getSetting)("displayCartPricesIncludingTax",!1)?parseInt(e.price,10)+parseInt(e.taxes,10):parseInt(e.price,10);return{label:Object(i.decodeEntities)(e.name),value:e.rate_id,description:Object(c.createElement)(c.Fragment,null,Number.isFinite(t)&&Object(c.createElement)(w.a,{currency:Object(_.getCurrencyFromPriceResponse)(e),value:t}),Number.isFinite(t)&&e.delivery_time?" — ":null,Object(i.decodeEntities)(e.delivery_time))}};var k=e=>{let{className:t="",noResultsMessage:n,onSelectRate:s,rates:r,renderOption:a=E,selectedRate:i}=e;const o=(null==i?void 0:i.rate_id)||"",[l,u]=Object(c.useState)(o);if(Object(c.useEffect)(()=>{o&&u(o)},[o]),Object(c.useEffect)(()=>{const e=r.some(e=>{let{selected:t}=e;return t});var t,n;(!l&&r[0]||!e)&&(u(null===(t=r[0])||void 0===t?void 0:t.rate_id),s(null===(n=r[0])||void 0===n?void 0:n.rate_id))},[s,r,l]),0===r.length)return n;if(r.length>1)return Object(c.createElement)(j.a,{className:t,onChange:e=>{u(e),s(e)},selected:l,options:r.map(a)});const{label:p,secondaryLabel:d,description:b,secondaryDescription:m}=a(r[0]);return Object(c.createElement)(f.a,{label:p,secondaryLabel:d,description:b,secondaryDescription:m})};n(314),t.a=e=>{let{packageId:t,className:n="",noResultsMessage:s,renderOption:d,packageData:b,collapsible:m,showItems:g}=e;const{selectShippingRate:j}=Object(u.a)(),{dispatchCheckoutEvent:f}=Object(p.a)(),_=document.querySelectorAll(".wc-block-components-shipping-rates-control__package").length>1,w=null!=g?g:_,v=null!=m?m:_,E=Object(c.createElement)(c.Fragment,null,(v||w)&&Object(c.createElement)("div",{className:"wc-block-components-shipping-rates-control__package-title",dangerouslySetInnerHTML:{__html:h(b.name)}}),w&&Object(c.createElement)("ul",{className:"wc-block-components-shipping-rates-control__package-items"},Object.values(b.items).map(e=>{const t=Object(i.decodeEntities)(e.name),n=e.quantity;return Object(c.createElement)("li",{key:e.key,className:"wc-block-components-shipping-rates-control__package-item"},Object(c.createElement)(l.a,{label:n>1?`${t} × ${n}`:""+t,screenReaderLabel:Object(a.sprintf)(
/* translators: %1$s name of the product (ie: Sunglasses), %2$d number of units in the current cart package */
Object(a._n)("%1$s (%2$d unit)","%1$s (%2$d units)",n,"woo-gutenberg-products-block"),t,n)}))}))),S=Object(c.useCallback)(e=>{j(e,t),f("set-selected-shipping-rate",{shippingRateId:e})},[f,t,j]),N=Object(O.a)(S,1e3),y={className:n,noResultsMessage:s,rates:b.shipping_rates,onSelectRate:N,selectedRate:b.shipping_rates.find(e=>e.selected),renderOption:d};return v?Object(c.createElement)(o.Panel,{className:"wc-block-components-shipping-rates-control__package",initialOpen:!1,title:E},Object(c.createElement)(k,y)):Object(c.createElement)("div",{className:r()("wc-block-components-shipping-rates-control__package",n)},E,Object(c.createElement)(k,y))}},320:function(e,t,n){"use strict";var c=n(0),s=n(5),r=n.n(s),a=n(293);n(295);const i=e=>{let{title:t,stepHeadingContent:n}=e;return Object(c.createElement)("div",{className:"wc-block-components-checkout-step__heading"},Object(c.createElement)(a.a,{"aria-hidden":"true",className:"wc-block-components-checkout-step__title",headingLevel:"2"},t),!!n&&Object(c.createElement)("span",{className:"wc-block-components-checkout-step__heading-content"},n))};t.a=e=>{let{id:t,className:n,title:s,legend:a,description:o,children:l,disabled:u=!1,showStepNumber:p=!0,stepHeadingContent:d=(()=>{})}=e;const b=a||s?"fieldset":"div";return Object(c.createElement)(b,{className:r()(n,"wc-block-components-checkout-step",{"wc-block-components-checkout-step--with-step-number":p,"wc-block-components-checkout-step--disabled":u}),id:t,disabled:u},!(!a&&!s)&&Object(c.createElement)("legend",{className:"screen-reader-text"},a||s),!!s&&Object(c.createElement)(i,{title:s,stepHeadingContent:d()}),Object(c.createElement)("div",{className:"wc-block-components-checkout-step__container"},!!o&&Object(c.createElement)("p",{className:"wc-block-components-checkout-step__description"},o),Object(c.createElement)("div",{className:"wc-block-components-checkout-step__content"},l)))}},343:function(e,t,n){"use strict";var c=n(0),s=n(12);const r=Object(c.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(s.Path,{d:"M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"}));t.a=r},363:function(e,t,n){"use strict";var c=n(0),s=n(1),r=n(149),a=n(9),i=n(89),o=n(46),l=n(52),u=n(94),p=n(300),d=n(21),b=n(316),m=n(30);const g=e=>{let{packages:t,showItems:n,collapsible:s,noResultsMessage:r,renderOption:a}=e;return t.length?Object(c.createElement)(c.Fragment,null,t.map(e=>{let{package_id:t,...i}=e;return Object(c.createElement)(b.a,{key:t,packageId:t,packageData:i,collapsible:s,showItems:n,noResultsMessage:r,renderOption:a})})):null};t.a=e=>{let{shippingRates:t,isLoadingRates:n,className:h,collapsible:O,showItems:j,noResultsMessage:f,renderOption:_,context:w}=e;Object(c.useEffect)(()=>{var e,c;n||(e=Object(i.a)(t),c=Object(i.b)(t),1===e?Object(m.speak)(Object(s.sprintf)(
/* translators: %d number of shipping options found. */
Object(s._n)("%d shipping option was found.","%d shipping options were found.",c,"woo-gutenberg-products-block"),c)):Object(m.speak)(Object(s.sprintf)(
/* translators: %d number of shipping packages packages. */
Object(s._n)("Shipping option searched for %d package.","Shipping options searched for %d packages.",e,"woo-gutenberg-products-block"),e)+" "+Object(s.sprintf)(
/* translators: %d number of shipping options available. */
Object(s._n)("%d shipping option was found","%d shipping options were found",c,"woo-gutenberg-products-block"),c)))},[n,t]);const{extensions:v,receiveCart:E,...k}=Object(o.a)(),S={className:h,collapsible:O,showItems:j,noResultsMessage:f,renderOption:_,extensions:v,cart:k,components:{ShippingRatesControlPackage:b.a},context:w},{isEditor:N}=Object(l.a)(),{hasSelectedLocalPickup:y,selectedRates:R}=Object(u.a)(),C=Object(d.a)(R)?Object.values(R):[],A=C.every(e=>e===C[0]);return Object(c.createElement)(r.a,{isLoading:n,screenReaderLabel:Object(s.__)("Loading shipping rates…","woo-gutenberg-products-block"),showSpinner:!0},y&&"woocommerce/cart"===w&&t.length>1&&!A&&!N&&Object(c.createElement)(p.a,{className:"wc-block-components-notice",isDismissible:!1,status:"warning"},Object(s.__)("Multiple shipments must have the same pickup location","woo-gutenberg-products-block")),Object(c.createElement)(a.ExperimentalOrderShippingPackages.Slot,S),Object(c.createElement)(a.ExperimentalOrderShippingPackages,null,Object(c.createElement)(g,{packages:t,noResultsMessage:f,renderOption:_})))}},411:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var c=n(2),s=n(0),r=n(4),a=n(3),i=n(313),o=n(94);const l=()=>{const{needsShipping:e}=Object(o.a)(),{useShippingAsBilling:t,prefersCollection:n}=Object(r.useSelect)(e=>({useShippingAsBilling:e(a.CHECKOUT_STORE_KEY).getUseShippingAsBilling(),prefersCollection:e(a.CHECKOUT_STORE_KEY).prefersCollection()})),{__internalSetUseShippingAsBilling:l}=Object(r.useDispatch)(a.CHECKOUT_STORE_KEY),{billingAddress:u,setBillingAddress:p,shippingAddress:d,setShippingAddress:b}=Object(i.a)(),m=Object(s.useCallback)(e=>{p({email:e})},[p]),g=Object(s.useCallback)(e=>{p({phone:e})},[p]),h=Object(s.useCallback)(e=>{b({phone:e})},[b]),O=Object(c.getSetting)("forcedBillingAddress",!1);return{shippingAddress:d,billingAddress:u,setShippingAddress:b,setBillingAddress:p,setEmail:m,setBillingPhone:g,setShippingPhone:h,defaultAddressFields:c.defaultAddressFields,useShippingAsBilling:t,setUseShippingAsBilling:l,needsShipping:e,showShippingFields:!O&&e&&!n,showShippingMethods:e&&!n,showBillingFields:!e||!t||n,forcedBillingAddress:O,useBillingAsShipping:O||n}}},513:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n(5),r=n.n(s),a=n(147),i=n(320),o=n(411),l=n(4),u=n(3),p=n(1),d=n(94),b=n(313),m=n(363),g=n(89),h=n(142),O=n(39),j=n(117),f=n(52),_=n(37),w=n(9),v=n(22),E=n(2),k=n(300);const S=e=>{const t=Object(E.getSetting)("displayCartPricesIncludingTax",!1)?parseInt(e.price,10)+parseInt(e.taxes,10):parseInt(e.price,10);return{label:Object(v.decodeEntities)(e.name),value:e.rate_id,description:Object(v.decodeEntities)(e.description),secondaryLabel:Object(c.createElement)(j.a,{currency:Object(O.getCurrencyFromPriceResponse)(e),value:t}),secondaryDescription:Object(v.decodeEntities)(e.delivery_time)}};var N=e=>{let{noShippingPlaceholder:t=null}=e;const{isEditor:n}=Object(f.a)(),{shippingRates:s,needsShipping:r,isLoadingRates:a,hasCalculatedShipping:i,isCollectable:o}=Object(d.a)(),{shippingAddress:l}=Object(b.a)(),u=o?s.map(e=>({...e,shipping_rates:e.shipping_rates.filter(e=>!Object(g.c)(e.method_id))})):s;if(!r)return null;const O=Object(g.a)(s);if(!i&&!O)return Object(c.createElement)("p",null,Object(p.__)("Shipping options will be displayed here after entering your full shipping address.","woo-gutenberg-products-block"));const j=Object(h.c)(l);return Object(c.createElement)(c.Fragment,null,Object(c.createElement)(w.StoreNoticesContainer,{context:_.d.SHIPPING_METHODS}),n&&!O?t:Object(c.createElement)(m.a,{noResultsMessage:Object(c.createElement)(c.Fragment,null,j?Object(c.createElement)(k.a,{isDismissible:!1,className:"wc-block-components-shipping-rates-control__no-results-notice",status:"warning"},Object(p.__)("There are no shipping options available. Please check your shipping address.","woo-gutenberg-products-block")):Object(p.__)("Add a shipping address to view shipping options.","woo-gutenberg-products-block")),renderOption:S,collapsible:!1,shippingRates:u,isLoadingRates:a,context:"woocommerce/checkout"}))},y=n(296),R={...Object(y.a)({defaultTitle:Object(p.__)("Shipping options","woo-gutenberg-products-block"),defaultDescription:""}),className:{type:"string",default:""},lock:{type:"object",default:{move:!0,remove:!0}},shippingCostRequiresAddress:{type:"boolean",default:!1}};t.default=Object(a.withFilteredAttributes)(R)(e=>{let{title:t,description:n,showStepNumber:s,children:a,className:p}=e;const d=Object(l.useSelect)(e=>e(u.CHECKOUT_STORE_KEY).isProcessing()),{showShippingMethods:b}=Object(o.a)();return b?Object(c.createElement)(i.a,{id:"shipping-option",disabled:d,className:r()("wc-block-checkout__shipping-option",p),title:t,description:n,showStepNumber:s},Object(c.createElement)(N,null),a):null})},55:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c=n(8);function s(e,t,n){var s=this,r=Object(c.useRef)(null),a=Object(c.useRef)(0),i=Object(c.useRef)(null),o=Object(c.useRef)([]),l=Object(c.useRef)(),u=Object(c.useRef)(),p=Object(c.useRef)(e),d=Object(c.useRef)(!0);p.current=e;var b=!t&&0!==t&&"undefined"!=typeof window;if("function"!=typeof e)throw new TypeError("Expected a function");t=+t||0;var m=!!(n=n||{}).leading,g=!("trailing"in n)||!!n.trailing,h="maxWait"in n,O=h?Math.max(+n.maxWait||0,t):null;return Object(c.useEffect)((function(){return d.current=!0,function(){d.current=!1}}),[]),Object(c.useMemo)((function(){var e=function(e){var t=o.current,n=l.current;return o.current=l.current=null,a.current=e,u.current=p.current.apply(n,t)},n=function(e,t){b&&cancelAnimationFrame(i.current),i.current=b?requestAnimationFrame(e):setTimeout(e,t)},c=function(e){if(!d.current)return!1;var n=e-r.current,c=e-a.current;return!r.current||n>=t||n<0||h&&c>=O},j=function(t){return i.current=null,g&&o.current?e(t):(o.current=l.current=null,u.current)},f=function(){var e=Date.now();if(c(e))return j(e);if(d.current){var s=e-r.current,i=e-a.current,o=t-s,l=h?Math.min(o,O-i):o;n(f,l)}},_=function(){for(var p=[],b=0;b<arguments.length;b++)p[b]=arguments[b];var g=Date.now(),O=c(g);if(o.current=p,l.current=s,r.current=g,O){if(!i.current&&d.current)return a.current=r.current,n(f,t),m?e(r.current):u.current;if(h)return n(f,t),e(r.current)}return i.current||n(f,t),u.current};return _.cancel=function(){i.current&&(b?cancelAnimationFrame(i.current):clearTimeout(i.current)),a.current=0,o.current=r.current=l.current=i.current=null},_.isPending=function(){return!!i.current},_.flush=function(){return i.current?j(Date.now()):u.current},_}),[m,h,t,O,g,b])}}}]);