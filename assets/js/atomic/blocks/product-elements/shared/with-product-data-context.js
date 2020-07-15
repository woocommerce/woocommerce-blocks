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
const ContextWrapper = ( props ) => {
	const { productId, children } = props;
	const [ product, setProduct ] = useState( null );

	useEffect( () => {
		if ( productId < 1 ) {
			setProduct( null );
		}
		getProduct( productId )
			.then( ( receivedProduct ) => {
				setProduct( receivedProduct );
			} )
			.catch( async () => {
				setProduct( null );
			} );
	}, [ productId ] );

	return (
		<ProductDataContextProvider product={ product }>
			{ children }
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

		if ( productDataContext.hasContext || !! props.product ) {
			return <OriginalComponent { ...props } />;
		}

		return (
			<ContextWrapper productId={ props.productId || 0 }>
				<OriginalComponent { ...props } />
			</ContextWrapper>
		);
	};
};

export default withProductDataContext;
