this.wc=this.wc||{},this.wc.wcSettings=function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=162)}({1:function(e,t){e.exports=window.wp.i18n},162:function(e,t,o){"use strict";o.r(t),o.d(t,"ADMIN_URL",(function(){return u})),o.d(t,"COUNTRIES",(function(){return a})),o.d(t,"CURRENCY",(function(){return s})),o.d(t,"CURRENT_USER_IS_ADMIN",(function(){return l})),o.d(t,"HOME_URL",(function(){return d})),o.d(t,"LOCALE",(function(){return p})),o.d(t,"ORDER_STATUSES",(function(){return b})),o.d(t,"PLACEHOLDER_IMG_SRC",(function(){return _})),o.d(t,"SITE_TITLE",(function(){return f})),o.d(t,"STORE_PAGES",(function(){return g})),o.d(t,"WC_ASSET_URL",(function(){return m})),o.d(t,"WC_VERSION",(function(){return w})),o.d(t,"WP_LOGIN_URL",(function(){return y})),o.d(t,"WP_VERSION",(function(){return S})),o.d(t,"defaultAddressFields",(function(){return O})),o.d(t,"getSetting",(function(){return T})),o.d(t,"getSettingWithCoercion",(function(){return z})),o.d(t,"isWpVersion",(function(){return M})),o.d(t,"isWcVersion",(function(){return N})),o.d(t,"getAdminLink",(function(){return V})),o.d(t,"allSettings",(function(){return i}));var n=o(45);Object(n.addFilter)("woocommerce_admin_analytics_settings","woocommerce-blocks/exclude-draft-status-from-analytics",e=>{const t=e=>"customStatuses"===e.key?{...e,options:e.options.filter(e=>"checkout-draft"!==e.value)}:e,o=e.woocommerce_actionable_order_statuses.options.map(t),n=e.woocommerce_excluded_report_order_statuses.options.map(t);return{...e,woocommerce_actionable_order_statuses:{...e.woocommerce_actionable_order_statuses,options:o},woocommerce_excluded_report_order_statuses:{...e.woocommerce_excluded_report_order_statuses,options:n}}});const r={adminUrl:"",countries:[],currency:{code:"USD",precision:2,symbol:"$",symbolPosition:"left",decimalSeparator:".",priceFormat:"%1$s%2$s",thousandSeparator:","},currentUserId:0,currentUserIsAdmin:!1,homeUrl:"",locale:{siteLocale:"en_US",userLocale:"en_US",weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},orderStatuses:[],placeholderImgSrc:"",siteTitle:"",storePages:[],wcAssetUrl:"",wcVersion:"",wpLoginUrl:"",wpVersion:""},c="object"==typeof window.wcSettings?window.wcSettings:{},i={...r,...c};i.currency={...r.currency,...i.currency},i.locale={...r.locale,...i.locale};const u=i.adminUrl,a=i.countries,s=i.currency,l=i.currentUserIsAdmin,d=i.homeUrl,p=i.locale,b=i.orderStatuses,_=i.placeholderImgSrc,f=i.siteTitle,g=i.storePages,m=i.wcAssetUrl,w=i.wcVersion,y=i.wpLoginUrl,S=i.wpVersion;var h=o(1);const O={first_name:{label:Object(h.__)("First name","woo-gutenberg-products-block"),optionalLabel:Object(h.__)("First name (optional)","woo-gutenberg-products-block"),autocomplete:"given-name",autocapitalize:"sentences",required:!0,hidden:!1,index:10},last_name:{label:Object(h.__)("Last name","woo-gutenberg-products-block"),optionalLabel:Object(h.__)("Last name (optional)","woo-gutenberg-products-block"),autocomplete:"family-name",autocapitalize:"sentences",required:!0,hidden:!1,index:20},company:{label:Object(h.__)("Company","woo-gutenberg-products-block"),optionalLabel:Object(h.__)("Company (optional)","woo-gutenberg-products-block"),autocomplete:"organization",autocapitalize:"sentences",required:!1,hidden:!1,index:30},address_1:{label:Object(h.__)("Address","woo-gutenberg-products-block"),optionalLabel:Object(h.__)("Address (optional)","woo-gutenberg-products-block"),autocomplete:"address-line1",autocapitalize:"sentences",required:!0,hidden:!1,index:40},address_2:{label:Object(h.__)("Apartment, suite, etc.","woo-gutenberg-products-block"),optionalLabel:Object(h.__)("Apartment, suite, etc. (optional)","woo-gutenberg-products-block"),autocomplete:"address-line2",autocapitalize:"sentences",required:!1,hidden:!1,index:50},country:{label:Object(h.__)("Country/Region","woo-gutenberg-products-block"),optionalLabel:Object(h.__)("Country/Region (optional)","woo-gutenberg-products-block"),autocomplete:"country",required:!0,hidden:!1,index:60},city:{label:Object(h.__)("City","woo-gutenberg-products-block"),optionalLabel:Object(h.__)("City (optional)","woo-gutenberg-products-block"),autocomplete:"address-level2",autocapitalize:"sentences",required:!0,hidden:!1,index:70},state:{label:Object(h.__)("State/County","woo-gutenberg-products-block"),optionalLabel:Object(h.__)("State/County (optional)","woo-gutenberg-products-block"),autocomplete:"address-level1",autocapitalize:"sentences",required:!0,hidden:!1,index:80},postcode:{label:Object(h.__)("Postal code","woo-gutenberg-products-block"),optionalLabel:Object(h.__)("Postal code (optional)","woo-gutenberg-products-block"),autocomplete:"postal-code",autocapitalize:"characters",required:!0,hidden:!1,index:90}};function j(e,t){const o=L(e),n=L(t),r=o.pop(),c=n.pop(),i=I(o,n);return 0!==i?i:r&&c?I(r.split("."),c.split(".")):r||c?r?-1:1:0}const v=(e,t,o)=>{C(o);const n=j(e,t);return R[o].includes(n)};j.validate=e=>"string"==typeof e&&/^[v\d]/.test(e)&&x.test(e),j.compare=v,j.sastisfies=(e,t)=>{const o=t.match(/^([<>=~^]+)/),n=o?o[1]:"=";if("^"!==n&&"~"!==n)return v(e,t,n);const[r,c,i]=L(e),[u,a,s]=L(t);return 0===E(r,u)&&("^"===n?I([c,i],[a,s])>=0:0===E(c,a)&&E(i,s)>=0)};const x=/^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,L=e=>{if("string"!=typeof e)throw new TypeError("Invalid argument expected string");const t=e.match(x);if(!t)throw new Error(`Invalid argument not valid semver ('${e}' received)`);return t.shift(),t},k=e=>"*"===e||"x"===e||"X"===e,U=e=>{const t=parseInt(e,10);return isNaN(t)?e:t},E=(e,t)=>{if(k(e)||k(t))return 0;const[o,n]=((e,t)=>typeof e!=typeof t?[String(e),String(t)]:[e,t])(U(e),U(t));return o>n?1:o<n?-1:0},I=(e,t)=>{for(let o=0;o<Math.max(e.length,t.length);o++){const n=E(e[o]||0,t[o]||0);if(0!==n)return n}return 0},R={">":[1],">=":[0,1],"=":[0],"<=":[-1,0],"<":[-1]},A=Object.keys(R),C=e=>{if("string"!=typeof e)throw new TypeError("Invalid operator type, expected string but got "+typeof e);if(-1===A.indexOf(e))throw new Error("Invalid operator, expected one of "+A.join("|"))},T=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:(e,t)=>void 0!==e?e:t;const n=e in i?i[e]:t;return o(n,t)},z=(e,t,o)=>{const n=e in i?i[e]:t;return o(n,t)?n:t},P=(e,t,o)=>{let n=T(e,"").replace(/-[a-zA-Z0-9]*[\-]*/,".0-rc.");return n=n.endsWith(".")?n.substring(0,n.length-1):n,j.compare(n,t,o)},M=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"=";return P("wpVersion",e,t)},N=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"=";return P("wcVersion",e,t)},V=e=>T("adminUrl")+e},45:function(e,t){e.exports=window.wp.hooks}});