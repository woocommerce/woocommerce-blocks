/**
 * Internal dependencies
 */
import withBrowserWindowProp from './with-browser-window-prop.js';

const withBrowserHistory = ( propMap ) =>
	withBrowserWindowProp( 'history', propMap );

export default withBrowserHistory;
