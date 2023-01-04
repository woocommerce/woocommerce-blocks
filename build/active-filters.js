this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["active-filters"]=function(e){function t(t){for(var n,l,i=t[0],a=t[1],s=t[2],b=0,p=[];b<i.length;b++)l=i[b],Object.prototype.hasOwnProperty.call(c,l)&&c[l]&&p.push(c[l][0]),c[l]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(u&&u(t);p.length;)p.shift()();return o.push.apply(o,s||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,i=1;i<r.length;i++){var a=r[i];0!==c[a]&&(n=!1)}n&&(o.splice(t--,1),e=l(l.s=r[0]))}return e}var n={},c={5:0,1:0},o=[];function l(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.m=e,l.c=n,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(r,n,function(t){return e[t]}.bind(null,n));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var i=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],a=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var u=a;return o.push([405,0]),r()}({0:function(e,t){e.exports=window.wp.element},1:function(e,t){e.exports=window.wp.i18n},10:function(e,t){e.exports=window.wc.wcBlocksData},103:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(0);const c=Object(n.createContext)({}),o=()=>{const{wrapper:e}=Object(n.useContext)(c);return t=>{e&&e.current&&(e.current.hidden=!t)}}},104:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(13);function c(e,t){const r=Object(n.useRef)();return Object(n.useEffect)(()=>{r.current===e||t&&!t(e,r.current)||(r.current=e)},[e,t]),r.current}},106:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(10),c=r(7),o=r(0),l=r(40),i=r(143),a=r(33);const s=e=>{const{namespace:t,resourceName:r,resourceValues:s=[],query:u={},shouldSelect:b=!0,isEditor:p=!1}=e;if(!t||!r)throw new Error("The options object must have valid values for the namespace and the resource properties.");const d=Object(o.useRef)({results:[],isLoading:!0}),m=Object(l.a)(u),f=Object(l.a)(s),g=Object(i.a)(),O=Object(c.useSelect)(e=>{var c;if(p&&Object(a.a)(null==d||null===(c=d.current)||void 0===c?void 0:c.results)&&Object.keys(d.current.results).length>0)return{results:d.current.results,isLoading:!1};if(!b)return null;const o=e(n.COLLECTIONS_STORE_KEY),l=[t,r,m,f],i=o.getCollectionError(...l);if(i){if(!(i instanceof Error))throw new Error("TypeError: `error` object is not an instance of Error constructor");g(i)}return{results:o.getCollection(...l),isLoading:!o.hasFinishedResolution("getCollection",l)}},[t,r,f,m,b]);return null!==O&&(d.current=O),d.current}},11:function(e,t){e.exports=window.wp.compose},12:function(e,t){e.exports=window.wp.primitives},123:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(0),c=r(1),o=r(9),l=r(7),i=r(3),a=r(5);const s=e=>{let{clientId:t,setAttributes:r,filterType:s,attributes:u}=e;const{replaceBlock:b}=Object(l.useDispatch)("core/block-editor"),{heading:p,headingLevel:d}=u;if(Object(l.useSelect)(e=>{const{getBlockParentsByBlockName:r}=e("core/block-editor");return r(t,"woocommerce/filter-wrapper").length>0},[t])||!s)return null;const m=[Object(n.createElement)(i.Button,{key:"convert",onClick:()=>{const e=[Object(o.createBlock)("woocommerce/"+s,{...u,heading:""})];p&&""!==p&&e.unshift(Object(o.createBlock)("core/heading",{content:p,level:null!=d?d:2})),b(t,Object(o.createBlock)("woocommerce/filter-wrapper",{heading:p,filterType:s},[...e])),r({heading:"",lock:{remove:!0}})},variant:"primary"},Object(c.__)("Upgrade block","woo-gutenberg-products-block"))];return Object(n.createElement)(a.Warning,{actions:m},Object(c.__)("Filter block: We have improved this block to make styling easier. Upgrade it using the button below.","woo-gutenberg-products-block"))}},124:function(e,t,r){"use strict";var n=r(0),c=r(5),o=r(11),l=r(1);r(165),t.a=Object(o.withInstanceId)(e=>{let{className:t,headingLevel:r,onChange:o,heading:i,instanceId:a}=e;const s="h"+r;return Object(n.createElement)(s,{className:t},Object(n.createElement)("label",{className:"screen-reader-text",htmlFor:"block-title-"+a},Object(l.__)("Block title","woo-gutenberg-products-block")),Object(n.createElement)(c.PlainText,{id:"block-title-"+a,className:"wc-block-editor-components-title",value:i,onChange:o}))})},125:function(e,t,r){"use strict";var n=r(0);r(166),t.a=e=>{let{children:t}=e;return Object(n.createElement)("div",{className:"wc-block-filter-title-placeholder"},t)}},128:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));const n=e=>"boolean"==typeof e},13:function(e,t){e.exports=window.React},143:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(0);const c=()=>{const[,e]=Object(n.useState)();return Object(n.useCallback)(t=>{e(()=>{throw t})},[])}},16:function(e,t){e.exports=window.wp.url},165:function(e,t){},166:function(e,t){},18:function(e,t){e.exports=window.wp.htmlEntities},180:function(e,t,r){"use strict";r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return o}));var n=r(8);const c=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";const o=e.filter(e=>e.attribute===r.taxonomy),l=o.length?o[0]:null;if(!(l&&l.slug&&Array.isArray(l.slug)&&l.slug.includes(c)))return;const i=l.slug.filter(e=>e!==c),a=e.filter(e=>e.attribute!==r.taxonomy);i.length>0&&(l.slug=i.sort(),a.push(l)),t(Object(n.sortBy)(a,"attribute"))},o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"in";if(!r||!r.taxonomy)return[];const l=e.filter(e=>e.attribute!==r.taxonomy);return 0===c.length?t(l):(l.push({attribute:r.taxonomy,operator:o,slug:c.map(e=>{let{slug:t}=e;return t}).sort()}),t(Object(n.sortBy)(l,"attribute"))),l}},181:function(e){e.exports=JSON.parse('{"name":"woocommerce/active-filters","version":"1.0.0","title":"Active Filters Controls","description":"Display the currently active filters.","category":"woocommerce","keywords":["WooCommerce"],"supports":{"html":false,"multiple":false,"inserter":false,"color":{"text":true,"background":false},"lock":false},"attributes":{"displayStyle":{"type":"string","default":"list"},"headingLevel":{"type":"number","default":3}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}')},196:function(e,t){},2:function(e,t){e.exports=window.wc.wcSettings},219:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return l}));var n=r(2);const c=Object(n.getSetting)("attributes",[]).reduce((e,t)=>{const r=(n=t)&&n.attribute_name?{id:parseInt(n.attribute_id,10),name:n.attribute_name,taxonomy:"pa_"+n.attribute_name,label:n.attribute_label}:null;var n;return r&&r.id&&e.push(r),e},[]),o=e=>{if(e)return c.find(t=>t.id===e)},l=e=>{if(e)return c.find(t=>t.taxonomy===e)}},235:function(e,t,r){"use strict";r.d(t,"b",(function(){return i})),r.d(t,"a",(function(){return a})),r.d(t,"d",(function(){return s})),r.d(t,"c",(function(){return u}));var n=r(16),c=r(2),o=r(128);const l=Object(c.getSettingWithCoercion)("is_rendering_php_template",!1,o.a),i="query_type_",a="filter_";function s(e){return window?Object(n.getQueryArg)(window.location.href,e):null}function u(e){l?window.location.href=e:window.history.replaceState({},"",e)}},247:function(e,t,r){"use strict";var n=r(6),c=r.n(n),o=r(0),l=r(4),i=r.n(l),a=r(1),s=r(79),u=r(536);r(196);var b=e=>{let{text:t,screenReaderText:r="",element:n="li",className:l="",radius:a="small",children:s=null,...u}=e;const b=n,p=i()(l,"wc-block-components-chip","wc-block-components-chip--radius-"+a),d=Boolean(r&&r!==t);return Object(o.createElement)(b,c()({className:p},u),Object(o.createElement)("span",{"aria-hidden":d,className:"wc-block-components-chip__text"},t),d&&Object(o.createElement)("span",{className:"screen-reader-text"},r),s)};t.a=e=>{let{ariaLabel:t="",className:r="",disabled:n=!1,onRemove:l=(()=>{}),removeOnAnyClick:p=!1,text:d,screenReaderText:m="",...f}=e;const g=p?"span":"button";if(!t){const e=m&&"string"==typeof m?m:d;t="string"!=typeof e?
/* translators: Remove chip. */
Object(a.__)("Remove","woo-gutenberg-products-block"):Object(a.sprintf)(
/* translators: %s text of the chip to remove. */
Object(a.__)('Remove "%s"',"woo-gutenberg-products-block"),e)}const O={"aria-label":t,disabled:n,onClick:l,onKeyDown:e=>{"Backspace"!==e.key&&"Delete"!==e.key||l()}},j=p?O:{},y=p?{"aria-hidden":!0}:O;return Object(o.createElement)(b,c()({},f,j,{className:i()(r,"is-removable"),element:p?"button":f.element,screenReaderText:m,text:d}),Object(o.createElement)(g,c()({className:"wc-block-components-chip__remove"},y),Object(o.createElement)(s.a,{className:"wc-block-components-chip__remove-icon",icon:u.a,size:16})))}},25:function(e,t){e.exports=window.wc.priceFormat},26:function(e,t){e.exports=window.wp.isShallowEqual},29:function(e,t,r){"use strict";var n=r(0),c=r(4),o=r.n(c);t.a=e=>{let t,{label:r,screenReaderLabel:c,wrapperElement:l,wrapperProps:i={}}=e;const a=null!=r,s=null!=c;return!a&&s?(t=l||"span",i={...i,className:o()(i.className,"screen-reader-text")},Object(n.createElement)(t,i,c)):(t=l||n.Fragment,a&&s&&r!==c?Object(n.createElement)(t,i,Object(n.createElement)("span",{"aria-hidden":"true"},r),Object(n.createElement)("span",{className:"screen-reader-text"},c)):Object(n.createElement)(t,i,r))}},3:function(e,t){e.exports=window.wp.components},33:function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return c}));const n=e=>!(e=>null===e)(e)&&e instanceof Object&&e.constructor===Object;function c(e,t){return n(e)&&t in e}},399:function(e,t,r){"use strict";r.d(t,"b",(function(){return o})),r.d(t,"a",(function(){return i}));var n=r(33);const c=e=>Object(n.b)(e,"count")&&Object(n.b)(e,"description")&&Object(n.b)(e,"id")&&Object(n.b)(e,"name")&&Object(n.b)(e,"parent")&&Object(n.b)(e,"slug")&&"number"==typeof e.count&&"string"==typeof e.description&&"number"==typeof e.id&&"string"==typeof e.name&&"number"==typeof e.parent&&"string"==typeof e.slug,o=e=>Array.isArray(e)&&e.every(c),l=e=>Object(n.b)(e,"attribute")&&Object(n.b)(e,"operator")&&Object(n.b)(e,"slug")&&"string"==typeof e.attribute&&"string"==typeof e.operator&&Array.isArray(e.slug)&&e.slug.every(e=>"string"==typeof e),i=e=>Array.isArray(e)&&e.every(l)},40:function(e,t,r){"use strict";r.d(t,"a",(function(){return l}));var n=r(0),c=r(26),o=r.n(c);function l(e){const t=Object(n.useRef)(e);return o()(e,t.current)||(t.current=e),t.current}},405:function(e,t,r){e.exports=r(473)},406:function(e,t,r){"use strict";var n=r(0),c=r(12);const o=Object(n.createElement)(c.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 24 24"},Object(n.createElement)("path",{fill:"none",d:"M0 0h24v24H0z"}),Object(n.createElement)("path",{d:"M17 6H7c-3.31 0-6 2.69-6 6s2.69 6 6 6h10c3.31 0 6-2.69 6-6s-2.69-6-6-6zm0 10H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4zm0-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}));t.a=o},407:function(e,t){},408:function(e,t){},46:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(0);const c=Object(n.createContext)("page"),o=()=>Object(n.useContext)(c);c.Provider},473:function(e,t,r){"use strict";r.r(t);var n=r(6),c=r.n(n),o=r(0),l=r(9),i=r(406),a=r(79),s=r(4),u=r.n(s),b=r(5),p=r(1),d=r(124),m=r(3),f=r(55),g=r(2),O=r(29),j=r(128),y=r(33),w=r(399),_=r(235),h=r(125);r(408);var v=r(219),k=r(25),E=r(247),S=r(16),x=r(536),N=(r(84),r(181));const C=(e,t)=>Number.isFinite(e)&&Number.isFinite(t)?Object(p.sprintf)(
/* translators: %1$s min price, %2$s max price */
Object(p.__)("Between %1$s and %2$s","woo-gutenberg-products-block"),Object(k.formatPrice)(e),Object(k.formatPrice)(t)):Number.isFinite(e)?Object(p.sprintf)(
/* translators: %s min price */
Object(p.__)("From %s","woo-gutenberg-products-block"),Object(k.formatPrice)(e)):Object(p.sprintf)(
/* translators: %s max price */
Object(p.__)("Up to %s","woo-gutenberg-products-block"),Object(k.formatPrice)(t)),A=e=>{let{type:t,name:r,prefix:n="",removeCallback:c=(()=>null),showLabel:l=!0,displayStyle:i}=e;const s=n?Object(o.createElement)(o.Fragment,null,n," ",r):r,u=Object(p.sprintf)(
/* translators: %s attribute value used in the filter. For example: yellow, green, small, large. */
Object(p.__)("Remove %s filter","woo-gutenberg-products-block"),r);return Object(o.createElement)("li",{className:"wc-block-active-filters__list-item",key:t+":"+r},l&&Object(o.createElement)("span",{className:"wc-block-active-filters__list-item-type"},t+": "),"chips"===i?Object(o.createElement)(E.a,{element:"span",text:s,onRemove:c,radius:"large",ariaLabel:u}):Object(o.createElement)("span",{className:"wc-block-active-filters__list-item-name"},Object(o.createElement)("button",{className:"wc-block-active-filters__list-item-remove",onClick:c},Object(o.createElement)(a.a,{className:"wc-block-components-chip__remove-icon",icon:x.a,size:16}),Object(o.createElement)(O.a,{screenReaderLabel:u})),s))},R=function(){if(!window)return;const e=window.location.href,t=Object(S.getQueryArgs)(e),r=Object(S.removeQueryArgs)(e,...Object.keys(t));for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];c.forEach(e=>{if("string"==typeof e)return delete t[e];if("object"==typeof e){const r=Object.keys(e)[0],n=t[r].toString().split(",");t[r]=n.filter(t=>t!==e[r]).join(",")}});const l=Object.fromEntries(Object.entries(t).filter(e=>{let[,t]=e;return t})),i=Object(S.addQueryArgs)(r,l);Object(_.c)(i)},T=["min_price","max_price","rating_filter","filter_","query_type_"],L=e=>{let t=!1;for(let r=0;T.length>r;r++){const n=T[r];if(n===e.substring(0,n.length)){t=!0;break}}return t};var B=r(106),F=r(18),P=r(180),Q=e=>{let{attributeObject:t,slugs:r=[],operator:n="in",displayStyle:c,isLoadingCallback:l}=e;const{results:i,isLoading:a}=Object(B.a)({namespace:"/wc/store/v1",resourceName:"products/attributes/terms",resourceValues:[t.id]}),[s,u]=Object(f.b)("attributes",[]);if(Object(o.useEffect)(()=>{l(a)},[a,l]),!Array.isArray(i)||!Object(w.b)(i)||!Object(w.a)(s))return null;const b=t.label,d=Object(g.getSettingWithCoercion)("is_rendering_php_template",!1,j.a);return Object(o.createElement)("li",null,Object(o.createElement)("span",{className:"wc-block-active-filters__list-item-type"},b,":"),Object(o.createElement)("ul",null,r.map((e,r)=>{const l=i.find(t=>t.slug===e);if(!l)return null;let m="";return r>0&&"and"===n&&(m=Object(o.createElement)("span",{className:"wc-block-active-filters__list-item-operator"},Object(p.__)("All","woo-gutenberg-products-block"))),A({type:b,name:Object(F.decodeEntities)(l.name||e),prefix:m,isLoading:a,removeCallback:()=>{const r=s.find(e=>{let{attribute:r}=e;return r==="pa_"+t.name});1===(null==r?void 0:r.slug.length)?R("query_type_"+t.name,"filter_"+t.name):R({["filter_"+t.name]:e}),d||Object(P.a)(s,u,t,e)},showLabel:!1,displayStyle:c})})))},M=e=>{let{displayStyle:t,isLoading:r}=e;return r?Object(o.createElement)(o.Fragment,null,[...Array("list"===t?2:3)].map((e,r)=>Object(o.createElement)("li",{className:"list"===t?"show-loading-state-list":"show-loading-state-chips",key:r},Object(o.createElement)("span",{className:"show-loading-state__inner"})))):null},D=r(103),I=e=>{let{attributes:t,isEditor:r=!1}=e;const n=Object(D.a)(),c=function(){const e=Object(o.useRef)(!1);return Object(o.useEffect)(()=>(e.current=!0,()=>{e.current=!1}),[]),Object(o.useCallback)(()=>e.current,[])}()(),l=Object(g.getSettingWithCoercion)("is_rendering_php_template",!1,j.a),[i,a]=Object(o.useState)(!0),s=(()=>{if(!window)return!1;const e=window.location.href,t=Object(S.getQueryArgs)(e),r=Object.keys(t);let n=!1;for(let e=0;r.length>e;e++){const t=r[e];if(L(t)){n=!0;break}}return n})()&&!r&&i,[b,d]=Object(f.b)("attributes",[]),[m,k]=Object(f.b)("stock_status",[]),[E,x]=Object(f.b)("min_price"),[N,T]=Object(f.b)("max_price"),[B,F]=Object(f.b)("rating"),P=Object(g.getSetting)("stockStatusOptions",[]),I=Object(g.getSetting)("attributes",[]),V=Object(o.useMemo)(()=>{if(s||0===m.length||(e=m,!Array.isArray(e)||!e.every(e=>["instock","outofstock","onbackorder"].includes(e)))||!(e=>Object(y.a)(e)&&Object.keys(e).every(e=>["instock","outofstock","onbackorder"].includes(e)))(P))return null;var e;const r=Object(p.__)("Stock Status","woo-gutenberg-products-block");return Object(o.createElement)("li",null,Object(o.createElement)("span",{className:"wc-block-active-filters__list-item-type"},r,":"),Object(o.createElement)("ul",null,m.map(e=>A({type:r,name:P[e],removeCallback:()=>{if(R({filter_stock_status:e}),!l){const t=m.filter(t=>t!==e);k(t)}},showLabel:!1,displayStyle:t.displayStyle}))))},[s,P,m,k,t.displayStyle,l]),W=Object(o.useMemo)(()=>s||!Number.isFinite(E)&&!Number.isFinite(N)?null:A({type:Object(p.__)("Price","woo-gutenberg-products-block"),name:C(E,N),removeCallback:()=>{R("max_price","min_price"),l||(x(void 0),T(void 0))},displayStyle:t.displayStyle}),[s,E,N,t.displayStyle,x,T,l]),Y=Object(o.useMemo)(()=>!Object(w.a)(b)&&c||!b.length&&!(e=>{if(!window)return!1;const t=e.map(e=>"filter_"+e.attribute_name),r=window.location.href,n=Object(S.getQueryArgs)(r),c=Object.keys(n);let o=!1;for(let e=0;c.length>e;e++){const r=c[e];if(t.includes(r)){o=!0;break}}return o})(I)?(i&&a(!1),null):b.map(e=>{const r=Object(v.b)(e.attribute);return r?Object(o.createElement)(Q,{attributeObject:r,displayStyle:t.displayStyle,slugs:e.slug,key:e.attribute,operator:e.operator,isLoadingCallback:a}):(i&&a(!1),null)}),[b,c,I,i,t.displayStyle]);Object(o.useEffect)(()=>{var e;if(!l)return;if(B.length&&B.length>0)return;const t=null===(e=Object(_.d)("rating_filter"))||void 0===e?void 0:e.toString();t&&F(t.split(","))},[l,B,F]);const z=Object(o.useMemo)(()=>{if(s||0===B.length||(e=B,!Array.isArray(e)||!e.every(e=>["1","2","3","4","5"].includes(e))))return null;var e;const r=Object(p.__)("Rating","woo-gutenberg-products-block");return Object(o.createElement)("li",null,Object(o.createElement)("span",{className:"wc-block-active-filters__list-item-type"},r,":"),Object(o.createElement)("ul",null,B.map(e=>A({type:r,name:Object(p.sprintf)(
/* translators: %s is referring to the average rating value */
Object(p.__)("Rated %s out of 5","woo-gutenberg-products-block"),e),removeCallback:()=>{if(R({rating_filter:e}),!l){const t=B.filter(t=>t!==e);F(t)}},showLabel:!1,displayStyle:t.displayStyle}))))},[s,B,F,t.displayStyle,l]);if(!s&&!(b.length>0||m.length>0||B.length>0||Number.isFinite(E)||Number.isFinite(N))&&!r)return n(!1),null;const K="h"+t.headingLevel,U=Object(o.createElement)(K,{className:"wc-block-active-filters__title"},t.heading),q=s?Object(o.createElement)(h.a,null,U):U;if(!Object(g.getSettingWithCoercion)("has_filterable_products",!1,j.a))return n(!1),null;n(!0);const G=u()("wc-block-active-filters__list",{"wc-block-active-filters__list--chips":"chips"===t.displayStyle,"wc-block-active-filters--loading":s});return Object(o.createElement)(o.Fragment,null,!r&&t.heading&&q,Object(o.createElement)("div",{className:"wc-block-active-filters"},Object(o.createElement)("ul",{className:G},r?Object(o.createElement)(o.Fragment,null,A({type:Object(p.__)("Size","woo-gutenberg-products-block"),name:Object(p.__)("Small","woo-gutenberg-products-block"),displayStyle:t.displayStyle}),A({type:Object(p.__)("Color","woo-gutenberg-products-block"),name:Object(p.__)("Blue","woo-gutenberg-products-block"),displayStyle:t.displayStyle})):Object(o.createElement)(o.Fragment,null,Object(o.createElement)(M,{isLoading:s,displayStyle:t.displayStyle}),W,V,Y,z)),s?Object(o.createElement)("span",{className:"wc-block-active-filters__clear-all-placeholder"}):Object(o.createElement)("button",{className:"wc-block-active-filters__clear-all",onClick:()=>{(()=>{if(!window)return;const e=window.location.href,t=Object(S.getQueryArgs)(e),r=Object(S.removeQueryArgs)(e,...Object.keys(t)),n=Object.fromEntries(Object.keys(t).filter(e=>!L(e)).map(e=>[e,t[e]])),c=Object(S.addQueryArgs)(r,n);Object(_.c)(c)})(),l||(x(void 0),T(void 0),d([]),k([]),F([]))}},Object(o.createElement)(O.a,{label:Object(p.__)("Clear All","woo-gutenberg-products-block"),screenReaderLabel:Object(p.__)("Clear All Filters","woo-gutenberg-products-block")}))))},V=(r(407),r(123)),W=Object(m.withSpokenMessages)(e=>{let{attributes:t,setAttributes:r,clientId:n}=e;const{className:c,displayStyle:l,heading:i,headingLevel:a}=t,s=Object(b.useBlockProps)({className:c});return Object(o.createElement)("div",s,Object(o.createElement)(b.InspectorControls,{key:"inspector"},Object(o.createElement)(m.PanelBody,{title:Object(p.__)("Display Settings","woo-gutenberg-products-block")},Object(o.createElement)(m.__experimentalToggleGroupControl,{label:Object(p.__)("Display Style","woo-gutenberg-products-block"),value:l,onChange:e=>r({displayStyle:e}),className:"wc-block-active-filter__style-toggle"},Object(o.createElement)(m.__experimentalToggleGroupControlOption,{value:"list",label:Object(p.__)("List","woo-gutenberg-products-block")}),Object(o.createElement)(m.__experimentalToggleGroupControlOption,{value:"chips",label:Object(p.__)("Chips","woo-gutenberg-products-block")})))),Object(o.createElement)(V.a,{attributes:t,clientId:n,setAttributes:r,filterType:"active-filters"}),i&&Object(o.createElement)(d.a,{className:"wc-block-active-filters__title",headingLevel:a,heading:i,onChange:e=>r({heading:e})}),Object(o.createElement)(m.Disabled,null,Object(o.createElement)(I,{attributes:t,isEditor:!0})))});const Y={heading:{type:"string",default:Object(p.__)("Active filters","woo-gutenberg-products-block")}};Object(l.registerBlockType)(N,{icon:{src:Object(o.createElement)(a.a,{icon:i.a,className:"wc-block-editor-components-block-icon"})},attributes:{...N.attributes,...Y},edit:W,save(e){let{attributes:t}=e;const{className:r,displayStyle:n,heading:l,headingLevel:i}=t,a={"data-display-style":n,"data-heading":l,"data-heading-level":i};return Object(o.createElement)("div",c()({},b.useBlockProps.save({className:u()("is-loading",r)}),a),Object(o.createElement)("span",{"aria-hidden":!0,className:"wc-block-active-filters__placeholder"}))}})},5:function(e,t){e.exports=window.wp.blockEditor},55:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return p})),r.d(t,"c",(function(){return d}));var n=r(10),c=r(7),o=r(0),l=r(26),i=r.n(l),a=r(40),s=r(104),u=r(46);const b=e=>{const t=Object(u.a)();e=e||t;const r=Object(c.useSelect)(t=>t(n.QUERY_STATE_STORE_KEY).getValueForQueryContext(e,void 0),[e]),{setValueForQueryContext:l}=Object(c.useDispatch)(n.QUERY_STATE_STORE_KEY);return[r,Object(o.useCallback)(t=>{l(e,t)},[e,l])]},p=(e,t,r)=>{const l=Object(u.a)();r=r||l;const i=Object(c.useSelect)(c=>c(n.QUERY_STATE_STORE_KEY).getValueForQueryKey(r,e,t),[r,e]),{setQueryValue:a}=Object(c.useDispatch)(n.QUERY_STATE_STORE_KEY);return[i,Object(o.useCallback)(t=>{a(r,e,t)},[r,e,a])]},d=(e,t)=>{const r=Object(u.a)();t=t||r;const[n,c]=b(t),l=Object(a.a)(n),p=Object(a.a)(e),d=Object(s.a)(p),m=Object(o.useRef)(!1);return Object(o.useEffect)(()=>{i()(d,p)||(c(Object.assign({},l,p)),m.current=!0)},[l,p,d,c]),m.current?[n,c]:[e,c]}},7:function(e,t){e.exports=window.wp.data},8:function(e,t){e.exports=window.lodash},84:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));const n=e=>"string"==typeof e},9:function(e,t){e.exports=window.wp.blocks}});