<?php
/**
 * Title: Featured Category Cover Image
 * Slug: woocommerce-blocks/featured-category-cover-image
 * Categories: WooCommerce
 */

// Below query is temporary work around to get patterns previews to work.
$transient_name = 'wc_blocks_pattern_featured_category_cover_image';
$categories     = get_transient( $transient_name );

if ( ( false === $categories ) || ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ) {
	global $wpdb;

	$categories = $wpdb->get_results(
		"SELECT tt.term_id FROM {$wpdb->prefix}term_taxonomy AS tt
		LEFT JOIN {$wpdb->prefix}terms AS t ON tt.term_id = t.term_id
		WHERE tt.taxonomy = 'product_cat' AND tt.count > 0 AND tt.parent = 0 AND t.slug != 'uncategorized'
		LIMIT 1",
		ARRAY_A
	);

	set_transient( $transient_name, $categories, DAY_IN_SECONDS * 14 );
}

$category = $categories[0]['term_id'] ? $categories[0]['term_id'] : 0;
?>
<?php echo '<!-- wp:woocommerce/featured-category {"dimRatio":0,"editMode":false,"focalPoint":{"x":0.52,"y":0.5},"imageFit":"cover","categoryId":' . esc_attr( $category ) . ',"overlayColor":"#F6F6F6","align":"full","textColor":"foreground"} -->'; ?>
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button -->
	<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url( get_category_link( $category ) ); ?>"><?php esc_html_e( 'Shop now', 'woo-gutenberg-products-block' ); ?></a></div>
	<!-- /wp:button --></div>
<!-- /wp:buttons -->
<!-- /wp:woocommerce/featured-category -->
