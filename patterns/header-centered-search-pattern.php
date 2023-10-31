<?php
/**
 * Title: Centered Header Menu with Search
 * Slug: woocommerce-blocks/header-centered-menu-with-search
 * Categories: WooCommerce
 * Block Types: core/template-part/header
 */
?>

<!-- wp:group {"className":"wc-blocks-header-pattern","align":"full","layout":{"type":"constrained"}} -->
<div class="wc-blocks-header-pattern wp-block-group alignfull">
	<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"right":"40px","bottom":"24px","left":"40px","top":"24px"},"margin":{"top":"0px","bottom":"0px"}}},"className":"sticky-header","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
	<div class="wp-block-group alignfull sticky-header" style="margin-top:0px;margin-bottom:0px;padding-top:24px;padding-right:40px;padding-bottom:24px;padding-left:40px">
		<!-- wp:group {"style":{"spacing":{"blockGap":"20px"}},"layout":{"type":"flex","flexWrap":"wrap"}} -->
		<div class="wp-block-group">
			<!-- wp:site-logo /-->
			<!-- wp:site-title {"style":{"typography":{"fontStyle":"normal","fontWeight":"700"}}} /-->
		</div>
		<!-- /wp:group -->
		<!-- wp:group {"style":{"spacing":{"blockGap":"0px"}},"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"right"}} -->
		<div class="wp-block-group">
			<!-- wp:woocommerce/customer-account {"displayStyle":"icon_only","iconClass":"wc-block-customer-account__account-icon"} /-->
			<!-- wp:woocommerce/mini-cart /-->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->

	<!-- wp:separator {"align":"full","style":{"spacing":{"margin":{"top":"0px","bottom":"0px"}}},"className":"is-style-wide"} -->
	<hr class="wp-block-separator alignfull has-alpha-channel-opacity is-style-wide" style="margin-top:0px;margin-bottom:0px"/>
	<!-- /wp:separator -->

	<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center"}} -->
	<div class="wp-block-group">
		<!-- wp:navigation {"style":{"typography":{"fontStyle":"normal","fontWeight":"400"},"spacing":{"blockGap":"30px"}}} /-->
	</div>
	<!-- /wp:group -->

	<!-- wp:separator {"align":"full","className":"is-style-wide"} -->
	<hr class="wp-block-separator alignfull has-alpha-channel-opacity is-style-wide" />
	<!-- /wp:separator -->
</div>
<!-- /wp:group -->
