this.wc=this.wc||{},this.wc.wcBlocksSharedHocs=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=186)}({0:function(e,t){e.exports=window.wp.element},11:function(e,t){function r(){return e.exports=r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},e.exports.__esModule=!0,e.exports.default=e.exports,r.apply(this,arguments)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},17:function(e,t){e.exports=window.wc.wcBlocksData},18:function(e,t){e.exports=window.wp.isShallowEqual},186:function(e,t,r){"use strict";r.r(t),r.d(t,"withProductDataContext",(function(){return O})),r.d(t,"withFilteredAttributes",(function(){return w}));var n=r(11),o=r.n(n),c=r(0),u=r(17),s=r(2),a=r(18),i=r.n(a);function l(e){const t=Object(c.useRef)(e);return i()(e,t.current)||(t.current=e),t.current}var d=r(22);const p=e=>{const t={namespace:"/wc/store/v1",resourceName:"products"},{results:r,isLoading:n}=(e=>{const{namespace:t,resourceName:r,resourceValues:n=[],query:o={},shouldSelect:a=!0,isEditor:i=!1}=e;if(!t||!r)throw new Error("The options object must have valid values for the namespace and the resource properties.");const p=Object(c.useRef)({results:[],isLoading:!0}),f=l(o),b=l(n),O=(()=>{const[,e]=Object(c.useState)();return Object(c.useCallback)(t=>{e(()=>{throw t})},[])})(),w=Object(s.useSelect)(e=>{var n;if(i&&Object(d.a)(null==p||null===(n=p.current)||void 0===n?void 0:n.results)&&Object.keys(p.current.results).length>0)return{results:p.current.results,isLoading:!1};if(!a)return null;const o=e(u.COLLECTIONS_STORE_KEY),c=[t,r,f,b],s=o.getCollectionError(...c);if(s){if(!(s instanceof Error))throw new Error("TypeError: `error` object is not an instance of Error constructor");O(s)}return{results:o.getCollection(...c),isLoading:!o.hasFinishedResolution("getCollection",c)}},[t,r,b,f,a]);return null!==w&&(p.current=w),p.current})({...t,query:e}),{value:o}=((e,t)=>{const{namespace:r,resourceName:n,resourceValues:o=[],query:c={}}=t;if(!r||!n)throw new Error("The options object must have valid values for the namespace and the resource name properties.");const a=l(c),i=l(o),{value:d,isLoading:p=!0}=Object(s.useSelect)(e=>{const t=e(u.COLLECTIONS_STORE_KEY),o=["x-wp-total",r,n,a,i];return{value:t.getCollectionHeader(...o),isLoading:t.hasFinishedResolution("getCollectionHeader",o)}},["x-wp-total",r,n,i,a]);return{value:d,isLoading:p}})(0,{...t,query:e});return{products:r,totalProducts:parseInt(o,10),productsLoading:n}};var f=r(53);const b=e=>{const{productId:t,OriginalComponent:r,postId:n,product:o}=e,u=null!=e&&e.isDescendentOfQueryLoop?n:t,{products:s,productsLoading:a}=p({include:u}),i={product:u>0&&s.length>0?s[0]:null,isLoading:a};return o?Object(c.createElement)(f.ProductDataContextProvider,{product:o,isLoading:!1},Object(c.createElement)(r,e)):Object(c.createElement)(f.ProductDataContextProvider,{product:i.product,isLoading:i.isLoading},Object(c.createElement)(r,e))},O=e=>t=>{const r=Object(f.useProductDataContext)();return t.product||!r.hasContext?Object(c.createElement)(b,o()({},t,{OriginalComponent:e})):Object(c.createElement)(e,t)},w=e=>t=>r=>{const n=((e,t)=>{const r=[];return Object.keys(e).forEach(n=>{if(void 0!==t[n])switch(e[n].type){case"boolean":r[n]="false"!==t[n]&&!1!==t[n];break;case"number":r[n]=parseInt(t[n],10);break;case"array":case"object":r[n]=JSON.parse(t[n]);break;default:r[n]=t[n]}else r[n]=e[n].default}),r})(e,r);return Object(c.createElement)(t,o()({},r,n))}},2:function(e,t){e.exports=window.wp.data},22:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return c}));var n=r(28);const o=e=>!Object(n.a)(e)&&e instanceof Object&&e.constructor===Object;function c(e,t){return o(e)&&t in e}},28:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));const n=e=>null===e},53:function(e,t){e.exports=window.wc.wcBlocksSharedContext}});