/**
 * Internal dependencies
 */
import withBrowserWindowProp from './with-browser-window-prop.js';

const withBrowserLocation = ( propMap ) =>
	withBrowserWindowProp( 'location', propMap );

export default withBrowserLocation;
