/**
 * External dependencies
 */
import {
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { MutableRefObject } from 'react';
import { BACKSPACE, DELETE } from '@wordpress/keycodes';

/**
 * @todo Delete hacks file when we support WP 5.9
 * This file contains hacks to lock blocks, it should be kept until we support WordPress 5.9.
 *
 */

/**
 * This components watchs for the currenctly selected block and adds a block to the body if that block is locked.
 * If the current block is not locked, it would remove that class.
 * We use that class in CSS to hide some UI elements that prevents the block from being deleted.
 *
 * We use a component so we can react to changes in the store.
 */
export const AddCurrentlySelectedBlockClass = (): null => {
	const selectedBlockType = useSelect( ( select ) => {
		const { getSelectedBlock } = select( blockEditorStore );
		const { getBlockType } = select( blocksStore );
		if ( getSelectedBlock() ) {
			return getBlockType( getSelectedBlock().name );
		}
	}, [] );
	useEffect( () => {
		if ( selectedBlockType && selectedBlockType?.supports?.lock?.remove ) {
			window.document.body.classList.add(
				'wc-lock-selected-block-from-remove'
			);
		} else {
			window.document.body.classList.remove(
				'wc-lock-selected-block-from-remove'
			);
		}

		if ( selectedBlockType && selectedBlockType?.supports?.lock?.move ) {
			window.document.body.classList.add(
				'wc-lock-selected-block-from-move'
			);
		} else {
			window.document.body.classList.remove(
				'wc-lock-selected-block-from-move'
			);
		}
	}, [ selectedBlockType ] );
	return null;
};

/**
 * This is a hook we use in conjection with useBlockProps. Its goal is to check if a block is locked (move or remove) and would stop the keydown event from propagating to stop it from being deleted via the keyboard.
 *
 */
const useLockBlock = ( {
	clientId,
	ref,
	type,
}: {
	clientId: string;
	ref: MutableRefObject< Element >;
	type: string;
} ): void => {
	const { isSelected, blockType } = useSelect(
		( select ) => {
			return {
				isSelected: select( blockEditorStore ).isBlockSelected(
					clientId
				),
				blockType: select( blocksStore ).getBlockType( type ),
			};
		},
		[ clientId ]
	);

	const node = ref.current;
	return useEffect( () => {
		if ( ! isSelected ) {
			return;
		}
		function onKeyDown( event: KeyboardEvent ) {
			const { keyCode, target } = event;
			if ( keyCode !== BACKSPACE && keyCode !== DELETE ) {
				return;
			}

			if ( target !== node ) {
				return;
			}

			// Prevent the keyboard event from propogating if it supports locking.
			if ( blockType?.supports?.lock?.remove ) {
				event.preventDefault();
				event.stopPropagation();
			}
		}

		node.addEventListener( 'keydown', onKeyDown, true );

		return () => {
			node.removeEventListener( 'keydown', onKeyDown, true );
		};
	}, [ node, isSelected, blockType ] );
};

/**
 * This hook is a light wrapper to useBlockProps, it wraps that hook plus useLockBlock to pass data between them.
 */
export const useBlockPropsWithLocking = (): Record< string, unknown > => {
	const ref = useRef< Element >();
	const blockProps = useBlockProps( { ref } );
	useLockBlock( {
		ref,
		type: blockProps[ 'data-type' ],
		clientId: blockProps[ 'data-block' ],
	} );
	return blockProps;
};
