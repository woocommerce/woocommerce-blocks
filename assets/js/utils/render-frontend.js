/**
 * External dependencies
 */
import { render } from 'react-dom';
import { getSetting } from '@woocommerce/settings';
import { SCHEMA_STORE_KEY } from '@woocommerce/block-data';
import { useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';

/**
 * Hydrate Rest API data from settings to reduce the number of API requests needed.
 *
 * @param {mixed} children Child components.
 */
const HydrateRestApiData = ( { children } ) => {
	const restApiRoutes = useRef( getSetting( 'restApiRoutes' ) );

	useSelect( ( select, registry ) => {
		if ( ! restApiRoutes.current ) {
			return;
		}

		const { isResolving, hasFinishedResolution } = select(
			SCHEMA_STORE_KEY
		);
		const {
			receiveRoutes,
			startResolution,
			finishResolution,
		} = registry.dispatch( SCHEMA_STORE_KEY );

		Object.keys( restApiRoutes.current ).forEach( ( namespace ) => {
			const routes = restApiRoutes.current[ namespace ];
			if (
				! isResolving( 'getRoutes', [ namespace ] ) &&
				! hasFinishedResolution( 'getRoutes', [ namespace ] )
			) {
				startResolution( 'getRoutes', [ namespace ] );
				receiveRoutes( routes, [ namespace ] );
				finishResolution( 'getRoutes', [ namespace ] );
			}
		} );
	}, [] );

	return children;
};

/**
 * Renders a block component in the place of a specified set of selectors.
 *
 * @param {string}   selector   CSS selector to match the elements to replace.
 * @param {Function} Block      React block to use as a replacement.
 * @param {Function} [getProps] Function to generate the props object for the
 * block.
 */
export default ( selector, Block, getProps = () => {} ) => {
	const containers = document.querySelectorAll( selector );

	if ( containers.length ) {
		// Use Array.forEach for IE11 compatibility.
		Array.prototype.forEach.call( containers, ( el, i ) => {
			const props = getProps( el, i );
			const attributes = {
				...el.dataset,
				...props.attributes,
			};

			el.classList.remove( 'is-loading' );

			render(
				<BlockErrorBoundary>
					<HydrateRestApiData>
						<Block { ...props } attributes={ attributes } />
					</HydrateRestApiData>
				</BlockErrorBoundary>,
				el
			);
		} );
	}
};
