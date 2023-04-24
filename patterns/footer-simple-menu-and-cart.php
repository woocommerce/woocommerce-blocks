<?php
/**
 * Title: Footer with Simple Menu and Cart
 * Slug: woocommerce-blocks/footer-simple-menu-and-cart
 * Categories: WooCommerce
 * Block Types: core/template-part/footer
 */
?>

<!-- wp:group {"align":"full"} -->
<div class="wp-block-group alignfull">
	<!-- wp:columns -->
	<div class="wp-block-columns">
		<!-- wp:column {"width":"70%"} -->
		<div class="wp-block-column" style="flex-basis:70%">
			<!-- wp:group {"style":{"spacing":{"blockGap":"32px"}},"layout":{"type":"flex","flexWrap":"wrap"}} -->
			<div class="wp-block-group">
				<!-- wp:search {"label":"Search","showLabel":false,"placeholder":"Search our store","width":240,"widthUnit":"px","buttonText":"Search","buttonPosition":"button-inside","buttonUseIcon":true,"query":{"post_type":"product"},"backgroundColor":"base","textColor":"contrast"} /-->

				<!-- wp:group {"style":{"spacing":{"blockGap":"8px"}},"layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap"}} -->
				<div class="wp-block-group">
					<!-- wp:navigation {"ref":1855,"style":{"spacing":{"blockGap":"var:preset|spacing|30"}}} /-->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"blockGap":"16px"}}} -->
		<div class="wp-block-column">
			<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"right"}} -->
			<div class="wp-block-group">
				<!-- wp:woocommerce/mini-cart /-->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->

	<!-- wp:separator -->
	<hr class="wp-block-separator has-alpha-channel-opacity" />
	<!-- /wp:separator -->

	<!-- wp:group {"style":{"spacing":{"blockGap":"5px"}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center","orientation":"vertical"}} -->
	<div class="wp-block-group">
		<!-- wp:site-title {"textAlign":"center","style":{"typography":{"fontSize":"14px","fontStyle":"normal","fontWeight":"700"}}} /-->

		<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"12px"}}} -->
		<p class="has-text-align-center" style="font-size:12px">
			Powered by <a href="https://wordpress.com/">WordPress</a> with <a href="https://woocommerce.com/">WooCommerce</a>
		</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
