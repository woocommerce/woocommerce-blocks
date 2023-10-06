/**
 * External dependencies
 */
import { deepSignal } from 'deepsignal';
import { computed } from '@preact/signals';
import {
	resetScope,
	getScope,
	setScope,
	setNamespace,
	resetNamespace,
} from './hooks';

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

const namespaces = new WeakMap();

const storeHandlers = {
	get: ( target, key, receiver ) => {
		const result = Reflect.get( target, key, receiver );

		if ( typeof result === 'undefined' ) {
			target[ key ] = {};
			return target[ key ];
		}

		const ns = namespaces.get( receiver );
		namespaces.set( result, ns );

		return result;
	},
};

const stateHandlers = {
	get: ( target, key, receiver ) => {
		const getter = Object.getOwnPropertyDescriptor( target, key )?.get;
		if ( getter ) {
			const scope = getScope();
			if ( scope ) {
				scope.getters = scope.getters || new Map();
				if ( ! scope.getters.has( getter ) ) {
					scope.getters.set(
						getter,
						computed( () => {
							setNamespace( namespaces.get( receiver ) );
							setScope( scope );
							const result = getter.call( target );
							// resetScope(); // maybe scope should be a stack?
							resetNamespace();
							return result;
						} )
					);
				}
				return scope.getters.get( getter ).value;
			}
		}
		const result = Reflect.get( target, key, receiver );
		return result;
	},
};

const actionHandlers = {
	get: ( target, key, receiver ) => {
		const result = Reflect.get( target, key, receiver );
		if ( result?.constructor?.name === 'GeneratorFunction' ) {
			return async ( ...args ) => {
				const scope = getScope();
				const gen = result( ...args );
				const iterate = async ( iteration ) => {
					resetScope();
					resetNamespace();
					if ( iteration.done ) return iteration.value;
					const res = await iteration.value;
					setNamespace( namespaces.get( receiver ) );
					setScope( scope );
					return await iterate( gen.next( res ) );
				};
				try {
					return iterate( gen.next() );
				} catch ( e ) {
					resetNamespace();
					resetScope();
					throw e;
				}
			};
		}
		if ( typeof result === 'function' ) {
			const scope = getScope();
			return ( ...args ) => {
				setNamespace( namespaces.get( receiver ) );
				setScope( scope );
				result( ...args );
				resetScope();
				resetNamespace();
			};
		}
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
	{ state = {}, actions = {}, ...block }: any = {},
	{}: StoreOptions = {}
) {
	if ( ! stores.has( namespace ) ) {
		stores.set(
			namespace,
			new Proxy(
				{
					state: new Proxy( deepSignal( state ), stateHandlers ),
					actions: new Proxy( actions, actionHandlers ),
					...block,
				},
				storeHandlers
			)
		);
		namespaces.set( stores.get( namespace ), namespace );
	} else {
		const target = stores.get( namespace );
		deepMerge( target, block );
		deepMerge( target.actions, actions );
		deepMerge( target.state, state );
	}

	return stores.get( namespace );
}

// Parse and populate the initial state.
Object.entries( parseInitialState() ).forEach( ( [ namespace, state ] ) => {
	store( namespace, { state } );
} );
