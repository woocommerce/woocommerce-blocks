(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[60],{487:function(e,t,c){"use strict";c.r(t);var r=c(0),s=c(11),o=c(43),a=c(7),i=c(31);t.default=e=>{let{children:t,className:c}=e;const{cartItems:n,cartItemErrors:l}=Object(o.a)(),{createErrorNotice:d,removeNotice:u}=Object(a.useDispatch)("core/notices"),b=Object(a.useSelect)(e=>e("core/notices").getNotices("wc/cart").filter(e=>"error"===e.status&&"default"===e.type).map(e=>e.id));return Object(r.useEffect)(()=>{b.forEach(e=>{u(e,"wc/cart")}),l.forEach(e=>{d(Object(i.decodeEntities)(e.message),{isDismissible:!1,id:e.code,context:"wc/cart"})})},[d,l,b,u]),0===n.length?null:Object(r.createElement)("div",{className:c},Object(r.createElement)(s.StoreNoticesContainer,{context:"wc/cart"}),t)}}}]);