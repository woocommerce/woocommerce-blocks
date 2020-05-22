/**
 * External dependencies
 */
import { render } from 'react-dom';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import { cloneElement } from '@wordpress/element';
import parse from 'html-react-parser';

/**
 * Given some block attributes, gets attributes from the dataset or uses defaults.
 *
 * @param {Object} blockAttributes Object containing block attributes.
 * @param {Array} dataset Dataset from DOM.
 * @return {Array} Array of parsed attributes.
 */
export const getAttributesFromDataset = ( blockAttributes, dataset ) => {
	const attributes = [];

	Object.keys( blockAttributes ).forEach( ( key ) => {
		if ( typeof dataset[ key ] !== 'undefined' ) {
			switch ( blockAttributes[ key ].type ) {
				case 'boolean':
					attributes[ key ] = dataset[ key ] !== 'false';
					break;
				case 'number':
					attributes[ key ] = parseInt( dataset[ key ], 10 );
					break;
				case 'array':
				case 'object':
					attributes[ key ] = JSON.parse( dataset[ key ] );
					break;
				default:
					attributes[ key ] = dataset[ key ];
					break;
			}
		} else {
			attributes[ key ] = blockAttributes[ key ].default;
		}
	} );

	return attributes;
};

/**
 * Render Inner Block Components from markup.
 *
 * @param {Object}   props           Render props.
 * @param {Array} props.children  Child nodes.
 * @param {string}   props.keyPrefix Prefix for keys.
 * @param {Object}   props.blockMap  Child blocks will be mapped to components.
 */
const renderChildren = ( { children, blockMap, keyPrefix = '' } ) => {
	return Array.from( children ).map( ( el, index ) => {
		const componentChildren =
			el.children && el.children.length
				? renderChildren( {
						children: el.children,
						blockMap,
						keyPrefix: `${ keyPrefix }_${ index }`,
				  } )
				: null;

		const LayoutComponent =
			el.dataset.blockName && blockMap[ el.dataset.blockName ]
				? blockMap[ el.dataset.blockName ]
				: null;

		if ( ! LayoutComponent ) {
			const element = parse( el.outerHTML );
			const elementProps = {
				key: `${ keyPrefix }_${ index }`,
			};

			return componentChildren
				? cloneElement( element, elementProps, componentChildren )
				: cloneElement( element, elementProps );
		}

		return (
			// eslint-disable-next-line react/jsx-key
			<LayoutComponent
				key={ `${ keyPrefix }_${ index }` }
				attributes={ el.dataset }
			>
				{ componentChildren }
			</LayoutComponent>
		);
	} );
};

/**
 * Renders a block component in the place of a specified set of selectors.
 *
 * @param {Object}   props                         Render props.
 * @param {string}   props.selector                CSS selector to match the elements to replace.
 * @param {Function} props.Block                   React component to use as a replacement.
 * @param {Function} [props.getProps ]             Function to generate the props object for the block.
 * @param {Function} [props.getErrorBoundaryProps] Function to generate the props object for the error boundary.
 * @param {Object}   [props.blockMap]              If given, child blocks will be mapped to components.
 */
export const renderFrontend = ( {
	selector,
	Block,
	getProps = () => {},
	getErrorBoundaryProps = () => {},
	blockMap = null,
} ) => {
	const containers = document.querySelectorAll( selector );

	if ( containers.length ) {
		// Use Array.forEach for IE11 compatibility.
		Array.prototype.forEach.call( containers, ( el, i ) => {
			const props = getProps( el, i );
			const errorBoundaryProps = getErrorBoundaryProps( el, i );
			const attributes = {
				...el.dataset,
				...props.attributes,
			};
			const children =
				el.children && el.children.length && blockMap
					? renderChildren( {
							children: el.children,
							blockMap,
							keyPrefix: 'single-product',
					  } )
					: null;

			el.classList.remove( 'is-loading' );

			render(
				<BlockErrorBoundary { ...errorBoundaryProps }>
					<Block
						{ ...props }
						attributes={ attributes }
						children={ children }
					/>
				</BlockErrorBoundary>,
				el
			);
		} );
	}
};

export default renderFrontend;
