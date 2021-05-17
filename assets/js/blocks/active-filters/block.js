/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useQueryStateByKey } from '@woocommerce/base-context/hooks';
import { useMemo } from '@wordpress/element';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Label } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import './style.scss';
import { getAttributeFromTaxonomy } from '../../utils/attributes';
import { formatPriceRange, renderRemovableListItem } from './utils';
import ActiveAttributeFilters from './active-attribute-filters';

/**
 * Component displaying active filters.
 *
 * @param {Object} props Incoming props for the component.
 * @param {Object} props.attributes Incoming attributes for the block.
 * @param {boolean} props.isEditor Whether or not in the editor context.
 */
const ActiveFiltersBlock = ( {
	attributes: blockAttributes,
	isEditor = false,
} ) => {
	const [ productAttributes, setProductAttributes ] = useQueryStateByKey(
		'attributes',
		[]
	);
	const [ minPrice, setMinPrice ] = useQueryStateByKey( 'min_price' );
	const [ maxPrice, setMaxPrice ] = useQueryStateByKey( 'max_price' );

	const activePriceFilters = useMemo( () => {
		if ( ! Number.isFinite( minPrice ) && ! Number.isFinite( maxPrice ) ) {
			return null;
		}
		return renderRemovableListItem( {
			type: __( 'Price', 'woo-gutenberg-products-block' ),
			name: formatPriceRange( minPrice, maxPrice ),
			removeCallback: () => {
				setMinPrice( undefined );
				setMaxPrice( undefined );
			},
			displayStyle: blockAttributes.displayStyle,
		} );
	}, [
		minPrice,
		maxPrice,
		blockAttributes.displayStyle,
		setMinPrice,
		setMaxPrice,
	] );

	const activeAttributeFilters = useMemo( () => {
		return productAttributes.map( ( attribute ) => {
			const attributeObject = getAttributeFromTaxonomy(
				attribute.attribute
			);
			return (
				<ActiveAttributeFilters
					attributeObject={ attributeObject }
					displayStyle={ blockAttributes.displayStyle }
					slugs={ attribute.slug }
					key={ attribute.attribute }
					operator={ attribute.operator }
				/>
			);
		} );
	}, [ productAttributes, blockAttributes.displayStyle ] );

	const hasFilters = () => {
		return (
			productAttributes.length > 0 ||
			Number.isFinite( minPrice ) ||
			Number.isFinite( maxPrice )
		);
	};

	if ( ! hasFilters() && ! isEditor ) {
		return null;
	}

	const TagName = `h${ blockAttributes.headingLevel }`;
	const listClasses = classnames( 'wc-block-active-filters__list', {
		'wc-block-active-filters__list--chips':
			blockAttributes.displayStyle === 'chips',
	} );

	return (
		<>
			{ ! isEditor && blockAttributes.heading && (
				<TagName>{ blockAttributes.heading }</TagName>
			) }
			<div className="wc-block-active-filters">
				<ul className={ listClasses }>
					{ isEditor ? (
						<>
							{ renderRemovableListItem( {
								type: __(
									'Size',
									'woo-gutenberg-products-block'
								),
								name: __(
									'Small',
									'woo-gutenberg-products-block'
								),
								displayStyle: blockAttributes.displayStyle,
							} ) }
							{ renderRemovableListItem( {
								type: __(
									'Color',
									'woo-gutenberg-products-block'
								),
								name: __(
									'Blue',
									'woo-gutenberg-products-block'
								),
								displayStyle: blockAttributes.displayStyle,
							} ) }
						</>
					) : (
						<>
							{ activePriceFilters }
							{ activeAttributeFilters }
						</>
					) }
				</ul>
				<button
					className="wc-block-active-filters__clear-all"
					onClick={ () => {
						setMinPrice( undefined );
						setMaxPrice( undefined );
						setProductAttributes( [] );
					} }
				>
					<Label
						label={ __(
							'Clear All',
							'woo-gutenberg-products-block'
						) }
						screenReaderLabel={ __(
							'Clear All Filters',
							'woo-gutenberg-products-block'
						) }
					/>
				</button>
			</div>
		</>
	);
};

ActiveFiltersBlock.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * Whether it's in the editor or frontend display.
	 */
	isEditor: PropTypes.bool,
};

export default ActiveFiltersBlock;
