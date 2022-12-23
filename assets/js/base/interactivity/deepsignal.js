/**
 * External dependencies
 */
import { signal } from '@preact/signals';

const proxyToSignals = new WeakMap();
const objToProxy = new WeakMap();

export const deepSignal = ( obj ) => new Proxy( obj, handlers );
export const options = { returnSignal: /^\$/ };

const handlers = {
	get( target, prop, receiver ) {
		const returnSignal = options.returnSignal.test( prop );
		const key = returnSignal
			? prop.replace( options.returnSignal, '' )
			: prop;
		if ( ! proxyToSignals.has( receiver ) )
			proxyToSignals.set( receiver, new Map() );
		const signals = proxyToSignals.get( receiver );
		if ( ! signals.has( key ) ) {
			let val = Reflect.get( target, key, receiver );
			if ( typeof val === 'object' && val !== null ) {
				if ( ! objToProxy.has( val ) )
					objToProxy.set( val, new Proxy( val, handlers ) );
				val = objToProxy.get( val );
			}
			signals.set( key, signal( val ) );
		}
		return returnSignal ? signals.get( key ) : signals.get( key ).value;
	},

	set( target, prop, val, receiver ) {
		let internal = val;
		if ( typeof val === 'object' && val !== null ) {
			if ( ! objToProxy.has( val ) )
				objToProxy.set( val, new Proxy( val, handlers ) );
			internal = objToProxy.get( val );
		}
		if ( ! proxyToSignals.has( receiver ) )
			proxyToSignals.set( receiver, new Map() );
		const signals = proxyToSignals.get( receiver );
		if ( ! signals.has( prop ) ) signals.set( prop, signal( internal ) );
		else signals.get( prop ).value = internal;
		return Reflect.set( target, prop, val, receiver );
	},
};
