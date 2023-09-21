/**
 * Internal dependencies
 */
import { IncompatibilityState } from './default-state';

export const getIncompatibleExtensions = (
	state: IncompatibilityState
): IncompatibilityState[ 'extensions' ] => state.extensions;
