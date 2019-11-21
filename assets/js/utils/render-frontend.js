/**
 * External dependencies
 */
import { render } from 'react-dom';
import { getSetting } from '@woocommerce/settings';
import { SCHEMA_STORE_KEY } from '@woocommerce/block-data';
import { useEffect, useRef } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { forEach } from 'lodash';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';

/**
 * Hydrate Rest API data from settings to reduce the number of API requests needed.
 *
 * @param {mixed} children Child components.
 */
const HydrateRestApiData = ( { children } ) => {
	const { receiveRoutes, startResolution, finishResolution } = useDispatch(
		SCHEMA_STORE_KEY
	);
	const { isResolving, hasFinishedResolution } = useSelect( ( select ) => {
		const store = select( SCHEMA_STORE_KEY );
		return store;
	} );
	const RestApiRoutes = useRef( getSetting( 'restApiRoutes' ) );

	useEffect( () => {
		if ( RestApiRoutes.current ) {
			forEach( RestApiRoutes.current, ( routes, namespace ) => {
				if (
					! isResolving( 'getRoutes', [ namespace ] ) &&
					! hasFinishedResolution( 'getRoutes', [ namespace ] )
				) {
					startResolution( 'getRoutes', [ namespace ] );
					receiveRoutes( routes, [ namespace ] );
					finishResolution( 'getRoutes', [ namespace ] );
				}
			} );
		}
	}, [ RestApiRoutes ] );

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
		forEach( containers, ( el, i ) => {
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
