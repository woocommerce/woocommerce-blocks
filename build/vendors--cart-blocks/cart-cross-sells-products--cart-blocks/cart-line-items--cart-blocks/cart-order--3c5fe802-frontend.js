(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[1],{145:function(t,e,r){"use strict";var o=r(8),n=r.n(o);function a(){}function i(t){return!!(t||"").match(/\d/)}function s(t){return null==t}function u(t){return t.replace(/[-[\]/{}()*+?.\\^$|]/g,"\\$&")}function l(t,e){void 0===e&&(e=!0);var r="-"===t[0],o=r&&e,n=(t=t.replace("-","")).split(".");return{beforeDecimal:n[0],afterDecimal:n[1]||"",hasNagation:r,addNegation:o}}function p(t,e,r){for(var o="",n=r?"0":"",a=0;a<=e-1;a++)o+=t[a]||n;return o}function c(t,e){return Array(e+1).join(t)}function f(t,e){if(t.value=t.value,null!==t){if(t.createTextRange){var r=t.createTextRange();return r.move("character",e),r.select(),!0}return t.selectionStart||0===t.selectionStart?(t.focus(),t.setSelectionRange(e,e),!0):(t.focus(),!1)}}function h(t,e,r){return Math.min(Math.max(t,e),r)}function m(t){return Math.max(t.selectionStart,t.selectionEnd)}var g={displayType:"input",decimalSeparator:".",thousandsGroupStyle:"thousand",fixedDecimalScale:!1,prefix:"",suffix:"",allowNegative:!0,allowEmptyFormatting:!1,allowLeadingZeros:!1,isNumericString:!1,type:"text",onValueChange:a,onChange:a,onKeyDown:a,onMouseUp:a,onFocus:a,onBlur:a,isAllowed:function(){return!0}},d=function(t){function e(e){t.call(this,e);var r=e.defaultValue;this.validateProps();var o=this.formatValueProp(r);this.state={value:o,numAsString:this.removeFormatting(o),mounted:!1},this.selectionBeforeInput={selectionStart:0,selectionEnd:0},this.onChange=this.onChange.bind(this),this.onKeyDown=this.onKeyDown.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.onFocus=this.onFocus.bind(this),this.onBlur=this.onBlur.bind(this)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.componentDidMount=function(){this.setState({mounted:!0})},e.prototype.componentDidUpdate=function(t){this.updateValueIfRequired(t)},e.prototype.componentWillUnmount=function(){clearTimeout(this.focusTimeout),clearTimeout(this.caretPositionTimeout)},e.prototype.updateValueIfRequired=function(t){var e=this.props,r=this.state,o=this.focusedElm,n=r.value,a=r.numAsString;if(void 0===a&&(a=""),t!==e){this.validateProps();var i=this.formatNumString(a),u=s(e.value)?i:this.formatValueProp(),l=this.removeFormatting(u),p=parseFloat(l),c=parseFloat(a);(isNaN(p)&&isNaN(c)||p===c)&&i===n&&(null!==o||u===n)||this.updateValue({formattedValue:u,numAsString:l,input:o,source:"prop",event:null})}},e.prototype.getFloatString=function(t){void 0===t&&(t="");var e=this.props.decimalScale,r=this.getSeparators().decimalSeparator,o=this.getNumberRegex(!0),n="-"===t[0];n&&(t=t.replace("-","")),r&&0===e&&(t=t.split(r)[0]);var a=(t=(t.match(o)||[]).join("").replace(r,".")).indexOf(".");return-1!==a&&(t=t.substring(0,a)+"."+t.substring(a+1,t.length).replace(new RegExp(u(r),"g"),"")),n&&(t="-"+t),t},e.prototype.getNumberRegex=function(t,e){var r=this.props,o=r.format,n=r.decimalScale,a=r.customNumerals,i=this.getSeparators().decimalSeparator;return new RegExp("[0-9"+(a?a.join(""):"")+"]"+(!i||0===n||e||o?"":"|"+u(i)),t?"g":void 0)},e.prototype.getSeparators=function(){var t=this.props.decimalSeparator,e=this.props,r=e.thousandSeparator,o=e.allowedDecimalSeparators;return!0===r&&(r=","),o||(o=[t,"."]),{decimalSeparator:t,thousandSeparator:r,allowedDecimalSeparators:o}},e.prototype.getMaskAtIndex=function(t){var e=this.props.mask;return void 0===e&&(e=" "),"string"==typeof e?e:e[t]||" "},e.prototype.getValueObject=function(t,e){var r=parseFloat(e);return{formattedValue:t,value:e,floatValue:isNaN(r)?void 0:r}},e.prototype.validateProps=function(){var t=this.props.mask,e=this.getSeparators(),r=e.decimalSeparator,o=e.thousandSeparator;if(r===o)throw new Error("\n          Decimal separator can't be same as thousand separator.\n          thousandSeparator: "+o+' (thousandSeparator = {true} is same as thousandSeparator = ",")\n          decimalSeparator: '+r+" (default value for decimalSeparator is .)\n       ");if(t&&("string"===t?t:t.toString()).match(/\d/g))throw new Error("\n          Mask "+t+" should not contain numeric character;\n        ")},e.prototype.setPatchedCaretPosition=function(t,e,r){f(t,e),this.caretPositionTimeout=setTimeout((function(){t.value===r&&f(t,e)}),0)},e.prototype.correctCaretPosition=function(t,e,r){var o=this.props,n=o.prefix,a=o.suffix,s=o.format;if(""===t)return 0;if(e=h(e,0,t.length),!s){var u="-"===t[0];return h(e,n.length+(u?1:0),t.length-a.length)}if("function"==typeof s)return e;if("#"===s[e]&&i(t[e]))return e;if("#"===s[e-1]&&i(t[e-1]))return e;var l=s.indexOf("#");e=h(e,l,s.lastIndexOf("#")+1);for(var p=s.substring(e,s.length).indexOf("#"),c=e,f=e+(-1===p?0:p);c>l&&("#"!==s[c]||!i(t[c]));)c-=1;return!i(t[f])||"left"===r&&e!==l||e-c<f-e?i(t[c])?c+1:c:f},e.prototype.getCaretPosition=function(t,e,r){var o,n,a=this.props.format,i=this.state.value,s=this.getNumberRegex(!0),u=(t.match(s)||[]).join(""),l=(e.match(s)||[]).join("");for(o=0,n=0;n<r;n++){var p=t[n]||"",c=e[o]||"";if((p.match(s)||p===c)&&("0"!==p||!c.match(s)||"0"===c||u.length===l.length)){for(;p!==e[o]&&o<e.length;)o++;o++}}return"string"!=typeof a||i||(o=e.length),this.correctCaretPosition(e,o)},e.prototype.removePrefixAndSuffix=function(t){var e=this.props,r=e.format,o=e.prefix,n=e.suffix;if(!r&&t){var a="-"===t[0];a&&(t=t.substring(1,t.length));var i=(t=o&&0===t.indexOf(o)?t.substring(o.length,t.length):t).lastIndexOf(n);t=n&&-1!==i&&i===t.length-n.length?t.substring(0,i):t,a&&(t="-"+t)}return t},e.prototype.removePatternFormatting=function(t){for(var e=this.props.format.split("#").filter((function(t){return""!==t})),r=0,o="",n=0,a=e.length;n<=a;n++){var i=e[n]||"",s=n===a?t.length:t.indexOf(i,r);if(-1===s){o=t;break}o+=t.substring(r,s),r=s+i.length}return(o.match(this.getNumberRegex(!0))||[]).join("")},e.prototype.removeFormatting=function(t){var e=this.props,r=e.format,o=e.removeFormatting;return t?(r?t="string"==typeof r?this.removePatternFormatting(t):"function"==typeof o?o(t):(t.match(this.getNumberRegex(!0))||[]).join(""):(t=this.removePrefixAndSuffix(t),t=this.getFloatString(t)),t):t},e.prototype.formatWithPattern=function(t){for(var e=this.props.format,r=0,o=e.split(""),n=0,a=e.length;n<a;n++)"#"===e[n]&&(o[n]=t[r]||this.getMaskAtIndex(r),r+=1);return o.join("")},e.prototype.formatAsNumber=function(t){var e=this.props,r=e.decimalScale,o=e.fixedDecimalScale,n=e.prefix,a=e.suffix,i=e.allowNegative,s=e.thousandsGroupStyle,u=this.getSeparators(),c=u.thousandSeparator,f=u.decimalSeparator,h=-1!==t.indexOf(".")||r&&o,m=l(t,i),g=m.beforeDecimal,d=m.afterDecimal,v=m.addNegation;return void 0!==r&&(d=p(d,r,o)),c&&(g=function(t,e,r){var o=function(t){switch(t){case"lakh":return/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;case"wan":return/(\d)(?=(\d{4})+(?!\d))/g;case"thousand":default:return/(\d)(?=(\d{3})+(?!\d))/g}}(r),n=t.search(/[1-9]/);return n=-1===n?t.length:n,t.substring(0,n)+t.substring(n,t.length).replace(o,"$1"+e)}(g,c,s)),n&&(g=n+g),a&&(d+=a),v&&(g="-"+g),g+(h&&f||"")+d},e.prototype.formatNumString=function(t){void 0===t&&(t="");var e=this.props,r=e.format,o=e.allowEmptyFormatting,n=e.customNumerals,a=t;if(n&&10===n.length){var i=new RegExp("["+n.join("")+"]","g");a=t.replace(i,(function(t){return n.indexOf(t).toString()}))}return""!==t||o?"-"!==t||r?"string"==typeof r?this.formatWithPattern(a):"function"==typeof r?r(a):this.formatAsNumber(a):"-":""},e.prototype.formatValueProp=function(t){var e=this.props,r=e.format,o=e.decimalScale,n=e.fixedDecimalScale,a=e.allowEmptyFormatting,i=this.props,u=i.value,f=i.isNumericString,h=!(u=s(u)?t:u)&&0!==u;return h&&a&&(u=""),h&&!a?"":("number"==typeof u&&(u=function(t){var e="-"===(t+="")[0]?"-":"";e&&(t=t.substring(1));var r=t.split(/[eE]/g),o=r[0],n=r[1];if(!(n=Number(n)))return e+o;var a=1+n,i=(o=o.replace(".","")).length;return a<0?o="0."+c("0",Math.abs(a))+o:a>=i?o+=c("0",a-i):o=(o.substring(0,a)||"0")+"."+o.substring(a),e+o}(u),f=!0),"Infinity"===u&&f&&(u=""),f&&!r&&"number"==typeof o&&(u=function(t,e,r){if(-1!==["","-"].indexOf(t))return t;var o=-1!==t.indexOf(".")&&e,n=l(t),a=n.beforeDecimal,i=n.afterDecimal,s=n.hasNagation,u=parseFloat("0."+(i||"0")),c=(i.length<=e?"0."+i:u.toFixed(e)).split(".");return(s?"-":"")+a.split("").reverse().reduce((function(t,e,r){return t.length>r?(Number(t[0])+Number(e)).toString()+t.substring(1,t.length):e+t}),c[0])+(o?".":"")+p(c[1]||"",Math.min(e,i.length),r)}(u,o,n)),f?this.formatNumString(u):this.formatInput(u))},e.prototype.formatNegation=function(t){void 0===t&&(t="");var e=this.props.allowNegative,r=new RegExp("(-)"),o=new RegExp("(-)(.)*(-)"),n=r.test(t),a=o.test(t);return t=t.replace(/-/g,""),n&&!a&&e&&(t="-"+t),t},e.prototype.formatInput=function(t){return void 0===t&&(t=""),this.props.format||(t=this.removePrefixAndSuffix(t),t=this.formatNegation(t)),t=this.removeFormatting(t),this.formatNumString(t)},e.prototype.isCharacterAFormat=function(t,e){var r=this.props,o=r.format,n=r.prefix,a=r.suffix,i=r.decimalScale,s=r.fixedDecimalScale,u=this.getSeparators().decimalSeparator;return"string"==typeof o&&"#"!==o[t]||!(o||!(t<n.length||t>=e.length-a.length||i&&s&&e[t]===u))},e.prototype.correctInputValue=function(t,e,r){var o=this,n=this.props,a=n.format,i=n.allowNegative,s=n.prefix,u=n.suffix,p=n.decimalScale,c=this.getSeparators(),f=c.allowedDecimalSeparators,h=c.decimalSeparator,m=this.state.numAsString||"",g=this.selectionBeforeInput,d=g.selectionStart,v=g.selectionEnd,S=function(t,e){for(var r=0,o=0,n=t.length,a=e.length;t[r]===e[r]&&r<n;)r++;for(;t[n-1-o]===e[a-1-o]&&a-o>r&&n-o>r;)o++;return{start:r,end:n-o}}(e,r),y=S.start,x=S.end;if(!a&&y===x&&-1!==f.indexOf(r[d])){var b=0===p?"":h;return r.substr(0,d)+b+r.substr(d+1,r.length)}var w=a?0:s.length,N=e.length-(a?0:u.length);if(r.length>e.length||!r.length||y===x||0===d&&v===e.length||0===y&&x===e.length||d===w&&v===N)return r;var P=e.substr(y,x-y);if([].concat(P).find((function(t,r){return o.isCharacterAFormat(r+y,e)}))){var F=e.substr(y),D={},C=[];[].concat(F).forEach((function(t,r){o.isCharacterAFormat(r+y,e)?D[r]=t:r>P.length-1&&C.push(t)})),Object.keys(D).forEach((function(t){C.length>t?C.splice(t,0,D[t]):C.push(D[t])})),r=e.substr(0,y)+C.join("")}if(!a){var V=this.removeFormatting(r),A=l(V,i),E=A.beforeDecimal,O=A.afterDecimal,R=A.addNegation,j=t<r.indexOf(h)+1;if(V.length<m.length&&j&&""===E&&!parseFloat(O))return R?"-":""}return r},e.prototype.updateValue=function(t){var e=t.formattedValue,r=t.input,o=t.setCaretPosition;void 0===o&&(o=!0);var n=t.source,a=t.event,i=t.numAsString,s=t.caretPos,u=this.props.onValueChange,l=this.state.value;if(r){if(void 0===s&&o){var p=t.inputValue||r.value,c=m(r);r.value=e,s=this.getCaretPosition(p,e,c)}r.value=e,o&&this.setPatchedCaretPosition(r,s,e)}void 0===i&&(i=this.removeFormatting(e)),e!==l&&(this.setState({value:e,numAsString:i}),u(this.getValueObject(e,i),{event:a,source:n}))},e.prototype.onChange=function(t){var e=t.target,r=e.value,o=this.state,n=this.props,a=n.isAllowed,i=o.value||"",s=m(e);r=this.correctInputValue(s,i,r);var u=this.formatInput(r)||"",l=this.removeFormatting(u),p=a(this.getValueObject(u,l));p||(u=i),this.updateValue({formattedValue:u,numAsString:l,inputValue:r,input:e,event:t,source:"event"}),p&&n.onChange(t)},e.prototype.onBlur=function(t){var e=this.props,r=this.state,o=e.format,n=e.onBlur,a=e.allowLeadingZeros,i=r.numAsString,s=r.value;if(this.focusedElm=null,clearTimeout(this.focusTimeout),clearTimeout(this.caretPositionTimeout),!o){isNaN(parseFloat(i))&&(i=""),a||(i=function(t){if(!t)return t;var e="-"===t[0];e&&(t=t.substring(1,t.length));var r=t.split("."),o=r[0].replace(/^0+/,"")||"0",n=r[1]||"";return(e?"-":"")+o+(n?"."+n:"")}(i));var u=this.formatNumString(i);if(u!==s)return this.updateValue({formattedValue:u,numAsString:i,input:t.target,setCaretPosition:!1,event:t,source:"event"}),void n(t)}n(t)},e.prototype.onKeyDown=function(t){var e,r=t.target,o=t.key,n=r.selectionStart,a=r.selectionEnd,i=r.value;void 0===i&&(i="");var s=this.props,u=s.decimalScale,l=s.fixedDecimalScale,p=s.prefix,c=s.suffix,f=s.format,h=s.onKeyDown,m=void 0!==u&&l,g=this.getNumberRegex(!1,m),d=new RegExp("-"),v="string"==typeof f;if(this.selectionBeforeInput={selectionStart:n,selectionEnd:a},"ArrowLeft"===o||"Backspace"===o?e=n-1:"ArrowRight"===o?e=n+1:"Delete"===o&&(e=n),void 0!==e&&n===a){var S=e,y=v?f.indexOf("#"):p.length,x=v?f.lastIndexOf("#")+1:i.length-c.length;if("ArrowLeft"===o||"ArrowRight"===o){var b="ArrowLeft"===o?"left":"right";S=this.correctCaretPosition(i,e,b)}else if("Delete"!==o||g.test(i[e])||d.test(i[e])){if("Backspace"===o&&!g.test(i[e]))if(n<=y+1&&"-"===i[0]&&void 0===f){var w=i.substring(1);this.updateValue({formattedValue:w,caretPos:S,input:r,event:t,source:"event"})}else if(!d.test(i[e])){for(;!g.test(i[S-1])&&S>y;)S--;S=this.correctCaretPosition(i,S,"left")}}else for(;!g.test(i[S])&&S<x;)S++;(S!==e||e<y||e>x)&&(t.preventDefault(),this.setPatchedCaretPosition(r,S,i)),t.isUnitTestRun&&this.setPatchedCaretPosition(r,S,i),h(t)}else h(t)},e.prototype.onMouseUp=function(t){var e=t.target,r=e.selectionStart,o=e.selectionEnd,n=e.value;if(void 0===n&&(n=""),r===o){var a=this.correctCaretPosition(n,r);a!==r&&this.setPatchedCaretPosition(e,a,n)}this.props.onMouseUp(t)},e.prototype.onFocus=function(t){var e=this;t.persist(),this.focusedElm=t.target,this.focusTimeout=setTimeout((function(){var r=t.target,o=r.selectionStart,n=r.selectionEnd,a=r.value;void 0===a&&(a="");var i=e.correctCaretPosition(a,o);i===o||0===o&&n===a.length||e.setPatchedCaretPosition(r,i,a),e.props.onFocus(t)}),0)},e.prototype.render=function(){var t=this.props,e=t.type,r=t.displayType,o=t.customInput,a=t.renderText,i=t.getInputRef,s=t.format,u=(t.thousandSeparator,t.decimalSeparator,t.allowedDecimalSeparators,t.thousandsGroupStyle,t.decimalScale,t.fixedDecimalScale,t.prefix,t.suffix,t.removeFormatting,t.mask,t.defaultValue,t.isNumericString,t.allowNegative,t.allowEmptyFormatting,t.allowLeadingZeros,t.onValueChange,t.isAllowed,t.customNumerals,t.onChange,t.onKeyDown,t.onMouseUp,t.onFocus,t.onBlur,t.value,function(t,e){var r={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&-1===e.indexOf(o)&&(r[o]=t[o]);return r}(t,["type","displayType","customInput","renderText","getInputRef","format","thousandSeparator","decimalSeparator","allowedDecimalSeparators","thousandsGroupStyle","decimalScale","fixedDecimalScale","prefix","suffix","removeFormatting","mask","defaultValue","isNumericString","allowNegative","allowEmptyFormatting","allowLeadingZeros","onValueChange","isAllowed","customNumerals","onChange","onKeyDown","onMouseUp","onFocus","onBlur","value"])),l=this.state,p=l.value,c=l.mounted&&function(t){return t||"undefined"!=typeof navigator&&!(navigator.platform&&/iPhone|iPod/.test(navigator.platform))}(s)?"numeric":void 0,f=Object.assign({inputMode:c},u,{type:e,value:p,onChange:this.onChange,onKeyDown:this.onKeyDown,onMouseUp:this.onMouseUp,onFocus:this.onFocus,onBlur:this.onBlur});if("text"===r)return a?a(p,u)||null:n.a.createElement("span",Object.assign({},u,{ref:i}),p);if(o){var h=o;return n.a.createElement(h,Object.assign({},f,{ref:i}))}return n.a.createElement("input",Object.assign({},f,{ref:i}))},e}(n.a.Component);d.defaultProps=g,e.a=d}}]);