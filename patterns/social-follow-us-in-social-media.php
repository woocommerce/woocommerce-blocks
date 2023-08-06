<?php
/**
 * Title: Social: Follow us in social media
 * Slug: woocommerce-blocks/social-follow-us-in-social-media
 * Categories: WooCommerce
 */
$onboarding_profile = get_option( 'woocommerce_onboarding_profile', '' );
if ( is_array( $onboarding_profile ) && isset( $onboarding_profile['industry'] ) ) {
	if ( is_array( $onboarding_profile['industry'] ) ) {
		$industry_choice = $onboarding_profile['industry'][0];
	} else {
		$industry_choice = $onboarding_profile['industry'];
	}
} else {
	$industry_choice = '';
}

if ( 'clothing_and_accessories' === $industry_choice ) {
	// @todo - Identify correct vertical ID for clothing and accessories.
	$vertical_id = 1720;
} elseif ( 'health_and_beauty' === $industry_choice ) {
	// @todo - Identify correct vertical ID for health and beauty.
	$vertical_id = 1721;
} elseif ( 'food_and_drink' === $industry_choice ) {
	// @todo - Identify correct vertical ID for food and drink.
	$vertical_id = 1722;
} elseif ( 'home_furniture_and_garden' === $industry_choice ) {
	// @todo - Identify correct vertical ID for home, furniture and garden.
	$vertical_id = 1723;
} elseif ( 'education_and_learning' === $industry_choice ) {
	// @todo - Identify correct vertical ID for education and learning.
	$vertical_id = 1724;
} elseif ( 'electronics_and_computers' === $industry_choice ) {
	// @todo - Identify correct vertical ID for electronics and computers.
	$vertical_id = 1725;
} else {
	// @todo - Identify correct vertical ID for other.
	$vertical_id = 1720;
}
// @todo - stop bypassing the vertical id check as soon as we have identified the desired ones.
$vertical_id       = 1720;
$available_formats = array( 'square', 'landscape', 'portrait' );

$cached_verticals = get_transient( 'woocommerce_blocks_verticals_' . $vertical_id );
if ( false !== $cached_verticals ) {
	$image_urls = $cached_verticals;
} else {
	$verticals_url   = esc_url( 'https://public-api.wordpress.com/wpcom/v2/site-verticals/' . $vertical_id . '/images' );
	$verticals       = wp_remote_get( $verticals_url );
	$required_format = 'square';
	$required_images = 4;
	$image_urls      = array();

	$verticals_response_code = wp_remote_retrieve_response_code( $verticals );
	if ( 200 === $verticals_response_code ) {
		$decoded_verticals = json_decode( wp_remote_retrieve_body( $verticals ) );

		if ( is_array( $decoded_verticals ) ) {
			shuffle( $decoded_verticals );
			foreach ( $decoded_verticals as $decoded_vertical ) {
				if ( count( $image_urls ) >= $required_images ) {
					break;
				}

				if ( ! isset( $decoded_vertical->guid ) ) {
					continue;
				}

				if ( ! isset( $decoded_vertical->width ) || ! isset( $decoded_vertical->height ) ) {
					continue;
				}

				if ( 'square' === $required_format && $decoded_vertical->width !== $decoded_vertical->height ) {
					continue;
				} elseif ( 'landscape' === $required_format && $decoded_vertical->width <= $decoded_vertical->height ) {
					continue;
				} elseif ( 'portrait' === $required_format && $decoded_vertical->width >= $decoded_vertical->height ) {
					continue;
				}

				$image_urls[] = str_replace( 'http://', 'https://', $decoded_vertical->guid );
			}
		}

		if ( ! empty( $image_urls ) ) {
			set_transient( 'woocommerce_blocks_verticals_' . $vertical_id, $image_urls, HOUR_IN_SECONDS );
		}
	}
}
?>
<!-- wp:columns {"verticalAlignment":null,"align":"wide"} -->
<div class="wp-block-columns alignwide">
	<!-- wp:column {"verticalAlignment":"bottom","width":"66.66%","layout":{"type":"constrained"}} -->
	<div class="wp-block-column is-vertically-aligned-bottom" style="flex-basis:66.66%">
		<!-- wp:heading {"level":3,"align":"wide"} -->
		<h3 class="wp-block-heading alignwide"><?php esc_html_e( 'Follow us in social media', 'woo-gutenberg-products-block' ); ?></h3>
		<!-- /wp:heading --></div>
	<!-- /wp:column -->

	<!-- wp:column {"verticalAlignment":"center","width":"33.33%"} -->
	<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:33.33%">
		<!-- wp:social-links {"iconColor":"contrast","openInNewTab":true,"style":{"spacing":{"blockGap":{"top":"0"}}},"className":"is-style-logos-only","layout":{"type":"flex","justifyContent":"right","orientation":"horizontal"}} -->
		<ul class="wp-block-social-links has-icon-color is-style-logos-only">
			<!-- wp:social-link {"url":"<?php echo esc_url( 'https://twitter.com/' ); ?>","service":"twitter"} /-->

			<!-- wp:social-link {"url":"<?php echo esc_url( 'https://www.instagram.com/' ); ?>","service":"instagram"} /-->

			<!-- wp:social-link {"url":"<?php echo esc_url( 'https://www.facebook.com/' ); ?>","service":"facebook"} /-->

			<!-- wp:social-link {"url":"<?php echo esc_url( 'https://www.twitch.tv/' ); ?>","service":"twitch"} /-->
		</ul>
		<!-- /wp:social-links -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"}}}} -->
<div class="wp-block-columns alignwide" style="margin-top:var(--wp--preset--spacing--40);margin-bottom:var(--wp--preset--spacing--40)">
	<!-- wp:column -->
	<div class="wp-block-column">
		<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
		<figure class="wp-block-image size-large">
			<img src="<?php echo isset( $image_urls[0] ) ? esc_url( $image_urls[0] ) : esc_url( plugins_url( 'images/pattern-placeholders/office.png', dirname( __FILE__ ) ) ); ?>" alt="<?php esc_attr_e( 'Placeholder image used to represent products being showcased as furniture in an office.', 'woo-gutenberg-products-block' ); ?>" />
		</figure>
		<!-- /wp:image -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column -->
	<div class="wp-block-column">
		<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
		<figure class="wp-block-image size-large">
			<img src="<?php echo isset( $image_urls[1] ) ? esc_url( $image_urls[1] ) : esc_url( plugins_url( 'images/pattern-placeholders/living-room.png', dirname( __FILE__ ) ) ); ?>" alt="<?php esc_attr_e( 'Placeholder image used to represent products being showcased as furniture in a living room.', 'woo-gutenberg-products-block' ); ?>" />
		</figure>
		<!-- /wp:image -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column -->
	<div class="wp-block-column">
		<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
		<figure class="wp-block-image size-large">
			<img src="<?php echo isset( $image_urls[2] ) ? esc_url( $image_urls[2] ) : esc_url( plugins_url( 'images/pattern-placeholders/living-room-sofa.png', dirname( __FILE__ ) ) ); ?>" alt="<?php esc_attr_e( 'Placeholder image used to represent products being showcased as furniture in a living room with gray sofa.', 'woo-gutenberg-products-block' ); ?>" />
		</figure>
		<!-- /wp:image -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column -->
	<div class="wp-block-column">
		<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
		<figure class="wp-block-image size-large">
			<img src="<?php echo isset( $image_urls[3] ) ? esc_url( $image_urls[3] ) : esc_url( plugins_url( 'images/pattern-placeholders/dining-room.png', dirname( __FILE__ ) ) ); ?>" alt="<?php esc_attr_e( 'Placeholder image used to represent products being showcased as furniture in a dining room.', 'woo-gutenberg-products-block' ); ?>" />
		</figure>
		<!-- /wp:image -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->
