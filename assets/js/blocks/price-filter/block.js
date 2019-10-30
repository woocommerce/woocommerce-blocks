/**
 * External dependencies
 */
import { useCollection } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import PriceSlider from '@woocommerce/base-components/price-slider';
import { CURRENCY } from '@woocommerce/settings';

/**
 * Component displaying a price filter.
 */
const PriceFilterBlock = ( { attributes } ) => {
	const { showInputFields, showFilterButton } = attributes;

	const { results, isLoading } = useCollection( {
		namespace: '/wc/store',
		resourceName: 'products/collection-data',
		query: {
			calculate_price_range: true,
		},
	} );

	const minConstraint = isLoading ? 0 : parseInt( results.min_price, 10 );
	const maxConstraint = isLoading ? 100 : parseInt( results.max_price, 10 );

	return (
		<div className="wc-block-price-slider">
			<PriceSlider
				min={ minConstraint }
				max={ maxConstraint }
				step={ 10 }
				currencySymbol={ CURRENCY.symbol }
				priceFormat={ CURRENCY.price_format }
				showInputFields={ showInputFields }
				showFilterButton={ showFilterButton }
				onChange={ () => {} }
				isLoading={ isLoading }
			/>
		</div>
	);
};

export default PriceFilterBlock;
