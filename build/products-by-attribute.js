(()=>{var e,t={9351:(e,t,r)=>{"use strict";r.r(t);var l=r(9307),n=r(1984),o=r(2010);const a=window.wp.blocks,c=window.wc.wcSettings;r(805);const s=JSON.parse('{"name":"woocommerce/products-by-attribute","title":"Products by Attribute","category":"woocommerce","keywords":["WooCommerce"],"description":"Display a grid of products with selected attributes.","supports":{"align":["wide","full"],"html":false},"attributes":{"attributes":{"type":"array","default":[]},"attrOperator":{"type":"string","enum":["all","any"],"default":"any"},"columns":{"type":"number","default":3},"contentVisibility":{"type":"object","default":{"image":true,"title":true,"price":true,"rating":true,"button":true},"properties":{"image":{"type":"boolean","default":true},"title":{"type":"boolean","default":true},"price":{"type":"boolean","default":true},"rating":{"type":"boolean","default":true},"button":{"type":"boolean","default":true}}},"orderby":{"type":"string","enum":["date","popularity","price_asc","price_desc","rating","title","menu_order"],"default":"date"},"rows":{"type":"number","default":3},"alignButtons":{"type":"boolean","default":false},"isPreview":{"type":"boolean","default":false},"stockStatus":{"type":"array"}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}'),i=window.wp.blockEditor,u=window.wp.components;var d=r(5736);const m=(e,t,r)=>r?Math.min(e,t)===e?t:Math.max(e,r)===e?r:e:Math.max(e,t)===t?e:t,g=({columns:e,rows:t,setAttributes:r,alignButtons:n,minColumns:o=1,maxColumns:a=6,minRows:c=1,maxRows:s=6})=>(0,l.createElement)(l.Fragment,null,(0,l.createElement)(u.RangeControl,{label:(0,d.__)("Columns","woo-gutenberg-products-block"),value:e,onChange:e=>{const t=m(e,o,a);r({columns:Number.isNaN(t)?"":t})},min:o,max:a}),(0,l.createElement)(u.RangeControl,{label:(0,d.__)("Rows","woo-gutenberg-products-block"),value:t,onChange:e=>{const t=m(e,c,s);r({rows:Number.isNaN(t)?"":t})},min:c,max:s}),(0,l.createElement)(u.ToggleControl,{label:(0,d.__)("Align the last block to the bottom","woo-gutenberg-products-block"),help:n?(0,d.__)("Align the last block to the bottom.","woo-gutenberg-products-block"):(0,d.__)("The last inner block will follow other content.","woo-gutenberg-products-block"),checked:n,onChange:()=>r({alignButtons:!n})})),h=({onChange:e,settings:t})=>{const{image:r,button:n,price:o,rating:a,title:c}=t,s=!1!==r;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(u.ToggleControl,{label:(0,d.__)("Product image","woo-gutenberg-products-block"),checked:s,onChange:()=>e({...t,image:!s})}),(0,l.createElement)(u.ToggleControl,{label:(0,d.__)("Product title","woo-gutenberg-products-block"),checked:c,onChange:()=>e({...t,title:!c})}),(0,l.createElement)(u.ToggleControl,{label:(0,d.__)("Product price","woo-gutenberg-products-block"),checked:o,onChange:()=>e({...t,price:!o})}),(0,l.createElement)(u.ToggleControl,{label:(0,d.__)("Product rating","woo-gutenberg-products-block"),checked:a,onChange:()=>e({...t,rating:!a})}),(0,l.createElement)(u.ToggleControl,{label:(0,d.__)("Add to Cart button","woo-gutenberg-products-block"),checked:n,onChange:()=>e({...t,button:!n})}))};var b=r(4184),p=r.n(b);function E(e,t,r){const l=new Set(t.map((e=>e[r])));return e.filter((e=>!l.has(e[r])))}const w=window.wp.htmlEntities,_={clear:(0,d.__)("Clear all selected items","woo-gutenberg-products-block"),noItems:(0,d.__)("No items found.","woo-gutenberg-products-block"),
/* Translators: %s search term */
noResults:(0,d.__)("No results for %s","woo-gutenberg-products-block"),search:(0,d.__)("Search for items","woo-gutenberg-products-block"),selected:e=>(0,d.sprintf)(/* translators: Number of items selected from list. */
(0,d._n)("%d item selected","%d items selected",e,"woo-gutenberg-products-block"),e),updated:(0,d.__)("Search results updated.","woo-gutenberg-products-block")},f=(e,t=e)=>{const r=e.reduce(((e,t)=>{const r=t.parent||0;return e[r]||(e[r]=[]),e[r].push(t),e}),{}),l=("id",t.reduce(((e,t)=>(e[String(t.id)]=t,e)),{}));const n=["0"],o=(e={})=>e.parent?[...o(l[e.parent]),e.name]:e.name?[e.name]:[],a=e=>e.map((e=>{const t=r[e.id];return n.push(""+e.id),{...e,breadcrumbs:o(l[e.parent]),children:t&&t.length?a(t):[]}})),c=a(r[0]||[]);return Object.entries(r).forEach((([e,t])=>{n.includes(e)||c.push(...a(t||[]))})),c},y=(e,t)=>{if(!t)return e;const r=new RegExp(`(${t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"ig");return e.split(r).map(((e,t)=>r.test(e)?(0,l.createElement)("strong",{key:t},e):(0,l.createElement)(l.Fragment,{key:t},e)))},k=({label:e})=>(0,l.createElement)("span",{className:"woocommerce-search-list__item-count"},e),x=e=>{const{item:t,search:r}=e,n=t.breadcrumbs&&t.breadcrumbs.length;return(0,l.createElement)("span",{className:"woocommerce-search-list__item-label"},n?(0,l.createElement)("span",{className:"woocommerce-search-list__item-prefix"},1===(o=t.breadcrumbs).length?o.slice(0,1).toString():2===o.length?o.slice(0,1).toString()+" › "+o.slice(-1).toString():o.slice(0,1).toString()+" … "+o.slice(-1).toString()):null,(0,l.createElement)("span",{className:"woocommerce-search-list__item-name"},y((0,w.decodeEntities)(t.name),r)));var o},v=({countLabel:e,className:t,depth:r=0,controlId:n="",item:o,isSelected:a,isSingle:c,onSelect:s,search:i="",selected:d,useExpandedPanelId:m,...g})=>{var h,b;const[_,f]=m,v=null!=e&&void 0!==o.count&&null!==o.count,C=!(null===(h=o.breadcrumbs)||void 0===h||!h.length),S=!(null===(b=o.children)||void 0===b||!b.length),N=_===o.id,O=p()(["woocommerce-search-list__item",`depth-${r}`,t],{"has-breadcrumbs":C,"has-children":S,"has-count":v,"is-expanded":N,"is-radio-button":c}),I=g.name||`search-list-item-${n}`,P=`${I}-${o.id}`,A=(0,l.useCallback)((()=>{f(N?-1:Number(o.id))}),[N,o.id,f]);return S?(0,l.createElement)("div",{className:O,onClick:A,onKeyDown:e=>"Enter"===e.key||" "===e.key?A():null,role:"treeitem",tabIndex:0},c?(0,l.createElement)(l.Fragment,null,(0,l.createElement)("input",{type:"radio",id:P,name:I,value:o.value,onChange:s(o),onClick:e=>e.stopPropagation(),checked:a,className:"woocommerce-search-list__item-input",...g}),(0,l.createElement)(x,{item:o,search:i}),v?(0,l.createElement)(k,{label:e||o.count}):null):(0,l.createElement)(l.Fragment,null,(0,l.createElement)(u.CheckboxControl,{className:"woocommerce-search-list__item-input",checked:a,...!a&&o.children.some((e=>d.find((t=>t.id===e.id))))?{indeterminate:!0}:{},label:y((0,w.decodeEntities)(o.name),i),onChange:()=>{a?s(E(d,o.children,"id"))():s(function(e,t,r){const l=E(t,e,"id");return[...e,...l]}(d,o.children))()},onClick:e=>e.stopPropagation()}),v?(0,l.createElement)(k,{label:e||o.count}):null)):(0,l.createElement)("label",{htmlFor:P,className:O},c?(0,l.createElement)(l.Fragment,null,(0,l.createElement)("input",{...g,type:"radio",id:P,name:I,value:o.value,onChange:s(o),checked:a,className:"woocommerce-search-list__item-input"}),(0,l.createElement)(x,{item:o,search:i})):(0,l.createElement)(u.CheckboxControl,{...g,id:P,name:I,className:"woocommerce-search-list__item-input",value:(0,w.decodeEntities)(o.value),label:y((0,w.decodeEntities)(o.name),i),onChange:s(o),checked:a}),v?(0,l.createElement)(k,{label:e||o.count}):null)},C=v;var S=r(5430),N=r(4333),O=r(906);r(5932);const I=({id:e,label:t,popoverContents:r,remove:o,screenReaderLabel:a,className:c=""})=>{const[s,i]=(0,l.useState)(!1),m=(0,N.useInstanceId)(I);if(a=a||t,!t)return null;t=(0,w.decodeEntities)(t);const g=p()("woocommerce-tag",c,{"has-remove":!!o}),h=`woocommerce-tag__label-${m}`,b=(0,l.createElement)(l.Fragment,null,(0,l.createElement)("span",{className:"screen-reader-text"},a),(0,l.createElement)("span",{"aria-hidden":"true"},t));return(0,l.createElement)("span",{className:g},r?(0,l.createElement)(u.Button,{className:"woocommerce-tag__text",id:h,onClick:()=>i(!0)},b):(0,l.createElement)("span",{className:"woocommerce-tag__text",id:h},b),r&&s&&(0,l.createElement)(u.Popover,{onClose:()=>i(!1)},r),o&&(0,l.createElement)(u.Button,{className:"woocommerce-tag__remove",onClick:o(e),label:(0,d.sprintf)(
// Translators: %s label.
(0,d.__)("Remove %s","woo-gutenberg-products-block"),t),"aria-describedby":h},(0,l.createElement)(n.Z,{icon:O.Z,size:20,className:"clear-icon"})))},P=I;r(8462);const A=e=>(0,l.createElement)(C,{...e}),B=e=>{const{list:t,selected:r,renderItem:n,depth:o=0,onSelect:a,instanceId:c,isSingle:s,search:i,useExpandedPanelId:u}=e,[d]=u;return t?(0,l.createElement)(l.Fragment,null,t.map((t=>{var m,g;const h=null!==(m=t.children)&&void 0!==m&&m.length&&!s?t.children.every((({id:e})=>r.find((t=>t.id===e)))):!!r.find((({id:e})=>e===t.id)),b=(null===(g=t.children)||void 0===g?void 0:g.length)&&d===t.id;return(0,l.createElement)(l.Fragment,{key:t.id},(0,l.createElement)("li",null,n({item:t,isSelected:h,onSelect:a,isSingle:s,selected:r,search:i,depth:o,useExpandedPanelId:u,controlId:c})),b?(0,l.createElement)(B,{...e,list:t.children,depth:o+1}):null)}))):null},$=({isLoading:e,isSingle:t,selected:r,messages:n,onChange:o,onRemove:a})=>{if(e||t||!r)return null;const c=r.length;return(0,l.createElement)("div",{className:"woocommerce-search-list__selected"},(0,l.createElement)("div",{className:"woocommerce-search-list__selected-header"},(0,l.createElement)("strong",null,n.selected(c)),c>0?(0,l.createElement)(u.Button,{isLink:!0,isDestructive:!0,onClick:()=>o([]),"aria-label":n.clear},(0,d.__)("Clear all","woo-gutenberg-products-block")):null),c>0?(0,l.createElement)("ul",null,r.map(((e,t)=>(0,l.createElement)("li",{key:t},(0,l.createElement)(P,{label:e.name,id:e.id,remove:a}))))):null)},R=({filteredList:e,search:t,onSelect:r,instanceId:o,useExpandedPanelId:a,...c})=>{const{messages:s,renderItem:i,selected:u,isSingle:m}=c,g=i||A;return 0===e.length?(0,l.createElement)("div",{className:"woocommerce-search-list__list is-not-found"},(0,l.createElement)("span",{className:"woocommerce-search-list__not-found-icon"},(0,l.createElement)(n.Z,{icon:S.Z})),(0,l.createElement)("span",{className:"woocommerce-search-list__not-found-text"},t?(0,d.sprintf)(s.noResults,t):s.noItems)):(0,l.createElement)("ul",{className:"woocommerce-search-list__list"},(0,l.createElement)(B,{useExpandedPanelId:a,list:e,selected:u,renderItem:g,onSelect:r,instanceId:o,isSingle:m,search:t}))},L=e=>{const{className:t="",isCompact:r,isHierarchical:n,isLoading:o,isSingle:a,list:c,messages:s=_,onChange:i,onSearch:m,selected:g,type:h="text",debouncedSpeak:b}=e,[E,w]=(0,l.useState)(""),y=(0,l.useState)(-1),k=(0,N.useInstanceId)(L),x=(0,l.useMemo)((()=>({..._,...s})),[s]),v=(0,l.useMemo)((()=>((e,t,r)=>{if(!t)return r?f(e):e;const l=new RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"i"),n=e.map((e=>!!l.test(e.name)&&e)).filter(Boolean);return r?f(n,e):n})(c,E,n)),[c,E,n]);(0,l.useEffect)((()=>{b&&b(x.updated)}),[b,x]),(0,l.useEffect)((()=>{"function"==typeof m&&m(E)}),[E,m]);const C=(0,l.useCallback)((e=>()=>{a&&i([]);const t=g.findIndex((({id:t})=>t===e));i([...g.slice(0,t),...g.slice(t+1)])}),[a,g,i]),S=(0,l.useCallback)((e=>()=>{Array.isArray(e)?i(e):-1===g.findIndex((({id:t})=>t===e.id))?i(a?[e]:[...g,e]):C(e.id)()}),[a,C,i,g]),O=(0,l.useCallback)((e=>{const[t]=g.filter((t=>!e.find((e=>t.id===e.id))));C(t.id)()}),[C,g]);return(0,l.createElement)("div",{className:p()("woocommerce-search-list",t,{"is-compact":r,"is-loading":o,"is-token":"token"===h})},"text"===h&&(0,l.createElement)($,{...e,onRemove:C,messages:x}),(0,l.createElement)("div",{className:"woocommerce-search-list__search"},"text"===h?(0,l.createElement)(u.TextControl,{label:x.search,type:"search",value:E,onChange:e=>w(e)}):(0,l.createElement)(u.FormTokenField,{disabled:o,label:x.search,onChange:O,onInputChange:e=>w(e),suggestions:[],__experimentalValidateInput:()=>!1,value:o?[(0,d.__)("Loading…","woo-gutenberg-products-block")]:g.map((e=>({...e,value:e.name}))),__experimentalShowHowTo:!1})),o?(0,l.createElement)("div",{className:"woocommerce-search-list__list"},(0,l.createElement)(u.Spinner,null)):(0,l.createElement)(R,{...e,search:E,filteredList:v,messages:x,onSelect:S,instanceId:k,useExpandedPanelId:y}))},T=((0,u.withSpokenMessages)(L),window.wp.url,window.wp.apiFetch);var F=r.n(T);const j=e=>F()({path:`wc/store/v1/products/attributes/${e}/terms`});const M=window.wp.escapeHtml,Z=({error:e})=>(0,l.createElement)("div",{className:"wc-block-error-message"},(({message:e,type:t})=>e?"general"===t?(0,l.createElement)("span",null,(0,d.__)("The following error was returned","woo-gutenberg-products-block"),(0,l.createElement)("br",null),(0,l.createElement)("code",null,(0,M.escapeHTML)(e))):"api"===t?(0,l.createElement)("span",null,(0,d.__)("The following error was returned from the API","woo-gutenberg-products-block"),(0,l.createElement)("br",null),(0,l.createElement)("code",null,(0,M.escapeHTML)(e))):e:(0,d.__)("An error has prevented the block from being updated.","woo-gutenberg-products-block"))(e)),D=({className:e,item:t,isSelected:r,isLoading:n,onSelect:o,disabled:a,...c})=>(0,l.createElement)(l.Fragment,null,(0,l.createElement)(v,{...c,key:t.id,className:e,isSelected:r,item:t,onSelect:o,disabled:a}),r&&n&&(0,l.createElement)("div",{key:"loading",className:p()("woocommerce-search-list__item","woocommerce-product-attributes__item","depth-1","is-loading","is-not-active")},(0,l.createElement)(u.Spinner,null)));function H(e,t){return!(e=>null===e)(r=e)&&r instanceof Object&&r.constructor===Object&&t in e;var r}const V=((window.wp.data,(0,c.getSetting)("attributes",[])).reduce(((e,t)=>{const r=(l=t)&&l.attribute_name?{id:parseInt(l.attribute_id,10),name:l.attribute_name,taxonomy:"pa_"+l.attribute_name,label:l.attribute_label}:null;var l;return r&&r.id&&e.push(r),e}),[]),e=>{const{count:t,id:r,name:l,parent:n}=e;return{count:t,id:r,name:l,parent:n,breadcrumbs:[],children:[],value:(o=e,H(o,"count")&&H(o,"description")&&H(o,"id")&&H(o,"name")&&H(o,"parent")&&H(o,"slug")&&"number"==typeof o.count&&"string"==typeof o.description&&"number"==typeof o.id&&"string"==typeof o.name&&"number"==typeof o.parent&&"string"==typeof o.slug?e.attr_slug:"")};var o});r(9669);const J=(0,N.withInstanceId)((({onChange:e,onOperatorChange:t,instanceId:r,isCompact:n=!1,messages:o={},operator:a="any",selected:c,type:s="text"})=>{const{errorLoadingAttributes:i,isLoadingAttributes:m,productsAttributes:g}=function(e){const[t,r]=(0,l.useState)(null),[n,o]=(0,l.useState)(!1),[a,c]=(0,l.useState)([]),s=(0,l.useRef)(!1);return(0,l.useEffect)((()=>{if(e&&!n&&!s.current)return async function(){o(!0);try{const e=await F()({path:"wc/store/v1/products/attributes"}),t=[];for(const r of e){const e=await j(r.id);t.push({...r,parent:0,terms:e.map((e=>({...e,attr_slug:r.taxonomy,parent:r.id})))})}c(t),s.current=!0}catch(e){e instanceof Error&&r(await(async e=>{if(!("json"in e))return{message:e.message,type:e.type||"general"};try{const t=await e.json();return{message:t.message,type:t.type||"api"}}catch(e){return{message:e.message,type:"general"}}})(e))}finally{o(!1)}}(),()=>{s.current=!0}}),[n,e]),{errorLoadingAttributes:t,isLoadingAttributes:n,productsAttributes:a}}(!0),h=g.reduce(((e,t)=>{const{terms:r,...l}=t;return[...e,V(l),...r.map(V)]}),[]);return o={clear:(0,d.__)("Clear all product attributes","woo-gutenberg-products-block"),noItems:(0,d.__)("Your store doesn't have any product attributes.","woo-gutenberg-products-block"),search:(0,d.__)("Search for product attributes","woo-gutenberg-products-block"),selected:e=>(0,d.sprintf)(/* translators: %d is the count of attributes selected. */
(0,d._n)("%d attribute selected","%d attributes selected",e,"woo-gutenberg-products-block"),e),updated:(0,d.__)("Product attribute search results updated.","woo-gutenberg-products-block"),...o},i?(0,l.createElement)(Z,{error:i}):(0,l.createElement)(l.Fragment,null,(0,l.createElement)(L,{className:"woocommerce-product-attributes",isCompact:n,isHierarchical:!0,isLoading:m,isSingle:!1,list:h,messages:o,onChange:e,renderItem:e=>{const{item:t,search:n,depth:o=0}=e,a=t.count||0,c=["woocommerce-product-attributes__item","woocommerce-search-list__item",{"is-searching":n.length>0,"is-skip-level":0===o&&0!==t.parent}];if(!t.breadcrumbs.length)return(0,l.createElement)(D,{...e,className:p()(c),item:t,isLoading:m,disabled:0===t.count,name:`attributes-${r}`,countLabel:(0,d.sprintf)(/* translators: %d is the count of terms. */
(0,d._n)("%d term","%d terms",a,"woo-gutenberg-products-block"),a),"aria-label":(0,d.sprintf)(/* translators: %1$s is the item name, %2$d is the count of terms for the item. */
(0,d._n)("%1$s, has %2$d term","%1$s, has %2$d terms",a,"woo-gutenberg-products-block"),t.name,a)});const s=`${t.breadcrumbs[0]}: ${t.name}`;return(0,l.createElement)(v,{...e,name:`terms-${r}`,className:p()(...c,"has-count"),countLabel:(0,d.sprintf)(/* translators: %d is the count of products. */
(0,d._n)("%d product","%d products",a,"woo-gutenberg-products-block"),a),"aria-label":(0,d.sprintf)(/* translators: %1$s is the attribute name, %2$d is the count of products for that attribute. */
(0,d._n)("%1$s, has %2$d product","%1$s, has %2$d products",a,"woo-gutenberg-products-block"),s,a)})},selected:c.map((({id:e})=>h.find((t=>t.id===e)))).filter(Boolean),type:s}),!!t&&(0,l.createElement)("div",{hidden:c.length<2},(0,l.createElement)(u.SelectControl,{className:"woocommerce-product-attributes__operator",label:(0,d.__)("Display products matching","woo-gutenberg-products-block"),help:(0,d.__)("Pick at least two attributes to use this setting.","woo-gutenberg-products-block"),value:a,onChange:t,options:[{label:(0,d.__)("Any selected attributes","woo-gutenberg-products-block"),value:"any"},{label:(0,d.__)("All selected attributes","woo-gutenberg-products-block"),value:"all"}]})))})),W=({value:e,setAttributes:t})=>(0,l.createElement)(u.SelectControl,{label:(0,d.__)("Order products by","woo-gutenberg-products-block"),value:e,options:[{label:(0,d.__)("Newness - newest first","woo-gutenberg-products-block"),value:"date"},{label:(0,d.__)("Price - low to high","woo-gutenberg-products-block"),value:"price_asc"},{label:(0,d.__)("Price - high to low","woo-gutenberg-products-block"),value:"price_desc"},{label:(0,d.__)("Rating - highest first","woo-gutenberg-products-block"),value:"rating"},{label:(0,d.__)("Sales - most first","woo-gutenberg-products-block"),value:"popularity"},{label:(0,d.__)("Title - alphabetical","woo-gutenberg-products-block"),value:"title"},{label:(0,d.__)("Menu Order","woo-gutenberg-products-block"),value:"menu_order"}],onChange:e=>t({orderby:e})}),G=(0,c.getSetting)("hideOutOfStockItems",!1),z=(0,c.getSetting)("stockStatusOptions",{}),K=({value:e,setAttributes:t})=>{const{outofstock:r,...n}=z,o=G?n:z,a=Object.entries(o).map((([e,t])=>({value:e,label:t}))).filter((e=>!!e.label)),c=Object.keys(o).filter((e=>!!e)),[s,i]=(0,l.useState)(e||c);(0,l.useEffect)((()=>{t({stockStatus:["",...s]})}),[s,t]);const m=(0,l.useCallback)((e=>{const t=s.includes(e),r=s.filter((t=>t!==e));t||(r.push(e),r.sort()),i(r)}),[s]);return(0,l.createElement)(l.Fragment,null,a.map((e=>{const t=s.includes(e.value)?/* translators: %s stock status. */(0,d.__)('Stock status "%s" visible.',"woo-gutenberg-products-block"):/* translators: %s stock status. */(0,d.__)('Stock status "%s" hidden.',"woo-gutenberg-products-block");return(0,l.createElement)(u.ToggleControl,{label:e.label,key:e.value,help:(0,d.sprintf)(t,e.label),checked:s.includes(e.value),onChange:()=>m(e.value)})})))},Y=e=>{const{setAttributes:t}=e,{attributes:r,attrOperator:n,columns:o,contentVisibility:a,orderby:s,rows:m,alignButtons:b,stockStatus:p}=e.attributes;return(0,l.createElement)(i.InspectorControls,{key:"inspector"},(0,l.createElement)(u.PanelBody,{title:(0,d.__)("Layout","woo-gutenberg-products-block"),initialOpen:!0},(0,l.createElement)(g,{columns:o,rows:m,alignButtons:b,setAttributes:t,minColumns:(0,c.getSetting)("minColumns",1),maxColumns:(0,c.getSetting)("maxColumns",6),minRows:(0,c.getSetting)("minRows",1),maxRows:(0,c.getSetting)("maxRows",6)})),(0,l.createElement)(u.PanelBody,{title:(0,d.__)("Content","woo-gutenberg-products-block"),initialOpen:!0},(0,l.createElement)(h,{settings:a,onChange:e=>t({contentVisibility:e})})),(0,l.createElement)(u.PanelBody,{title:(0,d.__)("Filter by Product Attribute","woo-gutenberg-products-block"),initialOpen:!1},(0,l.createElement)(J,{selected:r,onChange:(e=[])=>{const r=e.map((({id:e,attr_slug:t})=>({id:e,attr_slug:t})));t({attributes:r})},operator:n,onOperatorChange:(e="any")=>t({attrOperator:e}),isCompact:!0})),(0,l.createElement)(u.PanelBody,{title:(0,d.__)("Order By","woo-gutenberg-products-block"),initialOpen:!1},(0,l.createElement)(W,{setAttributes:t,value:s})),(0,l.createElement)(u.PanelBody,{title:(0,d.__)("Filter by stock status","woo-gutenberg-products-block"),initialOpen:!1},(0,l.createElement)(K,{setAttributes:t,value:p})))},q=e=>{const{attributes:t,setAttributes:r,setIsEditing:a,isEditing:c,debouncedSpeak:s}=e;return(0,l.createElement)(u.Placeholder,{icon:(0,l.createElement)(n.Z,{icon:o.Z}),label:(0,d.__)("Products by Attribute","woo-gutenberg-products-block"),className:"wc-block-products-grid wc-block-products-by-attribute"},(0,d.__)("Display a grid of products from your selected attributes.","woo-gutenberg-products-block"),(0,l.createElement)("div",{className:"wc-block-products-by-attribute__selection"},(0,l.createElement)(J,{selected:t.attributes,onChange:(e=[])=>{const t=e.map((({id:e,value:t})=>({id:e,attr_slug:t})));r({attributes:t})},operator:t.attrOperator,onOperatorChange:(e="any")=>r({attrOperator:e})}),(0,l.createElement)(u.Button,{isPrimary:!0,onClick:()=>{a(!c),s((0,d.__)("Showing Products by Attribute block preview.","woo-gutenberg-products-block"))}},(0,d.__)("Done","woo-gutenberg-products-block"))))},Q=window.wp.serverSideRender;var U=r.n(Q);const X=(0,l.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 230 250",style:{width:"100%"}},(0,l.createElement)("title",null,"Grid Block Preview"),(0,l.createElement)("rect",{width:"65.374",height:"65.374",x:".162",y:".779",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"47.266",height:"5.148",x:"9.216",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),(0,l.createElement)("rect",{width:"62.8",height:"15",x:"1.565",y:"101.448",fill:"#E1E3E6",rx:"5"}),(0,l.createElement)("rect",{width:"65.374",height:"65.374",x:".162",y:"136.277",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"47.266",height:"5.148",x:"9.216",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),(0,l.createElement)("rect",{width:"62.8",height:"15",x:"1.565",y:"236.946",fill:"#E1E3E6",rx:"5"}),(0,l.createElement)("rect",{width:"65.374",height:"65.374",x:"82.478",y:".779",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"47.266",height:"5.148",x:"91.532",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),(0,l.createElement)("rect",{width:"62.8",height:"15",x:"83.882",y:"101.448",fill:"#E1E3E6",rx:"5"}),(0,l.createElement)("rect",{width:"65.374",height:"65.374",x:"82.478",y:"136.277",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"47.266",height:"5.148",x:"91.532",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),(0,l.createElement)("rect",{width:"62.8",height:"15",x:"83.882",y:"236.946",fill:"#E1E3E6",rx:"5"}),(0,l.createElement)("rect",{width:"65.374",height:"65.374",x:"164.788",y:".779",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"47.266",height:"5.148",x:"173.843",y:"76.153",fill:"#E1E3E6",rx:"2.574"}),(0,l.createElement)("rect",{width:"62.8",height:"15",x:"166.192",y:"101.448",fill:"#E1E3E6",rx:"5"}),(0,l.createElement)("rect",{width:"65.374",height:"65.374",x:"164.788",y:"136.277",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"47.266",height:"5.148",x:"173.843",y:"211.651",fill:"#E1E3E6",rx:"2.574"}),(0,l.createElement)("rect",{width:"62.8",height:"15",x:"166.192",y:"236.946",fill:"#E1E3E6",rx:"5"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"13.283",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"21.498",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"29.713",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"37.927",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"46.238",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"95.599",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"103.814",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"112.029",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"120.243",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"128.554",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"177.909",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"186.124",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"194.339",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"202.553",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"210.864",y:"86.301",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"13.283",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"21.498",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"29.713",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"37.927",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"46.238",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"95.599",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"103.814",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"112.029",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"120.243",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"128.554",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"177.909",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"186.124",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"194.339",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"202.553",y:"221.798",fill:"#E1E3E6",rx:"3"}),(0,l.createElement)("rect",{width:"6.177",height:"6.177",x:"210.864",y:"221.798",fill:"#E1E3E6",rx:"3"})),ee=e=>{const{attributes:t,name:r}=e;return t.isPreview?X:(0,l.createElement)(U(),{block:r,attributes:t})},te=(0,u.withSpokenMessages)((e=>{const t=(0,i.useBlockProps)(),{attributes:{attributes:r}}=e,[n,o]=(0,l.useState)(!r.length);return(0,l.createElement)("div",{...t},(0,l.createElement)(i.BlockControls,null,(0,l.createElement)(u.ToolbarGroup,{controls:[{icon:"edit",title:(0,d.__)("Edit selected attribute","woo-gutenberg-products-block"),onClick:()=>o(!n),isActive:n}]})),(0,l.createElement)(Y,{...e}),n?(0,l.createElement)(q,{isEditing:n,setIsEditing:o,...e}):(0,l.createElement)(u.Disabled,null,(0,l.createElement)(ee,{...e})))}));(0,a.registerBlockType)(s,{icon:{src:(0,l.createElement)(n.Z,{icon:o.Z,className:"wc-block-editor-components-block-icon"})},attributes:{...s.attributes,columns:{type:"number",default:(0,c.getSetting)("defaultColumns",3)},rows:{type:"number",default:(0,c.getSetting)("defaultRows",3)},stockStatus:{type:"array",default:Object.keys((0,c.getSetting)("stockStatusOptions",[]))}},edit:te,save:()=>null})},805:()=>{},9669:()=>{},8462:()=>{},5932:()=>{},4333:e=>{"use strict";e.exports=window.wp.compose},9307:e=>{"use strict";e.exports=window.wp.element},5736:e=>{"use strict";e.exports=window.wp.i18n},444:e=>{"use strict";e.exports=window.wp.primitives}},r={};function l(e){var n=r[e];if(void 0!==n)return n.exports;var o=r[e]={exports:{}};return t[e].call(o.exports,o,o.exports,l),o.exports}l.m=t,e=[],l.O=(t,r,n,o)=>{if(!r){var a=1/0;for(u=0;u<e.length;u++){for(var[r,n,o]=e[u],c=!0,s=0;s<r.length;s++)(!1&o||a>=o)&&Object.keys(l.O).every((e=>l.O[e](r[s])))?r.splice(s--,1):(c=!1,o<a&&(a=o));if(c){e.splice(u--,1);var i=n();void 0!==i&&(t=i)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,n,o]},l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var r in t)l.o(t,r)&&!l.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.j=4341,(()=>{var e={4341:0};l.O.j=t=>0===e[t];var t=(t,r)=>{var n,o,[a,c,s]=r,i=0;if(a.some((t=>0!==e[t]))){for(n in c)l.o(c,n)&&(l.m[n]=c[n]);if(s)var u=s(l)}for(t&&t(r);i<a.length;i++)o=a[i],l.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return l.O(u)},r=self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=l.O(void 0,[2869],(()=>l(9351)));n=l.O(n),((this.wc=this.wc||{}).blocks=this.wc.blocks||{})["products-by-attribute"]=n})();