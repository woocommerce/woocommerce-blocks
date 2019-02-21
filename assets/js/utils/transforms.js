/**
 * External dependencies
 */
import { pick } from 'lodash';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import sharedAttributes from './shared-attributes';

export function makeTransform( toBlock, columns, defaultAttributes ) {
	return function transform( attributes ) {
		const transformAttributes = {
			...defaultAttributes,
			...pick( attributes, columns ),
		};
		return createBlock( toBlock, transformAttributes );
	};
}

export function makeSharedAttributesTransform( toBlock, defaultAttributes ) {
	return makeTransform( toBlock, Object.keys( sharedAttributes ), defaultAttributes );
}
