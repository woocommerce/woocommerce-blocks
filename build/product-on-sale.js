this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["product-on-sale"]=function(e){function t(t){for(var r,l,a=t[0],s=t[1],i=t[2],b=0,d=[];b<a.length;b++)l=a[b],Object.prototype.hasOwnProperty.call(n,l)&&n[l]&&d.push(n[l][0]),n[l]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(u&&u(t);d.length;)d.shift()();return o.push.apply(o,i||[]),c()}function c(){for(var e,t=0;t<o.length;t++){for(var c=o[t],r=!0,a=1;a<c.length;a++){var s=c[a];0!==n[s]&&(r=!1)}r&&(o.splice(t--,1),e=l(l.s=c[0]))}return e}var r={},n={28:0},o=[];function l(t){if(r[t])return r[t].exports;var c=r[t]={i:t,l:!1,exports:{}};return e[t].call(c.exports,c,c.exports,l),c.l=!0,c.exports}l.m=e,l.c=r,l.d=function(e,t,c){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:c})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(l.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(c,r,function(t){return e[t]}.bind(null,r));return c},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var a=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],s=a.push.bind(a);a.push=t,a=a.slice();for(var i=0;i<a.length;i++)t(a[i]);var u=s;return o.push([362,0]),c()}({0:function(e,t){e.exports=window.wp.element},1:function(e,t){e.exports=window.wp.i18n},101:function(e,t,c){"use strict";c.d(t,"a",(function(){return y}));var r=c(6),n=c.n(r),o=c(0),l=c(1),a=c(3),s=c(79),i=c(513),u=c(4),b=c.n(u),d=c(11),g=c(19),m=c(37),p=c(512),h=c(18);const E=e=>{let{id:t,label:c,popoverContents:r,remove:n,screenReaderLabel:i,className:u=""}=e;const[g,m]=Object(o.useState)(!1),O=Object(d.useInstanceId)(E);if(i=i||c,!c)return null;c=Object(h.decodeEntities)(c);const j=b()("woocommerce-tag",u,{"has-remove":!!n}),w="woocommerce-tag__label-"+O,f=Object(o.createElement)(o.Fragment,null,Object(o.createElement)("span",{className:"screen-reader-text"},i),Object(o.createElement)("span",{"aria-hidden":"true"},c));return Object(o.createElement)("span",{className:j},r?Object(o.createElement)(a.Button,{className:"woocommerce-tag__text",id:w,onClick:()=>m(!0)},f):Object(o.createElement)("span",{className:"woocommerce-tag__text",id:w},f),r&&g&&Object(o.createElement)(a.Popover,{onClose:()=>m(!1)},r),n&&Object(o.createElement)(a.Button,{className:"woocommerce-tag__remove",onClick:n(t),label:Object(l.sprintf)(// Translators: %s label.
Object(l.__)("Remove %s","woo-gutenberg-products-block"),c),"aria-describedby":w},Object(o.createElement)(s.a,{icon:p.a,size:20,className:"clear-icon"})))};var O=E;const j=e=>Object(o.createElement)(m.b,e),w=e=>{const{list:t,selected:c,renderItem:r,depth:l=0,onSelect:a,instanceId:s,isSingle:i,search:u}=e;return t?Object(o.createElement)(o.Fragment,null,t.map(t=>{const b=-1!==c.findIndex(e=>{let{id:c}=e;return c===t.id});return Object(o.createElement)(o.Fragment,{key:t.id},Object(o.createElement)("li",null,r({item:t,isSelected:b,onSelect:a,isSingle:i,search:u,depth:l,controlId:s})),Object(o.createElement)(w,n()({},e,{list:t.children,depth:l+1})))})):null},f=e=>{let{isLoading:t,isSingle:c,selected:r,messages:n,onChange:s,onRemove:i}=e;if(t||c||!r)return null;const u=r.length;return Object(o.createElement)("div",{className:"woocommerce-search-list__selected"},Object(o.createElement)("div",{className:"woocommerce-search-list__selected-header"},Object(o.createElement)("strong",null,n.selected(u)),u>0?Object(o.createElement)(a.Button,{isLink:!0,isDestructive:!0,onClick:()=>s([]),"aria-label":n.clear},Object(l.__)("Clear all","woo-gutenberg-products-block")):null),u>0?Object(o.createElement)("ul",null,r.map((e,t)=>Object(o.createElement)("li",{key:t},Object(o.createElement)(O,{label:e.name,id:e.id,remove:i})))):null)},_=e=>{let{filteredList:t,search:c,onSelect:r,instanceId:n,...a}=e;const{messages:u,renderItem:b,selected:d,isSingle:g}=a,m=b||j;return 0===t.length?Object(o.createElement)("div",{className:"woocommerce-search-list__list is-not-found"},Object(o.createElement)("span",{className:"woocommerce-search-list__not-found-icon"},Object(o.createElement)(s.a,{icon:i.a})),Object(o.createElement)("span",{className:"woocommerce-search-list__not-found-text"},c?Object(l.sprintf)(u.noResults,c):u.noItems)):Object(o.createElement)("ul",{className:"woocommerce-search-list__list"},Object(o.createElement)(w,{list:t,selected:d,renderItem:m,onSelect:r,instanceId:n,isSingle:g,search:c}))},y=e=>{const{className:t="",isCompact:c,isHierarchical:r,isLoading:l,isSingle:s,list:i,messages:u=g.a,onChange:m,onSearch:p,selected:h,debouncedSpeak:E}=e,[O,j]=Object(o.useState)(""),w=Object(d.useInstanceId)(y),x=Object(o.useMemo)(()=>({...g.a,...u}),[u]),k=Object(o.useMemo)(()=>Object(g.c)(i,O,r),[i,O,r]);Object(o.useEffect)(()=>{E&&E(x.updated)},[E,x]),Object(o.useEffect)(()=>{"function"==typeof p&&p(O)},[O,p]);const v=Object(o.useCallback)(e=>()=>{s&&m([]);const t=h.findIndex(t=>{let{id:c}=t;return c===e});m([...h.slice(0,t),...h.slice(t+1)])},[s,h,m]),S=Object(o.useCallback)(e=>()=>{-1===h.findIndex(t=>{let{id:c}=t;return c===e.id})?m(s?[e]:[...h,e]):v(e.id)()},[s,v,m,h]);return Object(o.createElement)("div",{className:b()("woocommerce-search-list",t,{"is-compact":c})},Object(o.createElement)(f,n()({},e,{onRemove:v,messages:x})),Object(o.createElement)("div",{className:"woocommerce-search-list__search"},Object(o.createElement)(a.TextControl,{label:x.search,type:"search",value:O,onChange:e=>j(e)})),l?Object(o.createElement)("div",{className:"woocommerce-search-list__list is-loading"},Object(o.createElement)(a.Spinner,null)):Object(o.createElement)(_,n()({},e,{search:O,filteredList:k,messages:x,onSelect:S,instanceId:w})))};Object(a.withSpokenMessages)(y)},102:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(3);t.a=e=>{let{value:t,setAttributes:c}=e;return Object(r.createElement)(o.SelectControl,{label:Object(n.__)("Order products by","woo-gutenberg-products-block"),value:t,options:[{label:Object(n.__)("Newness - newest first","woo-gutenberg-products-block"),value:"date"},{label:Object(n.__)("Price - low to high","woo-gutenberg-products-block"),value:"price_asc"},{label:Object(n.__)("Price - high to low","woo-gutenberg-products-block"),value:"price_desc"},{label:Object(n.__)("Rating - highest first","woo-gutenberg-products-block"),value:"rating"},{label:Object(n.__)("Sales - most first","woo-gutenberg-products-block"),value:"popularity"},{label:Object(n.__)("Title - alphabetical","woo-gutenberg-products-block"),value:"title"},{label:Object(n.__)("Menu Order","woo-gutenberg-products-block"),value:"menu_order"}],onChange:e=>c({orderby:e})})}},11:function(e,t){e.exports=window.wp.compose},12:function(e,t){e.exports=window.wp.primitives},14:function(e,t){e.exports=window.wp.apiFetch},151:function(e,t,c){"use strict";c.d(t,"a",(function(){return n}));var r=c(0);const n=Object(r.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 230 250",style:{width:"100%"}},Object(r.createElement)("title",null,"Grid Block Preview"),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:".162",y:".779",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"9.216",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"1.565",y:"101.448",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:".162",y:"136.277",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"9.216",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"1.565",y:"236.946",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:"82.478",y:".779",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"91.532",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"83.882",y:"101.448",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:"82.478",y:"136.277",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"91.532",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"83.882",y:"236.946",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:"164.788",y:".779",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"173.843",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"166.192",y:"101.448",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:"164.788",y:"136.277",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"173.843",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"166.192",y:"236.946",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"13.283",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"21.498",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"29.713",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"37.927",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"46.238",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"95.599",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"103.814",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"112.029",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"120.243",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"128.554",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"177.909",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"186.124",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"194.339",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"202.553",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"210.864",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"13.283",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"21.498",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"29.713",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"37.927",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"46.238",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"95.599",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"103.814",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"112.029",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"120.243",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"128.554",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"177.909",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"186.124",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"194.339",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"202.553",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"210.864",y:"221.798",fill:"#E1E3E6",rx:"3"}))},16:function(e,t){e.exports=window.wp.url},18:function(e,t){e.exports=window.wp.htmlEntities},19:function(e,t,c){"use strict";c.d(t,"a",(function(){return l})),c.d(t,"c",(function(){return s})),c.d(t,"d",(function(){return i})),c.d(t,"b",(function(){return u}));var r=c(0),n=c(8),o=c(1);const l={clear:Object(o.__)("Clear all selected items","woo-gutenberg-products-block"),noItems:Object(o.__)("No items found.","woo-gutenberg-products-block"),
/* Translators: %s search term */
noResults:Object(o.__)("No results for %s","woo-gutenberg-products-block"),search:Object(o.__)("Search for items","woo-gutenberg-products-block"),selected:e=>Object(o.sprintf)(
/* translators: Number of items selected from list. */
Object(o._n)("%d item selected","%d items selected",e,"woo-gutenberg-products-block"),e),updated:Object(o.__)("Search results updated.","woo-gutenberg-products-block")},a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;const c=Object(n.groupBy)(e,"parent"),r=Object(n.keyBy)(t,"id"),o=["0"],l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!e.parent)return e.name?[e.name]:[];const t=l(r[e.parent]);return[...t,e.name]},a=e=>e.map(e=>{const t=c[e.id];return o.push(""+e.id),{...e,breadcrumbs:l(r[e.parent]),children:t&&t.length?a(t):[]}}),s=a(c[0]||[]);return Object.entries(c).forEach(e=>{let[t,c]=e;o.includes(t)||s.push(...a(c||[]))}),s},s=(e,t,c)=>{if(!t)return c?a(e):e;const r=new RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"i"),n=e.map(e=>!!r.test(e.name)&&e).filter(Boolean);return c?a(n,e):n},i=(e,t)=>{if(!t)return e;const c=new RegExp(`(${t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"ig");return e.split(c).map((e,t)=>c.test(e)?Object(r.createElement)("strong",{key:t},e):Object(r.createElement)(r.Fragment,{key:t},e))},u=e=>1===e.length?e.slice(0,1).toString():2===e.length?e.slice(0,1).toString()+" › "+e.slice(-1).toString():e.slice(0,1).toString()+" … "+e.slice(-1).toString()},2:function(e,t){e.exports=window.wc.wcSettings},20:function(e,t,c){"use strict";c.d(t,"n",(function(){return o})),c.d(t,"l",(function(){return l})),c.d(t,"k",(function(){return a})),c.d(t,"m",(function(){return s})),c.d(t,"i",(function(){return i})),c.d(t,"e",(function(){return u})),c.d(t,"f",(function(){return b})),c.d(t,"j",(function(){return d})),c.d(t,"c",(function(){return g})),c.d(t,"d",(function(){return m})),c.d(t,"g",(function(){return p})),c.d(t,"a",(function(){return h})),c.d(t,"h",(function(){return E})),c.d(t,"b",(function(){return O}));var r,n=c(2);const o=Object(n.getSetting)("wcBlocksConfig",{buildPhase:1,pluginUrl:"",productCount:0,defaultAvatar:"",restApiRoutes:{},wordCountType:"words"}),l=o.pluginUrl+"images/",a=o.pluginUrl+"build/",s=o.buildPhase,i=null===(r=n.STORE_PAGES.shop)||void 0===r?void 0:r.permalink,u=n.STORE_PAGES.checkout.id,b=(n.STORE_PAGES.checkout.permalink,n.STORE_PAGES.privacy.permalink),d=(n.STORE_PAGES.privacy.title,n.STORE_PAGES.terms.permalink),g=(n.STORE_PAGES.terms.title,n.STORE_PAGES.cart.id),m=n.STORE_PAGES.cart.permalink,p=(n.STORE_PAGES.myaccount.permalink?n.STORE_PAGES.myaccount.permalink:Object(n.getSetting)("wpLoginUrl","/wp-login.php"),Object(n.getSetting)("shippingCountries",{})),h=Object(n.getSetting)("allowedCountries",{}),E=Object(n.getSetting)("shippingStates",{}),O=Object(n.getSetting)("allowedStates",{})},27:function(e,t,c){"use strict";c.d(t,"h",(function(){return i})),c.d(t,"e",(function(){return u})),c.d(t,"b",(function(){return b})),c.d(t,"i",(function(){return d})),c.d(t,"f",(function(){return g})),c.d(t,"c",(function(){return m})),c.d(t,"d",(function(){return p})),c.d(t,"g",(function(){return h})),c.d(t,"a",(function(){return E}));var r=c(16),n=c(14),o=c.n(n),l=c(8),a=c(2),s=c(20);const i=e=>{let{selected:t=[],search:c="",queryArgs:n={}}=e;const a=(e=>{let{selected:t=[],search:c="",queryArgs:n={}}=e;const o=s.n.productCount>100,l={per_page:o?100:0,catalog_visibility:"any",search:c,orderby:"title",order:"asc"},a=[Object(r.addQueryArgs)("/wc/store/v1/products",{...l,...n})];return o&&t.length&&a.push(Object(r.addQueryArgs)("/wc/store/v1/products",{catalog_visibility:"any",include:t,per_page:0})),a})({selected:t,search:c,queryArgs:n});return Promise.all(a.map(e=>o()({path:e}))).then(e=>Object(l.uniqBy)(Object(l.flatten)(e),"id").map(e=>({...e,parent:0}))).catch(e=>{throw e})},u=e=>o()({path:"/wc/store/v1/products/"+e}),b=()=>o()({path:"wc/store/v1/products/attributes"}),d=e=>o()({path:`wc/store/v1/products/attributes/${e}/terms`}),g=e=>{let{selected:t=[],search:c}=e;const n=(e=>{let{selected:t=[],search:c}=e;const n=Object(a.getSetting)("limitTags",!1),o=[Object(r.addQueryArgs)("wc/store/v1/products/tags",{per_page:n?100:0,orderby:n?"count":"name",order:n?"desc":"asc",search:c})];return n&&t.length&&o.push(Object(r.addQueryArgs)("wc/store/v1/products/tags",{include:t})),o})({selected:t,search:c});return Promise.all(n.map(e=>o()({path:e}))).then(e=>Object(l.uniqBy)(Object(l.flatten)(e),"id"))},m=e=>o()({path:Object(r.addQueryArgs)("wc/store/v1/products/categories",{per_page:0,...e})}),p=e=>o()({path:"wc/store/v1/products/categories/"+e}),h=e=>o()({path:Object(r.addQueryArgs)("wc/store/v1/products",{per_page:0,type:"variation",parent:e})}),E=(e,t)=>{if(!e.title.raw)return e.slug;const c=1===t.filter(t=>t.title.raw===e.title.raw).length;return e.title.raw+(c?"":" - "+e.slug)}},3:function(e,t){e.exports=window.wp.components},30:function(e,t,c){"use strict";c.d(t,"a",(function(){return r}));const r=async e=>{if("function"==typeof e.json)try{const t=await e.json();return{message:t.message,type:t.type||"api"}}catch(e){return{message:e.message,type:"general"}}return{message:e.message,type:e.type||"general"}}},34:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(35);t.a=e=>{let{error:t}=e;return Object(r.createElement)("div",{className:"wc-block-error-message"},(e=>{let{message:t,type:c}=e;return t?"general"===c?Object(r.createElement)("span",null,Object(n.__)("The following error was returned","woo-gutenberg-products-block"),Object(r.createElement)("br",null),Object(r.createElement)("code",null,Object(o.escapeHTML)(t))):"api"===c?Object(r.createElement)("span",null,Object(n.__)("The following error was returned from the API","woo-gutenberg-products-block"),Object(r.createElement)("br",null),Object(r.createElement)("code",null,Object(o.escapeHTML)(t))):t:Object(n.__)("An error has prevented the block from being updated.","woo-gutenberg-products-block")})(t))}},35:function(e,t){e.exports=window.wp.escapeHtml},362:function(e,t,c){e.exports=c(498)},363:function(e,t){},37:function(e,t,c){"use strict";c.d(t,"a",(function(){return a}));var r=c(6),n=c.n(r),o=c(0),l=c(19);const a=e=>{let{countLabel:t,className:c,depth:r=0,controlId:a="",item:s,isSelected:i,isSingle:u,onSelect:b,search:d="",...g}=e;const m=null!=t&&void 0!==s.count&&null!==s.count,p=[c,"woocommerce-search-list__item"];p.push("depth-"+r),u&&p.push("is-radio-button"),m&&p.push("has-count");const h=s.breadcrumbs&&s.breadcrumbs.length,E=g.name||"search-list-item-"+a,O=`${E}-${s.id}`;return Object(o.createElement)("label",{htmlFor:O,className:p.join(" ")},u?Object(o.createElement)("input",n()({type:"radio",id:O,name:E,value:s.value,onChange:b(s),checked:i,className:"woocommerce-search-list__item-input"},g)):Object(o.createElement)("input",n()({type:"checkbox",id:O,name:E,value:s.value,onChange:b(s),checked:i,className:"woocommerce-search-list__item-input"},g)),Object(o.createElement)("span",{className:"woocommerce-search-list__item-label"},h?Object(o.createElement)("span",{className:"woocommerce-search-list__item-prefix"},Object(l.b)(s.breadcrumbs)):null,Object(o.createElement)("span",{className:"woocommerce-search-list__item-name"},Object(l.d)(s.name,d))),!!m&&Object(o.createElement)("span",{className:"woocommerce-search-list__item-count"},t||s.count))};t.b=a},498:function(e,t,c){"use strict";c.r(t);var r=c(0),n=c(1),o=c(9),l=c(8),a=c(79),s=c(518),i=c(3),u=c(5),b=c(57),d=c.n(b),g=c(63),m=c(64),p=c(58),h=c(102),E=c(81),O=c(151),j=c(2);const w=()=>Object(r.createElement)(i.Placeholder,{icon:Object(r.createElement)(a.a,{icon:s.a}),label:Object(n.__)("On Sale Products","woo-gutenberg-products-block"),className:"wc-block-product-on-sale"},Object(n.__)("This block shows on-sale products. There are currently no discounted products in your store.","woo-gutenberg-products-block"));class f extends r.Component{getInspectorControls(){const{attributes:e,setAttributes:t}=this.props,{categories:c,catOperator:o,columns:l,contentVisibility:a,rows:s,orderby:b,alignButtons:d,stockStatus:O}=e;return Object(r.createElement)(u.InspectorControls,{key:"inspector"},Object(r.createElement)(i.PanelBody,{title:Object(n.__)("Layout","woo-gutenberg-products-block"),initialOpen:!0},Object(r.createElement)(m.a,{columns:l,rows:s,alignButtons:d,setAttributes:t,minColumns:Object(j.getSetting)("min_columns",1),maxColumns:Object(j.getSetting)("max_columns",6),minRows:Object(j.getSetting)("min_rows",1),maxRows:Object(j.getSetting)("max_rows",6)})),Object(r.createElement)(i.PanelBody,{title:Object(n.__)("Content","woo-gutenberg-products-block"),initialOpen:!0},Object(r.createElement)(g.a,{settings:a,onChange:e=>t({contentVisibility:e})})),Object(r.createElement)(i.PanelBody,{title:Object(n.__)("Order By","woo-gutenberg-products-block"),initialOpen:!1},Object(r.createElement)(h.a,{setAttributes:t,value:b})),Object(r.createElement)(i.PanelBody,{title:Object(n.__)("Filter by Product Category","woo-gutenberg-products-block"),initialOpen:!1},Object(r.createElement)(p.a,{selected:c,onChange:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];const c=e.map(e=>{let{id:t}=e;return t});t({categories:c})},operator:o,onOperatorChange:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"any";return t({catOperator:e})}})),Object(r.createElement)(i.PanelBody,{title:Object(n.__)("Filter by stock status","woo-gutenberg-products-block"),initialOpen:!1},Object(r.createElement)(E.a,{setAttributes:t,value:O})))}render(){const{attributes:e,name:t}=this.props;return e.isPreview?O.a:Object(r.createElement)(r.Fragment,null,this.getInspectorControls(),Object(r.createElement)(i.Disabled,null,Object(r.createElement)(d.a,{block:t,attributes:e,EmptyResponsePlaceholder:w})))}}var _=f,y=(c(363),c(74));Object(o.registerBlockType)("woocommerce/product-on-sale",{title:Object(n.__)("On Sale Products","woo-gutenberg-products-block"),icon:{src:Object(r.createElement)(a.a,{icon:s.a,className:"wc-block-editor-components-block-icon"})},category:"woocommerce",keywords:[Object(n.__)("WooCommerce","woo-gutenberg-products-block")],description:Object(n.__)("Display a grid of products currently on sale.","woo-gutenberg-products-block"),supports:{align:["wide","full"],html:!1},attributes:{...y.a,orderby:{type:"string",default:"date"}},example:{attributes:{isPreview:!0}},transforms:{from:[{type:"block",blocks:Object(l.without)(y.b,"woocommerce/product-on-sale"),transform:e=>Object(o.createBlock)("woocommerce/product-on-sale",e)}]},edit:e=>Object(r.createElement)(_,e),save:()=>null})},5:function(e,t){e.exports=window.wp.blockEditor},57:function(e,t){e.exports=window.wp.serverSideRender},58:function(e,t,c){"use strict";var r=c(6),n=c.n(r),o=c(0),l=c(1),a=c(37),s=c(101),i=c(3),u=c(11),b=c(27),d=c(30),g=Object(u.createHigherOrderComponent)(e=>class extends o.Component{constructor(){super(...arguments),this.state={error:null,loading:!1,categories:[]},this.loadCategories=this.loadCategories.bind(this)}componentDidMount(){this.loadCategories()}loadCategories(){this.setState({loading:!0}),Object(b.c)().then(e=>{this.setState({categories:e,loading:!1,error:null})}).catch(async e=>{const t=await Object(d.a)(e);this.setState({categories:[],loading:!1,error:t})})}render(){const{error:t,loading:c,categories:r}=this.state;return Object(o.createElement)(e,n()({},this.props,{error:t,isLoading:c,categories:r}))}},"withCategories"),m=c(34),p=c(4),h=c.n(p);c(94);const E=e=>{let{categories:t,error:c,isLoading:r,onChange:u,onOperatorChange:b,operator:d,selected:g,isCompact:p,isSingle:E,showReviewCount:O}=e;const j={clear:Object(l.__)("Clear all product categories","woo-gutenberg-products-block"),list:Object(l.__)("Product Categories","woo-gutenberg-products-block"),noItems:Object(l.__)("Your store doesn't have any product categories.","woo-gutenberg-products-block"),search:Object(l.__)("Search for product categories","woo-gutenberg-products-block"),selected:e=>Object(l.sprintf)(
/* translators: %d is the count of selected categories. */
Object(l._n)("%d category selected","%d categories selected",e,"woo-gutenberg-products-block"),e),updated:Object(l.__)("Category search results updated.","woo-gutenberg-products-block")};return c?Object(o.createElement)(m.a,{error:c}):Object(o.createElement)(o.Fragment,null,Object(o.createElement)(s.a,{className:"woocommerce-product-categories",list:t,isLoading:r,selected:g.map(e=>t.find(t=>t.id===e)).filter(Boolean),onChange:u,renderItem:e=>{const{item:t,search:c,depth:r=0}=e,s=t.breadcrumbs.length?`${t.breadcrumbs.join(", ")}, ${t.name}`:t.name,i=O?Object(l.sprintf)(
/* translators: %1$s is the item name, %2$d is the count of reviews for the item. */
Object(l._n)("%1$s, has %2$d review","%1$s, has %2$d reviews",t.review_count,"woo-gutenberg-products-block"),s,t.review_count):Object(l.sprintf)(
/* translators: %1$s is the item name, %2$d is the count of products for the item. */
Object(l._n)("%1$s, has %2$d product","%1$s, has %2$d products",t.count,"woo-gutenberg-products-block"),s,t.count),u=O?Object(l.sprintf)(
/* translators: %d is the count of reviews. */
Object(l._n)("%d review","%d reviews",t.review_count,"woo-gutenberg-products-block"),t.review_count):Object(l.sprintf)(
/* translators: %d is the count of products. */
Object(l._n)("%d product","%d products",t.count,"woo-gutenberg-products-block"),t.count);return Object(o.createElement)(a.a,n()({className:h()("woocommerce-product-categories__item","has-count",{"is-searching":c.length>0,"is-skip-level":0===r&&0!==t.parent})},e,{countLabel:u,"aria-label":i}))},messages:j,isCompact:p,isHierarchical:!0,isSingle:E}),!!b&&Object(o.createElement)("div",{hidden:g.length<2},Object(o.createElement)(i.SelectControl,{className:"woocommerce-product-categories__operator",label:Object(l.__)("Display products matching","woo-gutenberg-products-block"),help:Object(l.__)("Pick at least two categories to use this setting.","woo-gutenberg-products-block"),value:d,onChange:b,options:[{label:Object(l.__)("Any selected categories","woo-gutenberg-products-block"),value:"any"},{label:Object(l.__)("All selected categories","woo-gutenberg-products-block"),value:"all"}]})))};E.defaultProps={operator:"any",isCompact:!1,isSingle:!1},t.a=g(E)},63:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(3);t.a=e=>{let{onChange:t,settings:c}=e;const{image:l,button:a,price:s,rating:i,title:u}=c,b=!1!==l;return Object(r.createElement)(r.Fragment,null,Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Product image","woo-gutenberg-products-block"),checked:b,onChange:()=>t({...c,image:!b})}),Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Product title","woo-gutenberg-products-block"),checked:u,onChange:()=>t({...c,title:!u})}),Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Product price","woo-gutenberg-products-block"),checked:s,onChange:()=>t({...c,price:!s})}),Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Product rating","woo-gutenberg-products-block"),checked:i,onChange:()=>t({...c,rating:!i})}),Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Add to Cart button","woo-gutenberg-products-block"),checked:a,onChange:()=>t({...c,button:!a})}))}},64:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(8),l=c(3);t.a=e=>{let{columns:t,rows:c,setAttributes:a,alignButtons:s,minColumns:i=1,maxColumns:u=6,minRows:b=1,maxRows:d=6}=e;return Object(r.createElement)(r.Fragment,null,Object(r.createElement)(l.RangeControl,{label:Object(n.__)("Columns","woo-gutenberg-products-block"),value:t,onChange:e=>{const t=Object(o.clamp)(e,i,u);a({columns:Number.isNaN(t)?"":t})},min:i,max:u}),Object(r.createElement)(l.RangeControl,{label:Object(n.__)("Rows","woo-gutenberg-products-block"),value:c,onChange:e=>{const t=Object(o.clamp)(e,b,d);a({rows:Number.isNaN(t)?"":t})},min:b,max:d}),Object(r.createElement)(l.ToggleControl,{label:Object(n.__)("Align the last block to the bottom","woo-gutenberg-products-block"),help:s?Object(n.__)("Align the last block to the bottom.","woo-gutenberg-products-block"):Object(n.__)("The last inner block will follow other content.","woo-gutenberg-products-block"),checked:s,onChange:()=>a({alignButtons:!s})}))}},74:function(e,t,c){"use strict";c.d(t,"b",(function(){return n}));var r=c(2);const n=["woocommerce/product-best-sellers","woocommerce/product-category","woocommerce/product-new","woocommerce/product-on-sale","woocommerce/product-top-rated"];t.a={columns:{type:"number",default:Object(r.getSetting)("default_columns",3)},rows:{type:"number",default:Object(r.getSetting)("default_rows",3)},alignButtons:{type:"boolean",default:!1},categories:{type:"array",default:[]},catOperator:{type:"string",default:"any"},contentVisibility:{type:"object",default:{image:!0,title:!0,price:!0,rating:!0,button:!0}},isPreview:{type:"boolean",default:!1},stockStatus:{type:"array",default:Object.keys(Object(r.getSetting)("stockStatusOptions",[]))}}},8:function(e,t){e.exports=window.lodash},81:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(2),l=c(3);const a=Object(o.getSetting)("hideOutOfStockItems",!1),s=Object(o.getSetting)("stockStatusOptions",{});t.a=e=>{let{value:t,setAttributes:c}=e;const{outofstock:o,...i}=s,u=a?i:s,b=Object.entries(u).map(e=>{let[t,c]=e;return{value:t,label:c}}).filter(e=>!!e.label),[d,g]=Object(r.useState)(t);Object(r.useEffect)(()=>{c({stockStatus:["",...d]})},[d,c]);const m=Object(r.useCallback)(e=>{const t=d.includes(e),c=d.filter(t=>t!==e);t||(c.push(e),c.sort()),g(c)},[d]);return Object(r.createElement)(r.Fragment,null,b.map(e=>{const t=d.includes(e.value)?
/* translators: %s stock status. */
Object(n.__)('Stock status "%s" visible.',"woo-gutenberg-products-block"):
/* translators: %s stock status. */
Object(n.__)('Stock status "%s" hidden.',"woo-gutenberg-products-block");return Object(r.createElement)(l.ToggleControl,{label:e.label,key:e.value,help:Object(n.sprintf)(t,e.label),checked:d.includes(e.value),onChange:()=>m(e.value)})}))}},9:function(e,t){e.exports=window.wp.blocks},94:function(e,t){}});