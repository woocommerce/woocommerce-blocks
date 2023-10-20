<?php
/**
 * Title: Footer with 3 Menus
 * Slug: woocommerce-blocks/footer-with-3-menus
 * Categories: WooCommerce
 * Block Types: core/template-part/footer
 */
?>

<!-- wp:group {"className":"wc-blocks-footer-pattern","align":"full","style":{"spacing":{"blockGap":"40px","padding":{"top":"var:preset|spacing|30","right":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30"}}}} -->
<div class="wc-blocks-footer-pattern wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30)">
	<!-- wp:columns {"style":{"spacing":{"padding":{"right":"0","left":"0"}}},"className":"are-vertically-aligned-top"} -->
	<div class="wp-block-columns are-vertically-aligned-top" style="padding-right:0;padding-left:0">
		<!-- wp:column {"verticalAlignment":"top","width":"60%"} -->
		<div class="wp-block-column is-vertically-aligned-top" style="flex-basis:60%">
			<!-- wp:group {"style":{"spacing":{"blockGap":"32px"}},"layout":{"type":"flex","flexWrap":"wrap","verticalAlignment":"top"}} -->
			<div class="wp-block-group">
				<!-- wp:site-logo {"width":60,"shouldSyncIcon":false} /-->

				<!-- wp:columns {"style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":{"top":"var:preset|spacing|70","left":"var:preset|spacing|70"}}}} -->
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

		<!-- wp:column {"verticalAlignment":"top","style":{"spacing":{"blockGap":"60px"}},"layout":{"type":"default"}} -->
		<div class="wp-block-column is-vertically-aligned-top">
			<!-- wp:group {"style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":"var:preset|spacing|50"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"right"}} -->
			<div class="wp-block-group" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
				<!-- wp:group {"style":{"border":{"top":{"width":"1px","style":"solid"},"right":{"width":"1px","style":"solid"},"bottom":{"width":"1px","style":"solid"},"left":{"width":"1px","style":"solid"}},"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"}}},"layout":{"type":"flex","orientation":"vertical"}} -->
				<div class="wp-block-group" style="border-top-style:solid;border-top-width:1px;border-right-style:solid;border-right-width:1px;border-bottom-style:solid;border-bottom-width:1px;border-left-style:solid;border-left-width:1px;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
					<!-- wp:search {"label":"Search","showLabel":false,"placeholder":"Search our store","widthUnit":"px","buttonText":"Search","buttonUseIcon":true,"query":{"post_type":"product"},"style":{"border":{"top":{"width":"0px","style":"none"},"right":{"width":"0px","style":"none"},"bottom":{"width":"0px","style":"none"},"left":{"width":"0px","style":"none"}}}} /-->
				</div>
				<!-- /wp:group -->

				<!-- wp:group {"style":{"spacing":{"blockGap":"0"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"right"}} -->
				<div class="wp-block-group">
					<!-- wp:site-title /-->

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
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
