(self.webpackChunk_woocommerce_block_library=self.webpackChunk_woocommerce_block_library||[]).push([[116],{"./packages/components/checkbox-list/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@wordpress/i18n/build-module/index.js"),classnames__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__),_woocommerce_blocks_checkout__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/checkout/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__("./packages/components/checkbox-list/style.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const CheckboxList=({className,onChange,options=[],checked=[],isLoading=!1,isDisabled=!1,limit=10})=>{const[showExpanded,setShowExpanded]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),placeholder=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>[...Array(5)].map(((x,i)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li",{style:{width:Math.floor(75*Math.random())+25+"%"},children:" "},i)))),[]),renderedShowMore=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>{const remainingOptionsCount=options.length-limit;return!showExpanded&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li",{className:"show-more",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button",{onClick:()=>{setShowExpanded(!0)},"aria-expanded":!1,"aria-label":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._n)("Show %s more option","Show %s more options",remainingOptionsCount,"woo-gutenberg-products-block"),remainingOptionsCount),children:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._n)("Show %s more","Show %s more",remainingOptionsCount,"woo-gutenberg-products-block"),remainingOptionsCount)})},"show-more")}),[options,limit,showExpanded]),renderedShowLess=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>showExpanded&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li",{className:"show-less",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button",{onClick:()=>{setShowExpanded(!1)},"aria-expanded":!0,"aria-label":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Show less options","woo-gutenberg-products-block"),children:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Show less","woo-gutenberg-products-block")})},"show-less")),[showExpanded]),renderedOptions=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>{const shouldTruncateOptions=options.length>limit+5;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment,{children:[options.map(((option,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li",{...shouldTruncateOptions&&!showExpanded&&index>=limit&&{hidden:!0},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_woocommerce_blocks_checkout__WEBPACK_IMPORTED_MODULE_3__.Z8,{id:option.value,className:"wc-block-checkbox-list__checkbox",label:option.label,checked:checked.includes(option.value),onChange:()=>{onChange(option.value)},disabled:isDisabled})}),shouldTruncateOptions&&index===limit-1&&renderedShowMore]},option.value))),shouldTruncateOptions&&renderedShowLess]})}),[options,onChange,checked,showExpanded,limit,renderedShowLess,renderedShowMore,isDisabled]),classes=classnames__WEBPACK_IMPORTED_MODULE_2___default()("wc-block-checkbox-list","wc-block-components-checkbox-list",{"is-loading":isLoading},className);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("ul",{className:classes,children:isLoading?placeholder:renderedOptions})};CheckboxList.displayName="CheckboxList",CheckboxList.__docgenInfo={description:"Component used to show a list of checkboxes in a group.\n\n@param {Object}               props            Incoming props for the component.\n@param {string}               props.className  CSS class used.\n@param {function(string):any} props.onChange   Function called when inputs change.\n@param {Array}                props.options    Options for list.\n@param {Array}                props.checked    Which items are checked.\n@param {boolean}              props.isLoading  If loading or not.\n@param {boolean}              props.isDisabled If inputs are disabled or not.\n@param {number}               props.limit      Whether to limit the number of inputs showing.",methods:[],displayName:"CheckboxList",props:{options:{defaultValue:{value:"[]",computed:!1},required:!1,tsType:{name:"union",raw:"CheckboxListOptions[] | undefined",elements:[{name:"Array",elements:[{name:"CheckboxListOptions"}],raw:"CheckboxListOptions[]"},{name:"undefined"}]},description:""},checked:{defaultValue:{value:"[]",computed:!1},required:!1,tsType:{name:"union",raw:"string[] | undefined",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"undefined"}]},description:""},isLoading:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""},isDisabled:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}]},description:""},limit:{defaultValue:{value:"10",computed:!1},required:!1,tsType:{name:"union",raw:"number | undefined",elements:[{name:"number"},{name:"undefined"}]},description:""},className:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"( value: string ) => void | undefined",signature:{arguments:[{name:"value",type:{name:"string"}}],return:{name:"union",raw:"void | undefined",elements:[{name:"void"},{name:"undefined"}]}}},description:""}}};const __WEBPACK_DEFAULT_EXPORT__=CheckboxList;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/checkbox-list/index.tsx"]={name:"CheckboxList",docgenInfo:CheckboxList.__docgenInfo,path:"packages/components/checkbox-list/index.tsx"})},"./packages/components/chip/chip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var classnames__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./packages/components/chip/style.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const Chip=({text,screenReaderText="",element="li",className="",radius="small",children=null,...props})=>{const Wrapper=element,wrapperClassName=classnames__WEBPACK_IMPORTED_MODULE_1___default()(className,"wc-block-components-chip","wc-block-components-chip--radius-"+radius),showScreenReaderText=Boolean(screenReaderText&&screenReaderText!==text);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Wrapper,{className:wrapperClassName,...props,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span",{"aria-hidden":showScreenReaderText,className:"wc-block-components-chip__text",children:text}),showScreenReaderText&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span",{className:"screen-reader-text",children:screenReaderText}),children]})};Chip.displayName="Chip",Chip.__docgenInfo={description:'Component used to render a "chip" -- a list item containing some text.\n\nEach chip defaults to a list element but this can be customized by providing\na wrapperElement.',methods:[],displayName:"Chip",props:{screenReaderText:{defaultValue:{value:"''",computed:!1},required:!1},element:{defaultValue:{value:"'li'",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1},radius:{defaultValue:{value:"'small'",computed:!1},required:!1},children:{defaultValue:{value:"null",computed:!1},required:!1}}};const __WEBPACK_DEFAULT_EXPORT__=Chip;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/chip/chip.tsx"]={name:"Chip",docgenInfo:Chip.__docgenInfo,path:"packages/components/chip/chip.tsx"})},"./packages/components/chip/removable-chip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{h:()=>RemovableChip,Z:()=>removable_chip});var react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),build_module=__webpack_require__("./node_modules/@wordpress/i18n/build-module/index.js"),icon=__webpack_require__("./node_modules/@wordpress/icons/build-module/icon/index.js"),svg=__webpack_require__("./node_modules/@wordpress/primitives/build-module/svg/index.js");const close_small=(0,react.createElement)(svg.Wj,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,react.createElement)(svg.y$,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"}));var chip=__webpack_require__("./packages/components/chip/chip.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const RemovableChip=({ariaLabel="",className="",disabled=!1,onRemove=()=>{},removeOnAnyClick=!1,text,screenReaderText="",...props})=>{const RemoveElement=removeOnAnyClick?"span":"button";if(!ariaLabel){const ariaLabelText=screenReaderText&&"string"==typeof screenReaderText?screenReaderText:text;ariaLabel="string"!=typeof ariaLabelText?(0,build_module.__)("Remove","woo-gutenberg-products-block"):(0,build_module.sprintf)((0,build_module.__)('Remove "%s"',"woo-gutenberg-products-block"),ariaLabelText)}const clickableElementProps={"aria-label":ariaLabel,disabled,onClick:onRemove,onKeyDown:e=>{"Backspace"!==e.key&&"Delete"!==e.key||onRemove()}},chipProps=removeOnAnyClick?clickableElementProps:{},removeProps=removeOnAnyClick?{"aria-hidden":!0}:clickableElementProps;return(0,jsx_runtime.jsx)(chip.Z,{...props,...chipProps,className:classnames_default()(className,"is-removable"),element:removeOnAnyClick?"button":props.element,screenReaderText,text,children:(0,jsx_runtime.jsx)(RemoveElement,{className:"wc-block-components-chip__remove",...removeProps,children:(0,jsx_runtime.jsx)(icon.Z,{className:"wc-block-components-chip__remove-icon",icon:close_small,size:16,role:"img"})})})};RemovableChip.displayName="RemovableChip",RemovableChip.__docgenInfo={description:'Component used to render a "chip" -- an item containing some text with\nan X button to remove/dismiss each chip.',methods:[],displayName:"RemovableChip",props:{ariaLabel:{defaultValue:{value:"''",computed:!1},required:!1,tsType:{name:"string"},description:"Aria label content."},className:{defaultValue:{value:"''",computed:!1},required:!1,tsType:{name:"string"},description:"CSS class used."},disabled:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:"Whether action is disabled or not."},onRemove:{defaultValue:{value:"() => void 0",computed:!1},required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Function to call when remove event is fired."},removeOnAnyClick:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:"Whether to expand click area for remove event."},screenReaderText:{defaultValue:{value:"''",computed:!1},required:!1}},composes:["ChipProps"]};const removable_chip=RemovableChip;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/chip/removable-chip.tsx"]={name:"RemovableChip",docgenInfo:RemovableChip.__docgenInfo,path:"packages/components/chip/removable-chip.tsx"})},"./packages/components/form-step/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var classnames__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__),_title__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./packages/components/form-step/style.scss"),__webpack_require__("./packages/components/title/index.tsx")),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const StepHeading=({title,stepHeadingContent})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"wc-block-components-checkout-step__heading",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_title__WEBPACK_IMPORTED_MODULE_3__.Z,{"aria-hidden":"true",className:"wc-block-components-checkout-step__title",headingLevel:"2",children:title}),!!stepHeadingContent&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span",{className:"wc-block-components-checkout-step__heading-content",children:stepHeadingContent})]});StepHeading.displayName="StepHeading";const FormStep=({id,className,title,legend,description,children,disabled=!1,showStepNumber=!0,stepHeadingContent=()=>{}})=>{const Element=legend||title?"fieldset":"div";return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(Element,{className:classnames__WEBPACK_IMPORTED_MODULE_1___default()(className,"wc-block-components-checkout-step",{"wc-block-components-checkout-step--with-step-number":showStepNumber,"wc-block-components-checkout-step--disabled":disabled}),id,disabled,children:[!(!legend&&!title)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("legend",{className:"screen-reader-text",children:legend||title}),!!title&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(StepHeading,{title,stepHeadingContent:stepHeadingContent()}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"wc-block-components-checkout-step__container",children:[!!description&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p",{className:"wc-block-components-checkout-step__description",children:description}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"wc-block-components-checkout-step__content",children})]})]})};FormStep.displayName="FormStep",FormStep.__docgenInfo={description:"",methods:[],displayName:"FormStep",props:{disabled:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:""},showStepNumber:{defaultValue:{value:"true",computed:!1},required:!1,tsType:{name:"boolean"},description:""},stepHeadingContent:{defaultValue:{value:"() => undefined",computed:!1},required:!1,tsType:{name:"signature",type:"function",raw:"() => JSX.Element | undefined",signature:{arguments:[],return:{name:"union",raw:"JSX.Element | undefined",elements:[{name:"JSX.Element"},{name:"undefined"}]}}},description:""},id:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},title:{required:!1,tsType:{name:"string"},description:""},legend:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const __WEBPACK_DEFAULT_EXPORT__=FormStep;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/form-step/index.tsx"]={name:"FormStep",docgenInfo:FormStep.__docgenInfo,path:"packages/components/form-step/index.tsx"})},"./packages/components/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{sY:()=>formatted_monetary_amount.Z,__:()=>label.Z,hm:()=>removable_chip.Z,$j:()=>spinner.Z,OL:()=>validated_text_input.Z,UB:()=>validation_input_error.Z});__webpack_require__("./packages/components/button/index.ts"),__webpack_require__("./packages/components/checkbox-list/index.tsx"),__webpack_require__("./packages/components/chip/chip.tsx");var removable_chip=__webpack_require__("./packages/components/chip/removable-chip.tsx"),formatted_monetary_amount=(__webpack_require__("./packages/components/form-step/index.tsx"),__webpack_require__("./packages/components/formatted-monetary-amount/index.tsx")),label=__webpack_require__("./packages/components/label/index.tsx"),spinner=(__webpack_require__("./packages/components/panel/index.tsx"),__webpack_require__("./packages/components/radio-control/index.tsx"),__webpack_require__("./packages/components/radio-control-accordion/index.tsx"),__webpack_require__("./packages/components/sort-select/index.tsx"),__webpack_require__("./packages/components/spinner/index.tsx")),validated_text_input=(__webpack_require__("./packages/components/store-notice/index.tsx"),__webpack_require__("./packages/components/store-notices-container/index.tsx"),__webpack_require__("./packages/components/textarea/index.tsx"),__webpack_require__("./packages/components/text-input/validated-text-input.tsx")),validation_input_error=(__webpack_require__("./packages/components/text-input/text-input.tsx"),__webpack_require__("./packages/components/title/index.tsx"),__webpack_require__("./packages/components/validation-input-error/index.tsx"))},"./packages/components/radio-control-accordion/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>RadioControlAccordion});__webpack_require__("./node_modules/react/index.js");var classnames__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__),_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@wordpress/compose/build-module/higher-order/with-instance-id/index.js"),_radio_control__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/radio-control/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const RadioControlAccordion=({className,instanceId,id,selected,onChange,options=[]})=>{const radioControlId=id||instanceId;return options.length?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{className:classnames__WEBPACK_IMPORTED_MODULE_1___default()("wc-block-components-radio-control",className),children:options.map((option=>{const hasOptionContent="object"==typeof option&&"content"in option,checked=option.value===selected;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div",{className:"wc-block-components-radio-control-accordion-option",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_radio_control__WEBPACK_IMPORTED_MODULE_2__.vN,{name:`radio-control-${radioControlId}`,checked,option,onChange:value=>{onChange(value),"function"==typeof option.onChange&&option.onChange(value)}}),hasOptionContent&&checked&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{className:classnames__WEBPACK_IMPORTED_MODULE_1___default()("wc-block-components-radio-control-accordion-content",{"wc-block-components-radio-control-accordion-content-hide":!checked}),children:option.content})]},option.value)}))}):null};RadioControlAccordion.displayName="RadioControlAccordion",RadioControlAccordion.__docgenInfo={description:"",methods:[],displayName:"RadioControlAccordion",props:{options:{defaultValue:{value:"[]",computed:!1},required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\n\tvalue: string;\n\tlabel: string | JSX.Element;\n\tonChange?: ( value: string ) => void;\n\tname: string;\n\tcontent: JSX.Element;\n}",signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"label",value:{name:"union",raw:"string | JSX.Element",elements:[{name:"string"},{name:"JSX.Element"}],required:!0}},{key:"onChange",value:{name:"signature",type:"function",raw:"( value: string ) => void",signature:{arguments:[{name:"value",type:{name:"string"}}],return:{name:"void"}},required:!1}},{key:"name",value:{name:"string",required:!0}},{key:"content",value:{name:"JSX.Element",required:!0}}]}}],raw:"Array< {\n\tvalue: string;\n\tlabel: string | JSX.Element;\n\tonChange?: ( value: string ) => void;\n\tname: string;\n\tcontent: JSX.Element;\n} >"},description:""},className:{required:!1,tsType:{name:"string"},description:""},instanceId:{required:!0,tsType:{name:"number"},description:""},id:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"( value: string ) => void",signature:{arguments:[{name:"value",type:{name:"string"}}],return:{name:"void"}}},description:""},selected:{required:!0,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""}}};(0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.Z)(RadioControlAccordion);"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/radio-control-accordion/index.tsx"]={name:"RadioControlAccordion",docgenInfo:RadioControlAccordion.__docgenInfo,path:"packages/components/radio-control-accordion/index.tsx"})},"./packages/components/radio-control/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{vN:()=>radio_control_option,ZP:()=>radio_control});__webpack_require__("./node_modules/react/index.js");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),use_instance_id=__webpack_require__("./node_modules/@wordpress/compose/build-module/hooks/use-instance-id/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const OptionLayout=({label,secondaryLabel,description,secondaryDescription,id})=>(0,jsx_runtime.jsxs)("div",{className:"wc-block-components-radio-control__option-layout",children:[(0,jsx_runtime.jsxs)("div",{className:"wc-block-components-radio-control__label-group",children:[label&&(0,jsx_runtime.jsx)("span",{id:id&&`${id}__label`,className:"wc-block-components-radio-control__label",children:label}),secondaryLabel&&(0,jsx_runtime.jsx)("span",{id:id&&`${id}__secondary-label`,className:"wc-block-components-radio-control__secondary-label",children:secondaryLabel})]}),(description||secondaryDescription)&&(0,jsx_runtime.jsxs)("div",{className:"wc-block-components-radio-control__description-group",children:[description&&(0,jsx_runtime.jsx)("span",{id:id&&`${id}__description`,className:"wc-block-components-radio-control__description",children:description}),secondaryDescription&&(0,jsx_runtime.jsx)("span",{id:id&&`${id}__secondary-description`,className:"wc-block-components-radio-control__secondary-description",children:secondaryDescription})]})]});OptionLayout.displayName="OptionLayout",OptionLayout.__docgenInfo={description:"",methods:[],displayName:"OptionLayout"};const option_layout=OptionLayout;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/radio-control/option-layout.tsx"]={name:"OptionLayout",docgenInfo:OptionLayout.__docgenInfo,path:"packages/components/radio-control/option-layout.tsx"});const Option=({checked,name,onChange,option,disabled=!1})=>{const{value,label,description,secondaryLabel,secondaryDescription}=option;return(0,jsx_runtime.jsxs)("label",{className:classnames_default()("wc-block-components-radio-control__option",{"wc-block-components-radio-control__option-checked":checked}),htmlFor:`${name}-${value}`,children:[(0,jsx_runtime.jsx)("input",{id:`${name}-${value}`,className:"wc-block-components-radio-control__input",type:"radio",name,value,onChange:event=>onChange(event.target.value),checked,"aria-describedby":classnames_default()({[`${name}-${value}__label`]:label,[`${name}-${value}__secondary-label`]:secondaryLabel,[`${name}-${value}__description`]:description,[`${name}-${value}__secondary-description`]:secondaryDescription}),disabled}),(0,jsx_runtime.jsx)(option_layout,{id:`${name}-${value}`,label,secondaryLabel,description,secondaryDescription})]})};Option.displayName="Option",Option.__docgenInfo={description:"",methods:[],displayName:"Option",props:{disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};const radio_control_option=Option;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/radio-control/option.tsx"]={name:"Option",docgenInfo:Option.__docgenInfo,path:"packages/components/radio-control/option.tsx"});__webpack_require__("./packages/components/radio-control/style.scss");const RadioControl=({className="",id,selected="",onChange,options=[],disabled=!1})=>{const instanceId=(0,use_instance_id.Z)(RadioControl),radioControlId=id||instanceId;return options.length?(0,jsx_runtime.jsx)("div",{className:classnames_default()("wc-block-components-radio-control",className),children:options.map((option=>(0,jsx_runtime.jsx)(radio_control_option,{name:`radio-control-${radioControlId}`,checked:option.value===selected,option,onChange:value=>{onChange(value),"function"==typeof option.onChange&&option.onChange(value)},disabled},`${radioControlId}-${option.value}`)))}):null};RadioControl.displayName="RadioControl",RadioControl.__docgenInfo={description:"",methods:[],displayName:"RadioControl",props:{className:{defaultValue:{value:"''",computed:!1},required:!1},selected:{defaultValue:{value:"''",computed:!1},required:!1},options:{defaultValue:{value:"[]",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};const radio_control=RadioControl;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/radio-control/index.tsx"]={name:"RadioControl",docgenInfo:RadioControl.__docgenInfo,path:"packages/components/radio-control/index.tsx"})},"./packages/components/sort-select/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{g:()=>SortSelect});__webpack_require__("./node_modules/react/index.js");var classnames__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__),_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@wordpress/compose/build-module/higher-order/with-instance-id/index.js"),_label__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./packages/components/sort-select/style.scss"),__webpack_require__("./packages/components/label/index.tsx")),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const SortSelect=({className,instanceId,label="",onChange,options,screenReaderLabel,value="",readOnly=!1})=>{const selectId=`wc-block-components-sort-select__select-${instanceId}`;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:classnames__WEBPACK_IMPORTED_MODULE_1___default()("wc-block-sort-select","wc-block-components-sort-select",className),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_label__WEBPACK_IMPORTED_MODULE_3__.Z,{label,screenReaderLabel,wrapperElement:"label",wrapperProps:{className:"wc-block-sort-select__label wc-block-components-sort-select__label",htmlFor:selectId}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("select",{disabled:!!readOnly,id:selectId,className:"wc-block-sort-select__select wc-block-components-sort-select__select",onChange,value,children:options&&options.map((option=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("option",{value:option.key,children:option.label},option.key)))})]})};SortSelect.displayName="SortSelect",SortSelect.__docgenInfo={description:"Component used for 'Order by' selectors, which renders a label\nand a <select> with the options provided in the props.",methods:[],displayName:"SortSelect",props:{label:{defaultValue:{value:"''",computed:!1},required:!1,tsType:{name:"string"},description:"Label for the select."},value:{defaultValue:{value:"''",computed:!1},required:!1,tsType:{name:"string"},description:"The selected value."},readOnly:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:"Whether the select is read only."},instanceId:{required:!0,tsType:{name:"number"},description:"Unique id for component instance."},className:{required:!1,tsType:{name:"string"},description:"CSS class used."},onChange:{required:!0,tsType:{name:"ChangeEventHandler",elements:[{name:"HTMLSelectElement"}],raw:"ChangeEventHandler< HTMLSelectElement >"},description:"Function to call on the change event."},options:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\n\tkey: string;\n\tlabel: string;\n}",signature:{properties:[{key:"key",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}}]}}],raw:"{\n\tkey: string;\n\tlabel: string;\n}[]"},description:"Option values for the select."},screenReaderLabel:{required:!0,tsType:{name:"string"},description:"Screen reader label."}}};(0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.Z)(SortSelect);"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/sort-select/index.tsx"]={name:"SortSelect",docgenInfo:SortSelect.__docgenInfo,path:"packages/components/sort-select/index.tsx"})},"./packages/components/textarea/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var classnames__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./packages/components/textarea/style.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const Textarea=({className="",disabled=!1,onTextChange,placeholder,value=""})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("textarea",{className:classnames__WEBPACK_IMPORTED_MODULE_1___default()("wc-block-components-textarea",className),disabled,onChange:event=>{onTextChange(event.target.value)},placeholder,rows:2,value});Textarea.displayName="Textarea",Textarea.__docgenInfo={description:"",methods:[],displayName:"Textarea",props:{className:{defaultValue:{value:"''",computed:!1},required:!1,tsType:{name:"string"},description:""},disabled:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:""},value:{defaultValue:{value:"''",computed:!1},required:!1,tsType:{name:"string"},description:""},onTextChange:{required:!0,tsType:{name:"signature",type:"function",raw:"( newText: string ) => void",signature:{arguments:[{name:"newText",type:{name:"string"}}],return:{name:"void"}}},description:""},placeholder:{required:!0,tsType:{name:"string"},description:""}}};const __WEBPACK_DEFAULT_EXPORT__=Textarea;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/textarea/index.tsx"]={name:"Textarea",docgenInfo:Textarea.__docgenInfo,path:"packages/components/textarea/index.tsx"})},"./packages/components/title/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var classnames__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./packages/components/title/style.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const Title=({children,className="",headingLevel,...props})=>{const buttonClassName=classnames__WEBPACK_IMPORTED_MODULE_1___default()("wc-block-components-title",className),TagName=`h${headingLevel}`;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(TagName,{className:buttonClassName,...props,children})};Title.displayName="Title",Title.__docgenInfo={description:"Component that renders a block title.",methods:[],displayName:"Title",props:{className:{defaultValue:{value:"''",computed:!1},required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},headingLevel:{required:!0,tsType:{name:"union",raw:"'1' | '2' | '3' | '4' | '5' | '6'",elements:[{name:"literal",value:"'1'"},{name:"literal",value:"'2'"},{name:"literal",value:"'3'"},{name:"literal",value:"'4'"},{name:"literal",value:"'5'"},{name:"literal",value:"'6'"}]},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const __WEBPACK_DEFAULT_EXPORT__=Title;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/title/index.tsx"]={name:"Title",docgenInfo:Title.__docgenInfo,path:"packages/components/title/index.tsx"})},"./node_modules/@wordpress/compose/build-module/higher-order/with-instance-id/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>with_instance_id});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),lodash=__webpack_require__("./node_modules/lodash/lodash.js");const create_higher_order_component=function createHigherOrderComponent(mapComponent,modifierName){return Inner=>{const Outer=mapComponent(Inner),displayName=Inner.displayName||Inner.name||"Component";return Outer.displayName=`${(0,lodash.upperFirst)((0,lodash.camelCase)(modifierName))}(${displayName})`,Outer}};var use_instance_id=__webpack_require__("./node_modules/@wordpress/compose/build-module/hooks/use-instance-id/index.js");const with_instance_id=create_higher_order_component((WrappedComponent=>props=>{const instanceId=(0,use_instance_id.Z)(WrappedComponent);return(0,react.createElement)(WrappedComponent,(0,esm_extends.Z)({},props,{instanceId}))}),"withInstanceId")},"./packages/components/checkbox-list/style.scss":()=>{},"./packages/components/chip/style.scss":()=>{},"./packages/components/form-step/style.scss":()=>{},"./packages/components/radio-control/style.scss":()=>{},"./packages/components/sort-select/style.scss":()=>{},"./packages/components/textarea/style.scss":()=>{},"./packages/components/title/style.scss":()=>{}}]);