"use strict";(self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[]).push([[1758],{7602:(e,o,t)=>{t.r(o),t.d(o,{default:()=>h});var r=t(9196),s=t(4184),c=t.n(s),a=t(5736),n=t(711),l=t(5027),d=t(9818),u=t(4801),b=t(9307),i=t(3554);const p=({disabled:e,onChange:o,placeholder:t,value:s})=>{const[c,l]=(0,b.useState)(!1),[d,u]=(0,b.useState)("");return(0,r.createElement)("div",{className:"wc-block-checkout__add-note"},(0,r.createElement)(i.CheckboxControl,{disabled:e,label:(0,a.__)("Add a note to your order","woo-gutenberg-products-block"),checked:c,onChange:e=>{l(e),e?s!==d&&o(d):(o(""),u(s))}}),c&&(0,r.createElement)(n.Textarea,{disabled:e,onTextChange:o,placeholder:t,value:s}))},h=({className:e})=>{const{needsShipping:o}=(0,l.V)(),{isProcessing:t,orderNotes:s}=(0,d.useSelect)((e=>{const o=e(u.CHECKOUT_STORE_KEY);return{isProcessing:o.isProcessing(),orderNotes:o.getOrderNotes()}})),{__internalSetOrderNotes:b}=(0,d.useDispatch)(u.CHECKOUT_STORE_KEY);return(0,r.createElement)(n.FormStep,{id:"order-notes",showStepNumber:!1,className:c()("wc-block-checkout__order-notes",e),disabled:t},(0,r.createElement)(p,{disabled:t,onChange:b,placeholder:o?(0,a.__)("Notes about your order, e.g. special notes for delivery.","woo-gutenberg-products-block"):(0,a.__)("Notes about your order.","woo-gutenberg-products-block"),value:s}))}}}]);