(()=>{var e,t={2746:(e,t,r)=>{"use strict";r.r(t);var o=r(9307);const n=window.wp.blocks;var c=r(1984),a=r(5032);r(4281);const l=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","name":"woocommerce/collection-price-filter","version":"1.0.0","title":"Collection Price Filter","description":"Enable customers to filter the product collection by choosing a price range.","category":"woocommerce","keywords":["WooCommerce"],"textdomain":"woo-gutenberg-products-block","apiVersion":2,"viewScript":["wc-collection-price-filter-block-frontend"],"ancestor":["woocommerce/product-collection"],"supports":{"interactivity":true},"attributes":{"showInputFields":{"type":"boolean","default":true},"inlineInput":{"type":"boolean","default":false}}}'),i=window.wp.blockEditor;var s=r(4697);function u(e,t){return!(e=>null===e)(r=e)&&r instanceof Object&&r.constructor===Object&&t in e;var r}var p=r(172),m=r(9127),d=r.n(m);function b(e){const t=(0,o.useRef)(e);return d()(e,t.current)||(t.current=e),t.current}const g=window.wc.wcBlocksData,w=window.wp.data,_=(0,o.createContext)("page"),f=()=>(0,o.useContext)(_),E=(_.Provider,e=>{const t=f();e=e||t;const r=(0,w.useSelect)((t=>t(g.QUERY_STATE_STORE_KEY).getValueForQueryContext(e,void 0)),[e]),{setValueForQueryContext:n}=(0,w.useDispatch)(g.QUERY_STATE_STORE_KEY);return[r,(0,o.useCallback)((t=>{n(e,t)}),[e,n])]}),y=(e,t,r)=>{const n=f();r=r||n;const c=(0,w.useSelect)((o=>o(g.QUERY_STATE_STORE_KEY).getValueForQueryKey(r,e,t)),[r,e]),{setQueryValue:a}=(0,w.useDispatch)(g.QUERY_STATE_STORE_KEY);return[c,(0,o.useCallback)((t=>{a(r,e,t)}),[r,e,a])]},v=({queryAttribute:e,queryPrices:t,queryStock:r,queryRating:n,queryState:c,isEditor:a=!1})=>{let l=f();l=`${l}-collection-data`;const[i]=E(l),[m,d]=y("calculate_attribute_counts",[],l),[_,v]=y("calculate_price_range",null,l),[h,k]=y("calculate_stock_status_counts",null,l),[x,C]=y("calculate_rating_counts",null,l),S=b(e||{}),P=b(t),O=b(r),T=b(n);(0,o.useEffect)((()=>{"object"==typeof S&&Object.keys(S).length&&(m.find((e=>u(S,"taxonomy")&&e.taxonomy===S.taxonomy))||d([...m,S]))}),[S,m,d]),(0,o.useEffect)((()=>{_!==P&&void 0!==P&&v(P)}),[P,v,_]),(0,o.useEffect)((()=>{h!==O&&void 0!==O&&k(O)}),[O,k,h]),(0,o.useEffect)((()=>{x!==T&&void 0!==T&&C(T)}),[T,C,x]);const[N,R]=(0,o.useState)(a),[j]=(0,s.Nr)(N,200);N||R(!0);const q=(0,o.useMemo)((()=>(e=>{const t=e;return Array.isArray(e.calculate_attribute_counts)&&(t.calculate_attribute_counts=(0,p.DY)(e.calculate_attribute_counts.map((({taxonomy:e,queryType:t})=>({taxonomy:e,query_type:t})))).asc(["taxonomy","query_type"])),t})(i)),[i]);return(e=>{const{namespace:t,resourceName:r,resourceValues:n=[],query:c={},shouldSelect:a=!0}=e;if(!t||!r)throw new Error("The options object must have valid values for the namespace and the resource properties.");const l=(0,o.useRef)({results:[],isLoading:!0}),i=b(c),s=b(n),u=(()=>{const[,e]=(0,o.useState)();return(0,o.useCallback)((t=>{e((()=>{throw t}))}),[])})(),p=(0,w.useSelect)((e=>{if(!a)return null;const o=e(g.COLLECTIONS_STORE_KEY),n=[t,r,i,s],c=o.getCollectionError(...n);if(c){if(!(c instanceof Error))throw new Error("TypeError: `error` object is not an instance of Error constructor");u(c)}return{results:o.getCollection(...n),isLoading:!o.hasFinishedResolution("getCollection",n)}}),[t,r,s,i,a]);return null!==p&&(l.current=p),l.current})({namespace:"/wc/store/v1",resourceName:"products/collection-data",query:{...c,page:void 0,per_page:void 0,orderby:void 0,order:void 0,...q},shouldSelect:j})},h=window.wp.components;var k=r(5736),x=r(4184),C=r.n(x);const S=window.wc.blocksComponents;r(770);const P=({className:e,
/* translators: Reset button text for filters. */
label:t=(0,k.__)("Reset","woo-gutenberg-products-block"),onClick:r,screenReaderLabel:n=(0,k.__)("Reset filter","woo-gutenberg-products-block")})=>(0,o.createElement)("button",{className:C()("wc-block-components-filter-reset-button",e),onClick:r},(0,o.createElement)(S.Label,{label:t,screenReaderLabel:n})),O=window.wc.priceFormat,T=e=>"string"==typeof e,N=(e,t)=>("number"==typeof e?e:parseInt(e,10))/10**t.minorUnit,R=e=>{const t=(0,O.getCurrency)({minorUnit:0});if(!u(e,"price_range"))return{minPrice:0,maxPrice:0,formattedMinPrice:(0,O.formatPrice)(0,t),formattedMaxPrice:(0,O.formatPrice)(0,t)};const r=(0,O.getCurrencyFromPriceResponse)(e.price_range),o=u(e.price_range,"min_price")&&T(e.price_range.min_price)?N(e.price_range.min_price,r):0,n=u(e.price_range,"max_price")&&T(e.price_range.max_price)?N(e.price_range.max_price,r):0;return{minPrice:o,maxPrice:n,formattedMinPrice:(0,O.formatPrice)(o,t),formattedMaxPrice:(0,O.formatPrice)(n,t)}},j=({attributes:e,setAttributes:t})=>{const{showInputFields:r,inlineInput:n}=e;return(0,o.createElement)(i.InspectorControls,null,(0,o.createElement)(h.PanelBody,{title:(0,k.__)("Settings","woo-gutenberg-products-block")},(0,o.createElement)(h.__experimentalToggleGroupControl,{label:(0,k.__)("Price Slider","woo-gutenberg-products-block"),value:r?"editable":"text",onChange:e=>t({showInputFields:"editable"===e}),className:"wc-block-price-filter__price-range-toggle"},(0,o.createElement)(h.__experimentalToggleGroupControlOption,{value:"editable",label:(0,k.__)("Editable","woo-gutenberg-products-block")}),(0,o.createElement)(h.__experimentalToggleGroupControlOption,{value:"text",label:(0,k.__)("Text","woo-gutenberg-products-block")})),r&&(0,o.createElement)(h.ToggleControl,{label:(0,k.__)("Inline input fields","woo-gutenberg-products-block"),checked:n,onChange:()=>t({inlineInput:!n}),help:(0,k.__)("Show input fields inline with the slider.","woo-gutenberg-products-block")})))};r(8986);const q=({collectionData:e,...t})=>{const{showInputFields:r,inlineInput:n}=t.attributes,{minPrice:c,maxPrice:a,formattedMinPrice:l,formattedMaxPrice:i}=e,s=()=>null,u=r?(0,o.createElement)("input",{className:"min",type:"text",value:c,onChange:s}):(0,o.createElement)("span",null,l),p=r?(0,o.createElement)("input",{className:"max",type:"text",value:a,onChange:s}):(0,o.createElement)("span",null,i);return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(j,{...t}),(0,o.createElement)("div",{className:C()("price-slider",{"inline-input":n&&r})},(0,o.createElement)("div",{className:"range"},(0,o.createElement)("div",{className:"range-bar"}),(0,o.createElement)("input",{type:"range",className:"min",min:c,max:a,value:c,onChange:s}),(0,o.createElement)("input",{type:"range",className:"max",min:c,max:a,value:a,onChange:s})),(0,o.createElement)("div",{className:"text"},u,p)))};(0,n.registerBlockType)(l,{icon:{src:(0,o.createElement)(c.Z,{icon:a.Z,className:"wc-block-editor-components-block-icon"})},edit:e=>{const t=(0,i.useBlockProps)(),{results:r}=v({queryPrices:!0,isEditor:!0,queryState:{}});return(0,o.createElement)("div",{...t},(0,o.createElement)(h.Disabled,null,(0,o.createElement)("div",{className:"controls"},(0,o.createElement)(q,{...e,collectionData:R(r)})),(0,o.createElement)("div",{className:"actions"},(0,o.createElement)(P,{onClick:()=>!1}))))}})},770:()=>{},8986:()=>{},4281:()=>{},9196:e=>{"use strict";e.exports=window.React},9307:e=>{"use strict";e.exports=window.wp.element},5736:e=>{"use strict";e.exports=window.wp.i18n},9127:e=>{"use strict";e.exports=window.wp.isShallowEqual},444:e=>{"use strict";e.exports=window.wp.primitives}},r={};function o(e){var n=r[e];if(void 0!==n)return n.exports;var c=r[e]={exports:{}};return t[e].call(c.exports,c,c.exports,o),c.exports}o.m=t,e=[],o.O=(t,r,n,c)=>{if(!r){var a=1/0;for(u=0;u<e.length;u++){for(var[r,n,c]=e[u],l=!0,i=0;i<r.length;i++)(!1&c||a>=c)&&Object.keys(o.O).every((e=>o.O[e](r[i])))?r.splice(i--,1):(l=!1,c<a&&(a=c));if(l){e.splice(u--,1);var s=n();void 0!==s&&(t=s)}}return t}c=c||0;for(var u=e.length;u>0&&e[u-1][2]>c;u--)e[u]=e[u-1];e[u]=[r,n,c]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.j=5700,(()=>{var e={5700:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var n,c,[a,l,i]=r,s=0;if(a.some((t=>0!==e[t]))){for(n in l)o.o(l,n)&&(o.m[n]=l[n]);if(i)var u=i(o)}for(t&&t(r);s<a.length;s++)c=a[s],o.o(e,c)&&e[c]&&e[c][0](),e[c]=0;return o.O(u)},r=self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=o.O(void 0,[2869],(()=>o(2746)));n=o.O(n),((this.wc=this.wc||{}).blocks=this.wc.blocks||{})["collection-price-filter"]=n})();