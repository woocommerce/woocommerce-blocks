/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useQueryStateByKey } from '@woocommerce/base-context/hooks';
import { getSetting, getSettingWithCoercion } from '@woocommerce/settings';
import { useMemo, useEffect, useState } from '@wordpress/element';
import classnames from 'classnames';
import Label from '@woocommerce/base-components/label';
import {
	isAttributeQueryCollection,
	isBoolean,
	isRatingQueryCollection,
	isStockStatusQueryCollection,
	isStockStatusOptions,
} from '@woocommerce/types';
import { getUrlParameter } from '@woocommerce/utils';
import FilterTitlePlaceholder from '@woocommerce/base-components/filter-placeholder';
import { useIsMounted } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import './style.scss';
import { getAttributeFromTaxonomy } from '../../utils/attributes';
import {
	formatPriceRange,
	renderRemovableListItem,
	removeArgsFromFilterUrl,
	cleanFilterUrl,
	maybeUrlContainsFilters,
	urlContainsAttributeFilter,
} from './utils';
import ActiveAttributeFilters from './active-attribute-filters';
import FilterPlaceholders from './filter-placeholders';
import type { ActiveFiltersBlockProps } from './types';
import { useSetWraperVisibility } from '../filter-wrapper/context';

/**
 * Component displaying active filters.
 *
 * @param {Object}  props            Incoming props for the component.
 * @param {Object}  props.heading
 * @param {Object}  props.headingLevel
 * @param {Object}  props.displayStyle
 * @param {Object}  props.isEditor
 */
const ActiveFiltersBlock = ( {
	heading,
	headingLevel,
	displayStyle,
	isEditor,
}: ActiveFiltersBlockProps ) => {
	const props = {
		heading,
		headingLevel,
		displayStyle,
		isEditor,
	};
	const setWrapperVisibility = useSetWraperVisibility();
	const isMounted = useIsMounted();
	const componentHasMounted = isMounted();
	const filteringForPhpTemplate = getSettingWithCoercion(
		'is_rendering_php_template',
		false,
		isBoolean
	);
	const [ isLoading, setIsLoading ] = useState( true );
	/*
		activeAttributeFilters is the only async query in this block. Because of this the rest of the filters will render null
		when in a loading state and activeAttributeFilters renders the placeholders.
	*/
	const shouldShowLoadingPlaceholders =
		maybeUrlContainsFilters() && ! props.isEditor && isLoading;
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

	const [ productRatings, setProductRatings ] =
		useQueryStateByKey( 'rating' );

	const STOCK_STATUS_OPTIONS = getSetting( 'stockStatusOptions', [] );
	const STORE_ATTRIBUTES = getSetting( 'attributes', [] );
	const activeStockStatusFilters = useMemo( () => {
		if (
			shouldShowLoadingPlaceholders ||
			productStockStatus.length === 0 ||
			! isStockStatusQueryCollection( productStockStatus ) ||
			! isStockStatusOptions( STOCK_STATUS_OPTIONS )
		) {
			return null;
		}

		const stockStatusLabel = __(
			'Stock Status',
			'woo-gutenberg-products-block'
		);

		return (
			<li>
				<span className="wc-block-active-filters__list-item-type">
					{ stockStatusLabel }:
				</span>
				<ul>
					{ productStockStatus.map( ( slug ) => {
						return renderRemovableListItem( {
							type: stockStatusLabel,
							name: STOCK_STATUS_OPTIONS[ slug ],
							removeCallback: () => {
								removeArgsFromFilterUrl( {
									filter_stock_status: slug,
								} );
								if ( ! filteringForPhpTemplate ) {
									const newStatuses =
										productStockStatus.filter(
											( status ) => {
												return status !== slug;
											}
										);
									setProductStockStatus( newStatuses );
								}
							},
							showLabel: false,
							displayStyle: props.displayStyle,
						} );
					} ) }
				</ul>
			</li>
		);
	}, [
		shouldShowLoadingPlaceholders,
		STOCK_STATUS_OPTIONS,
		productStockStatus,
		setProductStockStatus,
		props.displayStyle,
		filteringForPhpTemplate,
	] );

	const activePriceFilters = useMemo( () => {
		if (
			shouldShowLoadingPlaceholders ||
			( ! Number.isFinite( minPrice ) && ! Number.isFinite( maxPrice ) )
		) {
			return null;
		}
		return renderRemovableListItem( {
			type: __( 'Price', 'woo-gutenberg-products-block' ),
			name: formatPriceRange( minPrice, maxPrice ),
			removeCallback: () => {
				removeArgsFromFilterUrl( 'max_price', 'min_price' );
				if ( ! filteringForPhpTemplate ) {
					setMinPrice( undefined );
					setMaxPrice( undefined );
				}
			},
			displayStyle: props.displayStyle,
		} );
	}, [
		shouldShowLoadingPlaceholders,
		minPrice,
		maxPrice,
		props.displayStyle,
		setMinPrice,
		setMaxPrice,
		filteringForPhpTemplate,
	] );

	const activeAttributeFilters = useMemo( () => {
		if (
			( ! isAttributeQueryCollection( productAttributes ) &&
				componentHasMounted ) ||
			( ! productAttributes.length &&
				! urlContainsAttributeFilter( STORE_ATTRIBUTES ) )
		) {
			if ( isLoading ) {
				setIsLoading( false );
			}
			return null;
		}

		return productAttributes.map( ( attribute ) => {
			const attributeObject = getAttributeFromTaxonomy(
				attribute.attribute
			);

			if ( ! attributeObject ) {
				if ( isLoading ) {
					setIsLoading( false );
				}
				return null;
			}

			return (
				<ActiveAttributeFilters
					attributeObject={ attributeObject }
					displayStyle={ props.displayStyle }
					slugs={ attribute.slug }
					key={ attribute.attribute }
					operator={ attribute.operator }
					isLoadingCallback={ setIsLoading }
				/>
			);
		} );
	}, [
		productAttributes,
		componentHasMounted,
		STORE_ATTRIBUTES,
		isLoading,
		props.displayStyle,
	] );

	/**
	 * Parse the filter URL to set the active rating fitlers.
	 * This code should be moved to Rating Filter block once it's implemented.
	 */
	useEffect( () => {
		if ( ! filteringForPhpTemplate ) {
			return;
		}

		if ( productRatings.length && productRatings.length > 0 ) {
			return;
		}

		const currentRatings = getUrlParameter( 'rating_filter' )?.toString();

		if ( ! currentRatings ) {
			return;
		}

		setProductRatings( currentRatings.split( ',' ) );
	}, [ filteringForPhpTemplate, productRatings, setProductRatings ] );

	const activeRatingFilters = useMemo( () => {
		if (
			shouldShowLoadingPlaceholders ||
			productRatings.length === 0 ||
			! isRatingQueryCollection( productRatings )
		) {
			return null;
		}

		const ratingLabel = __( 'Rating', 'woo-gutenberg-products-block' );

		return (
			<li>
				<span className="wc-block-active-filters__list-item-type">
					{ ratingLabel }:
				</span>
				<ul>
					{ productRatings.map( ( slug ) => {
						return renderRemovableListItem( {
							type: ratingLabel,
							name: sprintf(
								/* translators: %s is referring to the average rating value */
								__(
									'Rated %s out of 5',
									'woo-gutenberg-products-block'
								),
								slug
							),
							removeCallback: () => {
								removeArgsFromFilterUrl( {
									rating_filter: slug,
								} );
								if ( ! filteringForPhpTemplate ) {
									const newRatings = productRatings.filter(
										( rating ) => {
											return rating !== slug;
										}
									);
									setProductRatings( newRatings );
								}
							},
							showLabel: false,
							displayStyle: props.displayStyle,
						} );
					} ) }
				</ul>
			</li>
		);
	}, [
		shouldShowLoadingPlaceholders,
		productRatings,
		setProductRatings,
		props.displayStyle,
		filteringForPhpTemplate,
	] );

	const hasFilters = () => {
		return (
			productAttributes.length > 0 ||
			productStockStatus.length > 0 ||
			productRatings.length > 0 ||
			Number.isFinite( minPrice ) ||
			Number.isFinite( maxPrice )
		);
	};

	if (
		! shouldShowLoadingPlaceholders &&
		! hasFilters() &&
		! props.isEditor
	) {
		setWrapperVisibility( false );
		return null;
	}

	const TagName = `h${ props.headingLevel }` as keyof JSX.IntrinsicElements;
	/**
	 * had to change the name from "heading" to "title" as
	 * heading was being duplicated
	 * if you have any suggestion for an alternative
	 * or if you want to name it something else
	 * please mention
	 */
	const title = (
		<TagName className="wc-block-active-filters__title">
			{ props.heading }
		</TagName>
	);

	const filterHeading = shouldShowLoadingPlaceholders ? (
		<FilterTitlePlaceholder>{ title }</FilterTitlePlaceholder>
	) : (
		title
	);

	const hasFilterableProducts = getSettingWithCoercion(
		'has_filterable_products',
		false,
		isBoolean
	);

	if ( ! hasFilterableProducts ) {
		setWrapperVisibility( false );
		return null;
	}

	setWrapperVisibility( true );

	const listClasses = classnames( 'wc-block-active-filters__list', {
		'wc-block-active-filters__list--chips': props.displayStyle === 'chips',
		'wc-block-active-filters--loading': shouldShowLoadingPlaceholders,
	} );

	return (
		<>
			{ ! props.isEditor && props.heading && filterHeading }
			<div className="wc-block-active-filters">
				<ul className={ listClasses }>
					{ props.isEditor ? (
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
								displayStyle: props.displayStyle,
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
								displayStyle: props.displayStyle,
							} ) }
						</>
					) : (
						<>
							<FilterPlaceholders
								isLoading={ shouldShowLoadingPlaceholders }
								displayStyle={ props.displayStyle }
							/>
							{ activePriceFilters }
							{ activeStockStatusFilters }
							{ activeAttributeFilters }
							{ activeRatingFilters }
						</>
					) }
				</ul>
				{ shouldShowLoadingPlaceholders ? (
					<span className="wc-block-active-filters__clear-all-placeholder" />
				) : (
					<button
						className="wc-block-active-filters__clear-all"
						onClick={ () => {
							cleanFilterUrl();
							if ( ! filteringForPhpTemplate ) {
								setMinPrice( undefined );
								setMaxPrice( undefined );
								setProductAttributes( [] );
								setProductStockStatus( [] );
								setProductRatings( [] );
							}
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
				) }
			</div>
		</>
	);
};

export default ActiveFiltersBlock;
