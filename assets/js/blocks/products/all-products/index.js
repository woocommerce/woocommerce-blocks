/**
 * External dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Icon, grid } from '@wordpress/icons';
import '@woocommerce/atomic-blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import deprecated from './deprecated';
import Editor from './edit';
import defaults from './defaults';
import { getBlockClassName } from '../utils.js';

const { name } = metadata;
export { metadata, name };

export const settings = {
	icon: {
		src: (
			<Icon
				icon={ grid }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	/**
	 * Renders and manages the block.
	 *
	 * @param {Object} props Props to pass to block.
	 */
	edit( props ) {
		return <Editor { ...props } />;
	},
	// Save the props to post content.
	save( { attributes } ) {
		const dataAttributes = {};
		Object.keys( attributes )
			.sort()
			.forEach( ( key ) => {
				dataAttributes[ key ] = attributes[ key ];
			} );
		const data = {
			'data-attributes': JSON.stringify( dataAttributes ),
		};
		return (
			<div
				className={ getBlockClassName(
					'wc-block-all-products',
					attributes
				) }
				{ ...data }
			>
				<InnerBlocks.Content />
			</div>
		);
	},
	deprecated,
	defaults,
};

/**
 * Register and run the "All Products" block.
 */
registerBlockType( 'woocommerce/all-products', {
	...settings,
	/**
	 * Deprecation rule to handle the previous default rows which was 1 instead of 3.
	 */
	deprecated,
} );
