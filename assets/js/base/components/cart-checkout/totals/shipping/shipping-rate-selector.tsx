/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import NoticeBanner from '@woocommerce/base-components/notice-banner';
import { useStoreCart } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import ShippingRatesControl from '../../shipping-rates-control';

export const ShippingRateSelector = (): JSX.Element => {
	const { isAddressComplete, shippingRates, isLoadingRates } = useStoreCart();
	const legend = __( 'Shipping options', 'woo-gutenberg-products-block' );
	return (
		<fieldset className="wc-block-components-totals-shipping__fieldset">
			<legend className="screen-reader-text">{ legend }</legend>
			<ShippingRatesControl
				className="wc-block-components-totals-shipping__options"
				noResultsMessage={
					<>
						{ isAddressComplete && (
							<NoticeBanner
								isDismissible={ false }
								className="wc-block-components-shipping-rates-control__no-results-notice"
								status="warning"
							>
								{ __(
									'There are no shipping options available. Please check your shipping address.',
									'woo-gutenberg-products-block'
								) }
							</NoticeBanner>
						) }
					</>
				}
				shippingRates={ shippingRates }
				isLoadingRates={ isLoadingRates }
				context="woocommerce/cart"
			/>
		</fieldset>
	);
};

export default ShippingRateSelector;
