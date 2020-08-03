/**
 * External dependencies
 */
import { render, Suspense } from '@wordpress/element';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';

// Some blocks take care of rendering their inner blocks automatically. For example,
// the empty cart. In those cases, we don't want to trigger the render function of
// inner components on load. Instead, the wrapper block can trigger the event
// `wc-blocks_render_blocks_frontend` to render its inner blocks.
const selectorsToSkipOnLoad = [ '.wp-block-woocommerce-cart' ];

// Given an element and a list of wrappers, check if the element is inside at least
// one of the wrappers.
const isElementInsideWrappers = ( el, wrappers ) => {
	return Array.prototype.some.call(
		wrappers,
		( wrapper ) => wrapper.contains( el ) && ! wrapper.isSameNode( el )
	);
};

/**
 * Renders a block component in the place of a specified set of selectors.
 *
 * @param {Object}    props                         Render props.
 * @param {Function}  props.Block                   React component to use as a replacement.
 * @param {string}    props.selector                CSS selector to match the elements to replace.
 * @param {Function}  [props.getProps]              Function to generate the props object for the block.
 * @param {Function}  [props.getErrorBoundaryProps] Function to generate the props object for the error boundary.
 * @param {Element}   [props.wrapper]               Element to query the selector inside. Defaults to the document body.
 * @param {Element[]} [props.wrappersToSkip]        Don't render inner blocks of this parent.
 */
const renderBlockFrontend = ( {
	Block,
	selector,
	getProps = () => {},
	getErrorBoundaryProps = () => {},
	wrapper = document.body,
	wrappersToSkip = [],
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
			if (
				wrappersToSkip.length > 0 &&
				isElementInsideWrappers( el, wrappersToSkip )
			) {
				return;
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
	const wrappersToSkipOnLoad = document.body.querySelectorAll(
		selectorsToSkipOnLoad.join( ',' )
	);
	// Render on page load.
	renderBlockFrontend( {
		...props,
		wrappersToSkip: wrappersToSkipOnLoad,
	} );
	// Render wrappers inner blocks when the event `wc-blocks_render_blocks_frontend`
	// is triggered.
	Array.prototype.forEach.call( wrappersToSkipOnLoad, ( wrapper ) => {
		wrapper.addEventListener( 'wc-blocks_render_blocks_frontend', ( e ) => {
			renderBlockFrontend( { ...props, wrapper: e.target } );
		} );
	} );
};

export default renderFrontend;
