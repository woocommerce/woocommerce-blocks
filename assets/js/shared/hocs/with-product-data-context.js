/**
 * External dependencies
 */
import {
	ProductDataContextProvider,
	useProductDataContext,
} from '@woocommerce/shared-context';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_NAME } from './store';

/**
 * Loads the product from the API and adds to the context provider.
 *
 * @param {Object} props Component props.
 */
const OriginalComponentWithContext = ( props ) => {
	const { productId, OriginalComponent, postId, product } = props;

	const id = props.isDescendentOfQueryLoop ? postId : productId;

	const productFromAPI = useSelect( ( select ) => {
		if ( id > 0 ) {
			const prod = select( STORE_NAME ).getProduct( id );
			const hasFinished = select( STORE_NAME ).hasFinishedResolution(
				'getProduct',
				[ id ]
			);

			return {
				product: prod || null,
				isLoading: ! hasFinished,
			};
		}

		return {
			product: null,
			isLoading: false,
		};
	} );

	if ( product ) {
		return (
			<ProductDataContextProvider product={ product } isLoading={ false }>
				<OriginalComponent { ...props } />
			</ProductDataContextProvider>
		);
	}

	return (
		<ProductDataContextProvider
			product={ productFromAPI.product }
			isLoading={ productFromAPI.isLoading }
		>
			<OriginalComponent { ...props } />
		</ProductDataContextProvider>
	);
};

/**
 * This HOC sees if the Block is wrapped in Product Data Context, and if not, wraps it with context
 * based on the productId attribute, if set.
 *
 * @param {Function} OriginalComponent Component being wrapped.
 */
export const withProductDataContext = ( OriginalComponent ) => {
	return ( props ) => {
		const productDataContext = useProductDataContext();

		// If a product prop was provided, use this as the context for the tree.
		if ( !! props.product || ! productDataContext.hasContext ) {
			return (
				<OriginalComponentWithContext
					{ ...props }
					OriginalComponent={ OriginalComponent }
				/>
			);
		}

		return <OriginalComponent { ...props } />;
	};
};
