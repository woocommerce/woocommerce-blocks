/**
 * External dependencies
 */
import Rating from '@woocommerce/base-components/product-rating';
import { usePrevious, useShallowEqual } from '@woocommerce/base-hooks';
import LoadingMask from '@woocommerce/base-components/loading-mask';
import {
	useQueryStateByKey,
	useQueryStateByContext,
	useCollectionData,
} from '@woocommerce/base-context/hooks';
import { getSettingWithCoercion } from '@woocommerce/settings';
import { isBoolean } from '@woocommerce/types';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { useState, useCallback, useMemo, useEffect } from '@wordpress/element';
import { addQueryArgs, removeQueryArgs } from '@wordpress/url';
import { changeUrl, PREFIX_QUERY_ARG_FILTER_TYPE } from '@woocommerce/utils';

/**
 * Internal dependencies
 */
import './style.scss';
import { Attributes } from './types';
import { getActiveFilters } from './utils';

export const QUERY_PARAM_KEY = PREFIX_QUERY_ARG_FILTER_TYPE + 'rating';

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

	console.log(PREFIX_QUERY_ARG_FILTER_TYPE + 'rating');

	const [ hasSetFilterDefaultsFromUrl, setHasSetFilterDefaultsFromUrl ] =
		useState( false );

	const TagName =
		`h${ blockAttributes.headingLevel }` as keyof JSX.IntrinsicElements;

	const [ queryState ] = useQueryStateByContext();

	const { results: filteredCounts, isLoading: filteredCountsLoading } =
		useCollectionData( {
			queryRating: true,
			queryState,
		} );

	const initialFilters = useMemo(
		() => getActiveFilters( 'filter_rating', QUERY_PARAM_KEY ),
		[]
	);

	const [ clicked, setClicked ] = useState( initialFilters );

	const [ displayedOptions, setDisplayedOptions ] = useState(
		blockAttributes.isPreview ? previewOptions : []
	);

	const [ productRatings, setProductRatings ] =
		useQueryStateByKey( 'rating' );

	const [ productRatingsQuery, setProductRatingsQuery ] = useQueryStateByKey(
		'rating',
		initialFilters
	);

	const productRatingsArray = Array.from( productRatings );

	/**
	 * Used to redirect the page when filters are changed so templates using the Classic Template block can filter.
	 *
	 * @param {Array} productRatingsArray Array of checked stock options.
	 */
	const updateFilterUrl = ( productRatingsArray: string[] ) => {
		if ( ! window ) {
			return;
		}

		if ( productRatingsArray.length === 0 ) {
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
			[ QUERY_PARAM_KEY ]: productRatingsArray.join( ',' ),
		} );

		if ( newUrl === window.location.href ) {
			return;
		}

		changeUrl( newUrl );
	};

	const onSubmit = useCallback(
		( isClicked ) => {
			if ( isEditor ) {
				return;
			}
			if ( isClicked && ! filteringForPhpTemplate ) {
				setProductRatingsQuery( clicked );
			}

			updateFilterUrl( clicked );
		},
		[ isEditor, setProductRatingsQuery, clicked, filteringForPhpTemplate ]
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
	// Track Stock query changes so the block reflects current filters.
	useEffect( () => {
		if (
			! isShallowEqual( previousClickedQuery, currentClickedQuery ) && // Clicked query changed.
			! isShallowEqual( clicked, currentClickedQuery ) // Clicked query doesn't match the UI.
		) {
			setClicked( currentClickedQuery );
		}
	}, [ clicked, currentClickedQuery, previousClickedQuery ] );

	/**
	 * Try get the stock filter from the URL.
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

	const onClick = ( clickedValue ) => () => {
		if ( ! productRatingsArray.length ) {
			setProductRatings( [ clickedValue ] );
		} else {
			const previouslyClicked =
				productRatingsArray.includes( clickedValue );
			const newClicked = productRatingsArray.filter(
				( value ) => value !== clickedValue
			);
			if ( ! previouslyClicked ) {
				newClicked.push( clickedValue );
				newClicked.sort();
			}
			setProductRatings( newClicked );
		}
	};

	if ( filteredCounts.rating_counts != undefined ) {
		const orderedRatings = [ ...filteredCounts.rating_counts ].reverse();
		return (
			<>
				{ ! isEditor && blockAttributes.heading && (
					<TagName className="wc-block-rating-filter__title">
						{ blockAttributes.heading }
					</TagName>
				) }
				{ orderedRatings.map( ( item ) => (
					<Rating
						className={
							productRatingsArray.includes(
								item.rating.toString()
							)
								? 'is-active'
								: null
						}
						key={ item.rating }
						rating={ item.rating }
						ratedProductsCount={ item.count }
						onClick={ onClick( item.rating.toString() ) }
						options={ displayedOptions }
					/>
				) ) }
				{ blockAttributes.showFilterButton && (
					<FilterSubmitButton
						className="wc-block-stock-filter__button"
						disabled={ isLoading || isDisabled }
						onClick={ () => onSubmit( checked ) }
					/>
				) }
			</>
		);
	}
	return <LoadingMask showSpinner={ true } />;
};

export default RatingFilterBlock;
