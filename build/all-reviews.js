(()=>{var e,t={6877:(e,t,r)=>{"use strict";r.r(t);var o=r(9196),n=r(5736);const s=window.wp.blocks;var a=r(1984),i=r(7713);r(6990);const l=window.wp.blockEditor,c=window.wp.components;var d=r(9307);const w=window.wc.wcSettings;var u=r(7329),m=r(4184),p=r.n(m);const g=window.wp.escapeHtml,b=({error:e})=>(0,o.createElement)("div",{className:"wc-block-error-message"},(({message:e,type:t})=>e?"general"===t?(0,o.createElement)("span",null,(0,n.__)("The following error was returned","woo-gutenberg-products-block"),(0,o.createElement)("br",null),(0,o.createElement)("code",null,(0,g.escapeHTML)(e))):"api"===t?(0,o.createElement)("span",null,(0,n.__)("The following error was returned from the API","woo-gutenberg-products-block"),(0,o.createElement)("br",null),(0,o.createElement)("code",null,(0,g.escapeHTML)(e))):e:(0,n.__)("An error has prevented the block from being updated.","woo-gutenberg-products-block"))(e));r(2513);const v=({className:e="",error:t,isLoading:r=!1,onRetry:s})=>(0,o.createElement)(c.Placeholder,{icon:(0,o.createElement)(a.Z,{icon:u.Z}),label:(0,n.__)("Sorry, an error occurred","woo-gutenberg-products-block"),className:p()("wc-block-api-error",e)},(0,o.createElement)(b,{error:t}),s&&(0,o.createElement)(o.Fragment,null,r?(0,o.createElement)(c.Spinner,null):(0,o.createElement)(c.Button,{isSecondary:!0,onClick:s},(0,n.__)("Retry","woo-gutenberg-products-block"))));r(7349);const h=({label:e,screenReaderLabel:t,wrapperElement:r,wrapperProps:n={}})=>{let s;const a=null!=e,i=null!=t;return!a&&i?(s=r||"span",n={...n,className:p()(n.className,"screen-reader-text")},(0,o.createElement)(s,{...n},t)):(s=r||d.Fragment,a&&i&&e!==t?(0,o.createElement)(s,{...n},(0,o.createElement)("span",{"aria-hidden":"true"},e),(0,o.createElement)("span",{className:"screen-reader-text"},t)):(0,o.createElement)(s,{...n},e))},_=({onClick:e,label:t=(0,n.__)("Load more","woo-gutenberg-products-block"),screenReaderLabel:r=(0,n.__)("Load more","woo-gutenberg-products-block")})=>(0,o.createElement)("div",{className:"wp-block-button wc-block-load-more wc-block-components-load-more"},(0,o.createElement)("button",{className:"wp-block-button__link",onClick:e},(0,o.createElement)(h,{label:t,screenReaderLabel:r}))),k=window.wc.blocksComponents;r(8543);const y=({onChange:e,readOnly:t,value:r})=>(0,o.createElement)(k.SortSelect,{className:"wc-block-review-sort-select wc-block-components-review-sort-select",label:(0,n.__)("Order by","woo-gutenberg-products-block"),onChange:e,options:[{key:"most-recent",label:(0,n.__)("Most recent","woo-gutenberg-products-block")},{key:"highest-rating",label:(0,n.__)("Highest rating","woo-gutenberg-products-block")},{key:"lowest-rating",label:(0,n.__)("Lowest rating","woo-gutenberg-products-block")}],readOnly:t,screenReaderLabel:(0,n.__)("Order reviews by","woo-gutenberg-products-block"),value:r});var R=r(4942);function f(e){let t,r,o,n=[];for(let s=0;s<e.length;s++)t=e.substring(s),r=t.match(/^&[a-z0-9#]+;/),r?(o=r[0],n.push(o),s+=o.length-1):n.push(e[s]);return n}const E=(e,t,r="...")=>{const o=function(e,t){const r=(t=t||{}).limit||100,o=void 0===t.preserveTags||t.preserveTags,n=void 0!==t.wordBreak&&t.wordBreak,s=t.suffix||"...",a=t.moreLink||"",i=t.moreText||"»",l=t.preserveWhiteSpace||!1,c=e.replace(/</g,"\n<").replace(/>/g,">\n").replace(/\n\n/g,"\n").replace(/^\n/g,"").replace(/\n$/g,"").split("\n");let d,w,u,m,p,g,b=0,v=[],h=!1;for(let e=0;e<c.length;e++){if(d=c[e],m=l?d:d.replace(/[ ]+/g," "),!d.length)continue;const t=f(m);if("<"!==d[0])if(b>=r)d="";else if(b+t.length>=r){if(w=r-b," "===t[w-1])for(;w&&(w-=1," "===t[w-1]););else u=t.slice(w).indexOf(" "),n||(-1!==u?w+=u:w=d.length);d=t.slice(0,w).join("")+s,a&&(d+='<a href="'+a+'" style="display:inline">'+i+"</a>"),b=r,h=!0}else b+=t.length;else if(o){if(b>=r)if(p=d.match(/[a-zA-Z]+/),g=p?p[0]:"",g)if("</"!==d.substring(0,2))v.push(g),d="";else{for(;v[v.length-1]!==g&&v.length;)v.pop();v.length&&(d=""),v.pop()}else d=""}else d="";c[e]=d}return{html:c.join("\n").replace(/\n/g,""),more:h}}(e,{suffix:r,limit:t});return o.html},S=(e,t,r)=>(t<=r?e.start=e.middle+1:e.end=e.middle-1,e),T=(e,t,r,o)=>{const n=((e,t,r)=>{let o={start:0,middle:0,end:e.length};for(;o.start<=o.end;)o.middle=Math.floor((o.start+o.end)/2),t.innerHTML=E(e,o.middle),o=S(o,t.clientHeight,r);return o.middle})(e,t,r);return E(e,n-o.length,o)},O={className:"read-more-content",ellipsis:"&hellip;",lessText:(0,n.__)("Read less","woo-gutenberg-products-block"),maxLines:3,moreText:(0,n.__)("Read more","woo-gutenberg-products-block")};class C extends d.Component{constructor(e){super(e),(0,R.Z)(this,"reviewSummary",void 0),(0,R.Z)(this,"reviewContent",void 0),this.state={isExpanded:!1,clampEnabled:null,content:e.children,summary:"."},this.reviewContent=(0,d.createRef)(),this.reviewSummary=(0,d.createRef)(),this.getButton=this.getButton.bind(this),this.onClick=this.onClick.bind(this)}componentDidMount(){this.setSummary()}componentDidUpdate(e){e.maxLines===this.props.maxLines&&e.children===this.props.children||this.setState({clampEnabled:null,summary:"."},this.setSummary)}setSummary(){if(this.props.children){const{maxLines:e,ellipsis:t}=this.props;if(!this.reviewSummary.current||!this.reviewContent.current)return;const r=(this.reviewSummary.current.clientHeight+1)*e+1,o=this.reviewContent.current.clientHeight+1>r;this.setState({clampEnabled:o}),o&&this.setState({summary:T(this.reviewContent.current.innerHTML,this.reviewSummary.current,r,t)})}}getButton(){const{isExpanded:e}=this.state,{className:t,lessText:r,moreText:n}=this.props,s=e?r:n;if(s)return(0,o.createElement)("a",{href:"#more",className:t+"__read_more",onClick:this.onClick,"aria-expanded":!e,role:"button"},s)}onClick(e){e.preventDefault();const{isExpanded:t}=this.state;this.setState({isExpanded:!t})}render(){const{className:e}=this.props,{content:t,summary:r,clampEnabled:n,isExpanded:s}=this.state;return t?!1===n?(0,o.createElement)("div",{className:e},(0,o.createElement)("div",{ref:this.reviewContent},t)):(0,o.createElement)("div",{className:e},(!s||null===n)&&(0,o.createElement)("div",{ref:this.reviewSummary,"aria-hidden":s,dangerouslySetInnerHTML:{__html:r}}),(s||null===n)&&(0,o.createElement)("div",{ref:this.reviewContent,"aria-hidden":!s},t),this.getButton()):null}}(0,R.Z)(C,"defaultProps",O);const P=C;r(8204);const N=({attributes:e,review:t={}})=>{const{imageType:r,showReviewDate:s,showReviewerName:a,showReviewImage:i,showReviewRating:l,showReviewContent:c,showProductName:d}=e,{rating:w}=t,u=!(Object.keys(t).length>0),m=Number.isFinite(w)&&l;return(0,o.createElement)("li",{className:p()("wc-block-review-list-item__item","wc-block-components-review-list-item__item",{"is-loading":u,"wc-block-components-review-list-item__item--has-image":i}),"aria-hidden":u},(d||s||a||i||m)&&(0,o.createElement)("div",{className:"wc-block-review-list-item__info wc-block-components-review-list-item__info"},i&&function(e,t,r){var s,a;return r||!e?(0,o.createElement)("div",{className:"wc-block-review-list-item__image wc-block-components-review-list-item__image"}):(0,o.createElement)("div",{className:"wc-block-review-list-item__image wc-block-components-review-list-item__image"},"product"===t?(0,o.createElement)("img",{"aria-hidden":"true",alt:(null===(s=e.product_image)||void 0===s?void 0:s.alt)||"",src:(null===(a=e.product_image)||void 0===a?void 0:a.thumbnail)||""}):(0,o.createElement)("img",{"aria-hidden":"true",alt:"",src:e.reviewer_avatar_urls[96]||""}),e.verified&&(0,o.createElement)("div",{className:"wc-block-review-list-item__verified wc-block-components-review-list-item__verified",title:(0,n.__)("Verified buyer","woo-gutenberg-products-block")},(0,n.__)("Verified buyer","woo-gutenberg-products-block")))}(t,r,u),(d||a||m||s)&&(0,o.createElement)("div",{className:"wc-block-review-list-item__meta wc-block-components-review-list-item__meta"},m&&function(e){const{rating:t}=e,r={width:t/5*100+"%"},s=(0,n.sprintf)(/* translators: %f is referring to the average rating value */
(0,n.__)("Rated %f out of 5","woo-gutenberg-products-block"),t),a={__html:(0,n.sprintf)(/* translators: %s is referring to the average rating value */
(0,n.__)("Rated %s out of 5","woo-gutenberg-products-block"),(0,n.sprintf)('<strong class="rating">%f</strong>',t))};return(0,o.createElement)("div",{className:"wc-block-review-list-item__rating wc-block-components-review-list-item__rating"},(0,o.createElement)("div",{className:"wc-block-review-list-item__rating__stars wc-block-components-review-list-item__rating__stars",role:"img","aria-label":s},(0,o.createElement)("span",{style:r,dangerouslySetInnerHTML:a})))}(t),d&&function(e){return(0,o.createElement)("div",{className:"wc-block-review-list-item__product wc-block-components-review-list-item__product"},(0,o.createElement)("a",{href:e.product_permalink,dangerouslySetInnerHTML:{__html:e.product_name}}))}(t),a&&function(e){const{reviewer:t=""}=e;return(0,o.createElement)("div",{className:"wc-block-review-list-item__author wc-block-components-review-list-item__author"},t)}(t),s&&function(e){const{date_created:t,formatted_date_created:r}=e;return(0,o.createElement)("time",{className:"wc-block-review-list-item__published-date wc-block-components-review-list-item__published-date",dateTime:t},r)}(t))),c&&function(e){return(0,o.createElement)(P,{maxLines:10,moreText:(0,n.__)("Read full review","woo-gutenberg-products-block"),lessText:(0,n.__)("Hide full review","woo-gutenberg-products-block"),className:"wc-block-review-list-item__text wc-block-components-review-list-item__text"},(0,o.createElement)("div",{dangerouslySetInnerHTML:{__html:e.review||""}}))}(t))};r(4093);const L=({attributes:e,reviews:t})=>{const r=(0,w.getSetting)("showAvatars",!0),n=(0,w.getSetting)("reviewRatingsEnabled",!0),s=(r||"product"===e.imageType)&&e.showReviewImage,a=n&&e.showReviewRating,i={...e,showReviewImage:s,showReviewRating:a};return(0,o.createElement)("ul",{className:"wc-block-review-list wc-block-components-review-list"},0===t.length?(0,o.createElement)(N,{attributes:i}):t.map(((e,t)=>(0,o.createElement)(N,{key:e.id||t,attributes:i,review:e}))))};var A=r(9127),x=r.n(A);const M=window.wp.apiFetch;var I=r.n(M);const j=e=>{const{className:t,categoryIds:r,productId:o,showReviewDate:n,showReviewerName:s,showReviewContent:a,showProductName:i,showReviewImage:l,showReviewRating:c}=e;let d="wc-block-all-reviews";return o&&(d="wc-block-reviews-by-product"),Array.isArray(r)&&(d="wc-block-reviews-by-category"),p()(d,t,{"has-image":l,"has-name":s,"has-date":n,"has-rating":c,"has-content":a,"has-product-name":i})},D=e=>{const{categoryIds:t,imageType:r,orderby:o,productId:n,reviewsOnPageLoad:s,reviewsOnLoadMore:a,showLoadMore:i,showOrderby:l}=e,c={"data-image-type":r,"data-orderby":o,"data-reviews-on-page-load":s,"data-reviews-on-load-more":a,"data-show-load-more":i,"data-show-orderby":l};return n&&(c["data-product-id"]=n),Array.isArray(t)&&(c["data-category-ids"]=t.join(",")),c};class B extends d.Component{render(){const{attributes:e,error:t,isLoading:r,noReviewsPlaceholder:s,reviews:a,totalReviews:i}=this.props;if(t)return(0,o.createElement)(v,{className:"wc-block-featured-product-error",error:t,isLoading:r});if(0===a.length&&!r)return(0,o.createElement)(s,{attributes:e});const l=(0,w.getSetting)("reviewRatingsEnabled",!0);return(0,o.createElement)(c.Disabled,null,e.showOrderby&&l&&(0,o.createElement)(y,{readOnly:!0,value:e.orderby,onChange:()=>null}),(0,o.createElement)(L,{attributes:e,reviews:a}),e.showLoadMore&&i>a.length&&(0,o.createElement)(_,{screenReaderLabel:(0,n.__)("Load more reviews","woo-gutenberg-products-block")}))}}const Z=(e=>{class t extends d.Component{constructor(...e){super(...e),(0,R.Z)(this,"isPreview",!!this.props.attributes.previewReviews),(0,R.Z)(this,"delayedAppendReviews",this.props.delayFunction(this.appendReviews)),(0,R.Z)(this,"isMounted",!1),(0,R.Z)(this,"state",{error:null,loading:!0,reviews:this.isPreview?this.props.attributes.previewReviews:[],totalReviews:this.isPreview?this.props.attributes.previewReviews.length:0}),(0,R.Z)(this,"setError",(async e=>{if(!this.isMounted)return;const{onReviewsLoadError:t}=this.props,r=await(async e=>{if(!("json"in e))return{message:e.message,type:e.type||"general"};try{const t=await e.json();return{message:t.message,type:t.type||"api"}}catch(e){return{message:e.message,type:"general"}}})(e);this.setState({reviews:[],loading:!1,error:r}),t(r)}))}componentDidMount(){this.isMounted=!0,this.replaceReviews()}componentDidUpdate(e){e.reviewsToDisplay<this.props.reviewsToDisplay?this.delayedAppendReviews():this.shouldReplaceReviews(e,this.props)&&this.replaceReviews()}shouldReplaceReviews(e,t){return e.orderby!==t.orderby||e.order!==t.order||e.productId!==t.productId||!x()(e.categoryIds,t.categoryIds)}componentWillUnmount(){this.isMounted=!1,this.delayedAppendReviews.cancel&&this.delayedAppendReviews.cancel()}getArgs(e){const{categoryIds:t,order:r,orderby:o,productId:n,reviewsToDisplay:s}=this.props,a={order:r,orderby:o,per_page:s-e,offset:e};if(t){const e=Array.isArray(t)?t:JSON.parse(t);a.category_id=Array.isArray(e)?e.join(","):e}return n&&(a.product_id=n),a}replaceReviews(){if(this.isPreview)return;const{onReviewsReplaced:e}=this.props;this.updateListOfReviews().then(e)}appendReviews(){if(this.isPreview)return;const{onReviewsAppended:e,reviewsToDisplay:t}=this.props,{reviews:r}=this.state;t<=r.length||this.updateListOfReviews(r).then(e)}updateListOfReviews(e=[]){const{reviewsToDisplay:t}=this.props,{totalReviews:r}=this.state,o=Math.min(r,t)-e.length;return this.setState({loading:!0,reviews:e.concat(Array(o).fill({}))}),(n=this.getArgs(e.length),I()({path:"/wc/store/v1/products/reviews?"+Object.entries(n).map((e=>e.join("="))).join("&"),parse:!1}).then((e=>e.json().then((t=>({reviews:t,totalReviews:parseInt(e.headers.get("x-wp-total"),10)})))))).then((({reviews:t,totalReviews:r})=>(this.isMounted&&this.setState({reviews:e.filter((e=>Object.keys(e).length)).concat(t),totalReviews:r,loading:!1,error:null}),{newReviews:t}))).catch(this.setError);var n}render(){const{reviewsToDisplay:t}=this.props,{error:r,loading:n,reviews:s,totalReviews:a}=this.state;return(0,o.createElement)(e,{...this.props,error:r,isLoading:n,reviews:s.slice(0,t),totalReviews:a})}}(0,R.Z)(t,"defaultProps",{delayFunction:e=>e,onReviewsAppended:()=>{},onReviewsLoadError:()=>{},onReviewsReplaced:()=>{}});const{displayName:r=e.name||"Component"}=e;return t.displayName=`WithReviews( ${r} )`,t})(B),H=({attributes:e,icon:t,name:r,noReviewsPlaceholder:s})=>{const{categoryIds:a,productId:i,reviewsOnPageLoad:d,showProductName:u,showReviewDate:m,showReviewerName:p,showReviewContent:g,showReviewImage:b,showReviewRating:v}=e,{order:h,orderby:_}=(e=>{if((0,w.getSetting)("reviewRatingsEnabled",!0)){if("lowest-rating"===e)return{order:"asc",orderby:"rating"};if("highest-rating"===e)return{order:"desc",orderby:"rating"}}return{order:"desc",orderby:"date_gmt"}})(e.orderby),k=!(g||v||m||p||b||u),y=(0,l.useBlockProps)({className:j(e)});return k?(0,o.createElement)(c.Placeholder,{icon:t,label:r},(0,n.__)("The content for this block is hidden due to block settings.","woo-gutenberg-products-block")):(0,o.createElement)("div",{...y},(0,o.createElement)(Z,{attributes:e,categoryIds:a,delayFunction:e=>((e,t,r)=>{let o,n=null;const s=(...t)=>{n=t,o&&clearTimeout(o),o=setTimeout((()=>{o=null,n&&e(...n)}),400)};return s.flush=()=>{o&&n&&(e(...n),clearTimeout(o),o=null)},s})(e),noReviewsPlaceholder:s,orderby:_,order:h,productId:i,reviewsToDisplay:d}))},G=()=>(0,o.createElement)(c.Placeholder,{className:"wc-block-all-reviews",icon:(0,o.createElement)(a.Z,{icon:i.Z,className:"block-editor-block-icon"}),label:(0,n.__)("All Reviews","woo-gutenberg-products-block")},(0,n.__)("This block shows a list of all product reviews. Your store does not have any reviews yet, but they will show up here when it does.","woo-gutenberg-products-block")),F=({attributes:e,setAttributes:t})=>(0,o.createElement)(o.Fragment,null,(0,o.createElement)(l.InspectorControls,{key:"inspector"},(0,o.createElement)(c.PanelBody,{title:(0,n.__)("Content","woo-gutenberg-products-block")},(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Product name","woo-gutenberg-products-block"),checked:e.showProductName,onChange:()=>t({showProductName:!e.showProductName})}),((e,t)=>{const r=(0,w.getSetting)("showAvatars",!0),s=(0,w.getSetting)("reviewRatingsEnabled",!0);return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Product rating","woo-gutenberg-products-block"),checked:e.showReviewRating,onChange:()=>t({showReviewRating:!e.showReviewRating})}),e.showReviewRating&&!s&&(0,o.createElement)(c.Notice,{className:"wc-block-base-control-notice",isDismissible:!1},(0,d.createInterpolateElement)((0,n.__)("Product rating is disabled in your <a>store settings</a>.","woo-gutenberg-products-block"),{a:(0,o.createElement)("a",{href:(0,w.getAdminLink)("admin.php?page=wc-settings&tab=products"),target:"_blank",rel:"noopener noreferrer"})})),(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Reviewer name","woo-gutenberg-products-block"),checked:e.showReviewerName,onChange:()=>t({showReviewerName:!e.showReviewerName})}),(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Image","woo-gutenberg-products-block"),checked:e.showReviewImage,onChange:()=>t({showReviewImage:!e.showReviewImage})}),(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Review date","woo-gutenberg-products-block"),checked:e.showReviewDate,onChange:()=>t({showReviewDate:!e.showReviewDate})}),(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Review content","woo-gutenberg-products-block"),checked:e.showReviewContent,onChange:()=>t({showReviewContent:!e.showReviewContent})}),e.showReviewImage&&(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.__experimentalToggleGroupControl,{label:(0,n.__)("Review image","woo-gutenberg-products-block"),value:e.imageType,onChange:e=>t({imageType:e})},(0,o.createElement)(c.__experimentalToggleGroupControlOption,{value:"reviewer",label:(0,n.__)("Reviewer photo","woo-gutenberg-products-block")}),(0,o.createElement)(c.__experimentalToggleGroupControlOption,{value:"product",label:(0,n.__)("Product","woo-gutenberg-products-block")})),"reviewer"===e.imageType&&!r&&(0,o.createElement)(c.Notice,{className:"wc-block-base-control-notice",isDismissible:!1},(0,d.createInterpolateElement)((0,n.__)("Reviewer photo is disabled in your <a>site settings</a>.","woo-gutenberg-products-block"),{a:(0,o.createElement)("a",{href:(0,w.getAdminLink)("options-discussion.php"),target:"_blank",rel:"noopener noreferrer"})}))))})(e,t)),(0,o.createElement)(c.PanelBody,{title:(0,n.__)("List Settings","woo-gutenberg-products-block")},((e,t)=>(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Order by","woo-gutenberg-products-block"),checked:e.showOrderby,onChange:()=>t({showOrderby:!e.showOrderby})}),(0,o.createElement)(c.SelectControl,{label:(0,n.__)("Order Product Reviews by","woo-gutenberg-products-block"),value:e.orderby,options:[{label:"Most recent",value:"most-recent"},{label:"Highest Rating",value:"highest-rating"},{label:"Lowest Rating",value:"lowest-rating"}],onChange:e=>t({orderby:e})}),(0,o.createElement)(c.RangeControl,{label:(0,n.__)("Starting Number of Reviews","woo-gutenberg-products-block"),value:e.reviewsOnPageLoad,onChange:e=>t({reviewsOnPageLoad:e}),max:20,min:1}),(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Load more","woo-gutenberg-products-block"),checked:e.showLoadMore,onChange:()=>t({showLoadMore:!e.showLoadMore})}),e.showLoadMore&&(0,o.createElement)(c.RangeControl,{label:(0,n.__)("Load More Reviews","woo-gutenberg-products-block"),value:e.reviewsOnLoadMore,onChange:e=>t({reviewsOnLoadMore:e}),max:20,min:1})))(e,t))),(0,o.createElement)(H,{attributes:e,icon:(0,o.createElement)(a.Z,{icon:i.Z,className:"block-editor-block-icon"}),name:(0,n.__)("All Reviews","woo-gutenberg-products-block"),noReviewsPlaceholder:G}));var W,U,J,$,z,V,q,Y,K,Q;const X=(0,w.getSetting)("wcBlocksConfig",{buildPhase:1,pluginUrl:"",productCount:0,defaultAvatar:"",restApiRoutes:{},wordCountType:"words"}),ee=(X.pluginUrl,X.pluginUrl,X.buildPhase,null===(W=w.STORE_PAGES.shop)||void 0===W||W.permalink,null===(U=w.STORE_PAGES.checkout)||void 0===U||U.id,null===(J=w.STORE_PAGES.checkout)||void 0===J||J.permalink,null===($=w.STORE_PAGES.privacy)||void 0===$||$.permalink,null===(z=w.STORE_PAGES.privacy)||void 0===z||z.title,null===(V=w.STORE_PAGES.terms)||void 0===V||V.permalink,null===(q=w.STORE_PAGES.terms)||void 0===q||q.title,null===(Y=w.STORE_PAGES.cart)||void 0===Y||Y.id,null===(K=w.STORE_PAGES.cart)||void 0===K||K.permalink,null!==(Q=w.STORE_PAGES.myaccount)&&void 0!==Q&&Q.permalink?w.STORE_PAGES.myaccount.permalink:(0,w.getSetting)("wpLoginUrl","/wp-login.php"),(0,w.getSetting)("localPickupEnabled",!1),(0,w.getSetting)("countries",{})),te=(0,w.getSetting)("countryData",{}),re=(Object.fromEntries(Object.keys(te).filter((e=>!0===te[e].allowBilling)).map((e=>[e,ee[e]||""]))),Object.fromEntries(Object.keys(te).filter((e=>!0===te[e].allowBilling)).map((e=>[e,te[e].states||[]]))),Object.fromEntries(Object.keys(te).filter((e=>!0===te[e].allowShipping)).map((e=>[e,ee[e]||""]))),Object.fromEntries(Object.keys(te).filter((e=>!0===te[e].allowShipping)).map((e=>[e,te[e].states||[]]))),Object.fromEntries(Object.keys(te).map((e=>[e,te[e].locale||[]]))),{attributes:{editMode:!1,imageType:"reviewer",orderby:"most-recent",reviewsOnLoadMore:10,reviewsOnPageLoad:10,showLoadMore:!0,showOrderby:!0,showReviewDate:!0,showReviewerName:!0,showReviewImage:!0,showReviewRating:!0,showReviewContent:!0,previewReviews:[{id:1,date_created:"2019-07-15T17:05:04",formatted_date_created:(0,n.__)("July 15, 2019","woo-gutenberg-products-block"),date_created_gmt:"2019-07-15T15:05:04",product_id:0,product_name:(0,n.__)("WordPress Pennant","woo-gutenberg-products-block"),product_permalink:"#",
/* translators: An example person name used for the block previews. */
reviewer:(0,n.__)("Alice","woo-gutenberg-products-block"),review:`<p>${(0,n.__)("I bought this product last week and I'm very happy with it.","woo-gutenberg-products-block")}</p>\n`,reviewer_avatar_urls:{48:X.defaultAvatar,96:X.defaultAvatar},rating:5,verified:!0},{id:2,date_created:"2019-07-12T12:39:39",formatted_date_created:(0,n.__)("July 12, 2019","woo-gutenberg-products-block"),date_created_gmt:"2019-07-12T10:39:39",product_id:0,product_name:(0,n.__)("WordPress Pennant","woo-gutenberg-products-block"),product_permalink:"#",
/* translators: An example person name used for the block previews. */
reviewer:(0,n.__)("Bob","woo-gutenberg-products-block"),review:`<p>${(0,n.__)("This product is awesome, I love it!","woo-gutenberg-products-block")}</p>\n`,reviewer_avatar_urls:{48:X.defaultAvatar,96:X.defaultAvatar},rating:null,verified:!1}]}});(0,s.registerBlockType)("woocommerce/all-reviews",{apiVersion:2,title:(0,n.__)("All Reviews","woo-gutenberg-products-block"),icon:{src:(0,o.createElement)(a.Z,{icon:i.Z,className:"wc-block-editor-components-block-icon"})},category:"woocommerce",keywords:[(0,n.__)("WooCommerce","woo-gutenberg-products-block")],description:(0,n.__)("Show a list of all product reviews.","woo-gutenberg-products-block"),supports:{html:!1,color:{background:!1},typography:{fontSize:!0}},example:{...re,attributes:{...re.attributes,showProductName:!0}},attributes:{editMode:{type:"boolean",default:!0},imageType:{type:"string",default:"reviewer"},orderby:{type:"string",default:"most-recent"},reviewsOnLoadMore:{type:"number",default:10},reviewsOnPageLoad:{type:"number",default:10},showLoadMore:{type:"boolean",default:!0},showOrderby:{type:"boolean",default:!0},showReviewDate:{type:"boolean",default:!0},showReviewerName:{type:"boolean",default:!0},showReviewImage:{type:"boolean",default:!0},showReviewRating:{type:"boolean",default:!0},showReviewContent:{type:"boolean",default:!0},previewReviews:{type:"array",default:null},showProductName:{type:"boolean",default:!0}},transforms:{from:[{type:"block",blocks:["core/legacy-widget"],isMatch:({idBase:e,instance:t})=>"woocommerce_recent_reviews"===e&&!(null==t||!t.raw),transform:({instance:e})=>(0,s.createBlock)("woocommerce/all-reviews",{reviewsOnPageLoad:e.raw.number,imageType:"product",showLoadMore:!1,showOrderby:!1,showReviewDate:!1,showReviewContent:!1})}]},edit:e=>{const t=(0,l.useBlockProps)();return(0,o.createElement)("div",{...t},(0,o.createElement)(F,{...e}))},save:({attributes:e})=>(0,o.createElement)("div",{...l.useBlockProps.save({className:j(e)}),...D(e)})})},7349:()=>{},8204:()=>{},4093:()=>{},8543:()=>{},6990:()=>{},2513:()=>{},9196:e=>{"use strict";e.exports=window.React},9307:e=>{"use strict";e.exports=window.wp.element},5736:e=>{"use strict";e.exports=window.wp.i18n},9127:e=>{"use strict";e.exports=window.wp.isShallowEqual},444:e=>{"use strict";e.exports=window.wp.primitives}},r={};function o(e){var n=r[e];if(void 0!==n)return n.exports;var s=r[e]={exports:{}};return t[e].call(s.exports,s,s.exports,o),s.exports}o.m=t,e=[],o.O=(t,r,n,s)=>{if(!r){var a=1/0;for(d=0;d<e.length;d++){for(var[r,n,s]=e[d],i=!0,l=0;l<r.length;l++)(!1&s||a>=s)&&Object.keys(o.O).every((e=>o.O[e](r[l])))?r.splice(l--,1):(i=!1,s<a&&(a=s));if(i){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[r,n,s]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.j=5456,(()=>{var e={5456:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var n,s,[a,i,l]=r,c=0;if(a.some((t=>0!==e[t]))){for(n in i)o.o(i,n)&&(o.m[n]=i[n]);if(l)var d=l(o)}for(t&&t(r);c<a.length;c++)s=a[c],o.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return o.O(d)},r=self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=o.O(void 0,[2869],(()=>o(6877)));n=o.O(n),((this.wc=this.wc||{}).blocks=this.wc.blocks||{})["all-reviews"]=n})();