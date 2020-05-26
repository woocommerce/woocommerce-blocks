/**
 * Internal dependencies
 */
import { getBlockMap } from './get-block-map';

/**
 * Maps a layout config into atomic components.
 *
 * @param {string} blockName Name of the parent block. Used to get extension children.
 * @param {Object} product Product object to pass to atomic components.
 * @param {Object[]} layoutConfig Object with component data.
 * @param {number} componentId Parent component ID needed for key generation.
 */
export const renderProductLayout = (
	blockName,
	product,
	layoutConfig,
	componentId
) => {
	if ( ! layoutConfig ) {
		return;
	}

	const blockMap = getBlockMap( blockName );

	return layoutConfig.map(
		( [ name, { children = [], ...attributes } ], index ) => {
			let renderedChildren = [];

			if ( !! children && children.length > 0 ) {
				renderedChildren = renderProductLayout(
					blockName,
					product,
					children,
					componentId
				);
			}

			const LayoutComponent = blockMap[ name ];

			if ( ! LayoutComponent ) {
				return null;
			}

			const productID = product.id || 0;
			const keyParts = [ 'layout', name, index, componentId, productID ];

			return (
				<LayoutComponent
					key={ keyParts.join( '_' ) }
					attributes={ attributes }
					children={ renderedChildren }
					product={ product }
				/>
			);
		}
	);
};
