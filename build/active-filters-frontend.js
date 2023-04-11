!function(e){var t={};function r(n){if(t[n])return t[n].exports;var c=t[n]={i:n,l:!1,exports:{}};return e[n].call(c.exports,c,c.exports,r),c.l=!0,c.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)r.d(n,c,function(t){return e[t]}.bind(null,c));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=230)}({0:function(e,t){e.exports=window.wp.element},1:function(e,t){e.exports=window.wp.i18n},108:function(e,t,r){"use strict";r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return o}));var n=r(4);const c=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";const o=e.filter(e=>e.attribute===r.taxonomy),s=o.length?o[0]:null;if(!(s&&s.slug&&Array.isArray(s.slug)&&s.slug.includes(c)))return;const l=s.slug.filter(e=>e!==c),a=e.filter(e=>e.attribute!==r.taxonomy);l.length>0&&(s.slug=l.sort(),a.push(s)),t(Object(n.sortBy)(a,"attribute"))},o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"in";if(!r||!r.taxonomy)return[];const s=e.filter(e=>e.attribute!==r.taxonomy);return 0===c.length?t(s):(s.push({attribute:r.taxonomy,operator:o,slug:c.map(e=>{let{slug:t}=e;return t}).sort()}),t(Object(n.sortBy)(s,"attribute"))),s}},117:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return s}));var n=r(2);r(137),r(6);const c=Object(n.getSetting)("attributes",[]).reduce((e,t)=>{const r=(n=t)&&n.attribute_name?{id:parseInt(n.attribute_id,10),name:n.attribute_name,taxonomy:"pa_"+n.attribute_name,label:n.attribute_label}:null;var n;return r&&r.id&&e.push(r),e},[]),o=e=>{if(e)return c.find(t=>t.id===e)},s=e=>{if(e)return c.find(t=>t.taxonomy===e)}},12:function(e,t){e.exports=window.wp.primitives},13:function(e,t){function r(){return e.exports=r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},e.exports.__esModule=!0,e.exports.default=e.exports,r.apply(this,arguments)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},136:function(e){e.exports=JSON.parse('{"name":"woocommerce/active-filters","version":"1.0.0","title":"Active Filters Controls","description":"Display the currently active filters.","category":"woocommerce","keywords":["WooCommerce"],"supports":{"html":false,"multiple":false,"inserter":false,"color":{"text":true,"background":false},"lock":false},"attributes":{"displayStyle":{"type":"string","default":"list"},"headingLevel":{"type":"number","default":3}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}')},137:function(e,t,r){"use strict";r.d(t,"b",(function(){return c})),r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return l}));var n=r(20);const c=e=>Object(n.b)(e,"count")&&Object(n.b)(e,"description")&&Object(n.b)(e,"id")&&Object(n.b)(e,"name")&&Object(n.b)(e,"parent")&&Object(n.b)(e,"slug")&&"number"==typeof e.count&&"string"==typeof e.description&&"number"==typeof e.id&&"string"==typeof e.name&&"number"==typeof e.parent&&"string"==typeof e.slug,o=e=>Array.isArray(e)&&e.every(c),s=e=>Object(n.b)(e,"attribute")&&Object(n.b)(e,"operator")&&Object(n.b)(e,"slug")&&"string"==typeof e.attribute&&"string"==typeof e.operator&&Array.isArray(e.slug)&&e.slug.every(e=>"string"==typeof e),l=e=>Array.isArray(e)&&e.every(s)},14:function(e,t){e.exports=window.wp.isShallowEqual},15:function(e,t){e.exports=window.wp.url},152:function(e,t,r){"use strict";var n=r(0),c=r(1),o=r(31),s=r(2),l=r(5),a=r.n(l),i=r(21),u=r(71),b=r(20),p=r(137),d=r(66),f=r(59);r(215);var m=r(117),g=r(40),O=r(52),j=r(22),y=r(108),_=e=>{let{attributeObject:t,slugs:r=[],operator:l="in",displayStyle:a,isLoadingCallback:i}=e;const{results:b,isLoading:d}=Object(O.a)({namespace:"/wc/store/v1",resourceName:"products/attributes/terms",resourceValues:[t.id]}),[f,m]=Object(o.b)("attributes",[]);if(Object(n.useEffect)(()=>{i(d)},[d,i]),!Array.isArray(b)||!Object(p.c)(b)||!Object(p.a)(f))return null;const _=t.label,w=Object(s.getSettingWithCoercion)("is_rendering_php_template",!1,u.a);return Object(n.createElement)("li",null,Object(n.createElement)("span",{className:"wc-block-active-filters__list-item-type"},_,":"),Object(n.createElement)("ul",null,r.map((e,r)=>{const o=b.find(t=>t.slug===e);if(!o)return null;let s="";return r>0&&"and"===l&&(s=Object(n.createElement)("span",{className:"wc-block-active-filters__list-item-operator"},Object(c.__)("All","woo-gutenberg-products-block"))),Object(g.f)({type:_,name:Object(j.decodeEntities)(o.name||e),prefix:s,isLoading:d,removeCallback:()=>{const r=f.find(e=>{let{attribute:r}=e;return r==="pa_"+t.name});1===(null==r?void 0:r.slug.length)?Object(g.e)("query_type_"+t.name,"filter_"+t.name):Object(g.e)({["filter_"+t.name]:e}),w||Object(y.a)(f,m,t,e)},showLabel:!1,displayStyle:a})})))},w=e=>{let{displayStyle:t,isLoading:r}=e;return r?Object(n.createElement)(n.Fragment,null,[...Array("list"===t?2:3)].map((e,r)=>Object(n.createElement)("li",{className:"list"===t?"show-loading-state-list":"show-loading-state-chips",key:r},Object(n.createElement)("span",{className:"show-loading-state__inner"})))):null},h=r(43);t.a=e=>{let{attributes:t,isEditor:r=!1}=e;const l=Object(h.b)(),O=function(){const e=Object(n.useRef)(!1);return Object(n.useEffect)(()=>(e.current=!0,()=>{e.current=!1}),[]),Object(n.useCallback)(()=>e.current,[])}()(),j=Object(s.getSettingWithCoercion)("is_rendering_php_template",!1,u.a),[y,v]=Object(n.useState)(!0),E=Object(g.c)()&&!r&&y,[k,S]=Object(o.b)("attributes",[]),[x,A]=Object(o.b)("stock_status",[]),[P,N]=Object(o.b)("min_price"),[C,R]=Object(o.b)("max_price"),[T,L]=Object(o.b)("rating"),B=Object(s.getSetting)("stockStatusOptions",[]),M=Object(s.getSetting)("attributes",[]),F=Object(n.useMemo)(()=>{if(E||0===x.length||(e=x,!Array.isArray(e)||!e.every(e=>["instock","outofstock","onbackorder"].includes(e)))||!(e=>Object(b.a)(e)&&Object.keys(e).every(e=>["instock","outofstock","onbackorder"].includes(e)))(B))return null;var e;const r=Object(c.__)("Stock Status","woo-gutenberg-products-block");return Object(n.createElement)("li",null,Object(n.createElement)("span",{className:"wc-block-active-filters__list-item-type"},r,":"),Object(n.createElement)("ul",null,x.map(e=>Object(g.f)({type:r,name:B[e],removeCallback:()=>{if(Object(g.e)({filter_stock_status:e}),!j){const t=x.filter(t=>t!==e);A(t)}},showLabel:!1,displayStyle:t.displayStyle}))))},[E,B,x,A,t.displayStyle,j]),Q=Object(n.useMemo)(()=>E||!Number.isFinite(P)&&!Number.isFinite(C)?null:Object(g.f)({type:Object(c.__)("Price","woo-gutenberg-products-block"),name:Object(g.b)(P,C),removeCallback:()=>{Object(g.e)("max_price","min_price"),j||(N(void 0),R(void 0))},displayStyle:t.displayStyle}),[E,P,C,t.displayStyle,N,R,j]),G=Object(n.useMemo)(()=>!Object(p.a)(k)&&O||!k.length&&!Object(g.g)(M)?(y&&v(!1),null):k.map(e=>{const r=Object(m.b)(e.attribute);return r?Object(n.createElement)(_,{attributeObject:r,displayStyle:t.displayStyle,slugs:e.slug,key:e.attribute,operator:e.operator,isLoadingCallback:v}):(y&&v(!1),null)}),[k,O,M,y,t.displayStyle]);Object(n.useEffect)(()=>{var e;if(!j)return;if(T.length&&T.length>0)return;const t=null===(e=Object(d.d)("rating_filter"))||void 0===e?void 0:e.toString();t&&L(t.split(","))},[j,T,L]);const U=Object(n.useMemo)(()=>{if(E||0===T.length||(e=T,!Array.isArray(e)||!e.every(e=>["1","2","3","4","5"].includes(e))))return null;var e;const r=Object(c.__)("Rating","woo-gutenberg-products-block");return Object(n.createElement)("li",null,Object(n.createElement)("span",{className:"wc-block-active-filters__list-item-type"},r,":"),Object(n.createElement)("ul",null,T.map(e=>Object(g.f)({type:r,name:Object(c.sprintf)(
/* translators: %s is referring to the average rating value */
Object(c.__)("Rated %s out of 5","woo-gutenberg-products-block"),e),removeCallback:()=>{if(Object(g.e)({rating_filter:e}),!j){const t=T.filter(t=>t!==e);L(t)}},showLabel:!1,displayStyle:t.displayStyle}))))},[E,T,L,t.displayStyle,j]);if(!E&&!(k.length>0||x.length>0||T.length>0||Number.isFinite(P)||Number.isFinite(C))&&!r)return l(!1),null;const Y="h"+t.headingLevel,q=Object(n.createElement)(Y,{className:"wc-block-active-filters__title"},t.heading),V=E?Object(n.createElement)(f.a,null,q):q;if(!Object(s.getSettingWithCoercion)("has_filterable_products",!1,u.a))return l(!1),null;l(!0);const D=a()("wc-block-active-filters__list",{"wc-block-active-filters__list--chips":"chips"===t.displayStyle,"wc-block-active-filters--loading":E});return Object(n.createElement)(n.Fragment,null,!r&&t.heading&&V,Object(n.createElement)("div",{className:"wc-block-active-filters"},Object(n.createElement)("ul",{className:D},r?Object(n.createElement)(n.Fragment,null,Object(g.f)({type:Object(c.__)("Size","woo-gutenberg-products-block"),name:Object(c.__)("Small","woo-gutenberg-products-block"),displayStyle:t.displayStyle}),Object(g.f)({type:Object(c.__)("Color","woo-gutenberg-products-block"),name:Object(c.__)("Blue","woo-gutenberg-products-block"),displayStyle:t.displayStyle})):Object(n.createElement)(n.Fragment,null,Object(n.createElement)(w,{isLoading:E,displayStyle:t.displayStyle}),Q,F,G,U)),E?Object(n.createElement)("span",{className:"wc-block-active-filters__clear-all-placeholder"}):Object(n.createElement)("button",{className:"wc-block-active-filters__clear-all",onClick:()=>{Object(g.a)(),j||(N(void 0),R(void 0),S([]),A([]),L([]))}},Object(n.createElement)(i.a,{label:Object(c.__)("Clear All","woo-gutenberg-products-block"),screenReaderLabel:Object(c.__)("Clear All Filters","woo-gutenberg-products-block")}))))}},16:function(e,t,r){"use strict";var n=r(18),c=r.n(n),o=r(0),s=r(1),l=r(56),a=e=>{let{imageUrl:t=l.m+"/block-error.svg",header:r=Object(s.__)("Oops!","woo-gutenberg-products-block"),text:n=Object(s.__)("There was an error loading the content.","woo-gutenberg-products-block"),errorMessage:c,errorMessagePrefix:a=Object(s.__)("Error:","woo-gutenberg-products-block"),button:i,showErrorBlock:u=!0}=e;return u?Object(o.createElement)("div",{className:"wc-block-error wc-block-components-error"},t&&Object(o.createElement)("img",{className:"wc-block-error__image wc-block-components-error__image",src:t,alt:""}),Object(o.createElement)("div",{className:"wc-block-error__content wc-block-components-error__content"},r&&Object(o.createElement)("p",{className:"wc-block-error__header wc-block-components-error__header"},r),n&&Object(o.createElement)("p",{className:"wc-block-error__text wc-block-components-error__text"},n),c&&Object(o.createElement)("p",{className:"wc-block-error__message wc-block-components-error__message"},a?a+" ":"",c),i&&Object(o.createElement)("p",{className:"wc-block-error__button wc-block-components-error__button"},i))):null};r(38);class i extends o.Component{constructor(){super(...arguments),c()(this,"state",{errorMessage:"",hasError:!1})}static getDerivedStateFromError(e){return void 0!==e.statusText&&void 0!==e.status?{errorMessage:Object(o.createElement)(o.Fragment,null,Object(o.createElement)("strong",null,e.status),": ",e.statusText),hasError:!0}:{errorMessage:e.message,hasError:!0}}render(){const{header:e,imageUrl:t,showErrorMessage:r=!0,showErrorBlock:n=!0,text:c,errorMessagePrefix:s,renderError:l,button:i}=this.props,{errorMessage:u,hasError:b}=this.state;return b?"function"==typeof l?l({errorMessage:u}):Object(o.createElement)(a,{showErrorBlock:n,errorMessage:r?u:null,header:e,imageUrl:t,text:c,errorMessagePrefix:s,button:i}):this.props.children}}t.a=i},18:function(e,t,r){var n=r(36);e.exports=function(e,t,r){return(t=n(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.__esModule=!0,e.exports.default=e.exports},2:function(e,t){e.exports=window.wc.wcSettings},20:function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return c}));const n=e=>!(e=>null===e)(e)&&e instanceof Object&&e.constructor===Object;function c(e,t){return n(e)&&t in e}},21:function(e,t,r){"use strict";var n=r(0),c=r(5),o=r.n(c);t.a=e=>{let t,{label:r,screenReaderLabel:c,wrapperElement:s,wrapperProps:l={}}=e;const a=null!=r,i=null!=c;return!a&&i?(t=s||"span",l={...l,className:o()(l.className,"screen-reader-text")},Object(n.createElement)(t,l,c)):(t=s||n.Fragment,a&&i&&r!==c?Object(n.createElement)(t,l,Object(n.createElement)("span",{"aria-hidden":"true"},r),Object(n.createElement)("span",{className:"screen-reader-text"},c)):Object(n.createElement)(t,l,r))}},213:function(e,t){},214:function(e,t,r){"use strict";var n=r(0),c=r(12);const o=Object(n.createElement)(c.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(n.createElement)(c.Path,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"}));t.a=o},215:function(e,t){},22:function(e,t){e.exports=window.wp.htmlEntities},224:function(e,t,r){"use strict";var n=r(13),c=r.n(n),o=r(0),s=r(5),l=r.n(s),a=r(1),i=r(81),u=r(214);r(213);var b=e=>{let{text:t,screenReaderText:r="",element:n="li",className:s="",radius:a="small",children:i=null,...u}=e;const b=n,p=l()(s,"wc-block-components-chip","wc-block-components-chip--radius-"+a),d=Boolean(r&&r!==t);return Object(o.createElement)(b,c()({className:p},u),Object(o.createElement)("span",{"aria-hidden":d,className:"wc-block-components-chip__text"},t),d&&Object(o.createElement)("span",{className:"screen-reader-text"},r),i)};t.a=e=>{let{ariaLabel:t="",className:r="",disabled:n=!1,onRemove:s=(()=>{}),removeOnAnyClick:p=!1,text:d,screenReaderText:f="",...m}=e;const g=p?"span":"button";if(!t){const e=f&&"string"==typeof f?f:d;t="string"!=typeof e?
/* translators: Remove chip. */
Object(a.__)("Remove","woo-gutenberg-products-block"):Object(a.sprintf)(
/* translators: %s text of the chip to remove. */
Object(a.__)('Remove "%s"',"woo-gutenberg-products-block"),e)}const O={"aria-label":t,disabled:n,onClick:s,onKeyDown:e=>{"Backspace"!==e.key&&"Delete"!==e.key||s()}},j=p?O:{},y=p?{"aria-hidden":!0}:O;return Object(o.createElement)(b,c()({},m,j,{className:l()(r,"is-removable"),element:p?"button":m.element,screenReaderText:f,text:d}),Object(o.createElement)(g,c()({className:"wc-block-components-chip__remove"},y),Object(o.createElement)(i.a,{className:"wc-block-components-chip__remove-icon",icon:u.a,size:16})))}},230:function(e,t,r){e.exports=r(231)},231:function(e,t,r){"use strict";r.r(t);var n=r(48),c=r(152),o=r(40);Object(n.a)({selector:".wp-block-woocommerce-active-filters",Block:c.a,getProps:e=>({attributes:Object(o.d)(e.dataset),isEditor:!1})})},24:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(0);const c=Object(n.createContext)("page"),o=()=>Object(n.useContext)(c);c.Provider},26:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));const n=e=>"string"==typeof e},27:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(0),c=r(14),o=r.n(c);function s(e){const t=Object(n.useRef)(e);return o()(e,t.current)||(t.current=e),t.current}},28:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},3:function(e,t){e.exports=window.wc.wcBlocksData},31:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return p})),r.d(t,"c",(function(){return d}));var n=r(3),c=r(6),o=r(0),s=r(14),l=r.n(s),a=r(27),i=r(53),u=r(24);const b=e=>{const t=Object(u.a)();e=e||t;const r=Object(c.useSelect)(t=>t(n.QUERY_STATE_STORE_KEY).getValueForQueryContext(e,void 0),[e]),{setValueForQueryContext:s}=Object(c.useDispatch)(n.QUERY_STATE_STORE_KEY);return[r,Object(o.useCallback)(t=>{s(e,t)},[e,s])]},p=(e,t,r)=>{const s=Object(u.a)();r=r||s;const l=Object(c.useSelect)(c=>c(n.QUERY_STATE_STORE_KEY).getValueForQueryKey(r,e,t),[r,e]),{setQueryValue:a}=Object(c.useDispatch)(n.QUERY_STATE_STORE_KEY);return[l,Object(o.useCallback)(t=>{a(r,e,t)},[r,e,a])]},d=(e,t)=>{const r=Object(u.a)();t=t||r;const[n,c]=b(t),s=Object(a.a)(n),p=Object(a.a)(e),d=Object(i.a)(p),f=Object(o.useRef)(!1);return Object(o.useEffect)(()=>{l()(d,p)||(c(Object.assign({},s,p)),f.current=!0)},[s,p,d,c]),f.current?[n,c]:[e,c]}},36:function(e,t,r){var n=r(28).default,c=r(37);e.exports=function(e){var t=c(e,"string");return"symbol"===n(t)?t:String(t)},e.exports.__esModule=!0,e.exports.default=e.exports},37:function(e,t,r){var n=r(28).default;e.exports=function(e,t){if("object"!==n(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var c=r.call(e,t||"default");if("object"!==n(c))return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)},e.exports.__esModule=!0,e.exports.default=e.exports},38:function(e,t){},4:function(e,t){e.exports=window.lodash},40:function(e,t,r){"use strict";r.d(t,"b",(function(){return f})),r.d(t,"f",(function(){return m})),r.d(t,"e",(function(){return g})),r.d(t,"a",(function(){return y})),r.d(t,"c",(function(){return _})),r.d(t,"g",(function(){return w})),r.d(t,"d",(function(){return h}));var n=r(0),c=r(1),o=r(41),s=r(224),l=r(21),a=r(15),i=r(66),u=r(81),b=r(214),p=r(26),d=r(136);const f=(e,t)=>Number.isFinite(e)&&Number.isFinite(t)?Object(c.sprintf)(
/* translators: %1$s min price, %2$s max price */
Object(c.__)("Between %1$s and %2$s","woo-gutenberg-products-block"),Object(o.formatPrice)(e),Object(o.formatPrice)(t)):Number.isFinite(e)?Object(c.sprintf)(
/* translators: %s min price */
Object(c.__)("From %s","woo-gutenberg-products-block"),Object(o.formatPrice)(e)):Object(c.sprintf)(
/* translators: %s max price */
Object(c.__)("Up to %s","woo-gutenberg-products-block"),Object(o.formatPrice)(t)),m=e=>{let{type:t,name:r,prefix:o="",removeCallback:a=(()=>null),showLabel:i=!0,displayStyle:p}=e;const d=o?Object(n.createElement)(n.Fragment,null,o," ",r):r,f=Object(c.sprintf)(
/* translators: %s attribute value used in the filter. For example: yellow, green, small, large. */
Object(c.__)("Remove %s filter","woo-gutenberg-products-block"),r);return Object(n.createElement)("li",{className:"wc-block-active-filters__list-item",key:t+":"+r},i&&Object(n.createElement)("span",{className:"wc-block-active-filters__list-item-type"},t+": "),"chips"===p?Object(n.createElement)(s.a,{element:"span",text:d,onRemove:a,radius:"large",ariaLabel:f}):Object(n.createElement)("span",{className:"wc-block-active-filters__list-item-name"},Object(n.createElement)("button",{className:"wc-block-active-filters__list-item-remove",onClick:a},Object(n.createElement)(u.a,{className:"wc-block-components-chip__remove-icon",icon:b.a,size:16}),Object(n.createElement)(l.a,{screenReaderLabel:f})),d))},g=function(){if(!window)return;const e=window.location.href,t=Object(a.getQueryArgs)(e),r=Object(a.removeQueryArgs)(e,...Object.keys(t));for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];c.forEach(e=>{if("string"==typeof e)return delete t[e];if("object"==typeof e){const r=Object.keys(e)[0],n=t[r].toString().split(",");t[r]=n.filter(t=>t!==e[r]).join(",")}});const s=Object.fromEntries(Object.entries(t).filter(e=>{let[,t]=e;return t})),l=Object(a.addQueryArgs)(r,s);Object(i.c)(l)},O=["min_price","max_price","rating_filter","filter_","query_type_"],j=e=>{let t=!1;for(let r=0;O.length>r;r++){const n=O[r];if(n===e.substring(0,n.length)){t=!0;break}}return t},y=()=>{if(!window)return;const e=window.location.href,t=Object(a.getQueryArgs)(e),r=Object(a.removeQueryArgs)(e,...Object.keys(t)),n=Object.fromEntries(Object.keys(t).filter(e=>!j(e)).map(e=>[e,t[e]])),c=Object(a.addQueryArgs)(r,n);Object(i.c)(c)},_=()=>{if(!window)return!1;const e=window.location.href,t=Object(a.getQueryArgs)(e),r=Object.keys(t);let n=!1;for(let e=0;r.length>e;e++){const t=r[e];if(j(t)){n=!0;break}}return n},w=e=>{if(!window)return!1;const t=e.map(e=>"filter_"+e.attribute_name),r=window.location.href,n=Object(a.getQueryArgs)(r),c=Object.keys(n);let o=!1;for(let e=0;c.length>e;e++){const r=c[e];if(t.includes(r)){o=!0;break}}return o},h=e=>({heading:Object(p.a)(null==e?void 0:e.heading)?e.heading:"",headingLevel:Object(p.a)(null==e?void 0:e.headingLevel)&&parseInt(e.headingLevel,10)||d.attributes.headingLevel.default,displayStyle:Object(p.a)(null==e?void 0:e.displayStyle)&&e.displayStyle||d.attributes.displayStyle.default})},41:function(e,t){e.exports=window.wc.priceFormat},43:function(e,t,r){"use strict";r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return o}));var n=r(0);const c=Object(n.createContext)({}),o=()=>{const{wrapper:e}=Object(n.useContext)(c);return t=>{e&&e.current&&(e.current.hidden=!t)}}},48:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(13),c=r.n(n),o=r(0),s=r(16);const l=[".wp-block-woocommerce-cart"],a=e=>{let{Block:t,containers:r,getProps:n=(()=>({})),getErrorBoundaryProps:l=(()=>({}))}=e;0!==r.length&&Array.prototype.forEach.call(r,(e,r)=>{const a=n(e,r),i=l(e,r),u={...e.dataset,...a.attributes||{}};(e=>{let{Block:t,container:r,attributes:n={},props:l={},errorBoundaryProps:a={}}=e;Object(o.render)(Object(o.createElement)(s.a,a,Object(o.createElement)(o.Suspense,{fallback:Object(o.createElement)("div",{className:"wc-block-placeholder"})},t&&Object(o.createElement)(t,c()({},l,{attributes:n})))),r,()=>{r.classList&&r.classList.remove("is-loading")})})({Block:t,container:e,props:a,attributes:u,errorBoundaryProps:i})})},i=e=>{const t=document.body.querySelectorAll(l.join(",")),{Block:r,getProps:n,getErrorBoundaryProps:c,selector:o}=e;(e=>{let{Block:t,getProps:r,getErrorBoundaryProps:n,selector:c,wrappers:o}=e;const s=document.body.querySelectorAll(c);o&&o.length>0&&Array.prototype.filter.call(s,e=>!((e,t)=>Array.prototype.some.call(t,t=>t.contains(e)&&!t.isSameNode(e)))(e,o)),a({Block:t,containers:s,getProps:r,getErrorBoundaryProps:n})})({Block:r,getProps:n,getErrorBoundaryProps:c,selector:o,wrappers:t}),Array.prototype.forEach.call(t,t=>{t.addEventListener("wc-blocks_render_blocks_frontend",()=>{(e=>{let{Block:t,getProps:r,getErrorBoundaryProps:n,selector:c,wrapper:o}=e;const s=o.querySelectorAll(c);a({Block:t,containers:s,getProps:r,getErrorBoundaryProps:n})})({...e,wrapper:t})})})}},5:function(e,t,r){var n;!function(){"use strict";var r={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var s=c.apply(null,n);s&&e.push(s)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var l in n)r.call(n,l)&&n[l]&&e.push(l);else e.push(n.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):void 0===(n=function(){return c}.apply(t,[]))||(e.exports=n)}()},52:function(e,t,r){"use strict";r.d(t,"a",(function(){return l}));var n=r(3),c=r(6),o=r(0),s=r(27);const l=e=>{const{namespace:t,resourceName:r,resourceValues:l=[],query:a={},shouldSelect:i=!0}=e;if(!t||!r)throw new Error("The options object must have valid values for the namespace and the resource properties.");const u=Object(o.useRef)({results:[],isLoading:!0}),b=Object(s.a)(a),p=Object(s.a)(l),d=(()=>{const[,e]=Object(o.useState)();return Object(o.useCallback)(t=>{e(()=>{throw t})},[])})(),f=Object(c.useSelect)(e=>{if(!i)return null;const c=e(n.COLLECTIONS_STORE_KEY),o=[t,r,b,p],s=c.getCollectionError(...o);if(s){if(!(s instanceof Error))throw new Error("TypeError: `error` object is not an instance of Error constructor");d(s)}return{results:c.getCollection(...o),isLoading:!c.hasFinishedResolution("getCollection",o)}},[t,r,p,b,i]);return null!==f&&(u.current=f),u.current}},53:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(0);function c(e,t){const r=Object(n.useRef)();return Object(n.useEffect)(()=>{r.current===e||t&&!t(e,r.current)||(r.current=e)},[e,t]),r.current}},56:function(e,t,r){"use strict";r.d(t,"o",(function(){return o})),r.d(t,"m",(function(){return s})),r.d(t,"l",(function(){return l})),r.d(t,"n",(function(){return a})),r.d(t,"j",(function(){return i})),r.d(t,"d",(function(){return u})),r.d(t,"g",(function(){return b})),r.d(t,"k",(function(){return p})),r.d(t,"c",(function(){return d})),r.d(t,"f",(function(){return f})),r.d(t,"h",(function(){return m})),r.d(t,"a",(function(){return g})),r.d(t,"i",(function(){return O})),r.d(t,"b",(function(){return j})),r.d(t,"e",(function(){return y}));var n,c=r(2);const o=Object(c.getSetting)("wcBlocksConfig",{buildPhase:1,pluginUrl:"",productCount:0,defaultAvatar:"",restApiRoutes:{},wordCountType:"words"}),s=o.pluginUrl+"images/",l=o.pluginUrl+"build/",a=o.buildPhase,i=null===(n=c.STORE_PAGES.shop)||void 0===n?void 0:n.permalink,u=(c.STORE_PAGES.checkout.id,c.STORE_PAGES.checkout.permalink),b=c.STORE_PAGES.privacy.permalink,p=(c.STORE_PAGES.privacy.title,c.STORE_PAGES.terms.permalink),d=(c.STORE_PAGES.terms.title,c.STORE_PAGES.cart.id,c.STORE_PAGES.cart.permalink),f=c.STORE_PAGES.myaccount.permalink?c.STORE_PAGES.myaccount.permalink:Object(c.getSetting)("wpLoginUrl","/wp-login.php"),m=Object(c.getSetting)("shippingCountries",{}),g=Object(c.getSetting)("allowedCountries",{}),O=Object(c.getSetting)("shippingStates",{}),j=Object(c.getSetting)("allowedStates",{}),y=Object(c.getSetting)("localPickupEnabled",!1)},59:function(e,t,r){"use strict";var n=r(0);r(86),t.a=e=>{let{children:t}=e;return Object(n.createElement)("div",{className:"wc-block-filter-title-placeholder"},t)}},6:function(e,t){e.exports=window.wp.data},66:function(e,t,r){"use strict";r.d(t,"b",(function(){return l})),r.d(t,"a",(function(){return a})),r.d(t,"d",(function(){return i})),r.d(t,"c",(function(){return u})),r.d(t,"e",(function(){return b}));var n=r(15),c=r(2),o=r(71);const s=Object(c.getSettingWithCoercion)("is_rendering_php_template",!1,o.a),l="query_type_",a="filter_";function i(e){return window?Object(n.getQueryArg)(window.location.href,e):null}function u(e){s?window.location.href=e:window.history.replaceState({},"",e)}const b=e=>{const t=Object(n.getQueryArgs)(e);return Object(n.addQueryArgs)(e,t)}},71:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));const n=e=>"boolean"==typeof e},81:function(e,t,r){"use strict";var n=r(0);t.a=function(e){let{icon:t,size:r=24,...c}=e;return Object(n.cloneElement)(t,{width:r,height:r,...c})}},86:function(e,t){}});