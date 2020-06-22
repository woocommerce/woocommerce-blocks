/**
 * External dependencies
 */
import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useRef,
	useMemo,
} from '@wordpress/element';
import { flatten } from 'lodash';

/**
 * Internal dependencies
 */
import ProductDataQuery from './product-data-query';

/**
 * This context is used to pass product data down to all children blocks in a given tree.
 *
 * @member {Object} ProductDataContext A react context object
 */
const ProductDataContext = createContext( {
	product: null,
	isLoading: true,
	useProductDataFieldPromise: () => {}, // Used internally: this is not exposed to consumers.
} );

/**
 * Allows fields to be added as promises. Once all fields are added, the promises resolve so fields
 * are ready for the API request.
 */
const useProductDataFieldPromises = () => {
	const defaultPromises = [];
	const promises = useRef( defaultPromises );
	const [ fields, setFields ] = useState( undefined );

	// This useEffect will be deferred until after the initialization of all children so promises are
	// created in time.
	// Based on the solution in https://stackoverflow.com/questions/55800263/waiting-for-values-from-unknown-children-component-number-before-effet
	useEffect( () => {
		Promise.all( promises.current ).then( ( resolvedFields ) => {
			setFields( flatten( resolvedFields ) );
		} );
	}, [] );

	// Function that returns a new promise to add fields to.
	const productDataFieldPromise = useCallback( () => {
		let resolvePromise = null;
		promises.current.push(
			new Promise( ( resolve ) => {
				resolvePromise = resolve;
			} )
		);
		return resolvePromise;
	}, [ promises ] );

	return [ fields, productDataFieldPromise ];
};

/**
 * Consumers of this hook can receive Product Data Properties. Specific product properties can be
 * requested to make API requests more efficient. Omitting fields will return __all__ product fields.
 *
 * @param {Array} fields Array of API fields names.
 */
export const useProductDataContext = ( fields = [] ) => {
	const { useProductDataFieldPromise, ...context } = useContext(
		ProductDataContext
	);
	const addFields = useProductDataFieldPromise();
	addFields( fields );

	return context;
};

/**
 * This context provider passes product data down to all children blocks in a given tree.
 *
 * @param {Object} props Provider props.
 * @param {Object} props.product If a product is given, this product will be passed to children - no API
 *                 requests will be made.
 * @param {number} props.productId Provide a product ID to query from the API.
 * @param {*}      props.children Children in the tree.
 */
export const ProductDataContextProvider = ( {
	product: productContext = null,
	productId = 0,
	children,
} ) => {
	const [ product, setProduct ] = useState( productContext );
	const [
		fields,
		useProductDataFieldPromise,
	] = useProductDataFieldPromises();

	useEffect( () => {
		setProduct( productContext );
	}, [ productContext ] );

	const isLoading = product === null;
	const contextValue = {
		product,
		isLoading,
		useProductDataFieldPromise,
	};

	return (
		<ProductDataContext.Provider value={ contextValue }>
			{ children }
			{ ! productContext && (
				<ProductDataQuery
					productId={ productId }
					fields={ fields }
					setProduct={ setProduct }
				/>
			) }
		</ProductDataContext.Provider>
	);
};
