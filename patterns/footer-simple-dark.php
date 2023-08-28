<?php
/**
 * Title: Simple Footer Dark
 * Slug: woocommerce-blocks/footer-simple-dark
 * Categories: WooCommerce
 * Block Types: core/template-part/footer
 */
?>

<!-- wp:group {"className":"wc-blocks-footer-pattern","align":"full","style":{"spacing":{"padding":{"top":"32px","right":"48px","bottom":"32px","left":"48px"},"blockGap":"40px"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"backgroundColor":"black","textColor":"white"} -->
<div class="wc-blocks-footer-pattern wp-block-group alignfull has-background-color has-white-color has-black-background-color has-text-color has-background has-link-color" style="padding-top:32px;padding-right:48px;padding-bottom:32px;padding-left:48px">
	<!-- wp:columns -->
	<div class="wp-block-columns">
		<!-- wp:column {"width":"50%"} -->
		<div class="wp-block-column" style="flex-basis:50%">
			<!-- wp:group {"style":{"spacing":{"blockGap":"32px"}},"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"center"}} -->
			<div class="wp-block-group">
				<!-- wp:site-logo /-->
				<!-- wp:woocommerce/customer-account {"fontSize":"small"} /-->
				<!-- wp:navigation -->
				<!-- /wp:navigation -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%">
			<!-- wp:social-links {"iconColor":"background","iconColorValue":"#ffffff","className":"is-style-logos-only","layout":{"type":"flex","justifyContent":"center"}} -->
			<ul class="wp-block-social-links has-icon-color is-style-logos-only">
				<!-- wp:social-link {"service":"facebook"} /-->
				<!-- wp:social-link {"service":"instagram"} /-->
				<!-- wp:social-link {"service":"twitter"} /-->
			</ul>
			<!-- /wp:social-links -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->

	<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"0px","right":"0px","bottom":"0px","left":"0px"},"blockGap":"12px"}},"textColor":"background","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"center"}} -->
	<div class="wp-block-group alignfull has-background-color has-text-color" style="padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px">
		<!-- wp:group {"style":{"spacing":{"blockGap":"8px"}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center"}} -->
		<div class="wp-block-group">
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"12px"}}} -->
			<p style="font-size:12px">@ 2022</p>
			<!-- /wp:paragraph -->
			<!-- wp:site-title {"style":{"typography":{"fontStyle":"normal","fontWeight":"400","fontSize":"12px"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}}} /-->
		</div>
		<!-- /wp:group -->

		<!-- wp:paragraph {"style":{"typography":{"fontSize":"14px"}}} -->
		<p style="font-size:14px"><em>
			<?php
			echo sprintf(
				/* translators: %s WooCommerce link */
				esc_html__( 'Built with %s', 'woo-gutenberg-products-block' ),
				'<a href="https://woocommerce.com/" target="_blank" rel="noreferrer nofollow">WooCommerce</a>'
			);
			?>
		</em></p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
