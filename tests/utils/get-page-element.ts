/**
 * External dependencies
 */
import { canvas } from '@wordpress/e2e-test-utils';

export const getPageElement = () => {
	const canvasEl = canvas();
	if ( canvasEl !== undefined || canvasEl !== null ) {
		return canvasEl;
	}
	return page;
};
