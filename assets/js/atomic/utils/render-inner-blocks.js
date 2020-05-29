/**
 * External dependencies
 */
import { cloneElement, isValidElement } from '@wordpress/element';
import parse from 'html-react-parser';

/**
 * Internal dependencies
 */
import { getBlockMap } from './get-block-map';

/**
 * Replaces saved block HTML markup with Inner Block Components.
 *
 * @param {Object} props           Render props.
 * @param {Array}  props.children  Children/inner blocks to render.
 * @param {string} props.blockName Parent Block Name used to get the block map and for keys.
 * @param {number} props.depth     Depth of inner blocks being rendered.
 */
export const renderInnerBlocks = ( { children, blockName, depth = 1 } ) => {
	const blockMap = getBlockMap( blockName );

	return Array.from( children ).map( ( el, index ) => {
		const componentProps = {
			...el.dataset,
			key: `${ blockName }_${ depth }_${ index }`,
		};

		const componentChildren =
			el.children && el.children.length
				? renderInnerBlocks( {
						children: el.children,
						blockName,
						depth: depth + 1,
				  } )
				: null;

		const LayoutComponent =
			componentProps.blockName && blockMap[ componentProps.blockName ]
				? blockMap[ componentProps.blockName ]
				: null;

		if ( ! LayoutComponent ) {
			const element = parse( el.outerHTML );

			if ( isValidElement( element ) ) {
				return componentChildren
					? cloneElement( element, componentProps, componentChildren )
					: cloneElement( element, componentProps );
			}
			return null;
		}

		return (
			// eslint-disable-next-line react/jsx-key
			<LayoutComponent
				key={ `${ blockName }_${ index }` }
				{ ...componentProps }
			>
				{ componentChildren }
			</LayoutComponent>
		);
	} );
};
