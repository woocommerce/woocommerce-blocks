/**
 * External dependencies
 */
import { addFilter } from '@wordpress/hooks';

addFilter(
	'newTemplate.defaultTemplateSlugs',
	'woocommerce-blocks/extend-default-template-slugs',
	( slugs ) => {
		return slugs.concat( [ 'taxonomy-product_attribute' ] );
	}
);
