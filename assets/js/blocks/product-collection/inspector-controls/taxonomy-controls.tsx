/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { Taxonomy } from '@wordpress/core-data/src/entity-types';
import { useState, useEffect } from '@wordpress/element';
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
	_fields: 'id,name',
	context: 'view',
};

type Term = {
	id: number;
	name: string;
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
	searchTerm: Term | string
): number | undefined => {
	// First we check for exact match by `term.id` or case sensitive `term.name` match.
	const termId =
		typeof searchTerm === 'object'
			? searchTerm.id
			: terms?.find( ( term ) => term.name === searchTerm )?.id;
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
		( term ) => term.name.toLocaleLowerCase() === termValueLower
	)?.id;
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
function TaxonomyItem( {
	taxonomy,
	termIds,
	onChange,
}: {
	taxonomy: Taxonomy;
	termIds: number[];
	onChange: ( termIds: number[] ) => void;
} ) {
	const [ search, setSearch ] = useState( '' );
	const [ value, setValue ] = useState<
		{
			id: number;
			value: string;
		}[]
	>( [] );
	const [ suggestions, setSuggestions ] = useState< string[] >( [] );

	const debouncedSearch = useDebounce( setSearch, 250 );

	const { searchResults, searchHasResolved }: SearchResultsState = useSelect(
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
		[ search, termIds ]
	);

	// `existingTerms` are the ones fetched from the API and their type is `{ id: number; name: string }`.
	// They are used to extract the terms' names to populate the `FormTokenField` properly
	// and to sanitize the provided `termIds`, by setting only the ones that exist.
	const existingTerms: Term[] = useSelect(
		( select ) => {
			if ( ! termIds?.length ) return EMPTY_ARRAY;
			const { getEntityRecords } = select( coreStore );
			return getEntityRecords( 'taxonomy', taxonomy.slug, {
				...BASE_QUERY,
				include: termIds,
				per_page: termIds.length,
			} );
		},
		[ termIds ]
	);

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
						value: entity.name,
					} );
				}
				return accumulator;
			},
			[]
		);
		setValue( sanitizedValue );
	}, [ termIds, existingTerms ] );

	// Update suggestions only when the query has resolved.
	useEffect( () => {
		if ( ! searchHasResolved ) return;
		setSuggestions( searchResults.map( ( result ) => result.name ) );
	}, [ searchResults, searchHasResolved ] );

	const onTermsChange = ( newTermValues: FormTokenField.Value[] ) => {
		const newTermIds = new Set< number >();
		for ( const termValue of newTermValues ) {
			const termId = getTermIdByTermValue(
				searchResults,
				termValue as string | Term
			);
			if ( termId ) {
				newTermIds.add( termId );
			}
		}
		setSuggestions( EMPTY_ARRAY );
		onChange( Array.from( newTermIds ) );
	};

	return (
		<div className="block-library-query-inspector__taxonomy-control">
			<FormTokenField
				label={ taxonomy.name }
				value={ value }
				onInputChange={ debouncedSearch }
				suggestions={ suggestions }
				onChange={ onTermsChange }
			/>
		</div>
	);
}

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
