this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["product-tag"]=function(e){function t(t){for(var r,l,s=t[0],a=t[1],i=t[2],b=0,d=[];b<s.length;b++)l=s[b],Object.prototype.hasOwnProperty.call(n,l)&&n[l]&&d.push(n[l][0]),n[l]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]);for(u&&u(t);d.length;)d.shift()();return o.push.apply(o,i||[]),c()}function c(){for(var e,t=0;t<o.length;t++){for(var c=o[t],r=!0,s=1;s<c.length;s++){var a=c[s];0!==n[a]&&(r=!1)}r&&(o.splice(t--,1),e=l(l.s=c[0]))}return e}var r={},n={37:0},o=[];function l(t){if(r[t])return r[t].exports;var c=r[t]={i:t,l:!1,exports:{}};return e[t].call(c.exports,c,c.exports,l),c.l=!0,c.exports}l.m=e,l.c=r,l.d=function(e,t,c){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:c})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(l.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(c,r,function(t){return e[t]}.bind(null,r));return c},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var s=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],a=s.push.bind(s);s.push=t,s=s.slice();for(var i=0;i<s.length;i++)t(s[i]);var u=a;return o.push([375,0]),c()}({0:function(e,t){e.exports=window.wp.element},1:function(e,t){e.exports=window.wp.i18n},101:function(e,t,c){"use strict";c.d(t,"a",(function(){return y}));var r=c(6),n=c.n(r),o=c(0),l=c(1),s=c(3),a=c(79),i=c(513),u=c(4),b=c.n(u),d=c(11),g=c(19),h=c(37),m=c(512),p=c(18);const E=e=>{let{id:t,label:c,popoverContents:r,remove:n,screenReaderLabel:i,className:u=""}=e;const[g,h]=Object(o.useState)(!1),O=Object(d.useInstanceId)(E);if(i=i||c,!c)return null;c=Object(p.decodeEntities)(c);const j=b()("woocommerce-tag",u,{"has-remove":!!n}),w="woocommerce-tag__label-"+O,f=Object(o.createElement)(o.Fragment,null,Object(o.createElement)("span",{className:"screen-reader-text"},i),Object(o.createElement)("span",{"aria-hidden":"true"},c));return Object(o.createElement)("span",{className:j},r?Object(o.createElement)(s.Button,{className:"woocommerce-tag__text",id:w,onClick:()=>h(!0)},f):Object(o.createElement)("span",{className:"woocommerce-tag__text",id:w},f),r&&g&&Object(o.createElement)(s.Popover,{onClose:()=>h(!1)},r),n&&Object(o.createElement)(s.Button,{className:"woocommerce-tag__remove",onClick:n(t),label:Object(l.sprintf)(// Translators: %s label.
Object(l.__)("Remove %s","woo-gutenberg-products-block"),c),"aria-describedby":w},Object(o.createElement)(a.a,{icon:m.a,size:20,className:"clear-icon"})))};var O=E;const j=e=>Object(o.createElement)(h.b,e),w=e=>{const{list:t,selected:c,renderItem:r,depth:l=0,onSelect:s,instanceId:a,isSingle:i,search:u}=e;return t?Object(o.createElement)(o.Fragment,null,t.map(t=>{const b=-1!==c.findIndex(e=>{let{id:c}=e;return c===t.id});return Object(o.createElement)(o.Fragment,{key:t.id},Object(o.createElement)("li",null,r({item:t,isSelected:b,onSelect:s,isSingle:i,search:u,depth:l,controlId:a})),Object(o.createElement)(w,n()({},e,{list:t.children,depth:l+1})))})):null},f=e=>{let{isLoading:t,isSingle:c,selected:r,messages:n,onChange:a,onRemove:i}=e;if(t||c||!r)return null;const u=r.length;return Object(o.createElement)("div",{className:"woocommerce-search-list__selected"},Object(o.createElement)("div",{className:"woocommerce-search-list__selected-header"},Object(o.createElement)("strong",null,n.selected(u)),u>0?Object(o.createElement)(s.Button,{isLink:!0,isDestructive:!0,onClick:()=>a([]),"aria-label":n.clear},Object(l.__)("Clear all","woo-gutenberg-products-block")):null),u>0?Object(o.createElement)("ul",null,r.map((e,t)=>Object(o.createElement)("li",{key:t},Object(o.createElement)(O,{label:e.name,id:e.id,remove:i})))):null)},_=e=>{let{filteredList:t,search:c,onSelect:r,instanceId:n,...s}=e;const{messages:u,renderItem:b,selected:d,isSingle:g}=s,h=b||j;return 0===t.length?Object(o.createElement)("div",{className:"woocommerce-search-list__list is-not-found"},Object(o.createElement)("span",{className:"woocommerce-search-list__not-found-icon"},Object(o.createElement)(a.a,{icon:i.a})),Object(o.createElement)("span",{className:"woocommerce-search-list__not-found-text"},c?Object(l.sprintf)(u.noResults,c):u.noItems)):Object(o.createElement)("ul",{className:"woocommerce-search-list__list"},Object(o.createElement)(w,{list:t,selected:d,renderItem:h,onSelect:r,instanceId:n,isSingle:g,search:c}))},y=e=>{const{className:t="",isCompact:c,isHierarchical:r,isLoading:l,isSingle:a,list:i,messages:u=g.a,onChange:h,onSearch:m,selected:p,debouncedSpeak:E}=e,[O,j]=Object(o.useState)(""),w=Object(d.useInstanceId)(y),k=Object(o.useMemo)(()=>({...g.a,...u}),[u]),x=Object(o.useMemo)(()=>Object(g.c)(i,O,r),[i,O,r]);Object(o.useEffect)(()=>{E&&E(k.updated)},[E,k]),Object(o.useEffect)(()=>{"function"==typeof m&&m(O)},[O,m]);const v=Object(o.useCallback)(e=>()=>{a&&h([]);const t=p.findIndex(t=>{let{id:c}=t;return c===e});h([...p.slice(0,t),...p.slice(t+1)])},[a,p,h]),S=Object(o.useCallback)(e=>()=>{-1===p.findIndex(t=>{let{id:c}=t;return c===e.id})?h(a?[e]:[...p,e]):v(e.id)()},[a,v,h,p]);return Object(o.createElement)("div",{className:b()("woocommerce-search-list",t,{"is-compact":c})},Object(o.createElement)(f,n()({},e,{onRemove:v,messages:k})),Object(o.createElement)("div",{className:"woocommerce-search-list__search"},Object(o.createElement)(s.TextControl,{label:k.search,type:"search",value:O,onChange:e=>j(e)})),l?Object(o.createElement)("div",{className:"woocommerce-search-list__list is-loading"},Object(o.createElement)(s.Spinner,null)):Object(o.createElement)(_,n()({},e,{search:O,filteredList:x,messages:k,onSelect:S,instanceId:w})))};Object(s.withSpokenMessages)(y)},102:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(3);t.a=e=>{let{value:t,setAttributes:c}=e;return Object(r.createElement)(o.SelectControl,{label:Object(n.__)("Order products by","woo-gutenberg-products-block"),value:t,options:[{label:Object(n.__)("Newness - newest first","woo-gutenberg-products-block"),value:"date"},{label:Object(n.__)("Price - low to high","woo-gutenberg-products-block"),value:"price_asc"},{label:Object(n.__)("Price - high to low","woo-gutenberg-products-block"),value:"price_desc"},{label:Object(n.__)("Rating - highest first","woo-gutenberg-products-block"),value:"rating"},{label:Object(n.__)("Sales - most first","woo-gutenberg-products-block"),value:"popularity"},{label:Object(n.__)("Title - alphabetical","woo-gutenberg-products-block"),value:"title"},{label:Object(n.__)("Menu Order","woo-gutenberg-products-block"),value:"menu_order"}],onChange:e=>c({orderby:e})})}},11:function(e,t){e.exports=window.wp.compose},12:function(e,t){e.exports=window.wp.primitives},14:function(e,t){e.exports=window.wp.apiFetch},151:function(e,t,c){"use strict";c.d(t,"a",(function(){return n}));var r=c(0);const n=Object(r.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 230 250",style:{width:"100%"}},Object(r.createElement)("title",null,"Grid Block Preview"),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:".162",y:".779",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"9.216",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"1.565",y:"101.448",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:".162",y:"136.277",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"9.216",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"1.565",y:"236.946",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:"82.478",y:".779",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"91.532",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"83.882",y:"101.448",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:"82.478",y:"136.277",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"91.532",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"83.882",y:"236.946",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:"164.788",y:".779",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"173.843",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"166.192",y:"101.448",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"65.374",height:"65.374",x:"164.788",y:"136.277",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"47.266",height:"5.148",x:"173.843",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),Object(r.createElement)("rect",{width:"62.8",height:"15",x:"166.192",y:"236.946",fill:"#E1E3E6",rx:"5"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"13.283",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"21.498",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"29.713",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"37.927",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"46.238",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"95.599",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"103.814",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"112.029",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"120.243",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"128.554",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"177.909",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"186.124",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"194.339",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"202.553",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"210.864",y:"86.301",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"13.283",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"21.498",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"29.713",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"37.927",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"46.238",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"95.599",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"103.814",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"112.029",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"120.243",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"128.554",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"177.909",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"186.124",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"194.339",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"202.553",y:"221.798",fill:"#E1E3E6",rx:"3"}),Object(r.createElement)("rect",{width:"6.177",height:"6.177",x:"210.864",y:"221.798",fill:"#E1E3E6",rx:"3"}))},16:function(e,t){e.exports=window.wp.url},18:function(e,t){e.exports=window.wp.htmlEntities},19:function(e,t,c){"use strict";c.d(t,"a",(function(){return l})),c.d(t,"c",(function(){return a})),c.d(t,"d",(function(){return i})),c.d(t,"b",(function(){return u}));var r=c(0),n=c(8),o=c(1);const l={clear:Object(o.__)("Clear all selected items","woo-gutenberg-products-block"),noItems:Object(o.__)("No items found.","woo-gutenberg-products-block"),
/* Translators: %s search term */
noResults:Object(o.__)("No results for %s","woo-gutenberg-products-block"),search:Object(o.__)("Search for items","woo-gutenberg-products-block"),selected:e=>Object(o.sprintf)(
/* translators: Number of items selected from list. */
Object(o._n)("%d item selected","%d items selected",e,"woo-gutenberg-products-block"),e),updated:Object(o.__)("Search results updated.","woo-gutenberg-products-block")},s=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;const c=Object(n.groupBy)(e,"parent"),r=Object(n.keyBy)(t,"id"),o=["0"],l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!e.parent)return e.name?[e.name]:[];const t=l(r[e.parent]);return[...t,e.name]},s=e=>e.map(e=>{const t=c[e.id];return o.push(""+e.id),{...e,breadcrumbs:l(r[e.parent]),children:t&&t.length?s(t):[]}}),a=s(c[0]||[]);return Object.entries(c).forEach(e=>{let[t,c]=e;o.includes(t)||a.push(...s(c||[]))}),a},a=(e,t,c)=>{if(!t)return c?s(e):e;const r=new RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"i"),n=e.map(e=>!!r.test(e.name)&&e).filter(Boolean);return c?s(n,e):n},i=(e,t)=>{if(!t)return e;const c=new RegExp(`(${t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"ig");return e.split(c).map((e,t)=>c.test(e)?Object(r.createElement)("strong",{key:t},e):Object(r.createElement)(r.Fragment,{key:t},e))},u=e=>1===e.length?e.slice(0,1).toString():2===e.length?e.slice(0,1).toString()+" › "+e.slice(-1).toString():e.slice(0,1).toString()+" … "+e.slice(-1).toString()},2:function(e,t){e.exports=window.wc.wcSettings},20:function(e,t,c){"use strict";c.d(t,"n",(function(){return o})),c.d(t,"l",(function(){return l})),c.d(t,"k",(function(){return s})),c.d(t,"m",(function(){return a})),c.d(t,"i",(function(){return i})),c.d(t,"e",(function(){return u})),c.d(t,"f",(function(){return b})),c.d(t,"j",(function(){return d})),c.d(t,"c",(function(){return g})),c.d(t,"d",(function(){return h})),c.d(t,"g",(function(){return m})),c.d(t,"a",(function(){return p})),c.d(t,"h",(function(){return E})),c.d(t,"b",(function(){return O}));var r,n=c(2);const o=Object(n.getSetting)("wcBlocksConfig",{buildPhase:1,pluginUrl:"",productCount:0,defaultAvatar:"",restApiRoutes:{},wordCountType:"words"}),l=o.pluginUrl+"images/",s=o.pluginUrl+"build/",a=o.buildPhase,i=null===(r=n.STORE_PAGES.shop)||void 0===r?void 0:r.permalink,u=n.STORE_PAGES.checkout.id,b=(n.STORE_PAGES.checkout.permalink,n.STORE_PAGES.privacy.permalink),d=(n.STORE_PAGES.privacy.title,n.STORE_PAGES.terms.permalink),g=(n.STORE_PAGES.terms.title,n.STORE_PAGES.cart.id),h=n.STORE_PAGES.cart.permalink,m=(n.STORE_PAGES.myaccount.permalink?n.STORE_PAGES.myaccount.permalink:Object(n.getSetting)("wpLoginUrl","/wp-login.php"),Object(n.getSetting)("shippingCountries",{})),p=Object(n.getSetting)("allowedCountries",{}),E=Object(n.getSetting)("shippingStates",{}),O=Object(n.getSetting)("allowedStates",{})},27:function(e,t,c){"use strict";c.d(t,"h",(function(){return i})),c.d(t,"e",(function(){return u})),c.d(t,"b",(function(){return b})),c.d(t,"i",(function(){return d})),c.d(t,"f",(function(){return g})),c.d(t,"c",(function(){return h})),c.d(t,"d",(function(){return m})),c.d(t,"g",(function(){return p})),c.d(t,"a",(function(){return E}));var r=c(16),n=c(14),o=c.n(n),l=c(8),s=c(2),a=c(20);const i=e=>{let{selected:t=[],search:c="",queryArgs:n={}}=e;const s=(e=>{let{selected:t=[],search:c="",queryArgs:n={}}=e;const o=a.n.productCount>100,l={per_page:o?100:0,catalog_visibility:"any",search:c,orderby:"title",order:"asc"},s=[Object(r.addQueryArgs)("/wc/store/v1/products",{...l,...n})];return o&&t.length&&s.push(Object(r.addQueryArgs)("/wc/store/v1/products",{catalog_visibility:"any",include:t,per_page:0})),s})({selected:t,search:c,queryArgs:n});return Promise.all(s.map(e=>o()({path:e}))).then(e=>Object(l.uniqBy)(Object(l.flatten)(e),"id").map(e=>({...e,parent:0}))).catch(e=>{throw e})},u=e=>o()({path:"/wc/store/v1/products/"+e}),b=()=>o()({path:"wc/store/v1/products/attributes"}),d=e=>o()({path:`wc/store/v1/products/attributes/${e}/terms`}),g=e=>{let{selected:t=[],search:c}=e;const n=(e=>{let{selected:t=[],search:c}=e;const n=Object(s.getSetting)("limitTags",!1),o=[Object(r.addQueryArgs)("wc/store/v1/products/tags",{per_page:n?100:0,orderby:n?"count":"name",order:n?"desc":"asc",search:c})];return n&&t.length&&o.push(Object(r.addQueryArgs)("wc/store/v1/products/tags",{include:t})),o})({selected:t,search:c});return Promise.all(n.map(e=>o()({path:e}))).then(e=>Object(l.uniqBy)(Object(l.flatten)(e),"id"))},h=e=>o()({path:Object(r.addQueryArgs)("wc/store/v1/products/categories",{per_page:0,...e})}),m=e=>o()({path:"wc/store/v1/products/categories/"+e}),p=e=>o()({path:Object(r.addQueryArgs)("wc/store/v1/products",{per_page:0,type:"variation",parent:e})}),E=(e,t)=>{if(!e.title.raw)return e.slug;const c=1===t.filter(t=>t.title.raw===e.title.raw).length;return e.title.raw+(c?"":" - "+e.slug)}},295:function(e){e.exports=JSON.parse('{"name":"woocommerce/product-tag","title":"Products by Tag","category":"woocommerce","keywords":["WooCommerce"],"description":"Display a grid of products with selected tags.","supports":{"align":["wide","full"],"html":false},"attributes":{"columns":{"type":"number","default":3},"rows":{"type":"number","default":3},"alignButtons":{"type":"boolean","default":false},"contentVisibility":{"type":"object","default":{"image":true,"title":true,"price":true,"rating":true,"button":true},"properties":{"image":{"type":"boolean","default":true},"title":{"type":"boolean","default":true},"price":{"type":"boolean","default":true},"rating":{"type":"boolean","default":true},"button":{"type":"boolean","default":true}}},"tags":{"type":"array","default":[]},"tagOperator":{"type":"string","default":"any"},"orderby":{"type":"string","default":"date"},"isPreview":{"type":"boolean","default":false},"stockStatus":{"type":"array"}},"example":{"attributes":{"isPreview":true}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}')},3:function(e,t){e.exports=window.wp.components},314:function(e,t){},37:function(e,t,c){"use strict";c.d(t,"a",(function(){return s}));var r=c(6),n=c.n(r),o=c(0),l=c(19);const s=e=>{let{countLabel:t,className:c,depth:r=0,controlId:s="",item:a,isSelected:i,isSingle:u,onSelect:b,search:d="",...g}=e;const h=null!=t&&void 0!==a.count&&null!==a.count,m=[c,"woocommerce-search-list__item"];m.push("depth-"+r),u&&m.push("is-radio-button"),h&&m.push("has-count");const p=a.breadcrumbs&&a.breadcrumbs.length,E=g.name||"search-list-item-"+s,O=`${E}-${a.id}`;return Object(o.createElement)("label",{htmlFor:O,className:m.join(" ")},u?Object(o.createElement)("input",n()({type:"radio",id:O,name:E,value:a.value,onChange:b(a),checked:i,className:"woocommerce-search-list__item-input"},g)):Object(o.createElement)("input",n()({type:"checkbox",id:O,name:E,value:a.value,onChange:b(a),checked:i,className:"woocommerce-search-list__item-input"},g)),Object(o.createElement)("span",{className:"woocommerce-search-list__item-label"},p?Object(o.createElement)("span",{className:"woocommerce-search-list__item-prefix"},Object(l.b)(a.breadcrumbs)):null,Object(o.createElement)("span",{className:"woocommerce-search-list__item-name"},Object(l.d)(a.name,d))),!!h&&Object(o.createElement)("span",{className:"woocommerce-search-list__item-count"},t||a.count))};t.b=s},375:function(e,t,c){e.exports=c(488)},376:function(e,t){},488:function(e,t,c){"use strict";c.r(t);var r=c(0),n=c(9),o=c(2),l=c(79),s=c(523),a=(c(314),c(295)),i=c(5),u=c(1),b=c(57),d=c.n(b),g=c(3),h=c(63),m=c(64),p=c(6),E=c.n(p),O=c(8),j=c(37),w=c(101),f=c(4),_=c.n(f),y=c(27);c(376);class k extends r.Component{constructor(){super(...arguments),this.state={list:[],loading:!0},this.renderItem=this.renderItem.bind(this),this.debouncedOnSearch=Object(O.debounce)(this.onSearch.bind(this),400)}componentDidMount(){const{selected:e}=this.props;Object(y.f)({selected:e}).then(e=>{this.setState({list:e,loading:!1})}).catch(()=>{this.setState({list:[],loading:!1})})}onSearch(e){const{selected:t}=this.props;this.setState({loading:!0}),Object(y.f)({selected:t,search:e}).then(e=>{this.setState({list:e,loading:!1})}).catch(()=>{this.setState({list:[],loading:!1})})}renderItem(e){const{item:t,search:c,depth:n=0}=e,o=t.breadcrumbs.length?`${t.breadcrumbs.join(", ")}, ${t.name}`:t.name;return Object(r.createElement)(j.a,E()({className:_()("woocommerce-product-tags__item","has-count",{"is-searching":c.length>0,"is-skip-level":0===n&&0!==t.parent})},e,{"aria-label":Object(u.sprintf)(
/* translators: %1$d is the count of products, %2$s is the name of the tag. */
Object(u._n)("%1$d product tagged as %2$s","%1$d products tagged as %2$s",t.count,"woo-gutenberg-products-block"),t.count,o)}))}render(){const{list:e,loading:t}=this.state,{isCompact:c,onChange:n,onOperatorChange:l,operator:s,selected:a}=this.props,i={clear:Object(u.__)("Clear all product tags","woo-gutenberg-products-block"),list:Object(u.__)("Product Tags","woo-gutenberg-products-block"),noItems:Object(u.__)("You have not set up any product tags on your store.","woo-gutenberg-products-block"),search:Object(u.__)("Search for product tags","woo-gutenberg-products-block"),selected:e=>Object(u.sprintf)(
/* translators: %d is the count of selected tags. */
Object(u._n)("%d tag selected","%d tags selected",e,"woo-gutenberg-products-block"),e),updated:Object(u.__)("Tag search results updated.","woo-gutenberg-products-block")},b=Object(o.getSetting)("limitTags",!1);return Object(r.createElement)(r.Fragment,null,Object(r.createElement)(w.a,{className:"woocommerce-product-tags",list:e,isLoading:t,selected:a.map(t=>e.find(e=>e.id===t)).filter(Boolean),onChange:n,onSearch:b?this.debouncedOnSearch:null,renderItem:this.renderItem,messages:i,isCompact:c,isHierarchical:!0}),!!l&&Object(r.createElement)("div",{hidden:a.length<2},Object(r.createElement)(g.SelectControl,{className:"woocommerce-product-tags__operator",label:Object(u.__)("Display products matching","woo-gutenberg-products-block"),help:Object(u.__)("Pick at least two tags to use this setting.","woo-gutenberg-products-block"),value:s,onChange:l,options:[{label:Object(u.__)("Any selected tags","woo-gutenberg-products-block"),value:"any"},{label:Object(u.__)("All selected tags","woo-gutenberg-products-block"),value:"all"}]})))}}k.defaultProps={isCompact:!1,operator:"any"};var x=k,v=c(102),S=c(81),C=c(151);class P extends r.Component{constructor(){super(...arguments),this.state={changedAttributes:{},isEditing:!1},this.startEditing=this.startEditing.bind(this),this.stopEditing=this.stopEditing.bind(this),this.setChangedAttributes=this.setChangedAttributes.bind(this),this.save=this.save.bind(this)}componentDidMount(){const{attributes:e}=this.props;e.tags.length||this.setState({isEditing:!0})}startEditing(){this.setState({isEditing:!0,changedAttributes:{}})}stopEditing(){this.setState({isEditing:!1,changedAttributes:{}})}setChangedAttributes(e){this.setState(t=>({changedAttributes:{...t.changedAttributes,...e}}))}save(){const{changedAttributes:e}=this.state,{setAttributes:t}=this.props;t(e),this.stopEditing()}getInspectorControls(){const{attributes:e,setAttributes:t}=this.props,{isEditing:c}=this.state,{columns:n,tagOperator:l,contentVisibility:s,orderby:a,rows:b,alignButtons:d,stockStatus:p}=e;return Object(r.createElement)(i.InspectorControls,{key:"inspector"},Object(r.createElement)(g.PanelBody,{title:Object(u.__)("Product Tag","woo-gutenberg-products-block"),initialOpen:!e.tags.length&&!c},Object(r.createElement)(x,{selected:e.tags,onChange:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];const c=e.map(e=>{let{id:t}=e;return t});t({tags:c})},operator:l,onOperatorChange:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"any";return t({tagOperator:e})},isCompact:!0})),Object(r.createElement)(g.PanelBody,{title:Object(u.__)("Layout","woo-gutenberg-products-block"),initialOpen:!0},Object(r.createElement)(m.a,{columns:n,rows:b,alignButtons:d,setAttributes:t,minColumns:Object(o.getSetting)("min_columns",1),maxColumns:Object(o.getSetting)("max_columns",6),minRows:Object(o.getSetting)("min_rows",1),maxRows:Object(o.getSetting)("max_rows",6)})),Object(r.createElement)(g.PanelBody,{title:Object(u.__)("Content","woo-gutenberg-products-block"),initialOpen:!0},Object(r.createElement)(h.a,{settings:s,onChange:e=>t({contentVisibility:e})})),Object(r.createElement)(g.PanelBody,{title:Object(u.__)("Order By","woo-gutenberg-products-block"),initialOpen:!1},Object(r.createElement)(v.a,{setAttributes:t,value:a})),Object(r.createElement)(g.PanelBody,{title:Object(u.__)("Filter by stock status","woo-gutenberg-products-block"),initialOpen:!1},Object(r.createElement)(S.a,{setAttributes:t,value:p})))}renderEditMode(){var e=this;const{attributes:t,debouncedSpeak:c}=this.props,{changedAttributes:n}=this.state,o={...t,...n};return Object(r.createElement)(g.Placeholder,{icon:Object(r.createElement)(l.a,{icon:s.a,className:"block-editor-block-icon"}),label:Object(u.__)("Products by Tag","woo-gutenberg-products-block"),className:"wc-block-products-grid wc-block-product-tag"},Object(u.__)("Display a grid of products from your selected tags.","woo-gutenberg-products-block"),Object(r.createElement)("div",{className:"wc-block-product-tag__selection"},Object(r.createElement)(x,{selected:o.tags,onChange:function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];const c=t.map(e=>{let{id:t}=e;return t});e.setChangedAttributes({tags:c})},operator:o.tagOperator,onOperatorChange:function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"any";return e.setChangedAttributes({tagOperator:t})}}),Object(r.createElement)(g.Button,{isPrimary:!0,onClick:()=>{this.save(),c(Object(u.__)("Showing Products by Tag block preview.","woo-gutenberg-products-block"))}},Object(u.__)("Done","woo-gutenberg-products-block")),Object(r.createElement)(g.Button,{className:"wc-block-product-tag__cancel-button",isTertiary:!0,onClick:()=>{this.stopEditing(),c(Object(u.__)("Showing Products by Tag block preview.","woo-gutenberg-products-block"))}},Object(u.__)("Cancel","woo-gutenberg-products-block"))))}renderViewMode(){const{attributes:e,name:t}=this.props,c=e.tags.length;return Object(r.createElement)(g.Disabled,null,c?Object(r.createElement)(d.a,{block:t,attributes:e}):Object(r.createElement)(g.Placeholder,{icon:Object(r.createElement)(l.a,{icon:s.a,className:"block-editor-block-icon"}),label:Object(u.__)("Products by Tag","woo-gutenberg-products-block"),className:"wc-block-products-grid wc-block-product-tag"},Object(u.__)("This block displays products from selected tags. Select at least one tag to display its products.","woo-gutenberg-products-block")))}render(){const{isEditing:e}=this.state,{attributes:t}=this.props;return t.isPreview?C.a:Object(o.getSetting)("hasTags",!0)?Object(r.createElement)(r.Fragment,null,Object(r.createElement)(i.BlockControls,null,Object(r.createElement)(g.ToolbarGroup,{controls:[{icon:"edit",title:Object(u.__)("Edit selected tags","woo-gutenberg-products-block"),onClick:()=>e?this.stopEditing():this.startEditing(),isActive:e}]})),this.getInspectorControls(),e?this.renderEditMode():this.renderViewMode()):Object(r.createElement)(g.Placeholder,{icon:Object(r.createElement)(l.a,{icon:s.a,className:"block-editor-block-icon"}),label:Object(u.__)("Products by Tag","woo-gutenberg-products-block"),className:"wc-block-products-grid wc-block-product-tag"},Object(u.__)("This block displays products from selected tags. To use it you first need to create products and assign tags to them.","woo-gutenberg-products-block"))}}var A=Object(g.withSpokenMessages)(P);Object(n.registerBlockType)(a,{icon:{src:Object(r.createElement)(l.a,{icon:s.a,className:"wc-block-editor-components-block-icon"})},attributes:{...a.attributes,columns:{type:"number",default:Object(o.getSetting)("default_columns",3)},rows:{type:"number",default:Object(o.getSetting)("default_rows",3)},tags:{type:"array",default:[]},stockStatus:{type:"array",default:Object.keys(Object(o.getSetting)("stockStatusOptions",[]))}},edit:e=>{const t=Object(i.useBlockProps)();return Object(r.createElement)("div",t,Object(r.createElement)(A,e))},save:()=>null})},5:function(e,t){e.exports=window.wp.blockEditor},57:function(e,t){e.exports=window.wp.serverSideRender},63:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(3);t.a=e=>{let{onChange:t,settings:c}=e;const{image:l,button:s,price:a,rating:i,title:u}=c,b=!1!==l;return Object(r.createElement)(r.Fragment,null,Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Product image","woo-gutenberg-products-block"),checked:b,onChange:()=>t({...c,image:!b})}),Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Product title","woo-gutenberg-products-block"),checked:u,onChange:()=>t({...c,title:!u})}),Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Product price","woo-gutenberg-products-block"),checked:a,onChange:()=>t({...c,price:!a})}),Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Product rating","woo-gutenberg-products-block"),checked:i,onChange:()=>t({...c,rating:!i})}),Object(r.createElement)(o.ToggleControl,{label:Object(n.__)("Add to Cart button","woo-gutenberg-products-block"),checked:s,onChange:()=>t({...c,button:!s})}))}},64:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(8),l=c(3);t.a=e=>{let{columns:t,rows:c,setAttributes:s,alignButtons:a,minColumns:i=1,maxColumns:u=6,minRows:b=1,maxRows:d=6}=e;return Object(r.createElement)(r.Fragment,null,Object(r.createElement)(l.RangeControl,{label:Object(n.__)("Columns","woo-gutenberg-products-block"),value:t,onChange:e=>{const t=Object(o.clamp)(e,i,u);s({columns:Number.isNaN(t)?"":t})},min:i,max:u}),Object(r.createElement)(l.RangeControl,{label:Object(n.__)("Rows","woo-gutenberg-products-block"),value:c,onChange:e=>{const t=Object(o.clamp)(e,b,d);s({rows:Number.isNaN(t)?"":t})},min:b,max:d}),Object(r.createElement)(l.ToggleControl,{label:Object(n.__)("Align the last block to the bottom","woo-gutenberg-products-block"),help:a?Object(n.__)("Align the last block to the bottom.","woo-gutenberg-products-block"):Object(n.__)("The last inner block will follow other content.","woo-gutenberg-products-block"),checked:a,onChange:()=>s({alignButtons:!a})}))}},8:function(e,t){e.exports=window.lodash},81:function(e,t,c){"use strict";var r=c(0),n=c(1),o=c(2),l=c(3);const s=Object(o.getSetting)("hideOutOfStockItems",!1),a=Object(o.getSetting)("stockStatusOptions",{});t.a=e=>{let{value:t,setAttributes:c}=e;const{outofstock:o,...i}=a,u=s?i:a,b=Object.entries(u).map(e=>{let[t,c]=e;return{value:t,label:c}}).filter(e=>!!e.label),[d,g]=Object(r.useState)(t);Object(r.useEffect)(()=>{c({stockStatus:["",...d]})},[d,c]);const h=Object(r.useCallback)(e=>{const t=d.includes(e),c=d.filter(t=>t!==e);t||(c.push(e),c.sort()),g(c)},[d]);return Object(r.createElement)(r.Fragment,null,b.map(e=>{const t=d.includes(e.value)?
/* translators: %s stock status. */
Object(n.__)('Stock status "%s" visible.',"woo-gutenberg-products-block"):
/* translators: %s stock status. */
Object(n.__)('Stock status "%s" hidden.',"woo-gutenberg-products-block");return Object(r.createElement)(l.ToggleControl,{label:e.label,key:e.value,help:Object(n.sprintf)(t,e.label),checked:d.includes(e.value),onChange:()=>h(e.value)})}))}},9:function(e,t){e.exports=window.wp.blocks}});