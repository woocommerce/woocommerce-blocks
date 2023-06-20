<?php
/**
 * Title: Shop by Price
 * Slug: woocommerce-blocks/shop-by-price
 * Categories: WooCommerce
 */
?>
<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide">
	<!-- wp:column {"width":"25%","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":"10px"}},"layout":{"type":"default"}} -->
	<div class="wp-block-column" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;flex-basis:25%">
		<!-- wp:cover {"customOverlayColor":"#e09300","minHeight":130,"minHeightUnit":"px","contentPosition":"top left","isDark":false,"className":"is-light has-background-color has-text-color","style":{"spacing":{"blockGap":"0em","padding":{"top":"0.8em"}}}} -->
		<div class="wp-block-cover is-light has-custom-content-position is-position-top-left has-background-color has-text-color" style="padding-top:0.8em;min-height:130px">
			<span aria-hidden="true" class="wp-block-cover__background has-background-dim-100 has-background-dim" style="background-color:#e09300"></span>
			<div class="wp-block-cover__inner-container">
				<!-- wp:paragraph {"align":"left","placeholder":"Write title…","style":{"typography":{"fontSize":"0.7em","lineHeight":"1"},"spacing":{"margin":{"top":"0px","bottom":"5px"}},"color":{"text":"#ffffff"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}}} -->
				<p class="has-text-align-left has-text-color has-link-color" style="color:#ffffff;margin-top:0px;margin-bottom:5px;font-size:0.7em;line-height:1"><a style="text-decoration:none;" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>?rating_filter=5">Best</a></p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.7em","lineHeight":"1"},"spacing":{"margin":{"top":"0px","bottom":"5px"}},"color":{"text":"#ffffff"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"fontSize":"large"} -->
				<p class="has-text-color has-link-color has-large-font-size" style="color:#ffffff;margin-top:0px;margin-bottom:5px;font-size:0.7em;line-height:1"><strong><a style="text-decoration:none;" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>?rating_filter=5">sellers</a></strong></p>
				<!-- /wp:paragraph -->
			</div>
		</div>
		<!-- /wp:cover -->

		<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","verticalAlignment":"center"}} -->
		<div class="wp-block-buttons">
			<!-- wp:button {"textColor":"contrast","style":{"border":{"width":"0px","style":"none"},"spacing":{"padding":{"left":"0","right":"0","top":"0","bottom":"0"}}},"className":"is-style-outline","fontSize":"small"} -->
			<div class="wp-block-button has-custom-font-size is-style-outline has-small-font-size">
				<a class="wp-block-button__link has-contrast-color has-text-color wp-element-button" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>?rating_filter=5" style="border-style:none;border-width:0px;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><strong>Outdoor Furniture &amp; Accessories</strong></a>
			</div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column {"width":"25%","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":"10px"}},"layout":{"type":"default"}} -->
	<div class="wp-block-column" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;flex-basis:25%">
		<!-- wp:cover {"customOverlayColor":"#6f64f1","minHeight":130,"minHeightUnit":"px","contentPosition":"top left","className":"has-background-color has-text-color","style":{"spacing":{"blockGap":"0.8em","padding":{"top":"0.8em"}}}} -->
		<div class="wp-block-cover has-custom-content-position is-position-top-left has-background-color has-text-color" style="padding-top:0.8em;min-height:130px">
			<span aria-hidden="true" class="wp-block-cover__background has-background-dim-100 has-background-dim" style="background-color:#6f64f1"></span>
			<div class="wp-block-cover__inner-container">
				<!-- wp:paragraph {"align":"left","placeholder":"Write title…","style":{"typography":{"fontSize":"0.7em","lineHeight":"1"},"spacing":{"margin":{"top":"0px","bottom":"5px"}},"color":{"text":"#ffffff"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}}} -->
				<p class="has-text-align-left has-text-color has-link-color" style="color:#ffffff;margin-top:0px;margin-bottom:5px;font-size:0.7em;line-height:1"><a style="text-decoration:none;" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>?max_price=15">Under</a></p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.7em","lineHeight":"1"},"spacing":{"margin":{"top":"0px","bottom":"5px"}},"color":{"text":"#ffffff"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"fontSize":"large"} -->
				<p class="has-text-color has-link-color has-large-font-size" style="color:#ffffff;margin-top:0px;margin-bottom:5px;font-size:0.7em;line-height:1"><strong><a style="text-decoration:none;" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>?max_price=15">$15</a></strong></p>
				<!-- /wp:paragraph -->
			</div>
		</div>
		<!-- /wp:cover -->

		<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","verticalAlignment":"center"}} -->
		<div class="wp-block-buttons">
			<!-- wp:button {"textColor":"contrast","style":{"border":{"width":"0px","style":"none"},"spacing":{"padding":{"left":"0","right":"0","top":"0","bottom":"0"}}},"className":"is-style-outline","fontSize":"small"} -->
			<div class="wp-block-button has-custom-font-size is-style-outline has-small-font-size">
				<a class="wp-block-button__link has-contrast-color has-text-color wp-element-button" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>?max_price=15" style="border-style:none;border-width:0px;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
					<strong>Summer Dinning</strong>
				</a>
			</div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column {"width":"25%","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":"10px"}},"layout":{"type":"default"}} -->
	<div class="wp-block-column" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;flex-basis:25%">
		<!-- wp:cover {"customOverlayColor":"#c1d21c","minHeight":130,"minHeightUnit":"px","contentPosition":"top left","className":"has-background-color has-text-color","style":{"spacing":{"blockGap":"0.8em","padding":{"top":"0.8em"}}}} -->
		<div class="wp-block-cover has-custom-content-position is-position-top-left has-background-color has-text-color" style="padding-top:0.8em;min-height:130px">
			<span aria-hidden="true" class="wp-block-cover__background has-background-dim-100 has-background-dim" style="background-color:#c1d21c"></span>
			<div class="wp-block-cover__inner-container">
				<!-- wp:paragraph {"align":"left","placeholder":"Write title…","style":{"typography":{"fontSize":"0.7em","lineHeight":"1"},"spacing":{"margin":{"top":"0px","bottom":"5px"}},"color":{"text":"#ffffff"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}}} -->
				<p class="has-text-align-left has-text-color has-link-color" style="color:#ffffff;margin-top:0px;margin-bottom:5px;font-size:0.7em;line-height:1"><a style="text-decoration:none;" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>?max_price=25">Under</a></p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.7em","lineHeight":"1"},"spacing":{"margin":{"top":"0px","bottom":"5px"}},"color":{"text":"#ffffff"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"fontSize":"large"} -->
				<p class="has-text-color has-link-color has-large-font-size" style="color:#ffffff;margin-top:0px;margin-bottom:5px;font-size:0.7em;line-height:1"><strong><a style="text-decoration:none;" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>?max_price=25">$25</a></strong></p>
				<!-- /wp:paragraph -->
			</div>
		</div>
		<!-- /wp:cover -->

		<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","verticalAlignment":"center"}} -->
		<div class="wp-block-buttons">
			<!-- wp:button {"textColor":"contrast","style":{"border":{"width":"0px","style":"none"},"spacing":{"padding":{"left":"0","right":"0","top":"0","bottom":"0"}}},"className":"is-style-outline","fontSize":"small"} -->
			<div class="wp-block-button has-custom-font-size is-style-outline has-small-font-size">
				<a class="wp-block-button__link has-contrast-color has-text-color wp-element-button" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>?max_price=25" style="border-style:none;border-width:0px;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
					<strong>Women's Styles</strong>
				</a>
			</div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column {"width":"25%","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"},"blockGap":"10px"}},"layout":{"type":"default"}} -->
	<div class="wp-block-column" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;flex-basis:25%">
		<!-- wp:cover {"customOverlayColor":"#10ca99","minHeight":130,"minHeightUnit":"px","contentPosition":"top left","className":"has-background-color has-text-color","style":{"spacing":{"blockGap":"0.8em","padding":{"top":"0.8em"}}}} -->
		<div class="wp-block-cover has-custom-content-position is-position-top-left has-background-color has-text-color" style="padding-top:0.8em;min-height:130px">
			<span aria-hidden="true" class="wp-block-cover__background has-background-dim-100 has-background-dim" style="background-color:#10ca99"></span>
			<div class="wp-block-cover__inner-container">
				<!-- wp:paragraph {"align":"left","placeholder":"Write title…","style":{"typography":{"fontSize":"0.7em","lineHeight":"1"},"spacing":{"margin":{"top":"0px","bottom":"5px"}},"color":{"text":"#ffffff"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}}} -->
				<p class="has-text-align-left has-text-color has-link-color" style="color:#ffffff;margin-top:0px;margin-bottom:5px;font-size:0.7em;line-height:1"><a style="text-decoration:none;" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>?max_price=20">Under</a></p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.7em","lineHeight":"1"},"spacing":{"margin":{"top":"0px","bottom":"5px"}},"color":{"text":"#ffffff"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"fontSize":"large"} -->
				<p class="has-text-color has-link-color has-large-font-size" style="color:#ffffff;margin-top:0px;margin-bottom:5px;font-size:0.7em;line-height:1"><strong><a style="text-decoration:none;" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>?max_price=20">$20</a></strong></p>
				<!-- /wp:paragraph -->
			</div>
		</div>
		<!-- /wp:cover -->

		<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","verticalAlignment":"center"}} -->
		<div class="wp-block-buttons">
			<!-- wp:button {"textColor":"contrast","style":{"border":{"width":"0px","style":"none"},"spacing":{"padding":{"left":"0","right":"0","top":"0","bottom":"0"}}},"className":"is-style-outline","fontSize":"small"} -->
			<div class="wp-block-button has-custom-font-size is-style-outline has-small-font-size">
				<a class="wp-block-button__link has-contrast-color has-text-color wp-element-button" href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>?max_price=20" style="border-style:none;border-width:0px;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
					<strong>Kids' Styles</strong>
				</a>
			</div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->
