/**
 * External dependencies
 */
import { useQueryStateByKey } from '@woocommerce/base-hooks';
import { formatPrice } from '@woocommerce/base-utils';
import { useCallback } from '@wordpress/element';

/**
 * Component displaying active filters.
 */
const ActiveFiltersBlock = () => {
	/*const [ queryState ] = useQueryStateByContext( 'product-grid' );
	const [ productAttributes, setProductAttributes ] = useQueryStateByKey(
		'product-grid',
		'attributes',
		[]
	);*/
	const [ minPrice, setMinPrice ] = useQueryStateByKey(
		'product-grid',
		'min_price'
	);
	const [ maxPrice, setMaxPrice ] = useQueryStateByKey(
		'product-grid',
		'max_price'
	);

	const removeFilterLink = useCallback( ( callback = () => {} ) => {
		return <button onClick={ callback }>Remove</button>;
	}, [] );

	const renderMinPrice = useCallback( () => {
		if ( ! Number.isFinite( minPrice ) ) {
			return;
		}
		return (
			<li>
				Prices from { formatPrice( minPrice ) }
				{ removeFilterLink( () => {
					setMinPrice( null );
				} ) }
			</li>
		);
	}, [ minPrice ] );

	const renderMaxPrice = useCallback( () => {
		if ( ! Number.isFinite( maxPrice ) ) {
			return;
		}
		return (
			<li>
				Prices to { formatPrice( maxPrice ) }
				{ removeFilterLink( () => {
					setMaxPrice( null );
				} ) }
			</li>
		);
	}, [ maxPrice ] );

	return (
		<div className="wc-block-active-filters">
			<ul>
				{ renderMinPrice() }
				{ renderMaxPrice() }
			</ul>
		</div>
	);
};

export default ActiveFiltersBlock;
