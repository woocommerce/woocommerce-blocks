/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState, useRef } from '@wordpress/element';
import { difference, concat } from 'lodash';

/**
 * Rendered by Product Data Context to query data for registered fields once children are rendered.
 */
const ProductDataQuery = ( { productId, fields, setProduct } ) => {
	const [ productData, setProductData ] = useState( {} );
	const retrievedFields = useRef( [] );

	// If the product ID changes, reset fields.
	useEffect( () => {
		retrievedFields.current = [];
		setProductData( {} );
	}, [ productId ] );

	// When product data changes, update the product context.
	useEffect( () => {
		setProduct( productData );
	}, [ productData, setProduct ] );

	// If the fields change, fetch new data.
	useEffect( () => {
		if ( ! productId || fields === undefined ) {
			return;
		}
		const fieldsToFetch = difference( fields, retrievedFields.current );

		if ( fieldsToFetch.length === 0 ) {
			return;
		}

		apiFetch( {
			path: addQueryArgs( `/wc/store/products/${ productId }`, {
				_fields: [ ...fieldsToFetch, 'id' ],
			} ),
		} ).then( ( theProduct ) => {
			setProductData( ( prevState ) => {
				return { ...prevState, ...theProduct };
			} );
			retrievedFields.current = concat( retrievedFields.current, fields );
		} );
	}, [ productId, fields ] );

	return null;
};

export default ProductDataQuery;
