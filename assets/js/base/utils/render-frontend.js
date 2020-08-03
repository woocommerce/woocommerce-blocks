/**
 * External dependencies
 */
import { render, Suspense } from '@wordpress/element';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';

// Some blocks take care of rendering their inner blocks automatically. For example,
// the empty cart. In those cases, we don't want to trigger the render functions of
// inner components on load. Instead, the wrapper block can trigger
// `wc-blocks_render_blocks_frontend` to render its inner blocks.
const selectorsToSkipOnLoad = [ '.wp-block-woocommerce-cart' ];

/**
 * Renders a block component in the place of a specified set of selectors.
 *
 * @param {Object}   props                         Render props.
 * @param {Function} props.Block                   React component to use as a replacement.
 * @param {string}   props.selector                CSS selector to match the elements to replace.
 * @param {Function} [props.getProps]              Function to generate the props object for the block.
 * @param {Function} [props.getErrorBoundaryProps] Function to generate the props object for the error boundary.
 * @param {string}   [props.parentSelectorsToSkip] If a parent element matches this selector, skip rendering.
 * @param {HTMLNode} [props.wrapper]               HTML Node to query the selector inside.
 */
const renderBlockFrontend = ( {
	Block,
	selector,
	getProps = () => {},
	getErrorBoundaryProps = () => {},
	parentSelectorsToSkip = [],
	wrapper = document,
} ) => {
	const containers = wrapper.querySelectorAll( selector );

	if ( containers.length ) {
		// @todo Remove Suspense compatibility fix once WP 5.2 is no longer supported.
		// If Suspense is not available (WP 5.2), use a noop component instead.
		const noopComponent = ( { children } ) => {
			return <>{ children }</>;
		};
		const SuspenseComponent = Suspense || noopComponent;

		// Use Array.forEach for IE11 compatibility.
		Array.prototype.forEach.call( containers, ( el, i ) => {
			if ( ! el.classList.contains( 'is-loading' ) ) {
				return;
			}
			for ( let j = 0; j < parentSelectorsToSkip.length; j++ ) {
				if ( el.parentNode.closest( parentSelectorsToSkip[ j ] ) ) {
					return;
				}
			}
			const props = getProps( el, i );
			const errorBoundaryProps = getErrorBoundaryProps( el, i );
			const attributes = {
				...el.dataset,
				...props.attributes,
			};
			el.classList.remove( 'is-loading' );

			render(
				<BlockErrorBoundary { ...errorBoundaryProps }>
					<SuspenseComponent
						fallback={ <div className="wc-block-placeholder" /> }
					>
						<Block { ...props } attributes={ attributes } />
					</SuspenseComponent>
				</BlockErrorBoundary>,
				el
			);
		} );
	}
};

/**
 * Adds the event listeners necessary to render the block frontend.
 *
 * @param {Object} props Render props.
 */
export const renderFrontend = ( props ) => {
	const wrapperSelectors = selectorsToSkipOnLoad.filter(
		// Filter out selectors which are not in page. We will use them later every time
		// we render the frontend of blocks, so better remove them early if they are
		// not in the current page.
		( selector ) => document.body.querySelector( selector )
	);
	renderBlockFrontend( {
		...props,
		parentSelectorsToSkip: wrapperSelectors,
	} );

	if ( wrapperSelectors.length > 0 ) {
		const wrappers = document.body.querySelectorAll(
			wrapperSelectors.join( ',' )
		);
		wrappers.forEach( ( wrapper ) => {
			wrapper.addEventListener(
				'wc-blocks_render_blocks_frontend',
				( e ) => {
					renderBlockFrontend( { ...props, wrapper: e.target } );
				}
			);
		} );
	}
};

export default renderFrontend;
