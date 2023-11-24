/**
 * External dependencies
 */
import type { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import type { ProductCollectionQuery } from '~/blocks/product-collection/types';

type BlockAttributes = {
	collectionData: unknown[];
};

export interface EditProps extends BlockEditProps< BlockAttributes > {
	context: {
		query: ProductCollectionQuery;
	};
}
