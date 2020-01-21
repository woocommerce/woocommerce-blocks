/**
 * External dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
const { getBlockType } = wp.blocks;

/**
 *  withDefaultAttributes
 *
 *  Fixes a bug where block attribute "default values" are not saved in serialized data.
 *  Extend the default BlockListBlock component and apply default values allowing
 *  Gutenberg to serialize the settings (normally ignored).
 *
 *  @see		https://github.com/WordPress/gutenberg/issues/7342#issuecomment-435371583
 *
 *  @param	object BlockListBlock The BlockListBlock element.
 */
const withDefaultAttributes = createHigherOrderComponent(
	( BlockListBlock ) => {
		return function( props ) {
			const blockType = getBlockType( props.block.name );

			if ( blockType.name.startsWith( 'woocommerce/' ) ) {
				Object.keys( blockType.attributes ).map( ( key ) => {
					if (
						props.attributes[ key ] === undefined &&
						blockType.defaults !== undefined &&
						blockType.defaults[ key ] !== undefined
					) {
						props.attributes[ key ] = blockType.defaults[ key ];
					}
					return key;
				} );
			}

			return <BlockListBlock { ...props } />;
		};
	},
	'withDefaultAttributes'
);

export default withDefaultAttributes;
