(self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[]).push([[826],{8082:(e,t,n)=>{"use strict";n.d(t,{k:()=>J});var o=n(9196),r=n(3554),s=n(9307),i=n(5736),l=n(2629),a=n(4184),c=n.n(a),d=n(4333),u=n(2819),p=n(9630),f=n(5158),h=n(444);const m=(0,s.createElement)(h.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,s.createElement)(h.Path,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"}));var g=n(7462);class v extends s.Component{constructor(){super(...arguments),this.onChange=this.onChange.bind(this),this.bindInput=this.bindInput.bind(this)}focus(){this.input.focus()}hasFocus(){return this.input===this.input.ownerDocument.activeElement}bindInput(e){this.input=e}onChange(e){this.props.onChange({value:e.target.value})}render(){const{value:e,isExpanded:t,instanceId:n,selectedSuggestionIndex:o,className:r,...i}=this.props,l=e?e.length+1:0;return(0,s.createElement)("input",(0,g.Z)({ref:this.bindInput,id:`components-form-token-input-${n}`,type:"text"},i,{value:e||"",onChange:this.onChange,size:l,className:c()(r,"components-form-token-field__input"),autoComplete:"off",role:"combobox","aria-expanded":t,"aria-autocomplete":"list","aria-owns":t?`components-form-token-suggestions-${n}`:void 0,"aria-activedescendant":-1!==o?`components-form-token-suggestions-${n}-${o}`:void 0,"aria-describedby":`components-form-token-suggestions-howto-${n}`}))}}const b=v;var E=n(4979),w=n.n(E);class y extends s.Component{constructor(){super(...arguments),this.handleMouseDown=this.handleMouseDown.bind(this),this.bindList=this.bindList.bind(this)}componentDidUpdate(){this.props.selectedIndex>-1&&this.props.scrollIntoView&&this.list.children[this.props.selectedIndex]&&(this.scrollingIntoView=!0,w()(this.list.children[this.props.selectedIndex],this.list,{onlyScrollIfNeeded:!0}),this.props.setTimeout((()=>{this.scrollingIntoView=!1}),100))}bindList(e){this.list=e}handleHover(e){return()=>{this.scrollingIntoView||this.props.onHover(e)}}handleClick(e){return()=>{this.props.onSelect(e)}}handleMouseDown(e){e.preventDefault()}computeSuggestionMatch(e){const t=this.props.displayTransform(this.props.match||"").toLocaleLowerCase();if(0===t.length)return null;const n=(e=this.props.displayTransform(e)).toLocaleLowerCase().indexOf(t);return{suggestionBeforeMatch:e.substring(0,n),suggestionMatch:e.substring(n,n+t.length),suggestionAfterMatch:e.substring(n+t.length)}}render(){return(0,s.createElement)("ul",{ref:this.bindList,className:"components-form-token-field__suggestions-list",id:`components-form-token-suggestions-${this.props.instanceId}`,role:"listbox"},(0,u.map)(this.props.suggestions,((e,t)=>{const n=this.computeSuggestionMatch(e),o=c()("components-form-token-field__suggestion",{"is-selected":t===this.props.selectedIndex});return(0,s.createElement)("li",{id:`components-form-token-suggestions-${this.props.instanceId}-${t}`,role:"option",className:o,key:null!=e&&e.value?e.value:this.props.displayTransform(e),onMouseDown:this.handleMouseDown,onClick:this.handleClick(e),onMouseEnter:this.handleHover(e),"aria-selected":t===this.props.selectedIndex},n?(0,s.createElement)("span",{"aria-label":this.props.displayTransform(e)},n.suggestionBeforeMatch,(0,s.createElement)("strong",{className:"components-form-token-field__suggestion-match"},n.suggestionMatch),n.suggestionAfterMatch):this.props.displayTransform(e))})))}}y.defaultProps={match:"",onHover:()=>{},onSelect:()=>{},suggestions:Object.freeze([])};const _=(0,d.withSafeTimeout)(y);var C=n(4662),k=n(9685),S=n(2875),A=n(1092),I=n(9179),T=n(2506);const F=(0,A.L)({as:"div",useHook:function(e){const t=(0,I.y)(e,"FlexBlock");return(0,T.i)({isBlock:!0,...t})},name:"FlexBlock"});var L=n(1685);const O=(0,d.createHigherOrderComponent)((e=>t=>{const[n,o]=(0,s.useState)(),r=(0,s.useCallback)((e=>o((()=>null!=e&&e.handleFocusOutside?e.handleFocusOutside.bind(e):void 0))),[]);return(0,s.createElement)("div",(0,d.__experimentalUseFocusOutside)(n),(0,s.createElement)(e,(0,g.Z)({ref:r},t)))}),"withFocusOutside")(class extends s.Component{handleFocusOutside(e){this.props.onFocusOutside(e)}render(){return this.props.children}}),N=function e({value:t,label:n,options:o,onChange:r,onFilterValueChange:l=u.noop,hideLabelFromVision:a,help:h,allowReset:g=!0,className:v,messages:E={selected:(0,i.__)("Item selected.")}}){var w;const y=(0,d.useInstanceId)(e),[A,I]=(0,s.useState)(null),[T,N]=(0,s.useState)(!1),[x,R]=(0,s.useState)(!1),[P,D]=(0,s.useState)(""),B=(0,s.useRef)(),V=o.find((e=>e.value===t)),M=null!==(w=null==V?void 0:V.label)&&void 0!==w?w:"",q=(0,s.useMemo)((()=>{const e=[],t=[],n=(0,u.deburr)(P.toLocaleLowerCase());return o.forEach((o=>{const r=(0,u.deburr)(o.label).toLocaleLowerCase().indexOf(n);0===r?e.push(o):r>0&&t.push(o)})),e.concat(t)}),[P,o,t]),W=e=>{r(e.value),(0,f.speak)(E.selected,"assertive"),I(e),D(""),N(!1)},U=(e=1)=>{let t=q.indexOf(A)+e;t<0?t=q.length-1:t>=q.length&&(t=0),I(q[t]),N(!0)};return(0,s.useEffect)((()=>{const e=q.length>0;if(T){const t=e?(0,i.sprintf)(
/* translators: %d: number of results. */
(0,i._n)("%d result found, use up and down arrow keys to navigate.","%d results found, use up and down arrow keys to navigate.",q.length),q.length):(0,i.__)("No results.");(0,f.speak)(t,"polite")}}),[q,T]),(0,s.createElement)(O,{onFocusOutside:()=>{N(!1)}},(0,s.createElement)(C.Z,{className:c()(v,"components-combobox-control"),tabIndex:"-1",label:n,id:`components-form-token-input-${y}`,hideLabelFromVision:a,help:h},(0,s.createElement)("div",{className:"components-combobox-control__suggestions-container",tabIndex:"-1",onKeyDown:e=>{let t=!1;switch(e.keyCode){case p.ENTER:A&&(W(A),t=!0);break;case p.UP:U(-1),t=!0;break;case p.DOWN:U(1),t=!0;break;case p.ESCAPE:N(!1),I(null),t=!0,e.stopPropagation()}t&&e.preventDefault()}},(0,s.createElement)(S.Z,null,(0,s.createElement)(F,null,(0,s.createElement)(b,{className:"components-combobox-control__input",instanceId:y,ref:B,value:T?P:M,"aria-label":M?`${M}, ${n}`:null,onFocus:()=>{R(!0),N(!0),l(""),D("")},onBlur:()=>{R(!1)},isExpanded:T,selectedSuggestionIndex:q.indexOf(A),onChange:e=>{const t=e.value;D(t),l(t),x&&N(!0)}})),g&&(0,s.createElement)(L.Z,null,(0,s.createElement)(k.Z,{className:"components-combobox-control__reset",icon:m,disabled:!t,onClick:()=>{r(null),B.current.input.focus()},label:(0,i.__)("Reset")}))),T&&(0,s.createElement)(_,{instanceId:y,match:{label:P},displayTransform:e=>e.label,suggestions:q,selectedIndex:q.indexOf(A),onHover:I,onSelect:W,scrollIntoView:!0}))))};var x=n(7884),R=n(9818),P=n(4801);n(5821);const D=(0,d.withInstanceId)((({id:e,className:t,label:n,onChange:l,options:a,value:d,required:u=!1,errorMessage:p=(0,i.__)("Please select a value.","woo-gutenberg-products-block"),errorId:f,instanceId:h="0",autoComplete:m="off"})=>{const g=(0,s.useRef)(null),v=e||"control-"+h,b=f||v,{setValidationErrors:E,clearValidationError:w}=(0,R.useDispatch)(P.VALIDATION_STORE_KEY),y=(0,R.useSelect)((e=>e(P.VALIDATION_STORE_KEY).getValidationError(b)));return(0,s.useEffect)((()=>(!u||d?w(b):E({[b]:{message:p,hidden:!0}}),()=>{w(b)})),[w,d,b,p,u,E]),(0,o.createElement)("div",{id:v,className:c()("wc-block-components-combobox",t,{"is-active":d,"has-error":(null==y?void 0:y.message)&&!(null!=y&&y.hidden)}),ref:g},(0,o.createElement)(N,{className:"wc-block-components-combobox-control",label:n,onChange:l,onFilterValueChange:e=>{if(e.length){const t=(0,x.Kn)(g.current)?g.current.ownerDocument.activeElement:void 0;if(t&&(0,x.Kn)(g.current)&&g.current.contains(t))return;const n=e.toLocaleUpperCase(),o=a.find((e=>e.value.toLocaleUpperCase()===n));if(o)return void l(o.value);const r=a.find((e=>e.label.toLocaleUpperCase().startsWith(n)));r&&l(r.value)}},options:a,value:d||"",allowReset:!1,autoComplete:m,"aria-invalid":(null==y?void 0:y.message)&&!(null!=y&&y.hidden)}),(0,o.createElement)(r.ValidationInputError,{propertyName:b}))}));n(7775);const B=({className:e,countries:t,id:n,label:r,onChange:a,value:d="",autoComplete:u="off",required:p=!1,errorId:f,errorMessage:h=(0,i.__)("Please select a country","woo-gutenberg-products-block")})=>{const m=(0,s.useMemo)((()=>Object.entries(t).map((([e,t])=>({value:e,label:(0,l.decodeEntities)(t)})))),[t]);return(0,o.createElement)("div",{className:c()(e,"wc-block-components-country-input")},(0,o.createElement)(D,{id:n,label:r,onChange:a,options:m,value:d,errorId:f,errorMessage:h,required:p,autoComplete:u}))};var V=n(5271);const M=e=>(0,o.createElement)(B,{countries:V.DK,...e}),q=e=>(0,o.createElement)(B,{countries:V.mO,...e});n(8410);const W=(e,t)=>{const n=t.find((t=>t.label.toLocaleUpperCase()===e.toLocaleUpperCase()||t.value.toLocaleUpperCase()===e.toLocaleUpperCase()));return n?n.value:""},U=({className:e,id:t,states:n,country:a,label:d,onChange:u,autoComplete:p="off",value:f="",required:h=!1,errorId:m=""})=>{const g=n[a],v=(0,s.useMemo)((()=>g?Object.keys(g).map((e=>({value:e,label:(0,l.decodeEntities)(g[e])}))):[]),[g]),b=(0,s.useCallback)((e=>{const t=v.length>0?W(e,v):e;t!==f&&u(t)}),[u,v,f]),E=(0,s.useRef)(f);return(0,s.useEffect)((()=>{E.current!==f&&(E.current=f)}),[f]),(0,s.useEffect)((()=>{if(v.length>0&&E.current){const e=W(E.current,v);e!==E.current&&b(e)}}),[v,b]),v.length>0?(0,o.createElement)(D,{className:c()(e,"wc-block-components-state-input"),id:t,label:d,onChange:b,options:v,value:f,errorMessage:(0,i.__)("Please select a state.","woo-gutenberg-products-block"),errorId:m,required:h,autoComplete:p}):(0,o.createElement)(r.ValidatedTextInput,{className:e,id:t,label:d,onChange:b,autoComplete:p,value:f,required:h})},K=e=>(0,o.createElement)(U,{states:V.JJ,...e}),H=e=>(0,o.createElement)(U,{states:V.nm,...e});var $=n(9075),Z=n(4617),Y=n(9127),z=n.n(Y),j=n(3340);const G=Object.keys(Z.defaultAddressFields),J=(0,d.withInstanceId)((({id:e="",fields:t=G,fieldConfig:n={},instanceId:l,onChange:a,type:c="shipping",values:d})=>{const u=(0,$.s)(t),p=(0,$.s)(n),f=(0,$.s)(d.country),h=(0,s.useMemo)((()=>{const e=(0,j.Z)(u,p,f);return{fields:e,type:c,required:e.filter((e=>e.required)),hidden:e.filter((e=>e.hidden))}}),[u,p,f,c]),m=(0,s.useRef)({});return(0,s.useEffect)((()=>{const e={...d,...Object.fromEntries(h.hidden.map((e=>[e.key,""])))};z()(d,e)||a(e)}),[a,h,d]),(0,s.useEffect)((()=>{"shipping"===c&&(e=>{const t="shipping_country",n=(0,R.select)(P.VALIDATION_STORE_KEY).getValidationError(t);!e.country&&(e.city||e.state||e.postcode)&&(n?(0,R.dispatch)(P.VALIDATION_STORE_KEY).showValidationError(t):(0,R.dispatch)(P.VALIDATION_STORE_KEY).setValidationErrors({[t]:{message:(0,i.__)("Please select your country","woo-gutenberg-products-block"),hidden:!1}})),n&&e.country&&(0,R.dispatch)(P.VALIDATION_STORE_KEY).clearValidationError(t)})(d)}),[d,c]),(0,s.useEffect)((()=>{var e,t;null===(e=m.current)||void 0===e||null===(t=e.postcode)||void 0===t||t.revalidate()}),[f]),e=e||l,(0,o.createElement)("div",{id:e,className:"wc-block-components-address-form"},h.fields.map((t=>{if(t.hidden)return null;const n={id:`${e}-${t.key}`,errorId:`${c}_${t.key}`,label:t.required?t.label:t.optionalLabel,autoCapitalize:t.autocapitalize,autoComplete:t.autocomplete,errorMessage:t.errorMessage,required:t.required,className:`wc-block-components-address-form__${t.key}`};if("country"===t.key){const e="shipping"===c?q:M;return(0,o.createElement)(e,{key:t.key,...n,value:d.country,onChange:e=>{const t={...d,country:e,state:""};d.postcode&&!(0,r.isPostcode)({postcode:d.postcode,country:e})&&(t.postcode=""),a(t)}})}if("state"===t.key){const e="shipping"===c?H:K;return(0,o.createElement)(e,{key:t.key,...n,country:d.country,value:d.state,onChange:e=>a({...d,state:e})})}return(0,o.createElement)(r.ValidatedTextInput,{key:t.key,ref:e=>m.current[t.key]=e,...n,value:d[t.key],onChange:e=>a({...d,[t.key]:e}),customFormatter:e=>"postcode"===t.key?e.trimStart().toUpperCase():e,customValidation:e=>((e,t,n)=>!((e.required||e.value)&&"postcode"===t&&n.country&&!(0,r.isPostcode)({postcode:e.value,country:n.country})&&(e.setCustomValidity((0,i.__)("Please enter a valid postcode","woo-gutenberg-products-block")),1)))(e,t.key,d)})})))}))},6938:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var o=n(9196),r=n(9307),s=n(5904);const i=["BUTTON","FIELDSET","INPUT","OPTGROUP","OPTION","SELECT","TEXTAREA","A"],l=({children:e,style:t={},...n})=>{const l=(0,r.useRef)(null),a=()=>{l.current&&s.focus.focusable.find(l.current).forEach((e=>{i.includes(e.nodeName)&&e.setAttribute("tabindex","-1"),e.hasAttribute("contenteditable")&&e.setAttribute("contenteditable","false")}))},c=function(e,t,n){var r=this,s=(0,o.useRef)(null),i=(0,o.useRef)(0),l=(0,o.useRef)(null),a=(0,o.useRef)([]),c=(0,o.useRef)(),d=(0,o.useRef)(),u=(0,o.useRef)(e),p=(0,o.useRef)(!0);(0,o.useEffect)((function(){u.current=e}),[e]);var f=!t&&0!==t&&"undefined"!=typeof window;if("function"!=typeof e)throw new TypeError("Expected a function");t=+t||0;var h=!!(n=n||{}).leading,m=!("trailing"in n)||!!n.trailing,g="maxWait"in n,v=g?Math.max(+n.maxWait||0,t):null;(0,o.useEffect)((function(){return p.current=!0,function(){p.current=!1}}),[]);var b=(0,o.useMemo)((function(){var e=function(e){var t=a.current,n=c.current;return a.current=c.current=null,i.current=e,d.current=u.current.apply(n,t)},n=function(e,t){f&&cancelAnimationFrame(l.current),l.current=f?requestAnimationFrame(e):setTimeout(e,t)},o=function(e){if(!p.current)return!1;var n=e-s.current;return!s.current||n>=t||n<0||g&&e-i.current>=v},b=function(t){return l.current=null,m&&a.current?e(t):(a.current=c.current=null,d.current)},E=function e(){var r=Date.now();if(o(r))return b(r);if(p.current){var l=t-(r-s.current),a=g?Math.min(l,v-(r-i.current)):l;n(e,a)}},w=function(){var u=Date.now(),f=o(u);if(a.current=[].slice.call(arguments),c.current=r,s.current=u,f){if(!l.current&&p.current)return i.current=s.current,n(E,t),h?e(s.current):d.current;if(g)return n(E,t),e(s.current)}return l.current||n(E,t),d.current};return w.cancel=function(){l.current&&(f?cancelAnimationFrame(l.current):clearTimeout(l.current)),i.current=0,a.current=s.current=c.current=l.current=null},w.isPending=function(){return!!l.current},w.flush=function(){return l.current?b(Date.now()):d.current},w}),[h,g,t,v,m,f]);return b}(a,0,{leading:!0});return(0,r.useLayoutEffect)((()=>{let e;return a(),l.current&&(e=new window.MutationObserver(c),e.observe(l.current,{childList:!0,attributes:!0,subtree:!0})),()=>{e&&e.disconnect(),c.cancel()}}),[c]),(0,o.createElement)("div",{ref:l,"aria-disabled":"true",style:{userSelect:"none",pointerEvents:"none",cursor:"normal",...t},...n},e)}},7277:(e,t,n)=>{"use strict";n.d(t,{B:()=>c});var o=n(4617),r=n(9307),s=n(9818),i=n(4801),l=n(7844),a=n(5027);const c=()=>{const{needsShipping:e}=(0,a.V)(),{useShippingAsBilling:t,prefersCollection:n}=(0,s.useSelect)((e=>({useShippingAsBilling:e(i.CHECKOUT_STORE_KEY).getUseShippingAsBilling(),prefersCollection:e(i.CHECKOUT_STORE_KEY).prefersCollection()}))),{__internalSetUseShippingAsBilling:c}=(0,s.useDispatch)(i.CHECKOUT_STORE_KEY),{billingAddress:d,setBillingAddress:u,shippingAddress:p,setShippingAddress:f}=(0,l.L)(),h=(0,r.useCallback)((e=>{u({email:e})}),[u]),m=(0,r.useCallback)((e=>{u({phone:e})}),[u]),g=(0,r.useCallback)((e=>{f({phone:e})}),[f]),v=(0,o.getSetting)("forcedBillingAddress",!1);return{shippingAddress:p,billingAddress:d,setShippingAddress:f,setBillingAddress:u,setEmail:h,setBillingPhone:m,setShippingPhone:g,defaultAddressFields:o.defaultAddressFields,useShippingAsBilling:t,setUseShippingAsBilling:c,needsShipping:e,showShippingFields:!v&&e&&!n,showShippingMethods:e&&!n,showBillingFields:!e||!t||n,forcedBillingAddress:v,useBillingAsShipping:v||n}}},7844:(e,t,n)=>{"use strict";n.d(t,{L:()=>s});var o=n(9818),r=n(4801);const s=()=>{const{customerData:e,isInitialized:t}=(0,o.useSelect)((e=>{const t=e(r.CART_STORE_KEY);return{customerData:t.getCustomerData(),isInitialized:t.hasFinishedResolution("getCartData")}})),{setShippingAddress:n,setBillingAddress:s}=(0,o.useDispatch)(r.CART_STORE_KEY);return{isInitialized:t,billingAddress:e.billingAddress,shippingAddress:e.shippingAddress,setBillingAddress:s,setShippingAddress:n}}},9075:(e,t,n)=>{"use strict";n.d(t,{s:()=>i});var o=n(9307),r=n(9127),s=n.n(r);function i(e){const t=(0,o.useRef)(e);return s()(e,t.current)||(t.current=e),t.current}},1106:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var o=n(9196),r=n(5736),s=n(5271);n(5362);const i=({address:e,onEdit:t,target:n})=>(0,o.createElement)("div",{className:"wc-block-components-address-card"},(0,o.createElement)("address",null,(0,o.createElement)("span",{className:"wc-block-components-address-card__address-section"},e.first_name+" "+e.last_name),(0,o.createElement)("div",{className:"wc-block-components-address-card__address-section"},[e.address_1,e.address_2,e.city,e.state,e.postcode,s.DK[e.country]?s.DK[e.country]:e.country].filter((e=>!!e)).map(((e,t)=>(0,o.createElement)("span",{key:"address-"+t},e)))),e.phone?(0,o.createElement)("div",{key:"address-phone",className:"wc-block-components-address-card__address-section"},e.phone):""),t&&(0,o.createElement)("a",{role:"button",href:"#"+n,className:"wc-block-components-address-card__edit","aria-label":(0,r.__)("Edit address","woo-gutenberg-products-block"),onClick:e=>{t(),e.preventDefault()}},(0,r.__)("Edit","woo-gutenberg-products-block")))},4660:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var o=n(9196),r=n(4184),s=n.n(r);n(1741);const i=({isEditing:e=!1,addressCard:t,addressForm:n})=>{const r=s()("wc-block-components-address-address-wrapper",{"is-editing":e});return(0,o.createElement)("div",{className:r},(0,o.createElement)("div",{className:"wc-block-components-address-card-wrapper"},t()),(0,o.createElement)("div",{className:"wc-block-components-address-form-wrapper"},n()))}},9490:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});var o=n(5736);const r=({defaultTitle:e=(0,o.__)("Step","woo-gutenberg-products-block"),defaultDescription:t=(0,o.__)("Step description text.","woo-gutenberg-products-block"),defaultShowStepNumber:n=!0})=>({title:{type:"string",default:e},description:{type:"string",default:t},showStepNumber:{type:"boolean",default:n}})},1946:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>I});var o=n(9196),r=n(4184),s=n.n(r),i=n(721),l=n(711),a=n(7277),c=n(9818),d=n(4801),u=n(5736),p=n(9307),f=n(3298),h=n(8832),m=n(6423),g=n(3554),v=n(6938),b=n(8082),E=n(5918),w=n(4660),y=n(3112),_=n(1106);const C=({addressFieldsConfig:e,showPhoneField:t,requirePhoneField:n})=>{const{defaultAddressFields:r,shippingAddress:s,setShippingAddress:i,setBillingAddress:l,setShippingPhone:u,setBillingPhone:f,useShippingAsBilling:h}=(0,a.B)(),{dispatchCheckoutEvent:m}=(0,E.n)(),g=!(!s.address_1||!s.first_name&&!s.last_name),[v,C]=(0,p.useState)(!g),{hasValidationErrors:k,invalidProps:S}=(0,c.useSelect)((e=>{const t=e(d.VALIDATION_STORE_KEY);return{hasValidationErrors:t.hasValidationErrors(),invalidProps:Object.keys(s).filter((e=>void 0!==t.getValidationError("shipping_"+e))).filter(Boolean)}}));(0,p.useEffect)((()=>{S.length>0&&!1===v&&C(!0)}),[v,k,S.length]);const A=Object.keys(r),I=(0,p.useCallback)((e=>{if(i(e),h){const{...n}=e;t||delete n.phone,l(n),m("set-billing-address")}m("set-shipping-address")}),[m,l,i,h,t]),T=(0,p.useCallback)((()=>(0,o.createElement)(_.Z,{address:s,target:"shipping",onEdit:()=>{C(!0)}})),[s]),F=(0,p.useCallback)((()=>(0,o.createElement)(o.Fragment,null,(0,o.createElement)(b.k,{id:"shipping",type:"shipping",onChange:I,values:s,fields:A,fieldConfig:e}),t&&(0,o.createElement)(y.Z,{id:"shipping-phone",errorId:"shipping_phone",isRequired:n,value:s.phone,onChange:e=>{u(e),m("set-phone-number",{step:"shipping"}),h&&(f(e),m("set-phone-number",{step:"billing"}))}}))),[A,e,m,I,n,u,s,t]);return(0,o.createElement)(w.Z,{isEditing:v,addressCard:T,addressForm:F})},k=({showCompanyField:e=!1,showApartmentField:t=!1,showPhoneField:n=!1,requireCompanyField:r=!1,requirePhoneField:s=!1})=>{const{setBillingAddress:i,shippingAddress:l,useShippingAsBilling:c,setUseShippingAsBilling:d}=(0,a.B)(),{isEditor:b}=(0,h._)(),E=()=>{const t={...l};n||delete t.phone,e&&delete t.company,i(t)};(0,f.qR)((()=>{c&&E()}));const w=(0,p.useMemo)((()=>({company:{hidden:!e,required:r},address_2:{hidden:!t}})),[e,r,t]),y=b?v.Z:p.Fragment,_=c?[m.n7.SHIPPING_ADDRESS,m.n7.BILLING_ADDRESS]:[m.n7.SHIPPING_ADDRESS],k=!(!l.address_1||!l.first_name&&!l.last_name);return(0,o.createElement)(p.Fragment,null,(0,o.createElement)(g.StoreNoticesContainer,{context:_}),(0,o.createElement)(y,null,(0,o.createElement)(C,{addressFieldsConfig:w,showPhoneField:n,requirePhoneField:s})),k&&(0,o.createElement)(g.CheckboxControl,{className:"wc-block-checkout__use-address-for-billing",label:(0,u.__)("Use same address for billing","woo-gutenberg-products-block"),checked:c,onChange:e=>{d(e),e&&E()}}))},S={...(0,n(9490).Z)({defaultTitle:(0,u.__)("Shipping address","woo-gutenberg-products-block"),defaultDescription:(0,u.__)("Enter the address where you want your order delivered.","woo-gutenberg-products-block")}),className:{type:"string",default:""},lock:{type:"object",default:{move:!0,remove:!0}}};var A=n(1141);const I=(0,i.withFilteredAttributes)(S)((({title:e,description:t,showStepNumber:n,children:r,className:i})=>{const u=(0,c.useSelect)((e=>e(d.CHECKOUT_STORE_KEY).isProcessing())),{showShippingFields:p}=(0,a.B)(),{requireCompanyField:f,requirePhoneField:h,showApartmentField:m,showCompanyField:g,showPhoneField:v}=(0,A.s4)();return p?(0,o.createElement)(l.FormStep,{id:"shipping-fields",disabled:u,className:s()("wc-block-checkout__shipping-fields",i),title:e,description:t,showStepNumber:n},(0,o.createElement)(k,{requireCompanyField:f,requirePhoneField:h,showApartmentField:m,showCompanyField:g,showPhoneField:v}),r):null}))},3112:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var o=n(9196),r=n(5736),s=n(3554);const i=({id:e="phone",errorId:t="phone",isRequired:n=!1,value:i="",onChange:l})=>(0,o.createElement)(s.ValidatedTextInput,{id:e,errorId:t,type:"tel",autoComplete:"tel",required:n,label:n?(0,r.__)("Phone","woo-gutenberg-products-block"):(0,r.__)("Phone (optional)","woo-gutenberg-products-block"),value:i,onChange:l})},9010:(e,t,n)=>{"use strict";var o=n(4657);e.exports=function(e,t,n){n=n||{},9===t.nodeType&&(t=o.getWindow(t));var r=n.allowHorizontalScroll,s=n.onlyScrollIfNeeded,i=n.alignWithTop,l=n.alignWithLeft,a=n.offsetTop||0,c=n.offsetLeft||0,d=n.offsetBottom||0,u=n.offsetRight||0;r=void 0===r||r;var p=o.isWindow(t),f=o.offset(e),h=o.outerHeight(e),m=o.outerWidth(e),g=void 0,v=void 0,b=void 0,E=void 0,w=void 0,y=void 0,_=void 0,C=void 0,k=void 0,S=void 0;p?(_=t,S=o.height(_),k=o.width(_),C={left:o.scrollLeft(_),top:o.scrollTop(_)},w={left:f.left-C.left-c,top:f.top-C.top-a},y={left:f.left+m-(C.left+k)+u,top:f.top+h-(C.top+S)+d},E=C):(g=o.offset(t),v=t.clientHeight,b=t.clientWidth,E={left:t.scrollLeft,top:t.scrollTop},w={left:f.left-(g.left+(parseFloat(o.css(t,"borderLeftWidth"))||0))-c,top:f.top-(g.top+(parseFloat(o.css(t,"borderTopWidth"))||0))-a},y={left:f.left+m-(g.left+b+(parseFloat(o.css(t,"borderRightWidth"))||0))+u,top:f.top+h-(g.top+v+(parseFloat(o.css(t,"borderBottomWidth"))||0))+d}),w.top<0||y.top>0?!0===i?o.scrollTop(t,E.top+w.top):!1===i?o.scrollTop(t,E.top+y.top):w.top<0?o.scrollTop(t,E.top+w.top):o.scrollTop(t,E.top+y.top):s||((i=void 0===i||!!i)?o.scrollTop(t,E.top+w.top):o.scrollTop(t,E.top+y.top)),r&&(w.left<0||y.left>0?!0===l?o.scrollLeft(t,E.left+w.left):!1===l?o.scrollLeft(t,E.left+y.left):w.left<0?o.scrollLeft(t,E.left+w.left):o.scrollLeft(t,E.left+y.left):s||((l=void 0===l||!!l)?o.scrollLeft(t,E.left+w.left):o.scrollLeft(t,E.left+y.left)))}},4979:(e,t,n)=>{"use strict";e.exports=n(9010)},4657:e=>{"use strict";var t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function o(e,t){var n=e["page"+(t?"Y":"X")+"Offset"],o="scroll"+(t?"Top":"Left");if("number"!=typeof n){var r=e.document;"number"!=typeof(n=r.documentElement[o])&&(n=r.body[o])}return n}function r(e){return o(e)}function s(e){return o(e,!0)}function i(e){var t=function(e){var t,n=void 0,o=void 0,r=e.ownerDocument,s=r.body,i=r&&r.documentElement;return n=(t=e.getBoundingClientRect()).left,o=t.top,{left:n-=i.clientLeft||s.clientLeft||0,top:o-=i.clientTop||s.clientTop||0}}(e),n=e.ownerDocument,o=n.defaultView||n.parentWindow;return t.left+=r(o),t.top+=s(o),t}var l=new RegExp("^("+/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source+")(?!px)[a-z%]+$","i"),a=/^(top|right|bottom|left)$/,c="currentStyle",d="runtimeStyle",u="left",p=void 0;function f(e,t){for(var n=0;n<e.length;n++)t(e[n])}function h(e){return"border-box"===p(e,"boxSizing")}"undefined"!=typeof window&&(p=window.getComputedStyle?function(e,t,n){var o="",r=e.ownerDocument,s=n||r.defaultView.getComputedStyle(e,null);return s&&(o=s.getPropertyValue(t)||s[t]),o}:function(e,t){var n=e[c]&&e[c][t];if(l.test(n)&&!a.test(t)){var o=e.style,r=o[u],s=e[d][u];e[d][u]=e[c][u],o[u]="fontSize"===t?"1em":n||0,n=o.pixelLeft+"px",o[u]=r,e[d][u]=s}return""===n?"auto":n});var m=["margin","border","padding"],g=-1,v=2,b=1;function E(e,t,n){var o=0,r=void 0,s=void 0,i=void 0;for(s=0;s<t.length;s++)if(r=t[s])for(i=0;i<n.length;i++){var l;l="border"===r?r+n[i]+"Width":r+n[i],o+=parseFloat(p(e,l))||0}return o}function w(e){return null!=e&&e==e.window}var y={};function _(e,t,n){if(w(e))return"width"===t?y.viewportWidth(e):y.viewportHeight(e);if(9===e.nodeType)return"width"===t?y.docWidth(e):y.docHeight(e);var o="width"===t?["Left","Right"]:["Top","Bottom"],r="width"===t?e.offsetWidth:e.offsetHeight,s=(p(e),h(e)),i=0;(null==r||r<=0)&&(r=void 0,(null==(i=p(e,t))||Number(i)<0)&&(i=e.style[t]||0),i=parseFloat(i)||0),void 0===n&&(n=s?b:g);var l=void 0!==r||s,a=r||i;if(n===g)return l?a-E(e,["border","padding"],o):i;if(l){var c=n===v?-E(e,["border"],o):E(e,["margin"],o);return a+(n===b?0:c)}return i+E(e,m.slice(n),o)}f(["Width","Height"],(function(e){y["doc"+e]=function(t){var n=t.document;return Math.max(n.documentElement["scroll"+e],n.body["scroll"+e],y["viewport"+e](n))},y["viewport"+e]=function(t){var n="client"+e,o=t.document,r=o.body,s=o.documentElement[n];return"CSS1Compat"===o.compatMode&&s||r&&r[n]||s}}));var C={position:"absolute",visibility:"hidden",display:"block"};function k(e){var t=void 0,n=arguments;return 0!==e.offsetWidth?t=_.apply(void 0,n):function(e,o,r){var s={},i=e.style,l=void 0;for(l in o)o.hasOwnProperty(l)&&(s[l]=i[l],i[l]=o[l]);for(l in function(){t=_.apply(void 0,n)}.call(e),o)o.hasOwnProperty(l)&&(i[l]=s[l])}(e,C),t}function S(e,t,o){var r=o;if("object"!==(void 0===t?"undefined":n(t)))return void 0!==r?("number"==typeof r&&(r+="px"),void(e.style[t]=r)):p(e,t);for(var s in t)t.hasOwnProperty(s)&&S(e,s,t[s])}f(["width","height"],(function(e){var t=e.charAt(0).toUpperCase()+e.slice(1);y["outer"+t]=function(t,n){return t&&k(t,e,n?0:b)};var n="width"===e?["Left","Right"]:["Top","Bottom"];y[e]=function(t,o){return void 0===o?t&&k(t,e,g):t?(p(t),h(t)&&(o+=E(t,["padding","border"],n)),S(t,e,o)):void 0}})),e.exports=t({getWindow:function(e){var t=e.ownerDocument||e;return t.defaultView||t.parentWindow},offset:function(e,t){if(void 0===t)return i(e);!function(e,t){"static"===S(e,"position")&&(e.style.position="relative");var n=i(e),o={},r=void 0,s=void 0;for(s in t)t.hasOwnProperty(s)&&(r=parseFloat(S(e,s))||0,o[s]=r+t[s]-n[s]);S(e,o)}(e,t)},isWindow:w,each:f,css:S,clone:function(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);if(e.overflow)for(var n in e)e.hasOwnProperty(n)&&(t.overflow[n]=e.overflow[n]);return t},scrollLeft:function(e,t){if(w(e)){if(void 0===t)return r(e);window.scrollTo(t,s(e))}else{if(void 0===t)return e.scrollLeft;e.scrollLeft=t}},scrollTop:function(e,t){if(w(e)){if(void 0===t)return s(e);window.scrollTo(r(e),t)}else{if(void 0===t)return e.scrollTop;e.scrollTop=t}},viewportWidth:0,viewportHeight:0},y)},5821:()=>{},7775:()=>{},8410:()=>{},5362:()=>{},1741:()=>{},3298:(e,t,n)=>{"use strict";n.d(t,{qR:()=>r});var o=n(9196);const r=function(e){(0,o.useEffect)(e,[])};"undefined"!=typeof window?o.useLayoutEffect:o.useEffect},3019:(e,t,n)=>{"use strict";n.d(t,{Iq:()=>l});var o=n(2819),r=n(9307),s=(n(2560),n(1765)),i=n(1282);function l(e,t,n={}){const{memo:l=!1}=n;let a=(0,r.forwardRef)(e);l&&(a=(0,r.memo)(a)),void 0===t&&"undefined"!=typeof process&&process.env;let c=a[s.rE]||[t];return Array.isArray(t)&&(c=[...c,...t]),"string"==typeof t&&(c=[...c,t]),a.displayName=t,a[s.rE]=(0,o.uniq)(c),a.selector=`.${(0,i.l)(t)}`,a}}}]);