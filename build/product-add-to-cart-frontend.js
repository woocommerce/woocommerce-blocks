(self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[]).push([[5800],{9085:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>Ke});var s=r(721),o=r(9307),a=r(4184),n=r.n(a),c=r(5736),i=r(9075);const l=e=>e.is_purchasable||!1;var u=r(9818),d=r(4801);const p={PRISTINE:"pristine",IDLE:"idle",DISABLED:"disabled",PROCESSING:"processing",BEFORE_PROCESSING:"before_processing",AFTER_PROCESSING:"after_processing"},E={status:p.PRISTINE,hasError:!1,quantity:0,processingResponse:null,requestParams:{}},m={SET_PRISTINE:"set_pristine",SET_IDLE:"set_idle",SET_DISABLED:"set_disabled",SET_PROCESSING:"set_processing",SET_BEFORE_PROCESSING:"set_before_processing",SET_AFTER_PROCESSING:"set_after_processing",SET_PROCESSING_RESPONSE:"set_processing_response",SET_HAS_ERROR:"set_has_error",SET_NO_ERROR:"set_no_error",SET_QUANTITY:"set_quantity",SET_REQUEST_PARAMS:"set_request_params"},{SET_PRISTINE:_,SET_IDLE:h,SET_DISABLED:b,SET_PROCESSING:S,SET_BEFORE_PROCESSING:g,SET_AFTER_PROCESSING:v,SET_PROCESSING_RESPONSE:R,SET_HAS_ERROR:f,SET_NO_ERROR:y,SET_QUANTITY:T,SET_REQUEST_PARAMS:C}=m,w=()=>({type:h}),A=(e=!0)=>({type:e?f:y}),{SET_PRISTINE:P,SET_IDLE:I,SET_DISABLED:O,SET_PROCESSING:N,SET_BEFORE_PROCESSING:k,SET_AFTER_PROCESSING:D,SET_PROCESSING_RESPONSE:L,SET_HAS_ERROR:F,SET_NO_ERROR:x,SET_QUANTITY:B,SET_REQUEST_PARAMS:M}=m,{PRISTINE:q,IDLE:j,DISABLED:Y,PROCESSING:Q,BEFORE_PROCESSING:G,AFTER_PROCESSING:V}=p,K=(e=E,{quantity:t,type:r,data:s})=>{let o;switch(r){case P:o=E;break;case I:o=e.status!==j?{...e,status:j}:e;break;case O:o=e.status!==Y?{...e,status:Y}:e;break;case B:o=t!==e.quantity?{...e,quantity:t}:e;break;case M:o={...e,requestParams:{...e.requestParams,...s}};break;case L:o={...e,processingResponse:s};break;case N:o=e.status!==Q?{...e,status:Q,hasError:!1}:e,o=!1===o.hasError?o:{...o,hasError:!1};break;case k:o=e.status!==G?{...e,status:G,hasError:!1}:e;break;case D:o=e.status!==V?{...e,status:V}:e;break;case F:o=e.hasError?e:{...e,hasError:!0},o=e.status===Q||e.status===G?{...o,status:j}:o;break;case x:o=e.hasError?{...e,hasError:!1}:e}return o!==e&&r!==P&&o.status===q&&(o.status=j),o};let H=function(e){return e.ADD_EVENT_CALLBACK="add_event_callback",e.REMOVE_EVENT_CALLBACK="remove_event_callback",e}({});const W={},U=(e=W,{type:t,eventType:r,id:s,callback:o,priority:a})=>{const n=e.hasOwnProperty(r)?new Map(e[r]):new Map;switch(t){case H.ADD_EVENT_CALLBACK:return n.set(s,{priority:a,callback:o}),{...e,[r]:n};case H.REMOVE_EVENT_CALLBACK:return n.delete(s),{...e,[r]:n}}},$=(e,t)=>(r,s=10)=>{const o=((e,t,r=10)=>({id:Math.floor(Math.random()*Date.now()).toString(),type:H.ADD_EVENT_CALLBACK,eventType:e,callback:t,priority:r}))(e,r,s);return t(o),()=>{var r;t((r=e,{id:o.id,type:H.REMOVE_EVENT_CALLBACK,eventType:r}))}},Z="add_to_cart_before_processing",X="add_to_cart_after_processing_with_success",J="add_to_cart_after_processing_with_error",z=e=>({onAddToCartAfterProcessingWithSuccess:$(X,e),onAddToCartProcessingWithError:$(J,e),onAddToCartBeforeProcessing:$(Z,e)});var ee=r(7884);const te=(e,t)=>e[t]?Array.from(e[t].values()).sort(((e,t)=>e.priority-t.priority)):[];let re=function(e){return e.SUCCESS="success",e.FAIL="failure",e.ERROR="error",e}({});const se=(e,t)=>(0,ee.Kn)(e)&&"type"in e&&e.type===t,oe=e=>se(e,re.ERROR),ae=e=>se(e,re.FAIL),ne=e=>(0,ee.Kn)(e)&&(0,ee.$n)(e,"type"),ce=async(e,t,r)=>{const s=[],o=te(e,t);for(const e of o)try{const t=await Promise.resolve(e.callback(r));if(!ne(t))continue;if(!t.hasOwnProperty("type"))throw new Error("Returned objects from event emitter observers must return an object with a type property");if(oe(t)||ae(t))return s.push(t),s;s.push(t)}catch(e){return console.error(e),s.push({type:re.ERROR}),s}return s},ie=(0,o.createContext)({product:{},productType:"simple",productIsPurchasable:!0,productHasOptions:!1,supportsFormElements:!0,showFormElements:!1,quantity:0,minQuantity:1,maxQuantity:99,requestParams:{},isIdle:!1,isDisabled:!1,isProcessing:!1,isBeforeProcessing:!1,isAfterProcessing:!1,hasError:!1,eventRegistration:{onAddToCartAfterProcessingWithSuccess:e=>{},onAddToCartAfterProcessingWithError:e=>{},onAddToCartBeforeProcessing:e=>{}},dispatchActions:{resetForm:()=>{},submitForm:()=>{},setQuantity:e=>{},setHasError:e=>{},setAfterProcessing:e=>{},setRequestParams:e=>{}}}),le=()=>(0,o.useContext)(ie),ue=({children:e,product:t,showFormElements:r})=>{var s,a,n,m;const[h,f]=(0,o.useReducer)(K,E),[y,P]=(0,o.useReducer)(U,{}),I=(0,i.s)(y),{createErrorNotice:O}=(0,u.useDispatch)("core/notices"),{setValidationErrors:N}=(0,u.useDispatch)(d.VALIDATION_STORE_KEY),k=(0,o.useMemo)((()=>({onAddToCartAfterProcessingWithSuccess:z(P).onAddToCartAfterProcessingWithSuccess,onAddToCartAfterProcessingWithError:z(P).onAddToCartAfterProcessingWithError,onAddToCartBeforeProcessing:z(P).onAddToCartBeforeProcessing})),[P]),D=(0,o.useMemo)((()=>({resetForm:()=>{f({type:_})},submitForm:()=>{f({type:g})},setQuantity:e=>{f((e=>({type:T,quantity:e}))(e))},setHasError:e=>{f(A(e))},setRequestParams:e=>{f((e=>({type:C,data:e}))(e))},setAfterProcessing:e=>{f({type:R,data:e}),f({type:v})}})),[]);(0,o.useEffect)((()=>{const e=h.status,r=!t.id||!l(t);e!==p.DISABLED||r?e!==p.DISABLED&&r&&f({type:b}):f(w())}),[h.status,t,f]),(0,o.useEffect)((()=>{h.status===p.BEFORE_PROCESSING&&(((e,t)=>{const r=(0,u.select)("core/notices").getNotices(t),{removeNotice:s}=(0,u.dispatch)("core/notices");r.filter((e=>"error"===e.status)).forEach((e=>s(e.id,t)))})(0,"wc/add-to-cart"),(async(e,t,r)=>{const s=te(e,t),o=[];for(const e of s)try{const t=await Promise.resolve(e.callback(r));"object"==typeof t&&o.push(t)}catch(e){console.error(e)}return!o.length||o})(I,Z,{}).then((e=>{!0!==e?(Array.isArray(e)&&e.forEach((({errorMessage:e,validationErrors:t})=>{e&&O(e,{context:"wc/add-to-cart"}),t&&N(t)})),f(w())):f({type:S})})))}),[h.status,N,O,f,I,null==t?void 0:t.id]),(0,o.useEffect)((()=>{if(h.status===p.AFTER_PROCESSING){const e={processingResponse:h.processingResponse},r=e=>{let t=!1;return e.forEach((e=>{const{message:r,messageContext:s}=e;(oe(e)||ae(e))&&r&&(t=!0,O(r,s?{context:s}:void 0))})),t};if(h.hasError)return void ce(I,J,e).then((s=>{if(!r(s)){var o;const r=(null===(o=e.processingResponse)||void 0===o?void 0:o.message)||(0,c.__)("Something went wrong. Please contact us for assistance.","woo-gutenberg-products-block");O(r,{id:"add-to-cart",context:`woocommerce/single-product/${(null==t?void 0:t.id)||0}`})}f(w())}));ce(I,X,e).then((e=>{r(e)?f(A(!0)):f(w())}))}}),[h.status,h.hasError,h.processingResponse,D,O,I,null==t?void 0:t.id]);const L=(e=>["simple","variable"].includes(e.type||"simple"))(t),F={product:t,productType:t.type||"simple",productIsPurchasable:l(t),productHasOptions:t.has_options||!1,supportsFormElements:L,showFormElements:r&&L,quantity:h.quantity||(null==t||null===(s=t.add_to_cart)||void 0===s?void 0:s.minimum)||1,minQuantity:(null==t||null===(a=t.add_to_cart)||void 0===a?void 0:a.minimum)||1,maxQuantity:(null==t||null===(n=t.add_to_cart)||void 0===n?void 0:n.maximum)||99,multipleOf:(null==t||null===(m=t.add_to_cart)||void 0===m?void 0:m.multiple_of)||1,requestParams:h.requestParams,isIdle:h.status===p.IDLE,isDisabled:h.status===p.DISABLED,isProcessing:h.status===p.PROCESSING,isBeforeProcessing:h.status===p.BEFORE_PROCESSING,isAfterProcessing:h.status===p.AFTER_PROCESSING,hasError:h.hasError,eventRegistration:k,dispatchActions:D};return(0,o.createElement)(ie.Provider,{value:F},e)};var de=r(6989),pe=r.n(de),Ee=r(2629),me=r(9456),_e=r(4055);const he=()=>{const{dispatchActions:e,product:t,quantity:r,eventRegistration:s,hasError:a,isProcessing:n,requestParams:i}=le(),{showAllValidationErrors:l}=(0,u.useDispatch)(d.VALIDATION_STORE_KEY),p=(0,u.useSelect)((e=>e(d.VALIDATION_STORE_KEY).hasValidationErrors)),{createErrorNotice:E,removeNotice:m}=(0,u.useDispatch)("core/notices"),{receiveCart:_}=(0,_e.b)(),[h,b]=(0,o.useState)(!1),S=!a&&n,g=(0,o.useCallback)((()=>!p()||(l(),{type:"error"})),[p,l]);(0,o.useEffect)((()=>{const e=s.onAddToCartBeforeProcessing(g,0);return()=>{e()}}),[s,g]);const v=(0,o.useCallback)((()=>{b(!0),m("add-to-cart",`woocommerce/single-product/${(null==t?void 0:t.id)||0}`);const s={id:t.id||0,quantity:r,...i};pe()({path:"/wc/store/v1/cart/add-item",method:"POST",data:s,cache:"no-store",parse:!1}).then((r=>{pe().setNonce(r.headers),r.json().then((function(s){r.ok?_(s):(s.body&&s.body.message?E((0,Ee.decodeEntities)(s.body.message),{id:"add-to-cart",context:`woocommerce/single-product/${(null==t?void 0:t.id)||0}`}):E((0,c.__)("Something went wrong. Please contact us for assistance.","woo-gutenberg-products-block"),{id:"add-to-cart",context:`woocommerce/single-product/${(null==t?void 0:t.id)||0}`}),e.setHasError()),(0,me.Q9)({preserveCartData:!0}),e.setAfterProcessing(s),b(!1)}))})).catch((t=>{t.json().then((function(t){var r;null!==(r=t.data)&&void 0!==r&&r.cart&&_(t.data.cart),e.setHasError(),e.setAfterProcessing(t),b(!1)}))}))}),[t,E,m,_,e,r,i]);return(0,o.useEffect)((()=>{S&&!h&&v()}),[S,v,h]),null},be=({children:e,product:t,showFormElements:r})=>(0,o.createElement)(ue,{product:t,showFormElements:r},e,(0,o.createElement)(he,null));var Se=r(2864);r(6684);var ge=r(9685);r(5589);const ve=()=>(0,o.createElement)("span",{className:"wc-block-components-spinner","aria-hidden":"true"});r(5482);const Re=({className:e,showSpinner:t=!1,children:r,variant:s="contained",...a})=>{const c=n()("wc-block-components-button","wp-element-button",e,s,{"wc-block-components-button--loading":t});return(0,o.createElement)(ge.Z,{className:c,...a},t&&(0,o.createElement)(ve,null),(0,o.createElement)("span",{className:"wc-block-components-button__text"},r))};var fe=r(1984),ye=r(8184),Te=r(5918),Ce=r(3775);const we=({className:e,href:t,text:r,onClick:s})=>(0,o.createElement)(Re,{className:e,href:t,onClick:s,rel:"nofollow"},r),Ae=({className:e,quantityInCart:t,isProcessing:r,isDisabled:s,isDone:a,onClick:n})=>(0,o.createElement)(Re,{className:e,disabled:s,showSpinner:r,onClick:n},a&&t>0?(0,c.sprintf)(/* translators: %s number of products in cart. */
(0,c._n)("%d in cart","%d in cart",t,"woo-gutenberg-products-block"),t):(0,c.__)("Add to cart","woo-gutenberg-products-block"),!!a&&(0,o.createElement)(fe.Z,{icon:ye.Z})),Pe=()=>{const{showFormElements:e,productIsPurchasable:t,productHasOptions:r,product:s,productType:a,isDisabled:n,isProcessing:i,eventRegistration:l,hasError:u,dispatchActions:d}=le(),{parentName:p}=(0,Se.useInnerBlockLayoutContext)(),{dispatchStoreEvent:E}=(0,Te.n)(),{cartQuantity:m}=(0,Ce.c)(s.id||0),[_,h]=(0,o.useState)(!1),b=s.add_to_cart||{url:"",text:""};return(0,o.useEffect)((()=>{const e=l.onAddToCartAfterProcessingWithSuccess((()=>(u||h(!0),!0)),0);return()=>{e()}}),[l,u]),(e||!r&&"simple"===a)&&t?(0,o.createElement)(Ae,{className:"wc-block-components-product-add-to-cart-button",quantityInCart:m,isDisabled:n,isProcessing:i,isDone:_,onClick:()=>{d.submitForm(`woocommerce/single-product/${(null==s?void 0:s.id)||0}`),E("cart-add-item",{product:s,listName:p})}}):(0,o.createElement)(we,{className:"wc-block-components-product-add-to-cart-button",href:b.url,text:b.text||(0,c.__)("View Product","woo-gutenberg-products-block"),onClick:()=>{E("product-view-link",{product:s,listName:p})}})};var Ie=r(4697);const Oe=({disabled:e,min:t,max:r,step:s=1,value:a,onChange:n})=>{const c=void 0!==r,i=(0,Ie.y1)((e=>{let o=e;c&&(o=Math.min(o,Math.floor(r/s)*s)),o=Math.max(o,Math.ceil(t/s)*s),o=Math.floor(o/s)*s,o!==e&&(null==n||n(o))}),300);return(0,o.createElement)("input",{className:"wc-block-components-product-add-to-cart-quantity",type:"number",value:a,min:t,max:r,step:s,hidden:1===r,disabled:e,onChange:e=>{null==n||n(e.target.value),i(Number(e.target.value))}})},Ne=({reason:e=(0,c.__)("Sorry, this product cannot be purchased.","woo-gutenberg-products-block")})=>(0,o.createElement)("div",{className:"wc-block-components-product-add-to-cart-unavailable"},e),ke=()=>{const{product:e,quantity:t,minQuantity:r,maxQuantity:s,multipleOf:a,dispatchActions:n,isDisabled:i}=le();return e.id&&!e.is_purchasable?(0,o.createElement)(Ne,null):e.id&&!e.is_in_stock?(0,o.createElement)(Ne,{reason:(0,c.__)("This product is currently out of stock and cannot be purchased.","woo-gutenberg-products-block")}):(0,o.createElement)(o.Fragment,null,(0,o.createElement)(Oe,{value:t,min:r,max:s,step:a,disabled:i,onChange:n.setQuantity}),(0,o.createElement)(Pe,null))};r(461);var De=r(7313),Le=r(3554);const Fe={value:"",label:(0,c.__)("Select an option","woo-gutenberg-products-block")},xe=({attributeName:e,options:t=[],value:r="",onChange:s=(()=>{}),errorMessage:a=(0,c.__)("Please select a value.","woo-gutenberg-products-block")})=>{const i=e,{setValidationErrors:l,clearValidationError:p}=(0,u.useDispatch)(d.VALIDATION_STORE_KEY),{error:E}=(0,u.useSelect)((e=>({error:e(d.VALIDATION_STORE_KEY).getValidationError(i)||{}})));return(0,o.useEffect)((()=>{r?p(i):l({[i]:{message:a,hidden:!0}})}),[r,i,a,p,l]),(0,o.useEffect)((()=>()=>{p(i)}),[i,p]),(0,o.createElement)("div",{className:"wc-block-components-product-add-to-cart-attribute-picker__container"},(0,o.createElement)(De.Z,{label:(0,Ee.decodeEntities)(e),value:r||"",options:[Fe,...t],onChange:s,required:!0,className:n()("wc-block-components-product-add-to-cart-attribute-picker__select",{"has-error":(null==E?void 0:E.message)&&!(null!=E&&E.hidden)})}),(0,o.createElement)(Le.ValidationInputError,{propertyName:i,elementId:i}))},Be=(e,t,r)=>{const s=Object.values(t).map((({id:e})=>e));if(Object.values(r).every((e=>""===e)))return s;const o=Object.keys(e);return s.filter((e=>o.every((s=>{const o=r[s]||"",a=t["id:"+e].attributes[s];return""===o||null===a||a===o}))))},Me=({attributes:e,variationAttributes:t,setRequestParams:r})=>{const s=(0,i.s)(e),a=(0,i.s)(t),[n,c]=(0,o.useState)(0),[l,u]=(0,o.useState)({}),[d,p]=(0,o.useState)(!1),E=(0,o.useMemo)((()=>((e,t,r)=>{const s={},o=Object.keys(e),a=Object.values(r).filter(Boolean).length>0;return o.forEach((o=>{const n=e[o],c={...r,[o]:null},i=a?Be(e,t,c):null,l=null!==i?i.map((e=>t["id:"+e].attributes[o])):null;s[o]=((e,t=null)=>Object.values(e).map((({name:e,slug:r})=>null===t||t.includes(null)||t.includes(r)?{value:r,label:(0,Ee.decodeEntities)(e)}:null)).filter(Boolean))(n.terms,l)})),s})(s,a,l)),[l,s,a]);return(0,o.useEffect)((()=>{if(!d){const t=(e=>(0,ee.Kn)(e)?0===Object.keys(e).length?{}:Object.values(e).reduce(((e,t)=>{const r=t.terms.filter((e=>e.default));var s;return r.length>0&&(e[t.name]=null===(s=r[0])||void 0===s?void 0:s.slug),e}),{}):{})(e);t&&u({...t}),p(!0)}}),[l,e,d]),(0,o.useEffect)((()=>{Object.values(l).filter((e=>""!==e)).length===Object.keys(s).length?c(((e,t,r)=>Be(e,t,r)[0]||0)(s,a,l)):n>0&&c(0)}),[l,n,s,a]),(0,o.useEffect)((()=>{r({id:n,variation:Object.keys(l).map((e=>({attribute:e,value:l[e]})))})}),[r,n,l]),(0,o.createElement)("div",{className:"wc-block-components-product-add-to-cart-attribute-picker"},Object.keys(s).map((e=>(0,o.createElement)(xe,{key:e,attributeName:e,options:E[e].filter(Boolean),value:l[e],onChange:t=>{u({...l,[e]:t})}}))))},qe=({dispatchers:e,product:t})=>{const r=(e=>{return e?(t=Object.values(e).filter((({has_variations:e})=>e)),r="name",t.reduce(((e,t)=>(e[String(r?t[r]:t)]=t,e)),{})):{};var t,r})(t.attributes),s=(e=>{if(!e)return{};const t={};return e.forEach((({id:e,attributes:r})=>{t[`id:${e}`]={id:e,attributes:r.reduce(((e,{name:t,value:r})=>(e[t]=r,e)),{})}})),t})(t.variations);return 0===Object.keys(r).length||0===Object.keys(s).length?null:(0,o.createElement)(Me,{attributes:r,variationAttributes:s,setRequestParams:e.setRequestParams})},je=()=>{const{product:e,quantity:t,minQuantity:r,maxQuantity:s,multipleOf:a,dispatchActions:n,isDisabled:i}=le();return e.id&&!e.is_purchasable?(0,o.createElement)(Ne,null):e.id&&!e.is_in_stock?(0,o.createElement)(Ne,{reason:(0,c.__)("This product is currently out of stock and cannot be purchased.","woo-gutenberg-products-block")}):(0,o.createElement)(o.Fragment,null,(0,o.createElement)(qe,{product:e,dispatchers:n}),(0,o.createElement)(Oe,{value:t,min:r,max:s,step:a,disabled:i,onChange:n.setQuantity}),(0,o.createElement)(Pe,null))},Ye=()=>(0,o.createElement)(Pe,null),Qe=()=>(0,o.createElement)("p",null,"This is a placeholder for the grouped products form element."),Ge=()=>{const{showFormElements:e,productType:t}=le();return e?"variable"===t?(0,o.createElement)(je,null):"grouped"===t?(0,o.createElement)(Qe,null):"external"===t?(0,o.createElement)(Ye,null):"simple"===t||"variation"===t?(0,o.createElement)(ke,null):null:(0,o.createElement)(Pe,null)},Ve=(0,s.withProductDataContext)((({className:e,showFormElements:t})=>{const{product:r}=(0,Se.useProductDataContext)(),s=n()(e,"wc-block-components-product-add-to-cart",{"wc-block-components-product-add-to-cart--placeholder":(a=r,null==a||"object"==typeof a&&0===Object.keys(a).length||"string"==typeof a&&0===a.trim().length)});var a;return(0,o.createElement)(be,{product:r,showFormElements:t},(0,o.createElement)("div",{className:s},(0,o.createElement)(Ge,null)))})),Ke=(0,s.withFilteredAttributes)({showFormElements:{type:"boolean",default:!1},productId:{type:"number",default:0}})(Ve)},3340:(e,t,r)=>{"use strict";r.d(t,{Z:()=>u});var s=r(4617),o=r(5736),a=r(1478),n=r(2646),c=r(5271);const i=e=>{const t={};return void 0!==e.label&&(t.label=e.label),void 0!==e.required&&(t.required=e.required),void 0!==e.hidden&&(t.hidden=e.hidden),void 0===e.label||e.optionalLabel||(t.optionalLabel=(0,o.sprintf)(/* translators: %s Field label. */
(0,o.__)("%s (optional)","woo-gutenberg-products-block"),e.label)),e.priority&&((0,a.h)(e.priority)&&(t.index=e.priority),(0,n.H)(e.priority)&&(t.index=parseInt(e.priority,10))),e.hidden&&(t.required=!1),t},l=Object.entries(c.vr).map((([e,t])=>[e,Object.entries(t).map((([e,t])=>[e,i(t)])).reduce(((e,[t,r])=>(e[t]=r,e)),{})])).reduce(((e,[t,r])=>(e[t]=r,e)),{}),u=(e,t,r="")=>{const o=r&&void 0!==l[r]?l[r]:{};return e.map((e=>({key:e,...s.defaultAddressFields[e]||{},...o[e]||{},...t[e]||{}}))).sort(((e,t)=>e.index-t.index))}},4055:(e,t,r)=>{"use strict";r.d(t,{b:()=>v});var s=r(2991),o=r.n(s),a=r(9307),n=r(4801),c=r(9818),i=r(2629),l=r(3881),u=r(8832);var d=r(9456);const p=e=>{const t=null==e?void 0:e.detail;t&&t.preserveCartData||(0,c.dispatch)(n.CART_STORE_KEY).invalidateResolutionForStore()},E=e=>{(null!=e&&e.persisted||"back_forward"===(window.performance&&window.performance.getEntriesByType("navigation").length?window.performance.getEntriesByType("navigation")[0].type:""))&&(0,c.dispatch)(n.CART_STORE_KEY).invalidateResolutionForStore()},m=()=>{1===window.wcBlocksStoreCartListeners.count&&window.wcBlocksStoreCartListeners.remove(),window.wcBlocksStoreCartListeners.count--},_={first_name:"",last_name:"",company:"",address_1:"",address_2:"",city:"",state:"",postcode:"",country:"",phone:""},h={..._,email:""},b={total_items:"",total_items_tax:"",total_fees:"",total_fees_tax:"",total_discount:"",total_discount_tax:"",total_shipping:"",total_shipping_tax:"",total_price:"",total_tax:"",tax_lines:n.EMPTY_TAX_LINES,currency_code:"",currency_symbol:"",currency_minor_unit:2,currency_decimal_separator:"",currency_thousand_separator:"",currency_prefix:"",currency_suffix:""},S=e=>Object.fromEntries(Object.entries(e).map((([e,t])=>[e,(0,i.decodeEntities)(t)]))),g={cartCoupons:n.EMPTY_CART_COUPONS,cartItems:n.EMPTY_CART_ITEMS,cartFees:n.EMPTY_CART_FEES,cartItemsCount:0,cartItemsWeight:0,crossSellsProducts:n.EMPTY_CART_CROSS_SELLS,cartNeedsPayment:!0,cartNeedsShipping:!0,cartItemErrors:n.EMPTY_CART_ITEM_ERRORS,cartTotals:b,cartIsLoading:!0,cartErrors:n.EMPTY_CART_ERRORS,billingAddress:h,shippingAddress:_,shippingRates:n.EMPTY_SHIPPING_RATES,isLoadingRates:!1,cartHasCalculatedShipping:!1,paymentMethods:n.EMPTY_PAYMENT_METHODS,paymentRequirements:n.EMPTY_PAYMENT_REQUIREMENTS,receiveCart:()=>{},receiveCartContents:()=>{},extensions:n.EMPTY_EXTENSIONS},v=(e={shouldSelect:!0})=>{const{isEditor:t,previewData:r}=(0,u._)(),s=null==r?void 0:r.previewCart,{shouldSelect:i}=e,b=(0,a.useRef)();(0,a.useEffect)((()=>((()=>{if(window.wcBlocksStoreCartListeners||(window.wcBlocksStoreCartListeners={count:0,remove:()=>{}}),(null===(e=window.wcBlocksStoreCartListeners)||void 0===e?void 0:e.count)>0)return void window.wcBlocksStoreCartListeners.count++;var e;document.body.addEventListener("wc-blocks_added_to_cart",p),document.body.addEventListener("wc-blocks_removed_from_cart",p),window.addEventListener("pageshow",E);const t=(0,d.Es)("added_to_cart","wc-blocks_added_to_cart"),r=(0,d.Es)("removed_from_cart","wc-blocks_removed_from_cart");window.wcBlocksStoreCartListeners.count=1,window.wcBlocksStoreCartListeners.remove=()=>{document.body.removeEventListener("wc-blocks_added_to_cart",p),document.body.removeEventListener("wc-blocks_removed_from_cart",p),window.removeEventListener("pageshow",E),t(),r()}})(),m)),[]);const v=(0,c.useSelect)(((e,{dispatch:r})=>{if(!i)return g;if(t)return{cartCoupons:s.coupons,cartItems:s.items,crossSellsProducts:s.cross_sells,cartFees:s.fees,cartItemsCount:s.items_count,cartItemsWeight:s.items_weight,cartNeedsPayment:s.needs_payment,cartNeedsShipping:s.needs_shipping,cartItemErrors:n.EMPTY_CART_ITEM_ERRORS,cartTotals:s.totals,cartIsLoading:!1,cartErrors:n.EMPTY_CART_ERRORS,billingData:h,billingAddress:h,shippingAddress:_,extensions:n.EMPTY_EXTENSIONS,shippingRates:s.shipping_rates,isLoadingRates:!1,cartHasCalculatedShipping:s.has_calculated_shipping,paymentRequirements:s.paymentRequirements,receiveCart:"function"==typeof(null==s?void 0:s.receiveCart)?s.receiveCart:()=>{},receiveCartContents:"function"==typeof(null==s?void 0:s.receiveCartContents)?s.receiveCartContents:()=>{}};const o=e(n.CART_STORE_KEY),a=o.getCartData(),c=o.getCartErrors(),u=o.getCartTotals(),d=!o.hasFinishedResolution("getCartData"),p=o.isCustomerDataUpdating(),{receiveCart:E,receiveCartContents:m}=r(n.CART_STORE_KEY),b=S(a.billingAddress),v=a.needsShipping?S(a.shippingAddress):b,R=a.fees.length>0?a.fees.map((e=>S(e))):n.EMPTY_CART_FEES;return{cartCoupons:a.coupons.length>0?a.coupons.map((e=>({...e,label:e.code}))):n.EMPTY_CART_COUPONS,cartItems:a.items,crossSellsProducts:a.crossSells,cartFees:R,cartItemsCount:a.itemsCount,cartItemsWeight:a.itemsWeight,cartNeedsPayment:a.needsPayment,cartNeedsShipping:a.needsShipping,cartItemErrors:a.errors,cartTotals:u,cartIsLoading:d,cartErrors:c,billingData:(0,l.QI)(b),billingAddress:(0,l.QI)(b),shippingAddress:(0,l.QI)(v),extensions:a.extensions,shippingRates:a.shippingRates,isLoadingRates:p,cartHasCalculatedShipping:a.hasCalculatedShipping,paymentRequirements:a.paymentRequirements,receiveCart:E,receiveCartContents:m}}),[i]);return b.current&&o()(b.current,v)||(b.current=v),b.current}},3775:(e,t,r)=>{"use strict";r.d(t,{c:()=>l});var s=r(9307),o=r(9818),a=r(4801),n=r(2629),c=r(4055);const i=(e,t)=>{const r=e.find((({id:e})=>e===t));return r?r.quantity:0},l=e=>{const{addItemToCart:t}=(0,o.useDispatch)(a.CART_STORE_KEY),{cartItems:r,cartIsLoading:l}=(0,c.b)(),{createErrorNotice:u,removeNotice:d}=(0,o.useDispatch)("core/notices"),[p,E]=(0,s.useState)(!1),m=(0,s.useRef)(i(r,e));return(0,s.useEffect)((()=>{const t=i(r,e);t!==m.current&&(m.current=t)}),[r,e]),{cartQuantity:Number.isFinite(m.current)?m.current:0,addingToCart:p,cartIsLoading:l,addToCart:(r=1)=>(E(!0),t(e,r).then((()=>{d("add-to-cart")})).catch((e=>{u((0,n.decodeEntities)(e.message),{id:"add-to-cart",context:"wc/all-products",isDismissible:!0})})).finally((()=>{E(!1)})))}}},8832:(e,t,r)=>{"use strict";r.d(t,{_:()=>a});var s=r(9307);r(9818);const o=(0,s.createContext)({isEditor:!1,currentPostId:0,currentView:"",previewData:{},getPreviewData:()=>({})}),a=()=>(0,s.useContext)(o)},3881:(e,t,r)=>{"use strict";r.d(t,{QI:()=>a});var s=r(3340),o=(r(6483),r(4617));r(2629),r(5271);const a=e=>{const t=Object.keys(o.defaultAddressFields),r=(0,s.Z)(t,{},e.country),a=Object.assign({},e);return r.forEach((({key:t="",hidden:r=!1})=>{r&&((e,t)=>e in t)(t,e)&&(a[t]="")})),a}},9456:(e,t,r)=>{"use strict";r.d(t,{Es:()=>n,Q9:()=>a});const s=window.CustomEvent||null,o=(e,{bubbles:t=!1,cancelable:r=!1,element:o,detail:a={}})=>{if(!s)return;o||(o=document.body);const n=new s(e,{bubbles:t,cancelable:r,detail:a});o.dispatchEvent(n)},a=({preserveCartData:e=!1})=>{o("wc-blocks_added_to_cart",{bubbles:!0,cancelable:!0,detail:{preserveCartData:e}})},n=(e,t,r=!1,s=!1)=>{if("function"!=typeof jQuery)return()=>{};const a=()=>{o(t,{bubbles:r,cancelable:s})};return jQuery(document).on(e,a),()=>jQuery(document).off(e,a)}},8519:(e,t,r)=>{"use strict";r.d(t,{F:()=>s});const s=e=>null===e},1478:(e,t,r)=>{"use strict";r.d(t,{h:()=>s});const s=e=>"number"==typeof e},7884:(e,t,r)=>{"use strict";r.d(t,{$n:()=>a,Kn:()=>o});var s=r(8519);const o=e=>!(0,s.F)(e)&&e instanceof Object&&e.constructor===Object;function a(e,t){return o(e)&&t in e}},2646:(e,t,r)=>{"use strict";r.d(t,{H:()=>s});const s=e=>"string"==typeof e},461:()=>{},6684:()=>{},5482:()=>{},5589:()=>{}}]);