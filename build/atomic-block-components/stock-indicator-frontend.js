(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[10],{304:function(o,c){},314:function(o,c,t){"use strict";t.r(c);var n=t(7),e=t.n(n),r=t(1),s=(t(3),t(5)),a=t.n(s),i=t(73),u=t(198),k=(t(304),function(o){return Object(r.sprintf)(Object(r.__)("%d left in stock","woo-gutenberg-products-block"),o)}),b=function(o,c){return c?Object(r.__)("Available on backorder","woo-gutenberg-products-block"):o?Object(r.__)("In Stock","woo-gutenberg-products-block"):Object(r.__)("Out of Stock","woo-gutenberg-products-block")};c.default=Object(u.withProductDataContext)((function(o){var c,t=o.className,n=Object(i.useInnerBlockLayoutContext)().parentClassName,r=Object(i.useProductDataContext)().product;if(!r.id||!r.is_purchasable)return null;var s=!!r.is_in_stock,u=r.low_stock_remaining,d=r.is_on_backorder;return React.createElement("div",{className:a()(t,"wc-block-components-product-stock-indicator",(c={},e()(c,"".concat(n,"__stock-indicator"),n),e()(c,"wc-block-components-product-stock-indicator--in-stock",s),e()(c,"wc-block-components-product-stock-indicator--out-of-stock",!s),e()(c,"wc-block-components-product-stock-indicator--low-stock",!!u),e()(c,"wc-block-components-product-stock-indicator--available-on-backorder",!!d),c))},u?k(u):b(s,d))}))}}]);