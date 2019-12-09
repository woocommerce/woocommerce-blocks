/**
 * External dependencies
 */
import { withRestApiHydration } from '@woocommerce/block-hocs';

/**
 * Internal dependencies
 */
import FullCart from './full-cart';
import renderFrontend from '../../../utils/render-frontend.js';

const isCartEmpty = false; // @todo check if the cart has some products

if ( ! isCartEmpty ) {
	const getProps = () => {
		return {
			attributes: {},
		};
	};

	renderFrontend(
		'.wp-block-woocommerce-cart',
		withRestApiHydration( FullCart ),
		getProps
	);
}
