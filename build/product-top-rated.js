this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["product-top-rated"]=function(t){function e(e){for(var r,i,u=e[0],a=e[1],s=e[2],p=0,b=[];p<u.length;p++)i=u[p],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&b.push(o[i][0]),o[i]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r]);for(l&&l(e);b.length;)b.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],r=!0,u=1;u<n.length;u++){var a=n[u];0!==o[a]&&(r=!1)}r&&(c.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={33:0},c=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var u=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],a=u.push.bind(u);u.push=e,u=u.slice();for(var s=0;s<u.length;s++)e(u[s]);var l=a;return c.push([860,0]),n()}({0:function(t,e){!function(){t.exports=this.wp.element}()},1:function(t,e){!function(){t.exports=this.wp.i18n}()},110:function(t,e){},111:function(t,e){},112:function(t,e){},113:function(t,e){},114:function(t,e){},115:function(t,e){},116:function(t,e){},117:function(t,e){},118:function(t,e){},119:function(t,e){},120:function(t,e){},121:function(t,e){},122:function(t,e){},13:function(t,e){!function(){t.exports=this.regeneratorRuntime}()},130:function(t,e){},182:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(0),o=n(6),c=Object(r.createElement)("img",{src:o.T+"img/grid.svg",alt:"Grid Preview",width:"230",height:"250",style:{width:"100%"}})},19:function(t,e){!function(){t.exports=this.wp.apiFetch}()},20:function(t,e){!function(){t.exports=this.wp.url}()},21:function(t,e){!function(){t.exports=this.wp.data}()},23:function(t,e){!function(){t.exports=this.wp.blockEditor}()},24:function(t,e){!function(){t.exports=this.wp.blocks}()},27:function(t,e){!function(){t.exports=this.wp.htmlEntities}()},28:function(t,e){!function(){t.exports=this.moment}()},3:function(t,e){!function(){t.exports=this.wc.wcSettings}()},33:function(t,e){!function(){t.exports=this.wp.primitives}()},35:function(t,e){!function(){t.exports=this.wp.dataControls}()},38:function(t,e,n){"use strict";n.d(e,"h",(function(){return b})),n.d(e,"e",(function(){return d})),n.d(e,"b",(function(){return g})),n.d(e,"i",(function(){return f})),n.d(e,"f",(function(){return h})),n.d(e,"c",(function(){return O})),n.d(e,"d",(function(){return m})),n.d(e,"g",(function(){return j})),n.d(e,"a",(function(){return w}));var r=n(5),o=n.n(r),c=n(20),i=n(19),u=n.n(i),a=n(8),s=n(6);function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){o()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var b=function(t){var e=t.selected,n=void 0===e?[]:e,r=t.search,o=void 0===r?"":r,i=t.queryArgs,l=function(t){var e=t.selected,n=void 0===e?[]:e,r=t.search,o=void 0===r?"":r,i=t.queryArgs,u=void 0===i?[]:i,a={per_page:s.v?100:0,catalog_visibility:"any",search:o,orderby:"title",order:"asc"},l=[Object(c.addQueryArgs)("/wc/store/products",p(p({},a),u))];return s.v&&n.length&&l.push(Object(c.addQueryArgs)("/wc/store/products",{catalog_visibility:"any",include:n})),l}({selected:n,search:o,queryArgs:void 0===i?[]:i});return Promise.all(l.map((function(t){return u()({path:t})}))).then((function(t){return Object(a.uniqBy)(Object(a.flatten)(t),"id").map((function(t){return p(p({},t),{},{parent:0})}))})).catch((function(t){throw t}))},d=function(t){return u()({path:"/wc/store/products/".concat(t)})},g=function(){return u()({path:"wc/store/products/attributes"})},f=function(t){return u()({path:"wc/store/products/attributes/".concat(t,"/terms")})},h=function(t){var e=t.selected,n=function(t){var e=t.selected,n=void 0===e?[]:e,r=t.search,o=[Object(c.addQueryArgs)("wc/store/products/tags",{per_page:s.x?100:0,orderby:s.x?"count":"name",order:s.x?"desc":"asc",search:r})];return s.x&&n.length&&o.push(Object(c.addQueryArgs)("wc/store/products/tags",{include:n})),o}({selected:void 0===e?[]:e,search:t.search});return Promise.all(n.map((function(t){return u()({path:t})}))).then((function(t){return Object(a.uniqBy)(Object(a.flatten)(t),"id")}))},O=function(t){return u()({path:Object(c.addQueryArgs)("wc/store/products/categories",p({per_page:0},t))})},m=function(t){return u()({path:"wc/store/products/categories/".concat(t)})},j=function(t){return u()({path:Object(c.addQueryArgs)("wc/store/products",{per_page:0,type:"variation",parent:t})})},w=function(t,e){if(!t.title.raw)return t.slug;var n=1===e.filter((function(e){return e.title.raw===t.title.raw})).length;return t.title.raw+(n?"":" - ".concat(t.slug))}},4:function(t,e){!function(){t.exports=this.wp.components}()},40:function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return s}));var r=n(13),o=n.n(r),c=n(30),i=n.n(c),u=n(1),a=function(){var t=i()(o.a.mark((function t(e){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("function"!=typeof e.json){t.next=11;break}return t.prev=1,t.next=4,e.json();case 4:return n=t.sent,t.abrupt("return",{message:n.message,type:n.type||"api"});case 8:return t.prev=8,t.t0=t.catch(1),t.abrupt("return",{message:t.t0.message,type:"general"});case 11:return t.abrupt("return",{message:e.message,type:e.type||"general"});case 12:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}(),s=function(t){if(t.data&&"rest_invalid_param"===t.code){var e=Object.values(t.data.params);if(e[0])return e[0]}return(null==t?void 0:t.message)||Object(u.__)("Something went wrong. Please contact us to get assistance.","woo-gutenberg-products-block")}},42:function(t,e){!function(){t.exports=this.wp.escapeHtml}()},44:function(t,e,n){"use strict";var r=n(0),o=n(1),c=(n(2),n(42));e.a=function(t){var e,n,i,u=t.error;return Object(r.createElement)("div",{className:"wc-block-error-message"},(n=(e=u).message,i=e.type,n?"general"===i?Object(r.createElement)("span",null,Object(o.__)("The following error was returned","woo-gutenberg-products-block"),Object(r.createElement)("br",null),Object(r.createElement)("code",null,Object(c.escapeHTML)(n))):"api"===i?Object(r.createElement)("span",null,Object(o.__)("The following error was returned from the API","woo-gutenberg-products-block"),Object(r.createElement)("br",null),Object(r.createElement)("code",null,Object(c.escapeHTML)(n))):n:Object(o.__)("An unknown error occurred which prevented the block from being updated.","woo-gutenberg-products-block")))}},48:function(t,e){!function(){t.exports=this.wp.keycodes}()},55:function(t,e,n){"use strict";var r=n(5),o=n.n(r),c=n(26),i=n.n(c),u=n(7);n(2);function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}e.a=function(t){var e=t.srcElement,n=t.size,r=void 0===n?24:n,c=i()(t,["srcElement","size"]);return Object(u.isValidElement)(e)&&Object(u.cloneElement)(e,function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){o()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({width:r,height:r},c))}},6:function(t,e,n){"use strict";n.d(e,"l",(function(){return o})),n.d(e,"J",(function(){return c})),n.d(e,"P",(function(){return i})),n.d(e,"z",(function(){return u})),n.d(e,"B",(function(){return a})),n.d(e,"m",(function(){return s})),n.d(e,"A",(function(){return l})),n.d(e,"D",(function(){return p})),n.d(e,"o",(function(){return b})),n.d(e,"C",(function(){return d})),n.d(e,"n",(function(){return g})),n.d(e,"F",(function(){return f})),n.d(e,"v",(function(){return h})),n.d(e,"x",(function(){return O})),n.d(e,"s",(function(){return m})),n.d(e,"t",(function(){return j})),n.d(e,"u",(function(){return w})),n.d(e,"k",(function(){return y})),n.d(e,"L",(function(){return v})),n.d(e,"Q",(function(){return _})),n.d(e,"q",(function(){return k})),n.d(e,"r",(function(){return S})),n.d(e,"p",(function(){return P})),n.d(e,"I",(function(){return E})),n.d(e,"c",(function(){return C})),n.d(e,"w",(function(){return x})),n.d(e,"T",(function(){return D})),n.d(e,"U",(function(){return B})),n.d(e,"K",(function(){return T})),n.d(e,"a",(function(){return R})),n.d(e,"N",(function(){return M})),n.d(e,"b",(function(){return I})),n.d(e,"M",(function(){return L})),n.d(e,"E",(function(){return N})),n.d(e,"i",(function(){return z})),n.d(e,"O",(function(){return $})),n.d(e,"h",(function(){return F})),n.d(e,"j",(function(){return Q})),n.d(e,"H",(function(){return U})),n.d(e,"G",(function(){return q})),n.d(e,"S",(function(){return G})),n.d(e,"R",(function(){return W})),n.d(e,"d",(function(){return J})),n.d(e,"e",(function(){return Y})),n.d(e,"f",(function(){return K})),n.d(e,"g",(function(){return X})),n.d(e,"y",(function(){return Z})),n.d(e,"X",(function(){return et})),n.d(e,"Y",(function(){return nt})),n.d(e,"V",(function(){return rt})),n.d(e,"W",(function(){return ot}));var r=n(3),o=Object(r.getSetting)("currentUserIsAdmin",!1),c=Object(r.getSetting)("reviewRatingsEnabled",!0),i=Object(r.getSetting)("showAvatars",!0),u=Object(r.getSetting)("max_columns",6),a=Object(r.getSetting)("min_columns",1),s=Object(r.getSetting)("default_columns",3),l=Object(r.getSetting)("max_rows",6),p=Object(r.getSetting)("min_rows",1),b=Object(r.getSetting)("default_rows",3),d=Object(r.getSetting)("min_height",500),g=Object(r.getSetting)("default_height",500),f=Object(r.getSetting)("placeholderImgSrc",""),h=(Object(r.getSetting)("thumbnail_size",300),Object(r.getSetting)("isLargeCatalog")),O=Object(r.getSetting)("limitTags"),m=Object(r.getSetting)("hasProducts",!0),j=Object(r.getSetting)("hasTags",!0),w=Object(r.getSetting)("homeUrl",""),y=Object(r.getSetting)("couponsEnabled",!0),v=Object(r.getSetting)("shippingEnabled",!0),_=Object(r.getSetting)("taxesEnabled",!0),k=Object(r.getSetting)("displayItemizedTaxes",!1),S=Object(r.getSetting)("hasDarkEditorStyleSupport",!1),P=(Object(r.getSetting)("displayShopPricesIncludingTax",!1),Object(r.getSetting)("displayCartPricesIncludingTax",!1)),E=Object(r.getSetting)("productCount",0),C=Object(r.getSetting)("attributes",[]),x=Object(r.getSetting)("isShippingCalculatorEnabled",!0),A=(Object(r.getSetting)("isShippingCostHidden",!1),Object(r.getSetting)("woocommerceBlocksPhase",1)),D=Object(r.getSetting)("wcBlocksAssetUrl",""),B=Object(r.getSetting)("wcBlocksBuildUrl",""),T=Object(r.getSetting)("shippingCountries",{}),R=Object(r.getSetting)("allowedCountries",{}),M=Object(r.getSetting)("shippingStates",{}),I=Object(r.getSetting)("allowedStates",{}),L=Object(r.getSetting)("shippingMethodsExist",!1),N=Object(r.getSetting)("paymentGatewaySortOrder",[]),z=Object(r.getSetting)("checkoutShowLoginReminder",!0),H={id:0,title:"",permalink:""},V=Object(r.getSetting)("storePages",{shop:H,cart:H,checkout:H,privacy:H,terms:H}),$=V.shop.permalink,F=V.checkout.id,Q=V.checkout.permalink,U=V.privacy.permalink,q=V.privacy.title,G=V.terms.permalink,W=V.terms.title,J=V.cart.id,Y=V.cart.permalink,K=Object(r.getSetting)("checkoutAllowsGuest",!1),X=Object(r.getSetting)("checkoutAllowsSignup",!1),Z=Object(r.getSetting)("loginUrl","/wp-login.php"),tt=n(24),et=function(t,e){if(A>2)return Object(tt.registerBlockType)(t,e)},nt=function(t,e){if(A>1)return Object(tt.registerBlockType)(t,e)},rt=function(){return A>2},ot=function(){return A>1}},65:function(t,e){!function(){t.exports=this.wp.hooks}()},66:function(t,e){!function(){t.exports=this.wp.serverSideRender}()},7:function(t,e){!function(){t.exports=this.React}()},70:function(t,e){!function(){t.exports=this.wp.dom}()},73:function(t,e){!function(){t.exports=this.wp.deprecated}()},75:function(t,e,n){"use strict";n.d(e,"b",(function(){return o}));var r=n(6),o=["woocommerce/product-best-sellers","woocommerce/product-category","woocommerce/product-new","woocommerce/product-on-sale","woocommerce/product-top-rated"];e.a={columns:{type:"number",default:r.m},rows:{type:"number",default:r.o},alignButtons:{type:"boolean",default:!1},categories:{type:"array",default:[]},catOperator:{type:"string",default:"any"},contentVisibility:{type:"object",default:{title:!0,price:!0,rating:!0,button:!0}},isPreview:{type:"boolean",default:!1}}},76:function(t,e){!function(){t.exports=this.ReactDOM}()},77:function(t,e,n){"use strict";var r=n(5),o=n.n(r),c=n(0),i=n(1),u=(n(2),n(4));function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){o()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}e.a=function(t){var e=t.onChange,n=t.settings,r=n.button,o=n.price,a=n.rating,l=n.title;return Object(c.createElement)(c.Fragment,null,Object(c.createElement)(u.ToggleControl,{label:Object(i.__)("Product title","woo-gutenberg-products-block"),help:l?Object(i.__)("Product title is visible.","woo-gutenberg-products-block"):Object(i.__)("Product title is hidden.","woo-gutenberg-products-block"),checked:l,onChange:function(){return e(s(s({},n),{},{title:!l}))}}),Object(c.createElement)(u.ToggleControl,{label:Object(i.__)("Product price","woo-gutenberg-products-block"),help:o?Object(i.__)("Product price is visible.","woo-gutenberg-products-block"):Object(i.__)("Product price is hidden.","woo-gutenberg-products-block"),checked:o,onChange:function(){return e(s(s({},n),{},{price:!o}))}}),Object(c.createElement)(u.ToggleControl,{label:Object(i.__)("Product rating","woo-gutenberg-products-block"),help:a?Object(i.__)("Product rating is visible.","woo-gutenberg-products-block"):Object(i.__)("Product rating is hidden.","woo-gutenberg-products-block"),checked:a,onChange:function(){return e(s(s({},n),{},{rating:!a}))}}),Object(c.createElement)(u.ToggleControl,{label:Object(i.__)("Add to Cart button","woo-gutenberg-products-block"),help:r?Object(i.__)("Add to Cart button is visible.","woo-gutenberg-products-block"):Object(i.__)("Add to Cart button is hidden.","woo-gutenberg-products-block"),checked:r,onChange:function(){return e(s(s({},n),{},{button:!r}))}}))}},78:function(t,e,n){"use strict";var r=n(0),o=n(1),c=n(8),i=(n(2),n(4)),u=n(6);e.a=function(t){var e=t.columns,n=t.rows,a=t.setAttributes,s=t.alignButtons;return Object(r.createElement)(r.Fragment,null,Object(r.createElement)(i.RangeControl,{label:Object(o.__)("Columns","woo-gutenberg-products-block"),value:e,onChange:function(t){var e=Object(c.clamp)(t,u.B,u.z);a({columns:Object(c.isNaN)(e)?"":e})},min:u.B,max:u.z}),Object(r.createElement)(i.RangeControl,{label:Object(o.__)("Rows","woo-gutenberg-products-block"),value:n,onChange:function(t){var e=Object(c.clamp)(t,u.D,u.A);a({rows:Object(c.isNaN)(e)?"":e})},min:u.D,max:u.A}),Object(r.createElement)(i.ToggleControl,{label:Object(o.__)("Align Last Block","woo-gutenberg-products-block"),help:s?Object(o.__)("The last inner block will be aligned vertically.","woo-gutenberg-products-block"):Object(o.__)("The last inner block will follow other content.","woo-gutenberg-products-block"),checked:s,onChange:function(){return a({alignButtons:!s})}}))}},79:function(t,e){!function(){t.exports=this.wp.viewport}()},8:function(t,e){!function(){t.exports=this.lodash}()},80:function(t,e){!function(){t.exports=this.wp.date}()},81:function(t,e,n){"use strict";var r=n(11),o=n.n(r),c=n(0),i=n(1),u=n(8),a=(n(2),n(45)),s=n(4),l=n(13),p=n.n(l),b=n(30),d=n.n(b),g=n(14),f=n.n(g),h=n(15),O=n.n(h),m=n(12),j=n.n(m),w=n(16),y=n.n(w),v=n(17),_=n.n(v),k=n(10),S=n.n(k),P=n(146),E=n(38),C=n(40);function x(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=S()(t);if(e){var o=S()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return _()(this,n)}}var A=Object(P.a)((function(t){return function(e){y()(r,e);var n=x(r);function r(){var t;return f()(this,r),(t=n.apply(this,arguments)).state={error:null,loading:!1,categories:null},t.loadCategories=t.loadCategories.bind(j()(t)),t}return O()(r,[{key:"componentDidMount",value:function(){this.loadCategories()}},{key:"loadCategories",value:function(){var t=this;this.setState({loading:!0}),Object(E.c)().then((function(e){t.setState({categories:e,loading:!1,error:null})})).catch(function(){var e=d()(p.a.mark((function e(n){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.a)(n);case 2:r=e.sent,t.setState({categories:null,loading:!1,error:r});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},{key:"render",value:function(){var e=this.state,n=e.error,r=e.loading,i=e.categories;return Object(c.createElement)(t,o()({},this.props,{error:n,isLoading:r,categories:i}))}}]),r}(c.Component)}),"withCategories"),D=n(44),B=(n(130),function(t){var e=t.categories,n=t.error,r=t.isLoading,l=t.onChange,p=t.onOperatorChange,b=t.operator,d=t.selected,g=t.isSingle,f=t.showReviewCount,h={clear:Object(i.__)("Clear all product categories","woo-gutenberg-products-block"),list:Object(i.__)("Product Categories","woo-gutenberg-products-block"),noItems:Object(i.__)("Your store doesn't have any product categories.","woo-gutenberg-products-block"),search:Object(i.__)("Search for product categories","woo-gutenberg-products-block"),selected:function(t){return Object(i.sprintf)(Object(i._n)("%d category selected","%d categories selected",t,"woo-gutenberg-products-block"),t)},updated:Object(i.__)("Category search results updated.","woo-gutenberg-products-block")};return n?Object(c.createElement)(D.a,{error:n}):Object(c.createElement)(c.Fragment,null,Object(c.createElement)(a.a,{className:"woocommerce-product-categories",list:e,isLoading:r,selected:d.map((function(t){return Object(u.find)(e,{id:t})})).filter(Boolean),onChange:l,renderItem:function(t){var e=t.item,n=t.search,r=t.depth,u=void 0===r?0:r,s=["woocommerce-product-categories__item"];n.length&&s.push("is-searching"),0===u&&0!==e.parent&&s.push("is-skip-level");var l=e.breadcrumbs.length?"".concat(e.breadcrumbs.join(", "),", ").concat(e.name):e.name,p=f?Object(i.sprintf)(Object(i._n)("%1$s, has %2$d review","%1$s, has %2$d reviews",e.review_count,"woo-gutenberg-products-block"),l,e.review_count):Object(i.sprintf)(Object(i._n)("%1$s, has %2$d product","%1$s, has %2$d products",e.count,"woo-gutenberg-products-block"),l,e.count),b=f?Object(i.sprintf)(Object(i._n)("%d Review","%d Reviews",e.review_count,"woo-gutenberg-products-block"),e.review_count):Object(i.sprintf)(Object(i._n)("%d Product","%d Products",e.count,"woo-gutenberg-products-block"),e.count);return Object(c.createElement)(a.b,o()({className:s.join(" ")},t,{showCount:!0,countLabel:b,"aria-label":p}))},messages:h,isHierarchical:!0,isSingle:g}),!!p&&Object(c.createElement)("div",{className:d.length<2?"screen-reader-text":""},Object(c.createElement)(s.SelectControl,{className:"woocommerce-product-categories__operator",label:Object(i.__)("Display products matching","woo-gutenberg-products-block"),help:Object(i.__)("Pick at least two categories to use this setting.","woo-gutenberg-products-block"),value:b,onChange:p,options:[{label:Object(i.__)("Any selected categories","woo-gutenberg-products-block"),value:"any"},{label:Object(i.__)("All selected categories","woo-gutenberg-products-block"),value:"all"}]})))});B.defaultProps={operator:"any",isSingle:!1};e.a=A(B)},860:function(t,e,n){t.exports=n(961)},88:function(t,e,n){"use strict";n.d(e,"a",(function(){return p}));var r=n(0),o=n(9),c=n.n(o),i=n(18),u=n.n(i),a=n(6);function s(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,i=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return i=t.done,t},e:function(t){u=!0,c=t},f:function(){try{i||null==n.return||n.return()}finally{if(u)throw c}}}}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var p=function(t){return function(e){var n=e.attributes,o=n.align,i=n.contentVisibility,l=c()(o?"align".concat(o):"",{"is-hidden-title":!i.title,"is-hidden-price":!i.price,"is-hidden-rating":!i.rating,"is-hidden-button":!i.button});return Object(r.createElement)(r.RawHTML,{className:l},function(t,e){var n=t.attributes,r=n.attributes,o=n.attrOperator,c=n.categories,i=n.catOperator,l=n.orderby,p=n.products,b=n.columns||a.m,d=n.rows||a.o,g=new Map;switch(g.set("limit",d*b),g.set("columns",b),c&&c.length&&(g.set("category",c.join(",")),i&&"all"===i&&g.set("cat_operator","AND")),r&&r.length&&(g.set("terms",r.map((function(t){return t.id})).join(",")),g.set("attribute",r[0].attr_slug),o&&"all"===o&&g.set("terms_operator","AND")),l&&("price_desc"===l?(g.set("orderby","price"),g.set("order","DESC")):"price_asc"===l?(g.set("orderby","price"),g.set("order","ASC")):"date"===l?(g.set("orderby","date"),g.set("order","DESC")):g.set("orderby",l)),e){case"woocommerce/product-best-sellers":g.set("best_selling","1");break;case"woocommerce/product-top-rated":g.set("orderby","rating");break;case"woocommerce/product-on-sale":g.set("on_sale","1");break;case"woocommerce/product-new":g.set("orderby","date"),g.set("order","DESC");break;case"woocommerce/handpicked-products":if(!p.length)return"";g.set("ids",p.join(",")),g.set("limit",p.length);break;case"woocommerce/product-category":if(!c||!c.length)return"";break;case"woocommerce/products-by-attribute":if(!r||!r.length)return""}var f,h="[products",O=s(g);try{for(O.s();!(f=O.n()).done;){var m=u()(f.value,2);h+=" "+m[0]+'="'+m[1]+'"'}}catch(t){O.e(t)}finally{O.f()}return h+="]"}(e,t))}}},961:function(t,e,n){"use strict";n.r(e);var r=n(5),o=n.n(r),c=n(0),i=n(1),u=n(24),a=n(55),s=n(33),l=Object(c.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 24 24"},Object(c.createElement)("path",{opacity:".87",fill:"none",d:"M0 0h24v24H0V0z"}),Object(c.createElement)("path",{d:"M21 8h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2zm0 4l-3 7H9V9l4.34-4.34L12.23 10H21v2zM1 9h4v12H1z"})),p=n(8),b=n(14),d=n.n(b),g=n(15),f=n.n(g),h=n(16),O=n.n(h),m=n(17),j=n.n(m),w=n(10),y=n.n(w),v=n(4),_=n(23),k=n(66),S=n.n(k),P=(n(2),n(77)),E=n(78),C=n(81),x=n(182);function A(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=y()(t);if(e){var o=y()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return j()(this,n)}}var D=function(t){O()(n,t);var e=A(n);function n(){return d()(this,n),e.apply(this,arguments)}return f()(n,[{key:"getInspectorControls",value:function(){var t=this.props,e=t.attributes,n=t.setAttributes,r=e.categories,o=e.catOperator,u=e.columns,a=e.contentVisibility,s=e.rows,l=e.alignButtons;return Object(c.createElement)(_.InspectorControls,{key:"inspector"},Object(c.createElement)(v.PanelBody,{title:Object(i.__)("Layout","woo-gutenberg-products-block"),initialOpen:!0},Object(c.createElement)(E.a,{columns:u,rows:s,alignButtons:l,setAttributes:n})),Object(c.createElement)(v.PanelBody,{title:Object(i.__)("Content","woo-gutenberg-products-block"),initialOpen:!0},Object(c.createElement)(P.a,{settings:a,onChange:function(t){return n({contentVisibility:t})}})),Object(c.createElement)(v.PanelBody,{title:Object(i.__)("Filter by Product Category","woo-gutenberg-products-block"),initialOpen:!1},Object(c.createElement)(C.a,{selected:r,onChange:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=t.map((function(t){return t.id}));n({categories:e})},operator:o,onOperatorChange:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"any";return n({catOperator:t})}})))}},{key:"render",value:function(){var t=this.props,e=t.name,n=t.attributes;return n.isPreview?x.a:Object(c.createElement)(c.Fragment,null,this.getInspectorControls(),Object(c.createElement)(v.Disabled,null,Object(c.createElement)(S.a,{block:e,attributes:n})))}}]),n}(c.Component),B=n(88),T=n(75);function R(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}var M="woocommerce/product-top-rated";Object(u.registerBlockType)(M,{title:Object(i.__)("Top Rated Products","woo-gutenberg-products-block"),icon:{src:Object(c.createElement)(a.a,{srcElement:l}),foreground:"#96588a"},category:"woocommerce",keywords:[Object(i.__)("WooCommerce","woo-gutenberg-products-block")],description:Object(i.__)("Display a grid of your top rated products.","woo-gutenberg-products-block"),supports:{align:["wide","full"],html:!1},example:{attributes:{isPreview:!0}},attributes:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?R(Object(n),!0).forEach((function(e){o()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},T.a),transforms:{from:[{type:"block",blocks:Object(p.without)(T.b,M),transform:function(t){return Object(u.createBlock)("woocommerce/product-top-rated",t)}}]},deprecated:[{attributes:T.a,save:Object(B.a)(M)}],edit:function(t){return Object(c.createElement)(D,t)},save:function(){return null}})}});