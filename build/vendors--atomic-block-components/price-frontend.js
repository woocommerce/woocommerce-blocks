(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[20],{104:function(e,t,r){"use strict";var n=r(2),a=r.n(n);function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function c(){}function f(){}f.resetWarningCache=c;var p=function(e,t){return e(t={exports:{}},t.exports),t.exports}((function(e){e.exports=function(){function e(e,t,r,n,a,o){if("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"!==o){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:f,resetWarningCache:c};return r.PropTypes=r,r}()}));function h(){}function g(e){return!!(e||"").match(/\d/)}function m(e){return e.replace(/[-[\]/{}()*+?.\\^$|]/g,"\\$&")}function d(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r="-"===e[0],n=r&&t,a=(e=e.replace("-","")).split("."),o=a[0],i=a[1]||"";return{beforeDecimal:o,afterDecimal:i,hasNagation:r,addNegation:n}}function v(e,t,r){for(var n="",a=r?"0":"",o=0;o<=t-1;o++)n+=e[o]||a;return n}function y(e,t){if(e.value=e.value,null!==e){if(e.createTextRange){var r=e.createTextRange();return r.move("character",t),r.select(),!0}return e.selectionStart||0===e.selectionStart?(e.focus(),e.setSelectionRange(t,t),!0):(e.focus(),!1)}}function S(e,t,r){return Math.min(Math.max(e,t),r)}function b(e){return Math.max(e.selectionStart,e.selectionEnd)}var x={thousandSeparator:p.oneOfType([p.string,p.oneOf([!0])]),decimalSeparator:p.string,allowedDecimalSeparators:p.arrayOf(p.string),thousandsGroupStyle:p.oneOf(["thousand","lakh","wan"]),decimalScale:p.number,fixedDecimalScale:p.bool,displayType:p.oneOf(["input","text"]),prefix:p.string,suffix:p.string,format:p.oneOfType([p.string,p.func]),removeFormatting:p.func,mask:p.oneOfType([p.string,p.arrayOf(p.string)]),value:p.oneOfType([p.number,p.string]),defaultValue:p.oneOfType([p.number,p.string]),isNumericString:p.bool,customInput:p.elementType,allowNegative:p.bool,allowEmptyFormatting:p.bool,allowLeadingZeros:p.bool,onValueChange:p.func,onKeyDown:p.func,onMouseUp:p.func,onChange:p.func,onFocus:p.func,onBlur:p.func,type:p.oneOf(["text","tel","password"]),isAllowed:p.func,renderText:p.func,getInputRef:p.oneOfType([p.func,p.shape({current:p.any})])},w={displayType:"input",decimalSeparator:".",thousandsGroupStyle:"thousand",fixedDecimalScale:!1,prefix:"",suffix:"",allowNegative:!0,allowEmptyFormatting:!1,allowLeadingZeros:!1,isNumericString:!1,type:"text",onValueChange:h,onChange:h,onKeyDown:h,onMouseUp:h,onFocus:h,onBlur:h,isAllowed:function(){return!0}},k=function(e){function t(e){var r,n,a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,r=!(a=s(t).call(this,e))||"object"!=typeof a&&"function"!=typeof a?l(n):a;var o=e.defaultValue;r.validateProps();var i=r.formatValueProp(o);return r.state={value:i,numAsString:r.removeFormatting(i)},r.selectionBeforeInput={selectionStart:0,selectionEnd:0},r.onChange=r.onChange.bind(l(r)),r.onKeyDown=r.onKeyDown.bind(l(r)),r.onMouseUp=r.onMouseUp.bind(l(r)),r.onFocus=r.onFocus.bind(l(r)),r.onBlur=r.onBlur.bind(l(r)),r}var r,n,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(t,e),r=t,(n=[{key:"componentDidUpdate",value:function(e){this.updateValueIfRequired(e)}},{key:"updateValueIfRequired",value:function(e){var t=this.props,r=this.state,n=this.focusedElm,a=r.value,o=r.numAsString,i=void 0===o?"":o;if(e!==t){this.validateProps();var s=this.formatNumString(i),u=void 0===t.value?s:this.formatValueProp(),l=this.removeFormatting(u),c=parseFloat(l),f=parseFloat(i);(isNaN(c)&&isNaN(f)||c===f)&&s===a&&(null!==n||u===a)||this.updateValue({formattedValue:u,numAsString:l,input:n})}}},{key:"getFloatString",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=this.props.decimalScale,r=this.getSeparators(),n=r.decimalSeparator,a=this.getNumberRegex(!0),o="-"===e[0];o&&(e=e.replace("-","")),n&&0===t&&(e=e.split(n)[0]);var i=(e=(e.match(a)||[]).join("").replace(n,".")).indexOf(".");return-1!==i&&(e="".concat(e.substring(0,i),".").concat(e.substring(i+1,e.length).replace(new RegExp(m(n),"g"),""))),o&&(e="-"+e),e}},{key:"getNumberRegex",value:function(e,t){var r=this.props,n=r.format,a=r.decimalScale,o=this.getSeparators().decimalSeparator;return new RegExp("\\d"+(!o||0===a||t||n?"":"|"+m(o)),e?"g":void 0)}},{key:"getSeparators",value:function(){var e=this.props.decimalSeparator,t=this.props,r=t.thousandSeparator,n=t.allowedDecimalSeparators;return!0===r&&(r=","),n||(n=[e,"."]),{decimalSeparator:e,thousandSeparator:r,allowedDecimalSeparators:n}}},{key:"getMaskAtIndex",value:function(e){var t=this.props.mask,r=void 0===t?" ":t;return"string"==typeof r?r:r[e]||" "}},{key:"getValueObject",value:function(e,t){var r=parseFloat(t);return{formattedValue:e,value:t,floatValue:isNaN(r)?void 0:r}}},{key:"validateProps",value:function(){var e=this.props.mask,t=this.getSeparators(),r=t.decimalSeparator,n=t.thousandSeparator;if(r===n)throw new Error("\n          Decimal separator can't be same as thousand separator.\n          thousandSeparator: ".concat(n,' (thousandSeparator = {true} is same as thousandSeparator = ",")\n          decimalSeparator: ').concat(r," (default value for decimalSeparator is .)\n       "));if(e&&("string"===e?e:e.toString()).match(/\d/g))throw new Error("\n          Mask ".concat(e," should not contain numeric character;\n        "))}},{key:"setPatchedCaretPosition",value:function(e,t,r){y(e,t),setTimeout((function(){e.value===r&&y(e,t)}),0)}},{key:"correctCaretPosition",value:function(e,t,r){var n=this.props,a=n.prefix,o=n.suffix,i=n.format;if(""===e)return 0;if(t=S(t,0,e.length),!i){var s="-"===e[0];return S(t,a.length+(s?1:0),e.length-o.length)}if("function"==typeof i)return t;if("#"===i[t]&&g(e[t]))return t;if("#"===i[t-1]&&g(e[t-1]))return t;var u=i.indexOf("#");t=S(t,u,i.lastIndexOf("#")+1);for(var l=i.substring(t,i.length).indexOf("#"),c=t,f=t+(-1===l?0:l);c>u&&("#"!==i[c]||!g(e[c]));)c-=1;return!g(e[f])||"left"===r&&t!==u||t-c<f-t?g(e[c])?c+1:c:f}},{key:"getCaretPosition",value:function(e,t,r){var n,a,o=this.props.format,i=this.state.value,s=this.getNumberRegex(!0),u=(e.match(s)||[]).join(""),l=(t.match(s)||[]).join("");for(n=0,a=0;a<r;a++){var c=e[a]||"",f=t[n]||"";if((c.match(s)||c===f)&&("0"!==c||!f.match(s)||"0"===f||u.length===l.length)){for(;c!==t[n]&&n<t.length;)n++;n++}}return"string"!=typeof o||i||(n=t.length),n=this.correctCaretPosition(t,n)}},{key:"removePrefixAndSuffix",value:function(e){var t=this.props,r=t.format,n=t.prefix,a=t.suffix;if(!r&&e){var o="-"===e[0];o&&(e=e.substring(1,e.length));var i=(e=n&&0===e.indexOf(n)?e.substring(n.length,e.length):e).lastIndexOf(a);e=a&&-1!==i&&i===e.length-a.length?e.substring(0,i):e,o&&(e="-"+e)}return e}},{key:"removePatternFormatting",value:function(e){for(var t=this.props.format.split("#").filter((function(e){return""!==e})),r=0,n="",a=0,o=t.length;a<=o;a++){var i=t[a]||"",s=a===o?e.length:e.indexOf(i,r);if(-1===s){n=e;break}n+=e.substring(r,s),r=s+i.length}return(n.match(/\d/g)||[]).join("")}},{key:"removeFormatting",value:function(e){var t=this.props,r=t.format,n=t.removeFormatting;return e?(r?e="string"==typeof r?this.removePatternFormatting(e):"function"==typeof n?n(e):(e.match(/\d/g)||[]).join(""):(e=this.removePrefixAndSuffix(e),e=this.getFloatString(e)),e):e}},{key:"formatWithPattern",value:function(e){for(var t=this.props.format,r=0,n=t.split(""),a=0,o=t.length;a<o;a++)"#"===t[a]&&(n[a]=e[r]||this.getMaskAtIndex(r),r+=1);return n.join("")}},{key:"formatAsNumber",value:function(e){var t=this.props,r=t.decimalScale,n=t.fixedDecimalScale,a=t.prefix,o=t.suffix,i=t.allowNegative,s=t.thousandsGroupStyle,u=this.getSeparators(),l=u.thousandSeparator,c=u.decimalSeparator,f=-1!==e.indexOf(".")||r&&n,p=d(e,i),h=p.beforeDecimal,g=p.afterDecimal,m=p.addNegation;return void 0!==r&&(g=v(g,r,n)),l&&(h=function(e,t,r){var n=function(e){switch(e){case"lakh":return/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;case"wan":return/(\d)(?=(\d{4})+(?!\d))/g;case"thousand":default:return/(\d)(?=(\d{3})+(?!\d))/g}}(r),a=e.search(/[1-9]/);return a=-1===a?e.length:a,e.substring(0,a)+e.substring(a,e.length).replace(n,"$1"+t)}(h,l,s)),a&&(h=a+h),o&&(g+=o),m&&(h="-"+h),e=h+(f&&c||"")+g}},{key:"formatNumString",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=this.props,r=t.format,n=t.allowEmptyFormatting,a=e;return a=""!==e||n?"-"!==e||r?"string"==typeof r?this.formatWithPattern(a):"function"==typeof r?r(a):this.formatAsNumber(a):"-":""}},{key:"formatValueProp",value:function(e){var t=this.props,r=t.format,n=t.decimalScale,a=t.fixedDecimalScale,o=t.allowEmptyFormatting,i=this.props,s=i.value,u=void 0===s?e:s,l=i.isNumericString,c=!u&&0!==u;return c&&o&&(u=""),c&&!o?"":("number"==typeof u&&(u=u.toString(),l=!0),"Infinity"===u&&l&&(u=""),l&&!r&&"number"==typeof n&&(u=function(e,t,r){if(-1!==["","-"].indexOf(e))return e;var n=-1!==e.indexOf(".")&&t,a=d(e),o=a.beforeDecimal,i=a.afterDecimal,s=a.hasNagation,u=parseFloat("0.".concat(i||"0")).toFixed(t).split("."),l=o.split("").reverse().reduce((function(e,t,r){return e.length>r?(Number(e[0])+Number(t)).toString()+e.substring(1,e.length):t+e}),u[0]),c=v(u[1]||"",Math.min(t,i.length),r),f=n?".":"";return"".concat(s?"-":"").concat(l).concat(f).concat(c)}(u,n,a)),l?this.formatNumString(u):this.formatInput(u))}},{key:"formatNegation",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=this.props.allowNegative,r=new RegExp("(-)"),n=new RegExp("(-)(.)*(-)"),a=r.test(e),o=n.test(e);return e=e.replace(/-/g,""),a&&!o&&t&&(e="-"+e),e}},{key:"formatInput",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=this.props.format;return t||(e=this.removePrefixAndSuffix(e),e=this.formatNegation(e)),e=this.removeFormatting(e),this.formatNumString(e)}},{key:"isCharacterAFormat",value:function(e,t){var r=this.props,n=r.format,a=r.prefix,o=r.suffix,i=r.decimalScale,s=r.fixedDecimalScale,u=this.getSeparators().decimalSeparator;return"string"==typeof n&&"#"!==n[e]||!(n||!(e<a.length||e>=t.length-o.length||i&&s&&t[e]===u))}},{key:"checkIfFormatGotDeleted",value:function(e,t,r){for(var n=e;n<t;n++)if(this.isCharacterAFormat(n,r))return!0;return!1}},{key:"correctInputValue",value:function(e,t,r){var n=this.props,a=n.format,o=n.allowNegative,i=n.prefix,s=n.suffix,u=n.decimalScale,l=this.getSeparators(),c=l.allowedDecimalSeparators,f=l.decimalSeparator,p=this.state.numAsString||"",h=this.selectionBeforeInput,g=h.selectionStart,m=h.selectionEnd,v=function(e,t){for(var r=0,n=0,a=e.length,o=t.length;e[r]===t[r]&&r<a;)r++;for(;e[a-1-n]===t[o-1-n]&&o-n>r&&a-n>r;)n++;return{start:r,end:a-n}}(t,r),y=v.start,S=v.end;if(!a&&y===S&&-1!==c.indexOf(r[g])){var b=0===u?"":f;return r.substr(0,g)+b+r.substr(g+1,r.length)}var x=a?0:i.length,w=t.length-(a?0:s.length);if(r.length>t.length||!r.length||y===S||0===g&&m===t.length||g===x&&m===w)return r;if(this.checkIfFormatGotDeleted(y,S,t)&&(r=t),!a){var k=this.removeFormatting(r),O=d(k,o),P=O.beforeDecimal,F=O.afterDecimal,N=O.addNegation,C=e<r.indexOf(f)+1;if(k.length<p.length&&C&&""===P&&!parseFloat(F))return N?"-":""}return r}},{key:"updateValue",value:function(e){var t=e.formattedValue,r=e.input,n=e.setCaretPosition,a=void 0===n||n,o=e.numAsString,i=e.caretPos,s=this.props.onValueChange,u=this.state.value;if(r)if(a){if(!i){var l=e.inputValue||r.value,c=b(r);r.value=t,i=this.getCaretPosition(l,t,c)}this.setPatchedCaretPosition(r,i,t)}else r.value=t;void 0===o&&(o=this.removeFormatting(t)),t!==u&&(this.setState({value:t,numAsString:o}),s(this.getValueObject(t,o)))}},{key:"onChange",value:function(e){var t=e.target,r=t.value,n=this.state,a=this.props,o=a.isAllowed,i=n.value||"",s=b(t);r=this.correctInputValue(s,i,r);var u=this.formatInput(r)||"",l=this.removeFormatting(u);o(this.getValueObject(u,l))||(u=i),this.updateValue({formattedValue:u,numAsString:l,inputValue:r,input:t}),a.onChange(e)}},{key:"onBlur",value:function(e){var t=this.props,r=this.state,n=t.format,a=t.onBlur,o=t.allowLeadingZeros,i=r.numAsString,s=r.value;if(this.focusedElm=null,this.focusTimeout&&clearTimeout(this.focusTimeout),!n){isNaN(parseFloat(i))&&(i=""),o||(i=function(e){if(!e)return e;var t="-"===e[0];t&&(e=e.substring(1,e.length));var r=e.split("."),n=r[0].replace(/^0+/,"")||"0",a=r[1]||"";return"".concat(t?"-":"").concat(n).concat(a?".".concat(a):"")}(i));var u=this.formatNumString(i);if(u!==s)return this.updateValue({formattedValue:u,numAsString:i,input:e.target,setCaretPosition:!1}),void a(e)}a(e)}},{key:"onKeyDown",value:function(e){var t,r=e.target,n=e.key,a=r.selectionStart,o=r.selectionEnd,i=r.value,s=void 0===i?"":i,u=this.props,l=u.decimalScale,c=u.fixedDecimalScale,f=u.prefix,p=u.suffix,h=u.format,g=u.onKeyDown,m=void 0!==l&&c,d=this.getNumberRegex(!1,m),v=new RegExp("-"),y="string"==typeof h;if(this.selectionBeforeInput={selectionStart:a,selectionEnd:o},"ArrowLeft"===n||"Backspace"===n?t=a-1:"ArrowRight"===n?t=a+1:"Delete"===n&&(t=a),void 0!==t&&a===o){var S=t,b=y?h.indexOf("#"):f.length,x=y?h.lastIndexOf("#")+1:s.length-p.length;if("ArrowLeft"===n||"ArrowRight"===n){var w="ArrowLeft"===n?"left":"right";S=this.correctCaretPosition(s,t,w)}else if("Delete"!==n||d.test(s[t])||v.test(s[t])){if("Backspace"===n&&!d.test(s[t]))if(a<=b+1&&"-"===s[0]&&void 0===h){var k=s.substring(1);this.updateValue({formattedValue:k,caretPos:S,input:r})}else if(!v.test(s[t])){for(;!d.test(s[S-1])&&S>b;)S--;S=this.correctCaretPosition(s,S,"left")}}else for(;!d.test(s[S])&&S<x;)S++;(S!==t||t<b||t>x)&&(e.preventDefault(),this.setPatchedCaretPosition(r,S,s)),e.isUnitTestRun&&this.setPatchedCaretPosition(r,S,s),g(e)}else g(e)}},{key:"onMouseUp",value:function(e){var t=e.target,r=t.selectionStart,n=t.selectionEnd,a=t.value,o=void 0===a?"":a;if(r===n){var i=this.correctCaretPosition(o,r);i!==r&&this.setPatchedCaretPosition(t,i,o)}this.props.onMouseUp(e)}},{key:"onFocus",value:function(e){var t=this;e.persist(),this.focusedElm=e.target,this.focusTimeout=setTimeout((function(){var r=e.target,n=r.selectionStart,a=r.selectionEnd,o=r.value,i=void 0===o?"":o,s=t.correctCaretPosition(i,n);s===n||0===n&&a===i.length||t.setPatchedCaretPosition(r,s,i),t.props.onFocus(e)}),0)}},{key:"render",value:function(){var e,t,r,n=this.props,o=n.type,s=n.displayType,u=n.customInput,l=n.renderText,c=n.getInputRef,f=this.state.value,p=(e=this.props,t=x,r={},Object.keys(e).forEach((function(n){t[n]||(r[n]=e[n])})),r),h=i({inputMode:"numeric"},p,{type:o,value:f,onChange:this.onChange,onKeyDown:this.onKeyDown,onMouseUp:this.onMouseUp,onFocus:this.onFocus,onBlur:this.onBlur});if("text"===s)return l?l(f)||null:a.a.createElement("span",i({},p,{ref:c}),f);if(u){var g=u;return a.a.createElement(g,i({},h,{ref:c}))}return a.a.createElement("input",i({},h,{ref:c}))}}])&&o(r.prototype,n),c&&o(r,c),t}(a.a.Component);k.propTypes=x,k.defaultProps=w,t.a=k}}]);