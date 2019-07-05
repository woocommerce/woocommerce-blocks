/**
 * Internal dependencies
 */
import './editor.scss';
import Block from './block.js';

export default function( { props } ) {
	console.log( props );
	return (
		<Block { ...props } isPreview />
	);
}
