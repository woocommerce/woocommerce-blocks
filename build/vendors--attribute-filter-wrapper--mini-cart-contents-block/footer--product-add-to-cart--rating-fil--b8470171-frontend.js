(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[2],{115:function(e,t,n){"use strict";var r=n(0),o=n(12);const i=Object(r.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(r.createElement)(o.Path,{d:"M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"}));t.a=i},29:function(e,t,n){"use strict";(function(e){var r=n(0);n(39);const o=Object(r.createContext)({slots:{},fills:{},registerSlot:()=>{void 0!==e&&e.env},updateSlot:()=>{},unregisterSlot:()=>{},registerFill:()=>{},unregisterFill:()=>{}});t.a=o}).call(this,n(65))},37:function(e,t,n){"use strict";var r=n(5),o=n.n(r),i=n(0);t.a=Object(i.forwardRef)((function({as:e="div",className:t,...n},r){return function({as:e="div",...t}){return"function"==typeof t.children?t.children(t):Object(i.createElement)(e,t)}({as:e,className:o()("components-visually-hidden",t),...n,ref:r})}))},43:function(e,t,n){"use strict";var r=n(9),o=n(0),i=n(12),c=function({icon:e,className:t,...n}){const i=["dashicon","dashicons","dashicons-"+e,t].filter(Boolean).join(" ");return Object(o.createElement)("span",Object(r.a)({className:i},n))};t.a=function({icon:e=null,size:t=24,...n}){if("string"==typeof e)return Object(o.createElement)(c,Object(r.a)({icon:e},n));if(Object(o.isValidElement)(e)&&c===e.type)return Object(o.cloneElement)(e,{...n});if("function"==typeof e)return e.prototype instanceof o.Component?Object(o.createElement)(e,{size:t,...n}):e({size:t,...n});if(e&&("svg"===e.type||e.type===i.SVG)){const r={width:t,height:t,...e.props,...n};return Object(o.createElement)(i.SVG,r)}return Object(o.isValidElement)(e)?Object(o.cloneElement)(e,{size:t,...n}):e}},49:function(e,t,n){"use strict";var r=n(9),o=n(0),i=n(5),c=n.n(i),s=n(3),l=n(22),a=n.n(l),u=n(10),d=n(46),p=n(115),f=n(1);function m(e,t,n){const{defaultView:r}=t,{frameElement:o}=r;if(!o||t===n.ownerDocument)return e;const i=o.getBoundingClientRect();return new r.DOMRect(e.left+i.left,e.top+i.top,e.width,e.height)}let b=0;function h(e){const t=document.scrollingElement||document.body;e&&(b=t.scrollTop);const n=e?"add":"remove";t.classList[n]("lockscroll"),document.documentElement.classList[n]("lockscroll"),e||(t.scrollTop=b)}let g=0;function O(){return Object(o.useEffect)(()=>(0===g&&h(!0),++g,()=>{1===g&&h(!1),--g}),[]),null}var v=n(29);function j(e){const t=Object(o.useContext)(v.a),n=t.slots[e]||{},r=t.fills[e],i=Object(o.useMemo)(()=>r||[],[r]);return{...n,updateSlot:Object(o.useCallback)(n=>{t.updateSlot(e,n)},[e,t.updateSlot]),unregisterSlot:Object(o.useCallback)(n=>{t.unregisterSlot(e,n)},[e,t.unregisterSlot]),fills:i,registerFill:Object(o.useCallback)(n=>{t.registerFill(e,n)},[e,t.registerFill]),unregisterFill:Object(o.useCallback)(n=>{t.unregisterFill(e,n)},[e,t.unregisterFill])}}var w=Object(o.createContext)({registerSlot:()=>{},unregisterSlot:()=>{},registerFill:()=>{},unregisterFill:()=>{},getSlot:()=>{},getFills:()=>{},subscribe:()=>{}});function E({name:e,children:t,registerFill:n,unregisterFill:r}){const i=(e=>{const{getSlot:t,subscribe:n}=Object(o.useContext)(w),[r,i]=Object(o.useState)(t(e));return Object(o.useEffect)(()=>(i(t(e)),n(()=>{i(t(e))})),[e]),r})(e),c=Object(o.useRef)({name:e,children:t});return Object(o.useLayoutEffect)(()=>(n(e,c.current),()=>r(e,c.current)),[]),Object(o.useLayoutEffect)(()=>{c.current.children=t,i&&i.forceUpdate()},[t]),Object(o.useLayoutEffect)(()=>{e!==c.current.name&&(r(c.current.name,c.current),c.current.name=e,n(e,c.current))},[e]),i&&i.node?(Object(s.isFunction)(t)&&(t=t(i.props.fillProps)),Object(o.createPortal)(t,i.node)):null}var y=e=>Object(o.createElement)(w.Consumer,null,({registerFill:t,unregisterFill:n})=>Object(o.createElement)(E,Object(r.a)({},e,{registerFill:t,unregisterFill:n})));class L extends o.Component{constructor(){super(...arguments),this.isUnmounted=!1,this.bindNode=this.bindNode.bind(this)}componentDidMount(){const{registerSlot:e}=this.props;e(this.props.name,this)}componentWillUnmount(){const{unregisterSlot:e}=this.props;this.isUnmounted=!0,e(this.props.name,this)}componentDidUpdate(e){const{name:t,unregisterSlot:n,registerSlot:r}=this.props;e.name!==t&&(n(e.name),r(t,this))}bindNode(e){this.node=e}forceUpdate(){this.isUnmounted||super.forceUpdate()}render(){const{children:e,name:t,fillProps:n={},getFills:r}=this.props,i=Object(s.map)(r(t,this),e=>{const t=Object(s.isFunction)(e.children)?e.children(n):e.children;return o.Children.map(t,(e,t)=>{if(!e||Object(s.isString)(e))return e;const n=e.key||t;return Object(o.cloneElement)(e,{key:n})})}).filter(Object(s.negate)(o.isEmptyElement));return Object(o.createElement)(o.Fragment,null,Object(s.isFunction)(e)?e(i):i)}}var x=e=>Object(o.createElement)(w.Consumer,null,({registerSlot:t,unregisterSlot:n,getFills:i})=>Object(o.createElement)(L,Object(r.a)({},e,{registerSlot:t,unregisterSlot:n,getFills:i})));function C(){const[,e]=Object(o.useState)({}),t=Object(o.useRef)(!0);return Object(o.useEffect)(()=>()=>{t.current=!1},[]),()=>{t.current&&e({})}}function F({name:e,children:t}){const n=j(e),r=Object(o.useRef)({rerender:C()});return Object(o.useEffect)(()=>(n.registerFill(r),()=>{n.unregisterFill(r)}),[n.registerFill,n.unregisterFill]),n.ref&&n.ref.current?("function"==typeof t&&(t=t(n.fillProps)),Object(o.createPortal)(t,n.ref.current)):null}var R=Object(o.forwardRef)((function({name:e,fillProps:t={},as:n="div",...i},c){const s=Object(o.useContext)(v.a),l=Object(o.useRef)();return Object(o.useLayoutEffect)(()=>(s.registerSlot(e,l,t),()=>{s.unregisterSlot(e,l)}),[s.registerSlot,s.unregisterSlot,e]),Object(o.useLayoutEffect)(()=>{s.updateSlot(e,t)}),Object(o.createElement)(n,Object(r.a)({ref:Object(u.useMergeRefs)([c,l])},i))}));function S(e){return Object(o.createElement)(o.Fragment,null,Object(o.createElement)(y,e),Object(o.createElement)(F,e))}n(13),o.Component;const T=Object(o.forwardRef)(({bubblesVirtually:e,...t},n)=>e?Object(o.createElement)(R,Object(r.a)({},t,{ref:n})):Object(o.createElement)(x,t));function _(e){return"appear"===e?"top":"left"}function D(e,t){const{paddingTop:n,paddingBottom:r,paddingLeft:o,paddingRight:i}=(c=t).ownerDocument.defaultView.getComputedStyle(c);var c;const s=n?parseInt(n,10):0,l=r?parseInt(r,10):0,a=o?parseInt(o,10):0,u=i?parseInt(i,10):0;return{x:e.left+a,y:e.top+s,width:e.width-a-u,height:e.height-s-l,left:e.left+a,right:e.right-u,top:e.top+s,bottom:e.bottom-l}}function k(e,t,n){n?e.getAttribute(t)!==n&&e.setAttribute(t,n):e.hasAttribute(t)&&e.removeAttribute(t)}function M(e,t,n=""){e.style[t]!==n&&(e.style[t]=n)}function W(e,t,n){n?e.classList.contains(t)||e.classList.add(t):e.classList.contains(t)&&e.classList.remove(t)}const N=Object(o.forwardRef)(({headerTitle:e,onClose:t,children:n,className:i,noArrow:s=!0,isAlternate:l,position:b="bottom right",range:h,focusOnMount:g="firstElement",anchorRef:v,shouldAnchorIncludePadding:w,anchorRect:E,getAnchorRect:y,expandOnMobile:L,animate:x=!0,onClickOutside:C,onFocusOutside:F,__unstableStickyBoundaryElement:R,__unstableSlotName:T="Popover",__unstableObserveElement:N,__unstableBoundaryParent:P,__unstableForcePosition:B,__unstableForceXAlignment:A,...H},V)=>{const z=Object(o.useRef)(null),U=Object(o.useRef)(null),I=Object(o.useRef)(),G=Object(u.useViewportMatch)("medium","<"),[q,X]=Object(o.useState)(),K=j(T),Q=L&&G,[Y,Z]=Object(u.useResizeObserver)();s=Q||s,Object(o.useLayoutEffect)(()=>{if(Q)return W(I.current,"is-without-arrow",s),W(I.current,"is-alternate",l),k(I.current,"data-x-axis"),k(I.current,"data-y-axis"),M(I.current,"top"),M(I.current,"left"),M(U.current,"maxHeight"),void M(U.current,"maxWidth");const e=()=>{if(!I.current||!U.current)return;let e=function(e,t,n,r=!1,o,i){if(t)return t;if(n){if(!e.current)return;const t=n(e.current);return m(t,t.ownerDocument||e.current.ownerDocument,i)}if(!1!==r){if(!(r&&window.Range&&window.Element&&window.DOMRect))return;if("function"==typeof(null==r?void 0:r.cloneRange))return m(Object(d.getRectangleFromRange)(r),r.endContainer.ownerDocument,i);if("function"==typeof(null==r?void 0:r.getBoundingClientRect)){const e=m(r.getBoundingClientRect(),r.ownerDocument,i);return o?e:D(e,r)}const{top:e,bottom:t}=r,n=e.getBoundingClientRect(),c=t.getBoundingClientRect(),s=m(new window.DOMRect(n.left,n.top,n.width,c.bottom-n.top),e.ownerDocument,i);return o?s:D(s,r)}if(!e.current)return;const{parentNode:c}=e.current,s=c.getBoundingClientRect();return o?s:D(s,c)}(z,E,y,v,w,I.current);if(!e)return;const{offsetParent:t,ownerDocument:n}=I.current;let r,o=0;if(t&&t!==n.body){const n=t.getBoundingClientRect();o=n.top,e=new window.DOMRect(e.left-n.left,e.top-n.top,e.width,e.height)}var i;P&&(r=null===(i=I.current.closest(".popover-slot"))||void 0===i?void 0:i.parentNode);const c=Z.height?Z:U.current.getBoundingClientRect(),{popoverTop:a,popoverLeft:u,xAxis:p,yAxis:h,contentHeight:g,contentWidth:O}=function(e,t,n="top",r,o,i,c,s,l){const[a,u="center",d]=n.split(" "),p=function(e,t,n,r,o,i,c,s){const{height:l}=t;if(o){const t=o.getBoundingClientRect().top+l-c;if(e.top<=t)return{yAxis:n,popoverTop:Math.min(e.bottom,t)}}let a=e.top+e.height/2;"bottom"===r?a=e.bottom:"top"===r&&(a=e.top);const u={popoverTop:a,contentHeight:(a-l/2>0?l/2:a)+(a+l/2>window.innerHeight?window.innerHeight-a:l/2)},d={popoverTop:e.top,contentHeight:e.top-10-l>0?l:e.top-10},p={popoverTop:e.bottom,contentHeight:e.bottom+10+l>window.innerHeight?window.innerHeight-10-e.bottom:l};let f,m=n,b=null;if(!o&&!s)if("middle"===n&&u.contentHeight===l)m="middle";else if("top"===n&&d.contentHeight===l)m="top";else if("bottom"===n&&p.contentHeight===l)m="bottom";else{m=d.contentHeight>p.contentHeight?"top":"bottom";const e="top"===m?d.contentHeight:p.contentHeight;b=e!==l?e:null}return f="middle"===m?u.popoverTop:"top"===m?d.popoverTop:p.popoverTop,{yAxis:m,popoverTop:f,contentHeight:b}}(e,t,a,d,r,0,i,s);return{...function(e,t,n,r,o,i,c,s,l){const{width:a}=t;"left"===n&&Object(f.isRTL)()?n="right":"right"===n&&Object(f.isRTL)()&&(n="left"),"left"===r&&Object(f.isRTL)()?r="right":"right"===r&&Object(f.isRTL)()&&(r="left");const u=Math.round(e.left+e.width/2),d={popoverLeft:u,contentWidth:(u-a/2>0?a/2:u)+(u+a/2>window.innerWidth?window.innerWidth-u:a/2)};let p=e.left;"right"===r?p=e.right:"middle"===i||l||(p=u);let m=e.right;"left"===r?m=e.left:"middle"===i||l||(m=u);const b={popoverLeft:p,contentWidth:p-a>0?a:p},h={popoverLeft:m,contentWidth:m+a>window.innerWidth?window.innerWidth-m:a};let g,O=n,v=null;if(!o&&!s)if("center"===n&&d.contentWidth===a)O="center";else if("left"===n&&b.contentWidth===a)O="left";else if("right"===n&&h.contentWidth===a)O="right";else{O=b.contentWidth>h.contentWidth?"left":"right";const e="left"===O?b.contentWidth:h.contentWidth;a>window.innerWidth&&(v=window.innerWidth),e!==a&&(O="center",d.popoverLeft=window.innerWidth/2)}if(g="center"===O?d.popoverLeft:"left"===O?b.popoverLeft:h.popoverLeft,c){const e=c.getBoundingClientRect();g=Math.min(g,e.right-a),Object(f.isRTL)()||(g=Math.max(g,0))}return{xAxis:O,popoverLeft:g,contentWidth:v}}(e,t,u,d,r,p.yAxis,c,s,l),...p}}(e,c,b,R,I.current,o,r,B,A);"number"==typeof a&&"number"==typeof u&&(M(I.current,"top",a+"px"),M(I.current,"left",u+"px")),W(I.current,"is-without-arrow",s||"center"===p&&"middle"===h),W(I.current,"is-alternate",l),k(I.current,"data-x-axis",p),k(I.current,"data-y-axis",h),M(U.current,"maxHeight","number"==typeof g?g+"px":""),M(U.current,"maxWidth","number"==typeof O?O+"px":""),X(({left:"right",right:"left"}[p]||"center")+" "+({top:"bottom",bottom:"top"}[h]||"middle"))};e();const{ownerDocument:t}=I.current,{defaultView:n}=t,r=n.setInterval(e,500);let o;const i=()=>{n.cancelAnimationFrame(o),o=n.requestAnimationFrame(e)};n.addEventListener("click",i),n.addEventListener("resize",e),n.addEventListener("scroll",e,!0);const c=function(e){if(e)return e.endContainer?e.endContainer.ownerDocument:e.top?e.top.ownerDocument:e.ownerDocument}(v);let a;return c&&c!==t&&(c.defaultView.addEventListener("resize",e),c.defaultView.addEventListener("scroll",e,!0)),N&&(a=new n.MutationObserver(e),a.observe(N,{attributes:!0})),()=>{n.clearInterval(r),n.removeEventListener("resize",e),n.removeEventListener("scroll",e,!0),n.removeEventListener("click",i),n.cancelAnimationFrame(o),c&&c!==t&&(c.defaultView.removeEventListener("resize",e),c.defaultView.removeEventListener("scroll",e,!0)),a&&a.disconnect()}},[Q,E,y,v,w,b,Z,R,N,P]);const $=(e,n)=>{if("focus-outside"===e&&F)F(n);else if("focus-outside"===e&&C){const e=new window.MouseEvent("click");Object.defineProperty(e,"target",{get:()=>n.relatedTarget}),a()("Popover onClickOutside prop",{since:"5.3",alternative:"onFocusOutside"}),C(e)}else t&&t()},[ee,te]=Object(u.__experimentalUseDialog)({focusOnMount:g,__unstableOnClose:$,onClose:$}),ne=Object(u.useMergeRefs)([I,ee,V]),re=Boolean(x&&q)&&function(e){if("loading"===e.type)return c()("components-animate__loading");const{type:t,origin:n=_(t)}=e;if("appear"===t){const[e,t="center"]=n.split(" ");return c()("components-animate__appear",{["is-from-"+t]:"center"!==t,["is-from-"+e]:"middle"!==e})}return"slide-in"===t?c()("components-animate__slide-in","is-from-"+n):void 0}({type:"appear",origin:q});let oe=Object(o.createElement)("div",Object(r.a)({className:c()("components-popover",i,re,{"is-expanded":Q,"is-without-arrow":s,"is-alternate":l})},H,{ref:ne},te,{tabIndex:"-1"}),Q&&Object(o.createElement)(O,null),Q&&Object(o.createElement)("div",{className:"components-popover__header"},Object(o.createElement)("span",{className:"components-popover__header-title"},e),Object(o.createElement)(J,{className:"components-popover__close",icon:p.a,onClick:t})),Object(o.createElement)("div",{ref:U,className:"components-popover__content"},Object(o.createElement)("div",{style:{position:"relative"}},Y,n)));return K.ref&&(oe=Object(o.createElement)(S,{name:T},oe)),v||E?oe:Object(o.createElement)("span",{ref:z},oe)});N.Slot=Object(o.forwardRef)((function({name:e="Popover"},t){return Object(o.createElement)(T,{bubblesVirtually:!0,name:e,className:"popover-slot",ref:t})}));var P=N,B=function({shortcut:e,className:t}){if(!e)return null;let n,r;return Object(s.isString)(e)&&(n=e),Object(s.isObject)(e)&&(n=e.display,r=e.ariaLabel),Object(o.createElement)("span",{className:t,"aria-label":r},n)};const A=Object(o.createElement)("div",{className:"event-catcher"}),H=({eventHandlers:e,child:t,childrenWithPopover:n})=>Object(o.cloneElement)(Object(o.createElement)("span",{className:"disabled-element-wrapper"},Object(o.cloneElement)(A,e),Object(o.cloneElement)(t,{children:n}),","),e),V=({child:e,eventHandlers:t,childrenWithPopover:n})=>Object(o.cloneElement)(e,{...t,children:n}),z=(e,t,n)=>{if(1!==o.Children.count(e))return;const r=o.Children.only(e);"function"==typeof r.props[t]&&r.props[t](n)};var U=function({children:e,position:t,text:n,shortcut:r}){const[i,c]=Object(o.useState)(!1),[l,a]=Object(o.useState)(!1),d=Object(u.useDebounce)(a,700),p=t=>{z(e,"onMouseDown",t),document.addEventListener("mouseup",b),c(!0)},f=t=>{z(e,"onMouseUp",t),document.removeEventListener("mouseup",b),c(!1)},m=e=>"mouseUp"===e?f:"mouseDown"===e?p:void 0,b=m("mouseUp"),h=(t,n)=>r=>{if(z(e,t,r),r.currentTarget.disabled)return;if("focus"===r.type&&i)return;d.cancel();const o=Object(s.includes)(["focus","mouseenter"],r.type);o!==l&&(n?d(o):a(o))},g=()=>{d.cancel(),document.removeEventListener("mouseup",b)};if(Object(o.useEffect)(()=>g,[]),1!==o.Children.count(e))return e;const O={onMouseEnter:h("onMouseEnter",!0),onMouseLeave:h("onMouseLeave"),onClick:h("onClick"),onFocus:h("onFocus"),onBlur:h("onBlur"),onMouseDown:m("mouseDown")},v=o.Children.only(e),{children:j,disabled:w}=v.props;return(w?H:V)({child:v,eventHandlers:O,childrenWithPopover:(({grandchildren:e,isOver:t,position:n,text:r,shortcut:i})=>Object(o.concatChildren)(e,t&&Object(o.createElement)(P,{focusOnMount:!1,position:n,className:"components-tooltip","aria-hidden":"true",animate:!1,noArrow:!0},r,Object(o.createElement)(B,{className:"components-tooltip__shortcut",shortcut:i}))))({grandchildren:j,isOver:l,position:t,text:n,shortcut:r})})},I=n(43),G=n(37);const q=["onMouseDown","onClick"];var J=t.a=Object(o.forwardRef)((function(e,t){const{href:n,target:i,isSmall:l,isPressed:u,isBusy:d,isDestructive:p,className:f,disabled:m,icon:b,iconPosition:h="left",iconSize:g,showTooltip:O,tooltipPosition:v,shortcut:j,label:w,children:E,text:y,variant:L,__experimentalIsFocusable:x,describedBy:C,...F}=function({isDefault:e,isPrimary:t,isSecondary:n,isTertiary:r,isLink:o,variant:i,...c}){let s=i;var l,u,d,p,f;return t&&(null!==(l=s)&&void 0!==l||(s="primary")),r&&(null!==(u=s)&&void 0!==u||(s="tertiary")),n&&(null!==(d=s)&&void 0!==d||(s="secondary")),e&&(a()("Button isDefault prop",{since:"5.4",alternative:'variant="secondary"'}),null!==(p=s)&&void 0!==p||(s="secondary")),o&&(null!==(f=s)&&void 0!==f||(s="link")),{...c,variant:s}}(e),R=c()("components-button",f,{"is-secondary":"secondary"===L,"is-primary":"primary"===L,"is-small":l,"is-tertiary":"tertiary"===L,"is-pressed":u,"is-busy":d,"is-link":"link"===L,"is-destructive":p,"has-text":!!b&&!!E,"has-icon":!!b}),S=m&&!x,T=void 0===n||S?"button":"a",_="a"===T?{href:n,target:i}:{type:"button",disabled:S,"aria-pressed":u};if(m&&x){_["aria-disabled"]=!0;for(const e of q)F[e]=e=>{e.stopPropagation(),e.preventDefault()}}const D=!S&&(O&&w||j||!!w&&(!E||Object(s.isArray)(E)&&!E.length)&&!1!==O),k=C?Object(s.uniqueId)():null,M=F["aria-describedby"]||k,W=Object(o.createElement)(T,Object(r.a)({},_,F,{className:R,"aria-label":F["aria-label"]||w,"aria-describedby":M,ref:t}),b&&"left"===h&&Object(o.createElement)(I.a,{icon:b,size:g}),y&&Object(o.createElement)(o.Fragment,null,y),b&&"right"===h&&Object(o.createElement)(I.a,{icon:b,size:g}),E);return D?Object(o.createElement)(o.Fragment,null,Object(o.createElement)(U,{text:C||w,shortcut:j,position:v},W),C&&Object(o.createElement)(G.a,null,Object(o.createElement)("span",{id:k},C))):Object(o.createElement)(o.Fragment,null,W,C&&Object(o.createElement)(G.a,null,Object(o.createElement)("span",{id:k},C)))}))},65:function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:c}catch(e){r=c}}();var l,a=[],u=!1,d=-1;function p(){u&&l&&(u=!1,l.length?a=l.concat(a):d=-1,a.length&&f())}function f(){if(!u){var e=s(p);u=!0;for(var t=a.length;t;){for(l=a,a=[];++d<t;)l&&l[d].run();d=-1,t=a.length}l=null,u=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===c||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function b(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];a.push(new m(e,t)),1!==a.length||u||s(f)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=b,o.addListener=b,o.once=b,o.off=b,o.removeListener=b,o.removeAllListeners=b,o.emit=b,o.prependListener=b,o.prependOnceListener=b,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},9:function(e,t,n){"use strict";function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}n.d(t,"a",(function(){return r}))}}]);