/**
 * Internal dependencies
 */
import withBrowserLocation from '../with-browser-location';
import withBrowserWindowProp from '../with-browser-window-prop.js';

jest.mock( '../with-browser-window-prop.js', () => jest.fn() );

describe( 'withBrowserLocation Component', () => {
	it( 'calls withBrowserWindowProp with the correct arguments', () => {
		const propMap = jest.fn();
		withBrowserLocation( propMap );

		expect( withBrowserWindowProp ).toHaveBeenCalledTimes( 1 );
		expect( withBrowserWindowProp ).toHaveBeenCalledWith(
			'location',
			propMap
		);
	} );
} );
