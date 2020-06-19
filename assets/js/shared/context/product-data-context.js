/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import PropTypes from 'prop-types';
import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useRef,
} from '@wordpress/element';
import { useDebounce } from 'use-debounce';

/**
 * This context is used to pass product data down to all children blocks in a given tree.
 *
 * @member {Object} ProductDataContext A react context object
 */
const ProductDataContext = createContext( {
	product: null,
	isLoading: true,
	fields: [],
	addFields: () => {},
} );

export const useProductDataContext = ( fields ) => {
	const { addFields, ...context } = useContext( ProductDataContext );

	useEffect( () => {
		if ( fields ) {
			addFields( fields );
		}
	}, [ addFields, fields ] );

	return context;
};

export const ProductDataContextProvider = ( {
	product: productContext = null,
	productId = null,
	children,
} ) => {
	const firstMount = useRef( true );
	const [ product, setProduct ] = useState( productContext );
	const [ fields, setFields ] = useState( [] );
	const [ debouncedFields ] = useDebounce( fields, 60 );

	const addFields = useCallback(
		( fieldsToAdd ) => {
			const diff = fieldsToAdd.filter(
				( field ) => ! fields.includes( field )
			);
			if ( diff.length ) {
				setFields( [ ...fields, ...fieldsToAdd ] );
			}
		},
		[ fields ]
	);

	useEffect( () => {
		if ( ! productId || productContext || firstMount.current ) {
			firstMount.current = false;
			return;
		}
		apiFetch( {
			path: addQueryArgs( `/wc/store/products/${ productId }`, {
				_fields: debouncedFields,
			} ),
		} )
			.then( ( theProduct ) => {
				setProduct( theProduct );
			} )
			.catch( async () => {
				setProduct( null );
			} );
	}, [ productId, productContext, debouncedFields ] );

	useEffect( () => {
		setProduct( productContext );
	}, [ productContext ] );

	const contextValue = {
		product,
		isLoading: product === null,
		addFields,
	};

	return (
		<ProductDataContext.Provider value={ contextValue }>
			{ children }
		</ProductDataContext.Provider>
	);
};

ProductDataContextProvider.propTypes = {
	children: PropTypes.node,
	product: PropTypes.object,
};
