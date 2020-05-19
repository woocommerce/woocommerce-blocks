/**
 * External dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { useEffect, useCallback, useRef } from '@wordpress/element';
import { getLayoutConfig } from '@woocommerce/atomic-utils';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { useShallowEqual } from './use-shallow-equal';

/**
 * Updates layout configs from inner blocks when changes occur.
 */
export const useSyncedLayoutConfig = ( {
	clientId,
	initialLayoutConfig,
	defaultLayoutConfig,
} ) => {
	const firstMount = useRef( true );
	const layoutConfig = useRef( initialLayoutConfig );
	const { innerBlockContainer, replaceInnerBlocks } = useSelect(
		( select, { dispatch } ) => {
			const { getBlock } = select( 'core/block-editor' );
			const { replaceInnerBlocks: replaceInnerBlocksDispatch } = dispatch(
				'core/block-editor'
			);
			return {
				innerBlockContainer: getBlock( clientId ),
				replaceInnerBlocks: replaceInnerBlocksDispatch,
			};
		},
		[ clientId ]
	);

	const currentInnerBlocks = useShallowEqual(
		innerBlockContainer.innerBlocks
	);

	useEffect( () => {
		if ( firstMount.current ) {
			firstMount.current = false;
			return;
		}
		layoutConfig.current = getLayoutConfig( currentInnerBlocks );
	}, [ currentInnerBlocks ] );

	const resetLayout = useCallback( () => {
		replaceInnerBlocks(
			clientId,
			defaultLayoutConfig.map( ( [ name, attributes ] ) =>
				createBlock( name, attributes )
			),
			false
		);
	}, [ clientId, defaultLayoutConfig, replaceInnerBlocks ] );

	return {
		syncedLayoutConfig: layoutConfig.current,
		resetLayout,
	};
};
