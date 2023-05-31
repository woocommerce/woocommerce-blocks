/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { Taxonomy } from '@wordpress/core-data/src/entity-types';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import {
	FormTokenField,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useTaxonomies } from '../utils';
import { ProductCollectionQuery } from '../types';

const EMPTY_ARRAY: [] = [];
const BASE_QUERY = {
	order: 'asc',
	_fields: 'id,name,slug',
	context: 'view',
};

type Term = {
	id: number;
	name: string;
	slug: string;
};

type SearchResultsState = {
	searchResults: Array< Term >;
	searchHasResolved: boolean;
};

interface TaxonomyControlProps {
	query: ProductCollectionQuery;
	setQueryAttribute: ( value: Partial< ProductCollectionQuery > ) => void;
}

// Helper function to get the term id based on user input in terms `FormTokenField`.
const getTermIdByTermValue = (
	terms: Term[],
	searchTerm: Term | string,
	termIdToNameMap: Map< number, string >
): number | undefined => {
	// First we check for exact match by `term.id` or case sensitive `term.name` match.
	const termId =
		typeof searchTerm === 'object'
			? searchTerm.id
			: terms?.find(
					( term ) => termIdToNameMap.get( term.id ) === searchTerm
			  )?.id;
	if ( termId ) {
		return termId;
	}

	/**
	 * Here we make an extra check for entered terms in a non case sensitive way,
	 * to match user expectations, due to `FormTokenField` behaviour that shows
	 * suggestions which are case insensitive.
	 *
	 * Although WP tries to discourage users to add terms with the same name (case insensitive),
	 * it's still possible if you manually change the name, as long as the terms have different slugs.
	 * In this edge case we always apply the first match from the terms list.
	 */
	const termValueLower = (
		typeof searchTerm === 'object' ? searchTerm.name : searchTerm
	 ).toLocaleLowerCase();
	return terms?.find(
		( term ) =>
			( termIdToNameMap.get( term.id ) as string ).toLocaleLowerCase() ===
			termValueLower
	)?.id;
};

/**
 * Returns an array with the existing terms for the given taxonomy.
 */
const useExistingTerms = ( termIds: number[], taxonomy: Taxonomy ): Term[] => {
	return useSelect(
		( select ) => {
			if ( ! termIds?.length ) return EMPTY_ARRAY;
			const { getEntityRecords } = select( coreStore );
			return getEntityRecords( 'taxonomy', taxonomy.slug, {
				...BASE_QUERY,
				include: termIds,
				per_page: termIds.length,
			} );
		},
		[ taxonomy, termIds ]
	);
};

/**
 * Returns a map with term ids as keys and term names as values.
 * If there are duplicate term names, the term slug is appended to the name.
 * This makes sure that the term names are unique when displayed in the `FormTokenField`.
 *
 * For example, it will return a map like this:
 * {
 *    "19": "Accessories",
 *    "37": "category1 - category1",
 *    "38": "category1 - category1-clothing",
 *    "39": "category1 - category1-clothing-2",
 *    "16": "Clothing",
 *    "21": "Decor"
 * }
 *
 * Here category1 is duplicated, so the slug is appended to the name.
 */

const useTermIdToNameMap = ( taxonomy: Taxonomy ): Map< number, string > => {
	// Fetch all terms for the given taxonomy.
	const allTerms: Term[] = useSelect(
		( select ) => {
			const { getEntityRecords } = select( coreStore );
			return getEntityRecords( 'taxonomy', taxonomy.slug, {
				...BASE_QUERY,
			} );
		},
		[ taxonomy ]
	);

	// Memoize the result to avoid re-renders.
	return useMemo( () => {
		const result = new Map< number, string >();

		if ( ! allTerms ) return result;

		// Count the number of times a term name appears.
		const nameCountMap = allTerms?.reduce(
			( accumulator: Map< string, number >, term ) => {
				const termName = term.name;
				if ( accumulator.has( termName ) ) {
					accumulator.set(
						termName,
						( accumulator.get( termName ) as number ) + 1
					);
				} else {
					accumulator.set( termName, 1 );
				}
				return accumulator;
			},
			new Map< string, number >()
		);

		// Create the map with term ids as keys and term names as values.
		for ( const term of allTerms ) {
			const termId = term.id;
			const termName = term.name;
			const name =
				nameCountMap.get( termName ) === 1
					? termName
					: `${ termName } - ${ term.slug }`;
			result.set( termId, name );
		}
		return result;
	}, [ allTerms ] );
};

const useSearchResults = (
	search: string,
	taxonomy: Taxonomy,
	termIds: number[]
): SearchResultsState => {
	return useSelect(
		( select ) => {
			if ( ! search ) {
				return { searchResults: EMPTY_ARRAY, searchHasResolved: true };
			}

			const { getEntityRecords, hasFinishedResolution } =
				select( coreStore );

			const selectorArgs = [
				'taxonomy',
				taxonomy.slug,
				{
					...BASE_QUERY,
					search,
					orderby: 'name',
					exclude: termIds,
					per_page: 20,
				},
			];
			return {
				searchResults: getEntityRecords( ...selectorArgs ),
				searchHasResolved: hasFinishedResolution(
					'getEntityRecords',
					selectorArgs
				),
			};
		},
		[ taxonomy, search, termIds ]
	);
};

/**
 * Renders a `FormTokenField` for a given taxonomy.
 *
 * @param {Object}   props          The props for the component.
 * @param {Object}   props.taxonomy The taxonomy object.
 * @param {number[]} props.termIds  An array with the block's term ids for the given taxonomy.
 * @param {Function} props.onChange Callback `onChange` function.
 * @return {JSX.Element} The rendered component.
 */
const TaxonomyItem = ( {
	taxonomy,
	termIds,
	onChange,
}: {
	taxonomy: Taxonomy;
	termIds: number[];
	onChange: ( termIds: number[] ) => void;
} ) => {
	const [ search, setSearch ] = useState( '' );
	const [ value, setValue ] = useState<
		{
			id: number;
			value: string;
		}[]
	>( [] );
	const [ suggestions, setSuggestions ] = useState< string[] >( [] );

	// Search is debounced to limit the number of API calls as the user types
	const debouncedSearch = useDebounce( setSearch, 250 );

	const termIdToNameMap = useTermIdToNameMap( taxonomy );
	const { searchResults, searchHasResolved } = useSearchResults(
		search,
		taxonomy,
		termIds
	);

	const existingTerms = useExistingTerms( termIds, taxonomy );

	// Update the `value` state only after the selectors are resolved
	// to avoid emptying the input when we're changing terms.
	useEffect( () => {
		if ( ! termIds?.length ) {
			setValue( EMPTY_ARRAY );
		}

		if ( ! existingTerms?.length ) return;

		// Returns only the existing entity ids. This prevents the component
		// from crashing in the editor, when non existing ids are provided.
		const sanitizedValue = termIds.reduce(
			(
				accumulator: {
					id: number;
					value: string;
				}[],
				id
			) => {
				const entity = existingTerms.find( ( term ) => term.id === id );
				if ( entity ) {
					accumulator.push( {
						id,
						value: termIdToNameMap.get( id ) as string,
					} );
				}
				return accumulator;
			},
			[]
		);
		setValue( sanitizedValue );
	}, [ termIds, existingTerms, termIdToNameMap ] );

	// Update suggestions only when the query has resolved.
	useEffect( () => {
		if ( ! searchHasResolved ) return;
		const newSuggestions = searchResults.map(
			( searchResult ) => termIdToNameMap.get( searchResult.id ) as string
		);
		setSuggestions( newSuggestions );
	}, [ searchResults, searchHasResolved, termIdToNameMap ] );

	const onTermsChange = ( newTermValues: FormTokenField.Value[] ) => {
		const newTermIds = [];
		for ( const termValue of newTermValues ) {
			const termId = getTermIdByTermValue(
				searchResults,
				termValue as string | Term,
				termIdToNameMap
			);
			if ( termId ) {
				newTermIds.push( termId );
			}
		}
		setSuggestions( EMPTY_ARRAY );
		onChange( newTermIds );
	};

	return (
		<div className="wc-block-editor-product-collection-inspector__taxonomy-control">
			<FormTokenField
				label={ taxonomy.name }
				value={ value }
				onInputChange={ debouncedSearch }
				suggestions={ suggestions }
				onChange={ onTermsChange }
				// @ts-expect-error Using experimental features
				__experimentalShowHowTo={ false }
			/>
		</div>
	);
};

export function TaxonomyControls( {
	setQueryAttribute,
	query,
}: TaxonomyControlProps ) {
	const { taxQuery } = query;

	const taxonomies = useTaxonomies();
	if ( ! taxonomies || taxonomies.length === 0 ) {
		return null;
	}

	return (
		<ToolsPanelItem
			label={ __( 'Taxonomies', 'woo-gutenberg-products-block' ) }
			hasValue={ () =>
				Object.values( taxQuery || {} ).some(
					( terms ) => !! terms.length
				)
			}
			onDeselect={ () => setQueryAttribute( { taxQuery: {} } ) }
		>
			{ taxonomies.map( ( taxonomy: Taxonomy ) => {
				const termIds = taxQuery?.[ taxonomy.slug ] || [];
				const handleChange = ( newTermIds: number[] ) =>
					setQueryAttribute( {
						taxQuery: {
							...taxQuery,
							[ taxonomy.slug ]: newTermIds,
						},
					} );

				return (
					<TaxonomyItem
						key={ taxonomy.slug }
						taxonomy={ taxonomy }
						termIds={ termIds }
						onChange={ handleChange }
					/>
				);
			} ) }
		</ToolsPanelItem>
	);
}

export default TaxonomyControls;
