(()=>{"use strict";const e=window.React,t=window.wc.wcBlocksRegistry,n=window.wp.i18n,o=window.wc.wcSettings,c=window.wp.htmlEntities;var i;const l=(0,o.getPaymentMethodData)("cheque",{}),a=(0,n.__)("Check payment","woo-gutenberg-products-block"),s=(0,c.decodeEntities)((null==l?void 0:l.title)||"")||a,d=()=>(0,c.decodeEntities)(l.description||""),r={name:"cheque",label:(0,e.createElement)((t=>{const{PaymentMethodLabel:n}=t.components;return(0,e.createElement)(n,{text:s})}),null),content:(0,e.createElement)(d,null),edit:(0,e.createElement)(d,null),canMakePayment:()=>!0,ariaLabel:s,supports:{features:null!==(i=null==l?void 0:l.supports)&&void 0!==i?i:[]}};(0,t.registerPaymentMethod)(r)})();