<?php
/**
 * Title: A block template for movies
 * Slug: example-theme/movie-block-template
 * Categories: WooCommerce
 */

?>
<!-- wp:columns {"backgroundColor":"tertiary","lock":{"move":true,"remove":true}} -->
<div class="wp-block-columns has-tertiary-background-color has-background">
	<!-- wp:column {"lock":{"move":true,"remove":true}} -->
	<div class="wp-block-column">
		<!-- wp:image {"lock":{"move":true,"remove":true}} -->
		<figure class="wp-block-image"><img alt=""/></figure>
		<!-- /wp:image --></div>
	<!-- /wp:column -->

	<!-- wp:column {"lock":{"move":true,"remove":true}} -->
	<div class="wp-block-column">
		<!-- wp:heading {"placeholder":"Title","level":3,"lock":{"move":true,"remove":true}} -->
		<h3></h3>
		<!-- /wp:heading -->

		<!-- wp:paragraph {"placeholder":"Summary","lock":{"move":true,"remove":true}} -->
		<p></p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->
