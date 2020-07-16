/**
 * External dependencies
 */
import classnames from 'classnames';
import apiFetch from '@wordpress/api-fetch';
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
	const [ isLoading, setIsLoading ] = useState( true );

	useEffect( () => {
		if ( !! props.product ) {
			setProduct( props.product );
		}
	}, [ props.product ] );

	useEffect( () => {
		if ( productId > 0 ) {
			setIsLoading( true );
			apiFetch( {
				path: `/wc/store/products/${ productId }`,
			} )
				.then( ( receivedProduct ) => {
					setProduct( receivedProduct );
					setIsLoading( false );
				} )
				.catch( async () => {
					setProduct( null );
					setIsLoading( false );
				} );
		}
	}, [ productId ] );

	return (
		<div
			className={ classnames( 'wc-block-layout', {
				'wc-block-layout--is-loading': isLoading,
			} ) }
		>
			<ProductDataContextProvider product={ product }>
				<OriginalComponent { ...props } />
			</ProductDataContextProvider>
		</div>
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
