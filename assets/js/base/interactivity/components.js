/**
 * External dependencies
 */
import { useMemo } from 'preact/hooks';

/**
 * Internal dependencies
 */
import { deepSignal } from './deepsignal';
import { component } from './hooks';
import { getCallback } from './utils';

export default () => {
	const WpContext = ( { children, data, context: { Provider } } ) => {
		const signals = useMemo(
			() => deepSignal( JSON.parse( data ) ),
			[ data ]
		);
		return <Provider value={ signals }>{ children }</Provider>;
	};
	component( 'wp-context', WpContext );

	const WpShow = ( { children, when } ) => {
		const cb = getCallback( when );
		const value =
			typeof cb === 'function' ? cb( { state: window.wpx.state } ) : cb;
		if ( value ) {
			return children;
		} else {
			return <template>{ children }</template>;
		}
	};
	component( 'wp-show', WpShow );
};
