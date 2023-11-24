/**
 * Internal dependencies
 */
import type { RegisteredBlockComponent } from '~/types';

const registeredBlockComponents: Record<
	string,
	Record< string, RegisteredBlockComponent >
> = {};

export { registeredBlockComponents };
