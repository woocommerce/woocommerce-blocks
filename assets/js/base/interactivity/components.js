/**
 * External dependencies
 */
import { useMemo } from 'preact/hooks';

/**
 * Internal dependencies
 */
import { deepSignal } from './deepsignal';
import { component } from './hooks';

export default () => {
	const WpContext = ( { children, data, context: { Provider } } ) => {
		const signals = useMemo(
			() => deepSignal( JSON.parse( data ) ),
			[ data ]
		);
		return <Provider value={ signals }>{ children }</Provider>;
	};
	component( 'wp-context', WpContext );
};
