/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import ProductPreview from '../';

/**
This story is not working because ProductPreview depends on wcSettings, e.g. THUMBNAIL_SIZE
I.e. it's coupled to WordPress + Woo environment.
- Can we get wcSettings available in storybook environment?
- Is it worthwhile having stories for components like this, or should we limit to simpler decoupled components?
*/

export default {
	title: 'WooCommerce Blocks/base/ProductPreview',
	component: ProductPreview,
};

export const Default = () => (
	<div>
		<ProductPreview />
	</div>
);
