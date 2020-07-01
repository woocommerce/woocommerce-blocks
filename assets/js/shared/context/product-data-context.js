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
} from '@wordpress/element';
import { flatten, uniq } from 'lodash';
import isShallowEqual from '@wordpress/is-shallow-equal';

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
	product: {},
	isLoading: true,
	productDataFieldPromise: ( fields ) => fields, // Used internally: this is not exposed to consumers.
} );

/**
 * Resolves an array of promises and sets the results using the provided callback function.
 *
 * @param {Array} promisesToResolve An array of promises.
 * @param {Function} setResults Receives the resolved promises.
 */
const resolvePromises = ( promisesToResolve, setResults ) => {
	Promise.all( promisesToResolve ).then( ( resolved ) => {
		const results = uniq( flatten( resolved ) ).filter( Boolean );
		setResults( results );
	} );
};

/**
 * Allows fields to be added as promises. Once all fields are added, the promises resolve so fields
 * are ready for the API request.
 */
const useProductDataFieldPromises = () => {
	const defaultPromises = [];
	const promises = useRef( defaultPromises );
	const [ fields, setFields ] = useState( undefined );
	const [ initializing, setInitializing ] = useState( true );
	const [ resolving, setResolving ] = useState( false );

	// This useEffect will be deferred until after the initialization of all children so promises are
	// created in time.
	// Based on the solution in https://stackoverflow.com/questions/55800263/waiting-for-values-from-unknown-children-component-number-before-effet
	useEffect( () => {
		resolvePromises( promises.current, setFields );
		setInitializing( false );
		setResolving( false );
	}, [] );

	// This useEffect tracks changes to fields after the initial promises resolve.
	useEffect( () => {
		if ( initializing === false && resolving ) {
			resolvePromises( promises.current, setFields );
			setResolving( false );
		}
	}, [ initializing, resolving ] );

	// Function that returns a new promise to add fields to.
	const productDataFieldPromise = useCallback( ( addFields ) => {
		promises.current.push( Promise.resolve( addFields ) );
		setResolving( true );
	}, [] );

	return [ fields, productDataFieldPromise ];
};

/**
 * Consumers of this hook can receive Product Data Properties. Specific product properties can be
 * requested to make API requests more efficient.
 *
 * @param {Array|null} fields Array of API fields names.
 */
export const useProductDataContext = ( fields = null ) => {
	const fieldsRef = useRef( null );
	const { productDataFieldPromise, ...context } = useContext(
		ProductDataContext
	);

	useEffect( () => {
		if ( ! isShallowEqual( fields, fieldsRef.current ) ) {
			fieldsRef.current = fields;
			productDataFieldPromise( fields );
		}
	}, [ fields, productDataFieldPromise ] );

	return context;
};

/**
 * This context provider passes product data down to all children blocks in a given tree.
 *
 * @param {Object} props Provider props.
 * @param {Object} [props.product] If a product is given, this product will be passed to children - no API
 *                 requests will be made.
 * @param {number} [props.productId] Provide a product ID to query from the API.
 * @param {*}      props.children Children in the tree.
 */
export const ProductDataContextProvider = ( {
	product: productContext = undefined,
	productId = 0,
	children,
} ) => {
	const [ product, setProduct ] = useState( productContext || {} );
	const [ fields, productDataFieldPromise ] = useProductDataFieldPromises();

	useEffect( () => {
		if ( productContext ) {
			setProduct( productContext );
		}
	}, [ productContext ] );

	const isLoading = Object.keys( product ).length === 0;
	const contextValue = {
		product,
		isLoading,
		productDataFieldPromise,
	};

	return (
		<ProductDataContext.Provider value={ contextValue }>
			{ children }
			{ !! productId && (
				<ProductDataQuery
					productId={ productId }
					fields={ fields }
					setProduct={ setProduct }
				/>
			) }
		</ProductDataContext.Provider>
	);
};
