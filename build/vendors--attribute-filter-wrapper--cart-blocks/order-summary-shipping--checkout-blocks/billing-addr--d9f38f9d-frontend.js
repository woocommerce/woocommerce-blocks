(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[2],{118:function(t,e,o){"use strict";var n=o(13),r=o(0),i=o(6),s=o.n(i);class c extends r.Component{constructor(){super(...arguments),this.onChange=this.onChange.bind(this),this.bindInput=this.bindInput.bind(this)}focus(){this.input.focus()}hasFocus(){return this.input===this.input.ownerDocument.activeElement}bindInput(t){this.input=t}onChange(t){this.props.onChange({value:t.target.value})}render(){const{value:t,isExpanded:e,instanceId:o,selectedSuggestionIndex:i,className:c,...l}=this.props,u=t?t.length+1:0;return Object(r.createElement)("input",Object(n.a)({ref:this.bindInput,id:"components-form-token-input-"+o,type:"text"},l,{value:t||"",onChange:this.onChange,size:u,className:s()(c,"components-form-token-field__input"),autoComplete:"off",role:"combobox","aria-expanded":e,"aria-autocomplete":"list","aria-owns":e?"components-form-token-suggestions-"+o:void 0,"aria-activedescendant":-1!==i?`components-form-token-suggestions-${o}-${i}`:void 0,"aria-describedby":"components-form-token-suggestions-howto-"+o}))}}e.a=c},119:function(t,e,o){"use strict";var n=o(0),r=o(8),i=o(127),s=o.n(i),c=o(6),l=o.n(c),u=o(9);class a extends n.Component{constructor(){super(...arguments),this.handleMouseDown=this.handleMouseDown.bind(this),this.bindList=this.bindList.bind(this)}componentDidUpdate(){this.props.selectedIndex>-1&&this.props.scrollIntoView&&this.list.children[this.props.selectedIndex]&&(this.scrollingIntoView=!0,s()(this.list.children[this.props.selectedIndex],this.list,{onlyScrollIfNeeded:!0}),this.props.setTimeout(()=>{this.scrollingIntoView=!1},100))}bindList(t){this.list=t}handleHover(t){return()=>{this.scrollingIntoView||this.props.onHover(t)}}handleClick(t){return()=>{this.props.onSelect(t)}}handleMouseDown(t){t.preventDefault()}computeSuggestionMatch(t){const e=this.props.displayTransform(this.props.match||"").toLocaleLowerCase();if(0===e.length)return null;const o=(t=this.props.displayTransform(t)).toLocaleLowerCase().indexOf(e);return{suggestionBeforeMatch:t.substring(0,o),suggestionMatch:t.substring(o,o+e.length),suggestionAfterMatch:t.substring(o+e.length)}}render(){return Object(n.createElement)("ul",{ref:this.bindList,className:"components-form-token-field__suggestions-list",id:"components-form-token-suggestions-"+this.props.instanceId,role:"listbox"},Object(r.map)(this.props.suggestions,(t,e)=>{const o=this.computeSuggestionMatch(t),r=l()("components-form-token-field__suggestion",{"is-selected":e===this.props.selectedIndex});return Object(n.createElement)("li",{id:`components-form-token-suggestions-${this.props.instanceId}-${e}`,role:"option",className:r,key:null!=t&&t.value?t.value:this.props.displayTransform(t),onMouseDown:this.handleMouseDown,onClick:this.handleClick(t),onMouseEnter:this.handleHover(t),"aria-selected":e===this.props.selectedIndex},o?Object(n.createElement)("span",{"aria-label":this.props.displayTransform(t)},o.suggestionBeforeMatch,Object(n.createElement)("strong",{className:"components-form-token-field__suggestion-match"},o.suggestionMatch),o.suggestionAfterMatch):this.props.displayTransform(t))}))}}a.defaultProps={match:"",onHover:()=>{},onSelect:()=>{},suggestions:Object.freeze([])},e.a=Object(u.withSafeTimeout)(a)},127:function(t,e,o){"use strict";t.exports=o(203)},203:function(t,e,o){"use strict";var n=o(204);t.exports=function(t,e,o){o=o||{},9===e.nodeType&&(e=n.getWindow(e));var r=o.allowHorizontalScroll,i=o.onlyScrollIfNeeded,s=o.alignWithTop,c=o.alignWithLeft,l=o.offsetTop||0,u=o.offsetLeft||0,a=o.offsetBottom||0,f=o.offsetRight||0;r=void 0===r||r;var p=n.isWindow(e),d=n.offset(t),h=n.outerHeight(t),v=n.outerWidth(t),m=void 0,g=void 0,w=void 0,b=void 0,y=void 0,T=void 0,L=void 0,O=void 0,x=void 0,S=void 0;p?(L=e,S=n.height(L),x=n.width(L),O={left:n.scrollLeft(L),top:n.scrollTop(L)},y={left:d.left-O.left-u,top:d.top-O.top-l},T={left:d.left+v-(O.left+x)+f,top:d.top+h-(O.top+S)+a},b=O):(m=n.offset(e),g=e.clientHeight,w=e.clientWidth,b={left:e.scrollLeft,top:e.scrollTop},y={left:d.left-(m.left+(parseFloat(n.css(e,"borderLeftWidth"))||0))-u,top:d.top-(m.top+(parseFloat(n.css(e,"borderTopWidth"))||0))-l},T={left:d.left+v-(m.left+w+(parseFloat(n.css(e,"borderRightWidth"))||0))+f,top:d.top+h-(m.top+g+(parseFloat(n.css(e,"borderBottomWidth"))||0))+a}),y.top<0||T.top>0?!0===s?n.scrollTop(e,b.top+y.top):!1===s?n.scrollTop(e,b.top+T.top):y.top<0?n.scrollTop(e,b.top+y.top):n.scrollTop(e,b.top+T.top):i||((s=void 0===s||!!s)?n.scrollTop(e,b.top+y.top):n.scrollTop(e,b.top+T.top)),r&&(y.left<0||T.left>0?!0===c?n.scrollLeft(e,b.left+y.left):!1===c?n.scrollLeft(e,b.left+T.left):y.left<0?n.scrollLeft(e,b.left+y.left):n.scrollLeft(e,b.left+T.left):i||((c=void 0===c||!!c)?n.scrollLeft(e,b.left+y.left):n.scrollLeft(e,b.left+T.left)))}},204:function(t,e,o){"use strict";var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};function i(t,e){var o=t["page"+(e?"Y":"X")+"Offset"],n="scroll"+(e?"Top":"Left");if("number"!=typeof o){var r=t.document;"number"!=typeof(o=r.documentElement[n])&&(o=r.body[n])}return o}function s(t){return i(t)}function c(t){return i(t,!0)}function l(t){var e=function(t){var e,o=void 0,n=void 0,r=t.ownerDocument,i=r.body,s=r&&r.documentElement;return o=(e=t.getBoundingClientRect()).left,n=e.top,{left:o-=s.clientLeft||i.clientLeft||0,top:n-=s.clientTop||i.clientTop||0}}(t),o=t.ownerDocument,n=o.defaultView||o.parentWindow;return e.left+=s(n),e.top+=c(n),e}var u=new RegExp("^("+/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source+")(?!px)[a-z%]+$","i"),a=/^(top|right|bottom|left)$/,f="left",p=void 0;function d(t,e){for(var o=0;o<t.length;o++)e(t[o])}function h(t){return"border-box"===p(t,"boxSizing")}"undefined"!=typeof window&&(p=window.getComputedStyle?function(t,e,o){var n="",r=t.ownerDocument,i=o||r.defaultView.getComputedStyle(t,null);return i&&(n=i.getPropertyValue(e)||i[e]),n}:function(t,e){var o=t.currentStyle&&t.currentStyle[e];if(u.test(o)&&!a.test(e)){var n=t.style,r=n[f],i=t.runtimeStyle[f];t.runtimeStyle[f]=t.currentStyle[f],n[f]="fontSize"===e?"1em":o||0,o=n.pixelLeft+"px",n[f]=r,t.runtimeStyle[f]=i}return""===o?"auto":o});var v=["margin","border","padding"];function m(t,e,o){var n={},r=t.style,i=void 0;for(i in e)e.hasOwnProperty(i)&&(n[i]=r[i],r[i]=e[i]);for(i in o.call(t),e)e.hasOwnProperty(i)&&(r[i]=n[i])}function g(t,e,o){var n=0,r=void 0,i=void 0,s=void 0;for(i=0;i<e.length;i++)if(r=e[i])for(s=0;s<o.length;s++){var c;c="border"===r?r+o[s]+"Width":r+o[s],n+=parseFloat(p(t,c))||0}return n}function w(t){return null!=t&&t==t.window}var b={};function y(t,e,o){if(w(t))return"width"===e?b.viewportWidth(t):b.viewportHeight(t);if(9===t.nodeType)return"width"===e?b.docWidth(t):b.docHeight(t);var n="width"===e?["Left","Right"]:["Top","Bottom"],r="width"===e?t.offsetWidth:t.offsetHeight,i=(p(t),h(t)),s=0;(null==r||r<=0)&&(r=void 0,(null==(s=p(t,e))||Number(s)<0)&&(s=t.style[e]||0),s=parseFloat(s)||0),void 0===o&&(o=i?1:-1);var c=void 0!==r||i,l=r||s;if(-1===o)return c?l-g(t,["border","padding"],n):s;if(c){var u=2===o?-g(t,["border"],n):g(t,["margin"],n);return l+(1===o?0:u)}return s+g(t,v.slice(o),n)}d(["Width","Height"],(function(t){b["doc"+t]=function(e){var o=e.document;return Math.max(o.documentElement["scroll"+t],o.body["scroll"+t],b["viewport"+t](o))},b["viewport"+t]=function(e){var o="client"+t,n=e.document,r=n.body,i=n.documentElement[o];return"CSS1Compat"===n.compatMode&&i||r&&r[o]||i}}));var T={position:"absolute",visibility:"hidden",display:"block"};function L(t){var e=void 0,o=arguments;return 0!==t.offsetWidth?e=y.apply(void 0,o):m(t,T,(function(){e=y.apply(void 0,o)})),e}function O(t,e,o){var n=o;if("object"!==(void 0===e?"undefined":r(e)))return void 0!==n?("number"==typeof n&&(n+="px"),void(t.style[e]=n)):p(t,e);for(var i in e)e.hasOwnProperty(i)&&O(t,i,e[i])}d(["width","height"],(function(t){var e=t.charAt(0).toUpperCase()+t.slice(1);b["outer"+e]=function(e,o){return e&&L(e,t,o?0:1)};var o="width"===t?["Left","Right"]:["Top","Bottom"];b[t]=function(e,n){return void 0===n?e&&L(e,t,-1):e?(p(e),h(e)&&(n+=g(e,["padding","border"],o)),O(e,t,n)):void 0}})),t.exports=n({getWindow:function(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow},offset:function(t,e){if(void 0===e)return l(t);!function(t,e){"static"===O(t,"position")&&(t.style.position="relative");var o=l(t),n={},r=void 0,i=void 0;for(i in e)e.hasOwnProperty(i)&&(r=parseFloat(O(t,i))||0,n[i]=r+e[i]-o[i]);O(t,n)}(t,e)},isWindow:w,each:d,css:O,clone:function(t){var e={};for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);if(t.overflow)for(var o in t)t.hasOwnProperty(o)&&(e.overflow[o]=t.overflow[o]);return e},scrollLeft:function(t,e){if(w(t)){if(void 0===e)return s(t);window.scrollTo(e,c(t))}else{if(void 0===e)return t.scrollLeft;t.scrollLeft=e}},scrollTop:function(t,e){if(w(t)){if(void 0===e)return c(t);window.scrollTo(s(t),e)}else{if(void 0===e)return t.scrollTop;t.scrollTop=e}},viewportWidth:0,viewportHeight:0},b)},208:function(t,e,o){"use strict";var n=o(0),r=o(10);const i=Object(n.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(n.createElement)(r.Path,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"}));e.a=i},86:function(t,e,o){"use strict";o.d(e,"a",(function(){return r}));var n=o(12);function r(t,e,o){var r=this,i=Object(n.useRef)(null),s=Object(n.useRef)(0),c=Object(n.useRef)(null),l=Object(n.useRef)([]),u=Object(n.useRef)(),a=Object(n.useRef)(),f=Object(n.useRef)(t),p=Object(n.useRef)(!0);f.current=t;var d=!e&&0!==e&&"undefined"!=typeof window;if("function"!=typeof t)throw new TypeError("Expected a function");e=+e||0;var h=!!(o=o||{}).leading,v=!("trailing"in o)||!!o.trailing,m="maxWait"in o,g=m?Math.max(+o.maxWait||0,e):null;return Object(n.useEffect)((function(){return p.current=!0,function(){p.current=!1}}),[]),Object(n.useMemo)((function(){var t=function(t){var e=l.current,o=u.current;return l.current=u.current=null,s.current=t,a.current=f.current.apply(o,e)},o=function(t,e){d&&cancelAnimationFrame(c.current),c.current=d?requestAnimationFrame(t):setTimeout(t,e)},n=function(t){if(!p.current)return!1;var o=t-i.current,n=t-s.current;return!i.current||o>=e||o<0||m&&n>=g},w=function(e){return c.current=null,v&&l.current?t(e):(l.current=u.current=null,a.current)},b=function(){var t=Date.now();if(n(t))return w(t);if(p.current){var r=t-i.current,c=t-s.current,l=e-r,u=m?Math.min(l,g-c):l;o(b,u)}},y=function(){for(var f=[],d=0;d<arguments.length;d++)f[d]=arguments[d];var v=Date.now(),g=n(v);if(l.current=f,u.current=r,i.current=v,g){if(!c.current&&p.current)return s.current=i.current,o(b,e),h?t(i.current):a.current;if(m)return o(b,e),t(i.current)}return c.current||o(b,e),a.current};return y.cancel=function(){c.current&&(d?cancelAnimationFrame(c.current):clearTimeout(c.current)),s.current=0,l.current=i.current=u.current=c.current=null},y.isPending=function(){return!!c.current},y.flush=function(){return c.current?w(Date.now()):a.current},y}),[h,m,e,g,v,d])}}}]);