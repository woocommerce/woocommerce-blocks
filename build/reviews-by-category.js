(()=>{var e,t={2053:(e,t,r)=>{"use strict";r.r(t);var o=r(9196),n=r(5736);const s=window.wp.blocks;var a=r(1984),l=r(7286);const i=window.wp.blockEditor,c=window.wp.components;var d=r(4184),u=r.n(d),m=r(9307);function g(e,t,r){const o=new Set(t.map((e=>e[r])));return e.filter((e=>!o.has(e[r])))}const p=window.wp.htmlEntities,w={clear:(0,n.__)("Clear all selected items","woo-gutenberg-products-block"),noItems:(0,n.__)("No items found.","woo-gutenberg-products-block"),
/* Translators: %s search term */
noResults:(0,n.__)("No results for %s","woo-gutenberg-products-block"),search:(0,n.__)("Search for items","woo-gutenberg-products-block"),selected:e=>(0,n.sprintf)(/* translators: Number of items selected from list. */
(0,n._n)("%d item selected","%d items selected",e,"woo-gutenberg-products-block"),e),updated:(0,n.__)("Search results updated.","woo-gutenberg-products-block")},h=(e,t=e)=>{const r=e.reduce(((e,t)=>{const r=t.parent||0;return e[r]||(e[r]=[]),e[r].push(t),e}),{}),o=("id",t.reduce(((e,t)=>(e[String(t.id)]=t,e)),{}));const n=["0"],s=(e={})=>e.parent?[...s(o[e.parent]),e.name]:e.name?[e.name]:[],a=e=>e.map((e=>{const t=r[e.id];return n.push(""+e.id),{...e,breadcrumbs:s(o[e.parent]),children:t&&t.length?a(t):[]}})),l=a(r[0]||[]);return Object.entries(r).forEach((([e,t])=>{n.includes(e)||l.push(...a(t||[]))})),l},b=(e,t)=>{if(!t)return e;const r=new RegExp(`(${t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"ig");return e.split(r).map(((e,t)=>r.test(e)?(0,o.createElement)("strong",{key:t},e):(0,o.createElement)(m.Fragment,{key:t},e)))},v=({label:e})=>(0,o.createElement)("span",{className:"woocommerce-search-list__item-count"},e),_=e=>{const{item:t,search:r}=e,n=t.breadcrumbs&&t.breadcrumbs.length;return(0,o.createElement)("span",{className:"woocommerce-search-list__item-label"},n?(0,o.createElement)("span",{className:"woocommerce-search-list__item-prefix"},1===(s=t.breadcrumbs).length?s.slice(0,1).toString():2===s.length?s.slice(0,1).toString()+" › "+s.slice(-1).toString():s.slice(0,1).toString()+" … "+s.slice(-1).toString()):null,(0,o.createElement)("span",{className:"woocommerce-search-list__item-name"},b((0,p.decodeEntities)(t.name),r)));var s},k=({countLabel:e,className:t,depth:r=0,controlId:n="",item:s,isSelected:a,isSingle:l,onSelect:i,search:d="",selected:w,useExpandedPanelId:h,...k})=>{var E,y;const[f,R]=h,C=null!=e&&void 0!==s.count&&null!==s.count,S=!(null===(E=s.breadcrumbs)||void 0===E||!E.length),N=!(null===(y=s.children)||void 0===y||!y.length),P=f===s.id,T=u()(["woocommerce-search-list__item",`depth-${r}`,t],{"has-breadcrumbs":S,"has-children":N,"has-count":C,"is-expanded":P,"is-radio-button":l}),I=k.name||`search-list-item-${n}`,O=`${I}-${s.id}`,x=(0,m.useCallback)((()=>{R(P?-1:Number(s.id))}),[P,s.id,R]);return N?(0,o.createElement)("div",{className:T,onClick:x,onKeyDown:e=>"Enter"===e.key||" "===e.key?x():null,role:"treeitem",tabIndex:0},l?(0,o.createElement)(o.Fragment,null,(0,o.createElement)("input",{type:"radio",id:O,name:I,value:s.value,onChange:i(s),onClick:e=>e.stopPropagation(),checked:a,className:"woocommerce-search-list__item-input",...k}),(0,o.createElement)(_,{item:s,search:d}),C?(0,o.createElement)(v,{label:e||s.count}):null):(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.CheckboxControl,{className:"woocommerce-search-list__item-input",checked:a,...!a&&s.children.some((e=>w.find((t=>t.id===e.id))))?{indeterminate:!0}:{},label:b((0,p.decodeEntities)(s.name),d),onChange:()=>{a?i(g(w,s.children,"id"))():i(function(e,t,r){const o=g(t,e,"id");return[...e,...o]}(w,s.children))()},onClick:e=>e.stopPropagation()}),C?(0,o.createElement)(v,{label:e||s.count}):null)):(0,o.createElement)("label",{htmlFor:O,className:T},l?(0,o.createElement)(o.Fragment,null,(0,o.createElement)("input",{...k,type:"radio",id:O,name:I,value:s.value,onChange:i(s),checked:a,className:"woocommerce-search-list__item-input"}),(0,o.createElement)(_,{item:s,search:d})):(0,o.createElement)(c.CheckboxControl,{...k,id:O,name:I,className:"woocommerce-search-list__item-input",value:(0,p.decodeEntities)(s.value),label:b((0,p.decodeEntities)(s.name),d),onChange:i(s),checked:a}),C?(0,o.createElement)(v,{label:e||s.count}):null)},E=k;var y=r(5430),f=r(4333),R=r(906);r(5932);const C=({id:e,label:t,popoverContents:r,remove:s,screenReaderLabel:l,className:i=""})=>{const[d,g]=(0,m.useState)(!1),w=(0,f.useInstanceId)(C);if(l=l||t,!t)return null;t=(0,p.decodeEntities)(t);const h=u()("woocommerce-tag",i,{"has-remove":!!s}),b=`woocommerce-tag__label-${w}`,v=(0,o.createElement)(o.Fragment,null,(0,o.createElement)("span",{className:"screen-reader-text"},l),(0,o.createElement)("span",{"aria-hidden":"true"},t));return(0,o.createElement)("span",{className:h},r?(0,o.createElement)(c.Button,{className:"woocommerce-tag__text",id:b,onClick:()=>g(!0)},v):(0,o.createElement)("span",{className:"woocommerce-tag__text",id:b},v),r&&d&&(0,o.createElement)(c.Popover,{onClose:()=>g(!1)},r),s&&(0,o.createElement)(c.Button,{className:"woocommerce-tag__remove",onClick:s(e),label:(0,n.sprintf)(
// Translators: %s label.
(0,n.__)("Remove %s","woo-gutenberg-products-block"),t),"aria-describedby":b},(0,o.createElement)(a.Z,{icon:R.Z,size:20,className:"clear-icon",role:"img"})))},S=C;r(8462);const N=e=>(0,o.createElement)(E,{...e}),P=e=>{const{list:t,selected:r,renderItem:n,depth:s=0,onSelect:a,instanceId:l,isSingle:i,search:c,useExpandedPanelId:d}=e,[u]=d;return t?(0,o.createElement)(m.Fragment,null,t.map((t=>{var g,p;const w=null!==(g=t.children)&&void 0!==g&&g.length&&!i?t.children.every((({id:e})=>r.find((t=>t.id===e)))):!!r.find((({id:e})=>e===t.id)),h=(null===(p=t.children)||void 0===p?void 0:p.length)&&u===t.id;return(0,o.createElement)(m.Fragment,{key:t.id},(0,o.createElement)("li",null,n({item:t,isSelected:w,onSelect:a,isSingle:i,selected:r,search:c,depth:s,useExpandedPanelId:d,controlId:l})),h?(0,o.createElement)(P,{...e,list:t.children,depth:s+1}):null)}))):null},T=({isLoading:e,isSingle:t,selected:r,messages:s,onChange:a,onRemove:l})=>{if(e||t||!r)return null;const i=r.length;return(0,o.createElement)("div",{className:"woocommerce-search-list__selected"},(0,o.createElement)("div",{className:"woocommerce-search-list__selected-header"},(0,o.createElement)("strong",null,s.selected(i)),i>0?(0,o.createElement)(c.Button,{isLink:!0,isDestructive:!0,onClick:()=>a([]),"aria-label":s.clear},(0,n.__)("Clear all","woo-gutenberg-products-block")):null),i>0?(0,o.createElement)("ul",null,r.map(((e,t)=>(0,o.createElement)("li",{key:t},(0,o.createElement)(S,{label:e.name,id:e.id,remove:l}))))):null)},I=({filteredList:e,search:t,onSelect:r,instanceId:s,useExpandedPanelId:l,...i})=>{const{messages:c,renderItem:d,selected:u,isSingle:m}=i,g=d||N;return 0===e.length?(0,o.createElement)("div",{className:"woocommerce-search-list__list is-not-found"},(0,o.createElement)("span",{className:"woocommerce-search-list__not-found-icon"},(0,o.createElement)(a.Z,{icon:y.Z,role:"img"})),(0,o.createElement)("span",{className:"woocommerce-search-list__not-found-text"},t?(0,n.sprintf)(c.noResults,t):c.noItems)):(0,o.createElement)("ul",{className:"woocommerce-search-list__list"},(0,o.createElement)(P,{useExpandedPanelId:l,list:e,selected:u,renderItem:g,onSelect:r,instanceId:s,isSingle:m,search:t}))},O=e=>{const{className:t="",isCompact:r,isHierarchical:s,isLoading:a,isSingle:l,list:i,messages:d=w,onChange:g,onSearch:p,selected:b,type:v="text",debouncedSpeak:_}=e,[k,E]=(0,m.useState)(""),y=(0,m.useState)(-1),R=(0,f.useInstanceId)(O),C=(0,m.useMemo)((()=>({...w,...d})),[d]),S=(0,m.useMemo)((()=>((e,t,r)=>{if(!t)return r?h(e):e;const o=new RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"i"),n=e.map((e=>!!o.test(e.name)&&e)).filter(Boolean);return r?h(n,e):n})(i,k,s)),[i,k,s]);(0,m.useEffect)((()=>{_&&_(C.updated)}),[_,C]),(0,m.useEffect)((()=>{"function"==typeof p&&p(k)}),[k,p]);const N=(0,m.useCallback)((e=>()=>{l&&g([]);const t=b.findIndex((({id:t})=>t===e));g([...b.slice(0,t),...b.slice(t+1)])}),[l,b,g]),P=(0,m.useCallback)((e=>()=>{Array.isArray(e)?g(e):-1===b.findIndex((({id:t})=>t===e.id))?g(l?[e]:[...b,e]):N(e.id)()}),[l,N,g,b]),x=(0,m.useCallback)((e=>{const[t]=b.filter((t=>!e.find((e=>t.id===e.id))));N(t.id)()}),[N,b]);return(0,o.createElement)("div",{className:u()("woocommerce-search-list",t,{"is-compact":r,"is-loading":a,"is-token":"token"===v})},"text"===v&&(0,o.createElement)(T,{...e,onRemove:N,messages:C}),(0,o.createElement)("div",{className:"woocommerce-search-list__search"},"text"===v?(0,o.createElement)(c.TextControl,{label:C.search,type:"search",value:k,onChange:e=>E(e)}):(0,o.createElement)(c.FormTokenField,{disabled:a,label:C.search,onChange:x,onInputChange:e=>E(e),suggestions:[],__experimentalValidateInput:()=>!1,value:a?[(0,n.__)("Loading…","woo-gutenberg-products-block")]:b.map((e=>({...e,value:e.name}))),__experimentalShowHowTo:!1})),a?(0,o.createElement)("div",{className:"woocommerce-search-list__list"},(0,o.createElement)(c.Spinner,null)):(0,o.createElement)(I,{...e,search:k,filteredList:S,messages:C,onSelect:P,instanceId:R,useExpandedPanelId:y}))},x=((0,c.withSpokenMessages)(O),window.wp.url),L=window.wp.apiFetch;var A=r.n(L);const M=window.wc.wcSettings;var j,D,B,Z,$,F,H,G,W,U;const J=(0,M.getSetting)("wcBlocksConfig",{buildPhase:1,pluginUrl:"",productCount:0,defaultAvatar:"",restApiRoutes:{},wordCountType:"words"}),z=(J.pluginUrl,J.pluginUrl,J.buildPhase,null===(j=M.STORE_PAGES.shop)||void 0===j||j.permalink,null===(D=M.STORE_PAGES.checkout)||void 0===D||D.id,null===(B=M.STORE_PAGES.checkout)||void 0===B||B.permalink,null===(Z=M.STORE_PAGES.privacy)||void 0===Z||Z.permalink,null===($=M.STORE_PAGES.privacy)||void 0===$||$.title,null===(F=M.STORE_PAGES.terms)||void 0===F||F.permalink,null===(H=M.STORE_PAGES.terms)||void 0===H||H.title,null===(G=M.STORE_PAGES.cart)||void 0===G||G.id,null===(W=M.STORE_PAGES.cart)||void 0===W||W.permalink,null!==(U=M.STORE_PAGES.myaccount)&&void 0!==U&&U.permalink?M.STORE_PAGES.myaccount.permalink:(0,M.getSetting)("wpLoginUrl","/wp-login.php"),(0,M.getSetting)("localPickupEnabled",!1),(0,M.getSetting)("countries",{})),V=(0,M.getSetting)("countryData",{}),q=(Object.fromEntries(Object.keys(V).filter((e=>!0===V[e].allowBilling)).map((e=>[e,z[e]||""]))),Object.fromEntries(Object.keys(V).filter((e=>!0===V[e].allowBilling)).map((e=>[e,V[e].states||[]]))),Object.fromEntries(Object.keys(V).filter((e=>!0===V[e].allowShipping)).map((e=>[e,z[e]||""]))),Object.fromEntries(Object.keys(V).filter((e=>!0===V[e].allowShipping)).map((e=>[e,V[e].states||[]]))),Object.fromEntries(Object.keys(V).map((e=>[e,V[e].locale||[]]))),async e=>{if(!("json"in e))return{message:e.message,type:e.type||"general"};try{const t=await e.json();return{message:t.message,type:t.type||"api"}}catch(e){return{message:e.message,type:"general"}}}),K=(0,f.createHigherOrderComponent)((e=>class extends m.Component{constructor(){super(...arguments),this.state={error:null,loading:!1,categories:[]},this.loadCategories=this.loadCategories.bind(this)}componentDidMount(){this.loadCategories()}loadCategories(){this.setState({loading:!0}),A()({path:(0,x.addQueryArgs)("wc/store/v1/products/categories",{per_page:0})}).then((e=>{this.setState({categories:e,loading:!1,error:null})})).catch((async e=>{const t=await q(e);this.setState({categories:[],loading:!1,error:t})}))}render(){const{error:t,loading:r,categories:n}=this.state;return(0,o.createElement)(e,{...this.props,error:t,isLoading:r,categories:n})}}),"withCategories"),Q=window.wp.escapeHtml,Y=({error:e})=>(0,o.createElement)("div",{className:"wc-block-error-message"},(({message:e,type:t})=>e?"general"===t?(0,o.createElement)("span",null,(0,n.__)("The following error was returned","woo-gutenberg-products-block"),(0,o.createElement)("br",null),(0,o.createElement)("code",null,(0,Q.escapeHTML)(e))):"api"===t?(0,o.createElement)("span",null,(0,n.__)("The following error was returned from the API","woo-gutenberg-products-block"),(0,o.createElement)("br",null),(0,o.createElement)("code",null,(0,Q.escapeHTML)(e))):e:(0,n.__)("An error has prevented the block from being updated.","woo-gutenberg-products-block"))(e));r(3366);const X=({categories:e,error:t,isLoading:r,onChange:s,onOperatorChange:a,operator:l,selected:i,isCompact:d,isSingle:m,showReviewCount:g})=>{const p={clear:(0,n.__)("Clear all product categories","woo-gutenberg-products-block"),list:(0,n.__)("Product Categories","woo-gutenberg-products-block"),noItems:(0,n.__)("Your store doesn't have any product categories.","woo-gutenberg-products-block"),search:(0,n.__)("Search for product categories","woo-gutenberg-products-block"),selected:e=>(0,n.sprintf)(/* translators: %d is the count of selected categories. */
(0,n._n)("%d category selected","%d categories selected",e,"woo-gutenberg-products-block"),e),updated:(0,n.__)("Category search results updated.","woo-gutenberg-products-block")};return t?(0,o.createElement)(Y,{error:t}):(0,o.createElement)(o.Fragment,null,(0,o.createElement)(O,{className:"woocommerce-product-categories",list:e,isLoading:r,selected:i.map((t=>e.find((e=>e.id===t)))).filter(Boolean),onChange:s,renderItem:e=>{const{item:t,search:r,depth:s=0}=e,a=t.breadcrumbs.length?`${t.breadcrumbs.join(", ")}, ${t.name}`:t.name,l=g?(0,n.sprintf)(/* translators: %1$s is the item name, %2$d is the count of reviews for the item. */
(0,n._n)("%1$s, has %2$d review","%1$s, has %2$d reviews",t.review_count,"woo-gutenberg-products-block"),a,t.review_count):(0,n.sprintf)(/* translators: %1$s is the item name, %2$d is the count of products for the item. */
(0,n._n)("%1$s, has %2$d product","%1$s, has %2$d products",t.count,"woo-gutenberg-products-block"),a,t.count),i=g?(0,n.sprintf)(/* translators: %d is the count of reviews. */
(0,n._n)("%d review","%d reviews",t.review_count,"woo-gutenberg-products-block"),t.review_count):(0,n.sprintf)(/* translators: %d is the count of products. */
(0,n._n)("%d product","%d products",t.count,"woo-gutenberg-products-block"),t.count);return(0,o.createElement)(k,{className:u()("woocommerce-product-categories__item","has-count",{"is-searching":r.length>0,"is-skip-level":0===s&&0!==t.parent}),...e,countLabel:i,"aria-label":l})},messages:p,isCompact:d,isHierarchical:!0,isSingle:m}),!!a&&(0,o.createElement)("div",{hidden:i.length<2},(0,o.createElement)(c.SelectControl,{className:"woocommerce-product-categories__operator",label:(0,n.__)("Display products matching","woo-gutenberg-products-block"),help:(0,n.__)("Pick at least two categories to use this setting.","woo-gutenberg-products-block"),value:l,onChange:a,options:[{label:(0,n.__)("Any selected categories","woo-gutenberg-products-block"),value:"any"},{label:(0,n.__)("All selected categories","woo-gutenberg-products-block"),value:"all"}]})))};X.defaultProps={operator:"any",isCompact:!1,isSingle:!1};const ee=K(X);var te=r(7329);r(2513);const re=({className:e="",error:t,isLoading:r=!1,onRetry:s})=>(0,o.createElement)(c.Placeholder,{icon:(0,o.createElement)(a.Z,{icon:te.Z}),label:(0,n.__)("Sorry, an error occurred","woo-gutenberg-products-block"),className:u()("wc-block-api-error",e)},(0,o.createElement)(Y,{error:t}),s&&(0,o.createElement)(o.Fragment,null,r?(0,o.createElement)(c.Spinner,null):(0,o.createElement)(c.Button,{isSecondary:!0,onClick:s},(0,n.__)("Retry","woo-gutenberg-products-block"))));r(7349);const oe=({label:e,screenReaderLabel:t,wrapperElement:r,wrapperProps:n={}})=>{let s;const a=null!=e,l=null!=t;return!a&&l?(s=r||"span",n={...n,className:u()(n.className,"screen-reader-text")},(0,o.createElement)(s,{...n},t)):(s=r||m.Fragment,a&&l&&e!==t?(0,o.createElement)(s,{...n},(0,o.createElement)("span",{"aria-hidden":"true"},e),(0,o.createElement)("span",{className:"screen-reader-text"},t)):(0,o.createElement)(s,{...n},e))},ne=({onClick:e,label:t=(0,n.__)("Load more","woo-gutenberg-products-block"),screenReaderLabel:r=(0,n.__)("Load more","woo-gutenberg-products-block")})=>(0,o.createElement)("div",{className:"wp-block-button wc-block-load-more wc-block-components-load-more"},(0,o.createElement)("button",{className:"wp-block-button__link",onClick:e},(0,o.createElement)(oe,{label:t,screenReaderLabel:r}))),se=window.wc.blocksComponents;r(8543);const ae=({onChange:e,readOnly:t,value:r})=>(0,o.createElement)(se.SortSelect,{className:"wc-block-review-sort-select wc-block-components-review-sort-select",label:(0,n.__)("Order by","woo-gutenberg-products-block"),onChange:e,options:[{key:"most-recent",label:(0,n.__)("Most recent","woo-gutenberg-products-block")},{key:"highest-rating",label:(0,n.__)("Highest rating","woo-gutenberg-products-block")},{key:"lowest-rating",label:(0,n.__)("Lowest rating","woo-gutenberg-products-block")}],readOnly:t,screenReaderLabel:(0,n.__)("Order reviews by","woo-gutenberg-products-block"),value:r});var le=r(4942);function ie(e){let t,r,o,n=[];for(let s=0;s<e.length;s++)t=e.substring(s),r=t.match(/^&[a-z0-9#]+;/),r?(o=r[0],n.push(o),s+=o.length-1):n.push(e[s]);return n}const ce=(e,t,r="...")=>{const o=function(e,t){const r=(t=t||{}).limit||100,o=void 0===t.preserveTags||t.preserveTags,n=void 0!==t.wordBreak&&t.wordBreak,s=t.suffix||"...",a=t.moreLink||"",l=t.moreText||"»",i=t.preserveWhiteSpace||!1,c=e.replace(/</g,"\n<").replace(/>/g,">\n").replace(/\n\n/g,"\n").replace(/^\n/g,"").replace(/\n$/g,"").split("\n");let d,u,m,g,p,w,h=0,b=[],v=!1;for(let e=0;e<c.length;e++){if(d=c[e],g=i?d:d.replace(/[ ]+/g," "),!d.length)continue;const t=ie(g);if("<"!==d[0])if(h>=r)d="";else if(h+t.length>=r){if(u=r-h," "===t[u-1])for(;u&&(u-=1," "===t[u-1]););else m=t.slice(u).indexOf(" "),n||(-1!==m?u+=m:u=d.length);d=t.slice(0,u).join("")+s,a&&(d+='<a href="'+a+'" style="display:inline">'+l+"</a>"),h=r,v=!0}else h+=t.length;else if(o){if(h>=r)if(p=d.match(/[a-zA-Z]+/),w=p?p[0]:"",w)if("</"!==d.substring(0,2))b.push(w),d="";else{for(;b[b.length-1]!==w&&b.length;)b.pop();b.length&&(d=""),b.pop()}else d=""}else d="";c[e]=d}return{html:c.join("\n").replace(/\n/g,""),more:v}}(e,{suffix:r,limit:t});return o.html},de=(e,t,r)=>(t<=r?e.start=e.middle+1:e.end=e.middle-1,e),ue=(e,t,r,o)=>{const n=((e,t,r)=>{let o={start:0,middle:0,end:e.length};for(;o.start<=o.end;)o.middle=Math.floor((o.start+o.end)/2),t.innerHTML=ce(e,o.middle),o=de(o,t.clientHeight,r);return o.middle})(e,t,r);return ce(e,n-o.length,o)},me={className:"read-more-content",ellipsis:"&hellip;",lessText:(0,n.__)("Read less","woo-gutenberg-products-block"),maxLines:3,moreText:(0,n.__)("Read more","woo-gutenberg-products-block")};class ge extends m.Component{constructor(e){super(e),(0,le.Z)(this,"reviewSummary",void 0),(0,le.Z)(this,"reviewContent",void 0),this.state={isExpanded:!1,clampEnabled:null,content:e.children,summary:"."},this.reviewContent=(0,m.createRef)(),this.reviewSummary=(0,m.createRef)(),this.getButton=this.getButton.bind(this),this.onClick=this.onClick.bind(this)}componentDidMount(){this.setSummary()}componentDidUpdate(e){e.maxLines===this.props.maxLines&&e.children===this.props.children||this.setState({clampEnabled:null,summary:"."},this.setSummary)}setSummary(){if(this.props.children){const{maxLines:e,ellipsis:t}=this.props;if(!this.reviewSummary.current||!this.reviewContent.current)return;const r=(this.reviewSummary.current.clientHeight+1)*e+1,o=this.reviewContent.current.clientHeight+1>r;this.setState({clampEnabled:o}),o&&this.setState({summary:ue(this.reviewContent.current.innerHTML,this.reviewSummary.current,r,t)})}}getButton(){const{isExpanded:e}=this.state,{className:t,lessText:r,moreText:n}=this.props,s=e?r:n;if(s)return(0,o.createElement)("a",{href:"#more",className:t+"__read_more",onClick:this.onClick,"aria-expanded":!e,role:"button"},s)}onClick(e){e.preventDefault();const{isExpanded:t}=this.state;this.setState({isExpanded:!t})}render(){const{className:e}=this.props,{content:t,summary:r,clampEnabled:n,isExpanded:s}=this.state;return t?!1===n?(0,o.createElement)("div",{className:e},(0,o.createElement)("div",{ref:this.reviewContent},t)):(0,o.createElement)("div",{className:e},(!s||null===n)&&(0,o.createElement)("div",{ref:this.reviewSummary,"aria-hidden":s,dangerouslySetInnerHTML:{__html:r}}),(s||null===n)&&(0,o.createElement)("div",{ref:this.reviewContent,"aria-hidden":!s},t),this.getButton()):null}}(0,le.Z)(ge,"defaultProps",me);const pe=ge;r(8204);const we=({attributes:e,review:t={}})=>{const{imageType:r,showReviewDate:s,showReviewerName:a,showReviewImage:l,showReviewRating:i,showReviewContent:c,showProductName:d}=e,{rating:m}=t,g=!(Object.keys(t).length>0),p=Number.isFinite(m)&&i;return(0,o.createElement)("li",{className:u()("wc-block-review-list-item__item","wc-block-components-review-list-item__item",{"is-loading":g,"wc-block-components-review-list-item__item--has-image":l}),"aria-hidden":g},(d||s||a||l||p)&&(0,o.createElement)("div",{className:"wc-block-review-list-item__info wc-block-components-review-list-item__info"},l&&function(e,t,r){var s,a;return r||!e?(0,o.createElement)("div",{className:"wc-block-review-list-item__image wc-block-components-review-list-item__image"}):(0,o.createElement)("div",{className:"wc-block-review-list-item__image wc-block-components-review-list-item__image"},"product"===t?(0,o.createElement)("img",{"aria-hidden":"true",alt:(null===(s=e.product_image)||void 0===s?void 0:s.alt)||"",src:(null===(a=e.product_image)||void 0===a?void 0:a.thumbnail)||""}):(0,o.createElement)("img",{"aria-hidden":"true",alt:"",src:e.reviewer_avatar_urls[96]||""}),e.verified&&(0,o.createElement)("div",{className:"wc-block-review-list-item__verified wc-block-components-review-list-item__verified",title:(0,n.__)("Verified buyer","woo-gutenberg-products-block")},(0,n.__)("Verified buyer","woo-gutenberg-products-block")))}(t,r,g),(d||a||p||s)&&(0,o.createElement)("div",{className:"wc-block-review-list-item__meta wc-block-components-review-list-item__meta"},p&&function(e){const{rating:t}=e,r={width:t/5*100+"%"},s=(0,n.sprintf)(/* translators: %f is referring to the average rating value */
(0,n.__)("Rated %f out of 5","woo-gutenberg-products-block"),t),a={__html:(0,n.sprintf)(/* translators: %s is referring to the average rating value */
(0,n.__)("Rated %s out of 5","woo-gutenberg-products-block"),(0,n.sprintf)('<strong class="rating">%f</strong>',t))};return(0,o.createElement)("div",{className:"wc-block-review-list-item__rating wc-block-components-review-list-item__rating"},(0,o.createElement)("div",{className:"wc-block-review-list-item__rating__stars wc-block-components-review-list-item__rating__stars",role:"img","aria-label":s},(0,o.createElement)("span",{style:r,dangerouslySetInnerHTML:a})))}(t),d&&function(e){return(0,o.createElement)("div",{className:"wc-block-review-list-item__product wc-block-components-review-list-item__product"},(0,o.createElement)("a",{href:e.product_permalink,dangerouslySetInnerHTML:{__html:e.product_name}}))}(t),a&&function(e){const{reviewer:t=""}=e;return(0,o.createElement)("div",{className:"wc-block-review-list-item__author wc-block-components-review-list-item__author"},t)}(t),s&&function(e){const{date_created:t,formatted_date_created:r}=e;return(0,o.createElement)("time",{className:"wc-block-review-list-item__published-date wc-block-components-review-list-item__published-date",dateTime:t},r)}(t))),c&&function(e){return(0,o.createElement)(pe,{maxLines:10,moreText:(0,n.__)("Read full review","woo-gutenberg-products-block"),lessText:(0,n.__)("Hide full review","woo-gutenberg-products-block"),className:"wc-block-review-list-item__text wc-block-components-review-list-item__text"},(0,o.createElement)("div",{dangerouslySetInnerHTML:{__html:e.review||""}}))}(t))};r(4093);const he=({attributes:e,reviews:t})=>{const r=(0,M.getSetting)("showAvatars",!0),n=(0,M.getSetting)("reviewRatingsEnabled",!0),s=(r||"product"===e.imageType)&&e.showReviewImage,a=n&&e.showReviewRating,l={...e,showReviewImage:s,showReviewRating:a};return(0,o.createElement)("ul",{className:"wc-block-review-list wc-block-components-review-list"},0===t.length?(0,o.createElement)(we,{attributes:l}):t.map(((e,t)=>(0,o.createElement)(we,{key:e.id||t,attributes:l,review:e}))))};var be=r(9127),ve=r.n(be);const _e=e=>{const{className:t,categoryIds:r,productId:o,showReviewDate:n,showReviewerName:s,showReviewContent:a,showProductName:l,showReviewImage:i,showReviewRating:c}=e;let d="wc-block-all-reviews";return o&&(d="wc-block-reviews-by-product"),Array.isArray(r)&&(d="wc-block-reviews-by-category"),u()(d,t,{"has-image":i,"has-name":s,"has-date":n,"has-rating":c,"has-content":a,"has-product-name":l})},ke=e=>{const{categoryIds:t,imageType:r,orderby:o,productId:n,reviewsOnPageLoad:s,reviewsOnLoadMore:a,showLoadMore:l,showOrderby:i}=e,c={"data-image-type":r,"data-orderby":o,"data-reviews-on-page-load":s,"data-reviews-on-load-more":a,"data-show-load-more":l,"data-show-orderby":i};return n&&(c["data-product-id"]=n),Array.isArray(t)&&(c["data-category-ids"]=t.join(",")),c};class Ee extends m.Component{render(){const{attributes:e,error:t,isLoading:r,noReviewsPlaceholder:s,reviews:a,totalReviews:l}=this.props;if(t)return(0,o.createElement)(re,{className:"wc-block-featured-product-error",error:t,isLoading:r});if(0===a.length&&!r)return(0,o.createElement)(s,{attributes:e});const i=(0,M.getSetting)("reviewRatingsEnabled",!0);return(0,o.createElement)(c.Disabled,null,e.showOrderby&&i&&(0,o.createElement)(ae,{readOnly:!0,value:e.orderby,onChange:()=>null}),(0,o.createElement)(he,{attributes:e,reviews:a}),e.showLoadMore&&l>a.length&&(0,o.createElement)(ne,{screenReaderLabel:(0,n.__)("Load more reviews","woo-gutenberg-products-block")}))}}const ye=(e=>{class t extends m.Component{constructor(...e){super(...e),(0,le.Z)(this,"isPreview",!!this.props.attributes.previewReviews),(0,le.Z)(this,"delayedAppendReviews",this.props.delayFunction(this.appendReviews)),(0,le.Z)(this,"isMounted",!1),(0,le.Z)(this,"state",{error:null,loading:!0,reviews:this.isPreview?this.props.attributes.previewReviews:[],totalReviews:this.isPreview?this.props.attributes.previewReviews.length:0}),(0,le.Z)(this,"setError",(async e=>{if(!this.isMounted)return;const{onReviewsLoadError:t}=this.props,r=await q(e);this.setState({reviews:[],loading:!1,error:r}),t(r)}))}componentDidMount(){this.isMounted=!0,this.replaceReviews()}componentDidUpdate(e){e.reviewsToDisplay<this.props.reviewsToDisplay?this.delayedAppendReviews():this.shouldReplaceReviews(e,this.props)&&this.replaceReviews()}shouldReplaceReviews(e,t){return e.orderby!==t.orderby||e.order!==t.order||e.productId!==t.productId||!ve()(e.categoryIds,t.categoryIds)}componentWillUnmount(){this.isMounted=!1,this.delayedAppendReviews.cancel&&this.delayedAppendReviews.cancel()}getArgs(e){const{categoryIds:t,order:r,orderby:o,productId:n,reviewsToDisplay:s}=this.props,a={order:r,orderby:o,per_page:s-e,offset:e};if(t){const e=Array.isArray(t)?t:JSON.parse(t);a.category_id=Array.isArray(e)?e.join(","):e}return n&&(a.product_id=n),a}replaceReviews(){if(this.isPreview)return;const{onReviewsReplaced:e}=this.props;this.updateListOfReviews().then(e)}appendReviews(){if(this.isPreview)return;const{onReviewsAppended:e,reviewsToDisplay:t}=this.props,{reviews:r}=this.state;t<=r.length||this.updateListOfReviews(r).then(e)}updateListOfReviews(e=[]){const{reviewsToDisplay:t}=this.props,{totalReviews:r}=this.state,o=Math.min(r,t)-e.length;return this.setState({loading:!0,reviews:e.concat(Array(o).fill({}))}),(n=this.getArgs(e.length),A()({path:"/wc/store/v1/products/reviews?"+Object.entries(n).map((e=>e.join("="))).join("&"),parse:!1}).then((e=>e.json().then((t=>({reviews:t,totalReviews:parseInt(e.headers.get("x-wp-total"),10)})))))).then((({reviews:t,totalReviews:r})=>(this.isMounted&&this.setState({reviews:e.filter((e=>Object.keys(e).length)).concat(t),totalReviews:r,loading:!1,error:null}),{newReviews:t}))).catch(this.setError);var n}render(){const{reviewsToDisplay:t}=this.props,{error:r,loading:n,reviews:s,totalReviews:a}=this.state;return(0,o.createElement)(e,{...this.props,error:r,isLoading:n,reviews:s.slice(0,t),totalReviews:a})}}(0,le.Z)(t,"defaultProps",{delayFunction:e=>e,onReviewsAppended:()=>{},onReviewsLoadError:()=>{},onReviewsReplaced:()=>{}});const{displayName:r=e.name||"Component"}=e;return t.displayName=`WithReviews( ${r} )`,t})(Ee),fe=({attributes:e,icon:t,name:r,noReviewsPlaceholder:s})=>{const{categoryIds:a,productId:l,reviewsOnPageLoad:d,showProductName:u,showReviewDate:m,showReviewerName:g,showReviewContent:p,showReviewImage:w,showReviewRating:h}=e,{order:b,orderby:v}=(e=>{if((0,M.getSetting)("reviewRatingsEnabled",!0)){if("lowest-rating"===e)return{order:"asc",orderby:"rating"};if("highest-rating"===e)return{order:"desc",orderby:"rating"}}return{order:"desc",orderby:"date_gmt"}})(e.orderby),_=!(p||h||m||g||w||u),k=(0,i.useBlockProps)({className:_e(e)});return _?(0,o.createElement)(c.Placeholder,{icon:t,label:r},(0,n.__)("The content for this block is hidden due to block settings.","woo-gutenberg-products-block")):(0,o.createElement)("div",{...k},(0,o.createElement)(ye,{attributes:e,categoryIds:a,delayFunction:e=>((e,t,r)=>{let o,n=null;const s=(...t)=>{n=t,o&&clearTimeout(o),o=setTimeout((()=>{o=null,n&&e(...n)}),400)};return s.flush=()=>{o&&n&&(e(...n),clearTimeout(o),o=null)},s})(e),noReviewsPlaceholder:s,orderby:v,order:b,productId:l,reviewsToDisplay:d}))},Re=()=>(0,o.createElement)(c.Placeholder,{className:"wc-block-reviews-by-category",icon:(0,o.createElement)(a.Z,{icon:l.Z,className:"block-editor-block-icon"}),label:(0,n.__)("Reviews by Category","woo-gutenberg-products-block")},(0,n.__)("This block lists reviews for products from selected categories. The selected categories do not have any reviews yet, but they will show up here when they do.","woo-gutenberg-products-block")),Ce=(0,c.withSpokenMessages)((({attributes:e,debouncedSpeak:t,setAttributes:r})=>{const{editMode:s,categoryIds:d}=e;if(!d||s)return(0,o.createElement)(c.Placeholder,{icon:(0,o.createElement)(a.Z,{icon:l.Z,className:"block-editor-block-icon"}),label:(0,n.__)("Reviews by Category","woo-gutenberg-products-block"),className:"wc-block-reviews-by-category"},(0,n.__)("Show product reviews from specific categories.","woo-gutenberg-products-block"),(0,o.createElement)("div",{className:"wc-block-reviews__selection"},(0,o.createElement)(ee,{selected:e.categoryIds,onChange:(e=[])=>{const t=e.map((({id:e})=>e));r({categoryIds:t})},showReviewCount:!0}),(0,o.createElement)(c.Button,{isPrimary:!0,onClick:()=>{r({editMode:!1}),t((0,n.__)("Now displaying a preview of the reviews for the products in the selected categories.","woo-gutenberg-products-block"))}},(0,n.__)("Done","woo-gutenberg-products-block"))));const u=(0,n.__)("Edit selected categories","woo-gutenberg-products-block");return(0,o.createElement)(o.Fragment,null,((e,t,r)=>(0,o.createElement)(i.BlockControls,null,(0,o.createElement)(c.ToolbarGroup,{controls:[{icon:"edit",title:r,onClick:()=>t({editMode:!e}),isActive:e}]})))(s,r,u),(0,o.createElement)(i.InspectorControls,{key:"inspector"},(0,o.createElement)(c.PanelBody,{title:(0,n.__)("Category","woo-gutenberg-products-block"),initialOpen:!1},(0,o.createElement)(ee,{selected:e.categoryIds,onChange:(e=[])=>{const t=e.map((({id:e})=>e));r({categoryIds:t})},isCompact:!0,showReviewCount:!0})),(0,o.createElement)(c.PanelBody,{title:(0,n.__)("Content","woo-gutenberg-products-block")},(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Product name","woo-gutenberg-products-block"),checked:e.showProductName,onChange:()=>r({showProductName:!e.showProductName})}),((e,t)=>{const r=(0,M.getSetting)("showAvatars",!0),s=(0,M.getSetting)("reviewRatingsEnabled",!0);return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Product rating","woo-gutenberg-products-block"),checked:e.showReviewRating,onChange:()=>t({showReviewRating:!e.showReviewRating})}),e.showReviewRating&&!s&&(0,o.createElement)(c.Notice,{className:"wc-block-base-control-notice",isDismissible:!1},(0,m.createInterpolateElement)((0,n.__)("Product rating is disabled in your <a>store settings</a>.","woo-gutenberg-products-block"),{a:(0,o.createElement)("a",{href:(0,M.getAdminLink)("admin.php?page=wc-settings&tab=products"),target:"_blank",rel:"noopener noreferrer"})})),(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Reviewer name","woo-gutenberg-products-block"),checked:e.showReviewerName,onChange:()=>t({showReviewerName:!e.showReviewerName})}),(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Image","woo-gutenberg-products-block"),checked:e.showReviewImage,onChange:()=>t({showReviewImage:!e.showReviewImage})}),(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Review date","woo-gutenberg-products-block"),checked:e.showReviewDate,onChange:()=>t({showReviewDate:!e.showReviewDate})}),(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Review content","woo-gutenberg-products-block"),checked:e.showReviewContent,onChange:()=>t({showReviewContent:!e.showReviewContent})}),e.showReviewImage&&(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.__experimentalToggleGroupControl,{label:(0,n.__)("Review image","woo-gutenberg-products-block"),value:e.imageType,onChange:e=>t({imageType:e})},(0,o.createElement)(c.__experimentalToggleGroupControlOption,{value:"reviewer",label:(0,n.__)("Reviewer photo","woo-gutenberg-products-block")}),(0,o.createElement)(c.__experimentalToggleGroupControlOption,{value:"product",label:(0,n.__)("Product","woo-gutenberg-products-block")})),"reviewer"===e.imageType&&!r&&(0,o.createElement)(c.Notice,{className:"wc-block-base-control-notice",isDismissible:!1},(0,m.createInterpolateElement)((0,n.__)("Reviewer photo is disabled in your <a>site settings</a>.","woo-gutenberg-products-block"),{a:(0,o.createElement)("a",{href:(0,M.getAdminLink)("options-discussion.php"),target:"_blank",rel:"noopener noreferrer"})}))))})(e,r)),(0,o.createElement)(c.PanelBody,{title:(0,n.__)("List Settings","woo-gutenberg-products-block")},((e,t)=>(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Order by","woo-gutenberg-products-block"),checked:e.showOrderby,onChange:()=>t({showOrderby:!e.showOrderby})}),(0,o.createElement)(c.SelectControl,{label:(0,n.__)("Order Product Reviews by","woo-gutenberg-products-block"),value:e.orderby,options:[{label:"Most recent",value:"most-recent"},{label:"Highest Rating",value:"highest-rating"},{label:"Lowest Rating",value:"lowest-rating"}],onChange:e=>t({orderby:e})}),(0,o.createElement)(c.RangeControl,{label:(0,n.__)("Starting Number of Reviews","woo-gutenberg-products-block"),value:e.reviewsOnPageLoad,onChange:e=>t({reviewsOnPageLoad:e}),max:20,min:1}),(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Load more","woo-gutenberg-products-block"),checked:e.showLoadMore,onChange:()=>t({showLoadMore:!e.showLoadMore})}),e.showLoadMore&&(0,o.createElement)(c.RangeControl,{label:(0,n.__)("Load More Reviews","woo-gutenberg-products-block"),value:e.reviewsOnLoadMore,onChange:e=>t({reviewsOnLoadMore:e}),max:20,min:1})))(e,r))),(0,o.createElement)(fe,{attributes:e,icon:(0,o.createElement)(a.Z,{icon:l.Z,className:"block-editor-block-icon"}),name:(0,n.__)("Reviews by Category","woo-gutenberg-products-block"),noReviewsPlaceholder:Re}))}));r(6990);const Se={attributes:{editMode:!1,imageType:"reviewer",orderby:"most-recent",reviewsOnLoadMore:10,reviewsOnPageLoad:10,showLoadMore:!0,showOrderby:!0,showReviewDate:!0,showReviewerName:!0,showReviewImage:!0,showReviewRating:!0,showReviewContent:!0,previewReviews:[{id:1,date_created:"2019-07-15T17:05:04",formatted_date_created:(0,n.__)("July 15, 2019","woo-gutenberg-products-block"),date_created_gmt:"2019-07-15T15:05:04",product_id:0,product_name:(0,n.__)("WordPress Pennant","woo-gutenberg-products-block"),product_permalink:"#",
/* translators: An example person name used for the block previews. */
reviewer:(0,n.__)("Alice","woo-gutenberg-products-block"),review:`<p>${(0,n.__)("I bought this product last week and I'm very happy with it.","woo-gutenberg-products-block")}</p>\n`,reviewer_avatar_urls:{48:J.defaultAvatar,96:J.defaultAvatar},rating:5,verified:!0},{id:2,date_created:"2019-07-12T12:39:39",formatted_date_created:(0,n.__)("July 12, 2019","woo-gutenberg-products-block"),date_created_gmt:"2019-07-12T10:39:39",product_id:0,product_name:(0,n.__)("WordPress Pennant","woo-gutenberg-products-block"),product_permalink:"#",
/* translators: An example person name used for the block previews. */
reviewer:(0,n.__)("Bob","woo-gutenberg-products-block"),review:`<p>${(0,n.__)("This product is awesome, I love it!","woo-gutenberg-products-block")}</p>\n`,reviewer_avatar_urls:{48:J.defaultAvatar,96:J.defaultAvatar},rating:null,verified:!1}]}};(0,s.registerBlockType)("woocommerce/reviews-by-category",{apiVersion:2,title:(0,n.__)("Reviews by Category","woo-gutenberg-products-block"),icon:{src:(0,o.createElement)(a.Z,{icon:l.Z,className:"wc-block-editor-components-block-icon"})},category:"woocommerce",keywords:[(0,n.__)("WooCommerce","woo-gutenberg-products-block")],description:(0,n.__)("Show product reviews from specific categories.","woo-gutenberg-products-block"),supports:{html:!1,color:{background:!1},typography:{fontSize:!0}},example:{...Se,attributes:{...Se.attributes,categoryIds:[1],showProductName:!0}},attributes:{editMode:{type:"boolean",default:!0},imageType:{type:"string",default:"reviewer"},orderby:{type:"string",default:"most-recent"},reviewsOnLoadMore:{type:"number",default:10},reviewsOnPageLoad:{type:"number",default:10},showLoadMore:{type:"boolean",default:!0},showOrderby:{type:"boolean",default:!0},showReviewDate:{type:"boolean",default:!0},showReviewerName:{type:"boolean",default:!0},showReviewImage:{type:"boolean",default:!0},showReviewRating:{type:"boolean",default:!0},showReviewContent:{type:"boolean",default:!0},previewReviews:{type:"array",default:null},categoryIds:{type:"array",default:[]},showProductName:{type:"boolean",default:!0}},edit:e=>{const t=(0,i.useBlockProps)();return(0,o.createElement)("div",{...t},(0,o.createElement)(Ce,{...e}))},save:({attributes:e})=>(0,o.createElement)("div",{...i.useBlockProps.save({className:_e(e)}),...ke(e)})})},7349:()=>{},8204:()=>{},4093:()=>{},8543:()=>{},6990:()=>{},2513:()=>{},3366:()=>{},8462:()=>{},5932:()=>{},9196:e=>{"use strict";e.exports=window.React},4333:e=>{"use strict";e.exports=window.wp.compose},9307:e=>{"use strict";e.exports=window.wp.element},5736:e=>{"use strict";e.exports=window.wp.i18n},9127:e=>{"use strict";e.exports=window.wp.isShallowEqual},444:e=>{"use strict";e.exports=window.wp.primitives}},r={};function o(e){var n=r[e];if(void 0!==n)return n.exports;var s=r[e]={exports:{}};return t[e].call(s.exports,s,s.exports,o),s.exports}o.m=t,e=[],o.O=(t,r,n,s)=>{if(!r){var a=1/0;for(d=0;d<e.length;d++){for(var[r,n,s]=e[d],l=!0,i=0;i<r.length;i++)(!1&s||a>=s)&&Object.keys(o.O).every((e=>o.O[e](r[i])))?r.splice(i--,1):(l=!1,s<a&&(a=s));if(l){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[r,n,s]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.j=5280,(()=>{var e={5280:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var n,s,[a,l,i]=r,c=0;if(a.some((t=>0!==e[t]))){for(n in l)o.o(l,n)&&(o.m[n]=l[n]);if(i)var d=i(o)}for(t&&t(r);c<a.length;c++)s=a[c],o.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return o.O(d)},r=self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=o.O(void 0,[2869],(()=>o(2053)));n=o.O(n),((this.wc=this.wc||{}).blocks=this.wc.blocks||{})["reviews-by-category"]=n})();