(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[15],{124:function(e,t,r){"use strict";r.d(t,"a",(function(){return l})),r.d(t,"b",(function(){return o}));var n=r(2);r(208),r(5);const a=Object(n.getSetting)("attributes",[]).reduce((e,t)=>{const r=(n=t)&&n.attribute_name?{id:parseInt(n.attribute_id,10),name:n.attribute_name,taxonomy:"pa_"+n.attribute_name,label:n.attribute_label}:null;var n;return r&&r.id&&e.push(r),e},[]),l=e=>{if(e)return a.find(t=>t.id===e)},o=e=>{if(e)return a.find(t=>t.taxonomy===e)}},125:function(e,t,r){"use strict";r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return l}));var n=r(83);const a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";const l=e.filter(e=>e.attribute===r.taxonomy),o=l.length?l[0]:null;if(!(o&&o.slug&&Array.isArray(o.slug)&&o.slug.includes(a)))return;const i=o.slug.filter(e=>e!==a),s=e.filter(e=>e.attribute!==r.taxonomy);i.length>0&&(o.slug=i.sort(),s.push(o)),t(Object(n.a)(s).asc("attribute"))},l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"in";if(!r||!r.taxonomy)return[];const o=e.filter(e=>e.attribute!==r.taxonomy);return 0===a.length?t(o):(o.push({attribute:r.taxonomy,operator:l,slug:a.map(e=>{let{slug:t}=e;return t}).sort()}),t(Object(n.a)(o).asc("attribute"))),o}},208:function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return l})),r.d(t,"a",(function(){return i}));var n=r(25);const a=e=>Object(n.b)(e,"count")&&Object(n.b)(e,"description")&&Object(n.b)(e,"id")&&Object(n.b)(e,"name")&&Object(n.b)(e,"parent")&&Object(n.b)(e,"slug")&&"number"==typeof e.count&&"string"==typeof e.description&&"number"==typeof e.id&&"string"==typeof e.name&&"number"==typeof e.parent&&"string"==typeof e.slug,l=e=>Array.isArray(e)&&e.every(a),o=e=>Object(n.b)(e,"attribute")&&Object(n.b)(e,"operator")&&Object(n.b)(e,"slug")&&"string"==typeof e.attribute&&"string"==typeof e.operator&&Array.isArray(e.slug)&&e.slug.every(e=>"string"==typeof e),i=e=>Array.isArray(e)&&e.every(o)},445:function(e){e.exports=JSON.parse('{"name":"woocommerce/attribute-filter","version":"1.0.0","title":"Filter by Attribute Controls","description":"Enable customers to filter the product grid by selecting one or more attributes, such as color.","category":"woocommerce","keywords":["WooCommerce"],"supports":{"html":false,"color":{"text":true,"background":false},"inserter":false,"lock":false},"attributes":{"className":{"type":"string","default":""},"attributeId":{"type":"number","default":0},"showCounts":{"type":"boolean","default":true},"queryType":{"type":"string","default":"or"},"headingLevel":{"type":"number","default":3},"displayStyle":{"type":"string","default":"list"},"showFilterButton":{"type":"boolean","default":false},"selectType":{"type":"string","default":"multiple"},"isPreview":{"type":"boolean","default":false}},"textdomain":"woo-gutenberg-products-block","apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json"}')},446:function(e,t){},489:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(6),l=r.n(a),o=r(264),i=r(34),s=r(1),c=r(44),u=r(67),b=r(62),d=r(94),g=r(247),m=r(332),p=r(118),f=r(119),y=r(18),j=r.n(y),O=r(20),h=r(2),v=r(19),w=r(97),_=r(25),k=r(208),E=r(84),C=r(248),x=r(98),A=r(122),L=r(117),S=r(124),N=r(125);const F=[{value:"preview-1",formattedValue:"preview-1",name:"Blue",label:Object(n.createElement)(m.a,{name:"Blue",count:3}),textLabel:"Blue (3)"},{value:"preview-2",formattedValue:"preview-2",name:"Green",label:Object(n.createElement)(m.a,{name:"Green",count:3}),textLabel:"Green (3)"},{value:"preview-3",formattedValue:"preview-3",name:"Red",label:Object(n.createElement)(m.a,{name:"Red",count:2}),textLabel:"Red (2)"}],T={count:0,has_archives:!0,id:0,label:"Preview",name:"preview",order:"menu_order",parent:0,taxonomy:"preview",type:""};r(446);var I=r(445);function q(){return Math.floor(Math.random()*Date.now())}const B=e=>e.replace("pa_",""),V=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];const r={};t.forEach(e=>{const{attribute:t,slug:n,operator:a}=e,l=B(t),o=n.join(","),i=`${x.b}${l}`,s="in"===a?"or":"and";r[`${x.a}${l}`]=o,r[i]=s});const n=Object(v.removeQueryArgs)(e,...Object.keys(r));return Object(v.addQueryArgs)(n,r)},P=e=>{if(e){const t=Object(x.d)("filter_"+e.name);return("string"==typeof t?t.split(","):[]).map(e=>encodeURIComponent(e).toLowerCase())}return[]},R=(e,t)=>{const r=Object.entries(t).reduce((e,t)=>{let[r,n]=t;return r.includes("query_type")?e:{...e,[r]:n}},{});return Object.entries(r).reduce((t,r)=>{let[n,a]=r;return e[n]===a&&t},!0)},W=e=>e.trim().replace(/\s/g,"-").replace(/_/g,"-").replace(/-+/g,"-").replace(/[^a-zA-Z0-9-]/g,"");var $=r(123),Q=e=>{let{isLoading:t=!1,options:r,checked:a,onChange:l}=e;return t?Object(n.createElement)(n.Fragment,null,Object(n.createElement)("span",{className:"is-loading"}),Object(n.createElement)("span",{className:"is-loading"})):Object(n.createElement)($.a,{className:"wc-block-attribute-filter-list",options:r,checked:a,onChange:l,isLoading:t,isDisabled:t})},D=r(61),M=e=>{let{attributes:t,isEditor:r=!1,getNotice:a=(()=>null)}=e;const o=Object(h.getSettingWithCoercion)("has_filterable_products",!1,w.a),y=Object(h.getSettingWithCoercion)("is_rendering_php_template",!1,w.a),I=Object(h.getSettingWithCoercion)("page_url",window.location.href,i.a),$=r?[]:Object(h.getSettingWithCoercion)("product_ids",[],Array.isArray),[M,U]=Object(n.useState)(!1),G=t.isPreview&&!t.attributeId?T:Object(S.a)(t.attributeId),J=Object(n.useMemo)(()=>P(G),[G]),[z,Z]=Object(n.useState)(J),[H,K]=Object(n.useState)(q()),[X,Y]=Object(n.useState)(t.isPreview&&!t.attributeId?F:[]),[ee]=Object(b.a)(),[te,re]=Object(b.b)("attributes",[]),{results:ne,isLoading:ae}=Object(d.a)({namespace:"/wc/store/v1",resourceName:"products/attributes/terms",resourceValues:[(null==G?void 0:G.id)||0],shouldSelect:t.attributeId>0}),{results:le,isLoading:oe}=Object(g.a)({queryAttribute:{taxonomy:(null==G?void 0:G.taxonomy)||"",queryType:t.queryType},queryState:{...ee},productIds:$,isEditor:r}),ie=Object(n.useCallback)(e=>Object(_.b)(le,"attribute_counts")&&Array.isArray(le.attribute_counts)?le.attribute_counts.find(t=>{let{term:r}=t;return r===e}):null,[le]);Object(n.useEffect)(()=>{if(ae||oe)return;if(!Array.isArray(ne))return;const e=ne.map(e=>{const r=ie(e.id);if(!(r||z.includes(e.slug)||(a=e.slug,null!=ee&&ee.attributes&&ee.attributes.some(e=>{let{attribute:t,slug:r=[]}=e;return t===(null==G?void 0:G.taxonomy)&&r.includes(a)}))))return null;var a;const l=r?r.count:0;return{formattedValue:W(e.slug),value:e.slug,name:Object(O.decodeEntities)(e.name),label:Object(n.createElement)(m.a,{name:Object(O.decodeEntities)(e.name),count:t.showCounts?l:null}),textLabel:t.showCounts?`${Object(O.decodeEntities)(e.name)} (${l})`:Object(O.decodeEntities)(e.name)}}).filter(e=>!!e);Y(e),K(q())},[null==G?void 0:G.taxonomy,ne,ae,t.showCounts,oe,ie,z,ee.attributes]);const se=Object(n.useCallback)(e=>Array.isArray(ne)?ne.reduce((t,r)=>(e.includes(r.slug)&&t.push(r),t),[]):[],[ne]),ce=Object(n.useCallback)((function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(e=e.map(e=>({...e,slug:e.slug.map(e=>decodeURIComponent(e))})),t){if(null==G||!G.taxonomy)return;const t=Object.keys(Object(v.getQueryArgs)(window.location.href)),r=B(G.taxonomy),n=t.reduce((e,t)=>t.includes(x.b+r)||t.includes(x.a+r)?Object(v.removeQueryArgs)(e,t):e,window.location.href),a=V(n,e);Object(x.c)(a)}else{const t=V(I,e),r=Object(v.getQueryArgs)(window.location.href),n=Object(v.getQueryArgs)(t);R(r,n)||Object(x.c)(t)}}),[I,null==G?void 0:G.taxonomy]),ue=e=>{const r=Object(N.b)(te,re,G,se(e),"or"===t.queryType?"in":"and");ce(r,0===e.length)},be=Object(n.useCallback)((function(e){let n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];r||(Z(e),!n&&t.showFilterButton||Object(N.b)(te,re,G,se(e),"or"===t.queryType?"in":"and"))}),[r,Z,te,re,G,se,t.queryType,t.showFilterButton]),de=Object(n.useMemo)(()=>Object(k.a)(te)?te.filter(e=>{let{attribute:t}=e;return t===(null==G?void 0:G.taxonomy)}).flatMap(e=>{let{slug:t}=e;return t}):[],[te,null==G?void 0:G.taxonomy]),ge=Object(c.a)(de),me=Object(u.a)(ge);Object(n.useEffect)(()=>{!me||j()(me,ge)||j()(z,ge)||be(ge)},[z,ge,me,be]);const pe="single"!==t.selectType,fe=Object(n.useCallback)(e=>{const t=z.includes(e);let r;pe?(r=z.filter(t=>t!==e),t||(r.push(e),r.sort())):r=t?[]:[e],be(r)},[z,pe,be]);Object(n.useEffect)(()=>{G&&!t.showFilterButton&&((e=>{let{currentCheckedFilters:t,hasSetFilterDefaultsFromUrl:r}=e;return r&&0===t.length})({currentCheckedFilters:z,hasSetFilterDefaultsFromUrl:M})?ce(te,!0):ce(te,!1))},[M,ce,te,G,z,t.showFilterButton]),Object(n.useEffect)(()=>{if(!M&&!ae)return J.length>0?(U(!0),void be(J,!0)):void(y||U(!0))},[G,M,ae,be,J,y]);const ye=Object(D.b)();if(!o)return ye(!1),null;if(!G)return r?a("noAttributes"):(ye(!1),null);if(0===X.length&&!ae&&r)return a("noProducts");const je="h"+t.headingLevel,Oe=!t.isPreview&&ae,he=!t.isPreview&&oe,ve=(Oe||he)&&0===X.length;if(!ve&&0===X.length)return ye(!1),null;const we=pe?!ve&&z.length<X.length:!ve&&0===z.length,_e=Object(n.createElement)(je,{className:"wc-block-attribute-filter__title"},t.heading),ke=ve?Object(n.createElement)(L.a,null,_e):_e;return ye(!0),Object(n.createElement)(n.Fragment,null,!r&&t.heading&&ke,Object(n.createElement)("div",{className:l()("wc-block-attribute-filter","style-"+t.displayStyle)},"dropdown"===t.displayStyle?Object(n.createElement)(n.Fragment,null,Object(n.createElement)(A.a,{key:H,className:l()({"single-selection":!pe,"is-loading":ve}),style:{borderStyle:"none"},suggestions:X.filter(e=>!z.includes(e.value)).map(e=>e.formattedValue),disabled:ve,placeholder:Object(s.sprintf)(
/* translators: %s attribute name. */
Object(s.__)("Select %s","woo-gutenberg-products-block"),G.label),onChange:e=>{!pe&&e.length>1&&(e=[e[e.length-1]]);const t=[e=e.map(e=>{const t=X.find(t=>t.formattedValue===e);return t?t.value:e}),z].reduce((e,t)=>e.filter(e=>!t.includes(e)));if(1===t.length)return fe(t[0]);const r=[z,e].reduce((e,t)=>e.filter(e=>!t.includes(e)));1===r.length&&fe(r[0])},value:z,displayTransform:e=>{const t=X.find(t=>[t.value,t.formattedValue].includes(e));return t?t.textLabel:e},saveTransform:W,messages:{added:Object(s.sprintf)(
/* translators: %s is the attribute label. */
Object(s.__)("%s filter added.","woo-gutenberg-products-block"),G.label),removed:Object(s.sprintf)(
/* translators: %s is the attribute label. */
Object(s.__)("%s filter removed.","woo-gutenberg-products-block"),G.label),remove:Object(s.sprintf)(
/* translators: %s is the attribute label. */
Object(s.__)("Remove %s filter.","woo-gutenberg-products-block"),G.label.toLocaleLowerCase()),__experimentalInvalid:Object(s.sprintf)(
/* translators: %s is the attribute label. */
Object(s.__)("Invalid %s filter.","woo-gutenberg-products-block"),G.label.toLocaleLowerCase())}}),we&&Object(n.createElement)(E.a,{icon:C.a,size:30})):Object(n.createElement)(Q,{options:X,checked:z,onChange:fe,isLoading:ve,isDisabled:ve})),Object(n.createElement)("div",{className:"wc-block-attribute-filter__actions"},(z.length>0||r)&&!ve&&Object(n.createElement)(p.a,{onClick:()=>{Z([]),K(q()),M&&ue([])},screenReaderLabel:Object(s.__)("Reset attribute filter","woo-gutenberg-products-block")}),t.showFilterButton&&Object(n.createElement)(f.a,{className:"wc-block-attribute-filter__button",isLoading:ve,disabled:(()=>{if(Oe||he)return!0;const e=P(G);return e.length===z.length&&z.every(t=>e.includes(t))})(),onClick:()=>ue(z)})))};t.default=e=>{const t=Object(o.a)(e),r=(a=e,{className:Object(i.a)(null==a?void 0:a.className)?a.className:"",attributeId:parseInt(Object(i.a)(null==a?void 0:a.attributeId)?a.attributeId:"0",10),showCounts:"false"!==(null==a?void 0:a.showCounts),queryType:Object(i.a)(null==a?void 0:a.queryType)&&a.queryType||I.attributes.queryType.default,heading:Object(i.a)(null==a?void 0:a.heading)?a.heading:"",headingLevel:Object(i.a)(null==a?void 0:a.headingLevel)&&parseInt(a.headingLevel,10)||I.attributes.headingLevel.default,displayStyle:Object(i.a)(null==a?void 0:a.displayStyle)&&a.displayStyle||I.attributes.displayStyle.default,showFilterButton:"true"===(null==a?void 0:a.showFilterButton),selectType:Object(i.a)(null==a?void 0:a.selectType)&&a.selectType||I.attributes.selectType.default,isPreview:!1});var a;return Object(n.createElement)("div",{className:l()(Object(i.a)(e.className)?e.className:"",t.className),style:t.style},Object(n.createElement)(M,{isEditor:!1,attributes:r}))}}}]);