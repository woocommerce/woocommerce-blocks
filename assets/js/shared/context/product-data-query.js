/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { useEffect } from '@wordpress/element';

/**
 * Rendered by Product Data Context to query data for registered fields once children are rendered.
 */
const ProductDataQuery = ( { productId, fields, setProduct } ) => {
	useEffect( () => {
		if ( ! productId || ! fields ) {
			return;
		}
		apiFetch( {
			path: addQueryArgs( `/wc/store/products/${ productId }`, {
				_fields: [ ...fields, 'id' ],
			} ),
		} )
			.then( ( theProduct ) => {
				setProduct( theProduct );
			} )
			.catch( async () => {
				setProduct( null );
			} );
	}, [ productId, fields, setProduct ] );

	return null;
};

export default ProductDataQuery;
