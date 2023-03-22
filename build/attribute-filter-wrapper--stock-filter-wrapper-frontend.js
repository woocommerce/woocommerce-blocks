(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[6],{100:function(e,t){},101:function(e,t){},102:function(e,t){},114:function(e,t,c){"use strict";c.d(t,"a",(function(){return r})),c(53);var n=c(34);const r=()=>n.n>1},115:function(e,t,c){"use strict";c.d(t,"a",(function(){return o}));var n=c(24),r=c(22);const o=e=>Object(n.a)(e)?JSON.parse(e)||{}:Object(r.a)(e)?e:{}},116:function(e,t){},119:function(e,t){},138:function(e,t,c){"use strict";c.d(t,"a",(function(){return b}));var n=c(0),r=c(97),o=c(5),s=c(30),a=c(22),u=c(32),l=c(62),i=c(26);const b=e=>{let{queryAttribute:t,queryPrices:c,queryStock:b,queryRating:d,queryState:O,productIds:j,isEditor:m=!1}=e,f=Object(i.a)();f+="-collection-data";const[p]=Object(u.a)(f),[_,g]=Object(u.b)("calculate_attribute_counts",[],f),[E,w]=Object(u.b)("calculate_price_range",null,f),[y,h]=Object(u.b)("calculate_stock_status_counts",null,f),[k,v]=Object(u.b)("calculate_rating_counts",null,f),S=Object(s.a)(t||{}),x=Object(s.a)(c),C=Object(s.a)(b),R=Object(s.a)(d);Object(n.useEffect)(()=>{"object"==typeof S&&Object.keys(S).length&&(_.find(e=>Object(a.b)(S,"taxonomy")&&e.taxonomy===S.taxonomy)||g([..._,S]))},[S,_,g]),Object(n.useEffect)(()=>{E!==x&&void 0!==x&&w(x)},[x,w,E]),Object(n.useEffect)(()=>{y!==C&&void 0!==C&&h(C)},[C,h,y]),Object(n.useEffect)(()=>{k!==R&&void 0!==R&&v(R)},[R,v,k]);const[N,T]=Object(n.useState)(m),[L]=Object(r.a)(N,200);N||T(!0);const q=Object(n.useMemo)(()=>(e=>{const t=e;return Array.isArray(e.calculate_attribute_counts)&&(t.calculate_attribute_counts=Object(o.sortBy)(e.calculate_attribute_counts.map(e=>{let{taxonomy:t,queryType:c}=e;return{taxonomy:t,query_type:c}}),["taxonomy","query_type"])),t})(p),[p]);return Object(l.a)({namespace:"/wc/store/v1",resourceName:"products/collection-data",query:{...O,page:void 0,per_page:void 0,orderby:void 0,order:void 0,...!Object(o.isEmpty)(j)&&{include:j},...q},shouldSelect:L})}},140:function(e,t){},152:function(e,t,c){"use strict";c.d(t,"a",(function(){return a}));var n=c(65),r=c(114),o=c(22),s=c(115);const a=e=>{if(!Object(r.a)())return{className:"",style:{}};const t=Object(o.a)(e)?e:{},c=Object(s.a)(t.style);return Object(n.__experimentalUseBorderProps)({...t,style:c})}},22:function(e,t,c){"use strict";c.d(t,"a",(function(){return n})),c.d(t,"b",(function(){return r}));const n=e=>!(e=>null===e)(e)&&e instanceof Object&&e.constructor===Object;function r(e,t){return n(e)&&t in e}},23:function(e,t,c){"use strict";var n=c(0),r=c(6),o=c.n(r);t.a=e=>{let t,{label:c,screenReaderLabel:r,wrapperElement:s,wrapperProps:a={}}=e;const u=null!=c,l=null!=r;return!u&&l?(t=s||"span",a={...a,className:o()(a.className,"screen-reader-text")},Object(n.createElement)(t,a,r)):(t=s||n.Fragment,u&&l&&c!==r?Object(n.createElement)(t,a,Object(n.createElement)("span",{"aria-hidden":"true"},c),Object(n.createElement)("span",{className:"screen-reader-text"},r)):Object(n.createElement)(t,a,c))}},24:function(e,t,c){"use strict";c.d(t,"a",(function(){return n}));const n=e=>"string"==typeof e},26:function(e,t,c){"use strict";c.d(t,"a",(function(){return o}));var n=c(0);const r=Object(n.createContext)("page"),o=()=>Object(n.useContext)(r);r.Provider},30:function(e,t,c){"use strict";c.d(t,"a",(function(){return s}));var n=c(0),r=c(14),o=c.n(r);function s(e){const t=Object(n.useRef)(e);return o()(e,t.current)||(t.current=e),t.current}},32:function(e,t,c){"use strict";c.d(t,"a",(function(){return b})),c.d(t,"b",(function(){return d})),c.d(t,"c",(function(){return O}));var n=c(3),r=c(7),o=c(0),s=c(14),a=c.n(s),u=c(30),l=c(63),i=c(26);const b=e=>{const t=Object(i.a)();e=e||t;const c=Object(r.useSelect)(t=>t(n.QUERY_STATE_STORE_KEY).getValueForQueryContext(e,void 0),[e]),{setValueForQueryContext:s}=Object(r.useDispatch)(n.QUERY_STATE_STORE_KEY);return[c,Object(o.useCallback)(t=>{s(e,t)},[e,s])]},d=(e,t,c)=>{const s=Object(i.a)();c=c||s;const a=Object(r.useSelect)(r=>r(n.QUERY_STATE_STORE_KEY).getValueForQueryKey(c,e,t),[c,e]),{setQueryValue:u}=Object(r.useDispatch)(n.QUERY_STATE_STORE_KEY);return[a,Object(o.useCallback)(t=>{u(c,e,t)},[c,e,u])]},O=(e,t)=>{const c=Object(i.a)();t=t||c;const[n,r]=b(t),s=Object(u.a)(n),d=Object(u.a)(e),O=Object(l.a)(d),j=Object(o.useRef)(!1);return Object(o.useEffect)(()=>{a()(O,d)||(r(Object.assign({},s,d)),j.current=!0)},[s,d,O,r]),j.current?[n,r]:[e,r]}},62:function(e,t,c){"use strict";c.d(t,"a",(function(){return a}));var n=c(3),r=c(7),o=c(0),s=c(30);const a=e=>{const{namespace:t,resourceName:c,resourceValues:a=[],query:u={},shouldSelect:l=!0}=e;if(!t||!c)throw new Error("The options object must have valid values for the namespace and the resource properties.");const i=Object(o.useRef)({results:[],isLoading:!0}),b=Object(s.a)(u),d=Object(s.a)(a),O=(()=>{const[,e]=Object(o.useState)();return Object(o.useCallback)(t=>{e(()=>{throw t})},[])})(),j=Object(r.useSelect)(e=>{if(!l)return null;const r=e(n.COLLECTIONS_STORE_KEY),o=[t,c,b,d],s=r.getCollectionError(...o);if(s){if(!(s instanceof Error))throw new Error("TypeError: `error` object is not an instance of Error constructor");O(s)}return{results:r.getCollection(...o),isLoading:!r.hasFinishedResolution("getCollection",o)}},[t,c,d,b,l]);return null!==j&&(i.current=j),i.current}},63:function(e,t,c){"use strict";c.d(t,"a",(function(){return r}));var n=c(0);function r(e,t){const c=Object(n.useRef)();return Object(n.useEffect)(()=>{c.current===e||t&&!t(e,c.current)||(c.current=e)},[e,t]),c.current}},64:function(e,t,c){"use strict";var n=c(0),r=c(1),o=c(23);c(140),t.a=e=>{let{name:t,count:c}=e;return Object(n.createElement)(n.Fragment,null,t,null!==c&&Number.isFinite(c)&&Object(n.createElement)(o.a,{label:c.toString(),screenReaderLabel:Object(r.sprintf)(
/* translators: %s number of products. */
Object(r._n)("%s product","%s products",c,"woo-gutenberg-products-block"),c),wrapperElement:"span",wrapperProps:{className:"wc-filter-element-label-list-count"}}))}},68:function(e,t,c){"use strict";var n=c(0);c(100),t.a=e=>{let{children:t}=e;return Object(n.createElement)("div",{className:"wc-block-filter-title-placeholder"},t)}},69:function(e,t,c){"use strict";var n=c(0),r=c(1),o=c(6),s=c.n(o),a=c(23);c(101),t.a=e=>{let{className:t,label:
/* translators: Reset button text for filters. */
c=Object(r.__)("Reset","woo-gutenberg-products-block"),onClick:o,screenReaderLabel:u=Object(r.__)("Reset filter","woo-gutenberg-products-block")}=e;return Object(n.createElement)("button",{className:s()("wc-block-components-filter-reset-button",t),onClick:o},Object(n.createElement)(a.a,{label:c,screenReaderLabel:u}))}},70:function(e,t,c){"use strict";var n=c(0),r=c(1),o=c(6),s=c.n(o),a=c(23);c(102),t.a=e=>{let{className:t,isLoading:c,disabled:o,label:
/* translators: Submit button text for filters. */
u=Object(r.__)("Apply","woo-gutenberg-products-block"),onClick:l,screenReaderLabel:i=Object(r.__)("Apply filter","woo-gutenberg-products-block")}=e;return Object(n.createElement)("button",{type:"submit",className:s()("wp-block-button__link","wc-block-filter-submit-button","wc-block-components-filter-submit-button",{"is-loading":c},t),disabled:o,onClick:l},Object(n.createElement)(a.a,{label:u,screenReaderLabel:i}))}},72:function(e,t,c){"use strict";c.d(t,"b",(function(){return a})),c.d(t,"a",(function(){return u})),c.d(t,"d",(function(){return l})),c.d(t,"c",(function(){return i}));var n=c(15),r=c(2),o=c(74);const s=Object(r.getSettingWithCoercion)("is_rendering_php_template",!1,o.a),a="query_type_",u="filter_";function l(e){return window?Object(n.getQueryArg)(window.location.href,e):null}function i(e){s?window.location.href=e:window.history.replaceState({},"",e)}},74:function(e,t,c){"use strict";c.d(t,"a",(function(){return n}));const n=e=>"boolean"==typeof e},92:function(e,t,c){"use strict";var n=c(13),r=c.n(n),o=c(0),s=c(128),a=c(6),u=c.n(a);c(116),t.a=e=>{let{className:t,style:c,suggestions:n,multiple:a=!0,saveTransform:l=(e=>e.trim().replace(/\s/g,"-")),messages:i={},validateInput:b=(e=>n.includes(e)),label:d="",...O}=e;return Object(o.createElement)("div",{className:u()("wc-blocks-components-form-token-field-wrapper",t,{"single-selection":!a}),style:c},Object(o.createElement)(s.a,r()({label:d,__experimentalExpandOnFocus:!0,__experimentalShowHowTo:!1,__experimentalValidateInput:b,saveTransform:l,maxLength:a?void 0:1,suggestions:n,messages:i},O)))}},93:function(e,t,c){"use strict";var n=c(0),r=c(1),o=c(6),s=c.n(o),a=c(11);c(119),t.a=e=>{let{className:t,onChange:c,options:o=[],checked:u=[],isLoading:l=!1,isDisabled:i=!1,limit:b=10}=e;const[d,O]=Object(n.useState)(!1),j=Object(n.useMemo)(()=>[...Array(5)].map((e,t)=>Object(n.createElement)("li",{key:t,style:{width:Math.floor(75*Math.random())+25+"%"}})),[]),m=Object(n.useMemo)(()=>{const e=o.length-b;return!d&&Object(n.createElement)("li",{key:"show-more",className:"show-more"},Object(n.createElement)("button",{onClick:()=>{O(!0)},"aria-expanded":!1,"aria-label":Object(r.sprintf)(
/* translators: %s is referring the remaining count of options */
Object(r._n)("Show %s more option","Show %s more options",e,"woo-gutenberg-products-block"),e)},Object(r.sprintf)(
/* translators: %s number of options to reveal. */
Object(r._n)("Show %s more","Show %s more",e,"woo-gutenberg-products-block"),e)))},[o,b,d]),f=Object(n.useMemo)(()=>d&&Object(n.createElement)("li",{key:"show-less",className:"show-less"},Object(n.createElement)("button",{onClick:()=>{O(!1)},"aria-expanded":!0,"aria-label":Object(r.__)("Show less options","woo-gutenberg-products-block")},Object(r.__)("Show less","woo-gutenberg-products-block"))),[d]),p=Object(n.useMemo)(()=>{const e=o.length>b+5;return Object(n.createElement)(n.Fragment,null,o.map((t,r)=>Object(n.createElement)(n.Fragment,{key:t.value},Object(n.createElement)("li",e&&!d&&r>=b&&{hidden:!0},Object(n.createElement)(a.CheckboxControl,{id:t.value,className:"wc-block-checkbox-list__checkbox",label:t.label,checked:u.includes(t.value),onChange:()=>{c(t.value)},disabled:i})),e&&r===b-1&&m)),e&&f)},[o,c,u,d,b,f,m,i]),_=s()("wc-block-checkbox-list","wc-block-components-checkbox-list",{"is-loading":l},t);return Object(n.createElement)("ul",{className:_},l?j:p)}}}]);