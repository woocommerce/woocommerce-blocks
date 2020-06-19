/**
 * External dependencies
 */
import { useState, useCallback, useEffect } from '@wordpress/element';
import { getProduct } from '@woocommerce/block-components/utils';

/**
 * Internal dependencies
 */
import { formatError } from '../base/utils/errors.js';

/**
 * HOC that queries a product for a component.
 *
 * @param {*} OriginalComponent Component being wrapped.
 */
const withProduct = ( OriginalComponent ) => {
	return ( props ) => {
		const { productId, previewProduct = null } = props.attributes;
		const [ loading, setLoading ] = useState( true );
		const [ error, setError ] = useState( null );
		const [ product, setProduct ] = useState(
			productId === 'preview' ? previewProduct : null
		);
		const [ productFields, setProductFields ] = useState( [] );

		const loadProduct = useCallback( () => {
			if ( productId === 'preview' ) {
				return;
			}

			if ( ! productId ) {
				setLoading( false );
				return;
			}

			setLoading( true );

			getProduct( productId, productFields )
				.then( ( theProduct ) => {
					setProduct( theProduct );
					setError( null );
				} )
				.catch( async ( e ) => {
					const errorMessage = await formatError( e );
					setProduct( null );
					setError( errorMessage );
				} )
				.finally( () => {
					setLoading( false );
				} );
		}, [ productId, productFields ] );

		useEffect( () => {
			loadProduct();
		}, [ productId, loadProduct ] );

		return (
			<OriginalComponent
				{ ...props }
				error={ error }
				getProduct={ loadProduct }
				isLoading={ loading }
				product={ product }
				setProductField={ setProductFields }
			/>
		);
	};
};

export default withProduct;
