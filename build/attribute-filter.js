(()=>{var e,t={8380:(e,t,r)=>{"use strict";r.r(t);var o=r(9307);const n=window.wp.blocks,l=window.wp.blockEditor;var a=r(1984),s=r(2010),c=r(4184),i=r.n(c),u=r(172),d=r(5736),m=r(6755);const p=window.wp.components;var b=r(5430),g=r(4333);const w={clear:(0,d.__)("Clear all selected items","woo-gutenberg-products-block"),noItems:(0,d.__)("No items found.","woo-gutenberg-products-block"),
/* Translators: %s search term */
noResults:(0,d.__)("No results for %s","woo-gutenberg-products-block"),search:(0,d.__)("Search for items","woo-gutenberg-products-block"),selected:e=>(0,d.sprintf)(/* translators: Number of items selected from list. */
(0,d._n)("%d item selected","%d items selected",e,"woo-gutenberg-products-block"),e),updated:(0,d.__)("Search results updated.","woo-gutenberg-products-block")},h=(e,t=e)=>{const r=e.reduce(((e,t)=>{const r=t.parent||0;return e[r]||(e[r]=[]),e[r].push(t),e}),{}),o=("id",t.reduce(((e,t)=>(e[String(t.id)]=t,e)),{}));const n=["0"],l=(e={})=>e.parent?[...l(o[e.parent]),e.name]:e.name?[e.name]:[],a=e=>e.map((e=>{const t=r[e.id];return n.push(""+e.id),{...e,breadcrumbs:l(o[e.parent]),children:t&&t.length?a(t):[]}})),s=a(r[0]||[]);return Object.entries(r).forEach((([e,t])=>{n.includes(e)||s.push(...a(t||[]))})),s},_=(e,t)=>{if(!t)return e;const r=new RegExp(`(${t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"ig");return e.split(r).map(((e,t)=>r.test(e)?(0,o.createElement)("strong",{key:t},e):(0,o.createElement)(o.Fragment,{key:t},e)))};function f(e,t,r){const o=new Set(t.map((e=>e[r])));return e.filter((e=>!o.has(e[r])))}const E=window.wp.htmlEntities,y=({label:e})=>(0,o.createElement)("span",{className:"woocommerce-search-list__item-count"},e),k=e=>{const{item:t,search:r}=e,n=t.breadcrumbs&&t.breadcrumbs.length;return(0,o.createElement)("span",{className:"woocommerce-search-list__item-label"},n?(0,o.createElement)("span",{className:"woocommerce-search-list__item-prefix"},1===(l=t.breadcrumbs).length?l.slice(0,1).toString():2===l.length?l.slice(0,1).toString()+" › "+l.slice(-1).toString():l.slice(0,1).toString()+" … "+l.slice(-1).toString()):null,(0,o.createElement)("span",{className:"woocommerce-search-list__item-name"},_((0,E.decodeEntities)(t.name),r)));var l},v=({countLabel:e,className:t,depth:r=0,controlId:n="",item:l,isSelected:a,isSingle:s,onSelect:c,search:u="",selected:d,useExpandedPanelId:m,...b})=>{var g,w;const[h,v]=m,S=null!=e&&void 0!==l.count&&null!==l.count,C=!(null===(g=l.breadcrumbs)||void 0===g||!g.length),x=!(null===(w=l.children)||void 0===w||!w.length),N=h===l.id,T=i()(["woocommerce-search-list__item",`depth-${r}`,t],{"has-breadcrumbs":C,"has-children":x,"has-count":S,"is-expanded":N,"is-radio-button":s}),A=b.name||`search-list-item-${n}`,O=`${A}-${l.id}`,P=(0,o.useCallback)((()=>{v(N?-1:Number(l.id))}),[N,l.id,v]);return x?(0,o.createElement)("div",{className:T,onClick:P,onKeyDown:e=>"Enter"===e.key||" "===e.key?P():null,role:"treeitem",tabIndex:0},s?(0,o.createElement)(o.Fragment,null,(0,o.createElement)("input",{type:"radio",id:O,name:A,value:l.value,onChange:c(l),onClick:e=>e.stopPropagation(),checked:a,className:"woocommerce-search-list__item-input",...b}),(0,o.createElement)(k,{item:l,search:u}),S?(0,o.createElement)(y,{label:e||l.count}):null):(0,o.createElement)(o.Fragment,null,(0,o.createElement)(p.CheckboxControl,{className:"woocommerce-search-list__item-input",checked:a,...!a&&l.children.some((e=>d.find((t=>t.id===e.id))))?{indeterminate:!0}:{},label:_((0,E.decodeEntities)(l.name),u),onChange:()=>{a?c(f(d,l.children,"id"))():c(function(e,t,r){const o=f(t,e,"id");return[...e,...o]}(d,l.children))()},onClick:e=>e.stopPropagation()}),S?(0,o.createElement)(y,{label:e||l.count}):null)):(0,o.createElement)("label",{htmlFor:O,className:T},s?(0,o.createElement)(o.Fragment,null,(0,o.createElement)("input",{...b,type:"radio",id:O,name:A,value:l.value,onChange:c(l),checked:a,className:"woocommerce-search-list__item-input"}),(0,o.createElement)(k,{item:l,search:u})):(0,o.createElement)(p.CheckboxControl,{...b,id:O,name:A,className:"woocommerce-search-list__item-input",value:(0,E.decodeEntities)(l.value),label:_((0,E.decodeEntities)(l.name),u),onChange:c(l),checked:a}),S?(0,o.createElement)(y,{label:e||l.count}):null)};var S=r(906);r(5932);const C=({id:e,label:t,popoverContents:r,remove:n,screenReaderLabel:l,className:s=""})=>{const[c,u]=(0,o.useState)(!1),m=(0,g.useInstanceId)(C);if(l=l||t,!t)return null;t=(0,E.decodeEntities)(t);const b=i()("woocommerce-tag",s,{"has-remove":!!n}),w=`woocommerce-tag__label-${m}`,h=(0,o.createElement)(o.Fragment,null,(0,o.createElement)("span",{className:"screen-reader-text"},l),(0,o.createElement)("span",{"aria-hidden":"true"},t));return(0,o.createElement)("span",{className:b},r?(0,o.createElement)(p.Button,{className:"woocommerce-tag__text",id:w,onClick:()=>u(!0)},h):(0,o.createElement)("span",{className:"woocommerce-tag__text",id:w},h),r&&c&&(0,o.createElement)(p.Popover,{onClose:()=>u(!1)},r),n&&(0,o.createElement)(p.Button,{className:"woocommerce-tag__remove",onClick:n(e),label:(0,d.sprintf)(
// Translators: %s label.
(0,d.__)("Remove %s","woo-gutenberg-products-block"),t),"aria-describedby":w},(0,o.createElement)(a.Z,{icon:S.Z,size:20,className:"clear-icon"})))},x=C;r(8462);const N=e=>(0,o.createElement)(v,{...e}),T=e=>{const{list:t,selected:r,renderItem:n,depth:l=0,onSelect:a,instanceId:s,isSingle:c,search:i,useExpandedPanelId:u}=e,[d]=u;return t?(0,o.createElement)(o.Fragment,null,t.map((t=>{var m,p;const b=null!==(m=t.children)&&void 0!==m&&m.length&&!c?t.children.every((({id:e})=>r.find((t=>t.id===e)))):!!r.find((({id:e})=>e===t.id)),g=(null===(p=t.children)||void 0===p?void 0:p.length)&&d===t.id;return(0,o.createElement)(o.Fragment,{key:t.id},(0,o.createElement)("li",null,n({item:t,isSelected:b,onSelect:a,isSingle:c,selected:r,search:i,depth:l,useExpandedPanelId:u,controlId:s})),g?(0,o.createElement)(T,{...e,list:t.children,depth:l+1}):null)}))):null},A=({isLoading:e,isSingle:t,selected:r,messages:n,onChange:l,onRemove:a})=>{if(e||t||!r)return null;const s=r.length;return(0,o.createElement)("div",{className:"woocommerce-search-list__selected"},(0,o.createElement)("div",{className:"woocommerce-search-list__selected-header"},(0,o.createElement)("strong",null,n.selected(s)),s>0?(0,o.createElement)(p.Button,{isLink:!0,isDestructive:!0,onClick:()=>l([]),"aria-label":n.clear},(0,d.__)("Clear all","woo-gutenberg-products-block")):null),s>0?(0,o.createElement)("ul",null,r.map(((e,t)=>(0,o.createElement)("li",{key:t},(0,o.createElement)(x,{label:e.name,id:e.id,remove:a}))))):null)},O=({filteredList:e,search:t,onSelect:r,instanceId:n,useExpandedPanelId:l,...s})=>{const{messages:c,renderItem:i,selected:u,isSingle:m}=s,p=i||N;return 0===e.length?(0,o.createElement)("div",{className:"woocommerce-search-list__list is-not-found"},(0,o.createElement)("span",{className:"woocommerce-search-list__not-found-icon"},(0,o.createElement)(a.Z,{icon:b.Z})),(0,o.createElement)("span",{className:"woocommerce-search-list__not-found-text"},t?(0,d.sprintf)(c.noResults,t):c.noItems)):(0,o.createElement)("ul",{className:"woocommerce-search-list__list"},(0,o.createElement)(T,{useExpandedPanelId:l,list:e,selected:u,renderItem:p,onSelect:r,instanceId:n,isSingle:m,search:t}))},P=e=>{const{className:t="",isCompact:r,isHierarchical:n,isLoading:l,isSingle:a,list:s,messages:c=w,onChange:u,onSearch:m,selected:b,type:_="text",debouncedSpeak:f}=e,[E,y]=(0,o.useState)(""),k=(0,o.useState)(-1),v=(0,g.useInstanceId)(P),S=(0,o.useMemo)((()=>({...w,...c})),[c]),C=(0,o.useMemo)((()=>((e,t,r)=>{if(!t)return r?h(e):e;const o=new RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"i"),n=e.map((e=>!!o.test(e.name)&&e)).filter(Boolean);return r?h(n,e):n})(s,E,n)),[s,E,n]);(0,o.useEffect)((()=>{f&&f(S.updated)}),[f,S]),(0,o.useEffect)((()=>{"function"==typeof m&&m(E)}),[E,m]);const x=(0,o.useCallback)((e=>()=>{a&&u([]);const t=b.findIndex((({id:t})=>t===e));u([...b.slice(0,t),...b.slice(t+1)])}),[a,b,u]),N=(0,o.useCallback)((e=>()=>{Array.isArray(e)?u(e):-1===b.findIndex((({id:t})=>t===e.id))?u(a?[e]:[...b,e]):x(e.id)()}),[a,x,u,b]),T=(0,o.useCallback)((e=>{const[t]=b.filter((t=>!e.find((e=>t.id===e.id))));x(t.id)()}),[x,b]);return(0,o.createElement)("div",{className:i()("woocommerce-search-list",t,{"is-compact":r,"is-loading":l,"is-token":"token"===_})},"text"===_&&(0,o.createElement)(A,{...e,onRemove:x,messages:S}),(0,o.createElement)("div",{className:"woocommerce-search-list__search"},"text"===_?(0,o.createElement)(p.TextControl,{label:S.search,type:"search",value:E,onChange:e=>y(e)}):(0,o.createElement)(p.FormTokenField,{disabled:l,label:S.search,onChange:T,onInputChange:e=>y(e),suggestions:[],__experimentalValidateInput:()=>!1,value:l?[(0,d.__)("Loading…","woo-gutenberg-products-block")]:b.map((e=>({...e,value:e.name}))),__experimentalShowHowTo:!1})),l?(0,o.createElement)("div",{className:"woocommerce-search-list__list"},(0,o.createElement)(p.Spinner,null)):(0,o.createElement)(O,{...e,search:E,filteredList:C,messages:S,onSelect:N,instanceId:v,useExpandedPanelId:k}))},R=((0,p.withSpokenMessages)(P),window.wc.wcSettings);r(7118);const I=(0,g.withInstanceId)((({className:e,headingLevel:t,onChange:r,heading:n,instanceId:a})=>{const s=`h${t}`;return(0,o.createElement)(s,{className:e},(0,o.createElement)("label",{className:"screen-reader-text",htmlFor:`block-title-${a}`},(0,d.__)("Block title","woo-gutenberg-products-block")),(0,o.createElement)(l.PlainText,{id:`block-title-${a}`,className:"wc-block-editor-components-title",value:n,onChange:r,style:{backgroundColor:"transparent"}}))}));var L=r(9127),F=r.n(L);function B(e){const t=(0,o.useRef)(e);return F()(e,t.current)||(t.current=e),t.current}const j=window.wc.wcBlocksData,q=window.wp.data,$=(0,o.createContext)("page"),D=()=>(0,o.useContext)($),G=($.Provider,e=>{const t=D();e=e||t;const r=(0,q.useSelect)((t=>t(j.QUERY_STATE_STORE_KEY).getValueForQueryContext(e,void 0)),[e]),{setValueForQueryContext:n}=(0,q.useDispatch)(j.QUERY_STATE_STORE_KEY);return[r,(0,o.useCallback)((t=>{n(e,t)}),[e,n])]}),V=(e,t,r)=>{const n=D();r=r||n;const l=(0,q.useSelect)((o=>o(j.QUERY_STATE_STORE_KEY).getValueForQueryKey(r,e,t)),[r,e]),{setQueryValue:a}=(0,q.useDispatch)(j.QUERY_STATE_STORE_KEY);return[l,(0,o.useCallback)((t=>{a(r,e,t)}),[r,e,a])]},Z=e=>{const{namespace:t,resourceName:r,resourceValues:n=[],query:l={},shouldSelect:a=!0}=e;if(!t||!r)throw new Error("The options object must have valid values for the namespace and the resource properties.");const s=(0,o.useRef)({results:[],isLoading:!0}),c=B(l),i=B(n),u=(()=>{const[,e]=(0,o.useState)();return(0,o.useCallback)((t=>{e((()=>{throw t}))}),[])})(),d=(0,q.useSelect)((e=>{if(!a)return null;const o=e(j.COLLECTIONS_STORE_KEY),n=[t,r,c,i],l=o.getCollectionError(...n);if(l){if(!(l instanceof Error))throw new Error("TypeError: `error` object is not an instance of Error constructor");u(l)}return{results:o.getCollection(...n),isLoading:!o.hasFinishedResolution("getCollection",n)}}),[t,r,i,c,a]);return null!==d&&(s.current=d),s.current};var Q=r(4697);function U(e,t){return!(e=>null===e)(r=e)&&r instanceof Object&&r.constructor===Object&&t in e;var r}const M=window.wc.blocksComponents;r(1724);const Y=({name:e,count:t})=>(0,o.createElement)(o.Fragment,null,e,null!==t&&Number.isFinite(t)&&(0,o.createElement)(M.Label,{label:t.toString(),screenReaderLabel:(0,d.sprintf)(/* translators: %s number of products. */
(0,d._n)("%s product","%s products",t,"woo-gutenberg-products-block"),t),wrapperElement:"span",wrapperProps:{className:"wc-filter-element-label-list-count"}}));r(770);const W=({className:e,
/* translators: Reset button text for filters. */
label:t=(0,d.__)("Reset","woo-gutenberg-products-block"),onClick:r,screenReaderLabel:n=(0,d.__)("Reset filter","woo-gutenberg-products-block")})=>(0,o.createElement)("button",{className:i()("wc-block-components-filter-reset-button",e),onClick:r},(0,o.createElement)(M.Label,{label:t,screenReaderLabel:n}));r(994);const K=({className:e,isLoading:t,disabled:r,
/* translators: Submit button text for filters. */
label:n=(0,d.__)("Apply","woo-gutenberg-products-block"),onClick:l,screenReaderLabel:a=(0,d.__)("Apply filter","woo-gutenberg-products-block")})=>(0,o.createElement)("button",{type:"submit",className:i()("wp-block-button__link","wc-block-filter-submit-button","wc-block-components-filter-submit-button",{"is-loading":t},e),disabled:r,onClick:l},(0,o.createElement)(M.Label,{label:n,screenReaderLabel:a})),z=window.wp.url,H=e=>"boolean"==typeof e,J=e=>"string"==typeof e,X=e=>U(e,"attribute")&&U(e,"operator")&&U(e,"slug")&&"string"==typeof e.attribute&&"string"==typeof e.operator&&Array.isArray(e.slug)&&e.slug.every((e=>"string"==typeof e));var ee=r(3904);const te=(0,R.getSettingWithCoercion)("isRenderingPhpTemplate",!1,H),re="query_type_",oe="filter_";function ne(e){te?((e=e.replace(/(?:query-(?:\d+-)?page=(\d+))|(?:page\/(\d+))/g,"")).endsWith("?")&&(e=e.slice(0,-1)),window.location.href=e):window.history.replaceState({},"",e)}var le=r(2578);r(230);const ae=({className:e,style:t,suggestions:r,multiple:n=!0,saveTransform:l=(e=>e.trim().replace(/\s/g,"-")),messages:a={},validateInput:s=(e=>r.includes(e)),label:c="",...u})=>(0,o.createElement)("div",{className:i()("wc-blocks-components-form-token-field-wrapper",e,{"single-selection":!n}),style:t},(0,o.createElement)(le.Z,{label:c,__experimentalExpandOnFocus:!0,__experimentalShowHowTo:!1,__experimentalValidateInput:s,saveTransform:l,maxLength:n?void 0:1,suggestions:r,messages:a,...u}));r(7732);const se=({children:e})=>(0,o.createElement)("div",{className:"wc-block-filter-title-placeholder"},e),ce=(0,R.getSetting)("attributes",[]).reduce(((e,t)=>{const r=(o=t)&&o.attribute_name?{id:parseInt(o.attribute_id,10),name:o.attribute_name,taxonomy:"pa_"+o.attribute_name,label:o.attribute_label}:null;var o;return r&&r.id&&e.push(r),e}),[]),ie=(e=[],t,r,o=[],n="in")=>{if(!r||!r.taxonomy)return[];const l=e.filter((e=>e.attribute!==r.taxonomy));return 0===o.length?t(l):(l.push({attribute:r.taxonomy,operator:n,slug:o.map((({slug:e})=>e)).sort()}),t((0,u.DY)(l).asc("attribute"))),l},ue=[{value:"preview-1",formattedValue:"preview-1",name:"Blue",label:(0,o.createElement)(Y,{name:"Blue",count:3}),textLabel:"Blue (3)"},{value:"preview-2",formattedValue:"preview-2",name:"Green",label:(0,o.createElement)(Y,{name:"Green",count:3}),textLabel:"Green (3)"},{value:"preview-3",formattedValue:"preview-3",name:"Red",label:(0,o.createElement)(Y,{name:"Red",count:2}),textLabel:"Red (2)"}],de={count:0,has_archives:!0,id:0,label:"Preview",name:"preview",order:"menu_order",parent:0,taxonomy:"preview",type:""};function me(){return Math.floor(Math.random()*Date.now())}r(3057);const pe=e=>e.replace("pa_",""),be=(e,t=[])=>{const r={};t.forEach((e=>{const{attribute:t,slug:o,operator:n}=e,l=pe(t),a=o.join(","),s=`${re}${l}`,c="in"===n?"or":"and";r[`${oe}${l}`]=a,r[s]=c}));const o=(0,z.removeQueryArgs)(e,...Object.keys(r));return(0,z.addQueryArgs)(o,r)},ge=e=>{if(e){const r=(t=`filter_${e.name}`,window?(0,z.getQueryArg)(window.location.href,t):null);return("string"==typeof r?r.split(","):[]).map((e=>encodeURIComponent(e).toLowerCase()))}var t;return[]},we=e=>e.trim().replace(/\s/g,"-").replace(/_/g,"-").replace(/-+/g,"-").replace(/[^a-zA-Z0-9-]/g,""),he=({isLoading:e=!1,options:t,checked:r,onChange:n})=>e?(0,o.createElement)(o.Fragment,null,(0,o.createElement)("span",{className:"is-loading"}),(0,o.createElement)("span",{className:"is-loading"})):(0,o.createElement)(M.CheckboxList,{className:"wc-block-attribute-filter-list",options:t,checked:r,onChange:n,isLoading:e,isDisabled:e}),_e=(0,o.createContext)({}),fe=({attributes:e,isEditor:t=!1,getNotice:r=(()=>null)})=>{const n=(0,R.getSettingWithCoercion)("hasFilterableProducts",!1,H),l=(0,R.getSettingWithCoercion)("isRenderingPhpTemplate",!1,H),s=(0,R.getSettingWithCoercion)("pageUrl",window.location.href,J),[c,m]=(0,o.useState)(!1),p=e.isPreview&&!e.attributeId?de:(e=>{if(e)return ce.find((t=>t.id===e))})(e.attributeId),b=(0,o.useMemo)((()=>ge(p)),[p]),[g,w]=(0,o.useState)(b),[h,_]=(0,o.useState)(me()),[f,y]=(0,o.useState)(e.isPreview&&!e.attributeId?ue:[]),[k]=G(),[v,S]=V("attributes",[]),{results:C,isLoading:x}=Z({namespace:"/wc/store/v1",resourceName:"products/attributes/terms",resourceValues:[(null==p?void 0:p.id)||0],shouldSelect:e.attributeId>0,query:{orderby:"menu_order"}}),{results:N,isLoading:T}=(({queryAttribute:e,queryPrices:t,queryStock:r,queryRating:n,queryState:l,isEditor:a=!1})=>{let s=D();s=`${s}-collection-data`;const[c]=G(s),[i,d]=V("calculate_attribute_counts",[],s),[m,p]=V("calculate_price_range",null,s),[b,g]=V("calculate_stock_status_counts",null,s),[w,h]=V("calculate_rating_counts",null,s),_=B(e||{}),f=B(t),E=B(r),y=B(n);(0,o.useEffect)((()=>{"object"==typeof _&&Object.keys(_).length&&(i.find((e=>U(_,"taxonomy")&&e.taxonomy===_.taxonomy))||d([...i,_]))}),[_,i,d]),(0,o.useEffect)((()=>{m!==f&&void 0!==f&&p(f)}),[f,p,m]),(0,o.useEffect)((()=>{b!==E&&void 0!==E&&g(E)}),[E,g,b]),(0,o.useEffect)((()=>{w!==y&&void 0!==y&&h(y)}),[y,h,w]);const[k,v]=(0,o.useState)(a),[S]=(0,Q.Nr)(k,200);k||v(!0);const C=(0,o.useMemo)((()=>(e=>{const t=e;return Array.isArray(e.calculate_attribute_counts)&&(t.calculate_attribute_counts=(0,u.DY)(e.calculate_attribute_counts.map((({taxonomy:e,queryType:t})=>({taxonomy:e,query_type:t})))).asc(["taxonomy","query_type"])),t})(c)),[c]);return Z({namespace:"/wc/store/v1",resourceName:"products/collection-data",query:{...l,page:void 0,per_page:void 0,orderby:void 0,order:void 0,...C},shouldSelect:S})})({queryAttribute:{taxonomy:(null==p?void 0:p.taxonomy)||"",queryType:e.queryType},queryState:{...k},isEditor:t}),A=(0,o.useCallback)((e=>U(N,"attribute_counts")&&Array.isArray(N.attribute_counts)?N.attribute_counts.find((({term:t})=>t===e)):null),[N]);(0,o.useEffect)((()=>{if(x||T)return;if(!Array.isArray(C))return;const t=C.map((t=>{const r=A(t.id);if(!(r||g.includes(t.slug)||(n=t.slug,null!=k&&k.attributes&&k.attributes.some((({attribute:e,slug:t=[]})=>e===(null==p?void 0:p.taxonomy)&&t.includes(n))))))return null;var n;const l=r?r.count:0;return{formattedValue:we(t.slug),value:t.slug,name:(0,E.decodeEntities)(t.name),label:(0,o.createElement)(Y,{name:(0,E.decodeEntities)(t.name),count:e.showCounts?l:null}),textLabel:e.showCounts?`${(0,E.decodeEntities)(t.name)} (${l})`:(0,E.decodeEntities)(t.name)}})).filter((e=>!!e));y(t),_(me())}),[null==p?void 0:p.taxonomy,C,x,e.showCounts,T,A,g,k.attributes]);const O=(0,o.useCallback)((e=>Array.isArray(C)?C.reduce(((t,r)=>(e.includes(r.slug)&&t.push(r),t)),[]):[]),[C]),P=(0,o.useCallback)(((e,t=!1)=>{if(e=e.map((e=>({...e,slug:e.slug.map((e=>decodeURIComponent(e)))}))),t){if(null==p||!p.taxonomy)return;const t=Object.keys((0,z.getQueryArgs)(window.location.href)),r=pe(p.taxonomy),o=t.reduce(((e,t)=>t.includes(re+r)||t.includes(oe+r)?(0,z.removeQueryArgs)(e,t):e),window.location.href);ne(be(o,e))}else{const t=be(s,e);((e,t)=>{const r=Object.entries(t).reduce(((e,[t,r])=>t.includes("query_type")?e:{...e,[t]:r}),{});return Object.entries(r).reduce(((t,[r,o])=>e[r]===o&&t),!0)})((0,z.getQueryArgs)(window.location.href),(0,z.getQueryArgs)(t))||ne(t)}}),[s,null==p?void 0:p.taxonomy]),I=t=>{const r=ie(v,S,p,O(t),"or"===e.queryType?"in":"and");P(r,0===t.length)},L=(0,o.useCallback)(((r,o=!1)=>{t||(w(r),!o&&e.showFilterButton||ie(v,S,p,O(r),"or"===e.queryType?"in":"and"))}),[t,w,v,S,p,O,e.queryType,e.showFilterButton]),j=B((0,o.useMemo)((()=>{return e=v,Array.isArray(e)&&e.every(X)?v.filter((({attribute:e})=>e===(null==p?void 0:p.taxonomy))).flatMap((({slug:e})=>e)):[];var e}),[v,null==p?void 0:p.taxonomy])),q=function(e,t){const r=(0,o.useRef)();return(0,o.useEffect)((()=>{r.current===e||(r.current=e)}),[e,t]),r.current}(j);(0,o.useEffect)((()=>{!q||F()(q,j)||F()(g,j)||L(j)}),[g,j,q,L]);const $="single"!==e.selectType,M=(0,o.useCallback)((e=>{const t=g.includes(e);let r;$?(r=g.filter((t=>t!==e)),t||(r.push(e),r.sort())):r=t?[]:[e],L(r)}),[g,$,L]);(0,o.useEffect)((()=>{p&&!e.showFilterButton&&((({currentCheckedFilters:e,hasSetFilterDefaultsFromUrl:t})=>t&&0===e.length)({currentCheckedFilters:g,hasSetFilterDefaultsFromUrl:c})?P(v,!0):P(v,!1))}),[c,P,v,p,g,e.showFilterButton]),(0,o.useEffect)((()=>{if(!c&&!x)return b.length>0?(m(!0),void L(b,!0)):void(l||m(!0))}),[p,c,x,L,b,l]);const te=(()=>{const{wrapper:e}=(0,o.useContext)(_e);return t=>{e&&e.current&&(e.current.hidden=!t)}})();if(!n)return te(!1),null;if(!p)return t?r("noAttributes"):(te(!1),null);if(0===f.length&&!x&&t)return r("noProducts");const le=`h${e.headingLevel}`,fe=!e.isPreview&&x,Ee=!e.isPreview&&T,ye=(fe||Ee)&&0===f.length;if(!ye&&0===f.length)return te(!1),null;const ke=$?!ye&&g.length<f.length:!ye&&0===g.length,ve=(0,o.createElement)(le,{className:"wc-block-attribute-filter__title"},e.heading),Se=ye?(0,o.createElement)(se,null,ve):ve;return te(!0),(0,o.createElement)(o.Fragment,null,!t&&e.heading&&Se,(0,o.createElement)("div",{className:i()("wc-block-attribute-filter",`style-${e.displayStyle}`)},"dropdown"===e.displayStyle?(0,o.createElement)(o.Fragment,null,(0,o.createElement)(ae,{key:h,className:i()({"single-selection":!$,"is-loading":ye}),suggestions:f.filter((e=>!g.includes(e.value))).map((e=>e.formattedValue)),disabled:ye,placeholder:(0,d.sprintf)(/* translators: %s attribute name. */
(0,d.__)("Select %s","woo-gutenberg-products-block"),p.label),onChange:e=>{!$&&e.length>1&&(e=[e[e.length-1]]);const t=[e=e.map((e=>{const t=f.find((t=>t.formattedValue===e));return t?t.value:e})),g].reduce(((e,t)=>e.filter((e=>!t.includes(e)))));if(1===t.length)return M(t[0]);const r=[g,e].reduce(((e,t)=>e.filter((e=>!t.includes(e)))));1===r.length&&M(r[0])},value:g,displayTransform:e=>{const t=f.find((t=>[t.value,t.formattedValue].includes(e)));return t?t.textLabel:e},saveTransform:we,messages:{added:(0,d.sprintf)(/* translators: %s is the attribute label. */
(0,d.__)("%s filter added.","woo-gutenberg-products-block"),p.label),removed:(0,d.sprintf)(/* translators: %s is the attribute label. */
(0,d.__)("%s filter removed.","woo-gutenberg-products-block"),p.label),remove:(0,d.sprintf)(/* translators: %s is the attribute label. */
(0,d.__)("Remove %s filter.","woo-gutenberg-products-block"),p.label.toLocaleLowerCase()),__experimentalInvalid:(0,d.sprintf)(/* translators: %s is the attribute label. */
(0,d.__)("Invalid %s filter.","woo-gutenberg-products-block"),p.label.toLocaleLowerCase())}}),ke&&(0,o.createElement)(a.Z,{icon:ee.Z,size:30})):(0,o.createElement)(he,{options:f,checked:g,onChange:M,isLoading:ye,isDisabled:ye})),(0,o.createElement)("div",{className:"wc-block-attribute-filter__actions"},(g.length>0||t)&&!ye&&(0,o.createElement)(W,{onClick:()=>{w([]),_(me()),c&&I([])},screenReaderLabel:(0,d.__)("Reset attribute filter","woo-gutenberg-products-block")}),e.showFilterButton&&(0,o.createElement)(K,{className:"wc-block-attribute-filter__button",isLoading:ye,disabled:(()=>{if(fe||Ee)return!0;const e=ge(p);return e.length===g.length&&g.every((t=>e.includes(t)))})(),onClick:()=>I(g)})))};r(9004);const Ee=({clientId:e,setAttributes:t,filterType:r,attributes:a})=>{const{replaceBlock:s}=(0,q.useDispatch)("core/block-editor"),{heading:c,headingLevel:i}=a;if((0,q.useSelect)((t=>{const{getBlockParentsByBlockName:r}=t("core/block-editor");return r(e,"woocommerce/filter-wrapper").length>0}),[e])||!r)return null;const u=[(0,o.createElement)(p.Button,{key:"convert",onClick:()=>{const o=[(0,n.createBlock)(`woocommerce/${r}`,{...a,heading:""})];c&&""!==c&&o.unshift((0,n.createBlock)("core/heading",{content:c,level:null!=i?i:2})),s(e,(0,n.createBlock)("woocommerce/filter-wrapper",{heading:c,filterType:r},[...o])),t({heading:"",lock:{remove:!0}})},variant:"primary"},(0,d.__)("Upgrade block","woo-gutenberg-products-block"))];return(0,o.createElement)(l.Warning,{actions:u},(0,d.__)("Filter block: We have improved this block to make styling easier. Upgrade it using the button below.","woo-gutenberg-products-block"))},ye=(0,R.getSetting)("attributes",[]),ke={noAttributes:(0,d.__)("Please select an attribute to use this filter!","woo-gutenberg-products-block"),noProducts:(0,d.__)("There are no products with the selected attributes.","woo-gutenberg-products-block")},ve=e=>{const t=ke[e];return t?(0,o.createElement)(p.Notice,{status:"warning",isDismissible:!1},(0,o.createElement)("p",null,t)):null},Se=(0,p.withSpokenMessages)((({attributes:e,setAttributes:t,debouncedSpeak:r,clientId:n})=>{const{attributeId:c,displayStyle:b,heading:g,headingLevel:w,isPreview:h,queryType:_,showCounts:f,showFilterButton:E,selectType:y}=e,[k,v]=(0,o.useState)(!c&&!h),S=(0,l.useBlockProps)(),C=e=>{if(!e||!e.length)return;const r=e[0].id;ye.find((e=>e.attribute_id===r.toString()))&&c!==r&&t({attributeId:r})},x=({isCompact:e})=>{const t={clear:(0,d.__)("Clear selected attribute","woo-gutenberg-products-block"),list:(0,d.__)("Product Attributes","woo-gutenberg-products-block"),noItems:(0,d.__)("Your store doesn't have any product attributes.","woo-gutenberg-products-block"),search:(0,d.__)("Search for a product attribute:","woo-gutenberg-products-block"),selected:e=>(0,d.sprintf)(/* translators: %d is the number of attributes selected. */
(0,d._n)("%d attribute selected","%d attributes selected",e,"woo-gutenberg-products-block"),e),updated:(0,d.__)("Product attribute search results updated.","woo-gutenberg-products-block")},r=(0,u.DY)(ye.map((e=>({id:parseInt(e.attribute_id,10),name:e.attribute_label})))).asc("name");return(0,o.createElement)(P,{className:"woocommerce-product-attributes",list:r,selected:r.filter((({id:e})=>e===c)),onChange:C,messages:t,isSingle:!0,isCompact:e})};return 0===Object.keys(ye).length?(0,o.createElement)(p.Placeholder,{className:"wc-block-attribute-filter",icon:(0,o.createElement)(a.Z,{icon:s.Z}),label:(0,d.__)("Filter by Attribute","woo-gutenberg-products-block"),instructions:(0,d.__)("Display a list of filters based on the selected attributes.","woo-gutenberg-products-block")},(0,o.createElement)("p",null,(0,d.__)("Attributes are needed for filtering your products. You haven't created any attributes yet.","woo-gutenberg-products-block")),(0,o.createElement)(p.Button,{className:"wc-block-attribute-filter__add-attribute-button",isSecondary:!0,href:(0,R.getAdminLink)("edit.php?post_type=product&page=product_attributes"),target:"_top"},(0,d.__)("Add new attribute","woo-gutenberg-products-block")+" ",(0,o.createElement)(a.Z,{icon:m.Z})),(0,o.createElement)(p.Button,{className:"wc-block-attribute-filter__read_more_button",isTertiary:!0,href:"https://docs.woocommerce.com/document/managing-product-taxonomies/",target:"_blank"},(0,d.__)("Learn more","woo-gutenberg-products-block"))):(0,o.createElement)("div",{...S},(0,o.createElement)(l.BlockControls,null,(0,o.createElement)(p.ToolbarGroup,{controls:[{icon:"edit",title:(0,d.__)("Edit","woo-gutenberg-products-block"),onClick:()=>v(!k),isActive:k}]})),(0,o.createElement)(l.InspectorControls,{key:"inspector"},(0,o.createElement)(p.PanelBody,{title:(0,d.__)("Display Settings","woo-gutenberg-products-block")},(0,o.createElement)(p.ToggleControl,{label:(0,d.__)("Display product count","woo-gutenberg-products-block"),checked:f,onChange:()=>t({showCounts:!f})}),(0,o.createElement)(p.__experimentalToggleGroupControl,{label:(0,d.__)("Allow selecting multiple options?","woo-gutenberg-products-block"),value:y||"multiple",onChange:e=>t({selectType:e}),className:"wc-block-attribute-filter__multiple-toggle"},(0,o.createElement)(p.__experimentalToggleGroupControlOption,{value:"multiple",label:(0,d.__)("Multiple","woo-gutenberg-products-block")}),(0,o.createElement)(p.__experimentalToggleGroupControlOption,{value:"single",label:(0,d.__)("Single","woo-gutenberg-products-block")})),"multiple"===y&&(0,o.createElement)(p.__experimentalToggleGroupControl,{label:(0,d.__)("Filter Conditions","woo-gutenberg-products-block"),help:"and"===_?(0,d.__)("Choose to return filter results for all of the attributes selected.","woo-gutenberg-products-block"):(0,d.__)("Choose to return filter results for any of the attributes selected.","woo-gutenberg-products-block"),value:_,onChange:e=>t({queryType:e}),className:"wc-block-attribute-filter__conditions-toggle"},(0,o.createElement)(p.__experimentalToggleGroupControlOption,{value:"and",label:(0,d.__)("All","woo-gutenberg-products-block")}),(0,o.createElement)(p.__experimentalToggleGroupControlOption,{value:"or",label:(0,d.__)("Any","woo-gutenberg-products-block")})),(0,o.createElement)(p.__experimentalToggleGroupControl,{label:(0,d.__)("Display Style","woo-gutenberg-products-block"),value:b,onChange:e=>t({displayStyle:e}),className:"wc-block-attribute-filter__display-toggle"},(0,o.createElement)(p.__experimentalToggleGroupControlOption,{value:"list",label:(0,d.__)("List","woo-gutenberg-products-block")}),(0,o.createElement)(p.__experimentalToggleGroupControlOption,{value:"dropdown",label:(0,d.__)("Dropdown","woo-gutenberg-products-block")})),(0,o.createElement)(p.ToggleControl,{label:(0,d.__)("Show 'Apply filters' button","woo-gutenberg-products-block"),help:(0,d.__)("Products will update when the button is clicked.","woo-gutenberg-products-block"),checked:E,onChange:e=>t({showFilterButton:e})})),(0,o.createElement)(p.PanelBody,{title:(0,d.__)("Content Settings","woo-gutenberg-products-block"),initialOpen:!1},x({isCompact:!0}))),(0,o.createElement)(Ee,{clientId:n,attributes:e,setAttributes:t,filterType:"attribute-filter"}),k?(0,o.createElement)(p.Placeholder,{className:"wc-block-attribute-filter",icon:(0,o.createElement)(a.Z,{icon:s.Z}),label:(0,d.__)("Filter by Attribute","woo-gutenberg-products-block")},(0,o.createElement)("div",{className:"wc-block-attribute-filter__instructions"},(0,d.__)("Display a list of filters based on the selected attributes.","woo-gutenberg-products-block")),(0,o.createElement)("div",{className:"wc-block-attribute-filter__selection"},x({isCompact:!1}),(0,o.createElement)(p.Button,{isPrimary:!0,onClick:()=>{v(!1),r((0,d.__)("Now displaying a preview of the Filter Products by Attribute block.","woo-gutenberg-products-block"))}},(0,d.__)("Done","woo-gutenberg-products-block")))):(0,o.createElement)("div",{className:i()("wc-block-attribute-filter")},g&&(0,o.createElement)(I,{className:"wc-block-attribute-filter__title",headingLevel:w,heading:g,onChange:e=>t({heading:e})}),(0,o.createElement)(p.Disabled,null,(0,o.createElement)(fe,{attributes:e,isEditor:!0,getNotice:ve}))))})),Ce={heading:{type:"string",default:(0,d.__)("Filter by attribute","woo-gutenberg-products-block")}},xe=JSON.parse('{"name":"woocommerce/attribute-filter","version":"1.0.0","title":"Filter by Attribute Controls","description":"Enable customers to filter the product grid by selecting one or more attributes, such as color.","category":"woocommerce","keywords":["WooCommerce"],"supports":{"html":false,"color":{"text":true,"background":false},"inserter":false,"lock":false},"attributes":{"className":{"type":"string","default":""},"attributeId":{"type":"number","default":0},"showCounts":{"type":"boolean","default":false},"queryType":{"type":"string","default":"or"},"headingLevel":{"type":"number","default":3},"displayStyle":{"type":"string","default":"list"},"showFilterButton":{"type":"boolean","default":false},"selectType":{"type":"string","default":"multiple"},"isPreview":{"type":"boolean","default":false}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}');var Ne;const Te=(0,R.getSetting)("wcBlocksConfig",{buildPhase:1,pluginUrl:"",productCount:0,defaultAvatar:"",restApiRoutes:{},wordCountType:"words"}),Ae=(Te.pluginUrl,Te.pluginUrl,Te.buildPhase),Oe=(null===(Ne=R.STORE_PAGES.shop)||void 0===Ne||Ne.permalink,R.STORE_PAGES.checkout.id,R.STORE_PAGES.checkout.permalink,R.STORE_PAGES.privacy.permalink,R.STORE_PAGES.privacy.title,R.STORE_PAGES.terms.permalink,R.STORE_PAGES.terms.title,R.STORE_PAGES.cart.id,R.STORE_PAGES.cart.permalink,R.STORE_PAGES.myaccount.permalink?R.STORE_PAGES.myaccount.permalink:(0,R.getSetting)("wpLoginUrl","/wp-login.php"),(0,R.getSetting)("localPickupEnabled",!1),(0,R.getSetting)("countries",{})),Pe=(0,R.getSetting)("countryData",{}),Re=(Object.fromEntries(Object.keys(Pe).filter((e=>!0===Pe[e].allowBilling)).map((e=>[e,Oe[e]||""]))),Object.fromEntries(Object.keys(Pe).filter((e=>!0===Pe[e].allowBilling)).map((e=>[e,Pe[e].states||[]]))),Object.fromEntries(Object.keys(Pe).filter((e=>!0===Pe[e].allowShipping)).map((e=>[e,Oe[e]||""]))),Object.fromEntries(Object.keys(Pe).filter((e=>!0===Pe[e].allowShipping)).map((e=>[e,Pe[e].states||[]]))),Object.fromEntries(Object.keys(Pe).map((e=>[e,Pe[e].locale||[]]))),[{supports:{...xe.supports,...Ae>1&&{__experimentalBorder:{radius:!1,color:!0,width:!1}}},attributes:{...xe.attributes,showCounts:{type:"boolean",default:!0},...Ce},save:({attributes:e})=>{const{className:t,showCounts:r,queryType:n,attributeId:a,heading:s,headingLevel:c,displayStyle:u,showFilterButton:d,selectType:m}=e,p={"data-attribute-id":a,"data-show-counts":r,"data-query-type":n,"data-heading":s,"data-heading-level":c};return"list"!==u&&(p["data-display-style"]=u),d&&(p["data-show-filter-button"]=d),"single"===m&&(p["data-select-type"]=m),(0,o.createElement)("div",{...l.useBlockProps.save({className:i()("is-loading",t)}),...p},(0,o.createElement)("span",{"aria-hidden":!0,className:"wc-block-product-attribute-filter__placeholder"}))}}]);(0,n.registerBlockType)(xe,{icon:{src:(0,o.createElement)(a.Z,{icon:s.Z,className:"wc-block-editor-components-block-icon"})},supports:{...xe.supports},attributes:{...xe.attributes,...Ce},edit:Se,save({attributes:e}){const{className:t}=e;return(0,o.createElement)("div",{...l.useBlockProps.save({className:i()("is-loading",t)})})},deprecated:Re})},1724:()=>{},7732:()=>{},770:()=>{},994:()=>{},230:()=>{},9004:()=>{},3057:()=>{},7118:()=>{},8462:()=>{},5932:()=>{},9196:e=>{"use strict";e.exports=window.React},2819:e=>{"use strict";e.exports=window.lodash},5158:e=>{"use strict";e.exports=window.wp.a11y},4333:e=>{"use strict";e.exports=window.wp.compose},7180:e=>{"use strict";e.exports=window.wp.deprecated},5904:e=>{"use strict";e.exports=window.wp.dom},9307:e=>{"use strict";e.exports=window.wp.element},5736:e=>{"use strict";e.exports=window.wp.i18n},9127:e=>{"use strict";e.exports=window.wp.isShallowEqual},9630:e=>{"use strict";e.exports=window.wp.keycodes},444:e=>{"use strict";e.exports=window.wp.primitives},2560:e=>{"use strict";e.exports=window.wp.warning}},r={};function o(e){var n=r[e];if(void 0!==n)return n.exports;var l=r[e]={exports:{}};return t[e].call(l.exports,l,l.exports,o),l.exports}o.m=t,e=[],o.O=(t,r,n,l)=>{if(!r){var a=1/0;for(u=0;u<e.length;u++){for(var[r,n,l]=e[u],s=!0,c=0;c<r.length;c++)(!1&l||a>=l)&&Object.keys(o.O).every((e=>o.O[e](r[c])))?r.splice(c--,1):(s=!1,l<a&&(a=l));if(s){e.splice(u--,1);var i=n();void 0!==i&&(t=i)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[r,n,l]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.j=3259,(()=>{var e={3259:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var n,l,[a,s,c]=r,i=0;if(a.some((t=>0!==e[t]))){for(n in s)o.o(s,n)&&(o.m[n]=s[n]);if(c)var u=c(o)}for(t&&t(r);i<a.length;i++)l=a[i],o.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return o.O(u)},r=self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=o.O(void 0,[2869],(()=>o(8380)));n=o.O(n),((this.wc=this.wc||{}).blocks=this.wc.blocks||{})["attribute-filter"]=n})();