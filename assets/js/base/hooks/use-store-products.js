/**
 * External dependencies
 */
import { COLLECTIONS_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { useShallowEqual } from './use-shallow-equal';

const DEFAULT_OPTIONS = {
	namespace: '/wc/blocks',
	modelName: 'products',
};

export const useStoreProducts = ( query, options = DEFAULT_OPTIONS ) => {
	const { namespace, modelName } = options;
	if ( ! namespace || ! modelName ) {
		throw new Error(
			'If you provide an options object, you must have valid values ' +
				'for the namespace and the modelName properties.'
		);
	}
	// ensure we feed the previous reference object if it's equivalent
	const currentQuery = useShallowEqual( query );
	const {
		products = [],
		totalProducts = 0,
		productsLoading = true,
	} = useSelect(
		( select ) => {
			const store = select( storeKey );
			// filter out query if it is undefined.
			const args = [ namespace, modelName, currentQuery ].filter(
				( item ) => typeof item !== undefined
			);
			return {
				products: store.getCollection( ...args ),
				productsTotal: store.getCollectionHeader(
					'x-wp-total',
					...args
				),
				productsLoading: store.hasFinishedResolution(
					'getCollection',
					args
				),
			};
		},
		[ namespace, modelName, currentQuery ]
	);
	return {
		products,
		totalProducts,
		productsLoading,
	};
};
