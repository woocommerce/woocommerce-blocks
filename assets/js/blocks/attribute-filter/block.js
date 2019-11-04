/**
 * External dependencies
 */
import { useCollection, useQueryStateContext } from '@woocommerce/base-hooks';
import { useCallback, Fragment, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';
import CheckboxList from '@woocommerce/base-components/checkbox-list';

/**
 * Component displaying an attribute filter.
 */
const AttributeFilterBlock = ( { attributes } ) => {
	const { showCounts, attributeId } = attributes;

	const [ queryState ] = useQueryStateContext( 'product-grid' );

	const { results: allTerms, isLoading: allTermsIsLoading } = useCollection( {
		namespace: '/wc/blocks',
		resourceName: 'products/attributes/(?P<attribute_id>[\\d]+)/terms',
		resourceValues: [ attributeId ],
	} );

	const {
		results: filteredCounts,
		isLoading: filteredCountsIsLoading,
	} = useCollection( {
		namespace: '/wc/store',
		resourceName: 'products/collection-data',
		query: {
			...queryState,
			orderby: undefined,
			order: undefined,
			per_page: undefined,
			page: undefined,
			calculate_attribute_counts: [ attributeId ],
		},
	} );

	const getLabel = useCallback(
		( name, count ) => {
			return (
				<Fragment>
					{ name }
					{ showCounts && count && (
						<span className="wc-block-attribute-filter-list-count">
							{ count }
						</span>
					) }
				</Fragment>
			);
		},
		[ showCounts ]
	);

	const getFilteredTerm = useCallback(
		( id ) => {
			if ( ! filteredCounts.attribute_counts ) {
				return {};
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
	const getOptions = useMemo( () => {
		const options = [];

		allTerms.forEach( ( term ) => {
			const filteredTerm = getFilteredTerm( term.id );

			if ( ! filteredTerm && null !== filteredCounts ) {
				return;
			}

			options.push( {
				key: term.slug,
				label: getLabel(
					term.name,
					filteredTerm ? filteredTerm.count : term.count
				),
				checked: false,
			} );
		} );

		return options;
	}, [ filteredCounts, allTerms, showCounts ] );

	const onChange = useCallback( () => {}, [] );

	return (
		<div className="wc-block-attribute-filter">
			<CheckboxList
				className={ 'wc-block-attribute-filter-list' }
				options={ getOptions }
				onChange={ onChange }
				isLoading={ filteredCountsIsLoading || allTermsIsLoading }
			/>
		</div>
	);
};

export default AttributeFilterBlock;
