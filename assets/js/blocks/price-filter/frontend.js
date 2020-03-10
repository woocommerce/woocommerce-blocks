/**
 * External dependencies
 */
import withRestApiHydration from '@woocommerce/base-hocs/with-rest-api-hydration';

/**
 * Internal dependencies
 */
import renderFrontend from '../../utils/render-frontend.js';
import Block from './block.js';

const getProps = ( el ) => {
	return {
		attributes: {
			showInputFields: el.dataset.showinputfields === 'true',
			showFilterButton: el.dataset.showfilterbutton === 'true',
		},
	};
};

renderFrontend(
	'.wp-block-woocommerce-price-filter',
	withRestApiHydration( Block ),
	getProps
);
