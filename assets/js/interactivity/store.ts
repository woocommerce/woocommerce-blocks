/**
 * External dependencies
 */
import { deepSignal } from 'deepsignal';
import { computed } from '@preact/signals';
import { resetScope, getScope, setScope } from './hooks';

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

export const afterLoads = new Set();
export const stores = new Map();
export const privateStores = new Map();

const storeHandlers = {
	get: ( target, key, receiver ) => {
		const result = Reflect.get( target, key, receiver );

		if ( typeof result === 'undefined' ) {
			target[ key ] = {};
			return target[ key ];
		}

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
							setScope( scope );
							const result = getter.call( target );
							// resetScope(); // maybe scope should be a stack?
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
					if ( iteration.done ) return iteration.value;
					const res = await iteration.value;
					setScope( scope );
					return await iterate( gen.next( res ) );
				};
				try {
					return iterate( gen.next() );
				} catch ( e ) {
					resetScope();
					throw e;
				}
			};
		}
		if ( typeof result === 'function' ) {
			const scope = getScope();
			return ( ...args ) => {
				setScope( scope );
				result( ...args );
				resetScope();
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
 * @property {(store:any) => void} [afterLoad] Callback to be executed after the
 *                                             Interactivity API has been set up
 *                                             and the store is ready. It
 *                                             receives the store as argument.
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

interface StoreOptions {
	afterLoad?: () => any;
}

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
	{ afterLoad }: StoreOptions = {}
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
	} else {
		const target = stores.get( namespace );
		deepMerge( target, block );
		deepMerge( target.actions, actions );
		deepMerge( target.state, state );
	}

	if ( afterLoad ) afterLoads.add( afterLoad );

	return stores.get( namespace );
}

interface PrivateStoreOptions extends StoreOptions {
	unlock?: Symbol | typeof privateStoreConsent;
}

const privateStoreConsent =
	'I know using a private store means my plugin will inevitably break on the next store release.';

export function privateStore(
	namespace: string,
	{ state = {}, actions = {}, unlock: _, ...block }: any = {},
	{ afterLoad, unlock }: PrivateStoreOptions = {}
) {
	if ( ! privateStores.has( namespace ) ) {
		privateStores.set(
			namespace,
			new Proxy(
				{
					state: deepSignal( state ),
					actions: new Proxy( actions, actionHandlers ),
					...block,
					unlock: Symbol( `privateStore(${ namespace })` ),
				},
				storeHandlers
			)
		);
	} else {
		const target = privateStores.get( namespace );
		if ( unlock !== target.unlock && unlock !== privateStoreConsent ) {
			throw new Error();
		}

		deepMerge( target, block );
		deepMerge( target.actions, actions );
		deepMerge( target.state, state );
	}

	if ( afterLoad ) afterLoads.add( afterLoad );

	return privateStores.get( namespace );
}

// Parse and populate the initial state.
Object.entries( parseInitialState() ).forEach( ( [ namespace, state ] ) => {
	store( namespace, { state } );
} );
