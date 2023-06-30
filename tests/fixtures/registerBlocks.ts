/**
 * Internal dependencies
 */
import * as AttributeFilter from '../../assets/js/blocks/attribute-filter';

/**
 * Function to get all the block-library blocks in an array
 */
const getAllBlocks = () => {
	const blocks = [ AttributeFilter ];
	return blocks.filter( Boolean );
};

/**
 * Function to register core blocks provided by the block editor.
 *
 * @param {Array} blocks An optional array of the core blocks being registered.
 */
export const registerWooBlocks = ( blocks = getAllBlocks() ) => {
	blocks.forEach( ( { init } ) => init() );
};
