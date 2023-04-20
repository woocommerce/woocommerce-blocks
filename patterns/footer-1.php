<?php
/**
 * Title: WooCommerce Footer 1
 * Slug: woocommerce-blocks/footer-1
 * Categories: WooCommerce
 * Block Types: core/template-part/footer
 */
?>

<!-- wp:group {"tagName":"footer","layout":{"type":"default"}} -->
<footer class="wp-block-group">
	<!-- wp:group {"style":{"spacing":{"blockGap":"0","padding":{"top":"0","right":"var:preset|spacing|40","bottom":"0","left":"var:preset|spacing|40"}}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
	<div class="wp-block-group" style="padding-top:0;padding-right:var(--wp--preset--spacing--40);padding-bottom:0;padding-left:var(--wp--preset--spacing--40)">
		<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
		<div class="wp-block-group">
			<!-- wp:site-logo {"style":{"color":{"duotone":"var:preset|duotone|dark-grayscale"}}} /-->
			<!-- wp:navigation {"ref":242} /-->
		</div>
		<!-- /wp:group -->

		<!-- wp:social-links {"customIconColor":"#8c8f94","iconColorValue":"#8c8f94","className":"is-style-logos-only"} -->
		<ul class="wp-block-social-links has-icon-color is-style-logos-only">
			<!-- wp:social-link {"url":"https://instagram.com/","service":"instagram","label":"Instagram"} /-->
			<!-- wp:social-link {"url":"https://facebook.com","service":"facebook","label":"Facebook"} /-->
			<!-- wp:social-link {"url":"https://twitter.com/","service":"twitter","label":"Twitter"} /-->
		</ul>
		<!-- /wp:social-links -->
	</div>
	<!-- /wp:group -->

	<!-- wp:separator {"style":{"color":{"background":"#8c8f94"}}} -->
	<hr class="wp-block-separator has-text-color has-alpha-channel-opacity has-background" style="background-color:#8c8f94;color:#8c8f94"/>
	<!-- /wp:separator -->

	<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|40"}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center"}} -->
	<div class="wp-block-group">
		<!-- wp:group {"style":{"spacing":{"blockGap":"10px","padding":{"top":"0","right":"0","bottom":"0","left":"0"}}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"left","verticalAlignment":"center"}} -->
		<div class="wp-block-group" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
			<!-- wp:paragraph {"align":"left"} -->
			<p class="has-text-align-left">© 2023</p>
			<!-- /wp:paragraph -->
			<!-- wp:site-title {"level":0} /-->
		</div>
		<!-- /wp:group -->

		<!-- wp:paragraph -->
		<p>Powered by <a href="https://woocommerce.com/">WooCommerce</a></p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</footer>
<!-- /wp:group -->
