(()=>{var e,t,r,o={9252:(e,t,r)=>{"use strict";r.d(t,{R:()=>o});let o=function(e){return e.SINGLE="single",e.THUMBNAIL="thumbnail",e}({})},8916:(e,t,r)=>{"use strict";r.d(t,{V:()=>o});const o=(e,t)=>e.reduce(((e,r)=>(e[String(t?r[t]:r)]=r,e)),{})},4649:(e,t,r)=>{"use strict";r.r(t);var o=r(4981),n=r(9307),c=r(1984),s=r(5795);const a=window.wc.wcBlocksRegistry;var l=r(5271);r.p=l.VF,(0,a.registerBlockComponent)({blockName:"woocommerce/product-price",component:(0,n.lazy)((()=>Promise.all([r.e(2869),r.e(5579)]).then(r.bind(r,6669))))}),(0,a.registerBlockComponent)({blockName:"woocommerce/product-image",component:(0,n.lazy)((()=>Promise.all([r.e(2869),r.e(3706)]).then(r.bind(r,2097))))}),(0,a.registerBlockComponent)({blockName:"woocommerce/product-title",component:(0,n.lazy)((()=>Promise.all([r.e(2869),r.e(6925)]).then(r.bind(r,9136))))}),(0,a.registerBlockComponent)({blockName:"woocommerce/product-rating",component:(0,n.lazy)((()=>Promise.all([r.e(2869),r.e(7385)]).then(r.bind(r,1382))))}),(0,a.registerBlockComponent)({blockName:"woocommerce/product-rating-stars",component:(0,n.lazy)((()=>Promise.all([r.e(2869),r.e(118)]).then(r.bind(r,89))))}),(0,a.registerBlockComponent)({blockName:"woocommerce/product-rating-counter",component:(0,n.lazy)((()=>Promise.all([r.e(2869),r.e(2918)]).then(r.bind(r,5042))))}),(0,a.registerBlockComponent)({blockName:"woocommerce/product-average-rating",component:(0,n.lazy)((()=>Promise.all([r.e(2869),r.e(3037)]).then(r.bind(r,2043))))}),(0,a.registerBlockComponent)({blockName:"woocommerce/product-button",component:(0,n.lazy)((()=>Promise.all([r.e(2869),r.e(8771)]).then(r.bind(r,4113))))}),(0,a.registerBlockComponent)({blockName:"woocommerce/product-summary",component:(0,n.lazy)((()=>Promise.all([r.e(2869),r.e(8185)]).then(r.bind(r,8281))))}),(0,a.registerBlockComponent)({blockName:"woocommerce/product-sale-badge",component:(0,n.lazy)((()=>Promise.all([r.e(2869),r.e(5432)]).then(r.bind(r,4498))))}),(0,a.registerBlockComponent)({blockName:"woocommerce/product-sku",component:(0,n.lazy)((()=>Promise.all([r.e(2869),r.e(9870)]).then(r.bind(r,8130))))}),(0,a.registerBlockComponent)({blockName:"woocommerce/product-stock-indicator",component:(0,n.lazy)((()=>Promise.all([r.e(2869),r.e(5445)]).then(r.bind(r,789))))}),(0,a.registerBlockComponent)({blockName:"woocommerce/product-add-to-cart",component:(0,n.lazy)((()=>Promise.all([r.e(2869),r.e(5800)]).then(r.bind(r,6996))))});const i=JSON.parse('{"name":"woocommerce/single-product","version":"1.0.0","icon":"info","title":"Single Product","description":"Display a single product.","category":"woocommerce","keywords":["WooCommerce"],"supports":{"align":["wide","full"]},"attributes":{"isPreview":{"type":"boolean","default":false},"productId":{"type":"number"}},"example":{"attributes":{"isPreview":true}},"usesContext":["postId","postType","queryId"],"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}');var d=r(5609),u=r(5736),m=r(229);const p=(0,u.__)("Product Title","woo-gutenberg-products-block");function g(e,{blockDescription:t,blockIcon:r,blockTitle:n,variationName:c,scope:s}){(0,o.registerBlockVariation)(e,{description:t,name:c,title:n,isActive:e=>e.__woocommerceNamespace===c,icon:{src:r},attributes:{__woocommerceNamespace:c},scope:s})}(0,n.createElement)(c.Z,{icon:m.Z,className:"wc-block-editor-components-block-icon"});const b="woocommerce/product-query/product-title";g("core/post-title",{blockDescription:(0,u.__)("Display the title of a product.","woo-gutenberg-products-block"),blockIcon:(0,n.createElement)(d.Icon,{icon:m.Z}),blockTitle:p,variationName:b,scope:["block"]});var h=r(897);const w=(0,u.__)("Product Summary","woo-gutenberg-products-block"),k=((0,n.createElement)(c.Z,{icon:h.Z,className:"wc-block-editor-components-block-icon"}),"woocommerce/product-query/product-summary");g("core/post-excerpt",{blockDescription:(0,u.__)("Display a short description about a product.","woo-gutenberg-products-block"),blockIcon:(0,n.createElement)(d.Icon,{icon:h.Z}),blockTitle:w,variationName:k,scope:["block"]});var v=r(9252);const E=(0,n.createElement)(c.Z,{icon:s.Z,className:"wc-block-editor-components-block-icon"}),_=[["core/columns",{},[["core/column",{},[["woocommerce/product-image",{showSaleBadge:!1,isDescendentOfSingleProductBlock:!0,imageSizing:v.R.SINGLE}]]],["core/column",{},[["core/post-title",{headingLevel:2,isLink:!0,__woocommerceNamespace:b}],["woocommerce/product-rating",{isDescendentOfSingleProductBlock:!0}],["woocommerce/product-price",{isDescendentOfSingleProductBlock:!0}],["core/post-excerpt",{__woocommerceNamespace:k}],["woocommerce/add-to-cart-form"],["woocommerce/product-meta"]]]]]],f=["core/columns","core/column",...Object.keys((y=i.name,(0,a.getRegisteredBlockComponents)(y)))];var y,S=r(4942),P=r(4333),N=r(6483),C=r(6989),x=r.n(C),I=r(4617);const B=({selected:e=[],search:t="",queryArgs:r={}})=>{const o=(({selected:e=[],search:t="",queryArgs:r={}})=>{const o=l.Cm.productCount>100,n={per_page:o?100:0,catalog_visibility:"any",search:t,orderby:"title",order:"asc"},c=[(0,N.addQueryArgs)("/wc/store/v1/products",{...n,...r})];return o&&e.length&&c.push((0,N.addQueryArgs)("/wc/store/v1/products",{catalog_visibility:"any",include:e,per_page:0})),c})({selected:e,search:t,queryArgs:r});return Promise.all(o.map((e=>x()({path:e})))).then((e=>{const t=((e,t)=>{const r=new Map;return e.filter((e=>{const o=t(e);return!r.has(o)&&(r.set(o,e),!0)}))})(e.flat(),(e=>e.id));return t.map((e=>({...e,parent:0})))})).catch((e=>{throw e}))},O=async e=>{if(!("json"in e))return{message:e.message,type:e.type||"general"};try{const t=await e.json();return{message:t.message,type:t.type||"api"}}catch(e){return{message:e.message,type:"general"}}},L=(0,P.createHigherOrderComponent)((e=>class extends n.Component{constructor(...e){super(...e),(0,S.Z)(this,"state",{error:null,loading:!1,product:"preview"===this.props.attributes.productId?this.props.attributes.previewProduct:null}),(0,S.Z)(this,"loadProduct",(()=>{const{productId:e}=this.props.attributes;"preview"!==e&&(e?(this.setState({loading:!0}),(e=>x()({path:`/wc/store/v1/products/${e}`}))(e).then((e=>{this.setState({product:e,loading:!1,error:null})})).catch((async e=>{const t=await O(e);this.setState({product:null,loading:!1,error:t})}))):this.setState({product:null,loading:!1,error:null}))}))}componentDidMount(){this.loadProduct()}componentDidUpdate(e){e.attributes.productId!==this.props.attributes.productId&&this.loadProduct()}render(){const{error:t,loading:r,product:o}=this.state;return(0,n.createElement)(e,{...this.props,error:t,getProduct:this.loadProduct,isLoading:r,product:o})}}),"withProduct"),T=({imageUrl:e=`${l.td}/block-error.svg`,header:t=(0,u.__)("Oops!","woo-gutenberg-products-block"),text:r=(0,u.__)("There was an error loading the content.","woo-gutenberg-products-block"),errorMessage:o,errorMessagePrefix:c=(0,u.__)("Error:","woo-gutenberg-products-block"),button:s,showErrorBlock:a=!0})=>a?(0,n.createElement)("div",{className:"wc-block-error wc-block-components-error"},e&&(0,n.createElement)("img",{className:"wc-block-error__image wc-block-components-error__image",src:e,alt:""}),(0,n.createElement)("div",{className:"wc-block-error__content wc-block-components-error__content"},t&&(0,n.createElement)("p",{className:"wc-block-error__header wc-block-components-error__header"},t),r&&(0,n.createElement)("p",{className:"wc-block-error__text wc-block-components-error__text"},r),o&&(0,n.createElement)("p",{className:"wc-block-error__message wc-block-components-error__message"},c?c+" ":"",o),s&&(0,n.createElement)("p",{className:"wc-block-error__button wc-block-components-error__button"},s))):null;r(4578);class A extends n.Component{constructor(...e){super(...e),(0,S.Z)(this,"state",{errorMessage:"",hasError:!1})}static getDerivedStateFromError(e){return void 0!==e.statusText&&void 0!==e.status?{errorMessage:(0,n.createElement)(n.Fragment,null,(0,n.createElement)("strong",null,e.status),": ",e.statusText),hasError:!0}:{errorMessage:e.message,hasError:!0}}render(){const{header:e,imageUrl:t,showErrorMessage:r=!0,showErrorBlock:o=!0,text:c,errorMessagePrefix:s,renderError:a,button:l}=this.props,{errorMessage:i,hasError:d}=this.state;return d?"function"==typeof a?a({errorMessage:i}):(0,n.createElement)(T,{showErrorBlock:o,errorMessage:r?i:null,header:e,imageUrl:t,text:c,errorMessagePrefix:s,button:l}):this.props.children}}const R=A;var j=r(6755);const $=window.wp.blockEditor;var M=r(2864);const D=e=>{const t=((0,M.useProductDataContext)().product||{}).id||e.productId||0;return t&&1!==t?(0,n.createElement)($.InspectorControls,null,(0,n.createElement)("div",{className:"wc-block-single-product__edit-card"},(0,n.createElement)("div",{className:"wc-block-single-product__edit-card-title"},(0,n.createElement)("a",{href:`${I.ADMIN_URL}post.php?post=${t}&action=edit`,target:"_blank",rel:"noopener noreferrer"},(0,u.__)("Edit this product's details","woo-gutenberg-products-block"),(0,n.createElement)(c.Z,{icon:j.Z,size:16}))),(0,n.createElement)("div",{className:"wc-block-single-product__edit-card-description"},(0,u.__)("Edit details such as title, price, description and more.","woo-gutenberg-products-block")))):null};var Z=r(7329),F=r(4184),V=r.n(F);const z=window.wp.escapeHtml,G=({error:e})=>(0,n.createElement)("div",{className:"wc-block-error-message"},(({message:e,type:t})=>e?"general"===t?(0,n.createElement)("span",null,(0,u.__)("The following error was returned","woo-gutenberg-products-block"),(0,n.createElement)("br",null),(0,n.createElement)("code",null,(0,z.escapeHTML)(e))):"api"===t?(0,n.createElement)("span",null,(0,u.__)("The following error was returned from the API","woo-gutenberg-products-block"),(0,n.createElement)("br",null),(0,n.createElement)("code",null,(0,z.escapeHTML)(e))):e:(0,u.__)("An error has prevented the block from being updated.","woo-gutenberg-products-block"))(e));r(2513);const U=({className:e,error:t,isLoading:r=!1,onRetry:o})=>(0,n.createElement)(d.Placeholder,{icon:(0,n.createElement)(c.Z,{icon:Z.Z}),label:(0,u.__)("Sorry, an error occurred","woo-gutenberg-products-block"),className:V()("wc-block-api-error",e)},(0,n.createElement)(G,{error:t}),o&&(0,n.createElement)(n.Fragment,null,r?(0,n.createElement)(d.Spinner,null):(0,n.createElement)(d.Button,{isSecondary:!0,onClick:o},(0,u.__)("Retry","woo-gutenberg-products-block")))),q=window.wc.data;var H=r(9818),J=(r(9763),r(51));function W(e,t,r){const o=new Set(t.map((e=>e[r])));return e.filter((e=>!o.has(e[r])))}var Q=r(2629),K=r(8916);const Y={clear:(0,u.__)("Clear all selected items","woo-gutenberg-products-block"),noItems:(0,u.__)("No items found.","woo-gutenberg-products-block"),
/* Translators: %s search term */
noResults:(0,u.__)("No results for %s","woo-gutenberg-products-block"),search:(0,u.__)("Search for items","woo-gutenberg-products-block"),selected:e=>(0,u.sprintf)(/* translators: Number of items selected from list. */
(0,u._n)("%d item selected","%d items selected",e,"woo-gutenberg-products-block"),e),updated:(0,u.__)("Search results updated.","woo-gutenberg-products-block")},X=(e,t=e)=>{const r=e.reduce(((e,t)=>{const r=t.parent||0;return e[r]||(e[r]=[]),e[r].push(t),e}),{}),o=(0,K.V)(t,"id"),n=["0"],c=(e={})=>e.parent?[...c(o[e.parent]),e.name]:e.name?[e.name]:[],s=e=>e.map((e=>{const t=r[e.id];return n.push(""+e.id),{...e,breadcrumbs:c(o[e.parent]),children:t&&t.length?s(t):[]}})),a=s(r[0]||[]);return Object.entries(r).forEach((([e,t])=>{n.includes(e)||a.push(...s(t||[]))})),a},ee=(e,t)=>{if(!t)return e;const r=new RegExp(`(${t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"ig");return e.split(r).map(((e,t)=>r.test(e)?(0,n.createElement)("strong",{key:t},e):(0,n.createElement)(n.Fragment,{key:t},e)))},te=({label:e})=>(0,n.createElement)("span",{className:"woocommerce-search-list__item-count"},e),re=e=>{const{item:t,search:r}=e,o=t.breadcrumbs&&t.breadcrumbs.length;return(0,n.createElement)("span",{className:"woocommerce-search-list__item-label"},o?(0,n.createElement)("span",{className:"woocommerce-search-list__item-prefix"},1===(c=t.breadcrumbs).length?c.slice(0,1).toString():2===c.length?c.slice(0,1).toString()+" › "+c.slice(-1).toString():c.slice(0,1).toString()+" … "+c.slice(-1).toString()):null,(0,n.createElement)("span",{className:"woocommerce-search-list__item-name"},ee((0,Q.decodeEntities)(t.name),r)));var c},oe=({countLabel:e,className:t,depth:r=0,controlId:o="",item:c,isSelected:s,isSingle:a,onSelect:l,search:i="",selected:u,useExpandedPanelId:m,...p})=>{var g,b;const[h,w]=m,k=null!=e&&void 0!==c.count&&null!==c.count,v=!(null===(g=c.breadcrumbs)||void 0===g||!g.length),E=!(null===(b=c.children)||void 0===b||!b.length),_=h===c.id,f=V()(["woocommerce-search-list__item",`depth-${r}`,t],{"has-breadcrumbs":v,"has-children":E,"has-count":k,"is-expanded":_,"is-radio-button":a}),y=p.name||`search-list-item-${o}`,S=`${y}-${c.id}`,P=(0,n.useCallback)((()=>{w(_?-1:Number(c.id))}),[_,c.id,w]);return E?(0,n.createElement)("div",{className:f,onClick:P,onKeyDown:e=>"Enter"===e.key||" "===e.key?P():null,role:"treeitem",tabIndex:0},a?(0,n.createElement)(n.Fragment,null,(0,n.createElement)("input",{type:"radio",id:S,name:y,value:c.value,onChange:l(c),onClick:e=>e.stopPropagation(),checked:s,className:"woocommerce-search-list__item-input",...p}),(0,n.createElement)(re,{item:c,search:i}),k?(0,n.createElement)(te,{label:e||c.count}):null):(0,n.createElement)(n.Fragment,null,(0,n.createElement)(d.CheckboxControl,{className:"woocommerce-search-list__item-input",checked:s,...!s&&c.children.some((e=>u.find((t=>t.id===e.id))))?{indeterminate:!0}:{},label:ee((0,Q.decodeEntities)(c.name),i),onChange:()=>{s?l(W(u,c.children,"id"))():l(function(e,t,r){const o=W(t,e,"id");return[...e,...o]}(u,c.children))()},onClick:e=>e.stopPropagation()}),k?(0,n.createElement)(te,{label:e||c.count}):null)):(0,n.createElement)("label",{htmlFor:S,className:f},a?(0,n.createElement)(n.Fragment,null,(0,n.createElement)("input",{...p,type:"radio",id:S,name:y,value:c.value,onChange:l(c),checked:s,className:"woocommerce-search-list__item-input"}),(0,n.createElement)(re,{item:c,search:i})):(0,n.createElement)(d.CheckboxControl,{...p,id:S,name:y,className:"woocommerce-search-list__item-input",value:(0,Q.decodeEntities)(c.value),label:ee((0,Q.decodeEntities)(c.name),i),onChange:l(c),checked:s}),k?(0,n.createElement)(te,{label:e||c.count}):null)},ne=oe;var ce=r(5430),se=r(906);r(5932);const ae=({id:e,label:t,popoverContents:r,remove:o,screenReaderLabel:s,className:a=""})=>{const[l,i]=(0,n.useState)(!1),m=(0,P.useInstanceId)(ae);if(s=s||t,!t)return null;t=(0,Q.decodeEntities)(t);const p=V()("woocommerce-tag",a,{"has-remove":!!o}),g=`woocommerce-tag__label-${m}`,b=(0,n.createElement)(n.Fragment,null,(0,n.createElement)("span",{className:"screen-reader-text"},s),(0,n.createElement)("span",{"aria-hidden":"true"},t));return(0,n.createElement)("span",{className:p},r?(0,n.createElement)(d.Button,{className:"woocommerce-tag__text",id:g,onClick:()=>i(!0)},b):(0,n.createElement)("span",{className:"woocommerce-tag__text",id:g},b),r&&l&&(0,n.createElement)(d.Popover,{onClose:()=>i(!1)},r),o&&(0,n.createElement)(d.Button,{className:"woocommerce-tag__remove",onClick:o(e),label:(0,u.sprintf)(
// Translators: %s label.
(0,u.__)("Remove %s","woo-gutenberg-products-block"),t),"aria-describedby":g},(0,n.createElement)(c.Z,{icon:se.Z,size:20,className:"clear-icon"})))},le=ae;r(8462);const ie=e=>(0,n.createElement)(ne,{...e}),de=e=>{const{list:t,selected:r,renderItem:o,depth:c=0,onSelect:s,instanceId:a,isSingle:l,search:i,useExpandedPanelId:d}=e,[u]=d;return t?(0,n.createElement)(n.Fragment,null,t.map((t=>{var m,p;const g=null!==(m=t.children)&&void 0!==m&&m.length&&!l?t.children.every((({id:e})=>r.find((t=>t.id===e)))):!!r.find((({id:e})=>e===t.id)),b=(null===(p=t.children)||void 0===p?void 0:p.length)&&u===t.id;return(0,n.createElement)(n.Fragment,{key:t.id},(0,n.createElement)("li",null,o({item:t,isSelected:g,onSelect:s,isSingle:l,selected:r,search:i,depth:c,useExpandedPanelId:d,controlId:a})),b?(0,n.createElement)(de,{...e,list:t.children,depth:c+1}):null)}))):null},ue=({isLoading:e,isSingle:t,selected:r,messages:o,onChange:c,onRemove:s})=>{if(e||t||!r)return null;const a=r.length;return(0,n.createElement)("div",{className:"woocommerce-search-list__selected"},(0,n.createElement)("div",{className:"woocommerce-search-list__selected-header"},(0,n.createElement)("strong",null,o.selected(a)),a>0?(0,n.createElement)(d.Button,{isLink:!0,isDestructive:!0,onClick:()=>c([]),"aria-label":o.clear},(0,u.__)("Clear all","woo-gutenberg-products-block")):null),a>0?(0,n.createElement)("ul",null,r.map(((e,t)=>(0,n.createElement)("li",{key:t},(0,n.createElement)(le,{label:e.name,id:e.id,remove:s}))))):null)},me=({filteredList:e,search:t,onSelect:r,instanceId:o,useExpandedPanelId:s,...a})=>{const{messages:l,renderItem:i,selected:d,isSingle:m}=a,p=i||ie;return 0===e.length?(0,n.createElement)("div",{className:"woocommerce-search-list__list is-not-found"},(0,n.createElement)("span",{className:"woocommerce-search-list__not-found-icon"},(0,n.createElement)(c.Z,{icon:ce.Z})),(0,n.createElement)("span",{className:"woocommerce-search-list__not-found-text"},t?(0,u.sprintf)(l.noResults,t):l.noItems)):(0,n.createElement)("ul",{className:"woocommerce-search-list__list"},(0,n.createElement)(de,{useExpandedPanelId:s,list:e,selected:d,renderItem:p,onSelect:r,instanceId:o,isSingle:m,search:t}))},pe=e=>{const{className:t="",isCompact:r,isHierarchical:o,isLoading:c,isSingle:s,list:a,messages:l=Y,onChange:i,onSearch:m,selected:p,type:g="text",debouncedSpeak:b}=e,[h,w]=(0,n.useState)(""),k=(0,n.useState)(-1),v=(0,P.useInstanceId)(pe),E=(0,n.useMemo)((()=>({...Y,...l})),[l]),_=(0,n.useMemo)((()=>((e,t,r)=>{if(!t)return r?X(e):e;const o=new RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"i"),n=e.map((e=>!!o.test(e.name)&&e)).filter(Boolean);return r?X(n,e):n})(a,h,o)),[a,h,o]);(0,n.useEffect)((()=>{b&&b(E.updated)}),[b,E]),(0,n.useEffect)((()=>{"function"==typeof m&&m(h)}),[h,m]);const f=(0,n.useCallback)((e=>()=>{s&&i([]);const t=p.findIndex((({id:t})=>t===e));i([...p.slice(0,t),...p.slice(t+1)])}),[s,p,i]),y=(0,n.useCallback)((e=>()=>{Array.isArray(e)?i(e):-1===p.findIndex((({id:t})=>t===e.id))?i(s?[e]:[...p,e]):f(e.id)()}),[s,f,i,p]),S=(0,n.useCallback)((e=>{const[t]=p.filter((t=>!e.find((e=>t.id===e.id))));f(t.id)()}),[f,p]);return(0,n.createElement)("div",{className:V()("woocommerce-search-list",t,{"is-compact":r,"is-loading":c,"is-token":"token"===g})},"text"===g&&(0,n.createElement)(ue,{...e,onRemove:f,messages:E}),(0,n.createElement)("div",{className:"woocommerce-search-list__search"},"text"===g?(0,n.createElement)(d.TextControl,{label:E.search,type:"search",value:h,onChange:e=>w(e)}):(0,n.createElement)(d.FormTokenField,{disabled:c,label:E.search,onChange:S,onInputChange:e=>w(e),suggestions:[],__experimentalValidateInput:()=>!1,value:c?[(0,u.__)("Loading…","woo-gutenberg-products-block")]:p.map((e=>({...e,value:e.name}))),__experimentalShowHowTo:!1})),c?(0,n.createElement)("div",{className:"woocommerce-search-list__list"},(0,n.createElement)(d.Spinner,null)):(0,n.createElement)(me,{...e,search:h,filteredList:_,messages:E,onSelect:y,instanceId:v,useExpandedPanelId:k}))},ge=((0,d.withSpokenMessages)(pe),e=>t=>{let{selected:r}=t;r=void 0===r?null:r;const o=null===r;return Array.isArray(r)?(0,n.createElement)(e,{...t}):(0,n.createElement)(e,{...t,selected:o?[]:[r]})});var be=r(4697);var he=r(9127),we=r.n(he);const ke=(0,P.createHigherOrderComponent)((e=>{class t extends n.Component{constructor(...e){super(...e),(0,S.Z)(this,"state",{error:null,loading:!1,variations:{}}),(0,S.Z)(this,"loadVariations",(()=>{const{products:e}=this.props,{loading:t,variations:r}=this.state;if(t)return;const o=this.getExpandedProduct();if(!o||r[o])return;const n=e.find((e=>e.id===o));var c;n.variations&&0!==n.variations.length?(this.setState({loading:!0}),(c=o,x()({path:(0,N.addQueryArgs)("wc/store/v1/products",{per_page:0,type:"variation",parent:c})})).then((e=>{const t=e.map((e=>({...e,parent:o})));this.setState({variations:{...this.state.variations,[o]:t},loading:!1,error:null})})).catch((async e=>{const t=await O(e);this.setState({variations:{...this.state.variations,[o]:null},loading:!1,error:t})}))):this.setState({variations:{...this.state.variations,[o]:null},loading:!1,error:null})}))}componentDidMount(){const{selected:e,showVariations:t}=this.props;e&&t&&this.loadVariations()}componentDidUpdate(e){const{isLoading:t,selected:r,showVariations:o}=this.props;o&&(!we()(e.selected,r)||e.isLoading&&!t)&&this.loadVariations()}isProductId(e){const{products:t}=this.props;return t.some((t=>t.id===e))}findParentProduct(e){var t;const{products:r}=this.props;return null===(t=r.filter((t=>t.variations&&t.variations.find((({id:t})=>t===e))))[0])||void 0===t?void 0:t.id}getExpandedProduct(){const{isLoading:e,selected:t,showVariations:r}=this.props;if(!r)return null;let o=t&&t.length?t[0]:null;return o?this.prevSelectedItem=o:this.prevSelectedItem&&(e||this.isProductId(this.prevSelectedItem)||(o=this.prevSelectedItem)),!e&&o?this.isProductId(o)?o:this.findParentProduct(o):null}render(){const{error:t,isLoading:r}=this.props,{error:o,loading:c,variations:s}=this.state;return(0,n.createElement)(e,{...this.props,error:o||t,expandedProduct:this.getExpandedProduct(),isLoading:r,variations:s,variationsLoading:c})}}return(0,S.Z)(t,"defaultProps",{selected:[],showVariations:!1}),t}),"withProductVariations"),ve=e=>{const{id:t,name:r,parent:o}=e;return{id:t,name:r,parent:o,breadcrumbs:[],children:[],details:e,value:e.slug}},Ee=({className:e,item:t,isSelected:r,isLoading:o,onSelect:c,disabled:s,...a})=>(0,n.createElement)(n.Fragment,null,(0,n.createElement)(oe,{...a,key:t.id,className:e,isSelected:r,item:t,onSelect:c,disabled:s}),r&&o&&(0,n.createElement)("div",{key:"loading",className:V()("woocommerce-search-list__item","woocommerce-product-attributes__item","depth-1","is-loading","is-not-active")},(0,n.createElement)(d.Spinner,null)));r(5301);const _e={list:(0,u.__)("Products","woo-gutenberg-products-block"),noItems:(0,u.__)("Your store doesn't have any products.","woo-gutenberg-products-block"),search:(0,u.__)("Search for a product to display","woo-gutenberg-products-block"),updated:(0,u.__)("Product search results updated.","woo-gutenberg-products-block")},fe=ge((Ne=ke((0,P.withInstanceId)((e=>{const{expandedProduct:t=null,error:r,instanceId:o,isCompact:c=!1,isLoading:s,onChange:a,onSearch:l,products:i,renderItem:d,selected:m=[],showVariations:p=!1,variations:g,variationsLoading:b}=e;if(r)return(0,n.createElement)(G,{error:r});const h=[...i,...g&&t&&g[t]?g[t]:[]].map(ve);return(0,n.createElement)(pe,{className:"woocommerce-products",list:h,isCompact:c,isLoading:s,isSingle:!0,selected:h.filter((({id:e})=>m.includes(Number(e)))),onChange:a,renderItem:d||(p?e=>{var t,r,c,a;const{item:l,search:i,depth:d=0,isSelected:m,onSelect:p}=e,g=null!==(t=l.details)&&void 0!==t&&t.variations&&Array.isArray(l.details.variations)?l.details.variations.length:0,h=V()("woocommerce-search-product__item","woocommerce-search-list__item",`depth-${d}`,"has-count",{"is-searching":i.length>0,"is-skip-level":0===d&&0!==l.parent,"is-variable":g>0});if(!l.breadcrumbs.length){var w,k,v,E,_;const t=(null===(w=l.details)||void 0===w?void 0:w.variations)&&l.details.variations.length>0;return(0,n.createElement)(Ee,{...e,className:V()(h,{"is-selected":m}),isSelected:m,item:l,onSelect:()=>()=>{p(l)()},isLoading:s||b,countLabel:t?(0,u.sprintf)(/* translators: %1$d is the number of variations of a product product. */
(0,u.__)("%1$d variations","woo-gutenberg-products-block"),null===(k=l.details)||void 0===k?void 0:k.variations.length):null,name:`products-${o}`,"aria-label":t?(0,u.sprintf)(/* translators: %1$s is the product name, %2$d is the number of variations of that product. */
(0,u._n)("%1$s, has %2$d variation","%1$s, has %2$d variations",null===(v=l.details)||void 0===v||null===(E=v.variations)||void 0===E?void 0:E.length,"woo-gutenberg-products-block"),l.name,null===(_=l.details)||void 0===_?void 0:_.variations.length):void 0})}const f=(0,J.x)(null===(r=l.details)||void 0===r?void 0:r.variation)?e:{...e,item:{...e.item,name:null===(c=l.details)||void 0===c?void 0:c.variation},"aria-label":`${l.breadcrumbs[0]}: ${null===(a=l.details)||void 0===a?void 0:a.variation}`};return(0,n.createElement)(oe,{...f,className:h,name:`variations-${o}`})}:()=>null),onSearch:l,messages:_e,isHierarchical:!0})}))),({selected:e,...t})=>{const[r,o]=(0,n.useState)(!0),[c,s]=(0,n.useState)(null),[a,i]=(0,n.useState)([]),d=l.Cm.productCount>100,u=async e=>{const t=await O(e);s(t),o(!1)},m=(0,n.useRef)(e);(0,n.useEffect)((()=>{B({selected:m.current}).then((e=>{i(e),o(!1)})).catch(u)}),[m]);const p=(0,be.y1)((t=>{B({selected:e,search:t}).then((e=>{i(e),o(!1)})).catch(u)}),400),g=(0,n.useCallback)((e=>{o(!0),p(e)}),[o,p]);return(0,n.createElement)(Ne,{...t,selected:e,error:c,products:a,isLoading:r,onSearch:d?g:null})})),ye=({attributes:e,setAttributes:t})=>(0,n.createElement)(fe,{selected:e.productId||0,showVariations:!0,onChange:(e=[])=>{const r=e[0]?e[0].id:0;t({productId:r})}}),Se=({isEditing:e,setIsEditing:t})=>(0,n.createElement)($.BlockControls,null,(0,n.createElement)(d.ToolbarGroup,{controls:[{icon:"edit",title:(0,u.__)("Edit selected product","woo-gutenberg-products-block"),onClick:()=>t(!e),isActive:e}]})),Pe=e=>e.map((([e,t={},r=[]])=>{const n=r?Pe(r):[];return(0,o.createBlock)(e,t,n)}));var Ne,Ce=r(7968);const xe=({isLoading:e,product:t,clientId:r})=>{const o=".wc-block-editor-single-product .wc-block-editor-layout",{replaceInnerBlocks:c}=(0,H.useDispatch)("core/block-editor"),s=(0,n.useCallback)((()=>{c(r,Pe(_),!1)}),[r,c]);return(0,n.createElement)(M.InnerBlockLayoutContextProvider,{parentName:i.name,parentClassName:o},(0,n.createElement)(M.ProductDataContextProvider,{product:t,isLoading:e},(0,n.createElement)($.InspectorControls,null,(0,n.createElement)(d.PanelBody,{title:(0,u.__)("Layout","woo-gutenberg-products-block"),initialOpen:!0},(0,n.createElement)(d.Button,{label:(0,u.__)("Reset layout to default","woo-gutenberg-products-block"),onClick:s,isTertiary:!0,className:"wc-block-editor-single-product__reset-layout",icon:Ce.Z},(0,u.__)("Reset layout","woo-gutenberg-products-block")))),(0,n.createElement)("div",{className:o},(0,n.createElement)($.BlockContextProvider,{value:{postId:null==t?void 0:t.id,postType:"product"}},(0,n.createElement)($.InnerBlocks,{template:_,allowedBlocks:f,templateLock:!1})))))},Ie=L((({attributes:e,setAttributes:t,error:r,getProduct:o,product:c,isLoading:s,clientId:a})=>{const{productId:l,isPreview:m}=e,[p,g]=(0,n.useState)(!l),b=(0,$.useBlockProps)(),h=(0,H.useSelect)((e=>m?e(q.PRODUCTS_STORE_NAME).getProducts({per_page:1}):null));return(0,n.useEffect)((()=>{var r;const o=h?null===(r=h[0])||void 0===r?void 0:r.id:null;o&&(t({...e,productId:o}),g(!1))}),[e,h,t]),r?(0,n.createElement)(U,{className:"wc-block-editor-single-product-error",error:r,isLoading:s,onRetry:o}):(0,n.createElement)("div",{...b},(0,n.createElement)(R,{header:(0,u.__)("Single Product Block Error","woo-gutenberg-products-block")},(0,n.createElement)(Se,{setIsEditing:g,isEditing:p}),p?(0,n.createElement)(d.Placeholder,{icon:E,label:i.title,className:"wc-block-editor-single-product"},i.description,(0,n.createElement)("div",{className:"wc-block-editor-single-product__selection"},(0,n.createElement)(ye,{attributes:e,setAttributes:t}),(0,n.createElement)(d.Button,{isSecondary:!0,onClick:()=>{g(!1)}},(0,u.__)("Done","woo-gutenberg-products-block")))):(0,n.createElement)("div",null,(0,n.createElement)($.InspectorControls,null,(0,n.createElement)(d.PanelBody,{title:(0,u.__)("Product","woo-gutenberg-products-block"),initialOpen:!1},(0,n.createElement)(ye,{attributes:e,setAttributes:t}))),(0,n.createElement)(D,{productId:l}),(0,n.createElement)(xe,{clientId:a,product:c,isLoading:s}))))}));(0,o.registerBlockType)(i,{icon:E,edit:Ie,save:()=>{const e=$.useBlockProps.save();return(0,n.createElement)("div",{...e},(0,n.createElement)($.InnerBlocks.Content,null))}})},7530:(e,t,r)=>{"use strict";r.d(t,{Cm:()=>c,Lo:()=>l,VF:()=>a,fh:()=>i,td:()=>s,vr:()=>m});var o,n=r(4617);const c=(0,n.getSetting)("wcBlocksConfig",{buildPhase:1,pluginUrl:"",productCount:0,defaultAvatar:"",restApiRoutes:{},wordCountType:"words"}),s=c.pluginUrl+"images/",a=c.pluginUrl+"build/",l=c.buildPhase,i=(null===(o=n.STORE_PAGES.shop)||void 0===o||o.permalink,n.STORE_PAGES.checkout.id,n.STORE_PAGES.checkout.permalink,n.STORE_PAGES.privacy.permalink,n.STORE_PAGES.privacy.title,n.STORE_PAGES.terms.permalink,n.STORE_PAGES.terms.title,n.STORE_PAGES.cart.id,n.STORE_PAGES.cart.permalink),d=(n.STORE_PAGES.myaccount.permalink?n.STORE_PAGES.myaccount.permalink:(0,n.getSetting)("wpLoginUrl","/wp-login.php"),(0,n.getSetting)("localPickupEnabled",!1),(0,n.getSetting)("countries",{})),u=(0,n.getSetting)("countryData",{}),m=(Object.fromEntries(Object.keys(u).filter((e=>!0===u[e].allowBilling)).map((e=>[e,d[e]||""]))),Object.fromEntries(Object.keys(u).filter((e=>!0===u[e].allowBilling)).map((e=>[e,u[e].states||[]]))),Object.fromEntries(Object.keys(u).filter((e=>!0===u[e].allowShipping)).map((e=>[e,d[e]||""]))),Object.fromEntries(Object.keys(u).filter((e=>!0===u[e].allowShipping)).map((e=>[e,u[e].states||[]]))),Object.fromEntries(Object.keys(u).map((e=>[e,u[e].locale||[]]))))},4478:(e,t,r)=>{"use strict";r.d(t,{uq:()=>n}),r(4981);var o=r(7530);const n=()=>o.Lo>1},5271:(e,t,r)=>{"use strict";r.d(t,{Cm:()=>o.Cm,VF:()=>o.VF,fh:()=>o.fh,td:()=>o.td,uq:()=>n.uq,vr:()=>o.vr});var o=r(7530),n=r(4478)},51:(e,t,r)=>{"use strict";r.d(t,{x:()=>o});const o=e=>null==e||"object"==typeof e&&0===Object.keys(e).length||"string"==typeof e&&0===e.trim().length},4578:()=>{},9763:()=>{},2513:()=>{},5301:()=>{},8462:()=>{},5932:()=>{},9196:e=>{"use strict";e.exports=window.React},2819:e=>{"use strict";e.exports=window.lodash},3554:e=>{"use strict";e.exports=window.wc.blocksCheckout},711:e=>{"use strict";e.exports=window.wc.blocksComponents},4293:e=>{"use strict";e.exports=window.wc.priceFormat},4801:e=>{"use strict";e.exports=window.wc.wcBlocksData},2864:e=>{"use strict";e.exports=window.wc.wcBlocksSharedContext},721:e=>{"use strict";e.exports=window.wc.wcBlocksSharedHocs},4617:e=>{"use strict";e.exports=window.wc.wcSettings},6989:e=>{"use strict";e.exports=window.wp.apiFetch},987:e=>{"use strict";e.exports=window.wp.autop},4981:e=>{"use strict";e.exports=window.wp.blocks},5609:e=>{"use strict";e.exports=window.wp.components},4333:e=>{"use strict";e.exports=window.wp.compose},9818:e=>{"use strict";e.exports=window.wp.data},7180:e=>{"use strict";e.exports=window.wp.deprecated},5904:e=>{"use strict";e.exports=window.wp.dom},9307:e=>{"use strict";e.exports=window.wp.element},2694:e=>{"use strict";e.exports=window.wp.hooks},2629:e=>{"use strict";e.exports=window.wp.htmlEntities},5736:e=>{"use strict";e.exports=window.wp.i18n},9127:e=>{"use strict";e.exports=window.wp.isShallowEqual},444:e=>{"use strict";e.exports=window.wp.primitives},2289:e=>{"use strict";e.exports=window.wp.styleEngine},6483:e=>{"use strict";e.exports=window.wp.url},2560:e=>{"use strict";e.exports=window.wp.warning},5266:e=>{"use strict";e.exports=window.wp.wordcount}},n={};function c(e){var t=n[e];if(void 0!==t)return t.exports;var r=n[e]={exports:{}};return o[e].call(r.exports,r,r.exports,c),r.exports}c.m=o,e=[],c.O=(t,r,o,n)=>{if(!r){var s=1/0;for(d=0;d<e.length;d++){for(var[r,o,n]=e[d],a=!0,l=0;l<r.length;l++)(!1&n||s>=n)&&Object.keys(c.O).every((e=>c.O[e](r[l])))?r.splice(l--,1):(a=!1,n<s&&(s=n));if(a){e.splice(d--,1);var i=o();void 0!==i&&(t=i)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[r,o,n]},c.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return c.d(t,{a:t}),t},c.d=(e,t)=>{for(var r in t)c.o(t,r)&&!c.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},c.f={},c.e=e=>Promise.all(Object.keys(c.f).reduce(((t,r)=>(c.f[r](e,t),t)),[])),c.u=e=>({118:"product-rating-stars",2918:"product-rating-counter",3037:"product-average-rating",3706:"product-image",5432:"product-sale-badge",5445:"product-stock-indicator",5579:"product-price",5800:"product-add-to-cart",6925:"product-title",7385:"product-rating",8185:"product-summary",8771:"product-button",9870:"product-sku"}[e]+".js?ver="+{118:"6fa5ff6c7fc28927b724",2918:"780cea43e9addca3bc71",3037:"94a2cda634362f26c454",3706:"ecc915c4aa8f9ed54a2e",5432:"4f8caf8947d1900212a5",5445:"d455eeeac6ad3542dc44",5579:"ab6ec724b104cdf90d81",5800:"9a3cd635c1bc07f1c815",6925:"686f8edec340537dd404",7385:"ae2175e0174e59bd1b1a",8185:"caa02015bb9778a49e62",8771:"478f2d8e75802784a979",9870:"3499e1a1bd0061afcd93"}[e]),c.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),c.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),t={},r="webpackWcBlocksJsonp:",c.l=(e,o,n,s)=>{if(t[e])t[e].push(o);else{var a,l;if(void 0!==n)for(var i=document.getElementsByTagName("script"),d=0;d<i.length;d++){var u=i[d];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==r+n){a=u;break}}a||(l=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,c.nc&&a.setAttribute("nonce",c.nc),a.setAttribute("data-webpack",r+n),a.src=e),t[e]=[o];var m=(r,o)=>{a.onerror=a.onload=null,clearTimeout(p);var n=t[e];if(delete t[e],a.parentNode&&a.parentNode.removeChild(a),n&&n.forEach((e=>e(o))),r)return r(o)},p=setTimeout(m.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=m.bind(null,a.onerror),a.onload=m.bind(null,a.onload),l&&document.head.appendChild(a)}},c.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.j=8943,(()=>{var e;c.g.importScripts&&(e=c.g.location+"");var t=c.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&!e;)e=r[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),c.p=e})(),(()=>{var e={8943:0};c.f.j=(t,r)=>{var o=c.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var n=new Promise(((r,n)=>o=e[t]=[r,n]));r.push(o[2]=n);var s=c.p+c.u(t),a=new Error;c.l(s,(r=>{if(c.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var n=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+n+": "+s+")",a.name="ChunkLoadError",a.type=n,a.request=s,o[1](a)}}),"chunk-"+t,t)}},c.O.j=t=>0===e[t];var t=(t,r)=>{var o,n,[s,a,l]=r,i=0;if(s.some((t=>0!==e[t]))){for(o in a)c.o(a,o)&&(c.m[o]=a[o]);if(l)var d=l(c)}for(t&&t(r);i<s.length;i++)n=s[i],c.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return c.O(d)},r=self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var s=c.O(void 0,[2869],(()=>c(4649)));s=c.O(s),((this.wc=this.wc||{}).blocks=this.wc.blocks||{})["single-product"]=s})();