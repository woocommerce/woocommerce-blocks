<?php
/**
 * Title: Large Header
 * Slug: woocommerce-blocks/header-large
 * Categories: WooCommerce
 * Block Types: core/template-part/header
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"right":"40px","left":"40px"}}},"layout":{"type":"default"}} -->
<div class="wp-block-group alignfull" style="padding-right: 40px; padding-left: 40px;">
	<!-- wp:group {"align":"full","layout":{"type":"default"}} -->
	<div class="wp-block-group alignfull">
		<!-- wp:columns {"verticalAlignment":"center","isStackedOnMobile":false,"align":"full"} -->
		<div class="wp-block-columns alignfull are-vertically-aligned-center is-not-stacked-on-mobile">
			<!-- wp:column {"verticalAlignment":"center","width":"70%","layout":{"type":"default"}} -->
			<div class="wp-block-column is-vertically-aligned-center" style="flex-basis: 70%;">
				<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"left"}} -->
				<div class="wp-block-group">
					<!-- wp:site-logo {"shouldSyncIcon":true} /-->

					<!-- wp:site-title {"style":{"layout":{"selfStretch":"fixed","flexSize":"200px"}}} /-->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:column -->

			<!-- wp:column {"verticalAlignment":"center","width":""} -->
			<div class="wp-block-column is-vertically-aligned-center">
				<!-- wp:group {"style":{"spacing":{"blockGap":"0px"}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"right"}} -->
				<div class="wp-block-group">
					<!-- wp:woocommerce/customer-account {"displayStyle":"icon_only","iconClass":"wc-block-customer-account__account-icon"} /-->

					<!-- wp:woocommerce/mini-cart {"hasHiddenPrice":true} /-->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:column -->
		</div>
		<!-- /wp:columns -->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"align":"full","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
	<div class="wp-block-group alignfull">
		<!-- wp:navigation /-->

		<!-- wp:group {"layout":{"type":"constrained"}} -->
		<div class="wp-block-group"><!-- wp:search {"label":"","showLabel":false,"placeholder":"Search","width":100,"widthUnit":"%","buttonText":"Search","query":{"post_type":"product"},"style":{"border":{"radius":"0px"}}} /--></div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
