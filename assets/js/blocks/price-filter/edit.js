/**
 * External dependencies
 */
import { Disabled } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block.js';
import './editor.scss';

export default function( { attributes } ) {
	return (
		<Disabled>
			<Block attributes={ attributes } isPreview />
		</Disabled>
	);
}
