this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["stock-filter"]=function(e){function t(t){for(var n,s,l=t[0],a=t[1],i=t[2],b=0,d=[];b<l.length;b++)s=l[b],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&d.push(o[s][0]),o[s]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(u&&u(t);d.length;)d.shift()();return r.push.apply(r,i||[]),c()}function c(){for(var e,t=0;t<r.length;t++){for(var c=r[t],n=!0,l=1;l<c.length;l++){var a=c[l];0!==o[a]&&(n=!1)}n&&(r.splice(t--,1),e=s(s.s=c[0]))}return e}var n={},o={57:0,1:0},r=[];function s(t){if(n[t])return n[t].exports;var c=n[t]={i:t,l:!1,exports:{}};return e[t].call(c.exports,c,c.exports,s),c.l=!0,c.exports}s.m=e,s.c=n,s.d=function(e,t,c){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:c})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(s.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(c,n,function(t){return e[t]}.bind(null,n));return c},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var l=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],a=l.push.bind(l);l.push=t,l=l.slice();for(var i=0;i<l.length;i++)t(l[i]);var u=a;return r.push([571,0]),c()}({0:function(e,t){e.exports=window.wp.element},1:function(e,t){e.exports=window.wp.i18n},10:function(e,t){e.exports=window.wp.htmlEntities},108:function(e,t,c){"use strict";c.d(t,"a",(function(){return o}));var n=c(0);function o(e,t){const c=Object(n.useRef)();return Object(n.useEffect)((()=>{c.current===e||t&&!t(e,c.current)||(c.current=e)}),[e,t]),c.current}},11:function(e,t){e.exports=window.wp.compose},113:function(e,t){e.exports=window.wp.warning},119:function(e,t,c){"use strict";c.d(t,"a",(function(){return n}));const n=e=>"string"==typeof e},120:function(e,t,c){"use strict";c.d(t,"a",(function(){return r}));var n=c(0);const o=Object(n.createContext)({}),r=()=>{const{wrapper:e}=Object(n.useContext)(o);return t=>{e&&e.current&&(e.current.hidden=!t)}}},126:function(e,t,c){"use strict";c.d(t,"a",(function(){return l}));var n=c(8),o=c(6),r=c(0),s=c(47);const l=e=>{const{namespace:t,resourceName:c,resourceValues:l=[],query:a={},shouldSelect:i=!0}=e;if(!t||!c)throw new Error("The options object must have valid values for the namespace and the resource properties.");const u=Object(r.useRef)({results:[],isLoading:!0}),b=Object(s.a)(a),d=Object(s.a)(l),p=(()=>{const[,e]=Object(r.useState)();return Object(r.useCallback)((t=>{e((()=>{throw t}))}),[])})(),f=Object(o.useSelect)((e=>{if(!i)return null;const o=e(n.COLLECTIONS_STORE_KEY),r=[t,c,b,d],s=o.getCollectionError(...r);if(s){if(!(s instanceof Error))throw new Error("TypeError: `error` object is not an instance of Error constructor");p(s)}return{results:o.getCollection(...r),isLoading:!o.hasFinishedResolution("getCollection",r)}}),[t,c,d,b,i]);return null!==f&&(u.current=f),u.current}},13:function(e,t){e.exports=window.wc.blocksCheckout},131:function(e,t,c){"use strict";var n=c(0),o=c(1),r=c(30);c(299),t.a=({name:e,count:t})=>Object(n.createElement)(n.Fragment,null,e,null!==t&&Number.isFinite(t)&&Object(n.createElement)(r.a,{label:t.toString(),screenReaderLabel:Object(o.sprintf)(/* translators: %s number of products. */
Object(o._n)("%s product","%s products",t,"woo-gutenberg-products-block"),t),wrapperElement:"span",wrapperProps:{className:"wc-filter-element-label-list-count"}}))},141:function(e,t,c){"use strict";c.d(t,"a",(function(){return i}));var n=c(0),o=c(1),r=c(7),s=c(6),l=c(2),a=c(4);const i=({clientId:e,setAttributes:t,filterType:c,attributes:i})=>{const{replaceBlock:u}=Object(s.useDispatch)("core/block-editor"),{heading:b,headingLevel:d}=i;if(Object(s.useSelect)((t=>{const{getBlockParentsByBlockName:c}=t("core/block-editor");return c(e,"woocommerce/filter-wrapper").length>0}),[e])||!c)return null;const p=[Object(n.createElement)(l.Button,{key:"convert",onClick:()=>{const n=[Object(r.createBlock)(`woocommerce/${c}`,{...i,heading:""})];b&&""!==b&&n.unshift(Object(r.createBlock)("core/heading",{content:b,level:null!=d?d:2})),u(e,Object(r.createBlock)("woocommerce/filter-wrapper",{heading:b,filterType:c},[...n])),t({heading:"",lock:{remove:!0}})},variant:"primary"},Object(o.__)("Upgrade block","woo-gutenberg-products-block"))];return Object(n.createElement)(a.Warning,{actions:p},Object(o.__)("Filter block: We have improved this block to make styling easier. Upgrade it using the button below.","woo-gutenberg-products-block"))}},142:function(e,t,c){"use strict";var n=c(0),o=c(4),r=c(11),s=c(1);c(194),t.a=Object(r.withInstanceId)((({className:e,headingLevel:t,onChange:c,heading:r,instanceId:l})=>{const a=`h${t}`;return Object(n.createElement)(a,{className:e},Object(n.createElement)("label",{className:"screen-reader-text",htmlFor:`block-title-${l}`},Object(s.__)("Block title","woo-gutenberg-products-block")),Object(n.createElement)(o.PlainText,{id:`block-title-${l}`,className:"wc-block-editor-components-title",value:r,onChange:c,style:{backgroundColor:"transparent"}}))}))},143:function(e,t,c){"use strict";var n=c(0);c(195),t.a=({children:e})=>Object(n.createElement)("div",{className:"wc-block-filter-title-placeholder"},e)},145:function(e,t,c){"use strict";var n=c(0),o=c(1),r=c(5),s=c.n(r),l=c(30);c(198),t.a=({className:e,
/* translators: Reset button text for filters. */
label:t=Object(o.__)("Reset","woo-gutenberg-products-block"),onClick:c,screenReaderLabel:r=Object(o.__)("Reset filter","woo-gutenberg-products-block")})=>Object(n.createElement)("button",{className:s()("wc-block-components-filter-reset-button",e),onClick:c},Object(n.createElement)(l.a,{label:t,screenReaderLabel:r}))},146:function(e,t,c){"use strict";var n=c(0),o=c(1),r=c(5),s=c.n(r),l=c(30);c(199),t.a=({className:e,isLoading:t,disabled:c,
/* translators: Submit button text for filters. */
label:r=Object(o.__)("Apply","woo-gutenberg-products-block"),onClick:a,screenReaderLabel:i=Object(o.__)("Apply filter","woo-gutenberg-products-block")})=>Object(n.createElement)("button",{type:"submit",className:s()("wp-block-button__link","wc-block-filter-submit-button","wc-block-components-filter-submit-button",{"is-loading":t},e),disabled:c,onClick:a},Object(n.createElement)(l.a,{label:r,screenReaderLabel:i}))},15:function(e,t){e.exports=window.wp.url},168:function(e){e.exports=JSON.parse('{"name":"woocommerce/stock-filter","version":"1.0.0","title":"Filter by Stock Controls","description":"Enable customers to filter the product grid by stock status.","category":"woocommerce","keywords":["WooCommerce"],"supports":{"html":false,"multiple":false,"color":true,"inserter":false,"lock":false},"attributes":{"className":{"type":"string","default":""},"headingLevel":{"type":"number","default":3},"showCounts":{"type":"boolean","default":false},"showFilterButton":{"type":"boolean","default":false},"displayStyle":{"type":"string","default":"list"},"selectType":{"type":"string","default":"multiple"},"isPreview":{"type":"boolean","default":false}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}')},174:function(e,t,c){"use strict";var n=c(0),o=c(361),r=c(5),s=c.n(r);c(232),t.a=({className:e,style:t,suggestions:c,multiple:r=!0,saveTransform:l=(e=>e.trim().replace(/\s/g,"-")),messages:a={},validateInput:i=(e=>c.includes(e)),label:u="",...b})=>Object(n.createElement)("div",{className:s()("wc-blocks-components-form-token-field-wrapper",e,{"single-selection":!r}),style:t},Object(n.createElement)(o.a,{label:u,__experimentalExpandOnFocus:!0,__experimentalShowHowTo:!1,__experimentalValidateInput:i,saveTransform:l,maxLength:r?void 0:1,suggestions:c,messages:a,...b}))},175:function(e,t,c){"use strict";var n=c(0),o=c(1),r=c(5),s=c.n(r),l=c(13);c(233),t.a=({className:e,onChange:t,options:c=[],checked:r=[],isLoading:a=!1,isDisabled:i=!1,limit:u=10})=>{const[b,d]=Object(n.useState)(!1),p=Object(n.useMemo)((()=>[...Array(5)].map(((e,t)=>Object(n.createElement)("li",{key:t,style:{width:Math.floor(75*Math.random())+25+"%"}})))),[]),f=Object(n.useMemo)((()=>{const e=c.length-u;return!b&&Object(n.createElement)("li",{key:"show-more",className:"show-more"},Object(n.createElement)("button",{onClick:()=>{d(!0)},"aria-expanded":!1,"aria-label":Object(o.sprintf)(/* translators: %s is referring the remaining count of options */
Object(o._n)("Show %s more option","Show %s more options",e,"woo-gutenberg-products-block"),e)},Object(o.sprintf)(/* translators: %s number of options to reveal. */
Object(o._n)("Show %s more","Show %s more",e,"woo-gutenberg-products-block"),e)))}),[c,u,b]),m=Object(n.useMemo)((()=>b&&Object(n.createElement)("li",{key:"show-less",className:"show-less"},Object(n.createElement)("button",{onClick:()=>{d(!1)},"aria-expanded":!0,"aria-label":Object(o.__)("Show less options","woo-gutenberg-products-block")},Object(o.__)("Show less","woo-gutenberg-products-block")))),[b]),g=Object(n.useMemo)((()=>{const e=c.length>u+5;return Object(n.createElement)(n.Fragment,null,c.map(((c,o)=>Object(n.createElement)(n.Fragment,{key:c.value},Object(n.createElement)("li",{...e&&!b&&o>=u&&{hidden:!0}},Object(n.createElement)(l.CheckboxControl,{id:c.value,className:"wc-block-checkbox-list__checkbox",label:c.label,checked:r.includes(c.value),onChange:()=>{t(c.value)},disabled:i})),e&&o===u-1&&f))),e&&m)}),[c,t,r,b,u,m,f,i]),O=s()("wc-block-checkbox-list","wc-block-components-checkbox-list",{"is-loading":a},e);return Object(n.createElement)("ul",{className:O},a?p:g)}},194:function(e,t){},195:function(e,t){},198:function(e,t){},199:function(e,t){},2:function(e,t){e.exports=window.wp.components},21:function(e,t,c){"use strict";c.d(t,"b",(function(){return o})),c.d(t,"c",(function(){return r})),c.d(t,"a",(function(){return s}));var n=c(42);const o=e=>!Object(n.a)(e)&&e instanceof Object&&e.constructor===Object;function r(e,t){return o(e)&&t in e}const s=e=>0===Object.keys(e).length},232:function(e,t){},233:function(e,t){},25:function(e,t){e.exports=window.wp.isShallowEqual},26:function(e,t){e.exports=window.React},267:function(e,t,c){"use strict";c.d(t,"b",(function(){return l})),c.d(t,"a",(function(){return a})),c.d(t,"d",(function(){return i})),c.d(t,"c",(function(){return u})),c.d(t,"e",(function(){return b}));var n=c(15),o=c(3),r=c(82);const s=Object(o.getSettingWithCoercion)("isRenderingPhpTemplate",!1,r.a),l="query_type_",a="filter_";function i(e){return window?Object(n.getQueryArg)(window.location.href,e):null}function u(e){s?((e=e.replace(/(?:query-(?:\d+-)?page=(\d+))|(?:page\/(\d+))/g,"")).endsWith("?")&&(e=e.slice(0,-1)),window.location.href=e):window.history.replaceState({},"",e)}const b=e=>{const t=Object(n.getQueryArgs)(e);return Object(n.addQueryArgs)(e,t)}},27:function(e,t){e.exports=window.lodash},299:function(e,t){},3:function(e,t){e.exports=window.wc.wcSettings},30:function(e,t,c){"use strict";var n=c(0),o=c(5),r=c.n(o);t.a=({label:e,screenReaderLabel:t,wrapperElement:c,wrapperProps:o={}})=>{let s;const l=null!=e,a=null!=t;return!l&&a?(s=c||"span",o={...o,className:r()(o.className,"screen-reader-text")},Object(n.createElement)(s,{...o},t)):(s=c||n.Fragment,l&&a&&e!==t?Object(n.createElement)(s,{...o},Object(n.createElement)("span",{"aria-hidden":"true"},e),Object(n.createElement)("span",{className:"screen-reader-text"},t)):Object(n.createElement)(s,{...o},e))}},300:function(e,t,c){"use strict";c.d(t,"a",(function(){return b}));var n=c(0),o=c(41),r=c(21),s=c(110),l=c(47),a=c(61),i=c(126),u=c(50);const b=({queryAttribute:e,queryPrices:t,queryStock:c,queryRating:b,queryState:d,isEditor:p=!1})=>{let f=Object(u.a)();f=`${f}-collection-data`;const[m]=Object(a.a)(f),[g,O]=Object(a.b)("calculate_attribute_counts",[],f),[j,w]=Object(a.b)("calculate_price_range",null,f),[k,h]=Object(a.b)("calculate_stock_status_counts",null,f),[_,v]=Object(a.b)("calculate_rating_counts",null,f),y=Object(l.a)(e||{}),E=Object(l.a)(t),x=Object(l.a)(c),S=Object(l.a)(b);Object(n.useEffect)((()=>{"object"==typeof y&&Object.keys(y).length&&(g.find((e=>Object(r.c)(y,"taxonomy")&&e.taxonomy===y.taxonomy))||O([...g,y]))}),[y,g,O]),Object(n.useEffect)((()=>{j!==E&&void 0!==E&&w(E)}),[E,w,j]),Object(n.useEffect)((()=>{k!==x&&void 0!==x&&h(x)}),[x,h,k]),Object(n.useEffect)((()=>{_!==S&&void 0!==S&&v(S)}),[S,v,_]);const[C,N]=Object(n.useState)(p),[T]=Object(o.a)(C,200);C||N(!0);const R=Object(n.useMemo)((()=>(e=>{const t=e;return Array.isArray(e.calculate_attribute_counts)&&(t.calculate_attribute_counts=Object(s.a)(e.calculate_attribute_counts.map((({taxonomy:e,queryType:t})=>({taxonomy:e,query_type:t})))).asc(["taxonomy","query_type"])),t})(m)),[m]);return Object(i.a)({namespace:"/wc/store/v1",resourceName:"products/collection-data",query:{...d,page:void 0,per_page:void 0,orderby:void 0,order:void 0,...R},shouldSelect:T})}},38:function(e,t){e.exports=window.wp.deprecated},4:function(e,t){e.exports=window.wp.blockEditor},42:function(e,t,c){"use strict";c.d(t,"a",(function(){return n}));const n=e=>null===e},46:function(e,t){e.exports=window.wp.a11y},47:function(e,t,c){"use strict";c.d(t,"a",(function(){return s}));var n=c(0),o=c(25),r=c.n(o);function s(e){const t=Object(n.useRef)(e);return r()(e,t.current)||(t.current=e),t.current}},50:function(e,t,c){"use strict";c.d(t,"a",(function(){return r}));var n=c(0);const o=Object(n.createContext)("page"),r=()=>Object(n.useContext)(o);o.Provider},571:function(e,t,c){e.exports=c(590)},572:function(e,t){},573:function(e,t){},58:function(e,t){e.exports=window.wp.keycodes},590:function(e,t,c){"use strict";c.r(t);var n=c(0),o=c(7),r=c(68),s=c(640),l=c(5),a=c.n(l),i=c(4),u=c(1),b=c(142),d=c(2),p=c(46),f=c(648),m=c(47),g=c(108),O=c(61),j=c(300),w=c(3),k=c(175),h=c(146),_=c(145),v=c(143),y=c(131),E=c(174),x=c(25),S=c.n(x),C=c(10),N=c(82),T=c(21),R=c(15),L=c(267);const P=[{value:"preview-1",name:"In Stock",label:Object(n.createElement)(y.a,{name:"In Stock",count:3}),textLabel:"In Stock (3)"},{value:"preview-2",name:"Out of stock",label:Object(n.createElement)(y.a,{name:"Out of stock",count:3}),textLabel:"Out of stock (3)"},{value:"preview-3",name:"On backorder",label:Object(n.createElement)(y.a,{name:"On backorder",count:2}),textLabel:"On backorder (2)"}];c(573);var A=c(119),F=c(168);function B(){return Math.floor(Math.random()*Date.now())}const M=e=>e.trim().replace(/\s/g,"").replace(/_/g,"-").replace(/-+/g,"-").replace(/[^a-zA-Z0-9-]/g,"");var I=c(120);const q=L.a+"stock_status";var Q=({attributes:e,isEditor:t=!1})=>{const c=Object(I.a)(),o=Object(w.getSettingWithCoercion)("isRenderingPhpTemplate",!1,N.a),[s,l]=Object(n.useState)(!1),{outofstock:i,...b}=Object(w.getSetting)("stockStatusOptions",{}),d=Object(n.useRef)(Object(w.getSetting)("hideOutOfStockItems",!1)?b:{outofstock:i,...b}),x=Object(n.useMemo)((()=>((e,t="filter_stock_status")=>{const c=Object(L.d)(t);if(!c)return[];const n=Object(A.a)(c)?c.split(","):c,o=Object.keys(e);return n.filter((e=>o.includes(e)))})(d.current,q)),[]),[F,Q]=Object(n.useState)(x),[D,$]=Object(n.useState)(e.isPreview?P:[]),[W]=Object(n.useState)(Object.entries(d.current).map((([e,t])=>({slug:e,name:t}))).filter((e=>!!e.name)).sort(((e,t)=>e.slug.localeCompare(t.slug)))),[Y]=Object(O.a)(),[V,G]=Object(O.b)("stock_status",x),{results:K,isLoading:U}=Object(j.a)({queryStock:!0,queryState:Y,isEditor:t}),J=Object(n.useCallback)((e=>Object(T.c)(K,"stock_status_counts")&&Array.isArray(K.stock_status_counts)?K.stock_status_counts.find((({status:t,count:c})=>t===e&&0!==Number(c))):null),[K]),[z,H]=Object(n.useState)(B());Object(n.useEffect)((()=>{if(U||e.isPreview)return;const t=W.map((t=>{const c=J(t.slug);if(!(c||F.includes(t.slug)||(o=t.slug,null!=Y&&Y.stock_status&&Y.stock_status.some((({status:e=[]})=>e.includes(o))))))return null;var o;const r=c?Number(c.count):0;return{value:t.slug,name:Object(C.decodeEntities)(t.name),label:Object(n.createElement)(y.a,{name:Object(C.decodeEntities)(t.name),count:e.showCounts?r:null}),textLabel:e.showCounts?`${Object(C.decodeEntities)(t.name)} (${r})`:Object(C.decodeEntities)(t.name)}})).filter((e=>!!e));$(t),H(B())}),[e.showCounts,e.isPreview,U,J,F,Y.stock_status,W]);const Z="single"!==e.selectType,X=Object(n.useCallback)((e=>{t||(e&&!o&&G(e),(e=>{if(!window)return;if(0===e.length){const e=Object(R.removeQueryArgs)(window.location.href,q);return void(e!==Object(L.e)(window.location.href)&&Object(L.c)(e))}const t=Object(R.addQueryArgs)(window.location.href,{[q]:e.join(",")});t!==Object(L.e)(window.location.href)&&Object(L.c)(t)})(e))}),[t,G,o]);Object(n.useEffect)((()=>{e.showFilterButton||X(F)}),[e.showFilterButton,F,X]);const ee=Object(n.useMemo)((()=>V),[V]),te=Object(m.a)(ee),ce=Object(g.a)(te);Object(n.useEffect)((()=>{S()(ce,te)||S()(F,te)||Q(te)}),[F,te,ce]),Object(n.useEffect)((()=>{s||(G(x),l(!0))}),[G,s,l,x]);const ne=Object(n.useCallback)((e=>{const t=e=>{const t=D.find((t=>t.value===e));return t?t.name:null},c=({filterAdded:e,filterRemoved:c})=>{const n=e?t(e):null,o=c?t(c):null;n?Object(p.speak)(Object(u.sprintf)(/* translators: %s stock statuses (for example: 'instock'...) */
Object(u.__)("%s filter added.","woo-gutenberg-products-block"),n)):o&&Object(p.speak)(Object(u.sprintf)(/* translators: %s stock statuses (for example:'instock'...) */
Object(u.__)("%s filter removed.","woo-gutenberg-products-block"),o))},n=F.includes(e);if(!Z){const t=n?[]:[e];return c(n?{filterRemoved:e}:{filterAdded:e}),void Q(t)}if(n){const t=F.filter((t=>t!==e));return c({filterRemoved:e}),void Q(t)}const o=[...F,e].sort();c({filterAdded:e}),Q(o)}),[F,Z,D]);if(!U&&0===D.length)return c(!1),null;const oe=`h${e.headingLevel}`,re=!e.isPreview&&!d.current||0===D.length,se=!e.isPreview&&U;if(!Object(w.getSettingWithCoercion)("hasFilterableProducts",!1,N.a))return c(!1),null;const le=Z?!re&&F.length<D.length:!re&&0===F.length,ae=Object(n.createElement)(oe,{className:"wc-block-stock-filter__title"},e.heading),ie=re?Object(n.createElement)(v.a,null,ae):ae;return c(!0),Object(n.createElement)(n.Fragment,null,!t&&e.heading&&ie,Object(n.createElement)("div",{className:a()("wc-block-stock-filter",`style-${e.displayStyle}`,{"is-loading":re})},"dropdown"===e.displayStyle?Object(n.createElement)(n.Fragment,null,Object(n.createElement)(E.a,{key:z,className:a()({"single-selection":!Z,"is-loading":re}),suggestions:D.filter((e=>!F.includes(e.value))).map((e=>e.value)),disabled:re,placeholder:Object(u.__)("Select stock status","woo-gutenberg-products-block"),onChange:e=>{!Z&&e.length>1&&(e=e.slice(-1));const t=[e=e.map((e=>{const t=D.find((t=>t.value===e));return t?t.value:e})),F].reduce(((e,t)=>e.filter((e=>!t.includes(e)))));if(1===t.length)return ne(t[0]);const c=[F,e].reduce(((e,t)=>e.filter((e=>!t.includes(e)))));1===c.length&&ne(c[0])},value:F,displayTransform:e=>{const t=D.find((t=>t.value===e));return t?t.textLabel:e},saveTransform:M,messages:{added:Object(u.__)("Stock filter added.","woo-gutenberg-products-block"),removed:Object(u.__)("Stock filter removed.","woo-gutenberg-products-block"),remove:Object(u.__)("Remove stock filter.","woo-gutenberg-products-block"),__experimentalInvalid:Object(u.__)("Invalid stock filter.","woo-gutenberg-products-block")}}),le&&Object(n.createElement)(r.a,{icon:f.a,size:30})):Object(n.createElement)(k.a,{className:"wc-block-stock-filter-list",options:D,checked:F,onChange:ne,isLoading:re,isDisabled:se})),Object(n.createElement)("div",{className:"wc-block-stock-filter__actions"},(F.length>0||t)&&!re&&Object(n.createElement)(_.a,{onClick:()=>{Q([]),X([])},screenReaderLabel:Object(u.__)("Reset stock filter","woo-gutenberg-products-block")}),e.showFilterButton&&Object(n.createElement)(h.a,{className:"wc-block-stock-filter__button",isLoading:re,disabled:re||se,onClick:()=>X(F)})))},D=(c(572),c(141)),$=Object(d.withSpokenMessages)((({clientId:e,attributes:t,setAttributes:c})=>{const{className:o,heading:r,headingLevel:s,showCounts:l,showFilterButton:p,selectType:f,displayStyle:m}=t,g=Object(i.useBlockProps)({className:a()("wc-block-stock-filter",o)});return Object(n.createElement)(n.Fragment,null,Object(n.createElement)(i.InspectorControls,{key:"inspector"},Object(n.createElement)(d.PanelBody,{title:Object(u.__)("Display Settings","woo-gutenberg-products-block")},Object(n.createElement)(d.ToggleControl,{label:Object(u.__)("Display product count","woo-gutenberg-products-block"),checked:l,onChange:()=>c({showCounts:!l})}),Object(n.createElement)(d.__experimentalToggleGroupControl,{label:Object(u.__)("Allow selecting multiple options?","woo-gutenberg-products-block"),value:f||"multiple",onChange:e=>c({selectType:e}),className:"wc-block-attribute-filter__multiple-toggle"},Object(n.createElement)(d.__experimentalToggleGroupControlOption,{value:"multiple",label:Object(u.__)("Multiple","woo-gutenberg-products-block")}),Object(n.createElement)(d.__experimentalToggleGroupControlOption,{value:"single",label:Object(u.__)("Single","woo-gutenberg-products-block")})),Object(n.createElement)(d.__experimentalToggleGroupControl,{label:Object(u.__)("Display Style","woo-gutenberg-products-block"),value:m,onChange:e=>c({displayStyle:e}),className:"wc-block-attribute-filter__display-toggle"},Object(n.createElement)(d.__experimentalToggleGroupControlOption,{value:"list",label:Object(u.__)("List","woo-gutenberg-products-block")}),Object(n.createElement)(d.__experimentalToggleGroupControlOption,{value:"dropdown",label:Object(u.__)("Dropdown","woo-gutenberg-products-block")})),Object(n.createElement)(d.ToggleControl,{label:Object(u.__)("Show 'Apply filters' button","woo-gutenberg-products-block"),help:Object(u.__)("Products will update when the button is clicked.","woo-gutenberg-products-block"),checked:p,onChange:e=>c({showFilterButton:e})}))),Object(n.createElement)(D.a,{clientId:e,attributes:t,setAttributes:c,filterType:"stock-filter"}),Object(n.createElement)("div",{...g},r&&Object(n.createElement)(b.a,{className:"wc-block-stock-filter__title",headingLevel:s,heading:r,onChange:e=>c({heading:e})}),Object(n.createElement)(d.Disabled,null,Object(n.createElement)(Q,{attributes:t,isEditor:!0}))))}));const W={heading:{type:"string",default:Object(u.__)("Filter by stock status","woo-gutenberg-products-block")}};var Y=[{attributes:{...F.attributes,showCounts:{type:"boolean",default:!0},...W},save:({attributes:e})=>{const{className:t,showCounts:c,heading:o,headingLevel:r,showFilterButton:s}=e,l={"data-show-counts":c,"data-heading":o,"data-heading-level":r};return s&&(l["data-show-filter-button"]=s),Object(n.createElement)("div",{...i.useBlockProps.save({className:a()("is-loading",t)}),...l},Object(n.createElement)("span",{"aria-hidden":!0,className:"wc-block-product-stock-filter__placeholder"}))}}];Object(o.registerBlockType)(F,{icon:{src:Object(n.createElement)(r.a,{icon:s.a,className:"wc-block-editor-components-block-icon"})},attributes:{...F.attributes,...W},edit:$,save({attributes:e}){const{className:t}=e;return Object(n.createElement)("div",{...i.useBlockProps.save({className:a()("is-loading",t)})})},deprecated:Y})},6:function(e,t){e.exports=window.wp.data},61:function(e,t,c){"use strict";c.d(t,"a",(function(){return b})),c.d(t,"b",(function(){return d})),c.d(t,"c",(function(){return p}));var n=c(8),o=c(6),r=c(0),s=c(25),l=c.n(s),a=c(47),i=c(108),u=c(50);const b=e=>{const t=Object(u.a)();e=e||t;const c=Object(o.useSelect)((t=>t(n.QUERY_STATE_STORE_KEY).getValueForQueryContext(e,void 0)),[e]),{setValueForQueryContext:s}=Object(o.useDispatch)(n.QUERY_STATE_STORE_KEY);return[c,Object(r.useCallback)((t=>{s(e,t)}),[e,s])]},d=(e,t,c)=>{const s=Object(u.a)();c=c||s;const l=Object(o.useSelect)((o=>o(n.QUERY_STATE_STORE_KEY).getValueForQueryKey(c,e,t)),[c,e]),{setQueryValue:a}=Object(o.useDispatch)(n.QUERY_STATE_STORE_KEY);return[l,Object(r.useCallback)((t=>{a(c,e,t)}),[c,e,a])]},p=(e,t)=>{const c=Object(u.a)();t=t||c;const[n,o]=b(t),s=Object(a.a)(n),d=Object(a.a)(e),p=Object(i.a)(d),f=Object(r.useRef)(!1);return Object(r.useEffect)((()=>{l()(p,d)||(o(Object.assign({},s,d)),f.current=!0)}),[s,d,p,o]),f.current?[n,o]:[e,o]}},7:function(e,t){e.exports=window.wp.blocks},8:function(e,t){e.exports=window.wc.wcBlocksData},80:function(e,t){e.exports=window.wp.dom},82:function(e,t,c){"use strict";c.d(t,"a",(function(){return n}));const n=e=>"boolean"==typeof e},9:function(e,t){e.exports=window.wp.primitives}});