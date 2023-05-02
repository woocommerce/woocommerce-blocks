<?php
/**
 * Title: Featured Category Cover Image
 * Slug: woocommerce-blocks/featured-category-cover-image
 * Categories: WooCommerce
 */
?>
<?php echo '<!-- wp:cover {"url":"' . esc_url( plugins_url() ) . '/woocommerce-blocks/images/pattern-placeholders/product-apparel-1.png","id":1,"dimRatio":0,"contentPosition":"top left","align":"wide","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","right":"var:preset|spacing|60","bottom":"var:preset|spacing|60","left":"var:preset|spacing|60"}}},"layout":{"type":"constrained"}} -->'; ?>
<div class="wp-block-cover alignwide has-custom-content-position is-position-top-left" style="padding-top:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--60)">
	<span aria-hidden="true" class="wp-block-cover__background has-background-dim-0 has-background-dim"></span>
	<img class="wp-block-cover__image-background wp-image-1" alt="" src="<?php echo esc_url( plugins_url() ) . '/woocommerce-blocks/images/pattern-placeholders/product-apparel-1.png'; ?>" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:paragraph {"align":"left","placeholder":"Write title…","style":{"typography":{"lineHeight":"0"}},"fontSize":"large"} -->
	<p class="has-text-align-left has-x-large-font-size" style="line-height:0"><strong>100% natural denim</strong></p>
	<!-- /wp:paragraph -->

	<!-- wp:paragraph {"style":{"typography":{"lineHeight":"3"}}} -->
	<p style="line-height:3">Only the finest goes into our products. You deserve it.</p>
	<!-- /wp:paragraph -->

	<!-- wp:buttons -->
	<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"background","textColor":"foreground","style":{"border":{"width":"0px","style":"none"}},"className":"is-style-fill"} -->
		<div class="wp-block-button is-style-fill"><a class="wp-block-button__link has-foreground-color has-background-background-color has-text-color has-background wp-element-button" style="border-style:none;border-width:0px">Shop jeans</a></div>
		<!-- /wp:button --></div>
	<!-- /wp:buttons --></div>
</div>
<!-- /wp:cover -->
