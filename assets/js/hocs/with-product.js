/**
 * External dependencies
 */
import { useState, useEffect, useCallback } from '@wordpress/element';
import { getProduct } from '@woocommerce/block-components/utils';

/**
 * Internal dependencies
 */
import { formatError } from '../base/utils/errors.js';

/**
 * HOC that queries a product for a component.
 *
 * @param {Function} OriginalComponent Component being wrapped.
 */
const withProduct = ( OriginalComponent ) => {
	return ( props ) => {
		const [ product, setProduct ] = useState( null );
		const [ loading, setLoading ] = useState( true );
		const [ error, setError ] = useState( null );

		const productId = props.attributes.productId;

		const loadProduct = useCallback( () => {
			if ( ! productId ) {
				return setProduct( null );
			}
			if ( productId === 'preview' ) {
				return setProduct( props.attributes.previewProduct );
			}

			setLoading( true );

			getProduct( productId )
				.then( ( apiProduct ) => {
					setProduct( apiProduct );
					setError( null );
				} )
				.catch( async ( e ) => {
					const apiError = await formatError( e );
					setProduct( null );
					setError( apiError );
				} )
				.finally( () => {
					setLoading( false );
				} );
		}, [ productId ] );

		useEffect( () => {
			if ( productId === product?.id ) {
				return;
			}
			loadProduct();
		}, [ productId, loadProduct ] );

		return (
			<OriginalComponent
				{ ...props }
				error={ error }
				getProduct={ loadProduct }
				isLoading={ loading }
				product={ product }
			/>
		);
	};
};

export default withProduct;
