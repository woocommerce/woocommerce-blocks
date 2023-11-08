(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[89,79],{106:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return s})),n.d(t,"d",(function(){return i}));var r=n(28),c=n(67),o=n(140);const a=(e="filter_rating")=>{const t=Object(c.d)(e);return t?Object(r.a)(t)?t.split(","):t:[]};function l(){return Math.floor(Math.random()*Date.now())}const s=e=>e.trim().replace(/\s/g,"-").replace(/_/g,"-").replace(/-+/g,"-").replace(/[^a-zA-Z0-9-]/g,""),i=e=>({showFilterButton:"true"===(null==e?void 0:e.showFilterButton),showCounts:"true"===(null==e?void 0:e.showCounts),isPreview:!1,displayStyle:Object(r.a)(null==e?void 0:e.displayStyle)&&e.displayStyle||o.attributes.displayStyle.default,selectType:Object(r.a)(null==e?void 0:e.selectType)&&e.selectType||o.attributes.selectType.default})},116:function(e,t){},117:function(e,t){},135:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var r=n(0),c=n(43),o=n(19),a=n(44),l=n(26),s=n(30),i=n(52),u=n(21);const b=({queryAttribute:e,queryPrices:t,queryStock:n,queryRating:b,queryState:d,isEditor:f=!1})=>{let g=Object(u.a)();g=`${g}-collection-data`;const[O]=Object(s.a)(g),[j,m]=Object(s.b)("calculate_attribute_counts",[],g),[p,y]=Object(s.b)("calculate_price_range",null,g),[v,h]=Object(s.b)("calculate_stock_status_counts",null,g),[w,_]=Object(s.b)("calculate_rating_counts",null,g),k=Object(l.a)(e||{}),E=Object(l.a)(t),S=Object(l.a)(n),C=Object(l.a)(b);Object(r.useEffect)((()=>{"object"==typeof k&&Object.keys(k).length&&(j.find((e=>Object(o.b)(k,"taxonomy")&&e.taxonomy===k.taxonomy))||m([...j,k]))}),[k,j,m]),Object(r.useEffect)((()=>{p!==E&&void 0!==E&&y(E)}),[E,y,p]),Object(r.useEffect)((()=>{v!==S&&void 0!==S&&h(S)}),[S,h,v]),Object(r.useEffect)((()=>{w!==C&&void 0!==C&&_(C)}),[C,_,w]);const[N,R]=Object(r.useState)(f),[x]=Object(c.a)(N,200);N||R(!0);const T=Object(r.useMemo)((()=>(e=>{const t=e;return Array.isArray(e.calculate_attribute_counts)&&(t.calculate_attribute_counts=Object(a.a)(e.calculate_attribute_counts.map((({taxonomy:e,queryType:t})=>({taxonomy:e,query_type:t})))).asc(["taxonomy","query_type"])),t})(O)),[O]);return Object(i.a)({namespace:"/wc/store/v1",resourceName:"products/collection-data",query:{...d,page:void 0,per_page:void 0,orderby:void 0,order:void 0,...T},shouldSelect:x})}},140:function(e){e.exports=JSON.parse('{"name":"woocommerce/rating-filter","version":"1.0.0","title":"Filter by Rating Controls","description":"Enable customers to filter the product grid by rating.","category":"woocommerce","keywords":["WooCommerce"],"supports":{"html":false,"multiple":false,"color":true,"inserter":false,"lock":false},"attributes":{"className":{"type":"string","default":""},"showCounts":{"type":"boolean","default":false},"displayStyle":{"type":"string","default":"list"},"showFilterButton":{"type":"boolean","default":false},"selectType":{"type":"string","default":"multiple"},"isPreview":{"type":"boolean","default":false}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}')},160:function(e,t,n){"use strict";var r=n(0),c=n(1),o=n(24),a=n(76),l=n(152),s=n(4),i=n.n(s);n(230);var u=({className:e,rating:t,ratedProductsCount:n})=>{const o=i()("wc-block-components-product-rating",e),a={width:t/5*100+"%"},l=Object(c.sprintf)(/* translators: %f is referring to the average rating value */
Object(c.__)("Rated %f out of 5","woo-gutenberg-products-block"),t),s={__html:Object(c.sprintf)(/* translators: %s is the rating value wrapped in HTML strong tags. */
Object(c.__)("Rated %s out of 5","woo-gutenberg-products-block"),Object(c.sprintf)('<strong class="rating">%f</strong>',t))};return Object(r.createElement)("div",{className:o},Object(r.createElement)("div",{className:"wc-block-components-product-rating__stars",role:"img","aria-label":l},Object(r.createElement)("span",{style:a,dangerouslySetInnerHTML:s})),null!==n?Object(r.createElement)("span",{className:"wc-block-components-product-rating-count"},"(",n,")"):null)},b=n(26),d=n(53),f=n(30),g=n(135),O=n(2),j=n(63),m=n(19),p=n(13),y=n.n(p),v=n(86),h=n(62),w=n(61),_=n(85),k=n(14),E=n(67);const S=[{label:Object(r.createElement)(u,{key:5,rating:5,ratedProductsCount:null}),value:"5"},{label:Object(r.createElement)(u,{key:4,rating:4,ratedProductsCount:null}),value:"4"},{label:Object(r.createElement)(u,{key:3,rating:3,ratedProductsCount:null}),value:"3"},{label:Object(r.createElement)(u,{key:2,rating:2,ratedProductsCount:null}),value:"2"},{label:Object(r.createElement)(u,{key:1,rating:1,ratedProductsCount:null}),value:"1"}];n(229);var C=n(106),N=n(47);const R="rating_filter",x=e=>Object(c.sprintf)(/* translators: %s is referring to the average rating value */
Object(c.__)("Rated %s out of 5 filter added.","woo-gutenberg-products-block"),e),T=e=>Object(c.sprintf)(/* translators: %s is referring to the average rating value */
Object(c.__)("Rated %s out of 5 filter added.","woo-gutenberg-products-block"),e);t.a=({attributes:e,isEditor:t,noRatingsNotice:n=null})=>{const s=Object(N.b)(),p=Object(O.getSettingWithCoercion)("isRenderingPhpTemplate",!1,j.a),[A,F]=Object(r.useState)(!1),[P]=Object(f.a)(),{results:L,isLoading:q}=Object(g.a)({queryRating:!0,queryState:P,isEditor:t}),[Q,M]=Object(r.useState)(e.isPreview?S:[]),$=!e.isPreview&&q&&0===Q.length,z=!e.isPreview&&q,W=Object(r.useMemo)((()=>Object(C.c)("rating_filter")),[]),[Y,B]=Object(r.useState)(W),[D,V]=Object(f.b)("rating",W),[I,K]=Object(r.useState)(Object(C.b)()),[Z,H]=Object(r.useState)(!1),J="single"!==e.selectType,U=J?!$&&Y.length<Q.length:!$&&0===Y.length,G=Object(r.useCallback)((e=>{t||(e&&!p&&V(e),(e=>{if(!window)return;if(0===e.length){const e=Object(k.removeQueryArgs)(window.location.href,R);return void(e!==Object(E.e)(window.location.href)&&Object(E.c)(e))}const t=Object(k.addQueryArgs)(window.location.href,{[R]:e.join(",")});t!==Object(E.e)(window.location.href)&&Object(E.c)(t)})(e))}),[t,V,p]);Object(r.useEffect)((()=>{e.showFilterButton||G(Y)}),[e.showFilterButton,Y,G]);const X=Object(r.useMemo)((()=>D),[D]),ee=Object(b.a)(X),te=Object(d.a)(ee);Object(r.useEffect)((()=>{y()(te,ee)||y()(Y,ee)||B(ee)}),[Y,ee,te]),Object(r.useEffect)((()=>{A||(V(W),F(!0))}),[V,A,F,W]),Object(r.useEffect)((()=>{if(q||e.isPreview)return;const n=!q&&Object(m.b)(L,"rating_counts")&&Array.isArray(L.rating_counts)?[...L.rating_counts].reverse():[];if(t&&0===n.length)return M(S),void H(!0);const c=n.filter((e=>Object(m.a)(e)&&Object.keys(e).length>0)).map((t=>{var n;return{label:Object(r.createElement)(u,{key:null==t?void 0:t.rating,rating:null==t?void 0:t.rating,ratedProductsCount:e.showCounts?null==t?void 0:t.count:null}),value:null==t||null===(n=t.rating)||void 0===n?void 0:n.toString()}}));M(c),K(Object(C.b)())}),[e.showCounts,e.isPreview,L,q,D,t]);const ne=Object(r.useCallback)((e=>{const t=Y.includes(e);if(!J){const n=t?[]:[e];return Object(o.speak)(t?T(e):x(e)),void B(n)}if(t){const t=Y.filter((t=>t!==e));return Object(o.speak)(T(e)),void B(t)}const n=[...Y,e].sort(((e,t)=>Number(t)-Number(e)));Object(o.speak)(x(e)),B(n)}),[Y,J]);return(q||0!==Q.length)&&Object(O.getSettingWithCoercion)("hasFilterableProducts",!1,j.a)?(s(!0),Object(r.createElement)(r.Fragment,null,Z&&n,Object(r.createElement)("div",{className:i()("wc-block-rating-filter",`style-${e.displayStyle}`,{"is-loading":$})},"dropdown"===e.displayStyle?Object(r.createElement)(r.Fragment,null,Object(r.createElement)(_.a,{key:I,className:i()({"single-selection":!J,"is-loading":$}),style:{borderStyle:"none"},suggestions:Q.filter((e=>!Y.includes(e.value))).map((e=>e.value)),disabled:$,placeholder:Object(c.__)("Select Rating","woo-gutenberg-products-block"),onChange:e=>{!J&&e.length>1&&(e=[e[e.length-1]]);const t=[e=e.map((e=>{const t=Q.find((t=>t.value===e));return t?t.value:e})),Y].reduce(((e,t)=>e.filter((e=>!t.includes(e)))));if(1===t.length)return ne(t[0]);const n=[Y,e].reduce(((e,t)=>e.filter((e=>!t.includes(e)))));1===n.length&&ne(n[0])},value:Y,displayTransform:e=>{const t={value:e,label:Object(r.createElement)(u,{key:Number(e),rating:Number(e),ratedProductsCount:0})},n=Q.find((t=>t.value===e))||t,{label:c,value:o}=n;return Object.assign({},c,{toLocaleLowerCase:()=>o,substring:(e,t)=>0===e&&1===t?c:""})},saveTransform:C.a,messages:{added:Object(c.__)("Rating filter added.","woo-gutenberg-products-block"),removed:Object(c.__)("Rating filter removed.","woo-gutenberg-products-block"),remove:Object(c.__)("Remove rating filter.","woo-gutenberg-products-block"),__experimentalInvalid:Object(c.__)("Invalid rating filter.","woo-gutenberg-products-block")}}),U&&Object(r.createElement)(a.a,{icon:l.a,size:30})):Object(r.createElement)(v.a,{className:"wc-block-rating-filter-list",options:Q,checked:Y,onChange:e=>{ne(e.toString())},isLoading:$,isDisabled:z})),Object(r.createElement)("div",{className:"wc-block-rating-filter__actions"},(Y.length>0||t)&&!$&&Object(r.createElement)(w.a,{onClick:()=>{B([]),V([]),G([])},screenReaderLabel:Object(c.__)("Reset rating filter","woo-gutenberg-products-block")}),e.showFilterButton&&Object(r.createElement)(h.a,{className:"wc-block-rating-filter__button",isLoading:$,disabled:$||z,onClick:()=>G(Y)})))):(s(!1),null)}},18:function(e,t,n){"use strict";var r=n(0),c=n(4),o=n.n(c);t.a=({label:e,screenReaderLabel:t,wrapperElement:n,wrapperProps:c={}})=>{let a;const l=null!=e,s=null!=t;return!l&&s?(a=n||"span",c={...c,className:o()(c.className,"screen-reader-text")},Object(r.createElement)(a,{...c},t)):(a=n||r.Fragment,l&&s&&e!==t?Object(r.createElement)(a,{...c},Object(r.createElement)("span",{"aria-hidden":"true"},e),Object(r.createElement)("span",{className:"screen-reader-text"},t)):Object(r.createElement)(a,{...c},e))}},19:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return o}));var r=n(37);const c=e=>!Object(r.a)(e)&&e instanceof Object&&e.constructor===Object;function o(e,t){return c(e)&&t in e}},21:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(0);const c=Object(r.createContext)("page"),o=()=>Object(r.useContext)(c);c.Provider},229:function(e,t){},230:function(e,t){},26:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(0),c=n(13),o=n.n(c);function a(e){const t=Object(r.useRef)(e);return o()(e,t.current)||(t.current=e),t.current}},28:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));const r=e=>"string"==typeof e},287:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var c in t=arguments[n])Object.prototype.hasOwnProperty.call(t,c)&&(e[c]=t[c]);return e},r.apply(this,arguments)};Object.create,Object.create,"function"==typeof SuppressedError&&SuppressedError},288:function(e,t,n){"use strict";function r(e){return e.toLowerCase()}n.d(t,"a",(function(){return a}));var c=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],o=/[^A-Z0-9]+/gi;function a(e,t){void 0===t&&(t={});for(var n=t.splitRegexp,a=void 0===n?c:n,s=t.stripRegexp,i=void 0===s?o:s,u=t.transform,b=void 0===u?r:u,d=t.delimiter,f=void 0===d?" ":d,g=l(l(e,a,"$1\0$2"),i,"\0"),O=0,j=g.length;"\0"===g.charAt(O);)O++;for(;"\0"===g.charAt(j-1);)j--;return g.slice(O,j).split("\0").map(b).join(f)}function l(e,t,n){return t instanceof RegExp?e.replace(t,n):t.reduce((function(e,t){return e.replace(t,n)}),e)}},291:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(287),c=n(288);function o(e,t){return void 0===t&&(t={}),function(e,t){return void 0===t&&(t={}),Object(c.a)(e,Object(r.a)({delimiter:"."},t))}(e,Object(r.a)({delimiter:"-"},t))}},293:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var r=n(4),c=n.n(r),o=n(19),a=n(28),l=n(291),s=n(131);function i(e={}){const t={};return Object(s.getCSSRules)(e,{selector:""}).forEach((e=>{t[e.key]=e.value})),t}function u(e,t){return e&&t?`has-${Object(l.a)(t)}-${e}`:""}const b=e=>{const t=(e=>{const t=Object(o.a)(e)?e:{style:{}};let n=t.style;return Object(a.a)(n)&&(n=JSON.parse(n)||{}),Object(o.a)(n)||(n={}),{...t,style:n}})(e),n=function(e){var t,n,r,a,l,s,b;const{backgroundColor:d,textColor:f,gradient:g,style:O}=e,j=u("background-color",d),m=u("color",f),p=function(e){if(e)return`has-${e}-gradient-background`}(g),y=p||(null==O||null===(t=O.color)||void 0===t?void 0:t.gradient);return{className:c()(m,p,{[j]:!y&&!!j,"has-text-color":f||(null==O||null===(n=O.color)||void 0===n?void 0:n.text),"has-background":d||(null==O||null===(r=O.color)||void 0===r?void 0:r.background)||g||(null==O||null===(a=O.color)||void 0===a?void 0:a.gradient),"has-link-color":Object(o.a)(null==O||null===(l=O.elements)||void 0===l?void 0:l.link)?null==O||null===(s=O.elements)||void 0===s||null===(b=s.link)||void 0===b?void 0:b.color:void 0}),style:i({color:(null==O?void 0:O.color)||{}})}}(t),r=function(e){var t;const n=(null===(t=e.style)||void 0===t?void 0:t.border)||{};return{className:function(e){var t;const{borderColor:n,style:r}=e,o=n?u("border-color",n):"";return c()({"has-border-color":!!n||!(null==r||null===(t=r.border)||void 0===t||!t.color),[o]:!!o})}(e),style:i({border:n})}}(t),l=function(e){var t;return{className:void 0,style:i({spacing:(null===(t=e.style)||void 0===t?void 0:t.spacing)||{}})}}(t),s=(e=>{const t=Object(o.a)(e.style.typography)?e.style.typography:{},n=Object(a.a)(t.fontFamily)?t.fontFamily:"";return{className:e.fontFamily?`has-${e.fontFamily}-font-family`:n,style:{fontSize:e.fontSize?`var(--wp--preset--font-size--${e.fontSize})`:t.fontSize,fontStyle:t.fontStyle,fontWeight:t.fontWeight,letterSpacing:t.letterSpacing,lineHeight:t.lineHeight,textDecoration:t.textDecoration,textTransform:t.textTransform}}})(t);return{className:c()(s.className,n.className,r.className,l.className),style:{...s.style,...n.style,...r.style,...l.style}}}},30:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d})),n.d(t,"c",(function(){return f}));var r=n(3),c=n(5),o=n(0),a=n(13),l=n.n(a),s=n(26),i=n(53),u=n(21);const b=e=>{const t=Object(u.a)();e=e||t;const n=Object(c.useSelect)((t=>t(r.QUERY_STATE_STORE_KEY).getValueForQueryContext(e,void 0)),[e]),{setValueForQueryContext:a}=Object(c.useDispatch)(r.QUERY_STATE_STORE_KEY);return[n,Object(o.useCallback)((t=>{a(e,t)}),[e,a])]},d=(e,t,n)=>{const a=Object(u.a)();n=n||a;const l=Object(c.useSelect)((c=>c(r.QUERY_STATE_STORE_KEY).getValueForQueryKey(n,e,t)),[n,e]),{setQueryValue:s}=Object(c.useDispatch)(r.QUERY_STATE_STORE_KEY);return[l,Object(o.useCallback)((t=>{s(n,e,t)}),[n,e,s])]},f=(e,t)=>{const n=Object(u.a)();t=t||n;const[r,c]=b(t),a=Object(s.a)(r),d=Object(s.a)(e),f=Object(i.a)(d),g=Object(o.useRef)(!1);return Object(o.useEffect)((()=>{l()(f,d)||(c(Object.assign({},a,d)),g.current=!0)}),[a,d,f,c]),g.current?[r,c]:[e,c]}},37:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));const r=e=>null===e},492:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(4),o=n.n(c),a=n(293),l=n(28),s=n(160),i=n(106);t.default=e=>{const t=Object(a.a)(e),n=Object(i.d)(e);return Object(r.createElement)("div",{className:o()(Object(l.a)(e.className)?e.className:"",t.className),style:t.style},Object(r.createElement)(s.a,{isEditor:!1,attributes:n}))}},52:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(3),c=n(5),o=n(0),a=n(26);const l=e=>{const{namespace:t,resourceName:n,resourceValues:l=[],query:s={},shouldSelect:i=!0}=e;if(!t||!n)throw new Error("The options object must have valid values for the namespace and the resource properties.");const u=Object(o.useRef)({results:[],isLoading:!0}),b=Object(a.a)(s),d=Object(a.a)(l),f=(()=>{const[,e]=Object(o.useState)();return Object(o.useCallback)((t=>{e((()=>{throw t}))}),[])})(),g=Object(c.useSelect)((e=>{if(!i)return null;const c=e(r.COLLECTIONS_STORE_KEY),o=[t,n,b,d],a=c.getCollectionError(...o);if(a){if(!(a instanceof Error))throw new Error("TypeError: `error` object is not an instance of Error constructor");f(a)}return{results:c.getCollection(...o),isLoading:!c.hasFinishedResolution("getCollection",o)}}),[t,n,d,b,i]);return null!==g&&(u.current=g),u.current}},53:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(0);function c(e,t){const n=Object(r.useRef)();return Object(r.useEffect)((()=>{n.current===e||t&&!t(e,n.current)||(n.current=e)}),[e,t]),n.current}},61:function(e,t,n){"use strict";var r=n(0),c=n(1),o=n(4),a=n.n(o),l=n(18);n(91),t.a=({className:e,
/* translators: Reset button text for filters. */
label:t=Object(c.__)("Reset","woo-gutenberg-products-block"),onClick:n,screenReaderLabel:o=Object(c.__)("Reset filter","woo-gutenberg-products-block")})=>Object(r.createElement)("button",{className:a()("wc-block-components-filter-reset-button",e),onClick:n},Object(r.createElement)(l.a,{label:t,screenReaderLabel:o}))},62:function(e,t,n){"use strict";var r=n(0),c=n(1),o=n(4),a=n.n(o),l=n(18);n(92),t.a=({className:e,isLoading:t,disabled:n,
/* translators: Submit button text for filters. */
label:o=Object(c.__)("Apply","woo-gutenberg-products-block"),onClick:s,screenReaderLabel:i=Object(c.__)("Apply filter","woo-gutenberg-products-block")})=>Object(r.createElement)("button",{type:"submit",className:a()("wp-block-button__link","wc-block-filter-submit-button","wc-block-components-filter-submit-button",{"is-loading":t},e),disabled:n,onClick:s},Object(r.createElement)(l.a,{label:o,screenReaderLabel:i}))},63:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));const r=e=>"boolean"==typeof e},67:function(e,t,n){"use strict";n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return s})),n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"e",(function(){return b}));var r=n(14),c=n(2),o=n(63);const a=Object(c.getSettingWithCoercion)("isRenderingPhpTemplate",!1,o.a),l="query_type_",s="filter_";function i(e){return window?Object(r.getQueryArg)(window.location.href,e):null}function u(e){a?((e=e.replace(/(?:query-(?:\d+-)?page=(\d+))|(?:page\/(\d+))/g,"")).endsWith("?")&&(e=e.slice(0,-1)),window.location.href=e):window.history.replaceState({},"",e)}const b=e=>{const t=Object(r.getQueryArgs)(e);return Object(r.addQueryArgs)(e,t)}},85:function(e,t,n){"use strict";var r=n(0),c=n(126),o=n(4),a=n.n(o);n(116),t.a=({className:e,style:t,suggestions:n,multiple:o=!0,saveTransform:l=(e=>e.trim().replace(/\s/g,"-")),messages:s={},validateInput:i=(e=>n.includes(e)),label:u="",...b})=>Object(r.createElement)("div",{className:a()("wc-blocks-components-form-token-field-wrapper",e,{"single-selection":!o}),style:t},Object(r.createElement)(c.a,{label:u,__experimentalExpandOnFocus:!0,__experimentalShowHowTo:!1,__experimentalValidateInput:i,saveTransform:l,maxLength:o?void 0:1,suggestions:n,messages:s,...b}))},86:function(e,t,n){"use strict";var r=n(0),c=n(1),o=n(4),a=n.n(o),l=n(11);n(117),t.a=({className:e,onChange:t,options:n=[],checked:o=[],isLoading:s=!1,isDisabled:i=!1,limit:u=10})=>{const[b,d]=Object(r.useState)(!1),f=Object(r.useMemo)((()=>[...Array(5)].map(((e,t)=>Object(r.createElement)("li",{key:t,style:{width:Math.floor(75*Math.random())+25+"%"}})))),[]),g=Object(r.useMemo)((()=>{const e=n.length-u;return!b&&Object(r.createElement)("li",{key:"show-more",className:"show-more"},Object(r.createElement)("button",{onClick:()=>{d(!0)},"aria-expanded":!1,"aria-label":Object(c.sprintf)(/* translators: %s is referring the remaining count of options */
Object(c._n)("Show %s more option","Show %s more options",e,"woo-gutenberg-products-block"),e)},Object(c.sprintf)(/* translators: %s number of options to reveal. */
Object(c._n)("Show %s more","Show %s more",e,"woo-gutenberg-products-block"),e)))}),[n,u,b]),O=Object(r.useMemo)((()=>b&&Object(r.createElement)("li",{key:"show-less",className:"show-less"},Object(r.createElement)("button",{onClick:()=>{d(!1)},"aria-expanded":!0,"aria-label":Object(c.__)("Show less options","woo-gutenberg-products-block")},Object(c.__)("Show less","woo-gutenberg-products-block")))),[b]),j=Object(r.useMemo)((()=>{const e=n.length>u+5;return Object(r.createElement)(r.Fragment,null,n.map(((n,c)=>Object(r.createElement)(r.Fragment,{key:n.value},Object(r.createElement)("li",{...e&&!b&&c>=u&&{hidden:!0}},Object(r.createElement)(l.CheckboxControl,{id:n.value,className:"wc-block-checkbox-list__checkbox",label:n.label,checked:o.includes(n.value),onChange:()=>{t(n.value)},disabled:i})),e&&c===u-1&&g))),e&&O)}),[n,t,o,b,u,O,g,i]),m=a()("wc-block-checkbox-list","wc-block-components-checkbox-list",{"is-loading":s},e);return Object(r.createElement)("ul",{className:m},s?f:j)}},91:function(e,t){},92:function(e,t){}}]);