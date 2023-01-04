this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["product-query"]=function(e){function t(t){for(var r,u,a=t[0],i=t[1],s=t[2],b=0,d=[];b<a.length;b++)u=a[b],Object.prototype.hasOwnProperty.call(c,u)&&c[u]&&d.push(c[u][0]),c[u]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(l&&l(t);d.length;)d.shift()();return n.push.apply(n,s||[]),o()}function o(){for(var e,t=0;t<n.length;t++){for(var o=n[t],r=!0,a=1;a<o.length;a++){var i=o[a];0!==c[i]&&(r=!1)}r&&(n.splice(t--,1),e=u(u.s=o[0]))}return e}var r={},c={30:0},n=[];function u(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,u),o.l=!0,o.exports}u.m=e,u.c=r,u.d=function(e,t,o){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(u.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(o,r,function(t){return e[t]}.bind(null,r));return o},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="";var a=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],i=a.push.bind(a);a.push=t,a=a.slice();for(var s=0;s<a.length;s++)t(a[s]);var l=i;return n.push([461,0]),o()}({0:function(e,t){e.exports=window.wp.element},1:function(e,t){e.exports=window.wp.i18n},113:function(e,t,o){"use strict";o.d(t,"c",(function(){return a})),o.d(t,"b",(function(){return i})),o.d(t,"a",(function(){return s}));var r=o(0),c=o(1),n=o(79),u=o(341);const a=Object(c.__)("Product Summary","woo-gutenberg-products-block"),i=Object(r.createElement)(n.a,{icon:u.a,className:"wc-block-editor-components-block-icon"}),s=Object(c.__)("Display a short description about a product.","woo-gutenberg-products-block")},115:function(e,t,o){"use strict";o.d(t,"a",(function(){return s})),o.d(t,"b",(function(){return l}));var r=o(0),c=o(1),n=o(79),u=o(301),a=o(230);o(203);const i=e=>{let{text:t,title:o=Object(c.__)("Feedback?","woo-gutenberg-products-block"),url:i="https://ideas.woocommerce.com/forums/133476-woocommerce?category_id=384565"}=e;const[s,l]=Object(r.useState)(!1);return Object(r.useEffect)(()=>{l(!0)},[]),s&&Object(r.createElement)("div",{className:"wc-block-feedback-prompt"},Object(r.createElement)(n.a,{icon:u.a}),Object(r.createElement)("h2",{className:"wc-block-feedback-prompt__title"},o),Object(r.createElement)("p",{className:"wc-block-feedback-prompt__text"},t),Object(r.createElement)("a",{href:i,className:"wc-block-feedback-prompt__link",rel:"noreferrer noopener",target:"_blank"},Object(c.__)("Give us your feedback.","woo-gutenberg-products-block"),Object(r.createElement)(n.a,{icon:a.a,size:16})))},s=()=>Object(r.createElement)(i,{text:Object(c.__)("We are currently working on improving our cart and checkout blocks to provide merchants with the tools and customization options they need.","woo-gutenberg-products-block"),url:"https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/new?template=--cart-checkout-feedback.md"}),l=()=>Object(r.createElement)(i,{text:Object(c.__)("Thanks for trying out the Products block! Help us make it better by sharing your feedback.","woo-gutenberg-products-block"),title:Object(c.__)("Share your feedback!","woo-gutenberg-products-block"),url:"https://airtable.com/shrFX5FAqmCY6hVYI"})},116:function(e,t,o){"use strict";o.d(t,"c",(function(){return a})),o.d(t,"b",(function(){return i})),o.d(t,"a",(function(){return s}));var r=o(0),c=o(1),n=o(79),u=o(340);const a=Object(c.__)("Product Title","woo-gutenberg-products-block"),i=Object(r.createElement)(n.a,{icon:u.a,className:"wc-block-editor-components-block-icon"}),s=Object(c.__)("Display the title of a product.","woo-gutenberg-products-block")},12:function(e,t){e.exports=window.wp.primitives},14:function(e,t){e.exports=window.wp.apiFetch},16:function(e,t){e.exports=window.wp.url},2:function(e,t){e.exports=window.wc.wcSettings},20:function(e,t,o){"use strict";o.d(t,"n",(function(){return n})),o.d(t,"l",(function(){return u})),o.d(t,"k",(function(){return a})),o.d(t,"m",(function(){return i})),o.d(t,"i",(function(){return s})),o.d(t,"e",(function(){return l})),o.d(t,"f",(function(){return b})),o.d(t,"j",(function(){return d})),o.d(t,"c",(function(){return p})),o.d(t,"d",(function(){return m})),o.d(t,"g",(function(){return g})),o.d(t,"a",(function(){return w})),o.d(t,"h",(function(){return f})),o.d(t,"b",(function(){return _}));var r,c=o(2);const n=Object(c.getSetting)("wcBlocksConfig",{buildPhase:1,pluginUrl:"",productCount:0,defaultAvatar:"",restApiRoutes:{},wordCountType:"words"}),u=n.pluginUrl+"images/",a=n.pluginUrl+"build/",i=n.buildPhase,s=null===(r=c.STORE_PAGES.shop)||void 0===r?void 0:r.permalink,l=c.STORE_PAGES.checkout.id,b=(c.STORE_PAGES.checkout.permalink,c.STORE_PAGES.privacy.permalink),d=(c.STORE_PAGES.privacy.title,c.STORE_PAGES.terms.permalink),p=(c.STORE_PAGES.terms.title,c.STORE_PAGES.cart.id),m=c.STORE_PAGES.cart.permalink,g=(c.STORE_PAGES.myaccount.permalink?c.STORE_PAGES.myaccount.permalink:Object(c.getSetting)("wpLoginUrl","/wp-login.php"),Object(c.getSetting)("shippingCountries",{})),w=Object(c.getSetting)("allowedCountries",{}),f=Object(c.getSetting)("shippingStates",{}),_=Object(c.getSetting)("allowedStates",{})},203:function(e,t){},27:function(e,t,o){"use strict";o.d(t,"h",(function(){return s})),o.d(t,"e",(function(){return l})),o.d(t,"b",(function(){return b})),o.d(t,"i",(function(){return d})),o.d(t,"f",(function(){return p})),o.d(t,"c",(function(){return m})),o.d(t,"d",(function(){return g})),o.d(t,"g",(function(){return w})),o.d(t,"a",(function(){return f}));var r=o(16),c=o(14),n=o.n(c),u=o(8),a=o(2),i=o(20);const s=e=>{let{selected:t=[],search:o="",queryArgs:c={}}=e;const a=(e=>{let{selected:t=[],search:o="",queryArgs:c={}}=e;const n=i.n.productCount>100,u={per_page:n?100:0,catalog_visibility:"any",search:o,orderby:"title",order:"asc"},a=[Object(r.addQueryArgs)("/wc/store/v1/products",{...u,...c})];return n&&t.length&&a.push(Object(r.addQueryArgs)("/wc/store/v1/products",{catalog_visibility:"any",include:t,per_page:0})),a})({selected:t,search:o,queryArgs:c});return Promise.all(a.map(e=>n()({path:e}))).then(e=>Object(u.uniqBy)(Object(u.flatten)(e),"id").map(e=>({...e,parent:0}))).catch(e=>{throw e})},l=e=>n()({path:"/wc/store/v1/products/"+e}),b=()=>n()({path:"wc/store/v1/products/attributes"}),d=e=>n()({path:`wc/store/v1/products/attributes/${e}/terms`}),p=e=>{let{selected:t=[],search:o}=e;const c=(e=>{let{selected:t=[],search:o}=e;const c=Object(a.getSetting)("limitTags",!1),n=[Object(r.addQueryArgs)("wc/store/v1/products/tags",{per_page:c?100:0,orderby:c?"count":"name",order:c?"desc":"asc",search:o})];return c&&t.length&&n.push(Object(r.addQueryArgs)("wc/store/v1/products/tags",{include:t})),n})({selected:t,search:o});return Promise.all(c.map(e=>n()({path:e}))).then(e=>Object(u.uniqBy)(Object(u.flatten)(e),"id"))},m=e=>n()({path:Object(r.addQueryArgs)("wc/store/v1/products/categories",{per_page:0,...e})}),g=e=>n()({path:"wc/store/v1/products/categories/"+e}),w=e=>n()({path:Object(r.addQueryArgs)("wc/store/v1/products",{per_page:0,type:"variation",parent:e})}),f=(e,t)=>{if(!e.title.raw)return e.slug;const o=1===t.filter(t=>t.title.raw===e.title.raw).length;return e.title.raw+(o?"":" - "+e.slug)}},3:function(e,t){e.exports=window.wp.components},43:function(e,t){e.exports=window.wp.hooks},461:function(e,t,o){e.exports=o(471)},462:function(e,t){},463:function(e,t){},471:function(e,t,o){"use strict";o.r(t);var r=o(43),c=o(56),n=o(116),u=o(9);function a(e,t){let{blockDescription:o,blockIcon:r,blockTitle:c,variationName:n}=t;Object(u.registerBlockVariation)(e,{description:o,name:n,title:c,isActive:e=>e.__woocommerceNamespace===n,icon:{src:r},attributes:{__woocommerceNamespace:n},scope:["block","inserter"]})}Object(c.b)()&&a("core/post-title",{blockDescription:n.a,blockIcon:n.b,blockTitle:n.c,variationName:"woocommerce/product-query/product-title"});var i=o(113);Object(c.b)()&&a("core/post-excerpt",{blockDescription:i.a,blockIcon:i.b,blockTitle:i.c,variationName:"woocommerce/product-query/product-summary"});var s=o(0),l=o(3),b=o(1),d=o(548);Object(c.b)()&&a("core/post-template",{blockDescription:Object(b.__)("Contains the block elements used to render a product, like its name, featured image, rating, and more.","woo-gutenberg-products-block"),blockIcon:Object(s.createElement)(l.Icon,{icon:d.a}),blockTitle:Object(b.__)("Product template","woo-gutenberg-products-block"),variationName:"woocommerce/product-query/product-template"});var p=o(6),m=o.n(p),g=o(5),w=o(7),f=o(115),_=o(2);const O=["attributes","presets","onSale","stockStatus","wooInherit"],k=["taxQuery","search",...O],y=Object(_.getSetting)("stockStatusOptions",[]),h={allowedControls:k,displayLayout:{type:"flex",columns:3},query:{perPage:9,pages:0,offset:0,postType:"product",order:"asc",orderBy:"title",author:"",search:"",exclude:[],sticky:"",inherit:!1,__woocommerceAttributes:[],__woocommerceStockStatus:Object(_.getSetting)("hideOutOfStockItems",!1)?Object.keys(function(e,t){const{[t]:o,...r}=e;return r}(y,"outofstock")):Object.keys(y)}};let j;function v(e,t){const{query:o}=e.attributes;e.setAttributes({query:{...o,...t}})}!function(e){e.PRODUCT_QUERY="woocommerce/product-query"}(j||(j={}));const S=[{key:"title/asc",name:Object(b.__)("Sorted by title","woo-gutenberg-products-block")},{key:"date/desc",name:Object(b.__)("Newest","woo-gutenberg-products-block")},{key:"popularity/desc",name:Object(b.__)("Best Selling","woo-gutenberg-products-block")},{key:"rating/desc",name:Object(b.__)("Top Rated","woo-gutenberg-products-block")}];function E(e){const{query:t}=e.attributes;return Object(s.createElement)(l.PanelBody,{className:"woocommerce-product-query-panel__sort",title:Object(b.__)("Popular Filters","woo-gutenberg-products-block"),initialOpen:!0},Object(s.createElement)("p",null,Object(b.__)("Arrange products by popular pre-sets.","woo-gutenberg-products-block")),Object(s.createElement)(l.CustomSelectControl,{hideLabelFromVision:!0,label:Object(b.__)("Choose among these pre-sets","woo-gutenberg-products-block"),onChange:t=>{var o,r,c;if(null===(o=t.selectedItem)||void 0===o||!o.key)return;const[n,u]=null===(r=t.selectedItem)||void 0===r||null===(c=r.key)||void 0===c?void 0:c.split("/");v(e,{order:u,orderBy:n})},options:S,value:S.find(e=>e.key===`${t.orderBy}/${t.order}`)}))}var x=o(27);o(462);const A=O.map(e=>`__woocommerce${e[0].toUpperCase()}${e.slice(1)}`);function P(e){var t;const o="string"==typeof e?e:e.value;return null===(t=Object.entries(y).find(e=>{let[,t]=e;return t===o}))||void 0===t?void 0:t[0]}const q={attributes:e=>{const{query:t}=e.attributes,{isLoadingAttributes:o,productsAttributes:r}=function(e){const t=Object(_.getSetting)("attributes",[]),[o,r]=Object(s.useState)(!1),[c,n]=Object(s.useState)([]),u=Object(s.useRef)(!1);return Object(s.useEffect)(()=>{if(!o&&!u.current)return async function(){r(!0);for(const e of t){const t=await Object(x.i)(Number(e.attribute_id));n(o=>[...o,{...e,terms:t}])}u.current=!0,r(!1)}(),()=>{u.current=!0}},[t,o,!0]),{isLoadingAttributes:o,productsAttributes:c}}(),c=r.reduce((e,t)=>[...e,...t.terms.map(e=>`${t.attribute_label}: ${e.name}`)],[]);return Object(s.createElement)(l.__experimentalToolsPanelItem,{label:Object(b.__)("Product Attributes","woo-gutenberg-products-block"),hasValue:()=>{var e;return null===(e=t.__woocommerceAttributes)||void 0===e?void 0:e.length}},Object(s.createElement)(l.FormTokenField,{disabled:o,label:Object(b.__)("Product Attributes","woo-gutenberg-products-block"),onChange:t=>{let o;try{o=t.map(e=>function(e,t){const[o,r]=e.split(": "),c=t.find(e=>e.attribute_label===o);if(!c)throw new Error("Product Query Filter: Invalid attribute label");const n=c.terms.find(e=>e.name===r);if(!n)throw new Error("Product Query Filter: Invalid term name");return{taxonomy:"pa_"+c.attribute_name,termId:n.id}}(e="string"==typeof e?e:e.value,r)),v(e,{__woocommerceAttributes:o})}catch(e){}},suggestions:c,validateInput:e=>c.includes(e),value:o?[Object(b.__)("Loading…","woo-gutenberg-products-block")]:(n=t.__woocommerceAttributes,u=r,(null==n?void 0:n.map(e=>{const{taxonomy:t,term:o}=function(e,t){const o=t.find(t=>t.attribute_name===e.taxonomy.slice(3));return{taxonomy:o,term:null==o?void 0:o.terms.find(t=>t.id===e.termId)}}(e,u);return t&&o?`${t.attribute_label}: ${o.name}`:{title:Object(b.__)("Saved taxonomy was perhaps deleted or the slug was changed.","woo-gutenberg-products-block"),value:Object(b.__)("Error with saved taxonomy","woo-gutenberg-products-block"),status:"error"}}))||[]),__experimentalExpandOnFocus:!0}));var n,u},onSale:e=>{const{query:t}=e.attributes;return Object(s.createElement)(l.__experimentalToolsPanelItem,{label:Object(b.__)("Sale status","woo-gutenberg-products-block"),hasValue:()=>t.__woocommerceOnSale},Object(s.createElement)(l.ToggleControl,{label:Object(b.__)("Show only products on sale","woo-gutenberg-products-block"),checked:t.__woocommerceOnSale||!1,onChange:t=>{v(e,{__woocommerceOnSale:t})}}))},stockStatus:e=>{var t;const{query:o}=e.attributes;return Object(s.createElement)(l.__experimentalToolsPanelItem,{label:Object(b.__)("Stock status","woo-gutenberg-products-block"),hasValue:()=>o.__woocommerceStockStatus},Object(s.createElement)(l.FormTokenField,{label:Object(b.__)("Stock status","woo-gutenberg-products-block"),onChange:t=>{const o=t.map(P).filter(Boolean);v(e,{__woocommerceStockStatus:o})},suggestions:Object.values(y),validateInput:e=>Object.values(y).includes(e),value:(null==o||null===(t=o.__woocommerceStockStatus)||void 0===t?void 0:t.map(e=>y[e]))||[],__experimentalExpandOnFocus:!0}))},wooInherit:e=>Object(s.createElement)(l.ToggleControl,{className:"woo-inherit-query-toggle",label:Object(b.__)("Inherit query from template","woo-gutenberg-products-block"),help:Object(b.__)("Toggle to use the global query context that is set with the current template, such as variations of the product catalog or search. Disable to customize the filtering independently.","woo-gutenberg-products-block"),checked:e.attributes.query.inherit||!1,onChange:t=>v(e,{inherit:t})})},C=e=>{const t=function(e){const t=void 0!==Object(w.useSelect)("core/edit-site"),o=Object(w.useSelect)(t=>{var o;return null===(o=t(u.store).getActiveBlockVariation("core/query",e))||void 0===o?void 0:o.allowedControls},[e]);return t?function(e){return e.query.inherit}(e)?o.filter(e=>"wooInherit"===e):o:o.filter(e=>"wooInherit"!==e)}(e.attributes),o=function(e){const t=Object(w.useSelect)(t=>{var o;return null===(o=t("core/blocks").getBlockVariations("core/query").find(t=>t.name===e))||void 0===o?void 0:o.attributes});return t?Object.assign({},...A.map(e=>({[e]:t.query[e]}))):{}}(e.attributes.namespace);return Object(s.createElement)(s.Fragment,null,Object(s.createElement)(g.InspectorControls,null,(null==t?void 0:t.includes("presets"))&&Object(s.createElement)(E,e),Object(s.createElement)(l.__experimentalToolsPanel,{className:"woocommerce-product-query-toolspanel",label:Object(b.__)("Advanced Filters","woo-gutenberg-products-block"),resetAll:()=>{v(e,o)}},Object.entries(q).map(o=>{let[r,c]=o;return null!=t&&t.includes(r)?Object(s.createElement)(c,m()({},e,{key:r})):null}))),Object(s.createElement)(g.InspectorControls,{__experimentalGroup:"color"},Object(s.createElement)(f.b,null)))};Object(r.addFilter)("editor.BlockEdit","core/query",e=>t=>{return"core/query"===(o=t).name&&Object.values(j).includes(o.attributes.namespace)?Object(s.createElement)(s.Fragment,null,Object(s.createElement)(C,t),Object(s.createElement)(e,t)):Object(s.createElement)(e,t);var o}),o(463);var T=o(12),I=Object(s.createElement)(T.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 24 24"},Object(s.createElement)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M4.5 19.375L4.5 7.625C4.5 7.55596 4.55596 7.5 4.625 7.5L16.375 7.5C16.444 7.5 16.5 7.55596 16.5 7.625L16.5 19.375C16.5 19.444 16.444 19.5 16.375 19.5L4.625 19.5C4.55596 19.5 4.5 19.444 4.5 19.375ZM4.625 21C3.72754 21 3 20.2725 3 19.375L3 7.625C3 6.72754 3.72754 6 4.625 6L16.375 6C17.2725 6 18 6.72754 18 7.625L18 19.375C18 20.2725 17.2725 21 16.375 21L4.625 21ZM19 3.75L8 3.75L8 2.25L19 2.25C20.5183 2.25 21.75 3.4796 21.75 4.99891L21.75 18L20.25 18L20.25 4.99891C20.25 4.30909 19.6909 3.75 19 3.75Z"}));Object(u.registerBlockVariation)("core/query",{description:Object(b.__)("A block that displays a selection of products in your store.","woo-gutenberg-products-block"),name:"woocommerce/product-query",
/* translators: “Products“ is the name of the block. */
title:Object(b.__)("Products (Beta)","woo-gutenberg-products-block"),isActive:e=>"woocommerce/product-query"===e.namespace,icon:Object(s.createElement)(l.Icon,{icon:I,className:"wc-block-editor-components-block-icon wc-block-editor-components-block-icon--stacks"}),attributes:{...h,namespace:"woocommerce/product-query"},allowedControls:k,innerBlocks:[["core/post-template",{__woocommerceNamespace:"woocommerce/product-query/product-template"},[["woocommerce/product-image"],["core/post-title",{textAlign:"center",level:3,fontSize:"medium",__woocommerceNamespace:"woocommerce/product-query/product-title"},[]],["woocommerce/product-price",{textAlign:"center",fontSize:"small"},[]],["woocommerce/product-button",{textAlign:"center",fontSize:"small"},[]]]],["core/query-pagination",{layout:{type:"flex",justifyContent:"center"}},[]],["core/query-no-results"]],scope:["inserter"]});const B=["core/post-excerpt","core/post-template","core/post-title"];Object(r.addFilter)("blocks.registerBlockType","core/custom-class-name/attribute",(function(e,t){return B.includes(t)&&(e.attributes={...e.attributes,__woocommerceNamespace:{type:"string"}}),e}))},5:function(e,t){e.exports=window.wp.blockEditor},56:function(e,t,o){"use strict";o.d(t,"c",(function(){return n})),o.d(t,"a",(function(){return u})),o.d(t,"b",(function(){return a}));var r=o(9),c=o(20);const n=(e,t)=>{if(c.m>2)return Object(r.registerBlockType)(e,t)},u=()=>c.m>2,a=()=>c.m>1},7:function(e,t){e.exports=window.wp.data},8:function(e,t){e.exports=window.lodash},9:function(e,t){e.exports=window.wp.blocks}});