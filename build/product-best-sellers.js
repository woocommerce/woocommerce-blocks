(()=>{var e,t={5132:(e,t,r)=>{"use strict";r.r(t);var l=r(9307),o=r(1984),n=r(9518);const c=window.wp.blocks,a=JSON.parse('{"name":"woocommerce/product-best-sellers","title":"Best Selling Products","category":"woocommerce","keywords":["WooCommerce"],"description":"Display a grid of your all-time best selling products.","supports":{"align":["wide","full"],"html":false},"attributes":{"columns":{"type":"number","default":3},"rows":{"type":"number","default":3},"alignButtons":{"type":"boolean","default":false},"contentVisibility":{"type":"object","default":{"image":true,"title":true,"price":true,"rating":true,"button":true},"properties":{"image":{"type":"boolean","default":true},"title":{"type":"boolean","default":true},"price":{"type":"boolean","default":true},"rating":{"type":"boolean","default":true},"button":{"type":"boolean","default":true}}},"categories":{"type":"array","default":[]},"catOperator":{"type":"string","default":"any"},"isPreview":{"type":"boolean","default":false},"stockStatus":{"type":"array"},"editMode":{"type":"boolean","default":true},"orderby":{"type":"string","enum":["date","popularity","price_asc","price_desc","rating","title","menu_order"],"default":"popularity"}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}'),s=window.wp.blockEditor,i=window.wp.components,d=window.wp.serverSideRender;var m=r.n(d);const u=(0,l.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 230 250",style:{width:"100%"}},(0,l.createElement)("title",null,"Grid Block Preview"),(0,l.createElement)("rect",{width:"65.374",height:"65.374",x:".162",y:".779",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"47.266",height:"5.148",x:"9.216",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),(0,l.createElement)("rect",{width:"62.8",height:"15",x:"1.565",y:"101.448",fill:"#E1E3E6",rx:"5"}),(0,l.createElement)("rect",{width:"65.374",height:"65.374",x:".162",y:"136.277",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"47.266",height:"5.148",x:"9.216",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),(0,l.createElement)("rect",{width:"62.8",height:"15",x:"1.565",y:"236.946",fill:"#E1E3E6",rx:"5"}),(0,l.createElement)("rect",{width:"65.374",height:"65.374",x:"82.478",y:".779",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"47.266",height:"5.148",x:"91.532",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),(0,l.createElement)("rect",{width:"62.8",height:"15",x:"83.882",y:"101.448",fill:"#E1E3E6",rx:"5"}),(0,l.createElement)("rect",{width:"65.374",height:"65.374",x:"82.478",y:"136.277",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"47.266",height:"5.148",x:"91.532",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),(0,l.createElement)("rect",{width:"62.8",height:"15",x:"83.882",y:"236.946",fill:"#E1E3E6",rx:"5"}),(0,l.createElement)("rect",{width:"65.374",height:"65.374",x:"164.788",y:".779",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"47.266",height:"5.148",x:"173.843",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),(0,l.createElement)("rect",{width:"62.8",height:"15",x:"166.192",y:"101.448",fill:"#E1E3E6",rx:"5"}),(0,l.createElement)("rect",{width:"65.374",height:"65.374",x:"164.788",y:"136.277",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"47.266",height:"5.148",x:"173.843",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),(0,l.createElement)("rect",{width:"62.8",height:"15",x:"166.192",y:"236.946",fill:"#E1E3E6",rx:"5"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"13.283",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"21.498",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"29.713",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"37.927",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"46.238",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"95.599",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"103.814",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"112.029",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"120.243",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"128.554",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"177.909",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"186.124",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"194.339",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"202.553",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"210.864",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"13.283",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"21.498",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"29.713",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"37.927",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"46.238",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"95.599",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"103.814",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"112.029",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"120.243",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"128.554",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"177.909",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"186.124",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"194.339",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"202.553",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"210.864",y:"221.798",fill:"#E1E3E6",rx:"3"}));var g=r(5736);const h=(e,t,r)=>r?Math.min(e,t)===e?t:Math.max(e,r)===e?r:e:Math.max(e,t)===t?e:t,E=({columns:e,rows:t,setAttributes:r,alignButtons:o,minColumns:n=1,maxColumns:c=6,minRows:a=1,maxRows:s=6})=>(0,l.createElement)(l.Fragment,null,(0,l.createElement)(i.RangeControl,{label:(0,g.__)("Columns","woo-gutenberg-products-block"),value:e,onChange:e=>{const t=h(e,n,c);r({columns:Number.isNaN(t)?"":t})},min:n,max:c}),(0,l.createElement)(i.RangeControl,{label:(0,g.__)("Rows","woo-gutenberg-products-block"),value:t,onChange:e=>{const t=h(e,a,s);r({rows:Number.isNaN(t)?"":t})},min:a,max:s}),(0,l.createElement)(i.ToggleControl,{label:(0,g.__)("Align the last block to the bottom","woo-gutenberg-products-block"),help:o?(0,g.__)("Align the last block to the bottom.","woo-gutenberg-products-block"):(0,g.__)("The last inner block will follow other content.","woo-gutenberg-products-block"),checked:o,onChange:()=>r({alignButtons:!o})})),p=window.wc.wcSettings,w=({onChange:e,settings:t})=>{const{image:r,button:o,price:n,rating:c,title:a}=t,s=!1!==r;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(i.ToggleControl,{label:(0,g.__)("Product image","woo-gutenberg-products-block"),checked:s,onChange:()=>e({...t,image:!s})}),(0,l.createElement)(i.ToggleControl,{label:(0,g.__)("Product title","woo-gutenberg-products-block"),checked:a,onChange:()=>e({...t,title:!a})}),(0,l.createElement)(i.ToggleControl,{label:(0,g.__)("Product price","woo-gutenberg-products-block"),checked:n,onChange:()=>e({...t,price:!n})}),(0,l.createElement)(i.ToggleControl,{label:(0,g.__)("Product rating","woo-gutenberg-products-block"),checked:c,onChange:()=>e({...t,rating:!c})}),(0,l.createElement)(i.ToggleControl,{label:(0,g.__)("Add to Cart button","woo-gutenberg-products-block"),checked:o,onChange:()=>e({...t,button:!o})}))};var b=r(4184),f=r.n(b);function y(e,t,r){const l=new Set(t.map((e=>e[r])));return e.filter((e=>!l.has(e[r])))}const x=window.wp.htmlEntities,_={clear:(0,g.__)("Clear all selected items","woo-gutenberg-products-block"),noItems:(0,g.__)("No items found.","woo-gutenberg-products-block"),
/* Translators: %s search term */
noResults:(0,g.__)("No results for %s","woo-gutenberg-products-block"),search:(0,g.__)("Search for items","woo-gutenberg-products-block"),selected:e=>(0,g.sprintf)(/* translators: Number of items selected from list. */
(0,g._n)("%d item selected","%d items selected",e,"woo-gutenberg-products-block"),e),updated:(0,g.__)("Search results updated.","woo-gutenberg-products-block")},k=(e,t=e)=>{const r=e.reduce(((e,t)=>{const r=t.parent||0;return e[r]||(e[r]=[]),e[r].push(t),e}),{}),l=("id",t.reduce(((e,t)=>(e[String(t.id)]=t,e)),{}));const o=["0"],n=(e={})=>e.parent?[...n(l[e.parent]),e.name]:e.name?[e.name]:[],c=e=>e.map((e=>{const t=r[e.id];return o.push(""+e.id),{...e,breadcrumbs:n(l[e.parent]),children:t&&t.length?c(t):[]}})),a=c(r[0]||[]);return Object.entries(r).forEach((([e,t])=>{o.includes(e)||a.push(...c(t||[]))})),a},v=(e,t)=>{if(!t)return e;const r=new RegExp(`(${t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"ig");return e.split(r).map(((e,t)=>r.test(e)?(0,l.createElement)("strong",{key:t},e):(0,l.createElement)(l.Fragment,{key:t},e)))},C=({label:e})=>(0,l.createElement)("span",{className:"woocommerce-search-list__item-count"},e),S=e=>{const{item:t,search:r}=e,o=t.breadcrumbs&&t.breadcrumbs.length;return(0,l.createElement)("span",{className:"woocommerce-search-list__item-label"},o?(0,l.createElement)("span",{className:"woocommerce-search-list__item-prefix"},1===(n=t.breadcrumbs).length?n.slice(0,1).toString():2===n.length?n.slice(0,1).toString()+" › "+n.slice(-1).toString():n.slice(0,1).toString()+" … "+n.slice(-1).toString()):null,(0,l.createElement)("span",{className:"woocommerce-search-list__item-name"},v((0,x.decodeEntities)(t.name),r)));var n},N=({countLabel:e,className:t,depth:r=0,controlId:o="",item:n,isSelected:c,isSingle:a,onSelect:s,search:d="",selected:m,useExpandedPanelId:u,...g})=>{var h,E;const[p,w]=u,b=null!=e&&void 0!==n.count&&null!==n.count,_=!(null===(h=n.breadcrumbs)||void 0===h||!h.length),k=!(null===(E=n.children)||void 0===E||!E.length),N=p===n.id,P=f()(["woocommerce-search-list__item",`depth-${r}`,t],{"has-breadcrumbs":_,"has-children":k,"has-count":b,"is-expanded":N,"is-radio-button":a}),I=g.name||`search-list-item-${o}`,O=`${I}-${n.id}`,B=(0,l.useCallback)((()=>{w(N?-1:Number(n.id))}),[N,n.id,w]);return k?(0,l.createElement)("div",{className:P,onClick:B,onKeyDown:e=>"Enter"===e.key||" "===e.key?B():null,role:"treeitem",tabIndex:0},a?(0,l.createElement)(l.Fragment,null,(0,l.createElement)("input",{type:"radio",id:O,name:I,value:n.value,onChange:s(n),onClick:e=>e.stopPropagation(),checked:c,className:"woocommerce-search-list__item-input",...g}),(0,l.createElement)(S,{item:n,search:d}),b?(0,l.createElement)(C,{label:e||n.count}):null):(0,l.createElement)(l.Fragment,null,(0,l.createElement)(i.CheckboxControl,{className:"woocommerce-search-list__item-input",checked:c,...!c&&n.children.some((e=>m.find((t=>t.id===e.id))))?{indeterminate:!0}:{},label:v((0,x.decodeEntities)(n.name),d),onChange:()=>{c?s(y(m,n.children,"id"))():s(function(e,t,r){const l=y(t,e,"id");return[...e,...l]}(m,n.children))()},onClick:e=>e.stopPropagation()}),b?(0,l.createElement)(C,{label:e||n.count}):null)):(0,l.createElement)("label",{htmlFor:O,className:P},a?(0,l.createElement)(l.Fragment,null,(0,l.createElement)("input",{...g,type:"radio",id:O,name:I,value:n.value,onChange:s(n),checked:c,className:"woocommerce-search-list__item-input"}),(0,l.createElement)(S,{item:n,search:d})):(0,l.createElement)(i.CheckboxControl,{...g,id:O,name:I,className:"woocommerce-search-list__item-input",value:(0,x.decodeEntities)(n.value),label:v((0,x.decodeEntities)(n.name),d),onChange:s(n),checked:c}),b?(0,l.createElement)(C,{label:e||n.count}):null)},P=N;var I=r(5430),O=r(4333),B=r(906);r(5932);const $=({id:e,label:t,popoverContents:r,remove:n,screenReaderLabel:c,className:a=""})=>{const[s,d]=(0,l.useState)(!1),m=(0,O.useInstanceId)($);if(c=c||t,!t)return null;t=(0,x.decodeEntities)(t);const u=f()("woocommerce-tag",a,{"has-remove":!!n}),h=`woocommerce-tag__label-${m}`,E=(0,l.createElement)(l.Fragment,null,(0,l.createElement)("span",{className:"screen-reader-text"},c),(0,l.createElement)("span",{"aria-hidden":"true"},t));return(0,l.createElement)("span",{className:u},r?(0,l.createElement)(i.Button,{className:"woocommerce-tag__text",id:h,onClick:()=>d(!0)},E):(0,l.createElement)("span",{className:"woocommerce-tag__text",id:h},E),r&&s&&(0,l.createElement)(i.Popover,{onClose:()=>d(!1)},r),n&&(0,l.createElement)(i.Button,{className:"woocommerce-tag__remove",onClick:n(e),label:(0,g.sprintf)(
// Translators: %s label.
(0,g.__)("Remove %s","woo-gutenberg-products-block"),t),"aria-describedby":h},(0,l.createElement)(o.Z,{icon:B.Z,size:20,className:"clear-icon"})))},R=$;r(8462);const T=e=>(0,l.createElement)(P,{...e}),j=e=>{const{list:t,selected:r,renderItem:o,depth:n=0,onSelect:c,instanceId:a,isSingle:s,search:i,useExpandedPanelId:d}=e,[m]=d;return t?(0,l.createElement)(l.Fragment,null,t.map((t=>{var u,g;const h=null!==(u=t.children)&&void 0!==u&&u.length&&!s?t.children.every((({id:e})=>r.find((t=>t.id===e)))):!!r.find((({id:e})=>e===t.id)),E=(null===(g=t.children)||void 0===g?void 0:g.length)&&m===t.id;return(0,l.createElement)(l.Fragment,{key:t.id},(0,l.createElement)("li",null,o({item:t,isSelected:h,onSelect:c,isSingle:s,selected:r,search:i,depth:n,useExpandedPanelId:d,controlId:a})),E?(0,l.createElement)(j,{...e,list:t.children,depth:n+1}):null)}))):null},F=({isLoading:e,isSingle:t,selected:r,messages:o,onChange:n,onRemove:c})=>{if(e||t||!r)return null;const a=r.length;return(0,l.createElement)("div",{className:"woocommerce-search-list__selected"},(0,l.createElement)("div",{className:"woocommerce-search-list__selected-header"},(0,l.createElement)("strong",null,o.selected(a)),a>0?(0,l.createElement)(i.Button,{isLink:!0,isDestructive:!0,onClick:()=>n([]),"aria-label":o.clear},(0,g.__)("Clear all","woo-gutenberg-products-block")):null),a>0?(0,l.createElement)("ul",null,r.map(((e,t)=>(0,l.createElement)("li",{key:t},(0,l.createElement)(R,{label:e.name,id:e.id,remove:c}))))):null)},L=({filteredList:e,search:t,onSelect:r,instanceId:n,useExpandedPanelId:c,...a})=>{const{messages:s,renderItem:i,selected:d,isSingle:m}=a,u=i||T;return 0===e.length?(0,l.createElement)("div",{className:"woocommerce-search-list__list is-not-found"},(0,l.createElement)("span",{className:"woocommerce-search-list__not-found-icon"},(0,l.createElement)(o.Z,{icon:I.Z})),(0,l.createElement)("span",{className:"woocommerce-search-list__not-found-text"},t?(0,g.sprintf)(s.noResults,t):s.noItems)):(0,l.createElement)("ul",{className:"woocommerce-search-list__list"},(0,l.createElement)(j,{useExpandedPanelId:c,list:e,selected:d,renderItem:u,onSelect:r,instanceId:n,isSingle:m,search:t}))},A=e=>{const{className:t="",isCompact:r,isHierarchical:o,isLoading:n,isSingle:c,list:a,messages:s=_,onChange:d,onSearch:m,selected:u,type:h="text",debouncedSpeak:E}=e,[p,w]=(0,l.useState)(""),b=(0,l.useState)(-1),y=(0,O.useInstanceId)(A),x=(0,l.useMemo)((()=>({..._,...s})),[s]),v=(0,l.useMemo)((()=>((e,t,r)=>{if(!t)return r?k(e):e;const l=new RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"i"),o=e.map((e=>!!l.test(e.name)&&e)).filter(Boolean);return r?k(o,e):o})(a,p,o)),[a,p,o]);(0,l.useEffect)((()=>{E&&E(x.updated)}),[E,x]),(0,l.useEffect)((()=>{"function"==typeof m&&m(p)}),[p,m]);const C=(0,l.useCallback)((e=>()=>{c&&d([]);const t=u.findIndex((({id:t})=>t===e));d([...u.slice(0,t),...u.slice(t+1)])}),[c,u,d]),S=(0,l.useCallback)((e=>()=>{Array.isArray(e)?d(e):-1===u.findIndex((({id:t})=>t===e.id))?d(c?[e]:[...u,e]):C(e.id)()}),[c,C,d,u]),N=(0,l.useCallback)((e=>{const[t]=u.filter((t=>!e.find((e=>t.id===e.id))));C(t.id)()}),[C,u]);return(0,l.createElement)("div",{className:f()("woocommerce-search-list",t,{"is-compact":r,"is-loading":n,"is-token":"token"===h})},"text"===h&&(0,l.createElement)(F,{...e,onRemove:C,messages:x}),(0,l.createElement)("div",{className:"woocommerce-search-list__search"},"text"===h?(0,l.createElement)(i.TextControl,{label:x.search,type:"search",value:p,onChange:e=>w(e)}):(0,l.createElement)(i.FormTokenField,{disabled:n,label:x.search,onChange:N,onInputChange:e=>w(e),suggestions:[],__experimentalValidateInput:()=>!1,value:n?[(0,g.__)("Loading…","woo-gutenberg-products-block")]:u.map((e=>({...e,value:e.name}))),__experimentalShowHowTo:!1})),n?(0,l.createElement)("div",{className:"woocommerce-search-list__list"},(0,l.createElement)(i.Spinner,null)):(0,l.createElement)(L,{...e,search:p,filteredList:v,messages:x,onSelect:S,instanceId:y,useExpandedPanelId:b}))},M=((0,i.withSpokenMessages)(A),window.wp.url),H=window.wp.apiFetch;var D=r.n(H);const V=(0,O.createHigherOrderComponent)((e=>class extends l.Component{constructor(){super(...arguments),this.state={error:null,loading:!1,categories:[]},this.loadCategories=this.loadCategories.bind(this)}componentDidMount(){this.loadCategories()}loadCategories(){this.setState({loading:!0}),D()({path:(0,M.addQueryArgs)("wc/store/v1/products/categories",{per_page:0})}).then((e=>{this.setState({categories:e,loading:!1,error:null})})).catch((async e=>{const t=await(async e=>{if(!("json"in e))return{message:e.message,type:e.type||"general"};try{const t=await e.json();return{message:t.message,type:t.type||"api"}}catch(e){return{message:e.message,type:"general"}}})(e);this.setState({categories:[],loading:!1,error:t})}))}render(){const{error:t,loading:r,categories:o}=this.state;return(0,l.createElement)(e,{...this.props,error:t,isLoading:r,categories:o})}}),"withCategories"),Z=window.wp.escapeHtml,J=({error:e})=>(0,l.createElement)("div",{className:"wc-block-error-message"},(({message:e,type:t})=>e?"general"===t?(0,l.createElement)("span",null,(0,g.__)("The following error was returned","woo-gutenberg-products-block"),(0,l.createElement)("br",null),(0,l.createElement)("code",null,(0,Z.escapeHTML)(e))):"api"===t?(0,l.createElement)("span",null,(0,g.__)("The following error was returned from the API","woo-gutenberg-products-block"),(0,l.createElement)("br",null),(0,l.createElement)("code",null,(0,Z.escapeHTML)(e))):e:(0,g.__)("An error has prevented the block from being updated.","woo-gutenberg-products-block"))(e));r(3366);const W=({categories:e,error:t,isLoading:r,onChange:o,onOperatorChange:n,operator:c,selected:a,isCompact:s,isSingle:d,showReviewCount:m})=>{const u={clear:(0,g.__)("Clear all product categories","woo-gutenberg-products-block"),list:(0,g.__)("Product Categories","woo-gutenberg-products-block"),noItems:(0,g.__)("Your store doesn't have any product categories.","woo-gutenberg-products-block"),search:(0,g.__)("Search for product categories","woo-gutenberg-products-block"),selected:e=>(0,g.sprintf)(/* translators: %d is the count of selected categories. */
(0,g._n)("%d category selected","%d categories selected",e,"woo-gutenberg-products-block"),e),updated:(0,g.__)("Category search results updated.","woo-gutenberg-products-block")};return t?(0,l.createElement)(J,{error:t}):(0,l.createElement)(l.Fragment,null,(0,l.createElement)(A,{className:"woocommerce-product-categories",list:e,isLoading:r,selected:a.map((t=>e.find((e=>e.id===t)))).filter(Boolean),onChange:o,renderItem:e=>{const{item:t,search:r,depth:o=0}=e,n=t.breadcrumbs.length?`${t.breadcrumbs.join(", ")}, ${t.name}`:t.name,c=m?(0,g.sprintf)(/* translators: %1$s is the item name, %2$d is the count of reviews for the item. */
(0,g._n)("%1$s, has %2$d review","%1$s, has %2$d reviews",t.review_count,"woo-gutenberg-products-block"),n,t.review_count):(0,g.sprintf)(/* translators: %1$s is the item name, %2$d is the count of products for the item. */
(0,g._n)("%1$s, has %2$d product","%1$s, has %2$d products",t.count,"woo-gutenberg-products-block"),n,t.count),a=m?(0,g.sprintf)(/* translators: %d is the count of reviews. */
(0,g._n)("%d review","%d reviews",t.review_count,"woo-gutenberg-products-block"),t.review_count):(0,g.sprintf)(/* translators: %d is the count of products. */
(0,g._n)("%d product","%d products",t.count,"woo-gutenberg-products-block"),t.count);return(0,l.createElement)(N,{className:f()("woocommerce-product-categories__item","has-count",{"is-searching":r.length>0,"is-skip-level":0===o&&0!==t.parent}),...e,countLabel:a,"aria-label":c})},messages:u,isCompact:s,isHierarchical:!0,isSingle:d}),!!n&&(0,l.createElement)("div",{hidden:a.length<2},(0,l.createElement)(i.SelectControl,{className:"woocommerce-product-categories__operator",label:(0,g.__)("Display products matching","woo-gutenberg-products-block"),help:(0,g.__)("Pick at least two categories to use this setting.","woo-gutenberg-products-block"),value:c,onChange:n,options:[{label:(0,g.__)("Any selected categories","woo-gutenberg-products-block"),value:"any"},{label:(0,g.__)("All selected categories","woo-gutenberg-products-block"),value:"all"}]})))};W.defaultProps={operator:"any",isCompact:!1,isSingle:!1};const z=V(W),G=e=>{const{attributes:t,setAttributes:r}=e,{categories:o,catOperator:n,columns:c,contentVisibility:a,rows:d,alignButtons:m}=t;return(0,l.createElement)(s.InspectorControls,{key:"inspector"},(0,l.createElement)(i.PanelBody,{title:(0,g.__)("Layout","woo-gutenberg-products-block"),initialOpen:!0},(0,l.createElement)(E,{columns:c,rows:d,alignButtons:m,setAttributes:r,minColumns:(0,p.getSetting)("minColumns",1),maxColumns:(0,p.getSetting)("maxColumns",6),minRows:(0,p.getSetting)("minRows",1),maxRows:(0,p.getSetting)("maxRows",6)})),(0,l.createElement)(i.PanelBody,{title:(0,g.__)("Content","woo-gutenberg-products-block"),initialOpen:!0},(0,l.createElement)(w,{settings:a,onChange:e=>r({contentVisibility:e})})),(0,l.createElement)(i.PanelBody,{title:(0,g.__)("Filter by Product Category","woo-gutenberg-products-block"),initialOpen:!1},(0,l.createElement)(z,{selected:o,onChange:(e=[])=>{const t=e.map((({id:e})=>e));r({categories:t})},operator:n,onOperatorChange:(e="any")=>r({catOperator:e})})))},K=e=>{const{attributes:t,name:r}=e;return t.isPreview?u:(0,l.createElement)("div",{className:"wc-block-product-best-sellers"},(0,l.createElement)(G,{...e}),(0,l.createElement)(i.Disabled,null,(0,l.createElement)(m(),{block:r,attributes:t})))},Q={columns:{type:"number",default:(0,p.getSetting)("defaultColumns",3)},rows:{type:"number",default:(0,p.getSetting)("defaultRows",3)},alignButtons:{type:"boolean",default:!1},categories:{type:"array",default:[]},catOperator:{type:"string",default:"any"},contentVisibility:{type:"object",default:{image:!0,title:!0,price:!0,rating:!0,button:!0}},isPreview:{type:"boolean",default:!1},stockStatus:{type:"array",default:Object.keys((0,p.getSetting)("stockStatusOptions",[]))}};(0,c.registerBlockType)(a,{icon:{src:(0,l.createElement)(o.Z,{icon:n.Z,className:"wc-block-editor-components-block-icon"})},attributes:{...Q,...a.attributes},transforms:{from:[{type:"block",blocks:["woocommerce/product-best-sellers","woocommerce/product-category","woocommerce/product-new","woocommerce/product-on-sale","woocommerce/product-top-rated"].filter((e=>"woocommerce/product-best-sellers"!==e)),transform:e=>(0,c.createBlock)("woocommerce/product-best-sellers",e)}]},edit:e=>{const t=(0,s.useBlockProps)();return(0,l.createElement)("div",{...t},(0,l.createElement)(K,{...e}))},save:()=>null})},3366:()=>{},8462:()=>{},5932:()=>{},4333:e=>{"use strict";e.exports=window.wp.compose},9307:e=>{"use strict";e.exports=window.wp.element},5736:e=>{"use strict";e.exports=window.wp.i18n},444:e=>{"use strict";e.exports=window.wp.primitives}},r={};function l(e){var o=r[e];if(void 0!==o)return o.exports;var n=r[e]={exports:{}};return t[e].call(n.exports,n,n.exports,l),n.exports}l.m=t,e=[],l.O=(t,r,o,n)=>{if(!r){var c=1/0;for(d=0;d<e.length;d++){for(var[r,o,n]=e[d],a=!0,s=0;s<r.length;s++)(!1&n||c>=n)&&Object.keys(l.O).every((e=>l.O[e](r[s])))?r.splice(s--,1):(a=!1,n<c&&(c=n));if(a){e.splice(d--,1);var i=o();void 0!==i&&(t=i)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[r,o,n]},l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var r in t)l.o(t,r)&&!l.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.j=7006,(()=>{var e={7006:0};l.O.j=t=>0===e[t];var t=(t,r)=>{var o,n,[c,a,s]=r,i=0;if(c.some((t=>0!==e[t]))){for(o in a)l.o(a,o)&&(l.m[o]=a[o]);if(s)var d=s(l)}for(t&&t(r);i<c.length;i++)n=c[i],l.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return l.O(d)},r=self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=l.O(void 0,[2869],(()=>l(5132)));o=l.O(o),((this.wc=this.wc||{}).blocks=this.wc.blocks||{})["product-best-sellers"]=o})();