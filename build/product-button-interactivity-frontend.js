(()=>{var e={4184:(e,t)=>{var n;!function(){"use strict";var o={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var s=r.apply(null,n);s&&e.push(s)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var c in n)o.call(n,c)&&n[c]&&e.push(c);else e.push(n.toString())}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()},5482:()=>{},1365:()=>{},5589:()=>{}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.wp.element,t=window.wc.wcBlocksData,o=window.wc.__experimentalInteractivity,r=window.wp.data;var i=n(4184),s=n.n(i);const c=window.wp.i18n,a=function(t){let{icon:n,size:o=24,...r}=t;return(0,e.cloneElement)(n,{width:o,height:o,...r})},l=window.wp.primitives,u=(0,e.createElement)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(l.Path,{d:"M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"}));n(1365);const m=(0,e.createElement)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(l.Path,{d:"M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"})),d=(0,e.createElement)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(l.Path,{d:"M12 3.2c-4.8 0-8.8 3.9-8.8 8.8 0 4.8 3.9 8.8 8.8 8.8 4.8 0 8.8-3.9 8.8-8.8 0-4.8-4-8.8-8.8-8.8zm0 16c-4 0-7.2-3.3-7.2-7.2C4.8 8 8 4.8 12 4.8s7.2 3.3 7.2 7.2c0 4-3.2 7.2-7.2 7.2zM11 17h2v-6h-2v6zm0-8h2V7h-2v2z"})),p=(0,e.createElement)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(l.Path,{fillRule:"evenodd",d:"M6.863 13.644L5 13.25h-.5a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5H5L18 6.5h2V16h-2l-3.854-.815.026.008a3.75 3.75 0 01-7.31-1.549zm1.477.313a2.251 2.251 0 004.356.921l-4.356-.921zm-2.84-3.28L18.157 8h.343v6.5h-.343L5.5 11.823v-1.146z",clipRule:"evenodd"})),f=e=>{switch(e){case"success":case"warning":case"info":case"default":return"polite";default:return"assertive"}},h=e=>{switch(e){case"success":return m;case"warning":case"info":case"error":return d;default:return p}};function w(){return w=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},w.apply(this,arguments)}const g=window.lodash,v=window.wp.deprecated;var E=n.n(v);const b=window.wp.compose,y=window.wp.dom,x=(0,e.createElement)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(l.Path,{d:"M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"}));function C(e,t,n){const{defaultView:o}=t,{frameElement:r}=o;if(!r||t===n.ownerDocument)return e;const i=r.getBoundingClientRect();return new o.DOMRect(e.left+i.left,e.top+i.top,e.width,e.height)}let S=0;function _(e){const t=document.scrollingElement||document.body;e&&(S=t.scrollTop);const n=e?"add":"remove";t.classList[n]("lockscroll"),document.documentElement.classList[n]("lockscroll"),e||(t.scrollTop=S)}let L=0;function T(){return(0,e.useEffect)((()=>(0===L&&_(!0),++L,()=>{1===L&&_(!1),--L})),[]),null}window.wp.warning;const I=(0,e.createContext)({slots:{},fills:{},registerSlot:()=>{"undefined"!=typeof process&&process.env},updateSlot:()=>{},unregisterSlot:()=>{},registerFill:()=>{},unregisterFill:()=>{}});function O(t){const n=(0,e.useContext)(I),o=n.slots[t]||{},r=n.fills[t],i=(0,e.useMemo)((()=>r||[]),[r]);return{...o,updateSlot:(0,e.useCallback)((e=>{n.updateSlot(t,e)}),[t,n.updateSlot]),unregisterSlot:(0,e.useCallback)((e=>{n.unregisterSlot(t,e)}),[t,n.unregisterSlot]),fills:i,registerFill:(0,e.useCallback)((e=>{n.registerFill(t,e)}),[t,n.registerFill]),unregisterFill:(0,e.useCallback)((e=>{n.unregisterFill(t,e)}),[t,n.unregisterFill])}}const R=(0,e.createContext)({registerSlot:()=>{},unregisterSlot:()=>{},registerFill:()=>{},unregisterFill:()=>{},getSlot:()=>{},getFills:()=>{},subscribe:()=>{}});function D({name:t,children:n,registerFill:o,unregisterFill:r}){const i=(t=>{const{getSlot:n,subscribe:o}=(0,e.useContext)(R),[r,i]=(0,e.useState)(n(t));return(0,e.useEffect)((()=>(i(n(t)),o((()=>{i(n(t))})))),[t]),r})(t),s=(0,e.useRef)({name:t,children:n});return(0,e.useLayoutEffect)((()=>(o(t,s.current),()=>r(t,s.current))),[]),(0,e.useLayoutEffect)((()=>{s.current.children=n,i&&i.forceUpdate()}),[n]),(0,e.useLayoutEffect)((()=>{t!==s.current.name&&(r(s.current.name,s.current),s.current.name=t,o(t,s.current))}),[t]),i&&i.node?((0,g.isFunction)(n)&&(n=n(i.props.fillProps)),(0,e.createPortal)(n,i.node)):null}const N=t=>(0,e.createElement)(R.Consumer,null,(({registerFill:n,unregisterFill:o})=>(0,e.createElement)(D,w({},t,{registerFill:n,unregisterFill:o}))));class F extends e.Component{constructor(){super(...arguments),this.isUnmounted=!1,this.bindNode=this.bindNode.bind(this)}componentDidMount(){const{registerSlot:e}=this.props;e(this.props.name,this)}componentWillUnmount(){const{unregisterSlot:e}=this.props;this.isUnmounted=!0,e(this.props.name,this)}componentDidUpdate(e){const{name:t,unregisterSlot:n,registerSlot:o}=this.props;e.name!==t&&(n(e.name),o(t,this))}bindNode(e){this.node=e}forceUpdate(){this.isUnmounted||super.forceUpdate()}render(){const{children:t,name:n,fillProps:o={},getFills:r}=this.props,i=(0,g.map)(r(n,this),(t=>{const n=(0,g.isFunction)(t.children)?t.children(o):t.children;return e.Children.map(n,((t,n)=>{if(!t||(0,g.isString)(t))return t;const o=t.key||n;return(0,e.cloneElement)(t,{key:o})}))})).filter((0,g.negate)(e.isEmptyElement));return(0,e.createElement)(e.Fragment,null,(0,g.isFunction)(t)?t(i):i)}}const k=t=>(0,e.createElement)(R.Consumer,null,(({registerSlot:n,unregisterSlot:o,getFills:r})=>(0,e.createElement)(F,w({},t,{registerSlot:n,unregisterSlot:o,getFills:r}))));function M(){const[,t]=(0,e.useState)({}),n=(0,e.useRef)(!0);return(0,e.useEffect)((()=>()=>{n.current=!1}),[]),()=>{n.current&&t({})}}function A({name:t,children:n}){const o=O(t),r=(0,e.useRef)({rerender:M()});return(0,e.useEffect)((()=>(o.registerFill(r),()=>{o.unregisterFill(r)})),[o.registerFill,o.unregisterFill]),o.ref&&o.ref.current?("function"==typeof n&&(n=n(o.fillProps)),(0,e.createPortal)(n,o.ref.current)):null}const P=(0,e.forwardRef)((function({name:t,fillProps:n={},as:o="div",...r},i){const s=(0,e.useContext)(I),c=(0,e.useRef)();return(0,e.useLayoutEffect)((()=>(s.registerSlot(t,c,n),()=>{s.unregisterSlot(t,c)})),[s.registerSlot,s.unregisterSlot,t]),(0,e.useLayoutEffect)((()=>{s.updateSlot(t,n)})),(0,e.createElement)(o,w({ref:(0,b.useMergeRefs)([i,c])},r))}));function B(t){return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(N,t),(0,e.createElement)(A,t))}const V=(0,e.forwardRef)((({bubblesVirtually:t,...n},o)=>t?(0,e.createElement)(P,w({},n,{ref:o})):(0,e.createElement)(k,n)));function W(e){return"appear"===e?"top":"left"}const z="Popover";function H(e,t){const{paddingTop:n,paddingBottom:o,paddingLeft:r,paddingRight:i}=(s=t).ownerDocument.defaultView.getComputedStyle(s);var s;const c=n?parseInt(n,10):0,a=o?parseInt(o,10):0,l=r?parseInt(r,10):0,u=i?parseInt(i,10):0;return{x:e.left+l,y:e.top+c,width:e.width-l-u,height:e.height-c-a,left:e.left+l,right:e.right-u,top:e.top+c,bottom:e.bottom-a}}function U(e,t,n){n?e.getAttribute(t)!==n&&e.setAttribute(t,n):e.hasAttribute(t)&&e.removeAttribute(t)}function j(e,t,n=""){e.style[t]!==n&&(e.style[t]=n)}function q(e,t,n){n?e.classList.contains(t)||e.classList.add(t):e.classList.contains(t)&&e.classList.remove(t)}const G=(0,e.forwardRef)((({headerTitle:t,onClose:n,children:o,className:r,noArrow:i=!0,isAlternate:a,position:l="bottom right",range:u,focusOnMount:m="firstElement",anchorRef:d,shouldAnchorIncludePadding:p,anchorRect:f,getAnchorRect:h,expandOnMobile:g,animate:v=!0,onClickOutside:S,onFocusOutside:_,__unstableStickyBoundaryElement:L,__unstableSlotName:I=z,__unstableObserveElement:R,__unstableBoundaryParent:D,__unstableForcePosition:N,__unstableForceXAlignment:F,...k},M)=>{const A=(0,e.useRef)(null),P=(0,e.useRef)(null),V=(0,e.useRef)(),G=(0,b.useViewportMatch)("medium","<"),[K,Y]=(0,e.useState)(),X=O(I),J=g&&G,[Q,Z]=(0,b.useResizeObserver)();i=J||i,(0,e.useLayoutEffect)((()=>{if(J)return q(V.current,"is-without-arrow",i),q(V.current,"is-alternate",a),U(V.current,"data-x-axis"),U(V.current,"data-y-axis"),j(V.current,"top"),j(V.current,"left"),j(P.current,"maxHeight"),void j(P.current,"maxWidth");const e=()=>{if(!V.current||!P.current)return;let e=function(e,t,n,o=!1,r,i){if(t)return t;if(n){if(!e.current)return;const t=n(e.current);return C(t,t.ownerDocument||e.current.ownerDocument,i)}if(!1!==o){if(!(o&&window.Range&&window.Element&&window.DOMRect))return;if("function"==typeof(null==o?void 0:o.cloneRange))return C((0,y.getRectangleFromRange)(o),o.endContainer.ownerDocument,i);if("function"==typeof(null==o?void 0:o.getBoundingClientRect)){const e=C(o.getBoundingClientRect(),o.ownerDocument,i);return r?e:H(e,o)}const{top:e,bottom:t}=o,n=e.getBoundingClientRect(),s=t.getBoundingClientRect(),c=C(new window.DOMRect(n.left,n.top,n.width,s.bottom-n.top),e.ownerDocument,i);return r?c:H(c,o)}if(!e.current)return;const{parentNode:s}=e.current,c=s.getBoundingClientRect();return r?c:H(c,s)}(A,f,h,d,p,V.current);if(!e)return;const{offsetParent:t,ownerDocument:n}=V.current;let o,r=0;if(t&&t!==n.body){const n=t.getBoundingClientRect();r=n.top,e=new window.DOMRect(e.left-n.left,e.top-n.top,e.width,e.height)}var s;D&&(o=null===(s=V.current.closest(".popover-slot"))||void 0===s?void 0:s.parentNode);const u=Z.height?Z:P.current.getBoundingClientRect(),{popoverTop:m,popoverLeft:w,xAxis:g,yAxis:v,contentHeight:E,contentWidth:b}=function(e,t,n="top",o,r,i,s,a,l){const[u,m="center",d]=n.split(" "),p=function(e,t,n,o,r,i,s,c){const{height:a}=t;if(r){const t=r.getBoundingClientRect().top+a-s;if(e.top<=t)return{yAxis:n,popoverTop:Math.min(e.bottom,t)}}let l=e.top+e.height/2;"bottom"===o?l=e.bottom:"top"===o&&(l=e.top);const u={popoverTop:l,contentHeight:(l-a/2>0?a/2:l)+(l+a/2>window.innerHeight?window.innerHeight-l:a/2)},m={popoverTop:e.top,contentHeight:e.top-10-a>0?a:e.top-10},d={popoverTop:e.bottom,contentHeight:e.bottom+10+a>window.innerHeight?window.innerHeight-10-e.bottom:a};let p,f=n,h=null;if(!r&&!c)if("middle"===n&&u.contentHeight===a)f="middle";else if("top"===n&&m.contentHeight===a)f="top";else if("bottom"===n&&d.contentHeight===a)f="bottom";else{f=m.contentHeight>d.contentHeight?"top":"bottom";const e="top"===f?m.contentHeight:d.contentHeight;h=e!==a?e:null}return p="middle"===f?u.popoverTop:"top"===f?m.popoverTop:d.popoverTop,{yAxis:f,popoverTop:p,contentHeight:h}}(e,t,u,d,o,0,i,a),f=function(e,t,n,o,r,i,s,a,l){const{width:u}=t;"left"===n&&(0,c.isRTL)()?n="right":"right"===n&&(0,c.isRTL)()&&(n="left"),"left"===o&&(0,c.isRTL)()?o="right":"right"===o&&(0,c.isRTL)()&&(o="left");const m=Math.round(e.left+e.width/2),d={popoverLeft:m,contentWidth:(m-u/2>0?u/2:m)+(m+u/2>window.innerWidth?window.innerWidth-m:u/2)};let p=e.left;"right"===o?p=e.right:"middle"===i||l||(p=m);let f=e.right;"left"===o?f=e.left:"middle"===i||l||(f=m);const h={popoverLeft:p,contentWidth:p-u>0?u:p},w={popoverLeft:f,contentWidth:f+u>window.innerWidth?window.innerWidth-f:u};let g,v=n,E=null;if(!r&&!a)if("center"===n&&d.contentWidth===u)v="center";else if("left"===n&&h.contentWidth===u)v="left";else if("right"===n&&w.contentWidth===u)v="right";else{v=h.contentWidth>w.contentWidth?"left":"right";const e="left"===v?h.contentWidth:w.contentWidth;u>window.innerWidth&&(E=window.innerWidth),e!==u&&(v="center",d.popoverLeft=window.innerWidth/2)}if(g="center"===v?d.popoverLeft:"left"===v?h.popoverLeft:w.popoverLeft,s){const e=s.getBoundingClientRect();g=Math.min(g,e.right-u),(0,c.isRTL)()||(g=Math.max(g,0))}return{xAxis:v,popoverLeft:g,contentWidth:E}}(e,t,m,d,o,p.yAxis,s,a,l);return{...f,...p}}(e,u,l,L,V.current,r,o,N,F);"number"==typeof m&&"number"==typeof w&&(j(V.current,"top",m+"px"),j(V.current,"left",w+"px")),q(V.current,"is-without-arrow",i||"center"===g&&"middle"===v),q(V.current,"is-alternate",a),U(V.current,"data-x-axis",g),U(V.current,"data-y-axis",v),j(P.current,"maxHeight","number"==typeof E?E+"px":""),j(P.current,"maxWidth","number"==typeof b?b+"px":""),Y(({left:"right",right:"left"}[g]||"center")+" "+({top:"bottom",bottom:"top"}[v]||"middle"))};e();const{ownerDocument:t}=V.current,{defaultView:n}=t,o=n.setInterval(e,500);let r;const s=()=>{n.cancelAnimationFrame(r),r=n.requestAnimationFrame(e)};n.addEventListener("click",s),n.addEventListener("resize",e),n.addEventListener("scroll",e,!0);const u=function(e){if(e)return e.endContainer?e.endContainer.ownerDocument:e.top?e.top.ownerDocument:e.ownerDocument}(d);let m;return u&&u!==t&&(u.defaultView.addEventListener("resize",e),u.defaultView.addEventListener("scroll",e,!0)),R&&(m=new n.MutationObserver(e),m.observe(R,{attributes:!0})),()=>{n.clearInterval(o),n.removeEventListener("resize",e),n.removeEventListener("scroll",e,!0),n.removeEventListener("click",s),n.cancelAnimationFrame(r),u&&u!==t&&(u.defaultView.removeEventListener("resize",e),u.defaultView.removeEventListener("scroll",e,!0)),m&&m.disconnect()}}),[J,f,h,d,p,l,Z,L,R,D]);const $=(e,t)=>{if("focus-outside"===e&&_)_(t);else if("focus-outside"===e&&S){const e=new window.MouseEvent("click");Object.defineProperty(e,"target",{get:()=>t.relatedTarget}),E()("Popover onClickOutside prop",{since:"5.3",alternative:"onFocusOutside"}),S(e)}else n&&n()},[ee,te]=(0,b.__experimentalUseDialog)({focusOnMount:m,__unstableOnClose:$,onClose:$}),ne=(0,b.useMergeRefs)([V,ee,M]),oe=Boolean(v&&K)&&function(e){if("loading"===e.type)return s()("components-animate__loading");const{type:t,origin:n=W(t)}=e;if("appear"===t){const[e,t="center"]=n.split(" ");return s()("components-animate__appear",{["is-from-"+t]:"center"!==t,["is-from-"+e]:"middle"!==e})}return"slide-in"===t?s()("components-animate__slide-in","is-from-"+n):void 0}({type:"appear",origin:K});let ie=(0,e.createElement)("div",w({className:s()("components-popover",r,oe,{"is-expanded":J,"is-without-arrow":i,"is-alternate":a})},k,{ref:ne},te,{tabIndex:"-1"}),J&&(0,e.createElement)(T,null),J&&(0,e.createElement)("div",{className:"components-popover__header"},(0,e.createElement)("span",{className:"components-popover__header-title"},t),(0,e.createElement)(re,{className:"components-popover__close",icon:x,onClick:n})),(0,e.createElement)("div",{ref:P,className:"components-popover__content"},(0,e.createElement)("div",{style:{position:"relative"}},Q,o)));return X.ref&&(ie=(0,e.createElement)(B,{name:I},ie)),d||f?ie:(0,e.createElement)("span",{ref:A},ie)}));G.Slot=(0,e.forwardRef)((function({name:t=z},n){return(0,e.createElement)(V,{bubblesVirtually:!0,name:t,className:"popover-slot",ref:n})}));const K=G,Y=function({shortcut:t,className:n}){if(!t)return null;let o,r;return(0,g.isString)(t)&&(o=t),(0,g.isObject)(t)&&(o=t.display,r=t.ariaLabel),(0,e.createElement)("span",{className:n,"aria-label":r},o)},X=(0,e.createElement)("div",{className:"event-catcher"}),J=({eventHandlers:t,child:n,childrenWithPopover:o})=>(0,e.cloneElement)((0,e.createElement)("span",{className:"disabled-element-wrapper"},(0,e.cloneElement)(X,t),(0,e.cloneElement)(n,{children:o}),","),t),Q=({child:t,eventHandlers:n,childrenWithPopover:o})=>(0,e.cloneElement)(t,{...n,children:o}),Z=(t,n,o)=>{if(1!==e.Children.count(t))return;const r=e.Children.only(t);"function"==typeof r.props[n]&&r.props[n](o)},$=function({children:t,position:n,text:o,shortcut:r}){const[i,s]=(0,e.useState)(!1),[c,a]=(0,e.useState)(!1),l=(0,b.useDebounce)(a,700),u=e=>{Z(t,"onMouseDown",e),document.addEventListener("mouseup",p),s(!0)},m=e=>{Z(t,"onMouseUp",e),document.removeEventListener("mouseup",p),s(!1)},d=e=>"mouseUp"===e?m:"mouseDown"===e?u:void 0,p=d("mouseUp"),f=(e,n)=>o=>{if(Z(t,e,o),o.currentTarget.disabled)return;if("focus"===o.type&&i)return;l.cancel();const r=(0,g.includes)(["focus","mouseenter"],o.type);r!==c&&(n?l(r):a(r))},h=()=>{l.cancel(),document.removeEventListener("mouseup",p)};if((0,e.useEffect)((()=>h),[]),1!==e.Children.count(t))return t;const w={onMouseEnter:f("onMouseEnter",!0),onMouseLeave:f("onMouseLeave"),onClick:f("onClick"),onFocus:f("onFocus"),onBlur:f("onBlur"),onMouseDown:d("mouseDown")},v=e.Children.only(t),{children:E,disabled:y}=v.props,x=y?J:Q,C=(({grandchildren:t,isOver:n,position:o,text:r,shortcut:i})=>(0,e.concatChildren)(t,n&&(0,e.createElement)(K,{focusOnMount:!1,position:o,className:"components-tooltip","aria-hidden":"true",animate:!1,noArrow:!0},r,(0,e.createElement)(Y,{className:"components-tooltip__shortcut",shortcut:i}))))({grandchildren:E,isOver:c,position:n,text:o,shortcut:r});return x({child:v,eventHandlers:w,childrenWithPopover:C})},ee=function({icon:t,className:n,...o}){const r=["dashicon","dashicons","dashicons-"+t,n].filter(Boolean).join(" ");return(0,e.createElement)("span",w({className:r},o))},te=function({icon:t=null,size:n=24,...o}){if("string"==typeof t)return(0,e.createElement)(ee,w({icon:t},o));if((0,e.isValidElement)(t)&&ee===t.type)return(0,e.cloneElement)(t,{...o});if("function"==typeof t)return t.prototype instanceof e.Component?(0,e.createElement)(t,{size:n,...o}):t({size:n,...o});if(t&&("svg"===t.type||t.type===l.SVG)){const r={width:n,height:n,...t.props,...o};return(0,e.createElement)(l.SVG,r)}return(0,e.isValidElement)(t)?(0,e.cloneElement)(t,{size:n,...o}):t},ne=(0,e.forwardRef)((function({as:t="div",className:n,...o},r){return function({as:t="div",...n}){return"function"==typeof n.children?n.children(n):(0,e.createElement)(t,n)}({as:t,className:s()("components-visually-hidden",n),...o,ref:r})})),oe=["onMouseDown","onClick"],re=(0,e.forwardRef)((function(t,n){const{href:o,target:r,isSmall:i,isPressed:c,isBusy:a,isDestructive:l,className:u,disabled:m,icon:d,iconPosition:p="left",iconSize:f,showTooltip:h,tooltipPosition:v,shortcut:b,label:y,children:x,text:C,variant:S,__experimentalIsFocusable:_,describedBy:L,...T}=function({isDefault:e,isPrimary:t,isSecondary:n,isTertiary:o,isLink:r,variant:i,...s}){let c=i;var a,l,u,m,d;return t&&(null!==(a=c)&&void 0!==a||(c="primary")),o&&(null!==(l=c)&&void 0!==l||(c="tertiary")),n&&(null!==(u=c)&&void 0!==u||(c="secondary")),e&&(E()("Button isDefault prop",{since:"5.4",alternative:'variant="secondary"'}),null!==(m=c)&&void 0!==m||(c="secondary")),r&&(null!==(d=c)&&void 0!==d||(c="link")),{...s,variant:c}}(t),I=s()("components-button",u,{"is-secondary":"secondary"===S,"is-primary":"primary"===S,"is-small":i,"is-tertiary":"tertiary"===S,"is-pressed":c,"is-busy":a,"is-link":"link"===S,"is-destructive":l,"has-text":!!d&&!!x,"has-icon":!!d}),O=m&&!_,R=void 0===o||O?"button":"a",D="a"===R?{href:o,target:r}:{type:"button",disabled:O,"aria-pressed":c};if(m&&_){D["aria-disabled"]=!0;for(const e of oe)T[e]=e=>{e.stopPropagation(),e.preventDefault()}}const N=!O&&(h&&y||b||!!y&&(!x||(0,g.isArray)(x)&&!x.length)&&!1!==h),F=L?(0,g.uniqueId)():null,k=T["aria-describedby"]||F,M=(0,e.createElement)(R,w({},D,T,{className:I,"aria-label":T["aria-label"]||y,"aria-describedby":k,ref:n}),d&&"left"===p&&(0,e.createElement)(te,{icon:d,size:f}),C&&(0,e.createElement)(e.Fragment,null,C),d&&"right"===p&&(0,e.createElement)(te,{icon:d,size:f}),x);return N?(0,e.createElement)(e.Fragment,null,(0,e.createElement)($,{text:L||y,shortcut:b,position:v},M),L&&(0,e.createElement)(ne,null,(0,e.createElement)("span",{id:F},L))):(0,e.createElement)(e.Fragment,null,M,L&&(0,e.createElement)(ne,null,(0,e.createElement)("span",{id:F},L)))}));n(5589);const ie=()=>(0,e.createElement)("span",{className:"wc-block-components-spinner","aria-hidden":"true"});n(5482);const se=({className:t,showSpinner:n=!1,children:o,variant:r="contained",...i})=>{const c=s()("wc-block-components-button","wp-element-button",t,r,{"wc-block-components-button--loading":n});return(0,e.createElement)(re,{className:c,...i},n&&(0,e.createElement)(ie,null),(0,e.createElement)("span",{className:"wc-block-components-button__text"},o))},ce=window.wp.a11y,ae=({className:t,status:n="default",children:o,spokenMessage:r=o,onRemove:i=(()=>{}),isDismissible:l=!0,politeness:m=f(n),summary:d})=>(((t,n)=>{const o="string"==typeof t?t:(0,e.renderToString)(t);(0,e.useEffect)((()=>{o&&(0,ce.speak)(o,n)}),[o,n])})(r,m),(0,e.createElement)("div",{className:s()(t,"wc-block-components-notice-banner","is-"+n,{"is-dismissible":l})},(0,e.createElement)(a,{icon:h(n)}),(0,e.createElement)("div",{className:"wc-block-components-notice-banner__content"},d&&(0,e.createElement)("p",{className:"wc-block-components-notice-banner__summary"},d),o),!!l&&(0,e.createElement)(se,{className:"wc-block-components-notice-banner__dismiss",icon:u,label:(0,c.__)("Dismiss this notice","woo-gutenberg-products-block"),onClick:e=>{"function"==typeof(null==e?void 0:e.preventDefault)&&e.preventDefault&&e.preventDefault(),i()},showTooltip:!1})));var le=function(e){return e.IDLE="IDLE",e.SLIDE_OUT="SLIDE-OUT",e.SLIDE_IN="SLIDE-IN",e}(le||{});const ue=".wc-block-store-notices",me=window.requestIdleCallback||(e=>setTimeout(e,100)),de=({addToCartText:e,inTheCartText:t,numberOfItems:n})=>0===n?e:t.replace("###",n.toString()),pe={woocommerce:{addToCartText:e=>{const{context:t,state:n,selectors:o}=e;return t.woocommerce.animationStatus===le.IDLE||t.woocommerce.animationStatus===le.SLIDE_OUT?de({addToCartText:t.woocommerce.addToCartText,inTheCartText:n.woocommerce.inTheCartText,numberOfItems:t.woocommerce.temporaryNumberOfItems}):de({addToCartText:t.woocommerce.addToCartText,inTheCartText:n.woocommerce.inTheCartText,numberOfItems:o.woocommerce.numberOfItemsInTheCart(e)})},displayViewCart:e=>{const{context:t,selectors:n}=e;return!!t.woocommerce.displayViewCart&&(n.woocommerce.hasCartLoaded(e)?n.woocommerce.numberOfItemsInTheCart(e)>0:t.woocommerce.temporaryNumberOfItems>0)},hasCartLoaded:({state:e})=>void 0!==e.woocommerce.cart,numberOfItemsInTheCart:({state:e,context:t})=>{const n=(o=e.woocommerce.cart,r=t.woocommerce.productId,null==o?void 0:o.items.find((e=>e.id===r)));var o,r;return(null==n?void 0:n.quantity)||0},slideOutAnimation:({context:e})=>e.woocommerce.animationStatus===le.SLIDE_OUT,slideInAnimation:({context:e})=>e.woocommerce.animationStatus===le.SLIDE_IN}};(0,o.store)({selectors:pe,actions:{woocommerce:{addToCart:async n=>{const{context:o,selectors:i,ref:s}=n;if(!s.classList.contains("ajax_add_to_cart"))return;o.woocommerce.isLoading=!0;const c=new CustomEvent("should_send_ajax_request.adding_to_cart",{detail:[s],cancelable:!0});if(!1===document.body.dispatchEvent(c)){const e=new CustomEvent("ajax_request_not_sent.adding_to_cart",{detail:[!1,!1,s]});return document.body.dispatchEvent(e),!0}try{await(0,r.dispatch)(t.CART_STORE_KEY).addItemToCart(o.woocommerce.productId,o.woocommerce.quantityToAdd),o.woocommerce.temporaryNumberOfItems=i.woocommerce.numberOfItemsInTheCart(n)}catch(t){const n=document.querySelector(ue);var a;n||null===(a=document.querySelector(".entry-content"))||void 0===a||a.prepend((()=>{const e=document.createElement("div");return e.classList.add(ue.replace(".","")),e})());const o=null!=n?n:document.querySelector(ue);o&&((t,n)=>{const o=(0,e.createRoot)(t);o.render((0,e.createElement)(ae,{status:"error",onRemove:()=>o.unmount()},n)),null==t||t.scrollIntoView({behavior:"smooth",inline:"nearest"})})(o,t.message),console.error(t)}finally{o.woocommerce.displayViewCart=!0,o.woocommerce.isLoading=!1}},handleAnimationEnd:e=>{const{event:t,context:n,selectors:o}=e;"slideOut"===t.animationName?n.woocommerce.animationStatus=le.SLIDE_IN:"slideIn"===t.animationName&&(n.woocommerce.temporaryNumberOfItems=o.woocommerce.numberOfItemsInTheCart(e),n.woocommerce.animationStatus=le.IDLE)}}},init:{woocommerce:{syncTemporaryNumberOfItemsOnLoad:e=>{const{selectors:t,context:n}=e;t.woocommerce.hasCartLoaded(e)&&(n.woocommerce.temporaryNumberOfItems=t.woocommerce.numberOfItemsInTheCart(e))}}},effects:{woocommerce:{startAnimation:e=>{const{context:t,selectors:n}=e;n.woocommerce.hasCartLoaded(e)&&t.woocommerce.temporaryNumberOfItems!==n.woocommerce.numberOfItemsInTheCart(e)&&!t.woocommerce.isLoading&&t.woocommerce.animationStatus===le.IDLE&&(t.woocommerce.animationStatus=le.SLIDE_OUT)}}}},{afterLoad:e=>{const{state:n,selectors:o}=e;(0,r.subscribe)((()=>{const e=(0,r.select)(t.CART_STORE_KEY).getCartData();(0,r.select)(t.CART_STORE_KEY).hasFinishedResolution("getCartData")&&(n.woocommerce.cart=e)}),t.CART_STORE_KEY),me((()=>{o.woocommerce.hasCartLoaded(e)||(0,r.select)(t.CART_STORE_KEY).getCartData()}))}})})()})();