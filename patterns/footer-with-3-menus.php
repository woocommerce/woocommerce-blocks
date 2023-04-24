<?php
/**
 * Title: Footer with 3 menus
 * Slug: woocommerce-blocks/footer-with-3-menus
 * Categories: WooCommerce
 * Block Types: core/template-part/footer
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"blockGap":"40px"}}} -->
<div class="wp-block-group alignfull">
	<!-- wp:columns -->
	<div class="wp-block-columns">
		<!-- wp:column {"verticalAlignment":"center","width":"70%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:70%">
			<!-- wp:group {"style":{"spacing":{"blockGap":"32px"}},"layout":{"type":"flex","flexWrap":"wrap","verticalAlignment":"top"}} -->
			<div class="wp-block-group"><!-- wp:site-logo {"shouldSyncIcon":false} /-->

				<!-- wp:columns {"style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":{"top":"var:preset|spacing|70","left":"var:preset|spacing|70"}}}} -->
				<div class="wp-block-columns" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
					<!-- wp:column -->
					<div class="wp-block-column">
						<!-- wp:navigation {"overlayMenu":"never","layout":{"type":"flex","orientation":"vertical","flexWrap":"wrap"},"style":{"spacing":{"blockGap":"10px"}}} /-->
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
			<!-- wp:group {"style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":"5px"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"right","verticalAlignment":"space-between"}} -->
			<div class="wp-block-group" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
				<!-- wp:search {"label":"Search","showLabel":false,"placeholder":"Search our store","width":240,"widthUnit":"px","buttonText":"Search","buttonPosition":"button-inside","buttonUseIcon":true,"query":{"post_type":"product"},"backgroundColor":"base","textColor":"contrast"} /-->

				<!-- wp:site-title {"textAlign":"right","style":{"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"14px"},"spacing":{"margin":{"top":"var:preset|spacing|50"}}}} /-->

				<!-- wp:paragraph {"align":"right","style":{"typography":{"fontSize":"12px"}}} -->
				<p class="has-text-align-right" style="font-size:12px">
					Powered by <a href="https://wordpress.com/">WordPress</a> with <a href="https://woocommerce.com/">WooCommerce</a>
				</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
