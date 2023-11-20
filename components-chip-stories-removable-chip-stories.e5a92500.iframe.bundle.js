/*! For license information please see components-chip-stories-removable-chip-stories.e5a92500.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_woocommerce_block_library=self.webpackChunk_woocommerce_block_library||[]).push([[4727],{"./packages/components/chip/stories/removable-chip.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _removable_chip__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/chip/removable-chip.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"External Components/RemovableChip",component:_removable_chip__WEBPACK_IMPORTED_MODULE_1__.h,argTypes:{element:{control:"radio",options:["li","div","span"]}}},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_removable_chip__WEBPACK_IMPORTED_MODULE_1__.h,{...args});Template.displayName="Template";const Default=Template.bind({});Default.args={element:"li",text:"Take me to the casino",screenReaderText:"I'm a removable chip, me"},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <RemovableChip {...args} />",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./packages/components/chip/chip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var classnames__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./packages/components/chip/style.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const Chip=({text,screenReaderText="",element="li",className="",radius="small",children=null,...props})=>{const Wrapper=element,wrapperClassName=classnames__WEBPACK_IMPORTED_MODULE_1___default()(className,"wc-block-components-chip","wc-block-components-chip--radius-"+radius),showScreenReaderText=Boolean(screenReaderText&&screenReaderText!==text);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Wrapper,{className:wrapperClassName,...props,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span",{"aria-hidden":showScreenReaderText,className:"wc-block-components-chip__text",children:text}),showScreenReaderText&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span",{className:"screen-reader-text",children:screenReaderText}),children]})};Chip.displayName="Chip",Chip.__docgenInfo={description:'Component used to render a "chip" -- a list item containing some text.\n\nEach chip defaults to a list element but this can be customized by providing\na wrapperElement.',methods:[],displayName:"Chip",props:{screenReaderText:{defaultValue:{value:"''",computed:!1},required:!1},element:{defaultValue:{value:"'li'",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1},radius:{defaultValue:{value:"'small'",computed:!1},required:!1},children:{defaultValue:{value:"null",computed:!1},required:!1}}};const __WEBPACK_DEFAULT_EXPORT__=Chip;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/chip/chip.tsx"]={name:"Chip",docgenInfo:Chip.__docgenInfo,path:"packages/components/chip/chip.tsx"})},"./packages/components/chip/removable-chip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{h:()=>RemovableChip,Z:()=>removable_chip});var react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),build_module=__webpack_require__("./node_modules/@wordpress/i18n/build-module/index.js"),icon=__webpack_require__("./node_modules/@wordpress/icons/build-module/icon/index.js"),svg=__webpack_require__("./node_modules/@wordpress/primitives/build-module/svg/index.js");const close_small=(0,react.createElement)(svg.Wj,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,react.createElement)(svg.y$,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"}));var chip=__webpack_require__("./packages/components/chip/chip.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const RemovableChip=({ariaLabel="",className="",disabled=!1,onRemove=()=>{},removeOnAnyClick=!1,text,screenReaderText="",...props})=>{const RemoveElement=removeOnAnyClick?"span":"button";if(!ariaLabel){const ariaLabelText=screenReaderText&&"string"==typeof screenReaderText?screenReaderText:text;ariaLabel="string"!=typeof ariaLabelText?(0,build_module.__)("Remove","woo-gutenberg-products-block"):(0,build_module.sprintf)((0,build_module.__)('Remove "%s"',"woo-gutenberg-products-block"),ariaLabelText)}const clickableElementProps={"aria-label":ariaLabel,disabled,onClick:onRemove,onKeyDown:e=>{"Backspace"!==e.key&&"Delete"!==e.key||onRemove()}},chipProps=removeOnAnyClick?clickableElementProps:{},removeProps=removeOnAnyClick?{"aria-hidden":!0}:clickableElementProps;return(0,jsx_runtime.jsx)(chip.Z,{...props,...chipProps,className:classnames_default()(className,"is-removable"),element:removeOnAnyClick?"button":props.element,screenReaderText,text,children:(0,jsx_runtime.jsx)(RemoveElement,{className:"wc-block-components-chip__remove",...removeProps,children:(0,jsx_runtime.jsx)(icon.Z,{className:"wc-block-components-chip__remove-icon",icon:close_small,size:16,role:"img"})})})};RemovableChip.displayName="RemovableChip",RemovableChip.__docgenInfo={description:'Component used to render a "chip" -- an item containing some text with\nan X button to remove/dismiss each chip.',methods:[],displayName:"RemovableChip",props:{ariaLabel:{defaultValue:{value:"''",computed:!1},required:!1,tsType:{name:"string"},description:"Aria label content."},className:{defaultValue:{value:"''",computed:!1},required:!1,tsType:{name:"string"},description:"CSS class used."},disabled:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:"Whether action is disabled or not."},onRemove:{defaultValue:{value:"() => void 0",computed:!1},required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Function to call when remove event is fired."},removeOnAnyClick:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:"Whether to expand click area for remove event."},screenReaderText:{defaultValue:{value:"''",computed:!1},required:!1}},composes:["ChipProps"]};const removable_chip=RemovableChip;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/chip/removable-chip.tsx"]={name:"RemovableChip",docgenInfo:RemovableChip.__docgenInfo,path:"packages/components/chip/removable-chip.tsx"})},"./node_modules/@wordpress/icons/build-module/icon/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const __WEBPACK_DEFAULT_EXPORT__=function Icon(_ref){let{icon,size=24,...props}=_ref;return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon,{width:size,height:size,...props})}},"./node_modules/@wordpress/primitives/build-module/svg/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Wj:()=>SVG,y$:()=>Path});var classnames__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__),_wordpress_element__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js");const Path=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path",props),SVG=_ref=>{let{className,isPressed,...props}=_ref;const appliedProps={...props,className:classnames__WEBPACK_IMPORTED_MODULE_0___default()(className,{"is-pressed":isPressed})||void 0,role:"img","aria-hidden":!0,focusable:!1};return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg",appliedProps)}},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType)if(arg.toString===Object.prototype.toString)for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key);else classes.push(arg.toString())}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./packages/components/chip/style.scss":()=>{}}]);