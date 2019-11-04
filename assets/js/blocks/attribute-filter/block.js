/**
 * External dependencies
 */
import {
	useCollection,
	useQueryStateByKey,
	useQueryStateContext,
} from '@woocommerce/base-hooks';
import { useCallback, Fragment, useEffect, useState } from '@wordpress/element';
import { keyBy, invert, map, trim, split, join } from 'lodash';

/**
 * Internal dependencies
 */
import './style.scss';
import CheckboxList from '@woocommerce/base-components/checkbox-list';

/**
 * Component displaying an attribute filter.
 */
const AttributeFilterBlock = ( { attributes } ) => {
	const { showCounts, attributeId, queryType } = attributes;

	const [ options, setOptions ] = useState( [] );

	const [ productAttributes, setProductAttributes ] = useQueryStateByKey(
		'product-grid',
		'attributes'
	);

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
	useEffect( () => {
		if ( filteredCountsIsLoading || allTermsIsLoading ) {
			return;
		}

		const newOptions = [];

		allTerms.forEach( ( term ) => {
			const filteredTerm = getFilteredTerm( term.id );

			if ( ! filteredTerm && null !== filteredCounts ) {
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
	] );

	const onChange = useCallback( ( event ) => {
		const checked = event.target.checked;
		const slug = event.target.name;
		const keyedAttributes = keyBy( productAttributes, 'attribute' );

		// Get current terms as array.
		const terms =
			keyedAttributes.pa_color && keyedAttributes.pa_color.slug
				? invert(
						map( split( keyedAttributes.pa_color.slug, ',' ), trim )
				  )
				: [];

		if ( checked ) {
			terms[ slug ] = 1;
		} else {
			delete terms[ slug ];
		}

		keyedAttributes.pa_color = {};
		keyedAttributes.pa_color.attribute = 'pa_color';
		keyedAttributes.pa_color.slug = join(
			Object.values( invert( terms ) ).filter( Boolean ),
			','
		);
		keyedAttributes.pa_color.operator = 'or' === queryType ? 'in' : 'and';

		if ( ! keyedAttributes.pa_color.slug ) {
			delete keyedAttributes.pa_color;
		}

		setProductAttributes( Object.values( keyedAttributes ) );
	}, [] );

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
