(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[88],{334:function(e,t,n){e.exports=function(){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,n){return(t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,n)}function n(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function r(e,o,a){return(r=n()?Reflect.construct:function(e,n,r){var o=[null];o.push.apply(o,n);var a=new(Function.bind.apply(e,o));return r&&t(a,r.prototype),a}).apply(null,arguments)}function o(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return a(e,void 0);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,void 0):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var i=Object.hasOwnProperty,l=Object.setPrototypeOf,c=Object.isFrozen,s=Object.getPrototypeOf,u=Object.getOwnPropertyDescriptor,m=Object.freeze,f=Object.seal,p=Object.create,d="undefined"!=typeof Reflect&&Reflect,h=d.apply,g=d.construct;h||(h=function(e,t,n){return e.apply(t,n)}),m||(m=function(e){return e}),f||(f=function(e){return e}),g||(g=function(e,t){return r(e,o(t))});var y,b=x(Array.prototype.forEach),v=x(Array.prototype.pop),T=x(Array.prototype.push),N=x(String.prototype.toLowerCase),E=x(String.prototype.match),A=x(String.prototype.replace),w=x(String.prototype.indexOf),_=x(String.prototype.trim),k=x(RegExp.prototype.test),S=(y=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return g(y,t)});function x(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return h(e,t,r)}}function O(e,t,n){n=n||N,l&&l(e,null);for(var r=t.length;r--;){var o=t[r];if("string"==typeof o){var a=n(o);a!==o&&(c(t)||(t[r]=a),o=a)}e[o]=!0}return e}function D(e){var t,n=p(null);for(t in e)h(i,e,[t])&&(n[t]=e[t]);return n}function R(e,t){for(;null!==e;){var n=u(e,t);if(n){if(n.get)return x(n.get);if("function"==typeof n.value)return x(n.value)}e=s(e)}return function(e){return console.warn("fallback value for",e),null}}var C=m(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),M=m(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),L=m(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),I=m(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),F=m(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),H=m(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),U=m(["#text"]),j=m(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),z=m(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),B=m(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),P=m(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),G=f(/\{\{[\w\W]*|[\w\W]*\}\}/gm),W=f(/<%[\w\W]*|[\w\W]*%>/gm),q=f(/^data-[\-\w.\u00B7-\uFFFF]/),Y=f(/^aria-[\-\w]+$/),K=f(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),V=f(/^(?:\w+script|data):/i),$=f(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),J=f(/^html$/i),X=function(){return"undefined"==typeof window?null:window},Z=function(t,n){if("object"!==e(t)||"function"!=typeof t.createPolicy)return null;var r=null;n.currentScript&&n.currentScript.hasAttribute("data-tt-policy-suffix")&&(r=n.currentScript.getAttribute("data-tt-policy-suffix"));var o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML:function(e){return e},createScriptURL:function(e){return e}})}catch(e){return console.warn("TrustedTypes policy "+o+" could not be created."),null}};return function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X(),r=function(e){return t(e)};if(r.version="2.4.0",r.removed=[],!n||!n.document||9!==n.document.nodeType)return r.isSupported=!1,r;var a=n.document,i=n.document,l=n.DocumentFragment,c=n.HTMLTemplateElement,s=n.Node,u=n.Element,f=n.NodeFilter,p=n.NamedNodeMap,d=void 0===p?n.NamedNodeMap||n.MozNamedAttrMap:p,h=n.HTMLFormElement,g=n.DOMParser,y=n.trustedTypes,x=u.prototype,Q=R(x,"cloneNode"),ee=R(x,"nextSibling"),te=R(x,"childNodes"),ne=R(x,"parentNode");if("function"==typeof c){var re=i.createElement("template");re.content&&re.content.ownerDocument&&(i=re.content.ownerDocument)}var oe=Z(y,a),ae=oe?oe.createHTML(""):"",ie=i,le=ie.implementation,ce=ie.createNodeIterator,se=ie.createDocumentFragment,ue=ie.getElementsByTagName,me=a.importNode,fe={};try{fe=D(i).documentMode?i.documentMode:{}}catch(e){}var pe={};r.isSupported="function"==typeof ne&&le&&void 0!==le.createHTMLDocument&&9!==fe;var de,he,ge=G,ye=W,be=q,ve=Y,Te=V,Ne=$,Ee=K,Ae=null,we=O({},[].concat(o(C),o(M),o(L),o(F),o(U))),_e=null,ke=O({},[].concat(o(j),o(z),o(B),o(P))),Se=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),xe=null,Oe=null,De=!0,Re=!0,Ce=!1,Me=!1,Le=!1,Ie=!1,Fe=!1,He=!1,Ue=!1,je=!1,ze=!0,Be=!1,Pe="user-content-",Ge=!0,We=!1,qe={},Ye=null,Ke=O({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ve=null,$e=O({},["audio","video","img","source","image","track"]),Je=null,Xe=O({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ze="http://www.w3.org/1998/Math/MathML",Qe="http://www.w3.org/2000/svg",et="http://www.w3.org/1999/xhtml",tt=et,nt=!1,rt=["application/xhtml+xml","text/html"],ot="text/html",at=null,it=i.createElement("form"),lt=function(e){return e instanceof RegExp||e instanceof Function},ct=function(t){at&&at===t||(t&&"object"===e(t)||(t={}),t=D(t),de=de=-1===rt.indexOf(t.PARSER_MEDIA_TYPE)?ot:t.PARSER_MEDIA_TYPE,he="application/xhtml+xml"===de?function(e){return e}:N,Ae="ALLOWED_TAGS"in t?O({},t.ALLOWED_TAGS,he):we,_e="ALLOWED_ATTR"in t?O({},t.ALLOWED_ATTR,he):ke,Je="ADD_URI_SAFE_ATTR"in t?O(D(Xe),t.ADD_URI_SAFE_ATTR,he):Xe,Ve="ADD_DATA_URI_TAGS"in t?O(D($e),t.ADD_DATA_URI_TAGS,he):$e,Ye="FORBID_CONTENTS"in t?O({},t.FORBID_CONTENTS,he):Ke,xe="FORBID_TAGS"in t?O({},t.FORBID_TAGS,he):{},Oe="FORBID_ATTR"in t?O({},t.FORBID_ATTR,he):{},qe="USE_PROFILES"in t&&t.USE_PROFILES,De=!1!==t.ALLOW_ARIA_ATTR,Re=!1!==t.ALLOW_DATA_ATTR,Ce=t.ALLOW_UNKNOWN_PROTOCOLS||!1,Me=t.SAFE_FOR_TEMPLATES||!1,Le=t.WHOLE_DOCUMENT||!1,He=t.RETURN_DOM||!1,Ue=t.RETURN_DOM_FRAGMENT||!1,je=t.RETURN_TRUSTED_TYPE||!1,Fe=t.FORCE_BODY||!1,ze=!1!==t.SANITIZE_DOM,Be=t.SANITIZE_NAMED_PROPS||!1,Ge=!1!==t.KEEP_CONTENT,We=t.IN_PLACE||!1,Ee=t.ALLOWED_URI_REGEXP||Ee,tt=t.NAMESPACE||et,t.CUSTOM_ELEMENT_HANDLING&&lt(t.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Se.tagNameCheck=t.CUSTOM_ELEMENT_HANDLING.tagNameCheck),t.CUSTOM_ELEMENT_HANDLING&&lt(t.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Se.attributeNameCheck=t.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),t.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof t.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(Se.allowCustomizedBuiltInElements=t.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Me&&(Re=!1),Ue&&(He=!0),qe&&(Ae=O({},o(U)),_e=[],!0===qe.html&&(O(Ae,C),O(_e,j)),!0===qe.svg&&(O(Ae,M),O(_e,z),O(_e,P)),!0===qe.svgFilters&&(O(Ae,L),O(_e,z),O(_e,P)),!0===qe.mathMl&&(O(Ae,F),O(_e,B),O(_e,P))),t.ADD_TAGS&&(Ae===we&&(Ae=D(Ae)),O(Ae,t.ADD_TAGS,he)),t.ADD_ATTR&&(_e===ke&&(_e=D(_e)),O(_e,t.ADD_ATTR,he)),t.ADD_URI_SAFE_ATTR&&O(Je,t.ADD_URI_SAFE_ATTR,he),t.FORBID_CONTENTS&&(Ye===Ke&&(Ye=D(Ye)),O(Ye,t.FORBID_CONTENTS,he)),Ge&&(Ae["#text"]=!0),Le&&O(Ae,["html","head","body"]),Ae.table&&(O(Ae,["tbody"]),delete xe.tbody),m&&m(t),at=t)},st=O({},["mi","mo","mn","ms","mtext"]),ut=O({},["foreignobject","desc","title","annotation-xml"]),mt=O({},["title","style","font","a","script"]),ft=O({},M);O(ft,L),O(ft,I);var pt=O({},F);O(pt,H);var dt=function(e){var t=ne(e);t&&t.tagName||(t={namespaceURI:et,tagName:"template"});var n=N(e.tagName),r=N(t.tagName);return e.namespaceURI===Qe?t.namespaceURI===et?"svg"===n:t.namespaceURI===Ze?"svg"===n&&("annotation-xml"===r||st[r]):Boolean(ft[n]):e.namespaceURI===Ze?t.namespaceURI===et?"math"===n:t.namespaceURI===Qe?"math"===n&&ut[r]:Boolean(pt[n]):e.namespaceURI===et&&!(t.namespaceURI===Qe&&!ut[r])&&!(t.namespaceURI===Ze&&!st[r])&&!pt[n]&&(mt[n]||!ft[n])},ht=function(e){T(r.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){try{e.outerHTML=ae}catch(t){e.remove()}}},gt=function(e,t){try{T(r.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){T(r.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!_e[e])if(He||Ue)try{ht(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},yt=function(e){var t,n;if(Fe)e="<remove></remove>"+e;else{var r=E(e,/^[\r\n\t ]+/);n=r&&r[0]}"application/xhtml+xml"===de&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");var o=oe?oe.createHTML(e):e;if(tt===et)try{t=(new g).parseFromString(o,de)}catch(e){}if(!t||!t.documentElement){t=le.createDocument(tt,"template",null);try{t.documentElement.innerHTML=nt?"":o}catch(e){}}var a=t.body||t.documentElement;return e&&n&&a.insertBefore(i.createTextNode(n),a.childNodes[0]||null),tt===et?ue.call(t,Le?"html":"body")[0]:Le?t.documentElement:a},bt=function(e){return ce.call(e.ownerDocument||e,e,f.SHOW_ELEMENT|f.SHOW_COMMENT|f.SHOW_TEXT,null,!1)},vt=function(e){return e instanceof h&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof d)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore)},Tt=function(t){return"object"===e(s)?t instanceof s:t&&"object"===e(t)&&"number"==typeof t.nodeType&&"string"==typeof t.nodeName},Nt=function(e,t,n){pe[e]&&b(pe[e],(function(e){e.call(r,t,n,at)}))},Et=function(e){var t;if(Nt("beforeSanitizeElements",e,null),vt(e))return ht(e),!0;if(k(/[\u0080-\uFFFF]/,e.nodeName))return ht(e),!0;var n=he(e.nodeName);if(Nt("uponSanitizeElement",e,{tagName:n,allowedTags:Ae}),e.hasChildNodes()&&!Tt(e.firstElementChild)&&(!Tt(e.content)||!Tt(e.content.firstElementChild))&&k(/<[/\w]/g,e.innerHTML)&&k(/<[/\w]/g,e.textContent))return ht(e),!0;if("select"===n&&k(/<template/i,e.innerHTML))return ht(e),!0;if(!Ae[n]||xe[n]){if(!xe[n]&&wt(n)){if(Se.tagNameCheck instanceof RegExp&&k(Se.tagNameCheck,n))return!1;if(Se.tagNameCheck instanceof Function&&Se.tagNameCheck(n))return!1}if(Ge&&!Ye[n]){var o=ne(e)||e.parentNode,a=te(e)||e.childNodes;if(a&&o)for(var i=a.length-1;i>=0;--i)o.insertBefore(Q(a[i],!0),ee(e))}return ht(e),!0}return e instanceof u&&!dt(e)?(ht(e),!0):"noscript"!==n&&"noembed"!==n||!k(/<\/no(script|embed)/i,e.innerHTML)?(Me&&3===e.nodeType&&(t=e.textContent,t=A(t,ge," "),t=A(t,ye," "),e.textContent!==t&&(T(r.removed,{element:e.cloneNode()}),e.textContent=t)),Nt("afterSanitizeElements",e,null),!1):(ht(e),!0)},At=function(e,t,n){if(ze&&("id"===t||"name"===t)&&(n in i||n in it))return!1;if(Re&&!Oe[t]&&k(be,t));else if(De&&k(ve,t));else if(!_e[t]||Oe[t]){if(!(wt(e)&&(Se.tagNameCheck instanceof RegExp&&k(Se.tagNameCheck,e)||Se.tagNameCheck instanceof Function&&Se.tagNameCheck(e))&&(Se.attributeNameCheck instanceof RegExp&&k(Se.attributeNameCheck,t)||Se.attributeNameCheck instanceof Function&&Se.attributeNameCheck(t))||"is"===t&&Se.allowCustomizedBuiltInElements&&(Se.tagNameCheck instanceof RegExp&&k(Se.tagNameCheck,n)||Se.tagNameCheck instanceof Function&&Se.tagNameCheck(n))))return!1}else if(Je[t]);else if(k(Ee,A(n,Ne,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==w(n,"data:")||!Ve[e])if(Ce&&!k(Te,A(n,Ne,"")));else if(n)return!1;return!0},wt=function(e){return e.indexOf("-")>0},_t=function(t){var n,o,a,i;Nt("beforeSanitizeAttributes",t,null);var l=t.attributes;if(l){var c={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_e};for(i=l.length;i--;){var s=n=l[i],u=s.name,m=s.namespaceURI;if(o="value"===u?n.value:_(n.value),a=he(u),c.attrName=a,c.attrValue=o,c.keepAttr=!0,c.forceKeepAttr=void 0,Nt("uponSanitizeAttribute",t,c),o=c.attrValue,!c.forceKeepAttr&&(gt(u,t),c.keepAttr))if(k(/\/>/i,o))gt(u,t);else{Me&&(o=A(o,ge," "),o=A(o,ye," "));var f=he(t.nodeName);if(At(f,a,o)){if(!Be||"id"!==a&&"name"!==a||(gt(u,t),o=Pe+o),oe&&"object"===e(y)&&"function"==typeof y.getAttributeType)if(m);else switch(y.getAttributeType(f,a)){case"TrustedHTML":o=oe.createHTML(o);break;case"TrustedScriptURL":o=oe.createScriptURL(o)}try{m?t.setAttributeNS(m,u,o):t.setAttribute(u,o),v(r.removed)}catch(e){}}}}Nt("afterSanitizeAttributes",t,null)}},kt=function e(t){var n,r=bt(t);for(Nt("beforeSanitizeShadowDOM",t,null);n=r.nextNode();)Nt("uponSanitizeShadowNode",n,null),Et(n)||(n.content instanceof l&&e(n.content),_t(n));Nt("afterSanitizeShadowDOM",t,null)};return r.sanitize=function(t){var o,i,c,u,m,f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if((nt=!t)&&(t="\x3c!--\x3e"),"string"!=typeof t&&!Tt(t)){if("function"!=typeof t.toString)throw S("toString is not a function");if("string"!=typeof(t=t.toString()))throw S("dirty is not a string, aborting")}if(!r.isSupported){if("object"===e(n.toStaticHTML)||"function"==typeof n.toStaticHTML){if("string"==typeof t)return n.toStaticHTML(t);if(Tt(t))return n.toStaticHTML(t.outerHTML)}return t}if(Ie||ct(f),r.removed=[],"string"==typeof t&&(We=!1),We){if(t.nodeName){var p=he(t.nodeName);if(!Ae[p]||xe[p])throw S("root node is forbidden and cannot be sanitized in-place")}}else if(t instanceof s)1===(i=(o=yt("\x3c!----\x3e")).ownerDocument.importNode(t,!0)).nodeType&&"BODY"===i.nodeName||"HTML"===i.nodeName?o=i:o.appendChild(i);else{if(!He&&!Me&&!Le&&-1===t.indexOf("<"))return oe&&je?oe.createHTML(t):t;if(!(o=yt(t)))return He?null:je?ae:""}o&&Fe&&ht(o.firstChild);for(var d=bt(We?t:o);c=d.nextNode();)3===c.nodeType&&c===u||Et(c)||(c.content instanceof l&&kt(c.content),_t(c),u=c);if(u=null,We)return t;if(He){if(Ue)for(m=se.call(o.ownerDocument);o.firstChild;)m.appendChild(o.firstChild);else m=o;return _e.shadowroot&&(m=me.call(a,m,!0)),m}var h=Le?o.outerHTML:o.innerHTML;return Le&&Ae["!doctype"]&&o.ownerDocument&&o.ownerDocument.doctype&&o.ownerDocument.doctype.name&&k(J,o.ownerDocument.doctype.name)&&(h="<!DOCTYPE "+o.ownerDocument.doctype.name+">\n"+h),Me&&(h=A(h,ge," "),h=A(h,ye," ")),oe&&je?oe.createHTML(h):h},r.setConfig=function(e){ct(e),Ie=!0},r.clearConfig=function(){at=null,Ie=!1},r.isValidAttribute=function(e,t,n){at||ct({});var r=he(e),o=he(t);return At(r,o,n)},r.addHook=function(e,t){"function"==typeof t&&(pe[e]=pe[e]||[],T(pe[e],t))},r.removeHook=function(e){if(pe[e])return v(pe[e])},r.removeHooks=function(e){pe[e]&&(pe[e]=[])},r.removeAllHooks=function(){pe={}},r}()}()},375:function(e,t,n){"use strict";var r=n(0),o=n(5),a=n(6),i=n.n(a),l=n(1),c=n(31),s=n(142),u=n(71);function m(e){switch(e){case"success":case"warning":case"info":return"polite";case"error":default:return"assertive"}}t.a=function({className:e,status:t="info",children:n,spokenMessage:a=n,onRemove:f=o.noop,isDismissible:p=!0,actions:d=[],politeness:h=m(t),__unstableHTML:g,onDismiss:y=o.noop}){!function(e,t){const n="string"==typeof e?e:Object(r.renderToString)(e);Object(r.useEffect)(()=>{n&&Object(c.speak)(n,t)},[n,t])}(a,h);const b=i()(e,"components-notice","is-"+t,{"is-dismissible":p});return g&&(n=Object(r.createElement)(r.RawHTML,null,n)),Object(r.createElement)("div",{className:b},Object(r.createElement)("div",{className:"components-notice__content"},n,Object(r.createElement)("div",{className:"components-notice__actions"},d.map(({className:e,label:t,isPrimary:n,variant:o,noDefaultClasses:a=!1,onClick:l,url:c},s)=>{let m=o;return"primary"===o||a||(m=c?"link":"secondary"),void 0===m&&n&&(m="primary"),Object(r.createElement)(u.a,{key:s,href:c,variant:m,onClick:c?void 0:l,className:i()("components-notice__action",e)},t)}))),p&&Object(r.createElement)(u.a,{className:"components-notice__dismiss",icon:s.a,label:Object(l.__)("Dismiss this notice"),onClick:e=>{var t;null==e||null===(t=e.preventDefault)||void 0===t||t.call(e),y(),f()},showTooltip:!1}))}}}]);