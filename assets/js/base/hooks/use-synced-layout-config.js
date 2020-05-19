/**
 * External dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { useEffect, useCallback, useRef } from '@wordpress/element';
import { getLayoutConfig } from '@woocommerce/atomic-utils';
import { useSelect } from '@wordpress/data';
import isShallowEqual from '@wordpress/is-shallow-equal';

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
		const updatedLayoutConfig = getLayoutConfig( currentInnerBlocks );

		if ( ! isShallowEqual( updatedLayoutConfig, layoutConfig ) ) {
			layoutConfig.current = updatedLayoutConfig;
		}
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
		layoutConfig: layoutConfig.current,
		resetLayout,
	};
};
