/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';

export const ShippingVia = ( {
	selectedShippingRates,
}: {
	selectedShippingRates: string[];
} ): JSX.Element => {
	return (
		<div className="wc-block-components-totals-item__description wc-block-components-totals-shipping__via">
			{ decodeEntities( selectedShippingRates.join( ', ' ) ) }
		</div>
	);
};
