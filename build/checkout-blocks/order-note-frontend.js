(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[41],{284:function(e,t,c){"use strict";var n=c(13),o=c.n(n),s=c(0),a=c(6),l=c.n(a);c(285),t.a=e=>{let{children:t,className:c,headingLevel:n,...a}=e;const r=l()("wc-block-components-title",c),d="h"+n;return Object(s.createElement)(d,o()({className:r},a),t)}},285:function(e,t){},287:function(e,t){},310:function(e,t,c){"use strict";var n=c(0),o=c(6),s=c.n(o),a=c(284);c(287);const l=e=>{let{title:t,stepHeadingContent:c}=e;return Object(n.createElement)("div",{className:"wc-block-components-checkout-step__heading"},Object(n.createElement)(a.a,{"aria-hidden":"true",className:"wc-block-components-checkout-step__title",headingLevel:"2"},t),!!c&&Object(n.createElement)("span",{className:"wc-block-components-checkout-step__heading-content"},c))};t.a=e=>{let{id:t,className:c,title:o,legend:a,description:r,children:d,disabled:i=!1,showStepNumber:b=!0,stepHeadingContent:u=(()=>{})}=e;const p=a||o?"fieldset":"div";return Object(n.createElement)(p,{className:s()(c,"wc-block-components-checkout-step",{"wc-block-components-checkout-step--with-step-number":b,"wc-block-components-checkout-step--disabled":i}),id:t,disabled:i},!(!a&&!o)&&Object(n.createElement)("legend",{className:"screen-reader-text"},a||o),!!o&&Object(n.createElement)(l,{title:o,stepHeadingContent:u()}),Object(n.createElement)("div",{className:"wc-block-components-checkout-step__container"},!!r&&Object(n.createElement)("p",{className:"wc-block-components-checkout-step__description"},r),Object(n.createElement)("div",{className:"wc-block-components-checkout-step__content"},d)))}},444:function(e,t){},445:function(e,t){},507:function(e,t,c){"use strict";c.r(t);var n=c(0),o=c(6),s=c.n(o),a=c(1),l=c(310),r=c(120),d=c(7),i=c(3),b=c(11);c(445);const u=e=>{let{className:t="",disabled:c=!1,onTextChange:o,placeholder:a,value:l=""}=e;return Object(n.createElement)("textarea",{className:s()("wc-block-components-textarea",t),disabled:c,onChange:e=>{o(e.target.value)},placeholder:a,rows:2,value:l})};c(444);var p=e=>{let{disabled:t,onChange:c,placeholder:o,value:s}=e;const[l,r]=Object(n.useState)(!1),[d,i]=Object(n.useState)("");return Object(n.createElement)("div",{className:"wc-block-checkout__add-note"},Object(n.createElement)(b.CheckboxControl,{disabled:t,label:Object(a.__)("Add a note to your order","woo-gutenberg-products-block"),checked:l,onChange:e=>{r(e),e?s!==d&&c(d):(c(""),i(s))}}),l&&Object(n.createElement)(u,{disabled:t,onTextChange:c,placeholder:o,value:s}))};t.default=e=>{let{className:t}=e;const{needsShipping:c}=Object(r.a)(),{isProcessing:o,orderNotes:b}=Object(d.useSelect)(e=>{const t=e(i.CHECKOUT_STORE_KEY);return{isProcessing:t.isProcessing(),orderNotes:t.getOrderNotes()}}),{__internalSetOrderNotes:u}=Object(d.useDispatch)(i.CHECKOUT_STORE_KEY);return Object(n.createElement)(l.a,{id:"order-notes",showStepNumber:!1,className:s()("wc-block-checkout__order-notes",t),disabled:o},Object(n.createElement)(p,{disabled:o,onChange:u,placeholder:c?Object(a.__)("Notes about your order, e.g. special notes for delivery.","woo-gutenberg-products-block"):Object(a.__)("Notes about your order.","woo-gutenberg-products-block"),value:b}))}}}]);