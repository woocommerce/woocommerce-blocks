/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useQueryStateByContext,
	useQueryStateByKey,
} from '@woocommerce/base-context/hooks';
import { getSetting, getSettingWithCoercion } from '@woocommerce/settings';
import { useMemo, useState, useEffect } from '@wordpress/element';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Label from '@woocommerce/base-components/label';
import { isBoolean } from '@woocommerce/types';

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
 * @param {Object}  props            Incoming props for the component.
 * @param {Object}  props.attributes Incoming attributes for the block.
 * @param {boolean} props.isEditor   Whether or not in the editor context.
 */
const ActiveFiltersBlock = ( {
	attributes: blockAttributes,
	isEditor = false,
} ) => {
	const filteringForPhpTemplate = getSettingWithCoercion(
		'is_rendering_php_template',
		false,
		isBoolean
	);
	const [ queryState ] = useQueryStateByContext();
	const [ filterRemoved, setFilterRemoved ] = useState( false );
	const [ productAttributes, setProductAttributes ] = useQueryStateByKey(
		'attributes',
		[]
	);
	const [ productStockStatus, setProductStockStatus ] = useQueryStateByKey(
		'stock_status',
		[]
	);
	const [ minPrice, setMinPrice ] = useQueryStateByKey( 'min_price' );
	const [ maxPrice, setMaxPrice ] = useQueryStateByKey( 'max_price' );

	const STOCK_STATUS_OPTIONS = getSetting( 'stockStatusOptions', [] );
	const activeStockStatusFilters = useMemo( () => {
		if ( productStockStatus.length > 0 ) {
			return productStockStatus.map( ( slug ) => {
				return renderRemovableListItem( {
					type: __( 'Stock Status', 'woo-gutenberg-products-block' ),
					name: STOCK_STATUS_OPTIONS[ slug ],
					removeCallback: () => {
						const newStatuses = productStockStatus.filter(
							( status ) => {
								return status !== slug;
							}
						);
						setProductStockStatus( newStatuses );
						setFilterRemoved( true );
					},
					displayStyle: blockAttributes.displayStyle,
				} );
			} );
		}
	}, [
		STOCK_STATUS_OPTIONS,
		productStockStatus,
		setProductStockStatus,
		blockAttributes.displayStyle,
	] );

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
				setFilterRemoved( true );
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
					setFilterRemoved={ setFilterRemoved }
				/>
			);
		} );
	}, [ productAttributes, blockAttributes.displayStyle ] );

	useEffect( () => {
		if ( ! filteringForPhpTemplate ) {
			return;
		}
		if ( ! filterRemoved ) {
			return;
		}

		if ( ! window ) {
			return;
		}

		const queryStringIndex = window.location.href.indexOf( '?' );
		if ( queryStringIndex === -1 ) {
			return;
		}

		const baseURL = window.location.href.substr( 0, queryStringIndex );

		const filteredQuery = Object.fromEntries(
			Object.entries( queryState ).filter( ( [ , value ] ) => {
				if ( value?.length === 0 ) {
					return false;
				}
				if ( ! value ) {
					return false;
				}

				return true;
			} )
		);

		console.log( queryState, filteredQuery );

		if ( Object.keys( filteredQuery ).length === 0 ) {
			window.location.href = baseURL;
		}
	}, [ filteringForPhpTemplate, filterRemoved, queryState ] );

	const hasFilters = () => {
		return (
			productAttributes.length > 0 ||
			productStockStatus.length > 0 ||
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
				<TagName className="wc-block-active-filters__title">
					{ blockAttributes.heading }
				</TagName>
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
							{ activeStockStatusFilters }
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
						setProductStockStatus( [] );
						setFilterRemoved( true );
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
