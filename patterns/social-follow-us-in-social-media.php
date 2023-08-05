<?php
/**
 * Title: Social: Follow us in social media
 * Slug: woocommerce-blocks/social-follow-us-in-social-media
 * Categories: WooCommerce
 */
$vertical_id     = 1720;
$required_images = 4;
$verticals_url   = esc_url( 'https://public-api.wordpress.com/wpcom/v2/site-verticals/' . $vertical_id . '/images' );
$verticals       = wp_remote_get( $verticals_url );
$image_urls      = array();

$verticals_response_code = wp_remote_retrieve_response_code( $verticals );
if ( 200 === $verticals_response_code ) {
	$decoded_verticals = json_decode( wp_remote_retrieve_body( $verticals ) );

	if ( is_array( $decoded_verticals ) ) {
		shuffle( $decoded_verticals );
		foreach ( $decoded_verticals as $decoded_vertical ) {
			if ( ! isset( $decoded_vertical->guid ) ) {
				continue;
			}

			$image_urls[] = str_replace( 'http://', 'https://', $decoded_vertical->guid );
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
