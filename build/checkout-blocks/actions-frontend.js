(self.webpackChunkwebpackWcBlocksJsonp=self.webpackChunkwebpackWcBlocksJsonp||[]).push([[9644],{8184:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(9196),o=n(444);const i=(0,r.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,r.createElement)(o.Path,{d:"M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"}))},4877:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var r=n(9196),o=n(9685),i=n(4184),s=n.n(i),c=(n(5482),n(4705));const l=({className:e,showSpinner:t=!1,children:n,variant:i="contained",...l})=>{const a=s()("wc-block-components-button","wp-element-button",e,i,{"wc-block-components-button--loading":t});return(0,r.createElement)(o.Z,{className:a,...l},t&&(0,r.createElement)(c.Z,null),(0,r.createElement)("span",{className:"wc-block-components-button__text"},n))}},9576:(e,t,n)=>{"use strict";n.d(t,{E:()=>l,X:()=>a});var r=n(9075),o=n(4613),i=n(9818),s=n(4801);const c=(e=!1)=>{const{paymentMethodsInitialized:t,expressPaymentMethodsInitialized:n,availablePaymentMethods:c,availableExpressPaymentMethods:l}=(0,i.useSelect)((e=>{const t=e(s.PAYMENT_STORE_KEY);return{paymentMethodsInitialized:t.paymentMethodsInitialized(),expressPaymentMethodsInitialized:t.expressPaymentMethodsInitialized(),availableExpressPaymentMethods:t.getAvailableExpressPaymentMethods(),availablePaymentMethods:t.getAvailablePaymentMethods()}})),a=Object.values(c).map((({name:e})=>e)),u=Object.values(l).map((({name:e})=>e)),d=(0,o.getPaymentMethods)(),p=(0,o.getExpressPaymentMethods)(),m=Object.keys(d).reduce(((e,t)=>(a.includes(t)&&(e[t]=d[t]),e)),{}),f=Object.keys(p).reduce(((e,t)=>(u.includes(t)&&(e[t]=p[t]),e)),{}),h=(0,r.s)(m),g=(0,r.s)(f);return{paymentMethods:e?g:h,isInitialized:e?n:t}},l=()=>c(!1),a=()=>c(!0)},5390:(e,t,n)=>{"use strict";n.d(t,{P:()=>c});var r=n(4801),o=n(9818),i=n(5999),s=n(9576);const c=()=>{const{isCalculating:e,isBeforeProcessing:t,isProcessing:n,isAfterProcessing:c,isComplete:l,hasError:a}=(0,o.useSelect)((e=>{const t=e(r.CHECKOUT_STORE_KEY);return{isCalculating:t.isCalculating(),isBeforeProcessing:t.isBeforeProcessing(),isProcessing:t.isProcessing(),isAfterProcessing:t.isAfterProcessing(),isComplete:t.isComplete(),hasError:t.hasError()}})),{activePaymentMethod:u,isExpressPaymentMethodActive:d}=(0,o.useSelect)((e=>{const t=e(r.PAYMENT_STORE_KEY);return{activePaymentMethod:t.getActivePaymentMethod(),isExpressPaymentMethodActive:t.isExpressPaymentMethodActive()}})),{onSubmit:p}=(0,i.U)(),{paymentMethods:m={}}=(0,s.E)(),f=n||c||t,h=l&&!a;return{paymentMethodButtonLabel:(m[u]||{}).placeOrderButtonLabel,onSubmit:p,isCalculating:e,isDisabled:n||d,waitingForProcessing:f,waitingForRedirect:h}}},9075:(e,t,n)=>{"use strict";n.d(t,{s:()=>s});var r=n(9307),o=n(9127),i=n.n(o);function s(e){const t=(0,r.useRef)(e);return i()(e,t.current)||(t.current=e),t.current}},3358:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>C});var r=n(721),o=n(9196),i=n(4184),s=n.n(i),c=n(4617),l=n(5736),a=n(5271),u=n(1984),d=n(444);const p=(0,o.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(d.Path,{d:"M20 11.2H6.8l3.7-3.7-1-1L3.9 12l5.6 5.5 1-1-3.7-3.7H20z"}));n(6701);const m=({link:e})=>{const t=e||a.fh;return t?(0,o.createElement)("a",{href:t,className:"wc-block-components-checkout-return-to-cart-button"},(0,o.createElement)(u.Z,{icon:p}),(0,l.__)("Return to Cart","woo-gutenberg-products-block")):null};var f=n(5390),h=n(8184),g=n(4877);const v=({label:e,fullWidth:t=!1})=>{const{onSubmit:n,isCalculating:r,isDisabled:i,waitingForProcessing:c,waitingForRedirect:l}=(0,f.P)();return(0,o.createElement)(g.Z,{className:s()("wc-block-components-checkout-place-order-button",{"wc-block-components-checkout-place-order-button--full-width":t}),onClick:n,disabled:r||i||c||l,showSpinner:c},l?(0,o.createElement)(u.Z,{icon:h.Z}):e)};var b=n(6423),w=n(711),E=n(3554);const y=(0,l.__)("Place Order","woo-gutenberg-products-block");n(1337);const S={cartPageId:{type:"number",default:0},showReturnToCart:{type:"boolean",default:!0},className:{type:"string",default:""},lock:{type:"object",default:{move:!0,remove:!0}},placeOrderButtonLabel:{type:"string",default:y}},C=(0,r.withFilteredAttributes)(S)((({cartPageId:e,showReturnToCart:t,className:n,placeOrderButtonLabel:r})=>{const{paymentMethodButtonLabel:i}=(0,f.P)(),l=(0,E.applyCheckoutFilter)({filterName:"placeOrderButtonLabel",defaultValue:i||r||y});return(0,o.createElement)("div",{className:s()("wc-block-checkout__actions",n)},(0,o.createElement)(w.StoreNoticesContainer,{context:b.n7.CHECKOUT_ACTIONS}),(0,o.createElement)("div",{className:"wc-block-checkout__actions_row"},t&&(0,o.createElement)(m,{link:(0,c.getSetting)("page-"+e,!1)}),(0,o.createElement)(v,{label:l,fullWidth:!t})))}))},4705:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(9196);n(129);const o=()=>(0,r.createElement)("span",{className:"wc-block-components-spinner","aria-hidden":"true"})},5482:()=>{},6701:()=>{},1337:()=>{},129:()=>{},2444:(e,t,n)=>{"use strict";n.d(t,{T:()=>s});var r=n(4184),o=n.n(r);function i(e){return"appear"===e?"top":"left"}function s(e){if("loading"===e.type)return o()("components-animate__loading");const{type:t,origin:n=i(t)}=e;if("appear"===t){const[e,t="center"]=n.split(" ");return o()("components-animate__appear",{["is-from-"+t]:"center"!==t,["is-from-"+e]:"middle"!==e})}return"slide-in"===t?o()("components-animate__slide-in","is-from-"+n):void 0}},9685:(e,t,n)=>{"use strict";n.d(t,{Z:()=>f});var r=n(7462),o=n(9307),i=n(4184),s=n.n(i),c=n(2819),l=n(7180),a=n.n(l),u=n(9178),d=n(7392),p=n(7593);const m=["onMouseDown","onClick"],f=(0,o.forwardRef)((function(e,t){const{href:n,target:i,isSmall:l,isPressed:f,isBusy:h,isDestructive:g,className:v,disabled:b,icon:w,iconPosition:E="left",iconSize:y,showTooltip:S,tooltipPosition:C,shortcut:P,label:x,children:Z,text:M,variant:k,__experimentalIsFocusable:L,describedBy:R,..._}=function({isDefault:e,isPrimary:t,isSecondary:n,isTertiary:r,isLink:o,variant:i,...s}){let c=i;var l,u,d,p,m;return t&&(null!==(l=c)&&void 0!==l||(c="primary")),r&&(null!==(u=c)&&void 0!==u||(c="tertiary")),n&&(null!==(d=c)&&void 0!==d||(c="secondary")),e&&(a()("Button isDefault prop",{since:"5.4",alternative:'variant="secondary"'}),null!==(p=c)&&void 0!==p||(c="secondary")),o&&(null!==(m=c)&&void 0!==m||(c="link")),{...s,variant:c}}(e),F=s()("components-button",v,{"is-secondary":"secondary"===k,"is-primary":"primary"===k,"is-small":l,"is-tertiary":"tertiary"===k,"is-pressed":f,"is-busy":h,"is-link":"link"===k,"is-destructive":g,"has-text":!!w&&!!Z,"has-icon":!!w}),N=b&&!L,O=void 0===n||N?"button":"a",B="a"===O?{href:n,target:i}:{type:"button",disabled:N,"aria-pressed":f};if(b&&L){B["aria-disabled"]=!0;for(const e of m)_[e]=e=>{e.stopPropagation(),e.preventDefault()}}const T=!N&&(S&&x||P||!!x&&(!Z||(0,c.isArray)(Z)&&!Z.length)&&!1!==S),A=R?(0,c.uniqueId)():null,D=_["aria-describedby"]||A,W=(0,o.createElement)(O,(0,r.Z)({},B,_,{className:F,"aria-label":_["aria-label"]||x,"aria-describedby":D,ref:t}),w&&"left"===E&&(0,o.createElement)(d.Z,{icon:w,size:y}),M&&(0,o.createElement)(o.Fragment,null,M),w&&"right"===E&&(0,o.createElement)(d.Z,{icon:w,size:y}),Z);return T?(0,o.createElement)(o.Fragment,null,(0,o.createElement)(u.Z,{text:R||x,shortcut:P,position:C},W),R&&(0,o.createElement)(p.Z,null,(0,o.createElement)("span",{id:A},R))):(0,o.createElement)(o.Fragment,null,W,R&&(0,o.createElement)(p.Z,null,(0,o.createElement)("span",{id:A},R)))}))},6658:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(7462),o=n(9307);const i=function({icon:e,className:t,...n}){const i=["dashicon","dashicons","dashicons-"+e,t].filter(Boolean).join(" ");return(0,o.createElement)("span",(0,r.Z)({className:i},n))}},7392:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var r=n(7462),o=n(9307),i=n(444),s=n(6658);const c=function({icon:e=null,size:t=24,...n}){if("string"==typeof e)return(0,o.createElement)(s.Z,(0,r.Z)({icon:e},n));if((0,o.isValidElement)(e)&&s.Z===e.type)return(0,o.cloneElement)(e,{...n});if("function"==typeof e)return e.prototype instanceof o.Component?(0,o.createElement)(e,{size:t,...n}):e({size:t,...n});if(e&&("svg"===e.type||e.type===i.SVG)){const r={width:t,height:t,...e.props,...n};return(0,o.createElement)(i.SVG,r)}return(0,o.isValidElement)(e)?(0,o.cloneElement)(e,{size:t,...n}):e}},4638:(e,t,n)=>{"use strict";n.d(t,{Z:()=>P});var r=n(7462),o=n(9307),i=n(4184),s=n.n(i),c=n(5904),l=n(7180),a=n.n(l),u=n(4333),d=n(4787),p=n(4103),m=n(9685),f=n(9753),h=n(1515),g=n(6580),v=n(2444);const b="Popover";function w(e,t){const{paddingTop:n,paddingBottom:r,paddingLeft:o,paddingRight:i}=(s=t).ownerDocument.defaultView.getComputedStyle(s);var s;const c=n?parseInt(n,10):0,l=r?parseInt(r,10):0,a=o?parseInt(o,10):0,u=i?parseInt(i,10):0;return{x:e.left+a,y:e.top+c,width:e.width-a-u,height:e.height-c-l,left:e.left+a,right:e.right-u,top:e.top+c,bottom:e.bottom-l}}function E(e,t,n){n?e.getAttribute(t)!==n&&e.setAttribute(t,n):e.hasAttribute(t)&&e.removeAttribute(t)}function y(e,t,n=""){e.style[t]!==n&&(e.style[t]=n)}function S(e,t,n){n?e.classList.contains(t)||e.classList.add(t):e.classList.contains(t)&&e.classList.remove(t)}const C=(0,o.forwardRef)((({headerTitle:e,onClose:t,children:n,className:i,noArrow:l=!0,isAlternate:C,position:P="bottom right",range:x,focusOnMount:Z="firstElement",anchorRef:M,shouldAnchorIncludePadding:k,anchorRect:L,getAnchorRect:R,expandOnMobile:_,animate:F=!0,onClickOutside:N,onFocusOutside:O,__unstableStickyBoundaryElement:B,__unstableSlotName:T=b,__unstableObserveElement:A,__unstableBoundaryParent:D,__unstableForcePosition:W,__unstableForceXAlignment:H,...z},I)=>{const V=(0,o.useRef)(null),U=(0,o.useRef)(null),j=(0,o.useRef)(),G=(0,u.useViewportMatch)("medium","<"),[K,Y]=(0,o.useState)(),q=(0,h.Z)(T),J=_&&G,[X,Q]=(0,u.useResizeObserver)();l=J||l,(0,o.useLayoutEffect)((()=>{if(J)return S(j.current,"is-without-arrow",l),S(j.current,"is-alternate",C),E(j.current,"data-x-axis"),E(j.current,"data-y-axis"),y(j.current,"top"),y(j.current,"left"),y(U.current,"maxHeight"),void y(U.current,"maxWidth");const e=()=>{if(!j.current||!U.current)return;let e=function(e,t,n,r=!1,o,i){if(t)return t;if(n){if(!e.current)return;const t=n(e.current);return(0,p.cS)(t,t.ownerDocument||e.current.ownerDocument,i)}if(!1!==r){if(!(r&&window.Range&&window.Element&&window.DOMRect))return;if("function"==typeof(null==r?void 0:r.cloneRange))return(0,p.cS)((0,c.getRectangleFromRange)(r),r.endContainer.ownerDocument,i);if("function"==typeof(null==r?void 0:r.getBoundingClientRect)){const e=(0,p.cS)(r.getBoundingClientRect(),r.ownerDocument,i);return o?e:w(e,r)}const{top:e,bottom:t}=r,n=e.getBoundingClientRect(),s=t.getBoundingClientRect(),l=(0,p.cS)(new window.DOMRect(n.left,n.top,n.width,s.bottom-n.top),e.ownerDocument,i);return o?l:w(l,r)}if(!e.current)return;const{parentNode:s}=e.current,l=s.getBoundingClientRect();return o?l:w(l,s)}(V,L,R,M,k,j.current);if(!e)return;const{offsetParent:t,ownerDocument:n}=j.current;let r,o=0;if(t&&t!==n.body){const n=t.getBoundingClientRect();o=n.top,e=new window.DOMRect(e.left-n.left,e.top-n.top,e.width,e.height)}var i;D&&(r=null===(i=j.current.closest(".popover-slot"))||void 0===i?void 0:i.parentNode);const s=Q.height?Q:U.current.getBoundingClientRect(),{popoverTop:a,popoverLeft:u,xAxis:d,yAxis:m,contentHeight:f,contentWidth:h}=(0,p.sw)(e,s,P,B,j.current,o,r,W,H);"number"==typeof a&&"number"==typeof u&&(y(j.current,"top",a+"px"),y(j.current,"left",u+"px")),S(j.current,"is-without-arrow",l||"center"===d&&"middle"===m),S(j.current,"is-alternate",C),E(j.current,"data-x-axis",d),E(j.current,"data-y-axis",m),y(U.current,"maxHeight","number"==typeof f?f+"px":""),y(U.current,"maxWidth","number"==typeof h?h+"px":""),Y(({left:"right",right:"left"}[d]||"center")+" "+({top:"bottom",bottom:"top"}[m]||"middle"))};e();const{ownerDocument:t}=j.current,{defaultView:n}=t,r=n.setInterval(e,500);let o;const i=()=>{n.cancelAnimationFrame(o),o=n.requestAnimationFrame(e)};n.addEventListener("click",i),n.addEventListener("resize",e),n.addEventListener("scroll",e,!0);const s=function(e){if(e)return e.endContainer?e.endContainer.ownerDocument:e.top?e.top.ownerDocument:e.ownerDocument}(M);let a;return s&&s!==t&&(s.defaultView.addEventListener("resize",e),s.defaultView.addEventListener("scroll",e,!0)),A&&(a=new n.MutationObserver(e),a.observe(A,{attributes:!0})),()=>{n.clearInterval(r),n.removeEventListener("resize",e),n.removeEventListener("scroll",e,!0),n.removeEventListener("click",i),n.cancelAnimationFrame(o),s&&s!==t&&(s.defaultView.removeEventListener("resize",e),s.defaultView.removeEventListener("scroll",e,!0)),a&&a.disconnect()}}),[J,L,R,M,k,P,Q,B,A,D]);const $=(e,n)=>{if("focus-outside"===e&&O)O(n);else if("focus-outside"===e&&N){const e=new window.MouseEvent("click");Object.defineProperty(e,"target",{get:()=>n.relatedTarget}),a()("Popover onClickOutside prop",{since:"5.3",alternative:"onFocusOutside"}),N(e)}else t&&t()},[ee,te]=(0,u.__experimentalUseDialog)({focusOnMount:Z,__unstableOnClose:$,onClose:$}),ne=(0,u.useMergeRefs)([j,ee,I]),re=Boolean(F&&K)&&(0,v.T)({type:"appear",origin:K});let oe=(0,o.createElement)("div",(0,r.Z)({className:s()("components-popover",i,re,{"is-expanded":J,"is-without-arrow":l,"is-alternate":C})},z,{ref:ne},te,{tabIndex:"-1"}),J&&(0,o.createElement)(f.Z,null),J&&(0,o.createElement)("div",{className:"components-popover__header"},(0,o.createElement)("span",{className:"components-popover__header-title"},e),(0,o.createElement)(m.Z,{className:"components-popover__close",icon:d.Z,onClick:t})),(0,o.createElement)("div",{ref:U,className:"components-popover__content"},(0,o.createElement)("div",{style:{position:"relative"}},X,n)));return q.ref&&(oe=(0,o.createElement)(g.de,{name:T},oe)),M||L?oe:(0,o.createElement)("span",{ref:V},oe)}));C.Slot=(0,o.forwardRef)((function({name:e=b},t){return(0,o.createElement)(g.g7,{bubblesVirtually:!0,name:e,className:"popover-slot",ref:t})}));const P=C},4103:(e,t,n)=>{"use strict";n.d(t,{cS:()=>s,sw:()=>i});var r=n(5736);const o=10;function i(e,t,n="top",i,s,c,l,a,u){const[d,p="center",m]=n.split(" "),f=function(e,t,n,r,i,s,c,l){const{height:a}=t;if(i){const t=i.getBoundingClientRect().top+a-c;if(e.top<=t)return{yAxis:n,popoverTop:Math.min(e.bottom,t)}}let u=e.top+e.height/2;"bottom"===r?u=e.bottom:"top"===r&&(u=e.top);const d={popoverTop:u,contentHeight:(u-a/2>0?a/2:u)+(u+a/2>window.innerHeight?window.innerHeight-u:a/2)},p={popoverTop:e.top,contentHeight:e.top-o-a>0?a:e.top-o},m={popoverTop:e.bottom,contentHeight:e.bottom+o+a>window.innerHeight?window.innerHeight-o-e.bottom:a};let f,h=n,g=null;if(!i&&!l)if("middle"===n&&d.contentHeight===a)h="middle";else if("top"===n&&p.contentHeight===a)h="top";else if("bottom"===n&&m.contentHeight===a)h="bottom";else{h=p.contentHeight>m.contentHeight?"top":"bottom";const e="top"===h?p.contentHeight:m.contentHeight;g=e!==a?e:null}return f="middle"===h?d.popoverTop:"top"===h?p.popoverTop:m.popoverTop,{yAxis:h,popoverTop:f,contentHeight:g}}(e,t,d,m,i,0,c,a),h=function(e,t,n,o,i,s,c,l,a){const{width:u}=t;"left"===n&&(0,r.isRTL)()?n="right":"right"===n&&(0,r.isRTL)()&&(n="left"),"left"===o&&(0,r.isRTL)()?o="right":"right"===o&&(0,r.isRTL)()&&(o="left");const d=Math.round(e.left+e.width/2),p={popoverLeft:d,contentWidth:(d-u/2>0?u/2:d)+(d+u/2>window.innerWidth?window.innerWidth-d:u/2)};let m=e.left;"right"===o?m=e.right:"middle"===s||a||(m=d);let f=e.right;"left"===o?f=e.left:"middle"===s||a||(f=d);const h={popoverLeft:m,contentWidth:m-u>0?u:m},g={popoverLeft:f,contentWidth:f+u>window.innerWidth?window.innerWidth-f:u};let v,b=n,w=null;if(!i&&!l)if("center"===n&&p.contentWidth===u)b="center";else if("left"===n&&h.contentWidth===u)b="left";else if("right"===n&&g.contentWidth===u)b="right";else{b=h.contentWidth>g.contentWidth?"left":"right";const e="left"===b?h.contentWidth:g.contentWidth;u>window.innerWidth&&(w=window.innerWidth),e!==u&&(b="center",p.popoverLeft=window.innerWidth/2)}if(v="center"===b?p.popoverLeft:"left"===b?h.popoverLeft:g.popoverLeft,c){const e=c.getBoundingClientRect();v=Math.min(v,e.right-u),(0,r.isRTL)()||(v=Math.max(v,0))}return{xAxis:b,popoverLeft:v,contentWidth:w}}(e,t,p,m,i,f.yAxis,l,a,u);return{...h,...f}}function s(e,t,n){const{defaultView:r}=t,{frameElement:o}=r;if(!o||t===n.ownerDocument)return e;const i=o.getBoundingClientRect();return new r.DOMRect(e.left+i.left,e.top+i.top,e.width,e.height)}},9753:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var r=n(9307);let o=0;function i(e){const t=document.scrollingElement||document.body;e&&(o=t.scrollTop);const n=e?"add":"remove";t.classList[n]("lockscroll"),document.documentElement.classList[n]("lockscroll"),e||(t.scrollTop=o)}let s=0;function c(){return(0,r.useEffect)((()=>(0===s&&i(!0),++s,()=>{1===s&&i(!1),--s})),[]),null}},3586:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(9307),o=n(2819);const i=function({shortcut:e,className:t}){if(!e)return null;let n,i;return(0,o.isString)(e)&&(n=e),(0,o.isObject)(e)&&(n=e.display,i=e.ariaLabel),(0,r.createElement)("span",{className:t,"aria-label":i},n)}},4160:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var r=n(9307),o=n(1515);function i(){const[,e]=(0,r.useState)({}),t=(0,r.useRef)(!0);return(0,r.useEffect)((()=>()=>{t.current=!1}),[]),()=>{t.current&&e({})}}function s({name:e,children:t}){const n=(0,o.Z)(e),s=(0,r.useRef)({rerender:i()});return(0,r.useEffect)((()=>(n.registerFill(s),()=>{n.unregisterFill(s)})),[n.registerFill,n.unregisterFill]),n.ref&&n.ref.current?("function"==typeof t&&(t=t(n.fillProps)),(0,r.createPortal)(t,n.ref.current)):null}},159:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(9307);n(2560);const o=(0,r.createContext)({slots:{},fills:{},registerSlot:()=>{"undefined"!=typeof process&&process.env},updateSlot:()=>{},unregisterSlot:()=>{},registerFill:()=>{},unregisterFill:()=>{}})},9934:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var r=n(7462),o=n(9307),i=n(4333),s=n(159);const c=(0,o.forwardRef)((function({name:e,fillProps:t={},as:n="div",...c},l){const a=(0,o.useContext)(s.Z),u=(0,o.useRef)();return(0,o.useLayoutEffect)((()=>(a.registerSlot(e,u,t),()=>{a.unregisterSlot(e,u)})),[a.registerSlot,a.unregisterSlot,e]),(0,o.useLayoutEffect)((()=>{a.updateSlot(e,t)})),(0,o.createElement)(n,(0,r.Z)({ref:(0,i.useMergeRefs)([l,u])},c))}))},1515:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(9307),o=n(159);function i(e){const t=(0,r.useContext)(o.Z),n=t.slots[e]||{},i=t.fills[e],s=(0,r.useMemo)((()=>i||[]),[i]);return{...n,updateSlot:(0,r.useCallback)((n=>{t.updateSlot(e,n)}),[e,t.updateSlot]),unregisterSlot:(0,r.useCallback)((n=>{t.unregisterSlot(e,n)}),[e,t.unregisterSlot]),fills:s,registerFill:(0,r.useCallback)((n=>{t.registerFill(e,n)}),[e,t.registerFill]),unregisterFill:(0,r.useCallback)((n=>{t.unregisterFill(e,n)}),[e,t.unregisterFill])}}},566:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=(0,n(9307).createContext)({registerSlot:()=>{},unregisterSlot:()=>{},registerFill:()=>{},unregisterFill:()=>{},getSlot:()=>{},getFills:()=>{},subscribe:()=>{}})},8198:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(7462),o=n(9307),i=n(2819),s=n(566),c=n(2009);function l({name:e,children:t,registerFill:n,unregisterFill:r}){const s=(0,c.Z)(e),l=(0,o.useRef)({name:e,children:t});return(0,o.useLayoutEffect)((()=>(n(e,l.current),()=>r(e,l.current))),[]),(0,o.useLayoutEffect)((()=>{l.current.children=t,s&&s.forceUpdate()}),[t]),(0,o.useLayoutEffect)((()=>{e!==l.current.name&&(r(l.current.name,l.current),l.current.name=e,n(e,l.current))}),[e]),s&&s.node?((0,i.isFunction)(t)&&(t=t(s.props.fillProps)),(0,o.createPortal)(t,s.node)):null}const a=e=>(0,o.createElement)(s.Z.Consumer,null,(({registerFill:t,unregisterFill:n})=>(0,o.createElement)(l,(0,r.Z)({},e,{registerFill:t,unregisterFill:n}))))},6580:(e,t,n)=>{"use strict";n.d(t,{de:()=>a,g7:()=>u});var r=n(7462),o=n(9307),i=n(8198),s=n(8612),c=n(4160),l=n(9934);function a(e){return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(i.Z,e),(0,o.createElement)(c.Z,e))}const u=(0,o.forwardRef)((({bubblesVirtually:e,...t},n)=>e?(0,o.createElement)(l.Z,(0,r.Z)({},t,{ref:n})):(0,o.createElement)(s.Z,t)))},8612:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var r=n(7462),o=n(9307),i=n(2819),s=n(566);class c extends o.Component{constructor(){super(...arguments),this.isUnmounted=!1,this.bindNode=this.bindNode.bind(this)}componentDidMount(){const{registerSlot:e}=this.props;e(this.props.name,this)}componentWillUnmount(){const{unregisterSlot:e}=this.props;this.isUnmounted=!0,e(this.props.name,this)}componentDidUpdate(e){const{name:t,unregisterSlot:n,registerSlot:r}=this.props;e.name!==t&&(n(e.name),r(t,this))}bindNode(e){this.node=e}forceUpdate(){this.isUnmounted||super.forceUpdate()}render(){const{children:e,name:t,fillProps:n={},getFills:r}=this.props,s=(0,i.map)(r(t,this),(e=>{const t=(0,i.isFunction)(e.children)?e.children(n):e.children;return o.Children.map(t,((e,t)=>{if(!e||(0,i.isString)(e))return e;const n=e.key||t;return(0,o.cloneElement)(e,{key:n})}))})).filter((0,i.negate)(o.isEmptyElement));return(0,o.createElement)(o.Fragment,null,(0,i.isFunction)(e)?e(s):s)}}const l=e=>(0,o.createElement)(s.Z.Consumer,null,(({registerSlot:t,unregisterSlot:n,getFills:i})=>(0,o.createElement)(c,(0,r.Z)({},e,{registerSlot:t,unregisterSlot:n,getFills:i}))))},2009:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(9307),o=n(566);const i=e=>{const{getSlot:t,subscribe:n}=(0,r.useContext)(o.Z),[i,s]=(0,r.useState)(t(e));return(0,r.useEffect)((()=>(s(t(e)),n((()=>{s(t(e))})))),[e]),i}},9178:(e,t,n)=>{"use strict";n.d(t,{Z:()=>p});var r=n(9307),o=n(2819),i=n(4333),s=n(4638),c=n(3586);const l=(0,r.createElement)("div",{className:"event-catcher"}),a=({eventHandlers:e,child:t,childrenWithPopover:n})=>(0,r.cloneElement)((0,r.createElement)("span",{className:"disabled-element-wrapper"},(0,r.cloneElement)(l,e),(0,r.cloneElement)(t,{children:n}),","),e),u=({child:e,eventHandlers:t,childrenWithPopover:n})=>(0,r.cloneElement)(e,{...t,children:n}),d=(e,t,n)=>{if(1!==r.Children.count(e))return;const o=r.Children.only(e);"function"==typeof o.props[t]&&o.props[t](n)},p=function({children:e,position:t,text:n,shortcut:l}){const[p,m]=(0,r.useState)(!1),[f,h]=(0,r.useState)(!1),g=(0,i.useDebounce)(h,700),v=t=>{d(e,"onMouseDown",t),document.addEventListener("mouseup",E),m(!0)},b=t=>{d(e,"onMouseUp",t),document.removeEventListener("mouseup",E),m(!1)},w=e=>"mouseUp"===e?b:"mouseDown"===e?v:void 0,E=w("mouseUp"),y=(t,n)=>r=>{if(d(e,t,r),r.currentTarget.disabled)return;if("focus"===r.type&&p)return;g.cancel();const i=(0,o.includes)(["focus","mouseenter"],r.type);i!==f&&(n?g(i):h(i))},S=()=>{g.cancel(),document.removeEventListener("mouseup",E)};if((0,r.useEffect)((()=>S),[]),1!==r.Children.count(e))return e;const C={onMouseEnter:y("onMouseEnter",!0),onMouseLeave:y("onMouseLeave"),onClick:y("onClick"),onFocus:y("onFocus"),onBlur:y("onBlur"),onMouseDown:w("mouseDown")},P=r.Children.only(e),{children:x,disabled:Z}=P.props,M=Z?a:u,k=(({grandchildren:e,isOver:t,position:n,text:o,shortcut:i})=>(0,r.concatChildren)(e,t&&(0,r.createElement)(s.Z,{focusOnMount:!1,position:n,className:"components-tooltip","aria-hidden":"true",animate:!1,noArrow:!0},o,(0,r.createElement)(c.Z,{className:"components-tooltip__shortcut",shortcut:i}))))({grandchildren:x,isOver:f,position:t,text:n,shortcut:l});return M({child:P,eventHandlers:C,childrenWithPopover:k})}},7593:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var r=n(4184),o=n.n(r),i=n(9307),s=n(2004);const c=(0,i.forwardRef)((function({as:e="div",className:t,...n},r){return(0,s.k)({as:e,className:o()("components-visually-hidden",t),...n,ref:r})}))},2004:(e,t,n)=>{"use strict";n.d(t,{k:()=>o});var r=n(9307);function o({as:e="div",...t}){return"function"==typeof t.children?t.children(t):(0,r.createElement)(e,t)}},4787:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(9307),o=n(444);const i=(0,r.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,r.createElement)(o.Path,{d:"M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"}))},7462:(e,t,n)=>{"use strict";function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},r.apply(this,arguments)}n.d(t,{Z:()=>r})}}]);