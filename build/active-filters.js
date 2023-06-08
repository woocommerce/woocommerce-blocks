this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["active-filters"]=function(e){function t(t){for(var n,l,a=t[0],i=t[1],s=t[2],b=0,p=[];b<a.length;b++)l=a[b],Object.prototype.hasOwnProperty.call(c,l)&&c[l]&&p.push(c[l][0]),c[l]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);for(u&&u(t);p.length;)p.shift()();return o.push.apply(o,s||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,a=1;a<r.length;a++){var i=r[a];0!==c[i]&&(n=!1)}n&&(o.splice(t--,1),e=l(l.s=r[0]))}return e}var n={},c={4:0,1:0},o=[];function l(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.m=e,l.c=n,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(r,n,function(t){return e[t]}.bind(null,n));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var a=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],i=a.push.bind(a);a.push=t,a=a.slice();for(var s=0;s<a.length;s++)t(a[s]);var u=i;return o.push([385,0]),r()}({0:function(e,t){e.exports=window.wp.element},1:function(e,t){e.exports=window.wp.i18n},10:function(e,t){e.exports=window.wp.primitives},107:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));const n=e=>"string"==typeof e},109:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(0);const c=Object(n.createContext)({}),o=()=>{const{wrapper:e}=Object(n.useContext)(c);return t=>{e&&e.current&&(e.current.hidden=!t)}}},11:function(e,t){e.exports=window.wp.compose},115:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r(9),c=r(7),o=r(0),l=r(46);const a=e=>{const{namespace:t,resourceName:r,resourceValues:a=[],query:i={},shouldSelect:s=!0}=e;if(!t||!r)throw new Error("The options object must have valid values for the namespace and the resource properties.");const u=Object(o.useRef)({results:[],isLoading:!0}),b=Object(l.a)(i),p=Object(l.a)(a),d=(()=>{const[,e]=Object(o.useState)();return Object(o.useCallback)(t=>{e(()=>{throw t})},[])})(),m=Object(c.useSelect)(e=>{if(!s)return null;const c=e(n.COLLECTIONS_STORE_KEY),o=[t,r,b,p],l=c.getCollectionError(...o);if(l){if(!(l instanceof Error))throw new Error("TypeError: `error` object is not an instance of Error constructor");d(l)}return{results:c.getCollection(...o),isLoading:!c.hasFinishedResolution("getCollection",o)}},[t,r,p,b,s]);return null!==m&&(u.current=m),u.current}},130:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(0),c=r(1),o=r(8),l=r(7),a=r(2),i=r(5);const s=e=>{let{clientId:t,setAttributes:r,filterType:s,attributes:u}=e;const{replaceBlock:b}=Object(l.useDispatch)("core/block-editor"),{heading:p,headingLevel:d}=u;if(Object(l.useSelect)(e=>{const{getBlockParentsByBlockName:r}=e("core/block-editor");return r(t,"woocommerce/filter-wrapper").length>0},[t])||!s)return null;const m=[Object(n.createElement)(a.Button,{key:"convert",onClick:()=>{const e=[Object(o.createBlock)("woocommerce/"+s,{...u,heading:""})];p&&""!==p&&e.unshift(Object(o.createBlock)("core/heading",{content:p,level:null!=d?d:2})),b(t,Object(o.createBlock)("woocommerce/filter-wrapper",{heading:p,filterType:s},[...e])),r({heading:"",lock:{remove:!0}})},variant:"primary"},Object(c.__)("Upgrade block","woo-gutenberg-products-block"))];return Object(n.createElement)(i.Warning,{actions:m},Object(c.__)("Filter block: We have improved this block to make styling easier. Upgrade it using the button below.","woo-gutenberg-products-block"))}},131:function(e,t,r){"use strict";var n=r(0),c=r(5),o=r(11),l=r(1);r(182),t.a=Object(o.withInstanceId)(e=>{let{className:t,headingLevel:r,onChange:o,heading:a,instanceId:i}=e;const s="h"+r;return Object(n.createElement)(s,{className:t},Object(n.createElement)("label",{className:"screen-reader-text",htmlFor:"block-title-"+i},Object(l.__)("Block title","woo-gutenberg-products-block")),Object(n.createElement)(c.PlainText,{id:"block-title-"+i,className:"wc-block-editor-components-title",value:a,onChange:o,style:{backgroundColor:"transparent"}}))})},132:function(e,t,r){"use strict";var n=r(0);r(183),t.a=e=>{let{children:t}=e;return Object(n.createElement)("div",{className:"wc-block-filter-title-placeholder"},t)}},136:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));const n=e=>"boolean"==typeof e},140:function(e,t,r){"use strict";r.d(t,"b",(function(){return c})),r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return a}));var n=r(20);const c=e=>Object(n.c)(e,"count")&&Object(n.c)(e,"description")&&Object(n.c)(e,"id")&&Object(n.c)(e,"name")&&Object(n.c)(e,"parent")&&Object(n.c)(e,"slug")&&"number"==typeof e.count&&"string"==typeof e.description&&"number"==typeof e.id&&"string"==typeof e.name&&"number"==typeof e.parent&&"string"==typeof e.slug,o=e=>Array.isArray(e)&&e.every(c),l=e=>Object(n.c)(e,"attribute")&&Object(n.c)(e,"operator")&&Object(n.c)(e,"slug")&&"string"==typeof e.attribute&&"string"==typeof e.operator&&Array.isArray(e.slug)&&e.slug.every(e=>"string"==typeof e),a=e=>Array.isArray(e)&&e.every(l)},15:function(e,t){e.exports=window.wp.url},154:function(e,t,r){"use strict";r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return i})),r.d(t,"c",(function(){return s})),r.d(t,"d",(function(){return u}));var n=r(3),c=r(140),o=r(7);const l=Object(n.getSetting)("attributes",[]).reduce((e,t)=>{const r=(n=t)&&n.attribute_name?{id:parseInt(n.attribute_id,10),name:n.attribute_name,taxonomy:"pa_"+n.attribute_name,label:n.attribute_label}:null;var n;return r&&r.id&&e.push(r),e},[]),a=e=>{const{count:t,id:r,name:n,parent:o}=e;return{count:t,id:r,name:n,parent:o,breadcrumbs:[],children:[],value:Object(c.b)(e)?e.attr_slug:""}},i=e=>{if(e)return l.find(t=>t.id===e)},s=e=>{if(e)return l.find(t=>t.taxonomy===e)},u=(e,t,r,n)=>{const c=Object(o.select)("core/block-editor"),l=Object(o.dispatch)("core/block-editor"),a=c.getBlockParents(e);let i="";a.forEach(e=>{const t=c.getBlock(e).innerBlocks.find(e=>e.name===n);t&&(i=t.clientId)}),l.updateBlockAttributes(i,{[t]:r})}},16:function(e,t){e.exports=window.wp.htmlEntities},182:function(e,t){},183:function(e,t){},2:function(e,t){e.exports=window.wp.components},20:function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return c})),r.d(t,"a",(function(){return o}));const n=e=>!(e=>null===e)(e)&&e instanceof Object&&e.constructor===Object;function c(e,t){return n(e)&&t in e}const o=e=>0===Object.keys(e).length},200:function(e,t,r){"use strict";r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return o}));var n=r(100);const c=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";const o=e.filter(e=>e.attribute===r.taxonomy),l=o.length?o[0]:null;if(!(l&&l.slug&&Array.isArray(l.slug)&&l.slug.includes(c)))return;const a=l.slug.filter(e=>e!==c),i=e.filter(e=>e.attribute!==r.taxonomy);a.length>0&&(l.slug=a.sort(),i.push(l)),t(Object(n.a)(i).asc("attribute"))},o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"in";if(!r||!r.taxonomy)return[];const l=e.filter(e=>e.attribute!==r.taxonomy);return 0===c.length?t(l):(l.push({attribute:r.taxonomy,operator:o,slug:c.map(e=>{let{slug:t}=e;return t}).sort()}),t(Object(n.a)(l).asc("attribute"))),l}},205:function(e){e.exports=JSON.parse('{"name":"woocommerce/active-filters","version":"1.0.0","title":"Active Filters Controls","description":"Display the currently active filters.","category":"woocommerce","keywords":["WooCommerce"],"supports":{"html":false,"multiple":false,"inserter":false,"color":{"text":true,"background":false},"lock":false},"attributes":{"displayStyle":{"type":"string","default":"list"},"headingLevel":{"type":"number","default":3}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}')},212:function(e,t){},22:function(e,t){e.exports=window.wc.priceFormat},25:function(e,t){e.exports=window.wp.isShallowEqual},252:function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"a",(function(){return i})),r.d(t,"d",(function(){return s})),r.d(t,"c",(function(){return u})),r.d(t,"e",(function(){return b}));var n=r(15),c=r(3),o=r(136);const l=Object(c.getSettingWithCoercion)("is_rendering_php_template",!1,o.a),a="query_type_",i="filter_";function s(e){return window?Object(n.getQueryArg)(window.location.href,e):null}function u(e){l?window.location.href=e:window.history.replaceState({},"",e)}const b=e=>{const t=Object(n.getQueryArgs)(e);return Object(n.addQueryArgs)(e,t)}},262:function(e,t,r){"use strict";var n=r(6),c=r.n(n),o=r(0),l=r(4),a=r.n(l),i=r(1),s=r(74),u=r(570);r(212);var b=e=>{let{text:t,screenReaderText:r="",element:n="li",className:l="",radius:i="small",children:s=null,...u}=e;const b=n,p=a()(l,"wc-block-components-chip","wc-block-components-chip--radius-"+i),d=Boolean(r&&r!==t);return Object(o.createElement)(b,c()({className:p},u),Object(o.createElement)("span",{"aria-hidden":d,className:"wc-block-components-chip__text"},t),d&&Object(o.createElement)("span",{className:"screen-reader-text"},r),s)};t.a=e=>{let{ariaLabel:t="",className:r="",disabled:n=!1,onRemove:l=(()=>{}),removeOnAnyClick:p=!1,text:d,screenReaderText:m="",...f}=e;const g=p?"span":"button";if(!t){const e=m&&"string"==typeof m?m:d;t="string"!=typeof e?
/* translators: Remove chip. */
Object(i.__)("Remove","woo-gutenberg-products-block"):Object(i.sprintf)(
/* translators: %s text of the chip to remove. */
Object(i.__)('Remove "%s"',"woo-gutenberg-products-block"),e)}const O={"aria-label":t,disabled:n,onClick:l,onKeyDown:e=>{"Backspace"!==e.key&&"Delete"!==e.key||l()}},j=p?O:{},y=p?{"aria-hidden":!0}:O;return Object(o.createElement)(b,c()({},f,j,{className:a()(r,"is-removable"),element:p?"button":f.element,screenReaderText:m,text:d}),Object(o.createElement)(g,c()({className:"wc-block-components-chip__remove"},y),Object(o.createElement)(s.a,{className:"wc-block-components-chip__remove-icon",icon:u.a,size:16})))}},3:function(e,t){e.exports=window.wc.wcSettings},31:function(e,t,r){"use strict";var n=r(0),c=r(4),o=r.n(c);t.a=e=>{let t,{label:r,screenReaderLabel:c,wrapperElement:l,wrapperProps:a={}}=e;const i=null!=r,s=null!=c;return!i&&s?(t=l||"span",a={...a,className:o()(a.className,"screen-reader-text")},Object(n.createElement)(t,a,c)):(t=l||n.Fragment,i&&s&&r!==c?Object(n.createElement)(t,a,Object(n.createElement)("span",{"aria-hidden":"true"},r),Object(n.createElement)("span",{className:"screen-reader-text"},c)):Object(n.createElement)(t,a,r))}},385:function(e,t,r){e.exports=r(522)},386:function(e,t,r){"use strict";var n=r(0),c=r(10);const o=Object(n.createElement)(c.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 24 24"},Object(n.createElement)("path",{fill:"none",d:"M0 0h24v24H0z"}),Object(n.createElement)("path",{d:"M17 6H7c-3.31 0-6 2.69-6 6s2.69 6 6 6h10c3.31 0 6-2.69 6-6s-2.69-6-6-6zm0 10H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4zm0-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}));t.a=o},387:function(e,t){},388:function(e,t){},46:function(e,t,r){"use strict";r.d(t,"a",(function(){return l}));var n=r(0),c=r(25),o=r.n(c);function l(e){const t=Object(n.useRef)(e);return o()(e,t.current)||(t.current=e),t.current}},5:function(e,t){e.exports=window.wp.blockEditor},50:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(0);const c=Object(n.createContext)("page"),o=()=>Object(n.useContext)(c);c.Provider},522:function(e,t,r){"use strict";r.r(t);var n=r(6),c=r.n(n),o=r(0),l=r(8),a=r(386),i=r(74),s=r(4),u=r.n(s),b=r(5),p=r(1),d=r(131),m=r(2),f=r(58),g=r(3),O=r(31),j=r(136),y=r(20),w=r(140),_=r(252),h=r(132);r(388);var k=r(154),v=r(22),E=r(262),S=r(15),x=r(570),N=(r(107),r(205));const C=(e,t)=>Number.isFinite(e)&&Number.isFinite(t)?Object(p.sprintf)(
/* translators: %1$s min price, %2$s max price */
Object(p.__)("Between %1$s and %2$s","woo-gutenberg-products-block"),Object(v.formatPrice)(e),Object(v.formatPrice)(t)):Number.isFinite(e)?Object(p.sprintf)(
/* translators: %s min price */
Object(p.__)("From %s","woo-gutenberg-products-block"),Object(v.formatPrice)(e)):Object(p.sprintf)(
/* translators: %s max price */
Object(p.__)("Up to %s","woo-gutenberg-products-block"),Object(v.formatPrice)(t)),A=e=>{let{type:t,name:r,prefix:n="",removeCallback:c=(()=>null),showLabel:l=!0,displayStyle:a}=e;const s=n?Object(o.createElement)(o.Fragment,null,n," ",r):r,u=Object(p.sprintf)(
/* translators: %s attribute value used in the filter. For example: yellow, green, small, large. */
Object(p.__)("Remove %s filter","woo-gutenberg-products-block"),r);return Object(o.createElement)("li",{className:"wc-block-active-filters__list-item",key:t+":"+r},l&&Object(o.createElement)("span",{className:"wc-block-active-filters__list-item-type"},t+": "),"chips"===a?Object(o.createElement)(E.a,{element:"span",text:s,onRemove:c,radius:"large",ariaLabel:u}):Object(o.createElement)("span",{className:"wc-block-active-filters__list-item-name"},Object(o.createElement)("button",{className:"wc-block-active-filters__list-item-remove",onClick:c},Object(o.createElement)(i.a,{className:"wc-block-components-chip__remove-icon",icon:x.a,size:16}),Object(o.createElement)(O.a,{screenReaderLabel:u})),s))},T=function(){if(!window)return;const e=window.location.href,t=Object(S.getQueryArgs)(e),r=Object(S.removeQueryArgs)(e,...Object.keys(t));for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];c.forEach(e=>{if("string"==typeof e)return delete t[e];if("object"==typeof e){const r=Object.keys(e)[0],n=t[r].toString().split(",");t[r]=n.filter(t=>t!==e[r]).join(",")}});const l=Object.fromEntries(Object.entries(t).filter(e=>{let[,t]=e;return t})),a=Object(S.addQueryArgs)(r,l);Object(_.c)(a)},R=["min_price","max_price","rating_filter","filter_","query_type_"],L=e=>{let t=!1;for(let r=0;R.length>r;r++){const n=R[r];if(n===e.substring(0,n.length)){t=!0;break}}return t};var B=r(115),F=r(16),P=r(200),Q=e=>{let{attributeObject:t,slugs:r=[],operator:n="in",displayStyle:c,isLoadingCallback:l}=e;const{results:a,isLoading:i}=Object(B.a)({namespace:"/wc/store/v1",resourceName:"products/attributes/terms",resourceValues:[t.id]}),[s,u]=Object(f.b)("attributes",[]);if(Object(o.useEffect)(()=>{l(i)},[i,l]),!Array.isArray(a)||!Object(w.c)(a)||!Object(w.a)(s))return null;const b=t.label,d=Object(g.getSettingWithCoercion)("is_rendering_php_template",!1,j.a);return Object(o.createElement)("li",null,Object(o.createElement)("span",{className:"wc-block-active-filters__list-item-type"},b,":"),Object(o.createElement)("ul",null,r.map((e,r)=>{const l=a.find(t=>t.slug===e);if(!l)return null;let m="";return r>0&&"and"===n&&(m=Object(o.createElement)("span",{className:"wc-block-active-filters__list-item-operator"},Object(p.__)("All","woo-gutenberg-products-block"))),A({type:b,name:Object(F.decodeEntities)(l.name||e),prefix:m,isLoading:i,removeCallback:()=>{const r=s.find(e=>{let{attribute:r}=e;return r==="pa_"+t.name});1===(null==r?void 0:r.slug.length)?T("query_type_"+t.name,"filter_"+t.name):T({["filter_"+t.name]:e}),d||Object(P.a)(s,u,t,e)},showLabel:!1,displayStyle:c})})))},M=e=>{let{displayStyle:t,isLoading:r}=e;return r?Object(o.createElement)(o.Fragment,null,[...Array("list"===t?2:3)].map((e,r)=>Object(o.createElement)("li",{className:"list"===t?"show-loading-state-list":"show-loading-state-chips",key:r},Object(o.createElement)("span",{className:"show-loading-state__inner"})))):null},D=r(109),I=e=>{let{attributes:t,isEditor:r=!1}=e;const n=Object(D.a)(),c=function(){const e=Object(o.useRef)(!1);return Object(o.useEffect)(()=>(e.current=!0,()=>{e.current=!1}),[]),Object(o.useCallback)(()=>e.current,[])}()(),l=Object(g.getSettingWithCoercion)("is_rendering_php_template",!1,j.a),[a,i]=Object(o.useState)(!0),s=(()=>{if(!window)return!1;const e=window.location.href,t=Object(S.getQueryArgs)(e),r=Object.keys(t);let n=!1;for(let e=0;r.length>e;e++){const t=r[e];if(L(t)){n=!0;break}}return n})()&&!r&&a,[b,d]=Object(f.b)("attributes",[]),[m,v]=Object(f.b)("stock_status",[]),[E,x]=Object(f.b)("min_price"),[N,R]=Object(f.b)("max_price"),[B,F]=Object(f.b)("rating"),P=Object(g.getSetting)("stockStatusOptions",[]),I=Object(g.getSetting)("attributes",[]),V=Object(o.useMemo)(()=>{if(s||0===m.length||(e=m,!Array.isArray(e)||!e.every(e=>["instock","outofstock","onbackorder"].includes(e)))||!(e=>Object(y.b)(e)&&Object.keys(e).every(e=>["instock","outofstock","onbackorder"].includes(e)))(P))return null;var e;const r=Object(p.__)("Stock Status","woo-gutenberg-products-block");return Object(o.createElement)("li",null,Object(o.createElement)("span",{className:"wc-block-active-filters__list-item-type"},r,":"),Object(o.createElement)("ul",null,m.map(e=>A({type:r,name:P[e],removeCallback:()=>{if(T({filter_stock_status:e}),!l){const t=m.filter(t=>t!==e);v(t)}},showLabel:!1,displayStyle:t.displayStyle}))))},[s,P,m,v,t.displayStyle,l]),W=Object(o.useMemo)(()=>s||!Number.isFinite(E)&&!Number.isFinite(N)?null:A({type:Object(p.__)("Price","woo-gutenberg-products-block"),name:C(E,N),removeCallback:()=>{T("max_price","min_price"),l||(x(void 0),R(void 0))},displayStyle:t.displayStyle}),[s,E,N,t.displayStyle,x,R,l]),Y=Object(o.useMemo)(()=>!Object(w.a)(b)&&c||!b.length&&!(e=>{if(!window)return!1;const t=e.map(e=>"filter_"+e.attribute_name),r=window.location.href,n=Object(S.getQueryArgs)(r),c=Object.keys(n);let o=!1;for(let e=0;c.length>e;e++){const r=c[e];if(t.includes(r)){o=!0;break}}return o})(I)?(a&&i(!1),null):b.map(e=>{const r=Object(k.c)(e.attribute);return r?Object(o.createElement)(Q,{attributeObject:r,displayStyle:t.displayStyle,slugs:e.slug,key:e.attribute,operator:e.operator,isLoadingCallback:i}):(a&&i(!1),null)}),[b,c,I,a,t.displayStyle]);Object(o.useEffect)(()=>{var e;if(!l)return;if(B.length&&B.length>0)return;const t=null===(e=Object(_.d)("rating_filter"))||void 0===e?void 0:e.toString();t&&F(t.split(","))},[l,B,F]);const z=Object(o.useMemo)(()=>{if(s||0===B.length||(e=B,!Array.isArray(e)||!e.every(e=>["1","2","3","4","5"].includes(e))))return null;var e;const r=Object(p.__)("Rating","woo-gutenberg-products-block");return Object(o.createElement)("li",null,Object(o.createElement)("span",{className:"wc-block-active-filters__list-item-type"},r,":"),Object(o.createElement)("ul",null,B.map(e=>A({type:r,name:Object(p.sprintf)(
/* translators: %s is referring to the average rating value */
Object(p.__)("Rated %s out of 5","woo-gutenberg-products-block"),e),removeCallback:()=>{if(T({rating_filter:e}),!l){const t=B.filter(t=>t!==e);F(t)}},showLabel:!1,displayStyle:t.displayStyle}))))},[s,B,F,t.displayStyle,l]);if(!s&&!(b.length>0||m.length>0||B.length>0||Number.isFinite(E)||Number.isFinite(N))&&!r)return n(!1),null;const K="h"+t.headingLevel,U=Object(o.createElement)(K,{className:"wc-block-active-filters__title"},t.heading),q=s?Object(o.createElement)(h.a,null,U):U;if(!Object(g.getSettingWithCoercion)("has_filterable_products",!1,j.a))return n(!1),null;n(!0);const G=u()("wc-block-active-filters__list",{"wc-block-active-filters__list--chips":"chips"===t.displayStyle,"wc-block-active-filters--loading":s});return Object(o.createElement)(o.Fragment,null,!r&&t.heading&&q,Object(o.createElement)("div",{className:"wc-block-active-filters"},Object(o.createElement)("ul",{className:G},r?Object(o.createElement)(o.Fragment,null,A({type:Object(p.__)("Size","woo-gutenberg-products-block"),name:Object(p.__)("Small","woo-gutenberg-products-block"),displayStyle:t.displayStyle}),A({type:Object(p.__)("Color","woo-gutenberg-products-block"),name:Object(p.__)("Blue","woo-gutenberg-products-block"),displayStyle:t.displayStyle})):Object(o.createElement)(o.Fragment,null,Object(o.createElement)(M,{isLoading:s,displayStyle:t.displayStyle}),W,V,Y,z)),s?Object(o.createElement)("span",{className:"wc-block-active-filters__clear-all-placeholder"}):Object(o.createElement)("button",{className:"wc-block-active-filters__clear-all",onClick:()=>{(()=>{if(!window)return;const e=window.location.href,t=Object(S.getQueryArgs)(e),r=Object(S.removeQueryArgs)(e,...Object.keys(t)),n=Object.fromEntries(Object.keys(t).filter(e=>!L(e)).map(e=>[e,t[e]])),c=Object(S.addQueryArgs)(r,n);Object(_.c)(c)})(),l||(x(void 0),R(void 0),d([]),v([]),F([]))}},Object(o.createElement)(O.a,{label:Object(p.__)("Clear All","woo-gutenberg-products-block"),screenReaderLabel:Object(p.__)("Clear All Filters","woo-gutenberg-products-block")}))))},V=(r(387),r(130)),W=Object(m.withSpokenMessages)(e=>{let{attributes:t,setAttributes:r,clientId:n}=e;const{className:c,displayStyle:l,heading:a,headingLevel:i}=t,s=Object(b.useBlockProps)({className:c});return Object(o.createElement)("div",s,Object(o.createElement)(b.InspectorControls,{key:"inspector"},Object(o.createElement)(m.PanelBody,{title:Object(p.__)("Display Settings","woo-gutenberg-products-block")},Object(o.createElement)(m.__experimentalToggleGroupControl,{label:Object(p.__)("Display Style","woo-gutenberg-products-block"),value:l,onChange:e=>r({displayStyle:e}),className:"wc-block-active-filter__style-toggle"},Object(o.createElement)(m.__experimentalToggleGroupControlOption,{value:"list",label:Object(p.__)("List","woo-gutenberg-products-block")}),Object(o.createElement)(m.__experimentalToggleGroupControlOption,{value:"chips",label:Object(p.__)("Chips","woo-gutenberg-products-block")})))),Object(o.createElement)(V.a,{attributes:t,clientId:n,setAttributes:r,filterType:"active-filters"}),a&&Object(o.createElement)(d.a,{className:"wc-block-active-filters__title",headingLevel:i,heading:a,onChange:e=>r({heading:e})}),Object(o.createElement)(m.Disabled,null,Object(o.createElement)(I,{attributes:t,isEditor:!0})))});const Y={heading:{type:"string",default:Object(p.__)("Active filters","woo-gutenberg-products-block")}};Object(l.registerBlockType)(N,{icon:{src:Object(o.createElement)(i.a,{icon:a.a,className:"wc-block-editor-components-block-icon"})},attributes:{...N.attributes,...Y},edit:W,save(e){let{attributes:t}=e;const{className:r,displayStyle:n,heading:l,headingLevel:a}=t,i={"data-display-style":n,"data-heading":l,"data-heading-level":a};return Object(o.createElement)("div",c()({},b.useBlockProps.save({className:u()("is-loading",r)}),i),Object(o.createElement)("span",{"aria-hidden":!0,className:"wc-block-active-filters__placeholder"}))}})},58:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return p})),r.d(t,"c",(function(){return d}));var n=r(9),c=r(7),o=r(0),l=r(25),a=r.n(l),i=r(46),s=r(98),u=r(50);const b=e=>{const t=Object(u.a)();e=e||t;const r=Object(c.useSelect)(t=>t(n.QUERY_STATE_STORE_KEY).getValueForQueryContext(e,void 0),[e]),{setValueForQueryContext:l}=Object(c.useDispatch)(n.QUERY_STATE_STORE_KEY);return[r,Object(o.useCallback)(t=>{l(e,t)},[e,l])]},p=(e,t,r)=>{const l=Object(u.a)();r=r||l;const a=Object(c.useSelect)(c=>c(n.QUERY_STATE_STORE_KEY).getValueForQueryKey(r,e,t),[r,e]),{setQueryValue:i}=Object(c.useDispatch)(n.QUERY_STATE_STORE_KEY);return[a,Object(o.useCallback)(t=>{i(r,e,t)},[r,e,i])]},d=(e,t)=>{const r=Object(u.a)();t=t||r;const[n,c]=b(t),l=Object(i.a)(n),p=Object(i.a)(e),d=Object(s.a)(p),m=Object(o.useRef)(!1);return Object(o.useEffect)(()=>{a()(d,p)||(c(Object.assign({},l,p)),m.current=!0)},[l,p,d,c]),m.current?[n,c]:[e,c]}},7:function(e,t){e.exports=window.wp.data},8:function(e,t){e.exports=window.wp.blocks},9:function(e,t){e.exports=window.wc.wcBlocksData},98:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(0);function c(e,t){const r=Object(n.useRef)();return Object(n.useEffect)(()=>{r.current===e||t&&!t(e,r.current)||(r.current=e)},[e,t]),r.current}}});