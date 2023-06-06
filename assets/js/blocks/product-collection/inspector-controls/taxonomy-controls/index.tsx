/**
 * External dependencies
 */
import { Taxonomy } from '@wordpress/core-data/src/entity-types';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import {
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import TaxonomyItem from './taxonomy-item';
import { ProductCollectionQuery } from '../../types';

interface TaxonomyControlProps {
	query: ProductCollectionQuery;
	setQueryAttribute: ( value: Partial< ProductCollectionQuery > ) => void;
}

/**
 * Hook that returns the taxonomies associated with product post type.
 */
export const useTaxonomies = (): Taxonomy[] => {
	const taxonomies = useSelect( ( select ) => {
		const { getTaxonomies } = select( coreStore );
		const filteredTaxonomies: Taxonomy[] = getTaxonomies( {
			type: 'product',
			per_page: -1,
			context: 'view',
		} );
		return filteredTaxonomies;
	}, [] );
	return taxonomies;
};

function TaxonomyControls( {
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
