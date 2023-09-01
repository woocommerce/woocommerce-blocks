<?php
/**
 * Title: Featured Category Grid
 * Slug: woocommerce-blocks/featured-category-grid
 * Categories: WooCommerce
 */

$cols = 3;

$categories = array_values(
	get_categories(
		array(
			'taxonomy'   => 'product_cat',
			'hide_empty' => true,
		)
	)
);

$rows = intdiv( count( $categories ), $cols ) + count( $categories ) % $cols;
?>

<?php
for ( $row = 0; $row < $rows; $row++ ) {
	?>
	<!-- wp:columns {"align":"wide"} -->
	<div class="wp-block-columns alignwide">

		<?php
		for ( $col = 0; $col < $cols; $col++ ) {
			$category = $categories[ $row * $cols + $col ];
			?>
			<?php if ( isset( $category ) ) { ?>
				<!-- wp:column -->
				<div class="wp-block-column">
					<!-- wp:woocommerce/featured-category {"editMode":false,"categoryId":<?php echo esc_attr( $category->term_id ); ?>} -->
						<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
						<div class="wp-block-buttons">
							<!-- wp:button -->
							<div class="wp-block-button">
								<a class="wp-block-button__link wp-element-button" href="<?php echo esc_url( get_term_link( $category->term_id, 'product_cat' ) ); ?>">Shop now</a>
							</div>
							<!-- /wp:button -->
						</div>
						<!-- /wp:buttons -->
					<!-- /wp:woocommerce/featured-category -->
				</div>
				<!-- /wp:column -->
			<?php } else { ?>
				<!-- wp:column -->
				<div class="wp-block-column">
				</div>
				<!-- /wp:column -->
			<?php } ?>
		<?php } ?>
	</div>
	<!-- /wp:columns -->
<?php }; ?>
