<?php
/**
 * Title: Footer with 3 Menus
 * Slug: woocommerce-blocks/footer-with-3-menus
 * Categories: WooCommerce
 * Block Types: core/template-part/footer
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"blockGap":"40px","padding":{"top":"40px","right":"40px","bottom":"40px","left":"40px"}}},"className":"wc-blocks-footer-pattern"} -->
<div class="wp-block-group alignfull wc-blocks-footer-pattern" style="padding-top:40px;padding-right:40px;padding-bottom:40px;padding-left:40px">
	<!-- wp:columns {"style":{"spacing":{"padding":{"right":"0","left":"0"}}},"className":"are-vertically-aligned-top"} -->
	<div class="wp-block-columns are-vertically-aligned-top" style="padding-right:0;padding-left:0">
		<!-- wp:column {"verticalAlignment":"top","width":"60%"} -->
		<div class="wp-block-column is-vertically-aligned-top" style="flex-basis:60%">
			<!-- wp:group {"style":{"spacing":{"blockGap":"32px"}},"layout":{"type":"flex","flexWrap":"wrap","verticalAlignment":"top"}} -->
			<div class="wp-block-group">
				<!-- wp:site-logo /-->

				<!-- wp:columns {"style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":{"top":"var:preset|spacing|70","left":"var:preset|spacing|80"}}}} -->
				<div class="wp-block-columns" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
					<!-- wp:column -->
					<div class="wp-block-column">
						<!-- wp:navigation {"overlayMenu":"never","layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"10px"}}} /-->
					</div>
					<!-- /wp:column -->

					<!-- wp:column -->
					<div class="wp-block-column">
						<!-- wp:navigation {"overlayMenu":"never","layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"10px"}}} /-->
					</div>
					<!-- /wp:column -->

					<!-- wp:column -->
					<div class="wp-block-column">
						<!-- wp:navigation {"overlayMenu":"never","layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"10px"}}} /-->
					</div>
					<!-- /wp:column -->
				</div>
				<!-- /wp:columns -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"width":"10%"} -->
		<div class="wp-block-column" style="flex-basis:10%"></div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"stretch","width":"30%","style":{"spacing":{"blockGap":"60px"}},"layout":{"type":"default"}} -->
		<div class="wp-block-column is-vertically-aligned-stretch" style="flex-basis:30%">
			<!-- wp:search {"label":"<?php esc_html_e( 'Search', 'woo-gutenberg-products-block' ); ?>","showLabel":false,"placeholder":"<?php esc_html_e( 'Search our store', 'woo-gutenberg-products-block' ); ?>","buttonText":"<?php esc_html_e( 'Search our store', 'woo-gutenberg-products-block' ); ?>","buttonUseIcon":true,"query":{"post_type":"product"}} /-->

			<!-- wp:group {"style":{"spacing":{"blockGap":"0","padding":{"right":"0","left":"0"},"margin":{"top":"56px","bottom":"0"}}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"right"}} -->
			<div class="wp-block-group" style="margin-top:56px;margin-bottom:0;padding-right:0;padding-left:0">
				<!-- wp:site-title {"style":{"typography":{"fontStyle":"normal","fontWeight":"700"}}} /-->

				<!-- wp:paragraph {"align":"right"} --><p class="has-text-align-right">
					<?php
					echo sprintf(
					/* translators: Footer powered by text. %1$s being WordPress, %2$s being WooCommerce */
						esc_html__(
							'Powered by %1$s with %2$s',
							'woo-gutenberg-products-block'
						),
						'<a href="https://wordpress.org" target="_blank" rel="noreferrer nofollow">WordPress</a>',
						'<a href="https://woocommerce.com" target="_blank" rel="noreferrer nofollow">WooCommerce</a>'
					);
					?>
				</p><!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
