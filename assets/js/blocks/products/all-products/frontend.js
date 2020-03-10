/**
 * External dependencies
 */
import withRestApiHydration from '@woocommerce/base-hocs/with-rest-api-hydration';

/**
 * Internal dependencies
 */
import Block from './block';
import renderFrontend from '../../../utils/render-frontend.js';

const getProps = ( el ) => ( {
	attributes: JSON.parse( el.dataset.attributes ),
} );

renderFrontend(
	'.wp-block-woocommerce-all-products',
	withRestApiHydration( Block ),
	getProps
);
