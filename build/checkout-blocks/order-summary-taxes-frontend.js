"use strict";(self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[]).push([[3688],{7834:(e,t,a)=>{a.r(t),a.d(t,{default:()=>p});var s=a(721),r=a(9196),c=a(711),l=a(4293),n=a(4055),o=a(4617);const u={showRateAfterTaxName:{type:"boolean",default:(0,o.getSetting)("displayCartPricesIncludingTax",!1)},lock:{type:"object",default:{remove:!0,move:!1}}},p=(0,s.withFilteredAttributes)(u)((({className:e,showRateAfterTaxName:t})=>{const{cartTotals:a}=(0,n.b)();if((0,o.getSetting)("displayCartPricesIncludingTax",!1)||parseInt(a.total_tax,10)<=0)return null;const s=(0,l.getCurrencyFromPriceResponse)(a);return(0,r.createElement)(c.TotalsWrapper,{className:e},(0,r.createElement)(c.TotalsTaxes,{showRateAfterTaxName:t,currency:s,values:a}))}))}}]);