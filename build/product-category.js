this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["product-category"]=function(e){function t(t){for(var r,l,a=t[0],i=t[1],s=t[2],b=0,d=[];b<a.length;b++)l=a[b],Object.prototype.hasOwnProperty.call(n,l)&&n[l]&&d.push(n[l][0]),n[l]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(u&&u(t);d.length;)d.shift()();return o.push.apply(o,s||[]),c()}function c(){for(var e,t=0;t<o.length;t++){for(var c=o[t],r=!0,a=1;a<c.length;a++){var i=c[a];0!==n[i]&&(r=!1)}r&&(o.splice(t--,1),e=l(l.s=c[0]))}return e}var r={},n={25:0},o=[];function l(t){if(r[t])return r[t].exports;var c=r[t]={i:t,l:!1,exports:{}};return e[t].call(c.exports,c,c.exports,l),c.l=!0,c.exports}l.m=e,l.c=r,l.d=function(e,t,c){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:c})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(l.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(c,r,function(t){return e[t]}.bind(null,r));return c},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var a=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],i=a.push.bind(a);a.push=t,a=a.slice();for(var s=0;s<a.length;s++)t(a[s]);var u=i;return o.push([484,0]),c()}({0:function(e,t){e.exports=window.wp.element},1:function(e,t){e.exports=window.wp.i18n},10:function(e,t){e.exports=window.wp.primitives},100:function(e,t){},101:function(e,t,c){"use strict";c.d(t,"a",(function(){return y}));var r=c(6),n=c.n(r),o=c(0),l=c(1),a=c(2),i=c(72),s=c(569),u=c(4),b=c.n(u),d=c(11),g=c(17),m=c(38),p=c(568),h=c(14);const E=e=>{let{id:t,label:c,popoverContents:r,remove:n,screenReaderLabel:s,className:u=""}=e;const[g,m]=Object(o.useState)(!1),O=Object(d.useInstanceId)(E);if(s=s||c,!c)return null;c=Object(h.decodeEntities)(c);const j=b()("woocommerce-tag",u,{"has-remove":!!n}),w="woocommerce-tag__label-"+O,f=Object(o.createElement)(o.Fragment,null,Object(o.createElement)("span",{className:"screen-reader-text"},s),Object(o.createElement)("span",{"aria-hidden":"true"},c));return Object(o.createElement)("span",{className:j},r?Object(o.createElement)(a.Button,{className:"woocommerce-tag__text",id:w,onClick:()=>m(!0)},f):Object(o.createElement)("span",{className:"woocommerce-tag__text",id:w},f),r&&g&&Object(o.createElement)(a.Popover,{onClose:()=>m(!1)},r),n&&Object(o.createElement)(a.Button,{className:"woocommerce-tag__remove",onClick:n(t),label:Object(l.sprintf)(// Translators: %s label.
Object(l.__)("Remove %s","woo-gutenberg-products-block"),c),"aria-describedby":w},Object(o.createElement)(i.a,{icon:p.a,size:20,className:"clear-icon"})))};var O=E;const j=e=>Object(o.createElement)(m.b,e),w=e=>{const{list:t,selected:c,renderItem:r,depth:l=0,onSelect:a,instanceId:i,isSingle:s,search:u,useExpandedPanelId:b}=e,[d]=b;return t?Object(o.createElement)(o.Fragment,null,t.map(t=>{var g,m;const p=null!==(g=t.children)&&void 0!==g&&g.length&&!s?t.children.every(e=>{let{id:t}=e;return c.find(e=>e.id===t)}):!!c.find(e=>{let{id:c}=e;return c===t.id}),h=(null===(m=t.children)||void 0===m?void 0:m.length)&&d===t.id;return Object(o.createElement)(o.Fragment,{key:t.id},Object(o.createElement)("li",null,r({item:t,isSelected:p,onSelect:a,isSingle:s,selected:c,search:u,depth:l,useExpandedPanelId:b,controlId:i})),h?Object(o.createElement)(w,n()({},e,{list:t.children,depth:l+1})):null)})):null},f=e=>{let{isLoading:t,isSingle:c,selected:r,messages:n,onChange:i,onRemove:s}=e;if(t||c||!r)return null;const u=r.length;return Object(o.createElement)("div",{className:"woocommerce-search-list__selected"},Object(o.createElement)("div",{className:"woocommerce-search-list__selected-header"},Object(o.createElement)("strong",null,n.selected(u)),u>0?Object(o.createElement)(a.Button,{isLink:!0,isDestructive:!0,onClick:()=>i([]),"aria-label":n.clear},Object(l.__)("Clear all","woo-gutenberg-products-block")):null),u>0?Object(o.createElement)("ul",null,r.map((e,t)=>Object(o.createElement)("li",{key:t},Object(o.createElement)(O,{label:e.name,id:e.id,remove:s})))):null)},_=e=>{let{filteredList:t,search:c,onSelect:r,instanceId:n,useExpandedPanelId:a,...u}=e;const{messages:b,renderItem:d,selected:g,isSingle:m}=u,p=d||j;return 0===t.length?Object(o.createElement)("div",{className:"woocommerce-search-list__list is-not-found"},Object(o.createElement)("span",{className:"woocommerce-search-list__not-found-icon"},Object(o.createElement)(i.a,{icon:s.a})),Object(o.createElement)("span",{className:"woocommerce-search-list__not-found-text"},c?Object(l.sprintf)(b.noResults,c):b.noItems)):Object(o.createElement)("ul",{className:"woocommerce-search-list__list"},Object(o.createElement)(w,{useExpandedPanelId:a,list:t,selected:g,renderItem:p,onSelect:r,instanceId:n,isSingle:m,search:c}))},y=e=>{const{className:t="",isCompact:c,isHierarchical:r,isLoading:i,isSingle:s,list:u,messages:m=g.a,onChange:p,onSearch:h,selected:E,type:O="text",debouncedSpeak:j}=e,[w,k]=Object(o.useState)(""),x=Object(o.useState)(-1),v=Object(d.useInstanceId)(y),S=Object(o.useMemo)(()=>({...g.a,...m}),[m]),C=Object(o.useMemo)(()=>Object(g.c)(u,w,r),[u,w,r]);Object(o.useEffect)(()=>{j&&j(S.updated)},[j,S]),Object(o.useEffect)(()=>{"function"==typeof h&&h(w)},[w,h]);const P=Object(o.useCallback)(e=>()=>{s&&p([]);const t=E.findIndex(t=>{let{id:c}=t;return c===e});p([...E.slice(0,t),...E.slice(t+1)])},[s,E,p]),N=Object(o.useCallback)(e=>()=>{Array.isArray(e)?p(e):-1===E.findIndex(t=>{let{id:c}=t;return c===e.id})?p(s?[e]:[...E,e]):P(e.id)()},[s,P,p,E]),A=Object(o.useCallback)(e=>{const[t]=E.filter(t=>!e.find(e=>t.id===e.id));P(t.id)()},[P,E]);return Object(o.createElement)("div",{className:b()("woocommerce-search-list",t,{"is-compact":c,"is-loading":i,"is-token":"token"===O})},"text"===O&&Object(o.createElement)(f,n()({},e,{onRemove:P,messages:S})),Object(o.createElement)("div",{className:"woocommerce-search-list__search"},"text"===O?Object(o.createElement)(a.TextControl,{label:S.search,type:"search",value:w,onChange:e=>k(e)}):Object(o.createElement)(a.FormTokenField,{disabled:i,label:S.search,onChange:A,onInputChange:e=>k(e),suggestions:[],__experimentalValidateInput:()=>!1,value:i?[Object(l.__)("Loading…","woo-gutenberg-products-block")]:E.map(e=>({...e,value:e.name})),__experimentalShowHowTo:!1})),i?Object(o.createElement)("div",{className:"woocommerce-search-list__list"},Object(o.createElement)(a.Spinner,null)):Object(o.createElement)(_,n()({},e,{search:w,filteredList:C,messages:S,onSelect:N,instanceId:v,useExpandedPanelId:x})))};Object(a.withSpokenMessages)(y)},109:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(2);t.a=e=>{let{value:t,setAttributes:c}=e;return Object(r.createElement)(o.SelectControl,{label:Object(n.__)("Order products by","woo-gutenberg-products-block"),value:t,options:[{label:Object(n.__)("Newness - newest first","woo-gutenberg-products-block"),value:"date"},{label:Object(n.__)("Price - low to high","woo-gutenberg-products-block"),value:"price_asc"},{label:Object(n.__)("Price - high to low","woo-gutenberg-products-block"),value:"price_desc"},{label:Object(n.__)("Rating - highest first","woo-gutenberg-products-block"),value:"rating"},{label:Object(n.__)("Sales - most first","woo-gutenberg-products-block"),value:"popularity"},{label:Object(n.__)("Title - alphabetical","woo-gutenberg-products-block"),value:"title"},{label:Object(n.__)("Menu Order","woo-gutenberg-products-block"),value:"menu_order"}],onChange:e=>c({orderby:e})})}},11:function(e,t){e.exports=window.wp.compose},14:function(e,t){e.exports=window.wp.htmlEntities},15:function(e,t){e.exports=window.wp.url},16:function(e,t){e.exports=window.wp.apiFetch},162:function(e,t,c){"use strict";c.d(t,"a",(function(){return n}));var r=c(0);const n=Object(r.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 230 250",style:{width:"100%"}},Object(r.createElement)("title",null,"Grid Block Preview"),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:".162",y:".779",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"9.216",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"1.565",y:"101.448",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:".162",y:"136.277",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"9.216",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"1.565",y:"236.946",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:"82.478",y:".779",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"91.532",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"83.882",y:"101.448",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:"82.478",y:"136.277",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"91.532",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"83.882",y:"236.946",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:"164.788",y:".779",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"173.843",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"166.192",y:"101.448",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:"164.788",y:"136.277",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"173.843",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"166.192",y:"236.946",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"13.283",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"21.498",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"29.713",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"37.927",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"46.238",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"95.599",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"103.814",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"112.029",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"120.243",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"128.554",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"177.909",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"186.124",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"194.339",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"202.553",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"210.864",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"13.283",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"21.498",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"29.713",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"37.927",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"46.238",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"95.599",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"103.814",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"112.029",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"120.243",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"128.554",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"177.909",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"186.124",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"194.339",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"202.553",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"210.864",y:"221.798",fill:"#E1E3E6",rx:"3"}))},17:function(e,t,c){"use strict";c.d(t,"a",(function(){return l})),c.d(t,"c",(function(){return i})),c.d(t,"d",(function(){return s})),c.d(t,"b",(function(){return u}));var r=c(0),n=c(1),o=c(56);const l={clear:Object(n.__)("Clear all selected items","woo-gutenberg-products-block"),noItems:Object(n.__)("No items found.","woo-gutenberg-products-block"),
/* Translators: %s search term */
noResults:Object(n.__)("No results for %s","woo-gutenberg-products-block"),search:Object(n.__)("Search for items","woo-gutenberg-products-block"),selected:e=>Object(n.sprintf)(
/* translators: Number of items selected from list. */
Object(n._n)("%d item selected","%d items selected",e,"woo-gutenberg-products-block"),e),updated:Object(n.__)("Search results updated.","woo-gutenberg-products-block")},a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;const c=e.reduce((e,t)=>{const c=t.parent||0;return e[c]||(e[c]=[]),e[c].push(t),e},{}),r=Object(o.a)(t,"id"),n=["0"],l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!e.parent)return e.name?[e.name]:[];const t=l(r[e.parent]);return[...t,e.name]},a=e=>e.map(e=>{const t=c[e.id];return n.push(""+e.id),{...e,breadcrumbs:l(r[e.parent]),children:t&&t.length?a(t):[]}}),i=a(c[0]||[]);return Object.entries(c).forEach(e=>{let[t,c]=e;n.includes(t)||i.push(...a(c||[]))}),i},i=(e,t,c)=>{if(!t)return c?a(e):e;const r=new RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"i"),n=e.map(e=>!!r.test(e.name)&&e).filter(Boolean);return c?a(n,e):n},s=(e,t)=>{if(!t)return e;const c=new RegExp(`(${t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"ig");return e.split(c).map((e,t)=>c.test(e)?Object(r.createElement)("strong",{key:t},e):Object(r.createElement)(r.Fragment,{key:t},e))},u=e=>1===e.length?e.slice(0,1).toString():2===e.length?e.slice(0,1).toString()+" › "+e.slice(-1).toString():e.slice(0,1).toString()+" … "+e.slice(-1).toString()},18:function(e,t,c){"use strict";c.d(t,"o",(function(){return o})),c.d(t,"m",(function(){return l})),c.d(t,"l",(function(){return a})),c.d(t,"n",(function(){return i})),c.d(t,"j",(function(){return s})),c.d(t,"e",(function(){return u})),c.d(t,"g",(function(){return b})),c.d(t,"k",(function(){return d})),c.d(t,"c",(function(){return g})),c.d(t,"d",(function(){return m})),c.d(t,"h",(function(){return p})),c.d(t,"a",(function(){return h})),c.d(t,"i",(function(){return E})),c.d(t,"b",(function(){return O})),c.d(t,"f",(function(){return j}));var r,n=c(3);const o=Object(n.getSetting)("wcBlocksConfig",{buildPhase:1,pluginUrl:"",productCount:0,defaultAvatar:"",restApiRoutes:{},wordCountType:"words"}),l=o.pluginUrl+"images/",a=o.pluginUrl+"build/",i=o.buildPhase,s=null===(r=n.STORE_PAGES.shop)||void 0===r?void 0:r.permalink,u=n.STORE_PAGES.checkout.id,b=(n.STORE_PAGES.checkout.permalink,n.STORE_PAGES.privacy.permalink),d=(n.STORE_PAGES.privacy.title,n.STORE_PAGES.terms.permalink),g=(n.STORE_PAGES.terms.title,n.STORE_PAGES.cart.id),m=n.STORE_PAGES.cart.permalink,p=(n.STORE_PAGES.myaccount.permalink?n.STORE_PAGES.myaccount.permalink:Object(n.getSetting)("wpLoginUrl","/wp-login.php"),Object(n.getSetting)("shippingCountries",{})),h=Object(n.getSetting)("allowedCountries",{}),E=Object(n.getSetting)("shippingStates",{}),O=Object(n.getSetting)("allowedStates",{}),j=Object(n.getSetting)("localPickupEnabled",!1)},2:function(e,t){e.exports=window.wp.components},23:function(e,t,c){"use strict";c.d(t,"h",(function(){return s})),c.d(t,"e",(function(){return u})),c.d(t,"b",(function(){return b})),c.d(t,"i",(function(){return d})),c.d(t,"f",(function(){return g})),c.d(t,"c",(function(){return m})),c.d(t,"d",(function(){return p})),c.d(t,"g",(function(){return h})),c.d(t,"a",(function(){return E}));var r=c(15),n=c(16),o=c.n(n),l=c(3),a=c(18);const i=(e,t)=>{const c=new Map;return e.filter(e=>{const r=t(e);return!c.has(r)&&(c.set(r,e),!0)})},s=e=>{let{selected:t=[],search:c="",queryArgs:n={}}=e;const l=(e=>{let{selected:t=[],search:c="",queryArgs:n={}}=e;const o=a.o.productCount>100,l={per_page:o?100:0,catalog_visibility:"any",search:c,orderby:"title",order:"asc"},i=[Object(r.addQueryArgs)("/wc/store/v1/products",{...l,...n})];return o&&t.length&&i.push(Object(r.addQueryArgs)("/wc/store/v1/products",{catalog_visibility:"any",include:t,per_page:0})),i})({selected:t,search:c,queryArgs:n});return Promise.all(l.map(e=>o()({path:e}))).then(e=>{const t=e.flat();return i(t,e=>e.id).map(e=>({...e,parent:0}))}).catch(e=>{throw e})},u=e=>o()({path:"/wc/store/v1/products/"+e}),b=()=>o()({path:"wc/store/v1/products/attributes"}),d=e=>o()({path:`wc/store/v1/products/attributes/${e}/terms`}),g=e=>{let{selected:t=[],search:c}=e;const n=(e=>{let{selected:t=[],search:c}=e;const n=Object(l.getSetting)("limitTags",!1),o=[Object(r.addQueryArgs)("wc/store/v1/products/tags",{per_page:n?100:0,orderby:n?"count":"name",order:n?"desc":"asc",search:c})];return n&&t.length&&o.push(Object(r.addQueryArgs)("wc/store/v1/products/tags",{include:t})),o})({selected:t,search:c});return Promise.all(n.map(e=>o()({path:e}))).then(e=>{const t=e.flat();return i(t,e=>e.id)})},m=e=>o()({path:Object(r.addQueryArgs)("wc/store/v1/products/categories",{per_page:0,...e})}),p=e=>o()({path:"wc/store/v1/products/categories/"+e}),h=e=>o()({path:Object(r.addQueryArgs)("wc/store/v1/products",{per_page:0,type:"variation",parent:e})}),E=(e,t)=>{if(!e.title.raw)return e.slug;const c=1===t.filter(t=>t.title.raw===e.title.raw).length;return e.title.raw+(c?"":" - "+e.slug)}},3:function(e,t){e.exports=window.wc.wcSettings},31:function(e,t,c){"use strict";c.d(t,"a",(function(){return r}));const r=async e=>{if("function"==typeof e.json)try{const t=await e.json();return{message:t.message,type:t.type||"api"}}catch(e){return{message:e.message,type:"general"}}return{message:e.message,type:e.type||"general"}}},324:function(e){e.exports=JSON.parse('{"name":"woocommerce/product-category","title":"Products by Category","category":"woocommerce","keywords":["WooCommerce"],"description":"Display a grid of products from your selected categories.","supports":{"align":["wide","full"],"html":false},"attributes":{"columns":{"type":"number","default":3},"rows":{"type":"number","default":3},"alignButtons":{"type":"boolean","default":false},"contentVisibility":{"type":"object","default":{"image":true,"title":true,"price":true,"rating":true,"button":true},"properties":{"image":{"type":"boolean","default":true},"title":{"type":"boolean","default":true},"price":{"type":"boolean","default":true},"rating":{"type":"boolean","default":true},"button":{"type":"boolean","default":true}}},"categories":{"type":"array","default":[]},"catOperator":{"type":"string","default":"any"},"isPreview":{"type":"boolean","default":false},"stockStatus":{"type":"array"},"editMode":{"type":"boolean","default":true},"orderby":{"type":"string","enum":["date","popularity","price_asc","price_desc","rating","title","menu_order"],"default":"date"}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}')},35:function(e,t){e.exports=window.wp.escapeHtml},36:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(35);t.a=e=>{let{error:t}=e;return Object(r.createElement)("div",{className:"wc-block-error-message"},(e=>{let{message:t,type:c}=e;return t?"general"===c?Object(r.createElement)("span",null,Object(n.__)("The following error was returned","woo-gutenberg-products-block"),Object(r.createElement)("br",null),Object(r.createElement)("code",null,Object(o.escapeHTML)(t))):"api"===c?Object(r.createElement)("span",null,Object(n.__)("The following error was returned from the API","woo-gutenberg-products-block"),Object(r.createElement)("br",null),Object(r.createElement)("code",null,Object(o.escapeHTML)(t))):t:Object(n.__)("An error has prevented the block from being updated.","woo-gutenberg-products-block")})(t))}},38:function(e,t,c){"use strict";c.d(t,"a",(function(){return m}));var r=c(6),n=c.n(r),o=c(0),l=c(4),a=c.n(l),i=c(2);function s(e,t,c){const r=new Set(t.map(e=>e[c]));return e.filter(e=>!r.has(e[c]))}var u=c(14),b=c(17);const d=e=>{let{label:t}=e;return Object(o.createElement)("span",{className:"woocommerce-search-list__item-count"},t)},g=e=>{const{item:t,search:c}=e,r=t.breadcrumbs&&t.breadcrumbs.length;return Object(o.createElement)("span",{className:"woocommerce-search-list__item-label"},r?Object(o.createElement)("span",{className:"woocommerce-search-list__item-prefix"},Object(b.b)(t.breadcrumbs)):null,Object(o.createElement)("span",{className:"woocommerce-search-list__item-name"},Object(b.d)(Object(u.decodeEntities)(t.name),c)))},m=e=>{var t,c;let{countLabel:r,className:l,depth:u=0,controlId:m="",item:p,isSelected:h,isSingle:E,onSelect:O,search:j="",selected:w,useExpandedPanelId:f,..._}=e;const[y,k]=f,x=null!=r&&void 0!==p.count&&null!==p.count,v=!(null===(t=p.breadcrumbs)||void 0===t||!t.length),S=!(null===(c=p.children)||void 0===c||!c.length),C=y===p.id,P=a()(["woocommerce-search-list__item","depth-"+u,l],{"has-breadcrumbs":v,"has-children":S,"has-count":x,"is-expanded":C,"is-radio-button":E}),N=_.name||"search-list-item-"+m,A=`${N}-${p.id}`,T=Object(o.useCallback)(()=>{k(C?-1:Number(p.id))},[C,p.id,k]);return S?Object(o.createElement)("div",{className:P,onClick:T,onKeyDown:e=>"Enter"===e.key||" "===e.key?T():null,role:"treeitem",tabIndex:0},E?Object(o.createElement)(o.Fragment,null,Object(o.createElement)("input",n()({type:"radio",id:A,name:N,value:p.value,onChange:O(p),onClick:e=>e.stopPropagation(),checked:h,className:"woocommerce-search-list__item-input"},_)),Object(o.createElement)(g,{item:p,search:j}),x?Object(o.createElement)(d,{label:r||p.count}):null):Object(o.createElement)(o.Fragment,null,Object(o.createElement)(i.CheckboxControl,n()({className:"woocommerce-search-list__item-input",checked:h},!h&&p.children.some(e=>w.find(t=>t.id===e.id))?{indeterminate:!0}:{},{label:Object(b.d)(p.name,j),onChange:()=>{h?O(s(w,p.children,"id"))():O(function(e,t,c){const r=s(t,e,"id");return[...e,...r]}(w,p.children))()},onClick:e=>e.stopPropagation()})),x?Object(o.createElement)(d,{label:r||p.count}):null)):Object(o.createElement)("label",{htmlFor:A,className:P},E?Object(o.createElement)("input",n()({type:"radio",id:A,name:N,value:p.value,onChange:O(p),checked:h,className:"woocommerce-search-list__item-input"},_)):Object(o.createElement)("input",n()({type:"checkbox",id:A,name:N,value:p.value,onChange:O(p),checked:h,className:"woocommerce-search-list__item-input"},_)),Object(o.createElement)(g,{item:p,search:j}),x?Object(o.createElement)(d,{label:r||p.count}):null)};t.b=m},484:function(e,t,c){e.exports=c(532)},485:function(e,t){},5:function(e,t){e.exports=window.wp.blockEditor},532:function(e,t,c){"use strict";c.r(t);var r=c(0),n=c(8),o=c(72),l=c(601),a=(c(485),c(324)),i=c(83),s=c(6),u=c.n(s),b=c(5),d=c(2),g=c(1),m=c(59),p=c.n(m),h=c(162);const E=()=>Object(r.createElement)(d.Placeholder,{icon:Object(r.createElement)(o.a,{icon:l.a}),label:Object(g.__)("Products by Category","woo-gutenberg-products-block"),className:"wc-block-products-grid wc-block-products-category"},Object(g.__)("No products were found that matched your selection.","woo-gutenberg-products-block")),O=e=>{const{name:t,attributes:c}=e,n=c.categories.length;return c.isPreview?h.a:n?Object(r.createElement)(p.a,{block:t,attributes:c,EmptyResponsePlaceholder:E}):Object(r.createElement)(r.Fragment,null,Object(g.__)("Select at least one category to display its products.","woo-gutenberg-products-block"))};var j=c(60),w=c(68),f=c(3),_=c(69),y=c(109),k=c(91);const x=e=>{const{isEditing:t,attributes:c,setAttributes:n,setChangedAttributes:o}=e,{columns:l,catOperator:a,contentVisibility:i,orderby:s,rows:u,alignButtons:m,stockStatus:p}=c;return Object(r.createElement)(b.InspectorControls,{key:"inspector"},Object(r.createElement)(d.PanelBody,{title:Object(g.__)("Product Category","woo-gutenberg-products-block"),initialOpen:!c.categories.length&&!t},Object(r.createElement)(j.a,{selected:c.categories,onChange:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];const t=e.map(e=>{let{id:t}=e;return t}),c={categories:t};n(c),o(c)},operator:a,onOperatorChange:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"any";const t={catOperator:e};n(t),o(t)},isCompact:!0})),Object(r.createElement)(d.PanelBody,{title:Object(g.__)("Layout","woo-gutenberg-products-block"),initialOpen:!0},Object(r.createElement)(w.a,{columns:l,rows:u,alignButtons:m,setAttributes:n,minColumns:Object(f.getSetting)("min_columns",1),maxColumns:Object(f.getSetting)("max_columns",6),minRows:Object(f.getSetting)("min_rows",1),maxRows:Object(f.getSetting)("max_rows",6)})),Object(r.createElement)(d.PanelBody,{title:Object(g.__)("Content","woo-gutenberg-products-block"),initialOpen:!0},Object(r.createElement)(_.a,{settings:i,onChange:e=>n({contentVisibility:e})})),Object(r.createElement)(d.PanelBody,{title:Object(g.__)("Order By","woo-gutenberg-products-block"),initialOpen:!1},Object(r.createElement)(y.a,{setAttributes:n,value:s})),Object(r.createElement)(d.PanelBody,{title:Object(g.__)("Filter by stock status","woo-gutenberg-products-block"),initialOpen:!1},Object(r.createElement)(k.a,{setAttributes:n,value:p})))},v=e=>{const{debouncedSpeak:t,setIsEditing:c,changedAttributes:n,setChangedAttributes:a,attributes:i}=e,s={...i,...n},u=()=>{c(!1),a({})};return Object(r.createElement)(d.Placeholder,{icon:Object(r.createElement)(o.a,{icon:l.a}),label:Object(g.__)("Products by Category","woo-gutenberg-products-block"),className:"wc-block-products-grid wc-block-products-category"},Object(g.__)("Display a grid of products from your selected categories.","woo-gutenberg-products-block"),Object(r.createElement)("div",{className:"wc-block-products-category__selection"},Object(r.createElement)(j.a,{selected:s.categories,onChange:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];const t=e.map(e=>{let{id:t}=e;return t});a({categories:t})},operator:s.catOperator,onOperatorChange:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"any";return a({catOperator:e})}}),Object(r.createElement)(d.Button,{isPrimary:!0,onClick:()=>{(()=>{const{setAttributes:t}=e;t(n),u()})(),t(Object(g.__)("Now displaying a preview of the reviews for the products in the selected categories.","woo-gutenberg-products-block"))}},Object(g.__)("Done","woo-gutenberg-products-block")),Object(r.createElement)(d.Button,{className:"wc-block-products-category__cancel-button",isTertiary:!0,onClick:()=>{u(),t(Object(g.__)("Now displaying a preview of the reviews for the products in the selected categories.","woo-gutenberg-products-block"))}},Object(g.__)("Cancel","woo-gutenberg-products-block"))))},S=Object(d.withSpokenMessages)(e=>{const t=Object(b.useBlockProps)(),{attributes:c}=e,[n,o]=Object(r.useState)(!c.categories.length),[l,a]=Object(r.useState)({});return Object(r.createElement)("div",t,Object(r.createElement)(b.BlockControls,null,Object(r.createElement)(d.ToolbarGroup,{controls:[{icon:"edit",title:Object(g.__)("Edit selected categories","woo-gutenberg-products-block"),onClick:()=>o(!n),isActive:n}]})),Object(r.createElement)(x,u()({isEditing:n,setChangedAttributes:a},e)),n?Object(r.createElement)(v,u()({isEditing:n,setIsEditing:o,changedAttributes:l,setChangedAttributes:a},e)):Object(r.createElement)(d.Disabled,null,Object(r.createElement)(O,e)))});Object(n.registerBlockType)(a,{icon:{src:Object(r.createElement)(o.a,{icon:l.a,className:"wc-block-editor-components-block-icon"})},attributes:{...a.attributes,...i.a},transforms:{from:[{type:"block",blocks:i.b.filter(e=>"woocommerce/product-category"!==e),transform:e=>Object(n.createBlock)("woocommerce/product-category",{...e,editMode:!1})}]},edit:S,save:()=>null})},56:function(e,t,c){"use strict";c.d(t,"a",(function(){return r}));const r=(e,t)=>e.reduce((e,c)=>(e[String(t?c[t]:c)]=c,e),{})},59:function(e,t){e.exports=window.wp.serverSideRender},60:function(e,t,c){"use strict";var r=c(6),n=c.n(r),o=c(0),l=c(1),a=c(38),i=c(101),s=c(2),u=c(11),b=c(23),d=c(31),g=Object(u.createHigherOrderComponent)(e=>class extends o.Component{constructor(){super(...arguments),this.state={error:null,loading:!1,categories:[]},this.loadCategories=this.loadCategories.bind(this)}componentDidMount(){this.loadCategories()}loadCategories(){this.setState({loading:!0}),Object(b.c)().then(e=>{this.setState({categories:e,loading:!1,error:null})}).catch(async e=>{const t=await Object(d.a)(e);this.setState({categories:[],loading:!1,error:t})})}render(){const{error:t,loading:c,categories:r}=this.state;return Object(o.createElement)(e,n()({},this.props,{error:t,isLoading:c,categories:r}))}},"withCategories"),m=c(36),p=c(4),h=c.n(p);c(100);const E=e=>{let{categories:t,error:c,isLoading:r,onChange:u,onOperatorChange:b,operator:d,selected:g,isCompact:p,isSingle:E,showReviewCount:O}=e;const j={clear:Object(l.__)("Clear all product categories","woo-gutenberg-products-block"),list:Object(l.__)("Product Categories","woo-gutenberg-products-block"),noItems:Object(l.__)("Your store doesn't have any product categories.","woo-gutenberg-products-block"),search:Object(l.__)("Search for product categories","woo-gutenberg-products-block"),selected:e=>Object(l.sprintf)(
/* translators: %d is the count of selected categories. */
Object(l._n)("%d category selected","%d categories selected",e,"woo-gutenberg-products-block"),e),updated:Object(l.__)("Category search results updated.","woo-gutenberg-products-block")};return c?Object(o.createElement)(m.a,{error:c}):Object(o.createElement)(o.Fragment,null,Object(o.createElement)(i.a,{className:"woocommerce-product-categories",list:t,isLoading:r,selected:g.map(e=>t.find(t=>t.id===e)).filter(Boolean),onChange:u,renderItem:e=>{const{item:t,search:c,depth:r=0}=e,i=t.breadcrumbs.length?`${t.breadcrumbs.join(", ")}, ${t.name}`:t.name,s=O?Object(l.sprintf)(
/* translators: %1$s is the item name, %2$d is the count of reviews for the item. */
Object(l._n)("%1$s, has %2$d review","%1$s, has %2$d reviews",t.review_count,"woo-gutenberg-products-block"),i,t.review_count):Object(l.sprintf)(
/* translators: %1$s is the item name, %2$d is the count of products for the item. */
Object(l._n)("%1$s, has %2$d product","%1$s, has %2$d products",t.count,"woo-gutenberg-products-block"),i,t.count),u=O?Object(l.sprintf)(
/* translators: %d is the count of reviews. */
Object(l._n)("%d review","%d reviews",t.review_count,"woo-gutenberg-products-block"),t.review_count):Object(l.sprintf)(
/* translators: %d is the count of products. */
Object(l._n)("%d product","%d products",t.count,"woo-gutenberg-products-block"),t.count);return Object(o.createElement)(a.a,n()({className:h()("woocommerce-product-categories__item","has-count",{"is-searching":c.length>0,"is-skip-level":0===r&&0!==t.parent})},e,{countLabel:u,"aria-label":s}))},messages:j,isCompact:p,isHierarchical:!0,isSingle:E}),!!b&&Object(o.createElement)("div",{hidden:g.length<2},Object(o.createElement)(s.SelectControl,{className:"woocommerce-product-categories__operator",label:Object(l.__)("Display products matching","woo-gutenberg-products-block"),help:Object(l.__)("Pick at least two categories to use this setting.","woo-gutenberg-products-block"),value:d,onChange:b,options:[{label:Object(l.__)("Any selected categories","woo-gutenberg-products-block"),value:"any"},{label:Object(l.__)("All selected categories","woo-gutenberg-products-block"),value:"all"}]})))};E.defaultProps={operator:"any",isCompact:!1,isSingle:!1},t.a=g(E)},68:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(2);const l=(e,t,c)=>c?Math.min(e,t)===e?t:Math.max(e,c)===e?c:e:Math.max(e,t)===t?e:t;t.a=e=>{let{columns:t,rows:c,setAttributes:a,alignButtons:i,minColumns:s=1,maxColumns:u=6,minRows:b=1,maxRows:d=6}=e;return Object(r.createElement)(r.Fragment,null,Object(r.createElement)(o.RangeControl,{label:Object(n.__)("Columns","woo-gutenberg-products-block"),value:t,onChange:e=>{const t=l(e,s,u);a({columns:Number.isNaN(t)?"":t})},min:s,max:u}),Object(r.createElement)(o.RangeControl,{label:Object(n.__)("Rows","woo-gutenberg-products-block"),value:c,onChange:e=>{const t=l(e,b,d);a({rows:Number.isNaN(t)?"":t})},min:b,max:d}),Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Align the last block to the bottom","woo-gutenberg-products-block"),help:i?Object(n.__)("Align the last block to the bottom.","woo-gutenberg-products-block"):Object(n.__)("The last inner block will follow other content.","woo-gutenberg-products-block"),checked:i,onChange:()=>a({alignButtons:!i})}))}},69:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(2);t.a=e=>{let{onChange:t,settings:c}=e;const{image:l,button:a,price:i,rating:s,title:u}=c,b=!1!==l;return Object(r.createElement)(r.Fragment,null,Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Product image","woo-gutenberg-products-block"),checked:b,onChange:()=>t({...c,image:!b})}),Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Product title","woo-gutenberg-products-block"),checked:u,onChange:()=>t({...c,title:!u})}),Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Product price","woo-gutenberg-products-block"),checked:i,onChange:()=>t({...c,price:!i})}),Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Product rating","woo-gutenberg-products-block"),checked:s,onChange:()=>t({...c,rating:!s})}),Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Add to Cart button","woo-gutenberg-products-block"),checked:a,onChange:()=>t({...c,button:!a})}))}},8:function(e,t){e.exports=window.wp.blocks},83:function(e,t,c){"use strict";c.d(t,"b",(function(){return n}));var r=c(3);const n=["woocommerce/product-best-sellers","woocommerce/product-category","woocommerce/product-new","woocommerce/product-on-sale","woocommerce/product-top-rated"];t.a={columns:{type:"number",default:Object(r.getSetting)("default_columns",3)},rows:{type:"number",default:Object(r.getSetting)("default_rows",3)},alignButtons:{type:"boolean",default:!1},categories:{type:"array",default:[]},catOperator:{type:"string",default:"any"},contentVisibility:{type:"object",default:{image:!0,title:!0,price:!0,rating:!0,button:!0}},isPreview:{type:"boolean",default:!1},stockStatus:{type:"array",default:Object.keys(Object(r.getSetting)("stockStatusOptions",[]))}}},91:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(3),l=c(2);const a=Object(o.getSetting)("hideOutOfStockItems",!1),i=Object(o.getSetting)("stockStatusOptions",{});t.a=e=>{let{value:t,setAttributes:c}=e;const{outofstock:o,...s}=i,u=a?s:i,b=Object.entries(u).map(e=>{let[t,c]=e;return{value:t,label:c}}).filter(e=>!!e.label),[d,g]=Object(r.useState)(t);Object(r.useEffect)(()=>{c({stockStatus:["",...d]})},[d,c]);const m=Object(r.useCallback)(e=>{const t=d.includes(e),c=d.filter(t=>t!==e);t||(c.push(e),c.sort()),g(c)},[d]);return Object(r.createElement)(r.Fragment,null,b.map(e=>{const t=d.includes(e.value)?
/* translators: %s stock status. */
Object(n.__)('Stock status "%s" visible.',"woo-gutenberg-products-block"):
/* translators: %s stock status. */
Object(n.__)('Stock status "%s" hidden.',"woo-gutenberg-products-block");return Object(r.createElement)(l.ToggleControl,{label:e.label,key:e.value,help:Object(n.sprintf)(t,e.label),checked:d.includes(e.value),onChange:()=>m(e.value)})}))}}});