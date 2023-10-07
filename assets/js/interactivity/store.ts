/**
 * External dependencies
 */
import { deepSignal } from 'deepsignal';
import { computed } from '@preact/signals';
import { getScope, setScope, setNamespace, resetNamespace } from './hooks';

const isObject = ( item ) =>
	item && typeof item === 'object' && ! Array.isArray( item );

const deepMerge = ( target, source ) => {
	if ( isObject( target ) && isObject( source ) ) {
		for ( const key in source ) {
			if (
				typeof Object.getOwnPropertyDescriptor( source, key )?.get ===
				'function'
			) {
				Object.defineProperty( target, key, {
					get: Object.getOwnPropertyDescriptor( source, key ).get,
				} );
			} else if ( isObject( source[ key ] ) ) {
				if ( ! target[ key ] ) Object.assign( target, { [ key ]: {} } );
				deepMerge( target[ key ], source[ key ] );
			} else {
				Object.assign( target, { [ key ]: source[ key ] } );
			}
		}
	}
};

const parseInitialState = () => {
	const storeTag = document.querySelector(
		`script[type="application/json"]#wc-interactivity-initial-state`
	);
	if ( ! storeTag?.textContent ) return {};
	try {
		const initialState = JSON.parse( storeTag.textContent );
		if ( isObject( initialState ) ) return initialState;
		throw Error( 'Parsed state is not an object' );
	} catch ( e ) {
		// eslint-disable-next-line no-console
		console.log( e );
	}
	return {};
};

export const stores = new Map();

const objToProxy = new WeakMap();
const proxyToNs = new WeakMap();

const proxify = ( obj: any, ns: string ) => {
	if ( ! objToProxy.has( obj ) ) {
		const proxy = new Proxy( obj, handlers );
		objToProxy.set( obj, proxy );
		proxyToNs.set( proxy, ns );
	}

	return objToProxy.get( obj );
};

const handlers = {
	get: ( target, key, receiver ) => {
		const ns = proxyToNs.get( receiver );

		// Check if the proxy is the store root and no prop with that name
		// exist. In that case, return an empty object for the prop requested.
		if ( receiver === stores.get( ns ) && ! ( key in target ) ) {
			const obj = {};
			target[ key ] = obj;
			return proxify( obj, ns );
		}

		// Check if the property is a getter.
		const getter = Object.getOwnPropertyDescriptor( target, key )?.get;
		if ( getter ) {
			const scope = getScope();
			if ( scope ) {
				scope.getters = scope.getters || new Map();
				if ( ! scope.getters.has( getter ) ) {
					scope.getters.set(
						getter,
						computed( () => {
							const prevScope = getScope();
							setNamespace( ns );
							setScope( scope );
							try {
								return getter.call( target );
							} finally {
								setScope( prevScope );
								resetNamespace();
							}
						} )
					);
				}
				return scope.getters.get( getter ).value;
			}
		}

		const result = Reflect.get( target, key, receiver );

		// Check if the property is a generator.
		if ( result?.constructor?.name === 'GeneratorFunction' ) {
			return async ( ...args ) => {
				const scope = getScope();
				const gen: Generator< any > = result( ...args );

				let value: any;
				let it: IteratorResult< any >;

				while ( true ) {
					const prevScope = getScope();
					setNamespace( ns );
					setScope( scope );
					try {
						it = gen.next( value );
					} finally {
						setScope( prevScope );
						resetNamespace();
					}
					value = await it.value;
					if ( it.done ) break;
				}

				return value;
			};
		}

		// Check if the property is a function.
		// Actions always run in the current scope.
		if ( typeof result === 'function' ) {
			return ( ...args ) => {
				setNamespace( ns );
				try {
					result( ...args );
				} finally {
					resetNamespace();
				}
			};
		}

		// Check if the property is an object.
		if ( isObject( result ) ) return proxify( result, ns );

		return result;
	},
};

/**
 * @typedef StoreProps Properties object passed to `store`.
 * @property {Object} state State to be added to the global store. All the
 *                          properties included here become reactive.
 */

/**
 * @typedef StoreOptions Options object.
 */

/**
 * Extends the Interactivity API global store with the passed properties.
 *
 * These props typically consist of `state`, which is reactive, and other
 * properties like `selectors`, `actions`, `effects`, etc. which can store
 * callbacks and derived state. These props can then be referenced by any
 * directive to make the HTML interactive.
 *
 * @example
 * ```js
 *  store({
 *    state: {
 *      counter: { value: 0 },
 *    },
 *    actions: {
 *      counter: {
 *        increment: ({ state }) => {
 *          state.counter.value += 1;
 *        },
 *      },
 *    },
 *  });
 * ```
 *
 * The code from the example above allows blocks to subscribe and interact with
 * the store by using directives in the HTML, e.g.:
 *
 * ```html
 * <div data-wp-interactive>
 *   <button
 *     data-wp-text="state.counter.value"
 *     data-wp-on--click="actions.counter.increment"
 *   >
 *     0
 *   </button>
 * </div>
 * ```
 *
 * @param {StoreProps}   properties Properties to be added to the global store.
 * @param {StoreOptions} [options]  Options passed to the `store` call.
 */

type DeepPartial< T > = T extends object
	? { [ P in keyof T ]?: DeepPartial< T[ P ] > }
	: T;

interface StoreOptions {}

export function store< S extends object = {} >(
	namespace: string,
	storePart?: DeepPartial< S >,
	options?: StoreOptions
): S;
export function store< T extends object >(
	namespace: string,
	storePart?: T,
	options?: StoreOptions
): T;

export function store(
	namespace: string,
	{ state = {}, ...block }: any = {},
	{}: StoreOptions = {}
) {
	if ( ! stores.has( namespace ) ) {
		stores.set(
			namespace,
			new Proxy( { state: deepSignal( state ), ...block }, handlers )
		);
		proxyToNs.set( stores.get( namespace ), namespace );
	} else {
		const target = stores.get( namespace );
		deepMerge( target, block );
		deepMerge( target.state, state );
	}

	return stores.get( namespace );
}

// Parse and populate the initial state.
Object.entries( parseInitialState() ).forEach( ( [ namespace, state ] ) => {
	store( namespace, { state } );
} );
