/**
 * Internal dependencies
 */
import {
	DEFAULT_PRODUCT_LIST_LAYOUT,
	getBlockMap,
} from '../../../blocks/products/base-utils';

/**
 * Maps a layout config into atomic components.
 *
 * @param {string} blockName Name of the parent block. Used to get extension children.
 * @param {object} product Product object to pass to atomic components.
 * @param {object[]} layoutConfig Object with component data.
 * @param {number} componentId Parent component ID needed for key generation.
 */
export const renderProductLayout = (
	blockName,
	product,
	layoutConfig,
	componentId
) => {
	if ( ! layoutConfig ) {
		layoutConfig = DEFAULT_PRODUCT_LIST_LAYOUT;
	}

	const blockMap = getBlockMap( blockName );

	return layoutConfig.map(
		( { name: layoutBlockName, props = {} }, index ) => {
			let children = [];

			if ( !! props.children && props.children.length > 0 ) {
				children = renderProductLayout(
					product,
					props.children,
					componentId
				);
			}

			const LayoutComponent = blockMap[ layoutBlockName ];

			if ( ! LayoutComponent ) {
				return null;
			}

			const productID = product.id || 0;
			const keyParts = [
				'layout',
				layoutBlockName,
				index,
				componentId,
				productID,
			];

			return (
				<LayoutComponent
					key={ keyParts.join( '_' ) }
					{ ...props }
					children={ children }
					product={ product }
				/>
			);
		}
	);
};
