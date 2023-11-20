/*! For license information please see components-chip-stories-chip-stories.4ac6ad08.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_woocommerce_block_library=self.webpackChunk_woocommerce_block_library||[]).push([[2818],{"./packages/components/chip/stories/chip.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _chip__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/chip/chip.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"External Components/Chip",component:_chip__WEBPACK_IMPORTED_MODULE_1__.Z,argTypes:{element:{control:"radio",options:["li","div","span"]},className:{control:"text"},radius:{control:"radio",options:["none","small","medium","large"]}}},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_chip__WEBPACK_IMPORTED_MODULE_1__.Z,{...args});Template.displayName="Template";const Default=Template.bind({});Default.args={element:"li",text:"Take me to the casino!",screenReaderText:"I'm a chip, me"},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <Chip {...args} />",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./packages/components/chip/chip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var classnames__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./packages/components/chip/style.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const Chip=({text,screenReaderText="",element="li",className="",radius="small",children=null,...props})=>{const Wrapper=element,wrapperClassName=classnames__WEBPACK_IMPORTED_MODULE_1___default()(className,"wc-block-components-chip","wc-block-components-chip--radius-"+radius),showScreenReaderText=Boolean(screenReaderText&&screenReaderText!==text);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Wrapper,{className:wrapperClassName,...props,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span",{"aria-hidden":showScreenReaderText,className:"wc-block-components-chip__text",children:text}),showScreenReaderText&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span",{className:"screen-reader-text",children:screenReaderText}),children]})};Chip.displayName="Chip",Chip.__docgenInfo={description:'Component used to render a "chip" -- a list item containing some text.\n\nEach chip defaults to a list element but this can be customized by providing\na wrapperElement.',methods:[],displayName:"Chip",props:{screenReaderText:{defaultValue:{value:"''",computed:!1},required:!1},element:{defaultValue:{value:"'li'",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1},radius:{defaultValue:{value:"'small'",computed:!1},required:!1},children:{defaultValue:{value:"null",computed:!1},required:!1}}};const __WEBPACK_DEFAULT_EXPORT__=Chip;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/chip/chip.tsx"]={name:"Chip",docgenInfo:Chip.__docgenInfo,path:"packages/components/chip/chip.tsx"})},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType)if(arg.toString===Object.prototype.toString)for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key);else classes.push(arg.toString())}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./packages/components/chip/style.scss":()=>{},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";__webpack_require__("./node_modules/object-assign/index.js");var f=__webpack_require__("./node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);