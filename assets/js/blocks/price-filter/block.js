/**
 * External dependencies
 */
import {
	useCollection,
	useQueryStateByKey,
	useQueryStateContext,
} from '@woocommerce/base-hooks';

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
	const [ queryState ] = useQueryStateContext( 'product-grid' );
	const { results, isLoading } = useCollection( {
		namespace: '/wc/store',
		resourceName: 'products/collection-data',
		query: {
			...queryState,
			min_price: undefined,
			max_price: undefined,
			orderby: undefined,
			order: undefined,
			per_page: undefined,
			page: undefined,
			calculate_price_range: true,
		},
	} );

	const minConstraint = isLoading
		? undefined
		: parseInt( results.min_price, 10 );
	const maxConstraint = isLoading
		? undefined
		: parseInt( results.max_price, 10 );

	const [ minPrice, setMinPrice ] = useQueryStateByKey(
		'product-grid',
		'min_price'
	);
	const [ maxPrice, setMaxPrice ] = useQueryStateByKey(
		'product-grid',
		'max_price'
	);

	const onChange = ( prices ) => {
		if ( prices.min === minConstraint ) {
			setMinPrice( undefined );
		} else if ( prices.min !== minPrice ) {
			setMinPrice( prices.min );
		}

		if ( prices.max === maxConstraint ) {
			setMaxPrice( undefined );
		} else if ( prices.max !== maxPrice ) {
			setMaxPrice( prices.max );
		}
	};

	return (
		<div className="wc-block-price-slider">
			<PriceSlider
				min={ minConstraint }
				max={ maxConstraint }
				initialMin={ undefined }
				initialMax={ undefined }
				step={ 10 }
				currencySymbol={ CURRENCY.symbol }
				priceFormat={ CURRENCY.price_format }
				showInputFields={ showInputFields }
				showFilterButton={ showFilterButton }
				onChange={ onChange }
				isLoading={ isLoading }
			/>
		</div>
	);
};

export default PriceFilterBlock;
