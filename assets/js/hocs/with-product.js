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
 * @param {Object} props          Props to pass to HOC.
 * @param {Array}  [props.fields] Product fields to get from the API.
 */
const withProduct = ( { fields = [] } ) => ( OriginalComponent ) => {
	return ( props ) => {
		const { productId, previewProduct = null } = props.attributes;
		const [ loading, setLoading ] = useState( true );
		const [ error, setError ] = useState( null );
		const [ product, setProduct ] = useState(
			productId === 'preview' ? previewProduct : null
		);

		const loadProduct = useCallback( () => {
			if ( productId === 'preview' || ! productId ) {
				setLoading( false );
				return;
			}

			setLoading( true );
			getProduct( productId, fields )
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
		}, [ productId ] );

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
			/>
		);
	};
};

export default withProduct;
