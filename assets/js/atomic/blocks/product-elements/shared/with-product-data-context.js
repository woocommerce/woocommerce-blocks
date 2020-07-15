/**
 * External dependencies
 */
import { getProduct } from '@woocommerce/block-components/utils';
import {
	ProductDataContextProvider,
	useProductDataContext,
} from '@woocommerce/shared-context';
import { useState, useEffect } from '@wordpress/element';

/**
 * Loads the product from the API and adds to the context provider.
 *
 * @param {Object} props Component props.
 */
const OriginalComponentWithContext = ( props ) => {
	const { productId, OriginalComponent } = props;
	const [ product, setProduct ] = useState( null );

	useEffect( () => {
		if ( !! props.product ) {
			setProduct( props.product );
		}
	}, [ props.product ] );

	useEffect( () => {
		if ( productId > 0 ) {
			getProduct( productId )
				.then( ( receivedProduct ) => {
					setProduct( receivedProduct );
				} )
				.catch( async () => {
					setProduct( null );
				} );
		}
	}, [ productId ] );

	return (
		<ProductDataContextProvider product={ product }>
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
const withProductDataContext = ( OriginalComponent ) => {
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

export default withProductDataContext;
