(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[32],{232:function(e,t,n){"use strict";n.r(t),n.d(t,"Block",(function(){return g}));var c=n(0),r=n(1),s=n(4),o=n.n(s),a=n(26),i=n(88),l=n(53),u=n(137);n(272);const b=e=>({width:e/5*100+"%"}),p=e=>{let{parentClassName:t}=e;const n=b(0);return Object(c.createElement)("div",{className:o()("wc-block-components-product-rating__norating-container",t+"-product-rating__norating-container")},Object(c.createElement)("div",{className:"wc-block-components-product-rating__norating",role:"img"},Object(c.createElement)("span",{style:n})),Object(c.createElement)("span",null,Object(r.__)("No Reviews","woo-gutenberg-products-block")))},m=e=>{const{rating:t,reviews:n,parentClassName:s}=e,a=b(t),i=Object(r.sprintf)(
/* translators: %f is referring to the average rating value */
Object(r.__)("Rated %f out of 5","woo-gutenberg-products-block"),t),l={__html:Object(r.sprintf)(
/* translators: %1$s is referring to the average rating value, %2$s is referring to the number of ratings */
Object(r._n)("Rated %1$s out of 5 based on %2$s customer rating","Rated %1$s out of 5 based on %2$s customer ratings",n,"woo-gutenberg-products-block"),Object(r.sprintf)('<strong class="rating">%f</strong>',t),Object(r.sprintf)('<span class="rating">%d</span>',n))};return Object(c.createElement)("div",{className:o()("wc-block-components-product-rating__stars",s+"__product-rating__stars"),role:"img","aria-label":i},Object(c.createElement)("span",{style:a,dangerouslySetInnerHTML:l}))},d=e=>{const{reviews:t}=e,n=Object(r.sprintf)(
/* translators: %s is referring to the total of reviews for a product */
Object(r._n)("(%s customer review)","(%s customer reviews)",t,"woo-gutenberg-products-block"),t);return Object(c.createElement)("span",{className:"wc-block-components-product-rating__reviews_count"},n)},g=e=>{const{textAlign:t,isDescendentOfSingleProductBlock:n,shouldDisplayMockedReviewsWhenProductHasNoReviews:r}=e,s=Object(i.a)(e),{parentClassName:l}=Object(a.useInnerBlockLayoutContext)(),{product:b}=Object(a.useProductDataContext)(),g=(e=>{const t=parseFloat(e.average_rating);return Number.isFinite(t)&&t>0?t:0})(b),w=(e=>{const t=Object(u.a)(e.review_count)?e.review_count:parseInt(e.review_count,10);return Number.isFinite(t)&&t>0?t:0})(b),_=o()(s.className,"wc-block-components-product-rating",{[l+"__product-rating"]:l,["has-text-align-"+t]:t}),O=r?Object(c.createElement)(p,{parentClassName:l}):null,j=w?Object(c.createElement)(m,{rating:g,reviews:w,parentClassName:l}):O;return Object(c.createElement)("div",{className:_,style:s.style},Object(c.createElement)("div",{className:"wc-block-components-product-rating__container"},j,w&&n?Object(c.createElement)(d,{reviews:w}):null))};t.default=Object(l.withProductDataContext)(g)},272:function(e,t){}}]);