(()=>{"use strict";const e=window.React,t=window.wc.wcBlocksRegistry,n=window.wp.i18n,o=window.wc.wcSettings,i=window.wp.htmlEntities;var l;const s=(0,o.getPaymentMethodData)("cod",{}),r=(0,n.__)("Cash on delivery","woo-gutenberg-products-block"),c=(0,i.decodeEntities)((null==s?void 0:s.title)||"")||r,a=()=>(0,i.decodeEntities)(s.description||""),d={name:"cod",label:(0,e.createElement)((t=>{const{PaymentMethodLabel:n}=t.components;return(0,e.createElement)(n,{text:c})}),null),content:(0,e.createElement)(a,null),edit:(0,e.createElement)(a,null),canMakePayment:({cartNeedsShipping:e,selectedShippingMethods:t})=>{if(!s.enableForVirtual&&!e)return!1;if(!s.enableForShippingMethods.length)return!0;const n=Object.values(t);return s.enableForShippingMethods.some((e=>n.some((t=>t.includes(e)))))},ariaLabel:c,supports:{features:null!==(l=null==s?void 0:s.supports)&&void 0!==l?l:[]}};(0,t.registerPaymentMethod)(d)})();