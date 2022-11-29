/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { speak } from '@wordpress/a11y';
import { Icon, chevronDown } from '@wordpress/icons';
import Rating from '@woocommerce/base-components/product-rating';
import {
	usePrevious,
	useShallowEqual,
	useBorderProps,
} from '@woocommerce/base-hooks';
import {
	useQueryStateByKey,
	useQueryStateByContext,
	useCollectionData,
} from '@woocommerce/base-context/hooks';
import { getSettingWithCoercion } from '@woocommerce/settings';
import { isBoolean, isObject, objectHasProp } from '@woocommerce/types';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { useState, useCallback, useMemo, useEffect } from '@wordpress/element';
import CheckboxList from '@woocommerce/base-components/checkbox-list';
import FilterSubmitButton from '@woocommerce/base-components/filter-submit-button';
import FilterResetButton from '@woocommerce/base-components/filter-reset-button';
import FormTokenField from '@woocommerce/base-components/form-token-field';
import { addQueryArgs, removeQueryArgs } from '@wordpress/url';
import { changeUrl } from '@woocommerce/utils';
import classnames from 'classnames';
import { difference } from 'lodash';

/**
 * Internal dependencies
 */
import { previewOptions } from './preview';
import './style.scss';
import { Attributes } from './types';
import { formatSlug, getActiveFilters, generateUniqueId } from './utils';
import { useSetWraperVisibility } from '../filter-wrapper/context';

export const QUERY_PARAM_KEY = 'rating_filter';

// TODO: mocked multiple, extend the config
const multiple = true;

/**
 * Component displaying a rating filter.
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
	const setWrapperVisibility = useSetWraperVisibility();

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

	const [ displayedOptions, setDisplayedOptions ] = useState(
		blockAttributes.isPreview ? previewOptions : []
	);

	const isLoading =
		! blockAttributes.isPreview &&
		filteredCountsLoading &&
		displayedOptions.length === 0;

	const isDisabled = ! blockAttributes.isPreview && filteredCountsLoading;

	const initialFilters = useMemo(
		() => getActiveFilters( 'rating_filter' ),
		[]
	);

	const [ checked, setChecked ] = useState( initialFilters );

	const [ productRatings, setProductRatings ] =
		useQueryStateByKey( 'rating' );

	const [ productRatingsQuery, setProductRatingsQuery ] = useQueryStateByKey(
		'rating',
		initialFilters
	);

	/*
		FormTokenField forces the dropdown to reopen on reset, so we create a unique ID to use as the components key.
		This will force the component to remount on reset when we change this value.
		More info: https://github.com/woocommerce/woocommerce-blocks/pull/6920#issuecomment-1222402482
	 */
	const [ remountKey, setRemountKey ] = useState( generateUniqueId() );

	const borderProps = useBorderProps( blockAttributes );

	/**
	 * Used to redirect the page when filters are changed so templates using the Classic Template block can filter.
	 *
	 * @param {Array} checkedRatings Array of checked ratings.
	 */
	const updateFilterUrl = ( checkedRatings: string[] ) => {
		if ( ! window ) {
			return;
		}

		if ( checkedRatings.length === 0 ) {
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
			[ QUERY_PARAM_KEY ]: checkedRatings.join( ',' ),
		} );

		if ( newUrl === window.location.href ) {
			return;
		}

		changeUrl( newUrl );
	};

	/**
	 * When a checkbox in the list changes, update state.
	 */

	// TODO handle updateCheckedFilters function
	const onChange = useCallback(
		( checkedValue ) => {
			const previouslyChecked = checked.includes( checkedValue );
			let newChecked;

			if ( ! multiple ) {
				newChecked = previouslyChecked ? [] : [ checkedValue ];
			} else {
				newChecked = checked.filter(
					( value ) => value !== checkedValue
				);

				if ( ! previouslyChecked ) {
					newChecked.push( checkedValue );
					newChecked.sort();
				}
			}

			// updateCheckedFilters( newChecked );
		},
		[ checked, multiple ]
	);

	const onSubmit = useCallback(
		( checkedOptions ) => {
			if ( isEditor ) {
				return;
			}
			if ( checkedOptions && ! filteringForPhpTemplate ) {
				setProductRatingsQuery( checkedOptions );
			}

			updateFilterUrl( checkedOptions );
		},
		[ isEditor, setProductRatingsQuery, filteringForPhpTemplate ]
	);

	// Track checked STATE changes - if state changes, update the query.
	useEffect( () => {
		if ( ! blockAttributes.showFilterButton ) {
			onSubmit( checked );
		}
	}, [ blockAttributes.showFilterButton, checked, onSubmit ] );

	const checkedQuery = useMemo( () => {
		return productRatingsQuery;
	}, [ productRatingsQuery ] );

	const currentCheckedQuery = useShallowEqual( checkedQuery );
	const previousCheckedQuery = usePrevious( currentCheckedQuery );
	// Track Rating query changes so the block reflects current filters.
	useEffect( () => {
		if (
			! isShallowEqual( previousCheckedQuery, currentCheckedQuery ) && // Checked query changed.
			! isShallowEqual( checked, currentCheckedQuery ) // Checked query doesn't match the UI.
		) {
			setChecked( currentCheckedQuery );
		}
	}, [ checked, currentCheckedQuery, previousCheckedQuery ] );

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
	 * Compare intersection of all ratings and filtered counts to get a list of options to display.
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

		const newOptions = orderedRatings
			.filter(
				( item ) => isObject( item ) && Object.keys( item ).length > 0
			)
			.map( ( item ) => {
				return {
					label: (
						<Rating
							className={
								Array.from( productRatings ).includes(
									item?.rating?.toString()
								)
									? 'is-active'
									: ''
							}
							key={ item?.rating }
							rating={ item?.rating }
							ratedProductsCount={
								blockAttributes.showCounts ? item?.count : null
							}
						/>
					),
					value: item?.rating?.toString(),
				};
			} );

		setDisplayedOptions( newOptions );
		setRemountKey( generateUniqueId() );
	}, [
		blockAttributes.showCounts,
		blockAttributes.isPreview,
		filteredCounts,
		filteredCountsLoading,
		productRatings,
	] );

	/**
	 * When a checkbox in the list changes, update state.
	 */
	const onClick = useCallback(
		( checkedValue: string ) => {
			const previouslyChecked = checked.includes( checkedValue );

			const newChecked = checked.filter(
				( value ) => value !== checkedValue
			);

			if ( ! previouslyChecked ) {
				newChecked.push( checkedValue );
				newChecked.sort();
				speak(
					sprintf(
						/* translators: %s is referring to the average rating value */
						__(
							'Rated %s out of 5 filter added.',
							'woo-gutenberg-products-block'
						),
						checkedValue
					)
				);
			} else {
				speak(
					sprintf(
						/* translators: %s is referring to the average rating value */
						__(
							'Rated %s out of 5 filter removed.',
							'woo-gutenberg-products-block'
						),
						checkedValue
					)
				);
			}
			setChecked( newChecked );
		},
		[ checked ]
	);

	if ( ! filteredCountsLoading && displayedOptions.length === 0 ) {
		setWrapperVisibility( false );
		return null;
	}

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

	return (
		<>
			<div
				className={ classnames(
					'wc-block-rating-filter',
					`style-${ blockAttributes.displayStyle }`,
					{
						'is-loading': isLoading,
					}
				) }
			>
				{ blockAttributes.displayStyle === 'dropdown' ? (
					<>
						<FormTokenField
							key={ remountKey }
							className={ classnames( borderProps.className, {
								'single-selection': ! multiple,
								'is-loading': isLoading,
							} ) }
							style={ {
								...borderProps.style,
								borderStyle: 'none',
							} }
							suggestions={ displayedOptions
								.filter(
									( option ) =>
										! checked.includes( option.value )
								)
								.map( ( option ) => option.value ) }
							disabled={ isLoading }
							placeholder={
								( __(
									'Select rating',
									'woo-gutenberg-products-block'
								),
								'Select rating' )
							}
							onChange={ ( tokens: string[] ) => {
								if ( ! multiple && tokens.length > 1 ) {
									tokens = [ tokens[ tokens.length - 1 ] ];
								}

								tokens = tokens.map( ( token ) => {
									const displayOption = displayedOptions.find(
										( option ) => option.value === token
									);

									return displayOption
										? displayOption.value
										: token;
								} );

								const added = difference( tokens, checked );

								if ( added.length === 1 ) {
									return onChange( added[ 0 ] );
								}

								const removed = difference( checked, tokens );
								if ( removed.length === 1 ) {
									onChange( removed[ 0 ] );
								}
							} }
							value={ checked }
							displayTransform={ ( value: string ) => {
								// const result = displayedOptions.find(
								// 	( option ) =>
								// 		[
								// 			option.value,
								// 			option.formattedValue,
								// 		].includes( value )
								// );
								return value;
							} }
							saveTransform={ formatSlug }
							messages={ {
								added: sprintf(
									/* translators: %s is the attribute label. */
									__(
										'%s filter added.',
										'woo-gutenberg-products-block'
									),
									'Rating'
								),
								removed: sprintf(
									/* translators: %s is the attribute label. */
									__(
										'%s filter removed.',
										'woo-gutenberg-products-block'
									),
									'Rating'
								),
								remove: sprintf(
									/* translators: %s is the attribute label. */
									__(
										'Remove %s filter.',
										'woo-gutenberg-products-block'
									),
									'rating'
								),
								__experimentalInvalid: sprintf(
									/* translators: %s is the attribute label. */
									__(
										'Invalid %s filter.',
										'woo-gutenberg-products-block'
									),
									'rating'
								),
							} }
						/>
						{ multiple && (
							<Icon icon={ chevronDown } size={ 30 } />
						) }
					</>
				) : (
					<CheckboxList
						className={ 'wc-block-rating-filter-list' }
						options={ displayedOptions }
						checked={ checked }
						onChange={ ( item ) => {
							onClick( item.toString() );
						} }
						isLoading={ isLoading }
						isDisabled={ isDisabled }
					/>
				) }
			</div>
			{
				<div className="wc-block-rating-filter__actions">
					{ checked.length > 0 && ! isLoading && (
						<FilterResetButton
							onClick={ () => {
								setChecked( [] );
								setProductRatings( [] );
								onSubmit( [] );
							} }
							screenReaderLabel={ __(
								'Reset rating filter',
								'woo-gutenberg-products-block'
							) }
						/>
					) }
					{ blockAttributes.showFilterButton && (
						<FilterSubmitButton
							className="wc-block-rating-filter__button"
							isLoading={ isLoading }
							disabled={ isLoading || isDisabled }
							onClick={ () => onSubmit( checked ) }
						/>
					) }
				</div>
			}
		</>
	);
};

export default RatingFilterBlock;
