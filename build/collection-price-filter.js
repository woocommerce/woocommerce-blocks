(()=>{var e,t={2571:(e,t,r)=>{"use strict";r.r(t);var n=r(9196);const o=window.wp.blocks;var i=r(1984),c=r(5032);r(4281);const a=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","name":"woocommerce/collection-price-filter","version":"1.0.0","title":"Collection Price Filter","description":"Enable customers to filter the product collection by choosing a price range.","category":"woocommerce","keywords":["WooCommerce"],"textdomain":"woo-gutenberg-products-block","apiVersion":2,"ancestor":["woocommerce/collection-filters"],"supports":{"interactivity":true},"usesContext":["collectionData"],"attributes":{"queryParam":{"type":"object","default":{"calculate_price_range":"true"}},"showInputFields":{"type":"boolean","default":true},"inlineInput":{"type":"boolean","default":false}}}'),l=window.wp.blockEditor;var s=r(4184),p=r.n(s);const u=window.wc.priceFormat;function m(e,t){return!(e=>null===e)(r=e)&&r instanceof Object&&r.constructor===Object&&t in e;var r}const d=e=>"string"==typeof e;function g(e,t){return("number"==typeof e?e:parseInt(e,10))/10**t.minorUnit}const b=({attributes:e,context:t})=>{const{showInputFields:r}=e,{minPrice:o,maxPrice:i,formattedMinPrice:c,formattedMaxPrice:a}=function(e){const t=(0,u.getCurrency)({minorUnit:0});if(!m(e,"price_range"))return{minPrice:0,maxPrice:0,minRange:0,maxRange:0,formattedMinPrice:(0,u.formatPrice)(0,t),formattedMaxPrice:(0,u.formatPrice)(0,t)};const r=(0,u.getCurrencyFromPriceResponse)(e.price_range),n=m(e.price_range,"min_price")&&d(e.price_range.min_price)?g(e.price_range.min_price,r):0,o=m(e.price_range,"max_price")&&d(e.price_range.max_price)?g(e.price_range.max_price,r):0;return{minPrice:n,maxPrice:o,minRange:n,maxRange:o,formattedMinPrice:(0,u.formatPrice)(n,t),formattedMaxPrice:(0,u.formatPrice)(o,t)}}(t.collectionData),l=()=>null,s=r?(0,n.createElement)("input",{className:"min",type:"text",value:o,onChange:l}):(0,n.createElement)("span",null,c),p=r?(0,n.createElement)("input",{className:"max",type:"text",value:i,onChange:l}):(0,n.createElement)("span",null,a);return(0,n.createElement)(n.Fragment,null,(0,n.createElement)("div",{className:"range"},(0,n.createElement)("div",{className:"range-bar"}),(0,n.createElement)("input",{type:"range",className:"min",min:o,max:i,value:o,onChange:l}),(0,n.createElement)("input",{type:"range",className:"max",min:o,max:i,value:i,onChange:l})),(0,n.createElement)("div",{className:"text"},s,p))};var w=r(5736);const f=window.wp.components,_=({attributes:e,setAttributes:t})=>{const{showInputFields:r,inlineInput:o}=e;return(0,n.createElement)(l.InspectorControls,null,(0,n.createElement)(f.PanelBody,{title:(0,w.__)("Settings","woo-gutenberg-products-block")},(0,n.createElement)(f.__experimentalToggleGroupControl,{label:(0,w.__)("Price Slider","woo-gutenberg-products-block"),value:r?"editable":"text",onChange:e=>t({showInputFields:"editable"===e}),className:"wc-block-price-filter__price-range-toggle"},(0,n.createElement)(f.__experimentalToggleGroupControlOption,{value:"editable",label:(0,w.__)("Editable","woo-gutenberg-products-block")}),(0,n.createElement)(f.__experimentalToggleGroupControlOption,{value:"text",label:(0,w.__)("Text","woo-gutenberg-products-block")})),r&&(0,n.createElement)(f.ToggleControl,{label:(0,w.__)("Inline input fields","woo-gutenberg-products-block"),checked:o,onChange:()=>t({inlineInput:!o}),help:(0,w.__)("Show input fields inline with the slider.","woo-gutenberg-products-block")})))};(0,o.registerBlockType)(a,{icon:{src:(0,n.createElement)(i.Z,{icon:c.Z,className:"wc-block-editor-components-block-icon"})},edit:e=>{const{showInputFields:t,inlineInput:r}=e.attributes,o=(0,l.useBlockProps)({className:p()({"inline-input":r&&t})});return(0,n.createElement)("div",{...o},(0,n.createElement)(_,{...e}),(0,n.createElement)(b,{...e}))}})},4281:()=>{},9196:e=>{"use strict";e.exports=window.React},9307:e=>{"use strict";e.exports=window.wp.element},5736:e=>{"use strict";e.exports=window.wp.i18n},444:e=>{"use strict";e.exports=window.wp.primitives}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={exports:{}};return t[e].call(i.exports,i,i.exports,n),i.exports}n.m=t,e=[],n.O=(t,r,o,i)=>{if(!r){var c=1/0;for(p=0;p<e.length;p++){for(var[r,o,i]=e[p],a=!0,l=0;l<r.length;l++)(!1&i||c>=i)&&Object.keys(n.O).every((e=>n.O[e](r[l])))?r.splice(l--,1):(a=!1,i<c&&(c=i));if(a){e.splice(p--,1);var s=o();void 0!==s&&(t=s)}}return t}i=i||0;for(var p=e.length;p>0&&e[p-1][2]>i;p--)e[p]=e[p-1];e[p]=[r,o,i]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.j=5700,(()=>{var e={5700:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,i,[c,a,l]=r,s=0;if(c.some((t=>0!==e[t]))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(l)var p=l(n)}for(t&&t(r);s<c.length;s++)i=c[s],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(p)},r=self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[2869],(()=>n(2571)));o=n.O(o),((this.wc=this.wc||{}).blocks=this.wc.blocks||{})["collection-price-filter"]=o})();