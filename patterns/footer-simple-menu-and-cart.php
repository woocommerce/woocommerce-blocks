<?php
/**
 * Title: Footer with Simple Menu and Cart
 * Slug: woocommerce-blocks/footer-simple-menu-and-cart
 * Categories: WooCommerce
 * Block Types: core/template-part/footer
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"40px","bottom":"40px","left":"40px","right":"40px"}}},"className":"wc-blocks-footer-pattern"} -->
<div class="wp-block-group alignfull wc-blocks-footer-pattern" style="padding-top:40px;padding-right:40px;padding-bottom:40px;padding-left:40px">
	<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"right":"0","left":"0"}}},"layout":{"type":"constrained"}} -->
	<div class="wp-block-group alignfull" style="padding-right:0;padding-left:0">
		<!-- wp:columns {"align":"full","style":{"spacing":{"padding":{"right":"0","left":"0"}}}} -->
		<div class="wp-block-columns alignfull" style="padding-right:0;padding-left:0">
			<!-- wp:column {"verticalAlignment":"center","width":""} -->
			<div class="wp-block-column is-vertically-aligned-center">
				<!-- wp:group {"style":{"spacing":{"blockGap":"32px"}},"layout":{"type":"flex","flexWrap":"wrap"}} -->
				<div class="wp-block-group">
					<!-- wp:search {"label":"<?php esc_html_e( 'Search', 'woo-gutenberg-products-block' ); ?>","showLabel":false,"placeholder":"<?php esc_html_e( 'Search our store', 'woo-gutenberg-products-block' ); ?>","buttonText":"<?php esc_html_e( 'Search our store', 'woo-gutenberg-products-block' ); ?>","buttonUseIcon":true,"query":{"post_type":"product"}} /-->
					<!-- wp:navigation {"overlayMenu":"never","layout":{"type":"flex","orientation":"horizontal","justifyContent":"left","flexWrap":"wrap"},"style":{"spacing":{"blockGap":"30px"}}} /-->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:column -->

			<!-- wp:column {"verticalAlignment":"center","width":"140px","style":{"spacing":{"blockGap":"16px"}}} -->
			<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:140px">
				<!-- wp:woocommerce/mini-cart /-->
			</div>
			<!-- /wp:column -->
		</div>
		<!-- /wp:columns -->

		<!-- wp:separator {"align":"full","style":{"spacing":{"margin":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"}}},"className":"is-style-wide"} -->
		<hr class="wp-block-separator alignfull has-alpha-channel-opacity is-style-wide" style="margin-top:var(--wp--preset--spacing--40);margin-bottom:var(--wp--preset--spacing--40)"/>
		<!-- /wp:separator -->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"style":{"spacing":{"blockGap":"5px"}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center","orientation":"vertical"}} -->
	<div class="wp-block-group">
		<!-- wp:site-title {"style":{"typography":{"fontStyle":"normal","fontWeight":"700"}}} /-->

		<!-- wp:paragraph {"align":"center"} -->
		<p class="has-text-align-center">
			<?php
				/* translators: 1: WordPress link, 2: WooCommerce link */
				echo sprintf( esc_html__( 'Powered by %1$s with %2$s', 'woo-gutenberg-products-block' ), '<a href="https://wordpress.org" target="_blank" rel="noreferrer nofollow">WordPress</a>', '<a href="https://woocommerce.com" target="_blank" rel="noreferrer nofollow">WooCommerce</a>' );
			?>
		</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
