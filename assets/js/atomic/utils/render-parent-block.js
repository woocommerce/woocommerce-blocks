/**
 * External dependencies
 */
import { render } from 'react-dom';

/**
 * Internal dependencies
 */
import { renderInnerBlocks } from './render-inner-blocks';

/**
 * Renders a block component in the place of a specified set of selectors.
 *
 * @param {Object}   props                         Render props.
 * @param {Function} props.Block                   React component to use as a replacement.
 * @param {string}   props.selector                CSS selector to match the elements to replace.
 * @param {string}   [props.blockName]             Optional Block Name. Used for inner block component mapping.
 * @param {Function} [props.getProps ]             Function to generate the props object for the block.
 */
export const renderParentBlock = ( {
	Block,
	selector,
	blockName = '',
	getProps = () => {},
} ) => {
	const containers = document.querySelectorAll( selector );

	if ( containers.length ) {
		// Use Array.forEach for IE11 compatibility.
		Array.prototype.forEach.call( containers, ( el, i ) => {
			const props = getProps( el, i );
			const attributes = {
				...el.dataset,
				...props.attributes,
			};
			const children =
				el.children && el.children.length
					? renderInnerBlocks( {
							blockName,
							children: el.children,
					  } )
					: null;

			el.classList.remove( 'is-loading' );

			render(
				<Block
					{ ...props }
					attributes={ attributes }
					children={ children }
				/>,
				el
			);
		} );
	}
};
