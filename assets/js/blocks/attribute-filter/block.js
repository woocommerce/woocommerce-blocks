/**
 * External dependencies
 */
import {
	useCollection,
	useQueryStateByKey,
	useQueryStateByContext,
} from '@woocommerce/base-hooks';
import {
	useCallback,
	Fragment,
	useEffect,
	useState,
	useMemo,
} from '@wordpress/element';
import { sortBy } from 'lodash';
import CheckboxList from '@woocommerce/base-components/checkbox-list';

/**
 * Internal dependencies
 */
import './style.scss';
import { getTaxonomyFromAttributeId } from '../../utils/attributes';

/**
 * Component displaying an attribute filter.
 */
const AttributeFilterBlock = ( { attributes } ) => {
	const [ options, setOptions ] = useState( null );
	const [ checkedOptions, setCheckedOptions ] = useState( [] );
	const { showCounts, attributeId, queryType } = attributes;
	const taxonomy = getTaxonomyFromAttributeId( attributeId );

	const [ queryState ] = useQueryStateByContext( 'product-grid' );
	const [ productAttributes, setProductAttributes ] = useQueryStateByKey(
		'product-grid',
		'attributes',
		[]
	);

	const filteredCountsQueryState = useMemo( () => {
		// If doing an "AND" query, we need to remove current taxonomy query so counts are not affected.
		const modifiedQueryState =
			queryType === 'or'
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

	const {
		results: attributeTerms,
		isLoading: attributeTermsLoading,
	} = useCollection( {
		namespace: '/wc/store',
		resourceName: 'products/attributes/terms',
		resourceValues: [ attributeId ],
	} );

	const {
		results: filteredCounts,
		isLoading: filteredCountsLoading,
	} = useCollection( {
		namespace: '/wc/store',
		resourceName: 'products/collection-data',
		query: filteredCountsQueryState,
	} );

	const getLabel = useCallback(
		( name, count ) => {
			return (
				<Fragment key="label">
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
		// Do nothing until we have the attribute terms from the API.
		if ( attributeTermsLoading ) {
			return;
		}
		// If we already have options (this has already ran) but filtered counts are refreshing, don't change the list
		// just yet. Wait for them to finish loading.
		if ( options === null && filteredCountsLoading ) {
			return;
		}

		const newOptions = [];

		attributeTerms.forEach( ( term ) => {
			const filteredTerm = getFilteredTerm( term.id );

			// If there is no match this term doesn't match the current product collection.
			if ( ! filteredTerm && ! filteredCountsLoading ) {
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
		filteredCountsLoading,
		attributeTerms,
		attributeTermsLoading,
		getFilteredTerm,
		getLabel,
	] );

	useEffect( () => {
		const newProductAttributes = productAttributes.filter(
			( item ) => item.attribute !== taxonomy
		);

		if ( checkedOptions ) {
			const updatedQuery = {
				attribute: taxonomy,
				operator: queryType === 'or' ? 'in' : 'and',
				slug: checkedOptions,
			};
			newProductAttributes.push( updatedQuery );
		}

		setProductAttributes( sortBy( newProductAttributes, 'attribute' ) );
	}, [ checkedOptions, taxonomy, productAttributes, queryType ] );

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
				options={ options ? options : [] }
				onChange={ onChange }
				isLoading={ attributeTermsLoading }
			/>
		</div>
	);
};

export default AttributeFilterBlock;
