this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["product-template"]=function(e){function t(t){for(var n,c,s=t[0],i=t[1],u=t[2],p=0,d=[];p<s.length;p++)c=s[p],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&d.push(r[c][0]),r[c]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);for(a&&a(t);d.length;)d.shift()();return l.push.apply(l,u||[]),o()}function o(){for(var e,t=0;t<l.length;t++){for(var o=l[t],n=!0,s=1;s<o.length;s++){var i=o[s];0!==r[i]&&(n=!1)}n&&(l.splice(t--,1),e=c(c.s=o[0]))}return e}var n={},r={49:0,3:0},l=[];function c(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,c),o.l=!0,o.exports}c.m=e,c.c=n,c.d=function(e,t,o){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(c.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(o,n,function(t){return e[t]}.bind(null,n));return o},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var s=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],i=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var a=i;return l.push([559,0]),o()}({0:function(e,t){e.exports=window.wp.element},1:function(e,t){e.exports=window.wp.i18n},2:function(e,t){e.exports=window.wp.components},3:function(e,t){e.exports=window.wc.wcSettings},4:function(e,t){e.exports=window.wp.blockEditor},407:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"woocommerce/product-template","title":"Product Template","category":"woocommerce","description":"Contains the block elements used to render a product.","keywords":["WooCommerce"],"textdomain":"woo-gutenberg-products-block","usesContext":["queryId","query","queryContext","displayLayout","templateSlug"],"supports":{"inserter":false,"reusable":false,"html":false,"align":["wide","full"],"anchor":true,"__experimentalLayout":{"allowEditing":false},"color":{"gradients":true,"link":true,"__experimentalDefaultControls":{"background":true,"text":true}},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true}}}}')},559:function(e,t,o){e.exports=o(602)},560:function(e,t){},6:function(e,t){e.exports=window.wp.data},602:function(e,t,o){"use strict";o.r(t);var n=o(7),r=o(407),l=o(0),c=o(5),s=o.n(c),i=o(6),u=o(1),a=o(4),p=o(2),d=o(81),b=o(3),f=o(72);const m=()=>{const e=Object(a.useInnerBlocksProps)({className:"wc-block-product"},{__unstableDisableLayoutClassNames:!0});return Object(l.createElement)("li",{...e})},y=Object(l.memo)((({blocks:e,blockContextId:t,isHidden:o,setActiveBlockContextId:n})=>{const r=Object(a.__experimentalUseBlockPreview)({blocks:e,props:{className:"wc-block-product"}}),c=()=>{n(t)},s={display:o?"none":void 0};return Object(l.createElement)("li",{...r,tabIndex:0,role:"button",onClick:c,onKeyPress:c,style:s})}));o(560),Object(n.registerBlockType)(r,{icon:()=>Object(l.createElement)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Object(l.createElement)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4ZM18 5.5H6C5.72386 5.5 5.5 5.72386 5.5 6V9H18.5V6C18.5 5.72386 18.2761 5.5 18 5.5ZM18.5 10.5H10L10 18.5H18C18.2761 18.5 18.5 18.2761 18.5 18V10.5ZM8.5 10.5H5.5V18C5.5 18.2761 5.72386 18.5 6 18.5H8.5L8.5 10.5Z",fill:"#1E1E1E"})),edit:({clientId:e,context:{query:{perPage:t,offset:o=0,order:n,orderBy:r,author:c,search:w,exclude:g,sticky:x,inherit:h,taxQuery:v,parents:k,pages:_,...O},queryContext:j=[{page:1}],templateSlug:C,displayLayout:{type:E,columns:S}={type:"flex",columns:3}},__unstableLayoutClassNames:I})=>{const[{page:P}]=j,[B,H]=Object(l.useState)(),T="product",M=Object(b.getSettingWithCoercion)("loopShopPerPage",12,f.a),{products:L,blocks:N}=Object(i.useSelect)((l=>{const{getEntityRecords:s,getTaxonomies:i}=l(d.store),{getBlocks:u}=l(a.store),p=i({type:T,per_page:-1,context:"view"}),b=h&&(null==C?void 0:C.startsWith("category-"))&&s("taxonomy","category",{context:"view",per_page:1,_fields:["id"],slug:C.replace("category-","")}),f={postType:T,offset:t?t*(P-1)+o:0,order:n,orderby:r};if(v&&!h){const e=Object.entries(v).reduce(((e,[t,o])=>{const n=null==p?void 0:p.find((({slug:e})=>e===t));return null!=n&&n.rest_base&&(e[null==n?void 0:n.rest_base]=o),e}),{});Object.keys(e).length&&Object.assign(f,e)}var m;(t&&(f.per_page=t),c&&(f.author=c),w&&(f.search=w),null!=g&&g.length&&(f.exclude=g),null!=k&&k.length&&(f.parent=k),x&&(f.sticky="only"===x),h)&&(b&&(f.categories=null===(m=b[0])||void 0===m?void 0:m.id),f.per_page=M);return{products:s("postType",T,{...f,...O}),blocks:u(e)}}),[t,P,o,n,r,e,c,w,T,g,x,h,C,v,k,O]),V=Object(l.useMemo)((()=>null==L?void 0:L.map((e=>({postType:e.type,postId:e.id})))),[L]),W="flex"===E&&S>1,q=Object(a.useBlockProps)({className:s()(I,"wc-block-product-template",{"is-flex-container":W,[`columns-${S}`]:W})});return L?L.length?Object(l.createElement)("ul",{...q},V&&V.map((e=>{var t,o;return Object(l.createElement)(a.BlockContextProvider,{key:e.postId,value:e},e.postId===(B||(null===(t=V[0])||void 0===t?void 0:t.postId))?Object(l.createElement)(m,null):null,Object(l.createElement)(y,{blocks:N,blockContextId:e.postId,setActiveBlockContextId:H,isHidden:e.postId===(B||(null===(o=V[0])||void 0===o?void 0:o.postId))}))}))):Object(l.createElement)("p",{...q}," ",Object(u.__)("No results found.","woo-gutenberg-products-block")):Object(l.createElement)("p",{...q},Object(l.createElement)(p.Spinner,null))},save:function(){return Object(l.createElement)(a.InnerBlocks.Content,null)}})},7:function(e,t){e.exports=window.wp.blocks},72:function(e,t,o){"use strict";o.d(t,"a",(function(){return n}));const n=e=>"number"==typeof e},81:function(e,t){e.exports=window.wp.coreData}});