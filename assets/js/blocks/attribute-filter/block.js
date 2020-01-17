/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { speak } from '@wordpress/a11y';
import {
	useCollection,
	useQueryStateByKey,
	useQueryStateByContext,
	useCollectionData,
	useShallowEqual,
} from '@woocommerce/base-hooks';
import {
	useCallback,
	Fragment,
	useEffect,
	useState,
	useMemo,
} from '@wordpress/element';
import CheckboxList from '@woocommerce/base-components/checkbox-list';
import DropdownSelector from '@woocommerce/base-components/dropdown-selector';
import FilterSubmitButton from '@woocommerce/base-components/filter-submit-button';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import { getAttributeFromID } from '../../utils/attributes';
import { updateAttributeFilter } from '../../utils/attributes-query';
import Label from './label';
import { previewAttributeObject, previewOptions } from './preview';
import './style.scss';

/**
 * Component displaying an attribute filter.
 */
const AttributeFilterBlock = ( {
	attributes: blockAttributes,
	isEditor = false,
} ) => {
	const attributeObject =
		blockAttributes.isPreview && ! blockAttributes.attributeId
			? previewAttributeObject
			: getAttributeFromID( blockAttributes.attributeId );

	const [ checked, setChecked ] = useState( [] );
	const [ displayedOptions, setDisplayedOptions ] = useState(
		blockAttributes.isPreview && ! blockAttributes.attributeId
			? previewOptions
			: []
	);

	const [ queryState ] = useQueryStateByContext();
	const [
		productAttributesQuery,
		setProductAttributesQuery,
	] = useQueryStateByKey( 'attributes', [] );

	const {
		results: attributeTerms,
		isLoading: attributeTermsLoading,
	} = useCollection( {
		namespace: '/wc/store',
		resourceName: 'products/attributes/terms',
		resourceValues: [ attributeObject.id ],
		shouldSelect: blockAttributes.attributeId > 0,
	} );

	const filterAvailableTerms =
		blockAttributes.displayStyle !== 'dropdown' &&
		blockAttributes.queryType === 'and';
	const {
		results: filteredCounts,
		isLoading: filteredCountsLoading,
	} = useCollectionData( {
		queryAttribute: {
			taxonomy: attributeObject.taxonomy,
			queryType: blockAttributes.queryType,
		},
		queryState: {
			...queryState,
			attributes: filterAvailableTerms ? queryState.attributes : null,
		},
	} );

	/**
	 * Get count data about a given term by ID.
	 */
	const getFilteredTerm = useCallback(
		( id ) => {
			if ( ! filteredCounts.attribute_counts ) {
				return null;
			}
			return filteredCounts.attribute_counts.find(
				( { term } ) => term === id
			);
		},
		[ filteredCounts ]
	);

	/**
	 * Compare intersection of all terms and filtered counts to get a list of options to display.
	 */
	useEffect( () => {
		/**
		 * Checks if a term slug is in the query state.
		 *
		 * @param {string} termSlug The term of the slug to check.
		 */
		const isTermInQueryState = ( termSlug ) => {
			if ( ! queryState || ! queryState.attributes ) {
				return false;
			}
			return queryState.attributes.some(
				( { attribute, slug = [] } ) =>
					attribute === attributeObject.taxonomy &&
					slug.includes( termSlug )
			);
		};

		if ( attributeTermsLoading || filteredCountsLoading ) {
			return;
		}

		const newOptions = attributeTerms
			.map( ( term ) => {
				const filteredTerm = getFilteredTerm( term.id );

				// If there is no match this term doesn't match the current product collection - only render if checked.
				if (
					! filteredTerm &&
					! checked.includes( term.slug ) &&
					! isTermInQueryState( term.slug )
				) {
					return null;
				}

				const count = filteredTerm ? filteredTerm.count : 0;

				return {
					value: term.slug,
					name: decodeEntities( term.name ),
					label: (
						<Label
							name={ decodeEntities( term.name ) }
							count={ blockAttributes.showCounts ? count : null }
						/>
					),
				};
			} )
			.filter( Boolean );

		setDisplayedOptions( newOptions );
	}, [
		attributeObject.taxonomy,
		attributeTerms,
		attributeTermsLoading,
		blockAttributes.showCounts,
		filteredCountsLoading,
		getFilteredTerm,
		checked,
		queryState.attributes,
	] );

	// Track checked STATE changes - if state changes, update the query.
	useEffect(
		() => {
			if ( ! blockAttributes.showFilterButton ) {
				onSubmit();
			}
		},
		// There is no need to add blockAttributes.showFilterButton as a dependency.
		// It will only change in the editor and there we don't need to call onSubmit in any case.
		[ checked, onSubmit ]
	);

	const checkedQuery = useMemo( () => {
		return productAttributesQuery
			.filter(
				( { attribute } ) => attribute === attributeObject.taxonomy
			)
			.flatMap( ( { slug } ) => slug );
	}, [ productAttributesQuery, attributeObject.taxonomy ] );

	const currentCheckedQuery = useShallowEqual( checkedQuery );

	// Track ATTRIBUTES QUERY changes so the block reflects current filters.
	useEffect(
		() => {
			if ( ! isShallowEqual( checked, checkedQuery ) ) {
				setChecked( checkedQuery );
			}
		},
		// We only want to apply this effect when the query changes, so we are intentionally leaving `checked` out of the dependencies.
		[ currentCheckedQuery ]
	);

	/**
	 * Returns an array of term objects that have been chosen via the checkboxes.
	 */
	const getSelectedTerms = useCallback(
		( newChecked ) => {
			return attributeTerms.reduce( ( acc, term ) => {
				if ( newChecked.includes( term.slug ) ) {
					acc.push( term );
				}
				return acc;
			}, [] );
		},
		[ attributeTerms ]
	);

	const onSubmit = () => {
		if ( isEditor ) {
			return;
		}

		updateAttributeFilter(
			productAttributesQuery,
			setProductAttributesQuery,
			attributeObject,
			getSelectedTerms( checked ),
			blockAttributes.queryType === 'or' ? 'in' : 'and'
		);
	};

	const multiple =
		blockAttributes.displayStyle !== 'dropdown' ||
		blockAttributes.queryType === 'or';

	/**
	 * When a checkbox in the list changes, update state.
	 */
	const onChange = useCallback(
		( checkedValue ) => {
			const getFilterNameFromValue = ( filterValue ) => {
				const { name } = displayedOptions.find(
					( option ) => option.value === filterValue
				);

				return name;
			};

			const announceFilterChange = ( { filterAdded, filterRemoved } ) => {
				const filterAddedName = filterAdded
					? getFilterNameFromValue( filterAdded )
					: null;
				const filterRemovedName = filterRemoved
					? getFilterNameFromValue( filterRemoved )
					: null;
				if ( filterAddedName && filterRemovedName ) {
					speak(
						sprintf(
							__(
								// translators: %s attribute terms (for example: 'red', 'blue', 'large'...)
								'%s filter replaced with %s.',
								'woo-gutenberg-products-block'
							),
							filterAddedName,
							filterRemovedName
						)
					);
				} else if ( filterAddedName ) {
					speak(
						sprintf(
							// translators: %s attribute term (for example: 'red', 'blue', 'large'...)
							__(
								'%s filter added.',
								'woo-gutenberg-products-block'
							),
							filterAddedName
						)
					);
				} else if ( filterRemovedName ) {
					speak(
						sprintf(
							// translators: %s attribute term (for example: 'red', 'blue', 'large'...)
							__(
								'%s filter removed.',
								'woo-gutenberg-products-block'
							),
							filterRemovedName
						)
					);
				}
			};

			const previouslyChecked = checked.includes( checkedValue );
			let newChecked;

			if ( ! multiple ) {
				newChecked = previouslyChecked ? [] : [ checkedValue ];
				const filterAdded = previouslyChecked ? null : checkedValue;
				const filterRemoved =
					checked.length === 1 ? checked[ 0 ] : null;
				announceFilterChange( { filterAdded, filterRemoved } );
			} else {
				newChecked = checked.filter(
					( value ) => value !== checkedValue
				);

				if ( ! previouslyChecked ) {
					newChecked.push( checkedValue );
					newChecked.sort();
					announceFilterChange( { filterAdded: checkedValue } );
				} else {
					announceFilterChange( { filterRemoved: checkedValue } );
				}
			}

			setChecked( newChecked );
		},
		[ checked, displayedOptions, multiple ]
	);

	if ( displayedOptions.length === 0 && ! attributeTermsLoading ) {
		return null;
	}

	const TagName = `h${ blockAttributes.headingLevel }`;
	const isLoading = ! blockAttributes.isPreview && attributeTermsLoading;
	const isDisabled = ! blockAttributes.isPreview && filteredCountsLoading;

	return (
		<Fragment>
			{ ! isEditor && blockAttributes.heading && (
				<TagName>{ blockAttributes.heading }</TagName>
			) }
			<div className="wc-block-attribute-filter">
				{ blockAttributes.displayStyle === 'dropdown' ? (
					<DropdownSelector
						attributeLabel={ attributeObject.label }
						checked={ checked }
						className={ 'wc-block-attribute-filter-dropdown' }
						inputLabel={ blockAttributes.heading }
						isLoading={ isLoading }
						multiple={ multiple }
						onChange={ onChange }
						options={ displayedOptions }
					/>
				) : (
					<CheckboxList
						className={ 'wc-block-attribute-filter-list' }
						options={ displayedOptions }
						checked={ checked }
						onChange={ onChange }
						isLoading={ isLoading }
						isDisabled={ isDisabled }
					/>
				) }
				{ blockAttributes.showFilterButton && (
					<FilterSubmitButton
						className="wc-block-attribute-filter__button"
						disabled={ isLoading || isDisabled }
						onClick={ onSubmit }
					/>
				) }
			</div>
		</Fragment>
	);
};

export default AttributeFilterBlock;
