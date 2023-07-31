(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[93,88,92],{125:function(e,t,n){"use strict";var s=n(0),o=n(7),i=n(5),r=n.n(i),a=n(1),u=n(11),c=n(25),l=n(14),d=n.n(l),p=n(155),h=n(74),g=n(43);function f({value:e,status:t,title:n,displayTransform:i,isBorderless:c=!1,disabled:l=!1,onClickRemove:d=o.noop,onMouseEnter:m,onMouseLeave:v,messages:k,termPosition:b,termsCount:S}){const T=Object(u.useInstanceId)(f),I=r()("components-form-token-field__token",{"is-error":"error"===t,"is-success":"success"===t,"is-validating":"validating"===t,"is-borderless":c,"is-disabled":l}),O=i(e),y=Object(a.sprintf)(
/* translators: 1: term name, 2: term position in a set of terms, 3: total term set count. */
Object(a.__)("%1$s (%2$s of %3$s)"),O,b,S);return Object(s.createElement)("span",{className:I,onMouseEnter:m,onMouseLeave:v,title:n},Object(s.createElement)("span",{className:"components-form-token-field__token-text",id:"components-form-token-field__token-text-"+T},Object(s.createElement)(g.a,{as:"span"},y),Object(s.createElement)("span",{"aria-hidden":"true"},O)),Object(s.createElement)(h.a,{className:"components-form-token-field__remove-token",icon:p.a,onClick:!l&&(()=>d({value:e})),label:k.remove,"aria-describedby":"components-form-token-field__token-text-"+T}))}var m=n(80),v=n(81),k=n(10),b=n(30),S=Object(u.createHigherOrderComponent)(e=>t=>Object(s.createElement)(e,Object(k.a)({},t,{speak:b.speak,debouncedSpeak:Object(u.useDebounce)(b.speak,500)})),"withSpokenMessages");const T={incompleteTokenValue:"",inputOffsetFromEnd:0,isActive:!1,isExpanded:!1,selectedSuggestionIndex:-1,selectedSuggestionScroll:!1};class I extends s.Component{constructor(){super(...arguments),this.state=T,this.onKeyDown=this.onKeyDown.bind(this),this.onKeyPress=this.onKeyPress.bind(this),this.onFocus=this.onFocus.bind(this),this.onBlur=this.onBlur.bind(this),this.deleteTokenBeforeInput=this.deleteTokenBeforeInput.bind(this),this.deleteTokenAfterInput=this.deleteTokenAfterInput.bind(this),this.addCurrentToken=this.addCurrentToken.bind(this),this.onContainerTouched=this.onContainerTouched.bind(this),this.renderToken=this.renderToken.bind(this),this.onTokenClickRemove=this.onTokenClickRemove.bind(this),this.onSuggestionHovered=this.onSuggestionHovered.bind(this),this.onSuggestionSelected=this.onSuggestionSelected.bind(this),this.onInputChange=this.onInputChange.bind(this),this.bindInput=this.bindInput.bind(this),this.bindTokensAndInput=this.bindTokensAndInput.bind(this),this.updateSuggestions=this.updateSuggestions.bind(this)}componentDidUpdate(e){this.state.isActive&&!this.input.hasFocus()&&this.input.focus();const{suggestions:t,value:n}=this.props,s=!d()(t,e.suggestions);(s||n!==e.value)&&this.updateSuggestions(s)}static getDerivedStateFromProps(e,t){return e.disabled&&t.isActive?{isActive:!1,incompleteTokenValue:""}:null}bindInput(e){this.input=e}bindTokensAndInput(e){this.tokensAndInput=e}onFocus(e){const{__experimentalExpandOnFocus:t}=this.props;this.input.hasFocus()||e.target===this.tokensAndInput?this.setState({isActive:!0,isExpanded:!!t||this.state.isExpanded}):this.setState({isActive:!1}),"function"==typeof this.props.onFocus&&this.props.onFocus(e)}onBlur(){this.inputHasValidValue()?this.setState({isActive:!1}):this.setState(T)}onKeyDown(e){let t=!1;switch(e.keyCode){case c.BACKSPACE:t=this.handleDeleteKey(this.deleteTokenBeforeInput);break;case c.ENTER:t=this.addCurrentToken();break;case c.LEFT:t=this.handleLeftArrowKey();break;case c.UP:t=this.handleUpArrowKey();break;case c.RIGHT:t=this.handleRightArrowKey();break;case c.DOWN:t=this.handleDownArrowKey();break;case c.DELETE:t=this.handleDeleteKey(this.deleteTokenAfterInput);break;case c.SPACE:this.props.tokenizeOnSpace&&(t=this.addCurrentToken());break;case c.ESCAPE:t=this.handleEscapeKey(e),e.stopPropagation()}t&&e.preventDefault()}onKeyPress(e){let t=!1;switch(e.charCode){case 44:t=this.handleCommaKey()}t&&e.preventDefault()}onContainerTouched(e){e.target===this.tokensAndInput&&this.state.isActive&&e.preventDefault()}onTokenClickRemove(e){this.deleteToken(e.value),this.input.focus()}onSuggestionHovered(e){const t=this.getMatchingSuggestions().indexOf(e);t>=0&&this.setState({selectedSuggestionIndex:t,selectedSuggestionScroll:!1})}onSuggestionSelected(e){this.addNewToken(e)}onInputChange(e){const t=e.value,n=this.props.tokenizeOnSpace?/[ ,\t]+/:/[,\t]+/,s=t.split(n),i=Object(o.last)(s)||"";s.length>1&&this.addNewTokens(s.slice(0,-1)),this.setState({incompleteTokenValue:i},this.updateSuggestions),this.props.onInputChange(i)}handleDeleteKey(e){let t=!1;return this.input.hasFocus()&&this.isInputEmpty()&&(e(),t=!0),t}handleLeftArrowKey(){let e=!1;return this.isInputEmpty()&&(this.moveInputBeforePreviousToken(),e=!0),e}handleRightArrowKey(){let e=!1;return this.isInputEmpty()&&(this.moveInputAfterNextToken(),e=!0),e}handleUpArrowKey(){return this.setState((e,t)=>({selectedSuggestionIndex:(0===e.selectedSuggestionIndex?this.getMatchingSuggestions(e.incompleteTokenValue,t.suggestions,t.value,t.maxSuggestions,t.saveTransform).length:e.selectedSuggestionIndex)-1,selectedSuggestionScroll:!0})),!0}handleDownArrowKey(){return this.setState((e,t)=>({selectedSuggestionIndex:(e.selectedSuggestionIndex+1)%this.getMatchingSuggestions(e.incompleteTokenValue,t.suggestions,t.value,t.maxSuggestions,t.saveTransform).length,selectedSuggestionScroll:!0})),!0}handleEscapeKey(e){return this.setState({incompleteTokenValue:e.target.value,isExpanded:!1,selectedSuggestionIndex:-1,selectedSuggestionScroll:!1}),!0}handleCommaKey(){return this.inputHasValidValue()&&this.addNewToken(this.state.incompleteTokenValue),!0}moveInputToIndex(e){this.setState((t,n)=>({inputOffsetFromEnd:n.value.length-Math.max(e,-1)-1}))}moveInputBeforePreviousToken(){this.setState((e,t)=>({inputOffsetFromEnd:Math.min(e.inputOffsetFromEnd+1,t.value.length)}))}moveInputAfterNextToken(){this.setState(e=>({inputOffsetFromEnd:Math.max(e.inputOffsetFromEnd-1,0)}))}deleteTokenBeforeInput(){const e=this.getIndexOfInput()-1;e>-1&&this.deleteToken(this.props.value[e])}deleteTokenAfterInput(){const e=this.getIndexOfInput();e<this.props.value.length&&(this.deleteToken(this.props.value[e]),this.moveInputToIndex(e))}addCurrentToken(){let e=!1;const t=this.getSelectedSuggestion();return t?(this.addNewToken(t),e=!0):this.inputHasValidValue()&&(this.addNewToken(this.state.incompleteTokenValue),e=!0),e}addNewTokens(e){const t=Object(o.uniq)(e.map(this.props.saveTransform).filter(Boolean).filter(e=>!this.valueContainsToken(e)));if(t.length>0){const e=Object(o.clone)(this.props.value);e.splice.apply(e,[this.getIndexOfInput(),0].concat(t)),this.props.onChange(e)}}addNewToken(e){const{__experimentalExpandOnFocus:t,__experimentalValidateInput:n}=this.props;n(e)?(this.addNewTokens([e]),this.props.speak(this.props.messages.added,"assertive"),this.setState({incompleteTokenValue:"",selectedSuggestionIndex:-1,selectedSuggestionScroll:!1,isExpanded:!t}),this.state.isActive&&this.input.focus()):this.props.speak(this.props.messages.__experimentalInvalid,"assertive")}deleteToken(e){const t=this.props.value.filter(t=>this.getTokenValue(t)!==this.getTokenValue(e));this.props.onChange(t),this.props.speak(this.props.messages.removed,"assertive")}getTokenValue(e){return"object"==typeof e?e.value:e}getMatchingSuggestions(e=this.state.incompleteTokenValue,t=this.props.suggestions,n=this.props.value,s=this.props.maxSuggestions,i=this.props.saveTransform){let r=i(e);const a=[],u=[];return 0===r.length?t=Object(o.difference)(t,n):(r=r.toLocaleLowerCase(),Object(o.each)(t,e=>{const t=e.toLocaleLowerCase().indexOf(r);-1===n.indexOf(e)&&(0===t?a.push(e):t>0&&u.push(e))}),t=a.concat(u)),Object(o.take)(t,s)}getSelectedSuggestion(){if(-1!==this.state.selectedSuggestionIndex)return this.getMatchingSuggestions()[this.state.selectedSuggestionIndex]}valueContainsToken(e){return Object(o.some)(this.props.value,t=>this.getTokenValue(e)===this.getTokenValue(t))}getIndexOfInput(){return this.props.value.length-this.state.inputOffsetFromEnd}isInputEmpty(){return 0===this.state.incompleteTokenValue.length}inputHasValidValue(){return this.props.saveTransform(this.state.incompleteTokenValue).length>0}updateSuggestions(e=!0){const{__experimentalExpandOnFocus:t}=this.props,{incompleteTokenValue:n}=this.state,s=n.trim().length>1,o=this.getMatchingSuggestions(n),i=o.length>0,r={isExpanded:t||s&&i};if(e&&(r.selectedSuggestionIndex=-1,r.selectedSuggestionScroll=!1),this.setState(r),s){const{debouncedSpeak:e}=this.props;e(i?Object(a.sprintf)(
/* translators: %d: number of results. */
Object(a._n)("%d result found, use up and down arrow keys to navigate.","%d results found, use up and down arrow keys to navigate.",o.length),o.length):Object(a.__)("No results."),"assertive")}}renderTokensAndInput(){const e=Object(o.map)(this.props.value,this.renderToken);return e.splice(this.getIndexOfInput(),0,this.renderInput()),e}renderToken(e,t,n){const o=this.getTokenValue(e),i=e.status?e.status:void 0,r=t+1,a=n.length;return Object(s.createElement)(f,{key:"token-"+o,value:o,status:i,title:e.title,displayTransform:this.props.displayTransform,onClickRemove:this.onTokenClickRemove,isBorderless:e.isBorderless||this.props.isBorderless,onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseLeave,disabled:"error"!==i&&this.props.disabled,messages:this.props.messages,termsCount:a,termPosition:r})}renderInput(){const{autoCapitalize:e,autoComplete:t,maxLength:n,placeholder:o,value:i,instanceId:r}=this.props;let a={instanceId:r,autoCapitalize:e,autoComplete:t,placeholder:0===i.length?o:"",ref:this.bindInput,key:"input",disabled:this.props.disabled,value:this.state.incompleteTokenValue,onBlur:this.onBlur,isExpanded:this.state.isExpanded,selectedSuggestionIndex:this.state.selectedSuggestionIndex};return n&&i.length>=n||(a={...a,onChange:this.onInputChange}),Object(s.createElement)(m.a,a)}render(){const{disabled:e,label:t=Object(a.__)("Add item"),instanceId:n,className:o,__experimentalShowHowTo:i}=this.props,{isExpanded:u}=this.state,c=r()(o,"components-form-token-field__input-container",{"is-active":this.state.isActive,"is-disabled":e});let l={className:"components-form-token-field",tabIndex:"-1"};const d=this.getMatchingSuggestions();return e||(l=Object.assign({},l,{onKeyDown:this.onKeyDown,onKeyPress:this.onKeyPress,onFocus:this.onFocus})),Object(s.createElement)("div",l,Object(s.createElement)("label",{htmlFor:"components-form-token-input-"+n,className:"components-form-token-field__label"},t),Object(s.createElement)("div",{ref:this.bindTokensAndInput,className:c,tabIndex:"-1",onMouseDown:this.onContainerTouched,onTouchStart:this.onContainerTouched},this.renderTokensAndInput(),u&&Object(s.createElement)(v.a,{instanceId:n,match:this.props.saveTransform(this.state.incompleteTokenValue),displayTransform:this.props.displayTransform,suggestions:d,selectedIndex:this.state.selectedSuggestionIndex,scrollIntoView:this.state.selectedSuggestionScroll,onHover:this.onSuggestionHovered,onSelect:this.onSuggestionSelected})),i&&Object(s.createElement)("p",{id:"components-form-token-suggestions-howto-"+n,className:"components-form-token-field__help"},this.props.tokenizeOnSpace?Object(a.__)("Separate with commas, spaces, or the Enter key."):Object(a.__)("Separate with commas or the Enter key.")))}}I.defaultProps={suggestions:Object.freeze([]),maxSuggestions:100,value:Object.freeze([]),displayTransform:o.identity,saveTransform:e=>e.trim(),onChange:()=>{},onInputChange:()=>{},isBorderless:!1,disabled:!1,tokenizeOnSpace:!1,messages:{added:Object(a.__)("Item added."),removed:Object(a.__)("Item removed."),remove:Object(a.__)("Remove item"),__experimentalInvalid:Object(a.__)("Invalid item")},__experimentalExpandOnFocus:!1,__experimentalValidateInput:()=>!0,__experimentalShowHowTo:!0},t.a=S(Object(u.withInstanceId)(I))},152:function(e,t,n){"use strict";var s=n(0),o=n(12);const i=Object(s.createElement)(o.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(s.createElement)(o.Path,{d:"M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"}));t.a=i},283:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var s=function(){return(s=Object.assign||function(e){for(var t,n=1,s=arguments.length;n<s;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.create,Object.create},284:function(e,t,n){"use strict";function s(e){return e.toLowerCase()}n.d(t,"a",(function(){return r}));var o=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],i=/[^A-Z0-9]+/gi;function r(e,t){void 0===t&&(t={});for(var n=t.splitRegexp,r=void 0===n?o:n,u=t.stripRegexp,c=void 0===u?i:u,l=t.transform,d=void 0===l?s:l,p=t.delimiter,h=void 0===p?" ":p,g=a(a(e,r,"$1\0$2"),c,"\0"),f=0,m=g.length;"\0"===g.charAt(f);)f++;for(;"\0"===g.charAt(m-1);)m--;return g.slice(f,m).split("\0").map(d).join(h)}function a(e,t,n){return t instanceof RegExp?e.replace(t,n):t.reduce((function(e,t){return e.replace(t,n)}),e)}},288:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var s=n(283),o=n(284);function i(e,t){return void 0===t&&(t={}),function(e,t){return void 0===t&&(t={}),Object(o.a)(e,Object(s.a)({delimiter:"."},t))}(e,Object(s.a)({delimiter:"-"},t))}},45:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var s=function(e){return function(t,n,s){return e(t,n,s)*s}},o=function(e,t){if(e)throw Error("Invalid sort config: "+t)},i=function(e){var t=e||{},n=t.asc,i=t.desc,r=n?1:-1,a=n||i;return o(!a,"Expected `asc` or `desc` property"),o(n&&i,"Ambiguous object with `asc` and `desc` config properties"),{order:r,sortBy:a,comparer:e.comparer&&s(e.comparer)}};var r=function(e,t,n,s){return Array.isArray(t)?(Array.isArray(n)&&n.length<2&&(n=n[0]),t.sort(function e(t,n,s){if(void 0===t||!0===t)return function(e,t){return n(e,t,s)};if("string"==typeof t)return o(t.includes("."),"String syntax not allowed for nested properties."),function(e,o){return n(e[t],o[t],s)};if("function"==typeof t)return function(e,o){return n(t(e),t(o),s)};if(Array.isArray(t)){var r=function(e){return function t(n,s,o,r,a,u,c){var l,d;if("string"==typeof n)l=u[n],d=c[n];else{if("function"!=typeof n){var p=i(n);return t(p.sortBy,s,o,p.order,p.comparer||e,u,c)}l=n(u),d=n(c)}var h=a(l,d,r);return(0===h||null==l&&null==d)&&s.length>o?t(s[o],s,o+1,r,a,u,c):h}}(n);return function(e,o){return r(t[0],t,1,s,n,e,o)}}var a=i(t);return e(a.sortBy,a.comparer||n,a.order)}(n,s,e))):t};function a(e){var t=s(e.comparer);return function(n){var s=Array.isArray(n)&&!e.inPlaceSorting?n.slice():n;return{asc:function(e){return r(1,s,e,t)},desc:function(e){return r(-1,s,e,t)},by:function(e){return r(1,s,e,t)}}}}var u=function(e,t,n){return null==e?n:null==t?-n:typeof e!=typeof t?typeof e<typeof t?-1:1:e<t?-1:e>t?1:0},c=a({comparer:u});a({comparer:u,inPlaceSorting:!0})},5:function(e,t,n){var s;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var s=arguments[t];if(s){var i=typeof s;if("string"===i||"number"===i)e.push(s);else if(Array.isArray(s)){if(s.length){var r=o.apply(null,s);r&&e.push(r)}}else if("object"===i)if(s.toString===Object.prototype.toString)for(var a in s)n.call(s,a)&&s[a]&&e.push(a);else e.push(s.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(s=function(){return o}.apply(t,[]))||(e.exports=s)}()},82:function(e,t,n){"use strict";var s=n(0);t.a=function(e){let{icon:t,size:n=24,...o}=e;return Object(s.cloneElement)(t,{width:n,height:n,...o})}},85:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var s=n(8),o=n(55);function i(e,t){return e===t}function r(e){return"function"==typeof e?function(){return e}:e}function a(e,t,n){var a=n&&n.equalityFn||i,u=function(e){var t=Object(s.useState)(r(e)),n=t[0],o=t[1];return[n,Object(s.useCallback)((function(e){return o(r(e))}),[])]}(e),c=u[0],l=u[1],d=Object(o.a)(Object(s.useCallback)((function(e){return l(e)}),[l]),t,n),p=Object(s.useRef)(e);return a(p.current,e)||(d(e),p.current=e),[c,d]}}}]);