(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[22],{117:function(e,t,c){"use strict";var n=c(13),a=c.n(n),o=c(0),r=c(150),l=c(5),s=c.n(l);c(222);const i=e=>({thousandSeparator:null==e?void 0:e.thousandSeparator,decimalSeparator:null==e?void 0:e.decimalSeparator,fixedDecimalScale:!0,prefix:null==e?void 0:e.prefix,suffix:null==e?void 0:e.suffix,isNumericString:!0});t.a=e=>{var t;let{className:c,value:n,currency:l,onValueChange:u,displayType:m="text",...b}=e;const p="string"==typeof n?parseInt(n,10):n;if(!Number.isFinite(p))return null;const d=p/10**l.minorUnit;if(!Number.isFinite(d))return null;const v=s()("wc-block-formatted-money-amount","wc-block-components-formatted-money-amount",c),f=null!==(t=b.decimalScale)&&void 0!==t?t:null==l?void 0:l.minorUnit,j={...b,...i(l),decimalScale:f,value:void 0,currency:void 0,onValueChange:void 0},O=u?e=>{const t=+e.value*10**l.minorUnit;u(t)}:()=>{};return Object(o.createElement)(r.a,a()({className:v,displayType:m},j,{value:d,onValueChange:O}))}},222:function(e,t){},379:function(e,t){},446:function(e,t,c){"use strict";var n=c(0),a=c(1),o=c(5),r=c.n(o),l=c(117),s=c(9),i=c(46),u=c(2),m=c(39);c(379),t.a=e=>{let{currency:t,values:c,className:o}=e;const b=Object(u.getSetting)("taxesEnabled",!0)&&Object(u.getSetting)("displayCartPricesIncludingTax",!1),{total_price:p,total_tax:d,tax_lines:v}=c,{receiveCart:f,...j}=Object(i.a)(),O=Object(s.applyCheckoutFilter)({filterName:"totalLabel",defaultValue:Object(a.__)("Total","woo-gutenberg-products-block"),extensions:j.extensions,arg:{cart:j}}),g=parseInt(d,10),x=v&&v.length>0?Object(a.sprintf)(
/* translators: %s is a list of tax rates */
Object(a.__)("Including %s","woo-gutenberg-products-block"),v.map(e=>{let{name:c,price:n}=e;return`${Object(m.formatPrice)(n,t)} ${c}`}).join(", ")):Object(a.__)("Including <TaxAmount/> in taxes","woo-gutenberg-products-block");return Object(n.createElement)(s.TotalsItem,{className:r()("wc-block-components-totals-footer-item",o),currency:t,label:O,value:parseInt(p,10),description:b&&0!==g&&Object(n.createElement)("p",{className:"wc-block-components-totals-footer-item-tax"},Object(n.createInterpolateElement)(x,{TaxAmount:Object(n.createElement)(l.a,{className:"wc-block-components-totals-footer-item-tax-value",currency:t,value:g})}))})}},517:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c(446),o=c(39),r=c(46),l=c(9);const s=()=>{const{extensions:e,receiveCart:t,...c}=Object(r.a)(),a={extensions:e,cart:c,context:"woocommerce/cart"};return Object(n.createElement)(l.ExperimentalOrderMeta.Slot,a)};t.default=e=>{let{children:t,className:c=""}=e;const{cartTotals:l}=Object(r.a)(),i=Object(o.getCurrencyFromPriceResponse)(l);return Object(n.createElement)("div",{className:c},t,Object(n.createElement)("div",{className:"wc-block-components-totals-wrapper"},Object(n.createElement)(a.a,{currency:i,values:l})),Object(n.createElement)(s,null))}}}]);