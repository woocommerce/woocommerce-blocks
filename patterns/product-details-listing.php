<?php
/**
 * Title: Product Details Product Listing
 * Slug: woocommerce-blocks/product-details-listing
 * Categories: WooCommerce
 */

$query = new \WC_Product_Query(
	array(
		'limit'  => 1,
		'return' => 'ids',
		'status' => array( 'publish' ),
	)
);

$products   = $query->get_products();
$product_id = $products ? $products[0] : null;
?>

<!-- wp:woocommerce/single-product {"productId":<?php echo esc_attr( $product_id ); ?>} -->
<div class="wp-block-woocommerce-single-product">
	<!-- wp:columns -->
	<div class="wp-block-columns">
		<!-- wp:column -->
		<div class="wp-block-column"><!-- wp:post-featured-image {"height":"490px"} /-->

			<!-- wp:woocommerce/product-rating {"textAlign":"center","isDescendentOfSingleProductBlock":true,"textColor":"luminous-vivid-amber"} /-->

			<!-- wp:post-title {"textAlign":"center","isLink":true,"style":{"typography":{"fontStyle":"normal","fontWeight":"700"},"elements":{"link":{"color":{"text":"#000001"}}},"color":{"text":"#000001"}},"fontSize":"x-large","__woocommerceNamespace":"woocommerce/product-query/product-title"} /-->

			<!-- wp:woocommerce/product-price {"textAlign":"center","isDescendentOfSingleProductBlock":true,"style":{"typography":{"fontSize":"28px","fontStyle":"normal","fontWeight":"700"}}} /-->

			<!-- wp:woocommerce/product-button {"textAlign":"center","isDescendentOfSingleProductBlock":true,"style":{"color":{"background":"#000001","text":"#fffff1"},"typography":{"fontSize":"18px","fontStyle":"normal","fontWeight":"600"},"spacing":{"padding":{"top":"20px","bottom":"20px","right":"94px","left":"94px"},"margin":{"top":"15px"}}}} /--></div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:woocommerce/single-product -->
