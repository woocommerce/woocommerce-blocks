this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["rating-filter"]=function(e){function t(t){for(var o,l,a=t[0],s=t[1],i=t[2],b=0,d=[];b<a.length;b++)l=a[b],Object.prototype.hasOwnProperty.call(c,l)&&c[l]&&d.push(c[l][0]),c[l]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);for(u&&u(t);d.length;)d.shift()();return r.push.apply(r,i||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,a=1;a<n.length;a++){var s=n[a];0!==c[s]&&(o=!1)}o&&(r.splice(t--,1),e=l(l.s=n[0]))}return e}var o={},c={48:0,1:0},r=[];function l(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=o,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)l.d(n,o,function(t){return e[t]}.bind(null,o));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var a=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],s=a.push.bind(a);a.push=t,a=a.slice();for(var i=0;i<a.length;i++)t(a[i]);var u=s;return r.push([535,0]),n()}({0:function(e,t){e.exports=window.wp.element},1:function(e,t){e.exports=window.wp.i18n},10:function(e,t){e.exports=window.wp.primitives},102:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var o=n(0);function c(e,t){const n=Object(o.useRef)();return Object(o.useEffect)(()=>{n.current===e||t&&!t(e,n.current)||(n.current=e)},[e,t]),n.current}},107:function(e,t){e.exports=window.wp.warning},112:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));const o=e=>"string"==typeof e},114:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var o=n(0);const c=Object(o.createContext)({}),r=()=>{const{wrapper:e}=Object(o.useContext)(c);return t=>{e&&e.current&&(e.current.hidden=!t)}}},12:function(e,t){e.exports=window.wp.compose},121:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var o=n(9),c=n(6),r=n(0),l=n(47);const a=e=>{const{namespace:t,resourceName:n,resourceValues:a=[],query:s={},shouldSelect:i=!0}=e;if(!t||!n)throw new Error("The options object must have valid values for the namespace and the resource properties.");const u=Object(r.useRef)({results:[],isLoading:!0}),b=Object(l.a)(s),d=Object(l.a)(a),p=(()=>{const[,e]=Object(r.useState)();return Object(r.useCallback)(t=>{e(()=>{throw t})},[])})(),g=Object(c.useSelect)(e=>{if(!i)return null;const c=e(o.COLLECTIONS_STORE_KEY),r=[t,n,b,d],l=c.getCollectionError(...r);if(l){if(!(l instanceof Error))throw new Error("TypeError: `error` object is not an instance of Error constructor");p(l)}return{results:c.getCollection(...r),isLoading:!c.hasFinishedResolution("getCollection",r)}},[t,n,d,b,i]);return null!==g&&(u.current=g),u.current}},139:function(e,t,n){"use strict";var o=n(0),c=n(1),r=n(4),l=n.n(r),a=n(30);n(195),t.a=e=>{let{className:t,label:
/* translators: Reset button text for filters. */
n=Object(c.__)("Reset","woo-gutenberg-products-block"),onClick:r,screenReaderLabel:s=Object(c.__)("Reset filter","woo-gutenberg-products-block")}=e;return Object(o.createElement)("button",{className:l()("wc-block-components-filter-reset-button",t),onClick:r},Object(o.createElement)(a.a,{label:n,screenReaderLabel:s}))}},14:function(e,t){e.exports=window.wc.blocksCheckout},140:function(e,t,n){"use strict";var o=n(0),c=n(1),r=n(4),l=n.n(r),a=n(30);n(196),t.a=e=>{let{className:t,isLoading:n,disabled:r,label:
/* translators: Submit button text for filters. */
s=Object(c.__)("Apply","woo-gutenberg-products-block"),onClick:i,screenReaderLabel:u=Object(c.__)("Apply filter","woo-gutenberg-products-block")}=e;return Object(o.createElement)("button",{type:"submit",className:l()("wp-block-button__link","wc-block-filter-submit-button","wc-block-components-filter-submit-button",{"is-loading":n},t),disabled:r,onClick:i},Object(o.createElement)(a.a,{label:s,screenReaderLabel:u}))}},16:function(e,t){e.exports=window.wp.url},175:function(e,t,n){"use strict";var o=n(7),c=n.n(o),r=n(0),l=n(345),a=n(4),s=n.n(a);n(230),t.a=e=>{let{className:t,style:n,suggestions:o,multiple:a=!0,saveTransform:i=(e=>e.trim().replace(/\s/g,"-")),messages:u={},validateInput:b=(e=>o.includes(e)),label:d="",...p}=e;return Object(r.createElement)("div",{className:s()("wc-blocks-components-form-token-field-wrapper",t,{"single-selection":!a}),style:n},Object(r.createElement)(l.a,c()({label:d,__experimentalExpandOnFocus:!0,__experimentalShowHowTo:!1,__experimentalValidateInput:b,saveTransform:i,maxLength:a?void 0:1,suggestions:o,messages:u},p)))}},176:function(e,t,n){"use strict";var o=n(0),c=n(1),r=n(4),l=n.n(r),a=n(14);n(231),t.a=e=>{let{className:t,onChange:n,options:r=[],checked:s=[],isLoading:i=!1,isDisabled:u=!1,limit:b=10}=e;const[d,p]=Object(o.useState)(!1),g=Object(o.useMemo)(()=>[...Array(5)].map((e,t)=>Object(o.createElement)("li",{key:t,style:{width:Math.floor(75*Math.random())+25+"%"}})),[]),f=Object(o.useMemo)(()=>{const e=r.length-b;return!d&&Object(o.createElement)("li",{key:"show-more",className:"show-more"},Object(o.createElement)("button",{onClick:()=>{p(!0)},"aria-expanded":!1,"aria-label":Object(c.sprintf)(
/* translators: %s is referring the remaining count of options */
Object(c._n)("Show %s more option","Show %s more options",e,"woo-gutenberg-products-block"),e)},Object(c.sprintf)(
/* translators: %s number of options to reveal. */
Object(c._n)("Show %s more","Show %s more",e,"woo-gutenberg-products-block"),e)))},[r,b,d]),O=Object(o.useMemo)(()=>d&&Object(o.createElement)("li",{key:"show-less",className:"show-less"},Object(o.createElement)("button",{onClick:()=>{p(!1)},"aria-expanded":!0,"aria-label":Object(c.__)("Show less options","woo-gutenberg-products-block")},Object(c.__)("Show less","woo-gutenberg-products-block"))),[d]),j=Object(o.useMemo)(()=>{const e=r.length>b+5;return Object(o.createElement)(o.Fragment,null,r.map((t,c)=>Object(o.createElement)(o.Fragment,{key:t.value},Object(o.createElement)("li",e&&!d&&c>=b&&{hidden:!0},Object(o.createElement)(a.CheckboxControl,{id:t.value,className:"wc-block-checkbox-list__checkbox",label:t.label,checked:s.includes(t.value),onChange:()=>{n(t.value)},disabled:u})),e&&c===b-1&&f)),e&&O)},[r,n,s,d,b,O,f,u]),m=l()("wc-block-checkbox-list","wc-block-components-checkbox-list",{"is-loading":i},t);return Object(o.createElement)("ul",{className:m},i?g:j)}},184:function(e){e.exports=JSON.parse('{"name":"woocommerce/rating-filter","version":"1.0.0","title":"Filter by Rating Controls","description":"Enable customers to filter the product grid by rating.","category":"woocommerce","keywords":["WooCommerce"],"supports":{"html":false,"multiple":false,"color":true,"inserter":false,"lock":false},"attributes":{"className":{"type":"string","default":""},"showCounts":{"type":"boolean","default":false},"displayStyle":{"type":"string","default":"list"},"showFilterButton":{"type":"boolean","default":false},"selectType":{"type":"string","default":"multiple"},"isPreview":{"type":"boolean","default":false}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}')},195:function(e,t){},196:function(e,t){},2:function(e,t){e.exports=window.wp.components},21:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return l}));var o=n(40);const c=e=>!Object(o.a)(e)&&e instanceof Object&&e.constructor===Object;function r(e,t){return c(e)&&t in e}const l=e=>0===Object.keys(e).length},230:function(e,t){},231:function(e,t){},26:function(e,t){e.exports=window.wp.isShallowEqual},260:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return s})),n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"e",(function(){return b}));var o=n(16),c=n(3),r=n(83);const l=Object(c.getSettingWithCoercion)("is_rendering_php_template",!1,r.a),a="query_type_",s="filter_";function i(e){return window?Object(o.getQueryArg)(window.location.href,e):null}function u(e){l?((e=e.replace(/(?:query-(?:\d+-)?page=(\d+))|(?:page\/(\d+))/g,"")).endsWith("?")&&(e=e.slice(0,-1)),window.location.href=e):window.history.replaceState({},"",e)}const b=e=>{const t=Object(o.getQueryArgs)(e);return Object(o.addQueryArgs)(e,t)}},27:function(e,t){e.exports=window.React},28:function(e,t){e.exports=window.lodash},292:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var o=n(0),c=n(276),r=n(21),l=n(104),a=n(47),s=n(62),i=n(121),u=n(51);const b=e=>{let{queryAttribute:t,queryPrices:n,queryStock:b,queryRating:d,queryState:p,isEditor:g=!1}=e,f=Object(u.a)();f+="-collection-data";const[O]=Object(s.a)(f),[j,m]=Object(s.b)("calculate_attribute_counts",[],f),[w,_]=Object(s.b)("calculate_price_range",null,f),[h,y]=Object(s.b)("calculate_stock_status_counts",null,f),[k,v]=Object(s.b)("calculate_rating_counts",null,f),E=Object(a.a)(t||{}),C=Object(a.a)(n),x=Object(a.a)(b),S=Object(a.a)(d);Object(o.useEffect)(()=>{"object"==typeof E&&Object.keys(E).length&&(j.find(e=>Object(r.c)(E,"taxonomy")&&e.taxonomy===E.taxonomy)||m([...j,E]))},[E,j,m]),Object(o.useEffect)(()=>{w!==C&&void 0!==C&&_(C)},[C,_,w]),Object(o.useEffect)(()=>{h!==x&&void 0!==x&&y(x)},[x,y,h]),Object(o.useEffect)(()=>{k!==S&&void 0!==S&&v(S)},[S,v,k]);const[N,T]=Object(o.useState)(g),[R]=Object(c.a)(N,200);N||T(!0);const P=Object(o.useMemo)(()=>(e=>{const t=e;return Array.isArray(e.calculate_attribute_counts)&&(t.calculate_attribute_counts=Object(l.a)(e.calculate_attribute_counts.map(e=>{let{taxonomy:t,queryType:n}=e;return{taxonomy:t,query_type:n}})).asc(["taxonomy","query_type"])),t})(O),[O]);return Object(i.a)({namespace:"/wc/store/v1",resourceName:"products/collection-data",query:{...p,page:void 0,per_page:void 0,orderby:void 0,order:void 0,...P},shouldSelect:R})}},3:function(e,t){e.exports=window.wc.wcSettings},30:function(e,t,n){"use strict";var o=n(0),c=n(4),r=n.n(c);t.a=e=>{let t,{label:n,screenReaderLabel:c,wrapperElement:l,wrapperProps:a={}}=e;const s=null!=n,i=null!=c;return!s&&i?(t=l||"span",a={...a,className:r()(a.className,"screen-reader-text")},Object(o.createElement)(t,a,c)):(t=l||o.Fragment,s&&i&&n!==c?Object(o.createElement)(t,a,Object(o.createElement)("span",{"aria-hidden":"true"},n),Object(o.createElement)("span",{className:"screen-reader-text"},c)):Object(o.createElement)(t,a,n))}},38:function(e,t){e.exports=window.wp.deprecated},40:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));const o=e=>null===e},46:function(e,t){e.exports=window.wp.a11y},47:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var o=n(0),c=n(26),r=n.n(c);function l(e){const t=Object(o.useRef)(e);return r()(e,t.current)||(t.current=e),t.current}},5:function(e,t){e.exports=window.wp.blockEditor},51:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var o=n(0);const c=Object(o.createContext)("page"),r=()=>Object(o.useContext)(c);c.Provider},535:function(e,t,n){e.exports=n(565)},536:function(e,t){},537:function(e,t){},538:function(e,t){},565:function(e,t,n){"use strict";n.r(t);var o=n(0),c=n(8),r=n(70),l=n(611),a=n(4),s=n.n(a),i=n(5),u=n(1),b=n(2),d=n(46),p=n(623);n(538);var g=e=>{let{className:t,rating:n,ratedProductsCount:c}=e;const r=s()("wc-block-components-product-rating",t),l={width:n/5*100+"%"},a=Object(u.sprintf)(
/* translators: %f is referring to the average rating value */
Object(u.__)("Rated %f out of 5","woo-gutenberg-products-block"),n),i={__html:Object(u.sprintf)(
/* translators: %s is the rating value wrapped in HTML strong tags. */
Object(u.__)("Rated %s out of 5","woo-gutenberg-products-block"),Object(u.sprintf)('<strong class="rating">%f</strong>',n))};return Object(o.createElement)("div",{className:r},Object(o.createElement)("div",{className:"wc-block-components-product-rating__stars",role:"img","aria-label":a},Object(o.createElement)("span",{style:l,dangerouslySetInnerHTML:i})),null!==c?Object(o.createElement)("span",{className:"wc-block-components-product-rating-count"},"(",c,")"):null)},f=n(47),O=n(102),j=n(62),m=n(292),w=n(3),_=n(83),h=n(21),y=n(26),k=n.n(y),v=n(176),E=n(140),C=n(139),x=n(175),S=n(16),N=n(260);const T=[{label:Object(o.createElement)(g,{key:5,rating:5,ratedProductsCount:null}),value:"5"},{label:Object(o.createElement)(g,{key:4,rating:4,ratedProductsCount:null}),value:"4"},{label:Object(o.createElement)(g,{key:3,rating:3,ratedProductsCount:null}),value:"3"},{label:Object(o.createElement)(g,{key:2,rating:2,ratedProductsCount:null}),value:"2"},{label:Object(o.createElement)(g,{key:1,rating:1,ratedProductsCount:null}),value:"1"}];n(537);var R=n(112),P=n(184);function A(){return Math.floor(Math.random()*Date.now())}const L=e=>e.trim().replace(/\s/g,"-").replace(/_/g,"-").replace(/-+/g,"-").replace(/[^a-zA-Z0-9-]/g,"");var F=n(114);const M=e=>Object(u.sprintf)(
/* translators: %s is referring to the average rating value */
Object(u.__)("Rated %s out of 5 filter added.","woo-gutenberg-products-block"),e),q=e=>Object(u.sprintf)(
/* translators: %s is referring to the average rating value */
Object(u.__)("Rated %s out of 5 filter added.","woo-gutenberg-products-block"),e);var B=e=>{let{attributes:t,isEditor:n,noRatingsNotice:c=null}=e;const l=Object(F.a)(),a=Object(w.getSettingWithCoercion)("is_rendering_php_template",!1,_.a),[i,b]=Object(o.useState)(!1),[y]=Object(j.a)(),{results:P,isLoading:B}=Object(m.a)({queryRating:!0,queryState:y,isEditor:n}),[Q,D]=Object(o.useState)(t.isPreview?T:[]),Y=!t.isPreview&&B&&0===Q.length,I=!t.isPreview&&B,V=Object(o.useMemo)(()=>function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"filter_rating";const t=Object(N.d)(e);if(!t)return[];const n=Object(R.a)(t)?t.split(","):t;return n}("rating_filter"),[]),[W,G]=Object(o.useState)(V),[K,U]=Object(j.b)("rating",V),[J,z]=Object(o.useState)(A()),[H,Z]=Object(o.useState)(!1),$="single"!==t.selectType,X=$?!Y&&W.length<Q.length:!Y&&0===W.length,ee=Object(o.useCallback)(e=>{n||(e&&!a&&U(e),(e=>{if(!window)return;if(0===e.length){const e=Object(S.removeQueryArgs)(window.location.href,"rating_filter");return void(e!==Object(N.e)(window.location.href)&&Object(N.c)(e))}const t=Object(S.addQueryArgs)(window.location.href,{rating_filter:e.join(",")});t!==Object(N.e)(window.location.href)&&Object(N.c)(t)})(e))},[n,U,a]);Object(o.useEffect)(()=>{t.showFilterButton||ee(W)},[t.showFilterButton,W,ee]);const te=Object(o.useMemo)(()=>K,[K]),ne=Object(f.a)(te),oe=Object(O.a)(ne);Object(o.useEffect)(()=>{k()(oe,ne)||k()(W,ne)||G(ne)},[W,ne,oe]),Object(o.useEffect)(()=>{i||(U(V),b(!0))},[U,i,b,V]),Object(o.useEffect)(()=>{if(B||t.isPreview)return;const e=!B&&Object(h.c)(P,"rating_counts")&&Array.isArray(P.rating_counts)?[...P.rating_counts].reverse():[];if(n&&0===e.length)return D(T),void Z(!0);const c=e.filter(e=>Object(h.b)(e)&&Object.keys(e).length>0).map(e=>{var n;return{label:Object(o.createElement)(g,{key:null==e?void 0:e.rating,rating:null==e?void 0:e.rating,ratedProductsCount:t.showCounts?null==e?void 0:e.count:null}),value:null==e||null===(n=e.rating)||void 0===n?void 0:n.toString()}});D(c),z(A())},[t.showCounts,t.isPreview,P,B,K,n]);const ce=Object(o.useCallback)(e=>{const t=W.includes(e);if(!$){const n=t?[]:[e];return Object(d.speak)(t?q(e):M(e)),void G(n)}if(t){const t=W.filter(t=>t!==e);return Object(d.speak)(q(e)),void G(t)}const n=[...W,e].sort((e,t)=>Number(t)-Number(e));Object(d.speak)(M(e)),G(n)},[W,$]);return(B||0!==Q.length)&&Object(w.getSettingWithCoercion)("has_filterable_products",!1,_.a)?(l(!0),Object(o.createElement)(o.Fragment,null,H&&c,Object(o.createElement)("div",{className:s()("wc-block-rating-filter","style-"+t.displayStyle,{"is-loading":Y})},"dropdown"===t.displayStyle?Object(o.createElement)(o.Fragment,null,Object(o.createElement)(x.a,{key:J,className:s()({"single-selection":!$,"is-loading":Y}),style:{borderStyle:"none"},suggestions:Q.filter(e=>!W.includes(e.value)).map(e=>e.value),disabled:Y,placeholder:Object(u.__)("Select Rating","woo-gutenberg-products-block"),onChange:e=>{!$&&e.length>1&&(e=[e[e.length-1]]);const t=[e=e.map(e=>{const t=Q.find(t=>t.value===e);return t?t.value:e}),W].reduce((e,t)=>e.filter(e=>!t.includes(e)));if(1===t.length)return ce(t[0]);const n=[W,e].reduce((e,t)=>e.filter(e=>!t.includes(e)));1===n.length&&ce(n[0])},value:W,displayTransform:e=>{const t={value:e,label:Object(o.createElement)(g,{key:Number(e),rating:Number(e),ratedProductsCount:0})},n=Q.find(t=>t.value===e)||t,{label:c,value:r}=n;return Object.assign({},c,{toLocaleLowerCase:()=>r,substring:(e,t)=>0===e&&1===t?c:""})},saveTransform:L,messages:{added:Object(u.__)("Rating filter added.","woo-gutenberg-products-block"),removed:Object(u.__)("Rating filter removed.","woo-gutenberg-products-block"),remove:Object(u.__)("Remove rating filter.","woo-gutenberg-products-block"),__experimentalInvalid:Object(u.__)("Invalid rating filter.","woo-gutenberg-products-block")}}),X&&Object(o.createElement)(r.a,{icon:p.a,size:30})):Object(o.createElement)(v.a,{className:"wc-block-rating-filter-list",options:Q,checked:W,onChange:e=>{ce(e.toString())},isLoading:Y,isDisabled:I})),Object(o.createElement)("div",{className:"wc-block-rating-filter__actions"},(W.length>0||n)&&!Y&&Object(o.createElement)(C.a,{onClick:()=>{G([]),U([]),ee([])},screenReaderLabel:Object(u.__)("Reset rating filter","woo-gutenberg-products-block")}),t.showFilterButton&&Object(o.createElement)(E.a,{className:"wc-block-rating-filter__button",isLoading:Y,disabled:Y||I,onClick:()=>ee(W)})))):(l(!1),null)};n(536);const Q=Object(o.createElement)(b.Notice,{status:"warning",isDismissible:!1},Object(o.createElement)("p",null,Object(u.__)("Your store doesn't have any products with ratings yet. This filter option will display when a product receives a review.","woo-gutenberg-products-block")));var D=Object(b.withSpokenMessages)(e=>{let{attributes:t,setAttributes:n}=e;const{className:c,displayStyle:r,showCounts:l,showFilterButton:a,selectType:d}=t,p=Object(i.useBlockProps)({className:s()("wc-block-rating-filter",c)});return Object(o.createElement)(o.Fragment,null,Object(o.createElement)(i.InspectorControls,{key:"inspector"},Object(o.createElement)(b.PanelBody,{title:Object(u.__)("Display Settings","woo-gutenberg-products-block")},Object(o.createElement)(b.ToggleControl,{label:Object(u.__)("Display product count","woo-gutenberg-products-block"),checked:l,onChange:()=>n({showCounts:!l})}),Object(o.createElement)(b.__experimentalToggleGroupControl,{label:Object(u.__)("Allow selecting multiple options?","woo-gutenberg-products-block"),value:d||"multiple",onChange:e=>n({selectType:e}),className:"wc-block-attribute-filter__multiple-toggle"},Object(o.createElement)(b.__experimentalToggleGroupControlOption,{value:"multiple",label:Object(u.__)("Multiple","woo-gutenberg-products-block")}),Object(o.createElement)(b.__experimentalToggleGroupControlOption,{value:"single",label:Object(u.__)("Single","woo-gutenberg-products-block")})),Object(o.createElement)(b.__experimentalToggleGroupControl,{label:Object(u.__)("Display Style","woo-gutenberg-products-block"),value:r,onChange:e=>n({displayStyle:e}),className:"wc-block-attribute-filter__display-toggle"},Object(o.createElement)(b.__experimentalToggleGroupControlOption,{value:"list",label:Object(u.__)("List","woo-gutenberg-products-block")}),Object(o.createElement)(b.__experimentalToggleGroupControlOption,{value:"dropdown",label:Object(u.__)("Dropdown","woo-gutenberg-products-block")})),Object(o.createElement)(b.ToggleControl,{label:Object(u.__)("Show 'Apply filters' button","woo-gutenberg-products-block"),help:Object(u.__)("Products will update when the button is clicked.","woo-gutenberg-products-block"),checked:a,onChange:e=>n({showFilterButton:e})}))),Object(o.createElement)("div",p,Object(o.createElement)(b.Disabled,null,Object(o.createElement)(B,{attributes:t,isEditor:!0,noRatingsNotice:Q}))))}),Y=n(7),I=n.n(Y),V=[{attributes:{...P.attributes,showCounts:{type:"boolean",default:!0}},save:e=>{let{attributes:t}=e;const{className:n,showCounts:c}=t,r={"data-show-counts":c};return Object(o.createElement)("div",I()({},i.useBlockProps.save({className:s()("is-loading",n)}),r),Object(o.createElement)("span",{"aria-hidden":!0,className:"wc-block-product-rating-filter__placeholder"}))}}];Object(c.registerBlockType)(P,{icon:{src:Object(o.createElement)(r.a,{icon:l.a,className:"wc-block-editor-components-block-icon"})},attributes:{...P.attributes},edit:D,save(e){let{attributes:t}=e;const{className:n}=t;return Object(o.createElement)("div",i.useBlockProps.save({className:s()("is-loading",n)}))},deprecated:V})},6:function(e,t){e.exports=window.wp.data},60:function(e,t){e.exports=window.wp.keycodes},62:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d})),n.d(t,"c",(function(){return p}));var o=n(9),c=n(6),r=n(0),l=n(26),a=n.n(l),s=n(47),i=n(102),u=n(51);const b=e=>{const t=Object(u.a)();e=e||t;const n=Object(c.useSelect)(t=>t(o.QUERY_STATE_STORE_KEY).getValueForQueryContext(e,void 0),[e]),{setValueForQueryContext:l}=Object(c.useDispatch)(o.QUERY_STATE_STORE_KEY);return[n,Object(r.useCallback)(t=>{l(e,t)},[e,l])]},d=(e,t,n)=>{const l=Object(u.a)();n=n||l;const a=Object(c.useSelect)(c=>c(o.QUERY_STATE_STORE_KEY).getValueForQueryKey(n,e,t),[n,e]),{setQueryValue:s}=Object(c.useDispatch)(o.QUERY_STATE_STORE_KEY);return[a,Object(r.useCallback)(t=>{s(n,e,t)},[n,e,s])]},p=(e,t)=>{const n=Object(u.a)();t=t||n;const[o,c]=b(t),l=Object(s.a)(o),d=Object(s.a)(e),p=Object(i.a)(d),g=Object(r.useRef)(!1);return Object(r.useEffect)(()=>{a()(p,d)||(c(Object.assign({},l,d)),g.current=!0)},[l,d,p,c]),g.current?[o,c]:[e,c]}},79:function(e,t){e.exports=window.wp.dom},8:function(e,t){e.exports=window.wp.blocks},83:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));const o=e=>"boolean"==typeof e},9:function(e,t){e.exports=window.wc.wcBlocksData}});