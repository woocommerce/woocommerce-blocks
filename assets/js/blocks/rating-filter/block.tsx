/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import Rating from '@woocommerce/base-components/product-rating';
import { usePrevious, useShallowEqual } from '@woocommerce/base-hooks';
import {
	useQueryStateByKey,
	useQueryStateByContext,
	useCollectionData,
} from '@woocommerce/base-context/hooks';
import { getSettingWithCoercion } from '@woocommerce/settings';
import { isBoolean, isObject, objectHasProp } from '@woocommerce/types';
import FilterTitlePlaceholder from '@woocommerce/base-components/filter-placeholder';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { useState, useCallback, useMemo, useEffect } from '@wordpress/element';
import CheckboxList from '@woocommerce/base-components/checkbox-list';
import FilterSubmitButton from '@woocommerce/base-components/filter-submit-button';
import FilterResetButton from '@woocommerce/base-components/filter-reset-button';
import { addQueryArgs, removeQueryArgs } from '@wordpress/url';
import { changeUrl } from '@woocommerce/utils';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { previewOptions } from './preview';
import './style.scss';
import { Attributes } from './types';
import { getActiveFilters } from './utils';

export const QUERY_PARAM_KEY = 'rating_filter';

/**
 * Component displaying an stock status filter.
 *
 * @param {Object}  props            Incoming props for the component.
 * @param {Object}  props.attributes Incoming block attributes.
 * @param {boolean} props.isEditor
 */
const RatingFilterBlock = ( {
	attributes: blockAttributes,
	isEditor = false,
}: {
	attributes: Attributes;
	isEditor?: boolean;
} ) => {
	const filteringForPhpTemplate = getSettingWithCoercion(
		'is_rendering_php_template',
		false,
		isBoolean
	);
	const [ hasSetFilterDefaultsFromUrl, setHasSetFilterDefaultsFromUrl ] =
		useState( false );

	const [ queryState ] = useQueryStateByContext();

	const { results: filteredCounts, isLoading: filteredCountsLoading } =
		useCollectionData( {
			queryRating: true,
			queryState,
		} );

	const TagName =
		`h${ blockAttributes.headingLevel }` as keyof JSX.IntrinsicElements;
	const isLoading = ! blockAttributes.isPreview && filteredCountsLoading;
	const isDisabled = ! blockAttributes.isPreview && filteredCountsLoading;

	const initialFilters = useMemo(
		() => getActiveFilters( 'rating_filter' ),
		[]
	);

	const [ clicked, setClicked ] = useState( initialFilters );

	const [ productRatings, setProductRatings ] =
		useQueryStateByKey( 'rating' );

	const [ productRatingsQuery, setProductRatingsQuery ] = useQueryStateByKey(
		'rating',
		initialFilters
	);

	const [ checklistOptions, setChecklistOptions ] = useState(
		blockAttributes.isPreview ? previewOptions : []
	);

	// Filter added to handle if there are slugs without a corresponding name defined.
	const [ initialOptions ] = useState(
		Object.entries( initialFilters )
			.map( ( [ slug, name ] ) => ( { slug, name } ) )
			.filter( ( status ) => !! status.name )
			.sort( ( a, b ) => a.slug.localeCompare( b.slug ) )
	);

	const productRatingsArray: string[] = Array.from( productRatings );

	/**
	 * Used to redirect the page when filters are changed so templates using the Classic Template block can filter.
	 *
	 * @param {Array} clickedRatings Array of clicked ratings.
	 */
	const updateFilterUrl = ( clickedRatings: string[] ) => {
		if ( ! window ) {
			return;
		}

		if ( clickedRatings.length === 0 ) {
			const url = removeQueryArgs(
				window.location.href,
				QUERY_PARAM_KEY
			);

			if ( url !== window.location.href ) {
				changeUrl( url );
			}

			return;
		}

		const newUrl = addQueryArgs( window.location.href, {
			[ QUERY_PARAM_KEY ]: clickedRatings.join( ',' ),
		} );

		if ( newUrl === window.location.href ) {
			return;
		}

		changeUrl( newUrl );
	};

	const onSubmit = useCallback(
		( clickedOptions ) => {
			if ( isEditor ) {
				return;
			}
			if ( clickedOptions && ! filteringForPhpTemplate ) {
				setProductRatingsQuery( clickedOptions );
			}

			updateFilterUrl( clickedOptions );
		},
		[ isEditor, setProductRatingsQuery, filteringForPhpTemplate ]
	);

	// Track clicked STATE changes - if state changes, update the query.
	useEffect( () => {
		if ( ! blockAttributes.showFilterButton ) {
			onSubmit( clicked );
		}
	}, [ blockAttributes.showFilterButton, clicked, onSubmit ] );

	const clickedQuery = useMemo( () => {
		return productRatingsQuery;
	}, [ productRatingsQuery ] );

	const currentClickedQuery = useShallowEqual( clickedQuery );
	const previousClickedQuery = usePrevious( currentClickedQuery );
	// Track Rating query changes so the block reflects current filters.
	useEffect( () => {
		if (
			! isShallowEqual( previousClickedQuery, currentClickedQuery ) && // Clicked query changed.
			! isShallowEqual( clicked, currentClickedQuery ) // Clicked query doesn't match the UI.
		) {
			setClicked( currentClickedQuery );
		}
	}, [ clicked, currentClickedQuery, previousClickedQuery ] );

	/**
	 * Try get the rating filter from the URL.
	 */
	useEffect( () => {
		if ( ! hasSetFilterDefaultsFromUrl ) {
			setProductRatings( initialFilters );
			setHasSetFilterDefaultsFromUrl( true );
		}
	}, [
		setProductRatings,
		hasSetFilterDefaultsFromUrl,
		setHasSetFilterDefaultsFromUrl,
		initialFilters,
	] );

	/**
	 * Compare intersection of all stock statuses and filtered counts to get a list of options to display.
	 */
	useEffect( () => {
		/**
		 * Checks if a status slug is in the query state.
		 *
		 * @param {string} queryStatus The status slug to check.
		 */

		if ( filteredCountsLoading || blockAttributes.isPreview ) {
			return;
		}
		const orderedRatings =
			! filteredCountsLoading &&
			objectHasProp( filteredCounts, 'rating_counts' ) &&
			Array.isArray( filteredCounts.rating_counts )
				? [ ...filteredCounts.rating_counts ].reverse()
				: [];

		const displayedOptions = orderedRatings
			.filter(
				( item ) => isObject( item ) && Object.keys( item ).length > 0
			)
			.map(
				( item ) => {
					return {
						label: (
							<Rating
								className={
									productRatingsArray.includes(
										item?.rating?.toString()
									)
										? 'is-active'
										: ''
								}
								key={ item?.rating }
								rating={ item?.rating }
								ratedProductsCount={
									blockAttributes.showCounts
										? item?.count
										: null
								}
							/>
						),
						value: item?.rating?.toString(),
					};
				},
				[ blockAttributes.showCounts ]
			);

		setChecklistOptions( displayedOptions );
	}, [
		blockAttributes.showCounts,
		blockAttributes.isPreview,
		filteredCountsLoading,
		initialOptions,
	] );

	/**
	 * When a checkbox in the list changes, update state.
	 */
	const onClick = useCallback(
		( clickedValue: string ) => {
			const previouslyClicked = clicked.includes( clickedValue );

			const newClicked = clicked.filter(
				( value ) => value !== clickedValue
			);

			if ( ! previouslyClicked ) {
				newClicked.push( clickedValue );
				newClicked.sort();
			}
			setClicked( newClicked );
		},
		[ clicked, checklistOptions ]
	);

	if ( ! filteredCountsLoading && checklistOptions.length === 0 ) {
		return null;
	}

	const heading = (
		<TagName className="wc-block-rating-filter__title">
			{ blockAttributes.heading }
		</TagName>
	);

	const filterHeading = isLoading ? (
		<FilterTitlePlaceholder>{ heading }</FilterTitlePlaceholder>
	) : (
		heading
	);

	return (
		<>
			{ ! isEditor && blockAttributes.heading && filterHeading }
			<div
				className={ classnames( 'wc-block-rating-filter', {
					'is-loading': isLoading,
				} ) }
			>
				<CheckboxList
					className={ 'wc-block-rating-filter-list' }
					options={ checklistOptions }
					checked={ clicked }
					onChange={ ( checked ) => {
						onClick( checked.toString() );
					} }
					isLoading={ isLoading }
					isDisabled={ isDisabled }
				/>
			</div>
			{
				<div className="wc-block-rating-filter__actions">
					{ productRatingsArray.length > 0 && ! isLoading && (
						<FilterResetButton
							onClick={ () => {
								setProductRatings( [] );
								onSubmit( [] );
							} }
							screenReaderLabel={ __(
								'Reset stock filter',
								'woo-gutenberg-products-block'
							) }
						/>
					) }
					{ blockAttributes.showFilterButton && (
						<FilterSubmitButton
							className="wc-block-rating-filter__button"
							isLoading={ isLoading }
							disabled={ isLoading || isDisabled }
							onClick={ () => onSubmit( clicked ) }
						/>
					) }
				</div>
			}
		</>
	);
};

export default RatingFilterBlock;
