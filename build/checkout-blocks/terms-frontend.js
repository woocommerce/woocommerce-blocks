"use strict";(self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[]).push([[8806],{9576:(e,t,s)=>{s.d(t,{E:()=>c,X:()=>l});var n=s(9075),a=s(4613),r=s(9818),o=s(4801);const i=(e=!1)=>{const{paymentMethodsInitialized:t,expressPaymentMethodsInitialized:s,availablePaymentMethods:i,availableExpressPaymentMethods:c}=(0,r.useSelect)((e=>{const t=e(o.PAYMENT_STORE_KEY);return{paymentMethodsInitialized:t.paymentMethodsInitialized(),expressPaymentMethodsInitialized:t.expressPaymentMethodsInitialized(),availableExpressPaymentMethods:t.getAvailableExpressPaymentMethods(),availablePaymentMethods:t.getAvailablePaymentMethods()}})),l=Object.values(i).map((({name:e})=>e)),d=Object.values(c).map((({name:e})=>e)),u=(0,a.getPaymentMethods)(),m=(0,a.getExpressPaymentMethods)(),h=Object.keys(u).reduce(((e,t)=>(l.includes(t)&&(e[t]=u[t]),e)),{}),g=Object.keys(m).reduce(((e,t)=>(d.includes(t)&&(e[t]=m[t]),e)),{}),p=(0,n.s)(h),b=(0,n.s)(g);return{paymentMethods:e?b:p,isInitialized:e?s:t}},c=()=>i(!1),l=()=>i(!0)},5390:(e,t,s)=>{s.d(t,{P:()=>i});var n=s(4801),a=s(9818),r=s(5999),o=s(9576);const i=()=>{const{isCalculating:e,isBeforeProcessing:t,isProcessing:s,isAfterProcessing:i,isComplete:c,hasError:l}=(0,a.useSelect)((e=>{const t=e(n.CHECKOUT_STORE_KEY);return{isCalculating:t.isCalculating(),isBeforeProcessing:t.isBeforeProcessing(),isProcessing:t.isProcessing(),isAfterProcessing:t.isAfterProcessing(),isComplete:t.isComplete(),hasError:t.hasError()}})),{activePaymentMethod:d,isExpressPaymentMethodActive:u}=(0,a.useSelect)((e=>{const t=e(n.PAYMENT_STORE_KEY);return{activePaymentMethod:t.getActivePaymentMethod(),isExpressPaymentMethodActive:t.isExpressPaymentMethodActive()}})),{onSubmit:m}=(0,r.U)(),{paymentMethods:h={}}=(0,o.E)(),g=s||i||t,p=c&&!l;return{paymentMethodButtonLabel:(h[d]||{}).placeOrderButtonLabel,onSubmit:m,isCalculating:e,isDisabled:s||u,waitingForProcessing:g,waitingForRedirect:p}}},9075:(e,t,s)=>{s.d(t,{s:()=>o});var n=s(9307),a=s(9127),r=s.n(a);function o(e){const t=(0,n.useRef)(e);return r()(e,t.current)||(t.current=e),t.current}},8365:(e,t,s)=>{s.r(t),s.d(t,{default:()=>P});var n=s(9196),a=s(5736),r=s(4184),o=s.n(r),i=s(9307),c=s(3554),l=s(5390),d=s(4333),u=s(9818),m=s(4801),h=s(5271);const g=h.qy?`<a href="${h.qy}" target="_blank">${(0,a.__)("Terms and Conditions","woo-gutenberg-products-block")}</a>`:(0,a.__)("Terms and Conditions","woo-gutenberg-products-block"),p=h.Sb?`<a href="${h.Sb}" target="_blank">${(0,a.__)("Privacy Policy","woo-gutenberg-products-block")}</a>`:(0,a.__)("Privacy Policy","woo-gutenberg-products-block"),b=(0,a.sprintf)(/* translators: %1$s terms page link, %2$s privacy page link. */
(0,a.__)("By proceeding with your purchase you agree to our %1$s and %2$s","woo-gutenberg-products-block"),g,p),y=(0,a.sprintf)(/* translators: %1$s terms page link, %2$s privacy page link. */
(0,a.__)("You must accept our %1$s and %2$s to continue with your purchase.","woo-gutenberg-products-block"),g,p),P=(0,d.withInstanceId)((({text:e,checkbox:t,instanceId:s,className:r})=>{const[d,h]=(0,i.useState)(!1),{isDisabled:g}=(0,l.P)(),p="terms-and-conditions-"+s,{setValidationErrors:P,clearValidationError:E}=(0,u.useDispatch)(m.VALIDATION_STORE_KEY),_=(0,u.useSelect)((e=>e(m.VALIDATION_STORE_KEY).getValidationError(p))),M=!(null==_||!_.message||null!=_&&_.hidden);return(0,i.useEffect)((()=>{if(t)return d?E(p):P({[p]:{message:(0,a.__)("Please read and accept the terms and conditions.","woo-gutenberg-products-block"),hidden:!0}}),()=>{E(p)}}),[t,d,p,E,P]),(0,n.createElement)("div",{className:o()("wc-block-checkout__terms",{"wc-block-checkout__terms--disabled":g},r)},t?(0,n.createElement)(n.Fragment,null,(0,n.createElement)(c.CheckboxControl,{id:"terms-and-conditions",checked:d,onChange:()=>h((e=>!e)),hasError:M,disabled:g},(0,n.createElement)("span",{dangerouslySetInnerHTML:{__html:e||y}}))):(0,n.createElement)("span",{dangerouslySetInnerHTML:{__html:e||b}}))}))}}]);