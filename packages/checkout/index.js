export * from './totals';
export * from './shipping';
export * from './slot';
export * from './registry';
export { default as ExperimentalOrderMeta } from './order-meta';
export { default as ExperimentalOrderShippingPackages } from './order-shipping-packages';
export { default as Panel } from './panel';
export { SlotFillProvider } from 'wordpress-components';

export const __EXPERIMENTAL_PRICE_FORMAT_FILTER =
	'wcBlocks.__experimental_price_format_filter';

// @todo move to WC Subscriptions
import { __, sprintf } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';

addFilter(
	__EXPERIMENTAL_PRICE_FORMAT_FILTER,
	'woocommerce-subscriptions/set-totals-label',
	( placeholder ) =>
		sprintf(
			/* translators: %s is the subscription price to pay immediately (ie: $10). */
			__( 'Due today %s', 'woocommerce-subscriptions' ),
			placeholder
		)
);
