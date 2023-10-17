(self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[]).push([[826],{1037:(e,t,n)=>{"use strict";n.d(t,{Z:()=>g});var o=n(9307),r=n(3554),s=n(6484),i=n(7350),l=n(4333),a=n(9075),c=n(4617),d=n(9127),u=n.n(d),p=n(3340),f=n(9822),h=n(6767);const m=Object.keys(c.defaultAddressFields),g=(0,l.withInstanceId)((({id:e="",fields:t=m,fieldConfig:n={},instanceId:l,onChange:c,type:d="shipping",values:g})=>{const v=(0,a.s)(t),b=(0,a.s)(n),w=(0,a.s)(g.country),E=(0,o.useMemo)((()=>{const e=(0,p.Z)(v,b,w);return{fields:e,type:d,required:e.filter((e=>e.required)),hidden:e.filter((e=>e.hidden))}}),[v,b,w,d]),y=(0,o.useRef)({});return(0,o.useEffect)((()=>{const e={...g,...Object.fromEntries(E.hidden.map((e=>[e.key,""])))};u()(g,e)||c(e)}),[c,E,g]),(0,o.useEffect)((()=>{"shipping"===d&&(0,f.Z)(g)}),[g,d]),(0,o.useEffect)((()=>{var e,t;null===(e=y.current)||void 0===e||null===(t=e.postcode)||void 0===t||t.revalidate()}),[w]),e=e||l,(0,o.createElement)("div",{id:e,className:"wc-block-components-address-form"},E.fields.map((t=>{if(t.hidden)return null;const n={id:`${e}-${t.key}`,errorId:`${d}_${t.key}`,label:t.required?t.label:t.optionalLabel,autoCapitalize:t.autocapitalize,autoComplete:t.autocomplete,errorMessage:t.errorMessage,required:t.required,className:`wc-block-components-address-form__${t.key}`};if("country"===t.key){const e="shipping"===d?s.he:s.eQ;return(0,o.createElement)(e,{key:t.key,...n,value:g.country,onChange:e=>{const t={...g,country:e,state:""};g.postcode&&!(0,r.isPostcode)({postcode:g.postcode,country:e})&&(t.postcode=""),c(t)}})}if("state"===t.key){const e="shipping"===d?i.dI:i.IG;return(0,o.createElement)(e,{key:t.key,...n,country:g.country,value:g.state,onChange:e=>c({...g,state:e})})}return(0,o.createElement)(r.ValidatedTextInput,{key:t.key,ref:e=>y.current[t.key]=e,...n,value:g[t.key],onChange:e=>c({...g,[t.key]:e}),customFormatter:e=>"postcode"===t.key?e.trimStart().toUpperCase():e,customValidation:e=>(0,h.Z)(e,t.key,g)})})))}))},6767:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var o=n(5736),r=n(3554);const s=(e,t,n)=>!((e.required||e.value)&&"postcode"===t&&n.country&&!(0,r.isPostcode)({postcode:e.value,country:n.country})&&(e.setCustomValidity((0,o.__)("Please enter a valid postcode","woo-gutenberg-products-block")),1))},9055:(e,t,n)=>{"use strict";n.d(t,{k:()=>o.Z});var o=n(1037)},9822:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var o=n(5736),r=n(9818),s=n(4801);const i=e=>{const t="shipping_country",n=(0,r.select)(s.VALIDATION_STORE_KEY).getValidationError(t);!e.country&&(e.city||e.state||e.postcode)&&(n?(0,r.dispatch)(s.VALIDATION_STORE_KEY).showValidationError(t):(0,r.dispatch)(s.VALIDATION_STORE_KEY).setValidationErrors({[t]:{message:(0,o.__)("Please select your country","woo-gutenberg-products-block"),hidden:!1}})),n&&e.country&&(0,r.dispatch)(s.VALIDATION_STORE_KEY).clearValidationError(t)}},30:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var o=n(9307),r=n(4184),s=n.n(r),i=n(7914);n(7424);const l=({title:e,stepHeadingContent:t})=>(0,o.createElement)("div",{className:"wc-block-components-checkout-step__heading"},(0,o.createElement)(i.Z,{"aria-hidden":"true",className:"wc-block-components-checkout-step__title",headingLevel:"2"},e),!!t&&(0,o.createElement)("span",{className:"wc-block-components-checkout-step__heading-content"},t)),a=({id:e,className:t,title:n,legend:r,description:i,children:a,disabled:c=!1,showStepNumber:d=!0,stepHeadingContent:u=(()=>{})})=>{const p=r||n?"fieldset":"div";return(0,o.createElement)(p,{className:s()(t,"wc-block-components-checkout-step",{"wc-block-components-checkout-step--with-step-number":d,"wc-block-components-checkout-step--disabled":c}),id:e,disabled:c},!(!r&&!n)&&(0,o.createElement)("legend",{className:"screen-reader-text"},r||n),!!n&&(0,o.createElement)(l,{title:n,stepHeadingContent:u()}),(0,o.createElement)("div",{className:"wc-block-components-checkout-step__container"},!!i&&(0,o.createElement)("p",{className:"wc-block-components-checkout-step__description"},i),(0,o.createElement)("div",{className:"wc-block-components-checkout-step__content"},a)))}},5378:(e,t,n)=>{"use strict";n.d(t,{Z:()=>R});var o=n(9307),r=n(4184),s=n.n(r),i=n(5736),l=n(4333),a=n(2819),c=n(9630),d=n(5158),u=n(444);const p=(0,o.createElement)(u.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(u.Path,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"}));var f=n(7462);class h extends o.Component{constructor(){super(...arguments),this.onChange=this.onChange.bind(this),this.bindInput=this.bindInput.bind(this)}focus(){this.input.focus()}hasFocus(){return this.input===this.input.ownerDocument.activeElement}bindInput(e){this.input=e}onChange(e){this.props.onChange({value:e.target.value})}render(){const{value:e,isExpanded:t,instanceId:n,selectedSuggestionIndex:r,className:i,...l}=this.props,a=e?e.length+1:0;return(0,o.createElement)("input",(0,f.Z)({ref:this.bindInput,id:`components-form-token-input-${n}`,type:"text"},l,{value:e||"",onChange:this.onChange,size:a,className:s()(i,"components-form-token-field__input"),autoComplete:"off",role:"combobox","aria-expanded":t,"aria-autocomplete":"list","aria-owns":t?`components-form-token-suggestions-${n}`:void 0,"aria-activedescendant":-1!==r?`components-form-token-suggestions-${n}-${r}`:void 0,"aria-describedby":`components-form-token-suggestions-howto-${n}`}))}}const m=h;var g=n(4979),v=n.n(g);class b extends o.Component{constructor(){super(...arguments),this.handleMouseDown=this.handleMouseDown.bind(this),this.bindList=this.bindList.bind(this)}componentDidUpdate(){this.props.selectedIndex>-1&&this.props.scrollIntoView&&this.list.children[this.props.selectedIndex]&&(this.scrollingIntoView=!0,v()(this.list.children[this.props.selectedIndex],this.list,{onlyScrollIfNeeded:!0}),this.props.setTimeout((()=>{this.scrollingIntoView=!1}),100))}bindList(e){this.list=e}handleHover(e){return()=>{this.scrollingIntoView||this.props.onHover(e)}}handleClick(e){return()=>{this.props.onSelect(e)}}handleMouseDown(e){e.preventDefault()}computeSuggestionMatch(e){const t=this.props.displayTransform(this.props.match||"").toLocaleLowerCase();if(0===t.length)return null;const n=(e=this.props.displayTransform(e)).toLocaleLowerCase().indexOf(t);return{suggestionBeforeMatch:e.substring(0,n),suggestionMatch:e.substring(n,n+t.length),suggestionAfterMatch:e.substring(n+t.length)}}render(){return(0,o.createElement)("ul",{ref:this.bindList,className:"components-form-token-field__suggestions-list",id:`components-form-token-suggestions-${this.props.instanceId}`,role:"listbox"},(0,a.map)(this.props.suggestions,((e,t)=>{const n=this.computeSuggestionMatch(e),r=s()("components-form-token-field__suggestion",{"is-selected":t===this.props.selectedIndex});return(0,o.createElement)("li",{id:`components-form-token-suggestions-${this.props.instanceId}-${t}`,role:"option",className:r,key:null!=e&&e.value?e.value:this.props.displayTransform(e),onMouseDown:this.handleMouseDown,onClick:this.handleClick(e),onMouseEnter:this.handleHover(e),"aria-selected":t===this.props.selectedIndex},n?(0,o.createElement)("span",{"aria-label":this.props.displayTransform(e)},n.suggestionBeforeMatch,(0,o.createElement)("strong",{className:"components-form-token-field__suggestion-match"},n.suggestionMatch),n.suggestionAfterMatch):this.props.displayTransform(e))})))}}b.defaultProps={match:"",onHover:()=>{},onSelect:()=>{},suggestions:Object.freeze([])};const w=(0,l.withSafeTimeout)(b);var E=n(4662),y=n(9685),k=n(2875),_=n(1092),C=n(9179),S=n(2506);const I=(0,_.L)({as:"div",useHook:function(e){const t=(0,C.y)(e,"FlexBlock");return(0,S.i)({isBlock:!0,...t})},name:"FlexBlock"});var A=n(1685);const T=(0,l.createHigherOrderComponent)((e=>t=>{const[n,r]=(0,o.useState)(),s=(0,o.useCallback)((e=>r((()=>null!=e&&e.handleFocusOutside?e.handleFocusOutside.bind(e):void 0))),[]);return(0,o.createElement)("div",(0,l.__experimentalUseFocusOutside)(n),(0,o.createElement)(e,(0,f.Z)({ref:s},t)))}),"withFocusOutside")(class extends o.Component{handleFocusOutside(e){this.props.onFocusOutside(e)}render(){return this.props.children}}),N=function e({value:t,label:n,options:r,onChange:u,onFilterValueChange:f=a.noop,hideLabelFromVision:h,help:g,allowReset:v=!0,className:b,messages:_={selected:(0,i.__)("Item selected.")}}){var C;const S=(0,l.useInstanceId)(e),[N,L]=(0,o.useState)(null),[F,O]=(0,o.useState)(!1),[x,R]=(0,o.useState)(!1),[P,D]=(0,o.useState)(""),B=(0,o.useRef)(),V=r.find((e=>e.value===t)),M=null!==(C=null==V?void 0:V.label)&&void 0!==C?C:"",Z=(0,o.useMemo)((()=>{const e=[],t=[],n=(0,a.deburr)(P.toLocaleLowerCase());return r.forEach((o=>{const r=(0,a.deburr)(o.label).toLocaleLowerCase().indexOf(n);0===r?e.push(o):r>0&&t.push(o)})),e.concat(t)}),[P,r,t]),q=e=>{u(e.value),(0,d.speak)(_.selected,"assertive"),L(e),D(""),O(!1)},W=(e=1)=>{let t=Z.indexOf(N)+e;t<0?t=Z.length-1:t>=Z.length&&(t=0),L(Z[t]),O(!0)};return(0,o.useEffect)((()=>{const e=Z.length>0;if(F){const t=e?(0,i.sprintf)(
/* translators: %d: number of results. */
(0,i._n)("%d result found, use up and down arrow keys to navigate.","%d results found, use up and down arrow keys to navigate.",Z.length),Z.length):(0,i.__)("No results.");(0,d.speak)(t,"polite")}}),[Z,F]),(0,o.createElement)(T,{onFocusOutside:()=>{O(!1)}},(0,o.createElement)(E.Z,{className:s()(b,"components-combobox-control"),tabIndex:"-1",label:n,id:`components-form-token-input-${S}`,hideLabelFromVision:h,help:g},(0,o.createElement)("div",{className:"components-combobox-control__suggestions-container",tabIndex:"-1",onKeyDown:e=>{let t=!1;switch(e.keyCode){case c.ENTER:N&&(q(N),t=!0);break;case c.UP:W(-1),t=!0;break;case c.DOWN:W(1),t=!0;break;case c.ESCAPE:O(!1),L(null),t=!0,e.stopPropagation()}t&&e.preventDefault()}},(0,o.createElement)(k.Z,null,(0,o.createElement)(I,null,(0,o.createElement)(m,{className:"components-combobox-control__input",instanceId:S,ref:B,value:F?P:M,"aria-label":M?`${M}, ${n}`:null,onFocus:()=>{R(!0),O(!0),f(""),D("")},onBlur:()=>{R(!1)},isExpanded:F,selectedSuggestionIndex:Z.indexOf(N),onChange:e=>{const t=e.value;D(t),f(t),x&&O(!0)}})),v&&(0,o.createElement)(A.Z,null,(0,o.createElement)(y.Z,{className:"components-combobox-control__reset",icon:p,disabled:!t,onClick:()=>{u(null),B.current.input.focus()},label:(0,i.__)("Reset")}))),F&&(0,o.createElement)(w,{instanceId:S,match:{label:P},displayTransform:e=>e.label,suggestions:Z,selectedIndex:Z.indexOf(N),onHover:L,onSelect:q,scrollIntoView:!0}))))};var L=n(3554),F=n(7884),O=n(9818),x=n(4801);n(5821);const R=(0,l.withInstanceId)((({id:e,className:t,label:n,onChange:r,options:l,value:a,required:c=!1,errorMessage:d=(0,i.__)("Please select a value.","woo-gutenberg-products-block"),errorId:u,instanceId:p="0",autoComplete:f="off"})=>{const h=(0,o.useRef)(null),m=e||"control-"+p,g=u||m,{setValidationErrors:v,clearValidationError:b}=(0,O.useDispatch)(x.VALIDATION_STORE_KEY),w=(0,O.useSelect)((e=>e(x.VALIDATION_STORE_KEY).getValidationError(g)));return(0,o.useEffect)((()=>(!c||a?b(g):v({[g]:{message:d,hidden:!0}}),()=>{b(g)})),[b,a,g,d,c,v]),(0,o.createElement)("div",{id:m,className:s()("wc-block-components-combobox",t,{"is-active":a,"has-error":(null==w?void 0:w.message)&&!(null!=w&&w.hidden)}),ref:h},(0,o.createElement)(N,{className:"wc-block-components-combobox-control",label:n,onChange:r,onFilterValueChange:e=>{if(e.length){const t=(0,F.Kn)(h.current)?h.current.ownerDocument.activeElement:void 0;if(t&&(0,F.Kn)(h.current)&&h.current.contains(t))return;const n=e.toLocaleUpperCase(),o=l.find((e=>e.label.toLocaleUpperCase().startsWith(n)||e.value.toLocaleUpperCase()===n));o&&r(o.value)}},options:l,value:a||"",allowReset:!1,autoComplete:f,"aria-invalid":(null==w?void 0:w.message)&&!(null!=w&&w.hidden)}),(0,o.createElement)(L.ValidationInputError,{propertyName:g}))}))},6484:(e,t,n)=>{"use strict";n.d(t,{eQ:()=>u,he:()=>p});var o=n(9307),r=n(5736),s=n(2629),i=n(4184),l=n.n(i),a=n(5378);n(7775);const c=({className:e,countries:t,id:n,label:i,onChange:c,value:d="",autoComplete:u="off",required:p=!1,errorId:f,errorMessage:h=(0,r.__)("Please select a country","woo-gutenberg-products-block")})=>{const m=(0,o.useMemo)((()=>Object.entries(t).map((([e,t])=>({value:e,label:(0,s.decodeEntities)(t)})))),[t]);return(0,o.createElement)("div",{className:l()(e,"wc-block-components-country-input")},(0,o.createElement)(a.Z,{id:n,label:i,onChange:c,options:m,value:d,errorId:f,errorMessage:h,required:p,autoComplete:u}))};var d=n(5271);const u=e=>(0,o.createElement)(c,{countries:d.DK,...e}),p=e=>(0,o.createElement)(c,{countries:d.mO,...e})},6938:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var o=n(9307),r=n(5904),s=n(9196);const i=["BUTTON","FIELDSET","INPUT","OPTGROUP","OPTION","SELECT","TEXTAREA","A"],l=({children:e,style:t={},...n})=>{const l=(0,o.useRef)(null),a=()=>{l.current&&r.focus.focusable.find(l.current).forEach((e=>{i.includes(e.nodeName)&&e.setAttribute("tabindex","-1"),e.hasAttribute("contenteditable")&&e.setAttribute("contenteditable","false")}))},c=function(e,t,n){var o=this,r=(0,s.useRef)(null),i=(0,s.useRef)(0),l=(0,s.useRef)(null),a=(0,s.useRef)([]),c=(0,s.useRef)(),d=(0,s.useRef)(),u=(0,s.useRef)(e),p=(0,s.useRef)(!0);(0,s.useEffect)((function(){u.current=e}),[e]);var f=!t&&0!==t&&"undefined"!=typeof window;if("function"!=typeof e)throw new TypeError("Expected a function");t=+t||0;var h=!!(n=n||{}).leading,m=!("trailing"in n)||!!n.trailing,g="maxWait"in n,v=g?Math.max(+n.maxWait||0,t):null;(0,s.useEffect)((function(){return p.current=!0,function(){p.current=!1}}),[]);var b=(0,s.useMemo)((function(){var e=function(e){var t=a.current,n=c.current;return a.current=c.current=null,i.current=e,d.current=u.current.apply(n,t)},n=function(e,t){f&&cancelAnimationFrame(l.current),l.current=f?requestAnimationFrame(e):setTimeout(e,t)},s=function(e){if(!p.current)return!1;var n=e-r.current;return!r.current||n>=t||n<0||g&&e-i.current>=v},b=function(t){return l.current=null,m&&a.current?e(t):(a.current=c.current=null,d.current)},w=function e(){var o=Date.now();if(s(o))return b(o);if(p.current){var l=t-(o-r.current),a=g?Math.min(l,v-(o-i.current)):l;n(e,a)}},E=function(){var u=Date.now(),f=s(u);if(a.current=[].slice.call(arguments),c.current=o,r.current=u,f){if(!l.current&&p.current)return i.current=r.current,n(w,t),h?e(r.current):d.current;if(g)return n(w,t),e(r.current)}return l.current||n(w,t),d.current};return E.cancel=function(){l.current&&(f?cancelAnimationFrame(l.current):clearTimeout(l.current)),i.current=0,a.current=r.current=c.current=l.current=null},E.isPending=function(){return!!l.current},E.flush=function(){return l.current?b(Date.now()):d.current},E}),[h,g,t,v,m,f]);return b}(a,0,{leading:!0});return(0,o.useLayoutEffect)((()=>{let e;return a(),l.current&&(e=new window.MutationObserver(c),e.observe(l.current,{childList:!0,attributes:!0,subtree:!0})),()=>{e&&e.disconnect(),c.cancel()}}),[c]),(0,o.createElement)("div",{ref:l,"aria-disabled":"true",style:{userSelect:"none",pointerEvents:"none",cursor:"normal",...t},...n},e)}},7350:(e,t,n)=>{"use strict";n.d(t,{IG:()=>f,dI:()=>h});var o=n(9307),r=n(5736),s=n(2629),i=n(4184),l=n.n(i),a=n(3554),c=n(5378);n(8410);const d=(e,t)=>{const n=t.find((t=>t.label.toLocaleUpperCase()===e.toLocaleUpperCase()||t.value.toLocaleUpperCase()===e.toLocaleUpperCase()));return n?n.value:""},u=({className:e,id:t,states:n,country:i,label:u,onChange:p,autoComplete:f="off",value:h="",required:m=!1,errorId:g=""})=>{const v=n[i],b=(0,o.useMemo)((()=>v?Object.keys(v).map((e=>({value:e,label:(0,s.decodeEntities)(v[e])}))):[]),[v]),w=(0,o.useCallback)((e=>{const t=b.length>0?d(e,b):e;t!==h&&p(t)}),[p,b,h]),E=(0,o.useRef)(h);return(0,o.useEffect)((()=>{E.current!==h&&(E.current=h)}),[h]),(0,o.useEffect)((()=>{if(b.length>0&&E.current){const e=d(E.current,b);e!==E.current&&w(e)}}),[b,w]),b.length>0?(0,o.createElement)(c.Z,{className:l()(e,"wc-block-components-state-input"),id:t,label:u,onChange:w,options:b,value:h,errorMessage:(0,r.__)("Please select a state.","woo-gutenberg-products-block"),errorId:g,required:m,autoComplete:f}):(0,o.createElement)(a.ValidatedTextInput,{className:e,id:t,label:u,onChange:w,autoComplete:f,value:h,required:m})};var p=n(5271);const f=e=>(0,o.createElement)(u,{states:p.JJ,...e}),h=e=>(0,o.createElement)(u,{states:p.nm,...e})},7914:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var o=n(9307),r=n(4184),s=n.n(r);n(5198);const i=({children:e,className:t,headingLevel:n,...r})=>{const i=s()("wc-block-components-title",t),l=`h${n}`;return(0,o.createElement)(l,{className:i,...r},e)}},7277:(e,t,n)=>{"use strict";n.d(t,{B:()=>c});var o=n(4617),r=n(9307),s=n(9818),i=n(4801),l=n(7844),a=n(5027);const c=()=>{const{needsShipping:e}=(0,a.V)(),{useShippingAsBilling:t,prefersCollection:n}=(0,s.useSelect)((e=>({useShippingAsBilling:e(i.CHECKOUT_STORE_KEY).getUseShippingAsBilling(),prefersCollection:e(i.CHECKOUT_STORE_KEY).prefersCollection()}))),{__internalSetUseShippingAsBilling:c}=(0,s.useDispatch)(i.CHECKOUT_STORE_KEY),{billingAddress:d,setBillingAddress:u,shippingAddress:p,setShippingAddress:f}=(0,l.L)(),h=(0,r.useCallback)((e=>{u({email:e})}),[u]),m=(0,r.useCallback)((e=>{u({phone:e})}),[u]),g=(0,r.useCallback)((e=>{f({phone:e})}),[f]),v=(0,o.getSetting)("forcedBillingAddress",!1);return{shippingAddress:p,billingAddress:d,setShippingAddress:f,setBillingAddress:u,setEmail:h,setBillingPhone:m,setShippingPhone:g,defaultAddressFields:o.defaultAddressFields,useShippingAsBilling:t,setUseShippingAsBilling:c,needsShipping:e,showShippingFields:!v&&e&&!n,showShippingMethods:e&&!n,showBillingFields:!e||!t||n,forcedBillingAddress:v,useBillingAsShipping:v||n}}},7844:(e,t,n)=>{"use strict";n.d(t,{L:()=>s});var o=n(9818),r=n(4801);const s=()=>{const{customerData:e,isInitialized:t}=(0,o.useSelect)((e=>{const t=e(r.CART_STORE_KEY);return{customerData:t.getCustomerData(),isInitialized:t.hasFinishedResolution("getCartData")}})),{setShippingAddress:n,setBillingAddress:s}=(0,o.useDispatch)(r.CART_STORE_KEY);return{isInitialized:t,billingAddress:e.billingAddress,shippingAddress:e.shippingAddress,setBillingAddress:s,setShippingAddress:n}}},9075:(e,t,n)=>{"use strict";n.d(t,{s:()=>i});var o=n(9307),r=n(9127),s=n.n(r);function i(e){const t=(0,o.useRef)(e);return s()(e,t.current)||(t.current=e),t.current}},1106:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var o=n(9307),r=n(5736),s=n(5271);n(5362);const i=({address:e,onEdit:t,target:n})=>(0,o.createElement)("div",{className:"wc-block-components-address-card"},(0,o.createElement)("address",null,(0,o.createElement)("span",{className:"wc-block-components-address-card__address-section"},e.first_name+" "+e.last_name),(0,o.createElement)("div",{className:"wc-block-components-address-card__address-section"},[e.address_1,e.address_2,e.city,e.state,e.postcode,s.DK[e.country]?s.DK[e.country]:e.country].filter((e=>!!e)).map(((e,t)=>(0,o.createElement)("span",{key:"address-"+t},e)))),e.phone?(0,o.createElement)("div",{key:"address-phone",className:"wc-block-components-address-card__address-section"},e.phone):""),t&&(0,o.createElement)("a",{role:"button",href:"#"+n,className:"wc-block-components-address-card__edit","aria-label":(0,r.__)("Edit address","woo-gutenberg-products-block"),onClick:e=>{t(),e.preventDefault()}},(0,r.__)("Edit","woo-gutenberg-products-block")))},4660:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var o=n(9307),r=n(4184),s=n.n(r);n(1741);const i=({isEditing:e=!1,addressCard:t,addressForm:n})=>{const r=s()("wc-block-components-address-address-wrapper",{"is-editing":e});return(0,o.createElement)("div",{className:r},(0,o.createElement)("div",{className:"wc-block-components-address-card-wrapper"},t()),(0,o.createElement)("div",{className:"wc-block-components-address-form-wrapper"},n()))}},9490:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});var o=n(5736);const r=({defaultTitle:e=(0,o.__)("Step","woo-gutenberg-products-block"),defaultDescription:t=(0,o.__)("Step description text.","woo-gutenberg-products-block"),defaultShowStepNumber:n=!0})=>({title:{type:"string",default:e},description:{type:"string",default:t},showStepNumber:{type:"boolean",default:n}})},1946:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>I});var o=n(9307),r=n(4184),s=n.n(r),i=n(721),l=n(30),a=n(7277),c=n(9818),d=n(4801),u=n(5736),p=n(3298),f=n(8832),h=n(6423),m=n(3554),g=n(6938),v=n(9055),b=n(5918),w=n(4660),E=n(3112),y=n(1106);const k=({addressFieldsConfig:e,showPhoneField:t,requirePhoneField:n})=>{const{defaultAddressFields:r,shippingAddress:s,setShippingAddress:i,setBillingAddress:l,setShippingPhone:u,useShippingAsBilling:p}=(0,a.B)(),{dispatchCheckoutEvent:f}=(0,b.n)(),h=!(!s.address_1||!s.first_name&&!s.last_name),[m,g]=(0,o.useState)(!h),{hasValidationErrors:k,invalidProps:_}=(0,c.useSelect)((e=>{const t=e(d.VALIDATION_STORE_KEY);return{hasValidationErrors:t.hasValidationErrors(),invalidProps:Object.keys(s).filter((e=>void 0!==t.getValidationError("shipping_"+e))).filter(Boolean)}}));(0,o.useEffect)((()=>{_.length>0&&!1===m&&g(!0)}),[m,k,_.length]);const C=Object.keys(r),S=(0,o.useCallback)((e=>{if(i(e),p){const{...n}=e;t||delete n.phone,l(n),f("set-billing-address")}f("set-shipping-address")}),[f,l,i,p,t]),I=(0,o.useCallback)((()=>(0,o.createElement)(y.Z,{address:s,target:"shipping",onEdit:()=>{g(!0)}})),[s]),A=(0,o.useCallback)((()=>(0,o.createElement)(o.Fragment,null,(0,o.createElement)(v.k,{id:"shipping",type:"shipping",onChange:S,values:s,fields:C,fieldConfig:e}),t&&(0,o.createElement)(E.Z,{id:"shipping-phone",errorId:"shipping_phone",isRequired:n,value:s.phone,onChange:e=>{u(e),f("set-phone-number",{step:"shipping"})}}))),[C,e,f,S,n,u,s,t]);return(0,o.createElement)(w.Z,{isEditing:m,addressCard:I,addressForm:A})},_=({showCompanyField:e=!1,showApartmentField:t=!1,showPhoneField:n=!1,requireCompanyField:r=!1,requirePhoneField:s=!1})=>{const{setBillingAddress:i,shippingAddress:l,useShippingAsBilling:c,setUseShippingAsBilling:d}=(0,a.B)(),{isEditor:v}=(0,f._)(),b=()=>{const t={...l};n||delete t.phone,e&&delete t.company,i(t)};(0,p.qR)((()=>{c&&b()}));const w=(0,o.useMemo)((()=>({company:{hidden:!e,required:r},address_2:{hidden:!t}})),[e,r,t]),E=v?g.Z:o.Fragment,y=c?[h.n7.SHIPPING_ADDRESS,h.n7.BILLING_ADDRESS]:[h.n7.SHIPPING_ADDRESS],_=!(!l.address_1||!l.first_name&&!l.last_name);return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(m.StoreNoticesContainer,{context:y}),(0,o.createElement)(E,null,(0,o.createElement)(k,{addressFieldsConfig:w,showPhoneField:n,requirePhoneField:s})),_&&(0,o.createElement)(m.CheckboxControl,{className:"wc-block-checkout__use-address-for-billing",label:(0,u.__)("Use same address for billing","woo-gutenberg-products-block"),checked:c,onChange:e=>{d(e),e&&b()}}))},C={...(0,n(9490).Z)({defaultTitle:(0,u.__)("Shipping address","woo-gutenberg-products-block"),defaultDescription:(0,u.__)("Enter the address where you want your order delivered.","woo-gutenberg-products-block")}),className:{type:"string",default:""},lock:{type:"object",default:{move:!0,remove:!0}}};var S=n(1141);const I=(0,i.withFilteredAttributes)(C)((({title:e,description:t,showStepNumber:n,children:r,className:i})=>{const u=(0,c.useSelect)((e=>e(d.CHECKOUT_STORE_KEY).isProcessing())),{showShippingFields:p}=(0,a.B)(),{requireCompanyField:f,requirePhoneField:h,showApartmentField:m,showCompanyField:g,showPhoneField:v}=(0,S.s4)();return p?(0,o.createElement)(l.Z,{id:"shipping-fields",disabled:u,className:s()("wc-block-checkout__shipping-fields",i),title:e,description:t,showStepNumber:n},(0,o.createElement)(_,{requireCompanyField:f,requirePhoneField:h,showApartmentField:m,showCompanyField:g,showPhoneField:v}),r):null}))},3112:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var o=n(9307),r=n(5736),s=n(3554);const i=({id:e="phone",errorId:t="phone",isRequired:n=!1,value:i="",onChange:l})=>(0,o.createElement)(s.ValidatedTextInput,{id:e,errorId:t,type:"tel",autoComplete:"tel",required:n,label:n?(0,r.__)("Phone","woo-gutenberg-products-block"):(0,r.__)("Phone (optional)","woo-gutenberg-products-block"),value:i,onChange:l})},9010:(e,t,n)=>{"use strict";var o=n(4657);e.exports=function(e,t,n){n=n||{},9===t.nodeType&&(t=o.getWindow(t));var r=n.allowHorizontalScroll,s=n.onlyScrollIfNeeded,i=n.alignWithTop,l=n.alignWithLeft,a=n.offsetTop||0,c=n.offsetLeft||0,d=n.offsetBottom||0,u=n.offsetRight||0;r=void 0===r||r;var p=o.isWindow(t),f=o.offset(e),h=o.outerHeight(e),m=o.outerWidth(e),g=void 0,v=void 0,b=void 0,w=void 0,E=void 0,y=void 0,k=void 0,_=void 0,C=void 0,S=void 0;p?(k=t,S=o.height(k),C=o.width(k),_={left:o.scrollLeft(k),top:o.scrollTop(k)},E={left:f.left-_.left-c,top:f.top-_.top-a},y={left:f.left+m-(_.left+C)+u,top:f.top+h-(_.top+S)+d},w=_):(g=o.offset(t),v=t.clientHeight,b=t.clientWidth,w={left:t.scrollLeft,top:t.scrollTop},E={left:f.left-(g.left+(parseFloat(o.css(t,"borderLeftWidth"))||0))-c,top:f.top-(g.top+(parseFloat(o.css(t,"borderTopWidth"))||0))-a},y={left:f.left+m-(g.left+b+(parseFloat(o.css(t,"borderRightWidth"))||0))+u,top:f.top+h-(g.top+v+(parseFloat(o.css(t,"borderBottomWidth"))||0))+d}),E.top<0||y.top>0?!0===i?o.scrollTop(t,w.top+E.top):!1===i?o.scrollTop(t,w.top+y.top):E.top<0?o.scrollTop(t,w.top+E.top):o.scrollTop(t,w.top+y.top):s||((i=void 0===i||!!i)?o.scrollTop(t,w.top+E.top):o.scrollTop(t,w.top+y.top)),r&&(E.left<0||y.left>0?!0===l?o.scrollLeft(t,w.left+E.left):!1===l?o.scrollLeft(t,w.left+y.left):E.left<0?o.scrollLeft(t,w.left+E.left):o.scrollLeft(t,w.left+y.left):s||((l=void 0===l||!!l)?o.scrollLeft(t,w.left+E.left):o.scrollLeft(t,w.left+y.left)))}},4979:(e,t,n)=>{"use strict";e.exports=n(9010)},4657:e=>{"use strict";var t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function o(e,t){var n=e["page"+(t?"Y":"X")+"Offset"],o="scroll"+(t?"Top":"Left");if("number"!=typeof n){var r=e.document;"number"!=typeof(n=r.documentElement[o])&&(n=r.body[o])}return n}function r(e){return o(e)}function s(e){return o(e,!0)}function i(e){var t=function(e){var t,n=void 0,o=void 0,r=e.ownerDocument,s=r.body,i=r&&r.documentElement;return n=(t=e.getBoundingClientRect()).left,o=t.top,{left:n-=i.clientLeft||s.clientLeft||0,top:o-=i.clientTop||s.clientTop||0}}(e),n=e.ownerDocument,o=n.defaultView||n.parentWindow;return t.left+=r(o),t.top+=s(o),t}var l=new RegExp("^("+/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source+")(?!px)[a-z%]+$","i"),a=/^(top|right|bottom|left)$/,c="currentStyle",d="runtimeStyle",u="left",p=void 0;function f(e,t){for(var n=0;n<e.length;n++)t(e[n])}function h(e){return"border-box"===p(e,"boxSizing")}"undefined"!=typeof window&&(p=window.getComputedStyle?function(e,t,n){var o="",r=e.ownerDocument,s=n||r.defaultView.getComputedStyle(e,null);return s&&(o=s.getPropertyValue(t)||s[t]),o}:function(e,t){var n=e[c]&&e[c][t];if(l.test(n)&&!a.test(t)){var o=e.style,r=o[u],s=e[d][u];e[d][u]=e[c][u],o[u]="fontSize"===t?"1em":n||0,n=o.pixelLeft+"px",o[u]=r,e[d][u]=s}return""===n?"auto":n});var m=["margin","border","padding"],g=-1,v=2,b=1;function w(e,t,n){var o=0,r=void 0,s=void 0,i=void 0;for(s=0;s<t.length;s++)if(r=t[s])for(i=0;i<n.length;i++){var l;l="border"===r?r+n[i]+"Width":r+n[i],o+=parseFloat(p(e,l))||0}return o}function E(e){return null!=e&&e==e.window}var y={};function k(e,t,n){if(E(e))return"width"===t?y.viewportWidth(e):y.viewportHeight(e);if(9===e.nodeType)return"width"===t?y.docWidth(e):y.docHeight(e);var o="width"===t?["Left","Right"]:["Top","Bottom"],r="width"===t?e.offsetWidth:e.offsetHeight,s=(p(e),h(e)),i=0;(null==r||r<=0)&&(r=void 0,(null==(i=p(e,t))||Number(i)<0)&&(i=e.style[t]||0),i=parseFloat(i)||0),void 0===n&&(n=s?b:g);var l=void 0!==r||s,a=r||i;if(n===g)return l?a-w(e,["border","padding"],o):i;if(l){var c=n===v?-w(e,["border"],o):w(e,["margin"],o);return a+(n===b?0:c)}return i+w(e,m.slice(n),o)}f(["Width","Height"],(function(e){y["doc"+e]=function(t){var n=t.document;return Math.max(n.documentElement["scroll"+e],n.body["scroll"+e],y["viewport"+e](n))},y["viewport"+e]=function(t){var n="client"+e,o=t.document,r=o.body,s=o.documentElement[n];return"CSS1Compat"===o.compatMode&&s||r&&r[n]||s}}));var _={position:"absolute",visibility:"hidden",display:"block"};function C(e){var t=void 0,n=arguments;return 0!==e.offsetWidth?t=k.apply(void 0,n):function(e,o,r){var s={},i=e.style,l=void 0;for(l in o)o.hasOwnProperty(l)&&(s[l]=i[l],i[l]=o[l]);for(l in function(){t=k.apply(void 0,n)}.call(e),o)o.hasOwnProperty(l)&&(i[l]=s[l])}(e,_),t}function S(e,t,o){var r=o;if("object"!==(void 0===t?"undefined":n(t)))return void 0!==r?("number"==typeof r&&(r+="px"),void(e.style[t]=r)):p(e,t);for(var s in t)t.hasOwnProperty(s)&&S(e,s,t[s])}f(["width","height"],(function(e){var t=e.charAt(0).toUpperCase()+e.slice(1);y["outer"+t]=function(t,n){return t&&C(t,e,n?0:b)};var n="width"===e?["Left","Right"]:["Top","Bottom"];y[e]=function(t,o){return void 0===o?t&&C(t,e,g):t?(p(t),h(t)&&(o+=w(t,["padding","border"],n)),S(t,e,o)):void 0}})),e.exports=t({getWindow:function(e){var t=e.ownerDocument||e;return t.defaultView||t.parentWindow},offset:function(e,t){if(void 0===t)return i(e);!function(e,t){"static"===S(e,"position")&&(e.style.position="relative");var n=i(e),o={},r=void 0,s=void 0;for(s in t)t.hasOwnProperty(s)&&(r=parseFloat(S(e,s))||0,o[s]=r+t[s]-n[s]);S(e,o)}(e,t)},isWindow:E,each:f,css:S,clone:function(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);if(e.overflow)for(var n in e)e.hasOwnProperty(n)&&(t.overflow[n]=e.overflow[n]);return t},scrollLeft:function(e,t){if(E(e)){if(void 0===t)return r(e);window.scrollTo(t,s(e))}else{if(void 0===t)return e.scrollLeft;e.scrollLeft=t}},scrollTop:function(e,t){if(E(e)){if(void 0===t)return s(e);window.scrollTo(r(e),t)}else{if(void 0===t)return e.scrollTop;e.scrollTop=t}},viewportWidth:0,viewportHeight:0},y)},7424:()=>{},5821:()=>{},7775:()=>{},8410:()=>{},5198:()=>{},5362:()=>{},1741:()=>{},3298:(e,t,n)=>{"use strict";n.d(t,{qR:()=>r});var o=n(9196);const r=function(e){(0,o.useEffect)(e,[])};"undefined"!=typeof window?o.useLayoutEffect:o.useEffect},3620:(e,t,n)=>{"use strict";n.d(t,{Iq:()=>l});var o=n(2819),r=n(9307),s=(n(2560),n(1765)),i=n(1282);function l(e,t,n={}){const{memo:l=!1}=n;let a=(0,r.forwardRef)(e);l&&(a=(0,r.memo)(a)),void 0===t&&"undefined"!=typeof process&&process.env;let c=a[s.rE]||[t];return Array.isArray(t)&&(c=[...c,...t]),"string"==typeof t&&(c=[...c,t]),a.displayName=t,a[s.rE]=(0,o.uniq)(c),a.selector=`.${(0,i.l)(t)}`,a}}}]);