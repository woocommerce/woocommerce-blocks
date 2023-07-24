import { deepSignal } from 'deepsignal';

const isObject = ( item ) =>
	item && typeof item === 'object' && ! Array.isArray( item );

export const deepMerge = ( target, source ) => {
	if ( isObject( target ) && isObject( source ) ) {
		for ( const key in source ) {
			if ( isObject( source[ key ] ) ) {
				if ( ! target[ key ] ) Object.assign( target, { [ key ]: {} } );
				deepMerge( target[ key ], source[ key ] );
			} else {
				Object.assign( target, { [ key ]: source[ key ] } );
			}
		}
	}
};

const getSerializedState = () => {
	const storeTag = document.querySelector(
		`script[type="application/json"]#wc-interactivity-store-data`
	);
	if ( ! storeTag ) return {};
	try {
		const { state } = JSON.parse( storeTag.textContent );
		if ( isObject( state ) ) return state;
		throw Error( 'Parsed state is not an object' );
	} catch ( e ) {
		// eslint-disable-next-line no-console
		console.log( e );
	}
	return {};
};

const storeCallbacks = {};
const rawState = getSerializedState();
export const rawStore = { state: deepSignal( rawState ) };

if ( typeof window !== 'undefined' ) window.store = rawStore;

export const store = ( { state, ...block }, callbacks = {} ) => {
	deepMerge( rawStore, block );
	deepMerge( rawState, state );
	Object.entries( callbacks ).forEach( ( [ key, cb ] ) => {
		( storeCallbacks[ key ] = storeCallbacks[ key ] || [] ).push( cb );
	} );
};

export const runStoreCallbacks = ( key ) => {
	storeCallbacks[ key ]?.forEach( ( cb ) => cb( rawStore ) );
};
