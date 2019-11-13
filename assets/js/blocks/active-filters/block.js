/**
 * External dependencies
 */
import { useQueryStateByKey } from '@woocommerce/base-hooks';
import { formatPrice } from '@woocommerce/base-utils';
import { useCallback, Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';
import { getAttributeFromTaxonomy } from '../../utils/attributes';
import { removeAttributeFilterBySlug } from '../../utils/attributes-query';

/**
 * Component displaying active filters.
 */
const ActiveFiltersBlock = () => {
	// @todo rather than look at these individually we need a store of active filters which standardized names we can
	// loop over the display, and remove in a standard fashion.
	const [ productAttributes, setProductAttributes ] = useQueryStateByKey(
		'product-grid',
		'attributes',
		[]
	);
	const [ minPrice, setMinPrice ] = useQueryStateByKey(
		'product-grid',
		'min_price'
	);
	const [ maxPrice, setMaxPrice ] = useQueryStateByKey(
		'product-grid',
		'max_price'
	);

	const removeFilterLink = useCallback( ( callback = () => {} ) => {
		return (
			<button onClick={ callback } aria-label="Remove">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<rect x="0" fill="none" width="24" height="24" />
					<g>
						<path d="M19.1 4.9C15.2 1 8.8 1 4.9 4.9S1 15.2 4.9 19.1s10.2 3.9 14.1 0 4-10.3.1-14.2zm-4.3 11.3L12 13.4l-2.8 2.8-1.4-1.4 2.8-2.8-2.8-2.8 1.4-1.4 2.8 2.8 2.8-2.8 1.4 1.4-2.8 2.8 2.8 2.8-1.4 1.4z" />
					</g>
				</svg>
			</button>
		);
	}, [] );

	const renderMinPriceFilter = useCallback( () => {
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

	const renderMaxPriceFilter = useCallback( () => {
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

	/**
	 * @todo we need a system or hook to lookup slugs->names and taxonomy->label for this.
	 */
	const renderProductAttributeFilters = useCallback( () => {
		return (
			<Fragment>
				{ productAttributes.map( ( attribute, attributeIndex ) => {
					const attributeObject = getAttributeFromTaxonomy(
						attribute.attribute
					);
					const attributeLabel = attributeObject.label;
					return attribute.slug.map( ( slug, index ) => (
						<li key={ attributeIndex + '-' + index }>
							{ attributeLabel + ': ' }
							<strong>{ slug }</strong>
							{ removeFilterLink( () => {
								removeAttributeFilterBySlug(
									productAttributes,
									setProductAttributes,
									attributeObject,
									slug
								);
							} ) }
						</li>
					) );
				} ) }
			</Fragment>
		);
	}, [ productAttributes, setProductAttributes ] );

	return (
		<div className="wc-block-active-filters">
			<h3>Active Filters</h3>
			<ul className="wc-block-active-filters-list">
				{ renderMinPriceFilter() }
				{ renderMaxPriceFilter() }
				{ renderProductAttributeFilters() }
			</ul>
		</div>
	);
};

export default ActiveFiltersBlock;
