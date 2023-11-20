(self.webpackChunk_woocommerce_block_library=self.webpackChunk_woocommerce_block_library||[]).push([[2406],{"./assets/js/editor-components/error-placeholder/error-message.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@wordpress/i18n/build-module/index.js"),_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@wordpress/escape-html/build-module/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const getErrorMessage=({message,type})=>message?"general"===type?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span",{children:[(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("The following error was returned","woo-gutenberg-products-block"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("br",{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("code",{children:(0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_3__.r)(message)})]}):"api"===type?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span",{children:[(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("The following error was returned from the API","woo-gutenberg-products-block"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("br",{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("code",{children:(0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_3__.r)(message)})]}):message:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("An error has prevented the block from being updated.","woo-gutenberg-products-block"),ErrorMessage=({error})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"wc-block-error-message",children:getErrorMessage(error)});ErrorMessage.displayName="ErrorMessage",ErrorMessage.__docgenInfo={description:"",methods:[],displayName:"ErrorMessage",props:{error:{required:!0,tsType:{name:"ErrorObject"},description:"The error object."}}};const __WEBPACK_DEFAULT_EXPORT__=ErrorMessage;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["assets/js/editor-components/error-placeholder/error-message.tsx"]={name:"ErrorMessage",docgenInfo:ErrorMessage.__docgenInfo,path:"assets/js/editor-components/error-placeholder/error-message.tsx"})},"./assets/js/editor-components/error-placeholder/stories/error-placeholder.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{APIError:()=>APIError,Default:()=>Default,NoRetry:()=>NoRetry,UnknownError:()=>UnknownError,__namedExportsOrder:()=>__namedExportsOrder,default:()=>error_placeholder_stories});__webpack_require__("./node_modules/react/index.js");var chunk_2WNKQWTL=__webpack_require__("./node_modules/@storybook/client-api/node_modules/@storybook/preview-api/dist/chunk-2WNKQWTL.mjs"),custom_controls=__webpack_require__("./storybook/custom-controls/index.ts"),build_module=__webpack_require__("./node_modules/@wordpress/i18n/build-module/index.js"),icon=__webpack_require__("./node_modules/@wordpress/icons/build-module/icon/index.js"),warning=__webpack_require__("./node_modules/@wordpress/icons/build-module/library/warning.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),placeholder=__webpack_require__("./node_modules/@wordpress/components/build-module/placeholder/index.js"),spinner=__webpack_require__("./node_modules/@wordpress/components/build-module/spinner/index.js"),build_module_button=__webpack_require__("./node_modules/@wordpress/components/build-module/button/index.js"),error_message=__webpack_require__("./assets/js/editor-components/error-placeholder/error-message.tsx"),jsx_runtime=(__webpack_require__("./assets/js/editor-components/error-placeholder/editor.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const ErrorPlaceholder=({className="",error,isLoading=!1,onRetry})=>(0,jsx_runtime.jsxs)(placeholder.Z,{icon:(0,jsx_runtime.jsx)(icon.Z,{icon:warning.Z}),label:(0,build_module.__)("Sorry, an error occurred","woo-gutenberg-products-block"),className:classnames_default()("wc-block-api-error",className),children:[(0,jsx_runtime.jsx)(error_message.Z,{error}),onRetry&&(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:isLoading?(0,jsx_runtime.jsx)(spinner.ZP,{}):(0,jsx_runtime.jsx)(build_module_button.Z,{isSecondary:!0,onClick:onRetry,children:(0,build_module.__)("Retry","woo-gutenberg-products-block")})})]});ErrorPlaceholder.displayName="ErrorPlaceholder",ErrorPlaceholder.__docgenInfo={description:"",methods:[],displayName:"ErrorPlaceholder",props:{className:{defaultValue:{value:"''",computed:!1},required:!1,tsType:{name:"string"},description:"Classname to add to placeholder in addition to the defaults."},isLoading:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:"Whether there is a request running, so the 'Retry' button is hidden and\na spinner is shown instead."},error:{required:!0,tsType:{name:"ErrorObject"},description:"The error object."},onRetry:{required:!1,tsType:{name:"union",raw:"( () => void ) | undefined",elements:[{name:"unknown"},{name:"undefined"}]},description:"Callback to retry an action."}}};const error_placeholder=ErrorPlaceholder;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["assets/js/editor-components/error-placeholder/index.tsx"]={name:"ErrorPlaceholder",docgenInfo:ErrorPlaceholder.__docgenInfo,path:"assets/js/editor-components/error-placeholder/index.tsx"});const error_placeholder_stories={title:"Editor Components/Errors/Error Placeholder",component:error_placeholder},Template=args=>{const[{isLoading},setArgs]=(0,chunk_2WNKQWTL.D8)(),onRetry=args.onRetry?()=>{setArgs({isLoading:!0}),setTimeout((()=>setArgs({isLoading:!1})),custom_controls.AJ)}:void 0;return(0,jsx_runtime.jsx)(error_placeholder,{...args,onRetry,isLoading})};Template.displayName="Template";const Default=Template.bind({});Default.args={error:{message:"A very generic and unhelpful error. Please try again later. Or contact support. Or not.",type:"general"}};const APIError=Template.bind({});APIError.args={error:{message:"Server refuses to comply. It is a teapot.",type:"api"}};const UnknownError=Template.bind({});UnknownError.args={error:{message:"",type:"general"}};const NoRetry=args=>(0,jsx_runtime.jsx)(error_placeholder,{...args,onRetry:void 0});NoRetry.displayName="NoRetry",NoRetry.args={error:{message:"",type:"general"}},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => {\n  const [{\n    isLoading\n  }, setArgs] = useArgs();\n  const onRetry = args.onRetry ? () => {\n    setArgs({\n      isLoading: true\n    });\n    setTimeout(() => setArgs({\n      isLoading: false\n    }), INTERACTION_TIMEOUT);\n  } : undefined;\n  return <ErrorPlaceholder {...args} onRetry={onRetry} isLoading={isLoading} />;\n}",...Default.parameters?.docs?.source}}},APIError.parameters={...APIError.parameters,docs:{...APIError.parameters?.docs,source:{originalSource:"args => {\n  const [{\n    isLoading\n  }, setArgs] = useArgs();\n  const onRetry = args.onRetry ? () => {\n    setArgs({\n      isLoading: true\n    });\n    setTimeout(() => setArgs({\n      isLoading: false\n    }), INTERACTION_TIMEOUT);\n  } : undefined;\n  return <ErrorPlaceholder {...args} onRetry={onRetry} isLoading={isLoading} />;\n}",...APIError.parameters?.docs?.source}}},UnknownError.parameters={...UnknownError.parameters,docs:{...UnknownError.parameters?.docs,source:{originalSource:"args => {\n  const [{\n    isLoading\n  }, setArgs] = useArgs();\n  const onRetry = args.onRetry ? () => {\n    setArgs({\n      isLoading: true\n    });\n    setTimeout(() => setArgs({\n      isLoading: false\n    }), INTERACTION_TIMEOUT);\n  } : undefined;\n  return <ErrorPlaceholder {...args} onRetry={onRetry} isLoading={isLoading} />;\n}",...UnknownError.parameters?.docs?.source}}},NoRetry.parameters={...NoRetry.parameters,docs:{...NoRetry.parameters?.docs,source:{originalSource:"args => {\n  return <ErrorPlaceholder {...args} onRetry={undefined} />;\n}",...NoRetry.parameters?.docs?.source}}},NoRetry.__docgenInfo={description:"",methods:[],displayName:"NoRetry"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["assets/js/editor-components/error-placeholder/stories/error-placeholder.stories.tsx"]={name:"NoRetry",docgenInfo:NoRetry.__docgenInfo,path:"assets/js/editor-components/error-placeholder/stories/error-placeholder.stories.tsx"});const __namedExportsOrder=["Default","APIError","UnknownError","NoRetry"]},"./storybook/custom-controls/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{AJ:()=>INTERACTION_TIMEOUT});const INTERACTION_TIMEOUT=1500},"./assets/js/editor-components/error-placeholder/editor.scss":()=>{}}]);