/**
 * External dependencies
 */
import {
	useCollection,
	useQueryStateByKey,
	useQueryStateContext,
} from '@woocommerce/base-hooks';
import {
	useCallback,
	Fragment,
	useEffect,
	useState,
	useMemo,
} from '@wordpress/element';
import { find, sortBy } from 'lodash';
import CheckboxList from '@woocommerce/base-components/checkbox-list';
import { ATTRIBUTES } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Component displaying an attribute filter.
 */
const AttributeFilterBlock = ( { attributes } ) => {
	const [ options, setOptions ] = useState( [] );
	const [ checkedOptions, setCheckedOptions ] = useState( [] );

	const { showCounts, attributeId, queryType } = attributes;
	const productAttribute = find( ATTRIBUTES, [
		'attribute_id',
		attributeId.toString(),
	] );
	const taxonomy = productAttribute.attribute_name
		? 'pa_' + productAttribute.attribute_name
		: null;

	const [ productAttributes, setProductAttributes ] = useQueryStateByKey(
		'product-grid',
		'attributes',
		[]
	);
	const [ queryState ] = useQueryStateContext( 'product-grid' );

	const countsQueryState = useMemo( () => {
		if ( ! taxonomy ) {
			return {};
		}
		// If doing an "AND" query, we need to remove current taxonomy query so counts are not affected.
		const modifiedQueryState =
			'and' === queryType
				? productAttributes.filter(
						( item ) => item.attribute !== taxonomy
				  )
				: productAttributes;

		// Take current query and remove paging args.
		return {
			...queryState,
			orderby: undefined,
			order: undefined,
			per_page: undefined,
			page: undefined,
			attributes: modifiedQueryState,
			calculate_attribute_counts: [ taxonomy ],
		};
	}, [ queryState, taxonomy, queryType, productAttributes ] );

	const { results: allTerms, isLoading: allTermsIsLoading } = useCollection( {
		namespace: '/wc/blocks',
		resourceName: 'products/attributes/terms',
		resourceValues: [ attributeId ],
		query: { per_page: 100 },
	} );

	const {
		results: filteredCounts,
		isLoading: filteredCountsIsLoading,
	} = useCollection( {
		namespace: '/wc/store',
		resourceName: 'products/collection-data',
		query: {
			...countsQueryState,
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
	useEffect( () => {
		if ( filteredCountsIsLoading || allTermsIsLoading ) {
			return;
		}

		const newOptions = [];

		allTerms.forEach( ( term ) => {
			const filteredTerm = getFilteredTerm( term.id );

			if ( ! filteredTerm && filteredCounts !== null ) {
				return;
			}

			newOptions.push( {
				key: term.slug,
				label: getLabel(
					term.name,
					filteredTerm ? filteredTerm.count : term.count
				),
				checked: false,
			} );
		} );

		setOptions( newOptions );
	}, [
		filteredCounts,
		allTerms,
		showCounts,
		filteredCountsIsLoading,
		allTermsIsLoading,
		getFilteredTerm,
		getLabel,
	] );

	useEffect( () => {
		const newProductAttributes = productAttributes.filter(
			( item ) => item.attribute !== taxonomy
		);
		const slug = checkedOptions.join( ',' );

		if ( slug ) {
			const updatedQuery = {
				attribute: taxonomy,
				operator: 'or' === queryType ? 'in' : 'and',
				slug,
			};
			newProductAttributes.push( updatedQuery );
		}

		setProductAttributes( sortBy( newProductAttributes, 'attribute' ) );
	}, [ checkedOptions, taxonomy, productAttributes ] );

	const onChange = useCallback( ( checked ) => {
		setCheckedOptions( checked );
	}, [] );

	if ( ! taxonomy ) {
		return null;
	}

	return (
		<div className="wc-block-attribute-filter">
			<CheckboxList
				className={ 'wc-block-attribute-filter-list' }
				options={ options }
				onChange={ onChange }
				isLoading={ allTermsIsLoading }
			/>
		</div>
	);
};

export default AttributeFilterBlock;
