/**
 * Internal dependencies
 */
import withBrowserHistory from '../with-browser-history';
import withBrowserWindowProp from '../with-browser-window-prop.js';

jest.mock( '../with-browser-window-prop.js', () => jest.fn() );

describe( 'withBrowserHistory Component', () => {
	it( 'calls withBrowserWindowProp with the correct arguments', () => {
		const propMap = jest.fn();
		withBrowserHistory( propMap );

		expect( withBrowserWindowProp ).toHaveBeenCalledTimes( 1 );
		expect( withBrowserWindowProp ).toHaveBeenCalledWith(
			'history',
			propMap
		);
	} );
} );
