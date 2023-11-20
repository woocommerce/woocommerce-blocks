(self.webpackChunk_woocommerce_block_library=self.webpackChunk_woocommerce_block_library||[]).push([[9383],{"./assets/js/base/components/product-price/stories/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Range:()=>Range,Sale:()=>Sale,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});__webpack_require__("./node_modules/react/index.js");var currency=__webpack_require__("./storybook/custom-controls/currency.ts"),build_module=__webpack_require__("./node_modules/@wordpress/i18n/build-module/index.js"),components=__webpack_require__("./packages/components/index.ts"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),prices=__webpack_require__("./packages/prices/index.js"),create_interpolate_element=__webpack_require__("./node_modules/@wordpress/element/build-module/create-interpolate-element.js"),jsx_runtime=(__webpack_require__("./assets/js/base/components/product-price/style.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const PriceRange=({currency,maxPrice,minPrice,priceClassName,priceStyle={}})=>(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("span",{className:"screen-reader-text",children:(0,build_module.sprintf)((0,build_module.__)("Price between %1$s and %2$s","woo-gutenberg-products-block"),(0,prices.T4)(minPrice),(0,prices.T4)(maxPrice))}),(0,jsx_runtime.jsxs)("span",{"aria-hidden":!0,children:[(0,jsx_runtime.jsx)(components.sY,{className:classnames_default()("wc-block-components-product-price__value",priceClassName),currency,value:minPrice,style:priceStyle})," — ",(0,jsx_runtime.jsx)(components.sY,{className:classnames_default()("wc-block-components-product-price__value",priceClassName),currency,value:maxPrice,style:priceStyle})]})]}),SalePrice=({currency,regularPriceClassName,regularPriceStyle,regularPrice,priceClassName,priceStyle,price})=>(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("span",{className:"screen-reader-text",children:(0,build_module.__)("Previous price:","woo-gutenberg-products-block")}),(0,jsx_runtime.jsx)(components.sY,{currency,renderText:value=>(0,jsx_runtime.jsx)("del",{className:classnames_default()("wc-block-components-product-price__regular",regularPriceClassName),style:regularPriceStyle,children:value}),value:regularPrice}),(0,jsx_runtime.jsx)("span",{className:"screen-reader-text",children:(0,build_module.__)("Discounted price:","woo-gutenberg-products-block")}),(0,jsx_runtime.jsx)(components.sY,{currency,renderText:value=>(0,jsx_runtime.jsx)("ins",{className:classnames_default()("wc-block-components-product-price__value","is-discounted",priceClassName),style:priceStyle,children:value}),value:price})]}),ProductPrice=({align,className,currency,format="<price/>",maxPrice,minPrice,price,priceClassName,priceStyle,regularPrice,regularPriceClassName,regularPriceStyle,style})=>{const wrapperClassName=classnames_default()(className,"price","wc-block-components-product-price",{[`wc-block-components-product-price--align-${align}`]:align});format.includes("<price/>")||(format="<price/>",console.error("Price formats need to include the `<price/>` tag."));const isDiscounted=regularPrice&&price&&price<regularPrice;let priceComponent=(0,jsx_runtime.jsx)("span",{className:classnames_default()("wc-block-components-product-price__value",priceClassName)});return isDiscounted?priceComponent=(0,jsx_runtime.jsx)(SalePrice,{currency,price,priceClassName,priceStyle,regularPrice,regularPriceClassName,regularPriceStyle}):void 0!==minPrice&&void 0!==maxPrice?priceComponent=(0,jsx_runtime.jsx)(PriceRange,{currency,maxPrice,minPrice,priceClassName,priceStyle}):price&&(priceComponent=(0,jsx_runtime.jsx)(components.sY,{className:classnames_default()("wc-block-components-product-price__value",priceClassName),currency,value:price,style:priceStyle})),(0,jsx_runtime.jsx)("span",{className:wrapperClassName,style,children:(0,create_interpolate_element.Z)(format,{price:priceComponent})})};ProductPrice.displayName="ProductPrice",ProductPrice.__docgenInfo={description:"",methods:[],displayName:"ProductPrice",props:{format:{defaultValue:{value:"'<price/>'",computed:!1},required:!1,tsType:{name:"string"},description:"The string version of the element to use for the price interpolation\n\n**Note:** It should contain `<price/>` (which is also the default value)"},align:{required:!1,tsType:{name:"union",raw:"'left' | 'center' | 'right' | undefined",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'center'"},{name:"literal",value:"'right'"},{name:"undefined"}]},description:"Where to align the wrapper\n\nApplies the `wc-block-components-product-price--align-${ align }` utility\nclass to the wrapper."},className:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:"CSS class for the wrapper"},currency:{required:!1,tsType:{name:"union",raw:"Currency | Record< string, never >",elements:[{name:"Currency"},{name:"Record",elements:[{name:"string"},{name:"never"}],raw:"Record< string, never >"}]},description:"Currency configuration object"},price:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"The current price"},priceClassName:{required:!1,tsType:{name:"string"},description:"CSS class for the current price wrapper"},priceStyle:{required:!1,tsType:{name:"union",raw:"React.CSSProperties | undefined",elements:[{name:"ReactCSSProperties",raw:"React.CSSProperties"},{name:"undefined"}]},description:"Custom style for the current price"},maxPrice:{required:!1,tsType:{name:"union",raw:"number | string | undefined",elements:[{name:"number"},{name:"string"},{name:"undefined"}]},description:"The maximum price in a range\n\nIf both `maxPrice` and `minPrice` are set, the component will be rendered\nas a `PriceRange` component, otherwise, this value will be ignored."},minPrice:{required:!1,tsType:{name:"union",raw:"number | string | undefined",elements:[{name:"number"},{name:"string"},{name:"undefined"}]},description:"The minimum price in a range\n\nIf both `maxPrice` and `minPrice` are set, the component will be rendered\nas a `PriceRange` component, otherwise, this value will be ignored."},regularPrice:{required:!1,tsType:{name:"union",raw:"number | string | undefined",elements:[{name:"number"},{name:"string"},{name:"undefined"}]},description:"The regular price if the item is currently on sale\n\nIf this property exists and is different from the current price, then the\ncomponent will be rendered as a `SalePrice` component."},regularPriceClassName:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:"CSS class to apply to the regular price wrapper"},regularPriceStyle:{required:!1,tsType:{name:"union",raw:"React.CSSProperties | undefined",elements:[{name:"ReactCSSProperties",raw:"React.CSSProperties"},{name:"undefined"}]},description:"Custom style to apply to the regular price wrapper."},style:{required:!1,tsType:{name:"union",raw:"| Pick<\n\t\tReact.CSSProperties,\n\t\t'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft'\n  >\n| undefined",elements:[{name:"Pick",elements:[{name:"ReactCSSProperties",raw:"React.CSSProperties"},{name:"union",raw:"'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft'",elements:[{name:"literal",value:"'marginTop'"},{name:"literal",value:"'marginRight'"},{name:"literal",value:"'marginBottom'"},{name:"literal",value:"'marginLeft'"}]}],raw:"Pick<\nReact.CSSProperties,\n'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft'\n>"},{name:"undefined"}]},description:"Custom margin to apply to the price wrapper."}}};const product_price=ProductPrice;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["assets/js/base/components/product-price/index.tsx"]={name:"ProductPrice",docgenInfo:ProductPrice.__docgenInfo,path:"assets/js/base/components/product-price/index.tsx"});const index_stories={title:"Base Components/ProductPrice",component:product_price,argTypes:{align:{control:{type:"radio"},options:["left","center","right"]},currency:currency.I7},args:{align:"left",format:"<price/>",price:3e3,currency:{code:"USD",symbol:"$",thousandSeparator:" ",decimalSeparator:".",minorUnit:2,prefix:"$",suffix:""}}},Template=args=>(0,jsx_runtime.jsx)(product_price,{...args});Template.displayName="Template";const Default=Template.bind({});Default.args={};const Sale=Template.bind({});Sale.args={regularPrice:4500};const Range=Template.bind({});Range.args={maxPrice:5e3,minPrice:3e3},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <ProductPrice {...args} />",...Default.parameters?.docs?.source}}},Sale.parameters={...Sale.parameters,docs:{...Sale.parameters?.docs,source:{originalSource:"args => <ProductPrice {...args} />",...Sale.parameters?.docs?.source}}},Range.parameters={...Range.parameters,docs:{...Range.parameters?.docs,source:{originalSource:"args => <ProductPrice {...args} />",...Range.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Sale","Range"]},"./packages/prices/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{T4:()=>formatPrice});var default_constants=__webpack_require__("./assets/js/settings/shared/default-constants.ts");const siteCurrencySettings={code:default_constants.wA.code,symbol:default_constants.wA.symbol,thousandSeparator:default_constants.wA.thousandSeparator,decimalSeparator:default_constants.wA.decimalSeparator,minorUnit:default_constants.wA.precision,prefix:(symbol=default_constants.wA.symbol,symbolPosition=default_constants.wA.symbolPosition,{left:symbol,left_space:" "+symbol,right:"",right_space:""}[symbolPosition]||""),suffix:((symbol,symbolPosition)=>({left:"",left_space:"",right:symbol,right_space:" "+symbol}[symbolPosition]||""))(default_constants.wA.symbol,default_constants.wA.symbolPosition)};var symbol,symbolPosition;const formatPrice=(price,currencyData)=>{if(""===price||void 0===price)return"";const priceInt="number"==typeof price?price:parseInt(price,10);if(!Number.isFinite(priceInt))return"";const currency=((currencyData={})=>({...siteCurrencySettings,...currencyData}))(currencyData),{minorUnit,prefix,suffix,decimalSeparator,thousandSeparator}=currency,formattedPrice=priceInt/10**minorUnit,{beforeDecimal,afterDecimal}=(numberString=>{const parts=numberString.split(".");return{beforeDecimal:parts[0],afterDecimal:parts[1]||""}})(formattedPrice.toString()),formattedValue=`${prefix}${((numberString,thousandSeparator)=>numberString.replace(/\B(?=(\d{3})+(?!\d))/g,thousandSeparator))(beforeDecimal,thousandSeparator)}${((afterDecimal,decimalSeparator,minorUnit)=>afterDecimal?`${decimalSeparator}${afterDecimal.padEnd(minorUnit,"0")}`:minorUnit>0?`${decimalSeparator}${"0".repeat(minorUnit)}`:"")(afterDecimal,decimalSeparator,minorUnit)}${suffix}`,txt=document.createElement("textarea");return txt.innerHTML=formattedValue,txt.value}},"./storybook/custom-controls/currency.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{QT:()=>currencies,mD:()=>currenciesAPIShape,I7:()=>currencyControl});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),dist_es2015=__webpack_require__("./node_modules/dot-case/dist.es2015/index.js");var map_keys=__webpack_require__("./assets/js/base/utils/map-keys.ts");const snakeCaseKeys=obj=>(0,map_keys.C)(obj,((_,key)=>function snakeCase(input,options){return void 0===options&&(options={}),(0,dist_es2015.$)(input,(0,tslib_es6.pi)({delimiter:"_"},options))}(key))),currencies={EUR:{code:"EUR",symbol:"€",thousandSeparator:".",decimalSeparator:",",minorUnit:2,prefix:"",suffix:"€"},USD:{code:"USD",symbol:"$",thousandSeparator:",",decimalSeparator:".",minorUnit:2,prefix:"$",suffix:""}},currenciesAPIShape=Object.fromEntries(Object.entries(currencies).map((([key,value])=>[key,snakeCaseKeys(value)]))),currencyControl={control:"select",options:currencies,mapping:Object.keys(currencies)}},"./node_modules/@wordpress/element/build-module/create-interpolate-element.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");let indoc,offset,output,stack;const tokenizer=/<(\/)?(\w+)\s*(\/)?>/g;function createFrame(element,tokenStart,tokenLength,prevOffset,leadingTextStart){return{element,tokenStart,tokenLength,prevOffset,leadingTextStart,children:[]}}const isValidConversionMap=conversionMap=>{const isObject="object"==typeof conversionMap,values=isObject&&Object.values(conversionMap);return isObject&&values.length&&values.every((element=>(0,_react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(element)))};function proceed(conversionMap){const next=function nextToken(){const matches=tokenizer.exec(indoc);if(null===matches)return["no-more-tokens"];const startedAt=matches.index,[match,isClosing,name,isSelfClosed]=matches,length=match.length;if(isSelfClosed)return["self-closed",name,startedAt,length];if(isClosing)return["closer",name,startedAt,length];return["opener",name,startedAt,length]}(),[tokenType,name,startOffset,tokenLength]=next,stackDepth=stack.length,leadingTextStart=startOffset>offset?offset:null;if(!conversionMap[name])return addText(),!1;switch(tokenType){case"no-more-tokens":if(0!==stackDepth){const{leadingTextStart:stackLeadingText,tokenStart}=stack.pop();output.push(indoc.substr(stackLeadingText,tokenStart))}return addText(),!1;case"self-closed":return 0===stackDepth?(null!==leadingTextStart&&output.push(indoc.substr(leadingTextStart,startOffset-leadingTextStart)),output.push(conversionMap[name]),offset=startOffset+tokenLength,!0):(addChild(createFrame(conversionMap[name],startOffset,tokenLength)),offset=startOffset+tokenLength,!0);case"opener":return stack.push(createFrame(conversionMap[name],startOffset,tokenLength,startOffset+tokenLength,leadingTextStart)),offset=startOffset+tokenLength,!0;case"closer":if(1===stackDepth)return function closeOuterElement(endOffset){const{element,leadingTextStart,prevOffset,tokenStart,children}=stack.pop(),text=endOffset?indoc.substr(prevOffset,endOffset-prevOffset):indoc.substr(prevOffset);text&&children.push(text);null!==leadingTextStart&&output.push(indoc.substr(leadingTextStart,tokenStart-leadingTextStart));output.push((0,_react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(element,null,...children))}(startOffset),offset=startOffset+tokenLength,!0;const stackTop=stack.pop(),text=indoc.substr(stackTop.prevOffset,startOffset-stackTop.prevOffset);stackTop.children.push(text),stackTop.prevOffset=startOffset+tokenLength;const frame=createFrame(stackTop.element,stackTop.tokenStart,stackTop.tokenLength,startOffset+tokenLength);return frame.children=stackTop.children,addChild(frame),offset=startOffset+tokenLength,!0;default:return addText(),!1}}function addText(){const length=indoc.length-offset;0!==length&&output.push(indoc.substr(offset,length))}function addChild(frame){const{element,tokenStart,tokenLength,prevOffset,children}=frame,parent=stack[stack.length-1],text=indoc.substr(parent.prevOffset,tokenStart-parent.prevOffset);text&&parent.children.push(text),parent.children.push((0,_react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(element,null,...children)),parent.prevOffset=prevOffset||tokenStart+tokenLength}const __WEBPACK_DEFAULT_EXPORT__=(interpolatedString,conversionMap)=>{if(indoc=interpolatedString,offset=0,output=[],stack=[],tokenizer.lastIndex=0,!isValidConversionMap(conversionMap))throw new TypeError("The conversionMap provided is not valid. It must be an object with values that are React Elements");do{}while(proceed(conversionMap));return(0,_react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,...output)}},"./assets/js/base/components/product-price/style.scss":()=>{}}]);