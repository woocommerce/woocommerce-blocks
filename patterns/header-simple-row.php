<?php
/**
 * Title: WooCommerce Header Simple Row
 * Slug: woocommerce-blocks/header-simple-row
 * Categories: WooCommerce
 * Block Types: core/template-part/header
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"right":"2%","bottom":"16px","left":"2%","top":"16px"},"margin":{"top":"0px","bottom":"0px"}}},"className":"sticky-header","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
<div class="wp-block-group alignfull sticky-header" style="margin-top:0px;margin-bottom:0px;padding-top:16px;padding-right:2%;padding-bottom:16px;padding-left:2%">
	<!-- wp:group {"style":{"spacing":{"blockGap":"40px"}},"layout":{"type":"flex","flexWrap":"wrap"}} -->
	<div class="wp-block-group">
		<!-- wp:site-logo {"shouldSyncIcon":false} /-->
		<!-- wp:site-title {"style":{"typography":{"fontStyle":"normal","fontWeight":"600","fontSize":"1.5rem"}}} /-->

		<!-- wp:navigation /-->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"style":{"spacing":{"blockGap":"8px"},"typography":{"fontSize":"13px"}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"right"}} -->
	<div class="wp-block-group" style="font-size:13px">
		<!-- wp:group {"style":{"spacing":{"blockGap":"16px"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
		<div class="wp-block-group">
			<!-- wp:separator {"className":"is-style-wide"} -->
			<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />
			<!-- /wp:separator -->
		</div>
		<!-- /wp:group -->

		<!-- wp:woocommerce/customer-account {"displayStyle":"icon_only","iconStyle":"alt","iconClass":"wc-block-customer-account__account-icon"} /-->

		<!-- wp:spacer -->
		<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
		<!-- /wp:spacer -->

		<!-- wp:woocommerce/mini-cart {"style":{"typography":{"fontSize":"14px"}}} /-->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
