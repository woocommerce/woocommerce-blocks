/**
 * Internal dependencies
 */
import { deepSignal } from './deepsignal';
import { deepMerge } from './utils';

const rawState = {};
window.wpx = { state: deepSignal( rawState ) };

export default ( { state, ...block } ) => {
	deepMerge( window.wpx, block );
	deepMerge( rawState, state );
};
