import registerDirectives from './directives';
import { init } from './router';
import { runStoreCallbacks } from './store';

export { navigate } from './router';
export { store } from './store';

/**
 * Initialize the Interactivity API.
 */
document.addEventListener( 'DOMContentLoaded', async () => {
	registerDirectives();
	await init();
	runStoreCallbacks( 'afterLoad' );
	// eslint-disable-next-line no-console
	console.log( 'Interactivity API started' );
} );
