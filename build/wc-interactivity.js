(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{navigate:()=>Ee,store:()=>re});var n,r,o,i,_,s,u,c,l,a={},f=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,p=Array.isArray;function d(t,e){for(var n in e)t[n]=e[n];return t}function v(t){var e=t.parentNode;e&&e.removeChild(t)}function y(t,e,r){var o,i,_,s={};for(_ in e)"key"==_?o=e[_]:"ref"==_?i=e[_]:s[_]=e[_];if(arguments.length>2&&(s.children=arguments.length>3?n.call(arguments,2):r),"function"==typeof t&&null!=t.defaultProps)for(_ in t.defaultProps)void 0===s[_]&&(s[_]=t.defaultProps[_]);return g(t,s,o,i,null)}function g(t,e,n,i,_){var s={type:t,props:e,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==_?++o:_};return null==_&&null!=r.vnode&&r.vnode(s),s}function m(t){return t.children}function b(t,e){this.props=t,this.context=e}function w(t,e){if(null==e)return t.__?w(t.__,t.__.__k.indexOf(t)+1):null;for(var n;e<t.__k.length;e++)if(null!=(n=t.__k[e])&&null!=n.__e)return n.__e;return"function"==typeof t.type?w(t):null}function k(t){var e,n;if(null!=(t=t.__)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(n=t.__k[e])&&null!=n.__e){t.__e=t.__c.base=n.__e;break}return k(t)}}function x(t){(!t.__d&&(t.__d=!0)&&_.push(t)&&!S.__r++||s!==r.debounceRendering)&&((s=r.debounceRendering)||u)(S)}function S(){var t,e,n,r,o,i,s,u,l;for(_.sort(c);t=_.shift();)t.__d&&(e=_.length,r=void 0,o=void 0,i=void 0,u=(s=(n=t).__v).__e,(l=n.__P)&&(r=[],o=[],(i=d({},s)).__v=s.__v+1,N(l,s,i,n.__n,void 0!==l.ownerSVGElement,null!=s.__h?[u]:null,r,null==u?w(s):u,s.__h,o),j(r,s,o),s.__e!=u&&k(s)),_.length>e&&_.sort(c));S.__r=0}function $(t,e,n,r,o,i,_,s,u,c,l){var h,d,v,y,b,k,x,S,$,O=0,T=r&&r.__k||f,A=T.length,H=A,j=e.length;for(n.__k=[],h=0;h<j;h++)null!=(y=n.__k[h]=null==(y=e[h])||"boolean"==typeof y||"function"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?g(null,y,null,null,y):p(y)?g(m,{children:y},null,null,null):y.__b>0?g(y.type,y.props,y.key,y.ref?y.ref:null,y.__v):y)?(y.__=n,y.__b=n.__b+1,-1===(S=C(y,T,x=h+O,H))?v=a:(v=T[S]||a,T[S]=void 0,H--),N(t,y,v,o,i,_,s,u,c,l),b=y.__e,(d=y.ref)&&v.ref!=d&&(v.ref&&M(v.ref,null,y),l.push(d,y.__c||b,y)),null!=b&&(null==k&&(k=b),($=v===a||null===v.__v)?-1==S&&O--:S!==x&&(S===x+1?O++:S>x?H>j-x?O+=S-x:O--:O=S<x&&S==x-1?S-x:0),x=h+O,"function"!=typeof y.type||S===x&&v.__k!==y.__k?"function"==typeof y.type||S===x&&!$?void 0!==y.__d?(u=y.__d,y.__d=void 0):u=b.nextSibling:u=E(t,b,u):u=P(y,u,t),"function"==typeof n.type&&(n.__d=u))):(v=T[h])&&null==v.key&&v.__e&&(v.__e==u&&(u=w(v)),L(v,v,!1),T[h]=null);for(n.__e=k,h=A;h--;)null!=T[h]&&("function"==typeof n.type&&null!=T[h].__e&&T[h].__e==n.__d&&(n.__d=T[h].__e.nextSibling),L(T[h],T[h]))}function P(t,e,n){for(var r,o=t.__k,i=0;o&&i<o.length;i++)(r=o[i])&&(r.__=t,e="function"==typeof r.type?P(r,e,n):E(n,r.__e,e));return e}function E(t,e,n){return null==n||n.parentNode!==t?t.insertBefore(e,null):e==n&&null!=e.parentNode||t.insertBefore(e,n),e.nextSibling}function C(t,e,n,r){var o=t.key,i=t.type,_=n-1,s=n+1,u=e[n];if(null===u||u&&o==u.key&&i===u.type)return n;if(r>(null!=u?1:0))for(;_>=0||s<e.length;){if(_>=0){if((u=e[_])&&o==u.key&&i===u.type)return _;_--}if(s<e.length){if((u=e[s])&&o==u.key&&i===u.type)return s;s++}}return-1}function O(t,e,n){"-"===e[0]?t.setProperty(e,null==n?"":n):t[e]=null==n?"":"number"!=typeof n||h.test(e)?n:n+"px"}function T(t,e,n,r,o){var i;t:if("style"===e)if("string"==typeof n)t.style.cssText=n;else{if("string"==typeof r&&(t.style.cssText=r=""),r)for(e in r)n&&e in n||O(t.style,e,"");if(n)for(e in n)r&&n[e]===r[e]||O(t.style,e,n[e])}else if("o"===e[0]&&"n"===e[1])i=e!==(e=e.replace(/(PointerCapture)$|Capture$/,"$1")),e=e.toLowerCase()in t?e.toLowerCase().slice(2):e.slice(2),t.l||(t.l={}),t.l[e+i]=n,n?r||t.addEventListener(e,i?H:A,i):t.removeEventListener(e,i?H:A,i);else if("dangerouslySetInnerHTML"!==e){if(o)e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==e&&"height"!==e&&"href"!==e&&"list"!==e&&"form"!==e&&"tabIndex"!==e&&"download"!==e&&"rowSpan"!==e&&"colSpan"!==e&&e in t)try{t[e]=null==n?"":n;break t}catch(t){}"function"==typeof n||(null==n||!1===n&&"-"!==e[4]?t.removeAttribute(e):t.setAttribute(e,n))}}function A(t){return this.l[t.type+!1](r.event?r.event(t):t)}function H(t){return this.l[t.type+!0](r.event?r.event(t):t)}function N(t,e,n,o,i,_,s,u,c,l){var a,f,h,v,y,g,w,k,x,S,P,E,C,O,T,A=e.type;if(void 0!==e.constructor)return null;null!=n.__h&&(c=n.__h,u=e.__e=n.__e,e.__h=null,_=[u]),(a=r.__b)&&a(e);t:if("function"==typeof A)try{if(k=e.props,x=(a=A.contextType)&&o[a.__c],S=a?x?x.props.value:a.__:o,n.__c?w=(f=e.__c=n.__c).__=f.__E:("prototype"in A&&A.prototype.render?e.__c=f=new A(k,S):(e.__c=f=new b(k,S),f.constructor=A,f.render=W),x&&x.sub(f),f.props=k,f.state||(f.state={}),f.context=S,f.__n=o,h=f.__d=!0,f.__h=[],f._sb=[]),null==f.__s&&(f.__s=f.state),null!=A.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=d({},f.__s)),d(f.__s,A.getDerivedStateFromProps(k,f.__s))),v=f.props,y=f.state,f.__v=e,h)null==A.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==A.getDerivedStateFromProps&&k!==v&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(k,S),!f.__e&&(null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(k,f.__s,S)||e.__v===n.__v)){for(e.__v!==n.__v&&(f.props=k,f.state=f.__s,f.__d=!1),e.__e=n.__e,e.__k=n.__k,e.__k.forEach((function(t){t&&(t.__=e)})),P=0;P<f._sb.length;P++)f.__h.push(f._sb[P]);f._sb=[],f.__h.length&&s.push(f);break t}null!=f.componentWillUpdate&&f.componentWillUpdate(k,f.__s,S),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(v,y,g)}))}if(f.context=S,f.props=k,f.__P=t,f.__e=!1,E=r.__r,C=0,"prototype"in A&&A.prototype.render){for(f.state=f.__s,f.__d=!1,E&&E(e),a=f.render(f.props,f.state,f.context),O=0;O<f._sb.length;O++)f.__h.push(f._sb[O]);f._sb=[]}else do{f.__d=!1,E&&E(e),a=f.render(f.props,f.state,f.context),f.state=f.__s}while(f.__d&&++C<25);f.state=f.__s,null!=f.getChildContext&&(o=d(d({},o),f.getChildContext())),h||null==f.getSnapshotBeforeUpdate||(g=f.getSnapshotBeforeUpdate(v,y)),$(t,p(T=null!=a&&a.type===m&&null==a.key?a.props.children:a)?T:[T],e,n,o,i,_,s,u,c,l),f.base=e.__e,e.__h=null,f.__h.length&&s.push(f),w&&(f.__E=f.__=null)}catch(t){e.__v=null,(c||null!=_)&&(e.__e=u,e.__h=!!c,_[_.indexOf(u)]=null),r.__e(t,e,n)}else null==_&&e.__v===n.__v?(e.__k=n.__k,e.__e=n.__e):e.__e=U(n.__e,e,n,o,i,_,s,c,l);(a=r.diffed)&&a(e)}function j(t,e,n){for(var o=0;o<n.length;o++)M(n[o],n[++o],n[++o]);r.__c&&r.__c(e,t),t.some((function(e){try{t=e.__h,e.__h=[],t.some((function(t){t.call(e)}))}catch(t){r.__e(t,e.__v)}}))}function U(t,e,r,o,i,_,s,u,c){var l,f,h,d=r.props,y=e.props,g=e.type,m=0;if("svg"===g&&(i=!0),null!=_)for(;m<_.length;m++)if((l=_[m])&&"setAttribute"in l==!!g&&(g?l.localName===g:3===l.nodeType)){t=l,_[m]=null;break}if(null==t){if(null===g)return document.createTextNode(y);t=i?document.createElementNS("http://www.w3.org/2000/svg",g):document.createElement(g,y.is&&y),_=null,u=!1}if(null===g)d===y||u&&t.data===y||(t.data=y);else{if(_=_&&n.call(t.childNodes),f=(d=r.props||a).dangerouslySetInnerHTML,h=y.dangerouslySetInnerHTML,!u){if(null!=_)for(d={},m=0;m<t.attributes.length;m++)d[t.attributes[m].name]=t.attributes[m].value;(h||f)&&(h&&(f&&h.__html==f.__html||h.__html===t.innerHTML)||(t.innerHTML=h&&h.__html||""))}if(function(t,e,n,r,o){var i;for(i in n)"children"===i||"key"===i||i in e||T(t,i,null,n[i],r);for(i in e)o&&"function"!=typeof e[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===e[i]||T(t,i,e[i],n[i],r)}(t,y,d,i,u),h)e.__k=[];else if($(t,p(m=e.props.children)?m:[m],e,r,o,i&&"foreignObject"!==g,_,s,_?_[0]:r.__k&&w(r,0),u,c),null!=_)for(m=_.length;m--;)null!=_[m]&&v(_[m]);u||("value"in y&&void 0!==(m=y.value)&&(m!==t.value||"progress"===g&&!m||"option"===g&&m!==d.value)&&T(t,"value",m,d.value,!1),"checked"in y&&void 0!==(m=y.checked)&&m!==t.checked&&T(t,"checked",m,d.checked,!1))}return t}function M(t,e,n){try{"function"==typeof t?t(e):t.current=e}catch(t){r.__e(t,n)}}function L(t,e,n){var o,i;if(r.unmount&&r.unmount(t),(o=t.ref)&&(o.current&&o.current!==t.__e||M(o,null,e)),null!=(o=t.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(t){r.__e(t,e)}o.base=o.__P=null,t.__c=void 0}if(o=t.__k)for(i=0;i<o.length;i++)o[i]&&L(o[i],e,n||"function"!=typeof t.type);n||null==t.__e||v(t.__e),t.__=t.__e=t.__d=void 0}function W(t,e,n){return this.constructor(t,n)}function D(t,e,o){var i,_,s,u;r.__&&r.__(t,e),_=(i="function"==typeof o)?null:o&&o.__k||e.__k,s=[],u=[],N(e,t=(!i&&o||e).__k=y(m,null,[t]),_||a,a,void 0!==e.ownerSVGElement,!i&&o?[o]:_?null:e.firstChild?n.call(e.childNodes):null,s,!i&&o?o:_?_.__e:e.firstChild,i,u),j(s,t,u)}function F(t,e){D(t,e,F)}n=f.slice,r={__e:function(t,e,n,r){for(var o,i,_;e=e.__;)if((o=e.__c)&&!o.__)try{if((i=o.constructor)&&null!=i.getDerivedStateFromError&&(o.setState(i.getDerivedStateFromError(t)),_=o.__d),null!=o.componentDidCatch&&(o.componentDidCatch(t,r||{}),_=o.__d),_)return o.__E=o}catch(e){t=e}throw t}},o=0,i=function(t){return null!=t&&void 0===t.constructor},b.prototype.setState=function(t,e){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=d({},this.state),"function"==typeof t&&(t=t(d({},n),this.props)),t&&d(n,t),null!=t&&this.__v&&(e&&this._sb.push(e),x(this))},b.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),x(this))},b.prototype.render=m,_=[],u="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,c=function(t,e){return t.__v.__b-e.__v.__b},S.__r=0,l=0;var R,V,q,B,I=0,z=[],G=[],J=r.__b,K=r.__r,Q=r.diffed,X=r.__c,Y=r.unmount;function Z(t,e){r.__h&&r.__h(V,t,I||e),I=0;var n=V.__H||(V.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({__V:G}),n.__[t]}function tt(t,e){var n=Z(R++,3);!r.__s&&ct(n.__H,e)&&(n.__=t,n.i=e,V.__H.__h.push(n))}function et(t){return I=5,nt((function(){return{current:t}}),[])}function nt(t,e){var n=Z(R++,7);return ct(n.__H,e)?(n.__V=t(),n.i=e,n.__h=t,n.__V):n.__}function rt(t){var e=V.context[t.__c],n=Z(R++,9);return n.c=t,e?(null==n.__&&(n.__=!0,e.sub(V)),e.props.value):t.__}function ot(){for(var t;t=z.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(st),t.__H.__h.forEach(ut),t.__H.__h=[]}catch(e){t.__H.__h=[],r.__e(e,t.__v)}}r.__b=function(t){V=null,J&&J(t)},r.__r=function(t){K&&K(t),R=0;var e=(V=t.__c).__H;e&&(q===V?(e.__h=[],V.__h=[],e.__.forEach((function(t){t.__N&&(t.__=t.__N),t.__V=G,t.__N=t.i=void 0}))):(e.__h.forEach(st),e.__h.forEach(ut),e.__h=[],R=0)),q=V},r.diffed=function(t){Q&&Q(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(1!==z.push(e)&&B===r.requestAnimationFrame||((B=r.requestAnimationFrame)||_t)(ot)),e.__H.__.forEach((function(t){t.i&&(t.__H=t.i),t.__V!==G&&(t.__=t.__V),t.i=void 0,t.__V=G}))),q=V=null},r.__c=function(t,e){e.some((function(t){try{t.__h.forEach(st),t.__h=t.__h.filter((function(t){return!t.__||ut(t)}))}catch(n){e.some((function(t){t.__h&&(t.__h=[])})),e=[],r.__e(n,t.__v)}})),X&&X(t,e)},r.unmount=function(t){Y&&Y(t);var e,n=t.__c;n&&n.__H&&(n.__H.__.forEach((function(t){try{st(t)}catch(t){e=t}})),n.__H=void 0,e&&r.__e(e,n.__v))};var it="function"==typeof requestAnimationFrame;function _t(t){var e,n=function(){clearTimeout(r),it&&cancelAnimationFrame(e),setTimeout(t)},r=setTimeout(n,100);it&&(e=requestAnimationFrame(n))}function st(t){var e=V,n=t.__c;"function"==typeof n&&(t.__c=void 0,n()),V=e}function ut(t){var e=V;t.__c=t.__(),V=e}function ct(t,e){return!t||t.length!==e.length||e.some((function(e,n){return e!==t[n]}))}function lt(){throw new Error("Cycle detected")}function at(){if(dt>1)dt--;else{for(var t,e=!1;void 0!==pt;){var n=pt;for(pt=void 0,vt++;void 0!==n;){var r=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&wt(n))try{n.c()}catch(n){e||(t=n,e=!0)}n=r}}if(vt=0,dt--,e)throw t}}var ft,ht=void 0,pt=void 0,dt=0,vt=0,yt=0;function gt(t){if(void 0!==ht){var e=t.n;if(void 0===e||e.t!==ht)return e={i:0,S:t,p:ht.s,n:void 0,t:ht,e:void 0,x:void 0,r:e},void 0!==ht.s&&(ht.s.n=e),ht.s=e,t.n=e,32&ht.f&&t.S(e),e;if(-1===e.i)return e.i=0,void 0!==e.n&&(e.n.p=e.p,void 0!==e.p&&(e.p.n=e.n),e.p=ht.s,e.n=void 0,ht.s.n=e,ht.s=e),e}}function mt(t){this.v=t,this.i=0,this.n=void 0,this.t=void 0}function bt(t){return new mt(t)}function wt(t){for(var e=t.s;void 0!==e;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function kt(t){for(var e=t.s;void 0!==e;e=e.n){var n=e.S.n;if(void 0!==n&&(e.r=n),e.S.n=e,e.i=-1,void 0===e.n){t.s=e;break}}}function xt(t){for(var e=t.s,n=void 0;void 0!==e;){var r=e.p;-1===e.i?(e.S.U(e),void 0!==r&&(r.n=e.n),void 0!==e.n&&(e.n.p=r)):n=e,e.S.n=e.r,void 0!==e.r&&(e.r=void 0),e=r}t.s=n}function St(t){mt.call(this,void 0),this.x=t,this.s=void 0,this.g=yt-1,this.f=4}function $t(t){return new St(t)}function Pt(t){var e=t.u;if(t.u=void 0,"function"==typeof e){dt++;var n=ht;ht=void 0;try{e()}catch(e){throw t.f&=-2,t.f|=8,Et(t),e}finally{ht=n,at()}}}function Et(t){for(var e=t.s;void 0!==e;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,Pt(t)}function Ct(t){if(ht!==this)throw new Error("Out-of-order effect");xt(this),ht=t,this.f&=-2,8&this.f&&Et(this),at()}function Ot(t){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32}function Tt(t){var e=new Ot(t);try{e.c()}catch(t){throw e.d(),t}return e.d.bind(e)}function At(t,e){r[t]=e.bind(null,r[t]||function(){})}function Ht(t){ft&&ft(),ft=t&&t.S()}function Nt(t){var e=this,n=t.data,r=function(t){return nt((function(){return bt(t)}),[])}(n);r.value=n;var o=nt((function(){for(var t=e.__v;t=t.__;)if(t.__c){t.__c.__$f|=4;break}return e.__$u.c=function(){var t;i(o.peek())||3!==(null==(t=e.base)?void 0:t.nodeType)?(e.__$f|=1,e.setState({})):e.base.data=o.peek()},$t((function(){var t=r.value.value;return 0===t?0:!0===t?"":t||""}))}),[]);return o.value}function jt(t,e,n,r){var o=e in t&&void 0===t.ownerSVGElement,i=bt(n);return{o:function(t,e){i.value=t,r=e},d:Tt((function(){var n=i.value.value;r[e]!==n&&(r[e]=n,o?t[e]=n:n?t.setAttribute(e,n):t.removeAttribute(e))}))}}mt.prototype.h=function(){return!0},mt.prototype.S=function(t){this.t!==t&&void 0===t.e&&(t.x=this.t,void 0!==this.t&&(this.t.e=t),this.t=t)},mt.prototype.U=function(t){if(void 0!==this.t){var e=t.e,n=t.x;void 0!==e&&(e.x=n,t.e=void 0),void 0!==n&&(n.e=e,t.x=void 0),t===this.t&&(this.t=n)}},mt.prototype.subscribe=function(t){var e=this;return Tt((function(){var n=e.value,r=32&this.f;this.f&=-33;try{t(n)}finally{this.f|=r}}))},mt.prototype.valueOf=function(){return this.value},mt.prototype.toString=function(){return this.value+""},mt.prototype.toJSON=function(){return this.value},mt.prototype.peek=function(){return this.v},Object.defineProperty(mt.prototype,"value",{get:function(){var t=gt(this);return void 0!==t&&(t.i=this.i),this.v},set:function(t){if(ht instanceof St&&function(){throw new Error("Computed cannot have side-effects")}(),t!==this.v){vt>100&&lt(),this.v=t,this.i++,yt++,dt++;try{for(var e=this.t;void 0!==e;e=e.x)e.t.N()}finally{at()}}}}),(St.prototype=new mt).h=function(){if(this.f&=-3,1&this.f)return!1;if(32==(36&this.f))return!0;if(this.f&=-5,this.g===yt)return!0;if(this.g=yt,this.f|=1,this.i>0&&!wt(this))return this.f&=-2,!0;var t=ht;try{kt(this),ht=this;var e=this.x();(16&this.f||this.v!==e||0===this.i)&&(this.v=e,this.f&=-17,this.i++)}catch(t){this.v=t,this.f|=16,this.i++}return ht=t,xt(this),this.f&=-2,!0},St.prototype.S=function(t){if(void 0===this.t){this.f|=36;for(var e=this.s;void 0!==e;e=e.n)e.S.S(e)}mt.prototype.S.call(this,t)},St.prototype.U=function(t){if(void 0!==this.t&&(mt.prototype.U.call(this,t),void 0===this.t)){this.f&=-33;for(var e=this.s;void 0!==e;e=e.n)e.S.U(e)}},St.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;void 0!==t;t=t.x)t.t.N()}},St.prototype.peek=function(){if(this.h()||lt(),16&this.f)throw this.v;return this.v},Object.defineProperty(St.prototype,"value",{get:function(){1&this.f&&lt();var t=gt(this);if(this.h(),void 0!==t&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),Ot.prototype.c=function(){var t=this.S();try{if(8&this.f)return;if(void 0===this.x)return;var e=this.x();"function"==typeof e&&(this.u=e)}finally{t()}},Ot.prototype.S=function(){1&this.f&&lt(),this.f|=1,this.f&=-9,Pt(this),kt(this),dt++;var t=ht;return ht=this,Ct.bind(this,t)},Ot.prototype.N=function(){2&this.f||(this.f|=2,this.o=pt,pt=this)},Ot.prototype.d=function(){this.f|=8,1&this.f||Et(this)},Nt.displayName="_st",Object.defineProperties(mt.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:Nt},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}}),At("__b",(function(t,e){if("string"==typeof e.type){var n,r=e.props;for(var o in r)if("children"!==o){var i=r[o];i instanceof mt&&(n||(e.__np=n={}),n[o]=i,r[o]=i.peek())}}t(e)})),At("__r",(function(t,e){Ht();var n,r=e.__c;r&&(r.__$f&=-2,void 0===(n=r.__$u)&&(r.__$u=n=function(t){var e;return Tt((function(){e=this})),e.c=function(){r.__$f|=1,r.setState({})},e}())),Ht(n),t(e)})),At("__e",(function(t,e,n,r){Ht(),t(e,n,r)})),At("diffed",(function(t,e){var n;if(Ht(),"string"==typeof e.type&&(n=e.__e)){var r=e.__np,o=e.props;if(r){var i=n.U;if(i)for(var _ in i){var s=i[_];void 0===s||_ in r||(s.d(),i[_]=void 0)}else n.U=i={};for(var u in r){var c=i[u],l=r[u];void 0===c?(c=jt(n,u,l,o),i[u]=c):c.o(l,o)}}}t(e)})),At("unmount",(function(t,e){if("string"==typeof e.type){var n=e.__e;if(n){var r=n.U;if(r)for(var o in n.U=void 0,r){var i=r[o];i&&i.d()}}}else{var _=e.__c;if(_){var s=_.__$u;s&&(_.__$u=void 0,s.d())}}t(e)})),At("__h",(function(t,e,n,r){(r<3||9===r)&&(e.__$f|=2),t(e,n,r)})),b.prototype.shouldComponentUpdate=function(t,e){var n=this.__$u;if(!(n&&void 0!==n.s||4&this.__$f))return!0;if(3&this.__$f)return!0;for(var r in e)return!0;for(var o in t)if("__source"!==o&&t[o]!==this.props[o])return!0;for(var i in this.props)if(!(i in t))return!0;return!1};var Ut=new WeakMap,Mt=new WeakMap,Lt=new WeakMap,Wt=new WeakSet,Dt=new WeakMap,Ft=/^\$/,Rt=!1,Vt=function(t){if(!Xt(t))throw new Error("This object can't be observed.");return Mt.has(t)||Mt.set(t,Bt(t,Gt)),Mt.get(t)},qt=function(t,e){Rt=!0;var n=t[e];try{Rt=!1}catch(t){}return n},Bt=function(t,e){var n=new Proxy(t,e);return Wt.add(n),n},It=function(){throw new Error("Don't mutate the signals directly.")},zt=function(t){return function(e,n,r){var o;if(Rt)return Reflect.get(e,n,r);var i=t||"$"===n[0];if(!t&&i&&Array.isArray(e)){if("$"===n)return Lt.has(e)||Lt.set(e,Bt(e,Jt)),Lt.get(e);i="$length"===n}Ut.has(r)||Ut.set(r,new Map);var _=Ut.get(r),s=i?n.replace(Ft,""):n;if(_.has(s)||"function"!=typeof(null==(o=Object.getOwnPropertyDescriptor(e,s))?void 0:o.get)){var u=Reflect.get(e,s,r);if(i&&"function"==typeof u)return;if("symbol"==typeof s&&Kt.has(s))return u;_.has(s)||(Xt(u)&&(Mt.has(u)||Mt.set(u,Bt(u,Gt)),u=Mt.get(u)),_.set(s,bt(u)))}else _.set(s,$t((function(){return Reflect.get(e,s,r)})));return i?_.get(s):_.get(s).value}},Gt={get:zt(!1),set:function(t,e,n,r){Ut.has(r)||Ut.set(r,new Map);var o=Ut.get(r);if("$"===e[0]){n instanceof mt||It();var i=e.replace(Ft,"");return o.set(i,n),Reflect.set(t,i,n.peek(),r)}var _=n;Xt(n)&&(Mt.has(n)||Mt.set(n,Bt(n,Gt)),_=Mt.get(n));var s=!(e in t),u=Reflect.set(t,e,n,r);return o.has(e)?o.get(e).value=_:o.set(e,bt(_)),s&&Dt.has(t)&&Dt.get(t).value++,Array.isArray(t)&&o.has("length")&&(o.get("length").value=t.length),u},deleteProperty:function(t,e){"$"===e[0]&&It();var n=Ut.get(Mt.get(t)),r=Reflect.deleteProperty(t,e);return n&&n.has(e)&&(n.get(e).value=void 0),Dt.has(t)&&Dt.get(t).value++,r},ownKeys:function(t){return Dt.has(t)||Dt.set(t,bt(0)),Dt._=Dt.get(t).value,Reflect.ownKeys(t)}},Jt={get:zt(!0),set:It,deleteProperty:It},Kt=new Set(Object.getOwnPropertyNames(Symbol).map((function(t){return Symbol[t]})).filter((function(t){return"symbol"==typeof t}))),Qt=new Set([Object,Array]),Xt=function(t){return"object"==typeof t&&null!==t&&(!("function"==typeof t.constructor&&t.constructor.name in globalThis&&globalThis[t.constructor.name]===t.constructor)||Qt.has(t.constructor))&&!Wt.has(t)};const Yt=t=>t&&"object"==typeof t&&!Array.isArray(t),Zt=(t,e)=>{if(Yt(t)&&Yt(e))for(const n in e)Yt(e[n])?(t[n]||Object.assign(t,{[n]:{}}),Zt(t[n],e[n])):Object.assign(t,{[n]:e[n]})},te=new Set,ee=(()=>{const t=document.querySelector('script[type="application/json"]#wc-interactivity-store-data');if(!t)return{};try{const{state:e}=JSON.parse(t.textContent);if(Yt(e))return e;throw Error("Parsed state is not an object")}catch(t){console.log(t)}return{}})(),ne={state:Vt(ee)};"undefined"!=typeof window&&(window.store=ne);const re=({state:t,...e},{afterLoad:n}={})=>{Zt(ne,e),Zt(ee,t),n&&te.add(n)};var oe=0;function ie(t,e,n,o,i,_){var s,u,c={};for(u in e)"ref"==u?s=e[u]:c[u]=e[u];var l={type:t,props:c,key:n,ref:s,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--oe,__source:i,__self:_};if("function"==typeof t&&(s=t.defaultProps))for(u in s)void 0===c[u]&&(c[u]=s[u]);return r.vnode&&r.vnode(l),l}const _e=function(t,e){var n={__c:e="__cC"+l++,__:{},Consumer:function(t,e){return t.children(e)},Provider:function(t){var n,r;return this.getChildContext||(n=[],(r={})[e]=this,this.getChildContext=function(){return r},this.shouldComponentUpdate=function(t){this.props.value!==t.value&&n.some((function(t){t.__e=!0,x(t)}))},this.sub=function(t){n.push(t);var e=t.componentWillUnmount;t.componentWillUnmount=function(){n.splice(n.indexOf(t),1),e&&e.call(t)}}),t.children}};return n.Provider.__=n.Consumer.contextType=n}(),se={},ue={},ce=(t,e,{priority:n=10}={})=>{se[t]=e,ue[t]=n},le=({type:t,directives:e,props:n})=>{const r=et(null),o=y(t,{...n,ref:r}),i=nt((()=>(({ref:t}={})=>(e,n={})=>{const r="!"===e[0]&&!!(e=e.slice(1)),o=((t,e)=>{let n={...ne,context:e};return t.split(".").forEach((t=>n=n[t])),n})(e,n.context),i="function"==typeof o?o({ref:t.current,...ne,...n}):o;return r?!i:i})({ref:r})),[]),_=(t=>nt((()=>{const e=Object.entries(t).reduce(((t,[e,n])=>{const r=ue[e];return t[r]||(t[r]={}),t[r][e]=n,t}),{});return Object.entries(e).sort((([t],[e])=>t-e)).map((([,t])=>t))}),[t]))(e);return ie(ae,{directives:_,element:o,evaluate:i,originalProps:n})},ae=({directives:[t,...e],element:r,evaluate:o,originalProps:i})=>{r=function(t,e,r){var o,i,_,s,u=d({},t.props);for(_ in t.type&&t.type.defaultProps&&(s=t.type.defaultProps),e)"key"==_?o=e[_]:"ref"==_?i=e[_]:u[_]=void 0===e[_]&&void 0!==s?s[_]:e[_];return arguments.length>2&&(u.children=arguments.length>3?n.call(arguments,2):r),g(t.type,u,o||t.key,i||t.ref,null)}(r);const _=e.length>0?ie(ae,{directives:e,element:r,evaluate:o,originalProps:i}):r,s={...i,children:_},u={directives:t,props:s,element:r,context:_e,evaluate:o};for(const e in t){var c;const t=null===(c=se[e])||void 0===c?void 0:c.call(se,u);void 0!==t&&(s.children=t)}return s.children},fe=r.vnode;r.vnode=t=>{if(t.props.__directives){const e=t.props,n=e.__directives;n.key&&(t.props.key=n.key.default),delete e.__directives,t.props={type:t.type,directives:n,props:e},t.type=le}fe&&fe(t)};const he="wc",pe=`data-${he}-ignore`,de=`data-${he}-interactive`,ve=`data-${he}-`,ye=new RegExp(`^data-${he}-([a-z0-9]+(?:-[a-z0-9]+)*)(?:--([a-z0-9_-]+))?$`,"i"),ge=new WeakSet;function me(t){const e=document.createTreeWalker(t,205);return function t(n){const{attributes:r,nodeType:o}=n;if(3===o)return[n.data];if(4===o){const t=e.nextSibling();return n.replaceWith(new Text(n.nodeValue)),[n.nodeValue,t]}if(8===o||7===o){const t=e.nextSibling();return n.remove(),[null,t]}const i={},_=[],s={};let u=!1,c=!1,l=!1;for(let t=0;t<r.length;t++){const e=r[t].name;if(e[ve.length]&&e.slice(0,ve.length)===ve)if(e===pe)c=!0;else if(e===de)l=!0;else{u=!0;let n=r[t].value;try{n=JSON.parse(n)}catch(t){}const[,o,i]=ye.exec(e);s[o]=s[o]||{},s[o][i||"default"]=n}else if("ref"===e)continue;i[e]=r[t].value}if(c&&!l)return[y(n.localName,{...i,innerHTML:n.innerHTML,__directives:{ignore:!0}})];l&&ge.add(n),u&&(i.__directives=s);let a=e.firstChild();if(a){for(;a;){const[n,r]=t(a);n&&_.push(n),a=r||e.nextSibling()}e.parentNode()}return[y(n.localName,i,_)]}(e.currentNode)}const be=new Map,we=new WeakMap,ke=t=>(we.has(t)||we.set(t,((t,e)=>{const n=(e=[].concat(e))[e.length-1].nextSibling;function r(e,r){t.insertBefore(e,r||n)}return t.__k={nodeType:1,parentNode:t,firstChild:e[0],childNodes:e,insertBefore:r,appendChild:r,removeChild(e){t.removeChild(e)}}})(t.parentElement,t)),we.get(t)),xe=t=>{const e=new URL(t,window.location);return e.pathname+e.search},Se=t=>{const e={},n=`data-${he}-navigation-id`;return t.querySelectorAll(`[${n}]`).forEach((t=>{const r=t.getAttribute(n);e[r]=me(t)})),{regions:e}},$e=t=>{t=xe(t),be.has(t)||be.set(t,(async t=>{let e;try{const n=await window.fetch(t);if(200!==n.status)return!1;const r=await n.text();e=(new window.DOMParser).parseFromString(r,"text/html")}catch(t){return!1}return Se(e)})(t))},Pe=t=>{const e=`data-${he}-navigation-id`;document.querySelectorAll(`[${e}]`).forEach((n=>{const r=n.getAttribute(e),o=ke(n);D(t.regions[r],o)}))},Ee=async(t,{replace:e=!1}={})=>{const n=xe(t);$e(n);const r=await be.get(n);r?(Pe(r),window.history[e?"replaceState":"pushState"]({},"",t)):window.location.assign(t)};window.addEventListener("popstate",(async()=>{const t=xe(window.location),e=be.has(t)&&await be.get(t);e?Pe(e):window.location.reload()}));const Ce=t=>t&&"object"==typeof t&&!Array.isArray(t),Oe=(t,e)=>{for(const n in e)void 0===qt(t,n)?t[`$${n}`]=e[`$${n}`]:Ce(qt(t,n))&&Ce(qt(e,n))&&Oe(t[`$${n}`].peek(),e[`$${n}`].peek())};document.addEventListener("DOMContentLoaded",(async()=>{ce("context",(({directives:{context:{default:t}},props:{children:e},context:n})=>{const{Provider:r}=n,o=rt(n);return ie(r,{value:nt((()=>{const e=Vt(t);return Oe(e,o),e}),[t,o]),children:e})}),{priority:5}),ce("effect",(({directives:{effect:t},context:e,evaluate:n})=>{const r=rt(e);Object.values(t).forEach((t=>{!function(t){const e=et(t);e.current=t,tt((()=>{const t=function(t,e){let n;const r=Tt((function(){return n=this.c.bind(this),this.x=t,this.c=e,t()}));return{flush:n,dispose:r}}((()=>e.current()),(()=>function(t){const e=requestAnimationFrame((()=>{cancelAnimationFrame(e),setTimeout(t)}))}(t.flush)));return t.dispose}),[])}((()=>n(t,{context:r})))}))})),ce("layout-init",(({directives:{"layout-init":t},context:e,evaluate:n})=>{const o=rt(e);Object.values(t).forEach((t=>{!function(t,e){var n=Z(R++,4);!r.__s&&ct(n.__H,e)&&(n.__=t,n.i=e,V.__h.push(n))}((()=>n(t,{context:o})),[])}))})),ce("on",(({directives:{on:t},element:e,evaluate:n,context:r})=>{const o=rt(r);Object.entries(t).forEach((([t,r])=>{e.props[`on${t}`]=t=>{n(r,{event:t,context:o})}}))})),ce("class",(({directives:{class:t},element:e,evaluate:n,context:r})=>{const o=rt(r);Object.keys(t).filter((t=>"default"!==t)).forEach((r=>{const i=n(t[r],{className:r,context:o}),_=e.props.class||"",s=new RegExp(`(^|\\s)${r}(\\s|$)`,"g");i?s.test(_)||(e.props.class=_?`${_} ${r}`:r):e.props.class=_.replace(s," ").trim(),tt((()=>{i?e.ref.current.classList.add(r):e.ref.current.classList.remove(r)}),[])}))})),ce("bind",(({directives:{bind:t},element:e,context:n,evaluate:r})=>{const o=rt(n);Object.entries(t).filter((t=>"default"!==t)).forEach((([t,n])=>{const i=r(n,{context:o});e.props[t]=i,tt((()=>{!1===i&&"-"!==t[4]?e.ref.current.removeAttribute(t):e.ref.current.setAttribute(t,!0===i&&"-"!==t[4]?"":i)}),[])}))})),ce("navigation-link",(({directives:{"navigation-link":{default:t}},props:{href:e},element:n})=>{tt((()=>{null!=t&&t.prefetch&&$e(e)})),!1!==t&&(n.props.onclick=async n=>{n.preventDefault(),await Ee(e),"smooth"===(null==t?void 0:t.scroll)?window.scrollTo({top:0,left:0,behavior:"smooth"}):!1!==(null==t?void 0:t.scroll)&&window.scrollTo(0,0)})})),ce("show",(({directives:{show:{default:t}},element:e,evaluate:n,context:r})=>{n(t,{context:rt(r)})||(e.props.children=ie("template",{children:e.props.children}))})),ce("ignore",(({element:{type:t,props:{innerHTML:e,...n}}})=>ie(t,{dangerouslySetInnerHTML:{__html:nt((()=>e),[])},...n}))),ce("text",(({directives:{text:{default:t}},element:e,evaluate:n,context:r})=>{const o=rt(r);e.props.children=n(t,{context:o})})),await(async()=>{document.querySelectorAll(`[data-${he}-interactive]`).forEach((t=>{if(!ge.has(t)){const e=ke(t);F(me(t),e)}})),be.set(xe(window.location),Promise.resolve(Se(document)))})(),te.forEach((t=>t(ne)))})),(this.wc=this.wc||{}).__experimentalInteractivity=e})();