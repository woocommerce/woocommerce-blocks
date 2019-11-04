/**
 * External dependencies
 */
import { Disabled } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block.js';

export default function( { attributes } ) {
	return (
		<Disabled>
			<Block attributes={ attributes } isPreview />
		</Disabled>
	);
}
