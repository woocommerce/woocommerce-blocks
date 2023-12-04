(()=>{"use strict";const e=window.wc.__experimentalInteractivity,t=window.wc.priceFormat,r=({state:e})=>{const{minPrice:t,maxPrice:r}=e.filters,i=new URL(window.location.href),{searchParams:a}=i;return t>0?a.set("min_price",t.toString()):a.delete("min_price"),r<e.filters.maxRange?a.set("max_price",r.toString()):a.delete("max_price"),a.forEach(((e,t)=>{/query-[0-9]+-page/.test(t)&&a.delete(t)})),i.href};(0,e.store)({state:{filters:{rangeStyle:({state:e})=>{const{minPrice:t,maxPrice:r,minRange:i,maxRange:a}=e.filters;return[`--low: ${100*(t-i)/(a-i)}%`,`--high: ${100*(r-i)/(a-i)}%`].join(";")},formattedMinPrice:({state:e})=>{const{minPrice:r}=e.filters;return(0,t.formatPrice)(r,(0,t.getCurrency)({minorUnit:0}))},formattedMaxPrice:({state:e})=>{const{maxPrice:r}=e.filters;return(0,t.formatPrice)(r,(0,t.getCurrency)({minorUnit:0}))}}},actions:{filters:{setMinPrice:({state:e,event:t})=>{const r=parseFloat(t.target.value);e.filters.minPrice=Math.min(Number.isNaN(r)?e.filters.minRange:r,e.filters.maxRange-1),e.filters.maxPrice=Math.max(e.filters.maxPrice,e.filters.minPrice+1)},setMaxPrice:({state:e,event:t})=>{const r=parseFloat(t.target.value);e.filters.maxPrice=Math.max(Number.isNaN(r)?e.filters.maxRange:r,e.filters.minRange+1),e.filters.minPrice=Math.min(e.filters.minPrice,e.filters.maxPrice-1)},updateProducts:({state:t})=>{(0,e.navigate)(r({state:t}))},reset:({state:t})=>{t.filters.minPrice=0,t.filters.maxPrice=t.filters.maxRange,(0,e.navigate)(r({state:t}))}}}})})();