<?php
/**
 * Title: WooCommerce Product Filters
 * Slug: woocommerce-blocks/product-filters
 * Categories: WooCommerce
 * Block Types: woocommerce/active-filters, woocommerce/price-filter, woocommerce/attribute-filter, woocommerce/stock-filter
 */
?>

<!-- wp:woocommerce/filter-wrapper -->
<div class="wp-block-woocommerce-filter-wrapper">
<!-- wp:heading {"level":3} -->
<h3>Active Filters</h3>
<!-- /wp:heading -->

<!-- wp:woocommerce/active-filters {"heading":""} -->
<div class="wp-block-woocommerce-active-filters is-loading" data-display-style="list" data-heading="" data-heading-level="3"><span aria-hidden="true" class="wc-block-active-product-filters__placeholder"></span></div>
<!-- /wp:woocommerce/active-filters -->
</div>
<!-- /wp:woocommerce/filter-wrapper -->

<!-- wp:woocommerce/filter-wrapper {"filterType":"price-filter"} -->
<div class="wp-block-woocommerce-filter-wrapper">
<!-- wp:heading {"level":3} -->
<h3>Filter by Price</h3>
<!-- /wp:heading -->

<!-- wp:woocommerce/price-filter {"heading":""} -->
<div class="wp-block-woocommerce-price-filter is-loading" data-showinputfields="true" data-showfilterbutton="false" data-heading="" data-heading-level="3"><span aria-hidden="true" class="wc-block-product-categories__placeholder"></span></div>
<!-- /wp:woocommerce/price-filter -->
</div>
<!-- /wp:woocommerce/filter-wrapper -->

<!-- wp:woocommerce/attribute-filter -->
<div class="wp-block-woocommerce-attribute-filter is-loading" data-attribute-id="0" data-show-counts="true" data-query-type="or" data-heading="Filter by attribute" data-heading-level="3"><span aria-hidden="true" class="wc-block-product-attribute-filter__placeholder"></span></div>
<!-- /wp:woocommerce/attribute-filter -->

<!-- wp:woocommerce/filter-wrapper {"filterType":"stock-filter"} -->
<div class="wp-block-woocommerce-filter-wrapper">
<!-- wp:heading {"level":3} -->
<h3>Filter by Stock</h3>
<!-- /wp:heading -->

<!-- wp:woocommerce/stock-filter {"heading":""} -->
<div class="wp-block-woocommerce-stock-filter is-loading" data-show-counts="true" data-heading="" data-heading-level="3"><span aria-hidden="true" class="wc-block-product-stock-filter__placeholder"></span></div>
<!-- /wp:woocommerce/stock-filter -->
</div>
<!-- /wp:woocommerce/filter-wrapper -->
