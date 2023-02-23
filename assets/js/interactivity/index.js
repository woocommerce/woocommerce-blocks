import registerDirectives from './directives';
import registerComponents from './components';
import { init } from './router';
export { store } from './store';
export { navigate } from './router';

/**
 * Initialize the initial vDOM.
 */
document.addEventListener( 'DOMContentLoaded', async () => {
	registerDirectives();
	registerComponents();
	await init();
	console.log( 'hydrated!' );
} );
