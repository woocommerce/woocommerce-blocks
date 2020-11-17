/**
 * External dependencies
 */
import { boolean } from '@storybook/addon-knobs';

/**
 * Internal dependencies
 */
import ProductName from '../';

export default {
	title: 'WooCommerce Blocks/@base-components/cart-checkout/ProductName',
	component: ProductName,
};

export const Default = () => {
	const hasLink = boolean( 'hasLink', true );

	return (
		<ProductName
			hasLink={ hasLink }
			name={ 'Test product' }
			permalink={ '/' }
		/>
	);
};
