/**
 * External dependencies
 */
import {
	useLayoutEffect,
	useRef,
	useCallback,
	useMemo,
} from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	createBlock,
	getBlockType,
	Block,
	AttributeSource,
	synchronizeBlocksWithTemplate,
	TemplateArray,
} from '@wordpress/blocks';
import { isEqual } from 'lodash';

const isBlockLocked = ( {
	attributes,
}: {
	attributes: Record< string, AttributeSource.Attribute >;
} ) => Boolean( attributes.lock?.remove || attributes.lock?.default?.remove );

/**
 * useForcedLayout hook
 *
 * Responsible for ensuring FORCED blocks exist in the inner block layout. Forced blocks cannot be removed.
 */
export const useForcedLayout = ( {
	clientId,
	registeredBlocks,
	defaultTemplate = [],
}: {
	// Client ID of the parent block.
	clientId: string;
	// An array of registered blocks that may be forced in this particular layout.
	registeredBlocks: Array< string >;
	// The default template for the inner blocks in this layout.
	defaultTemplate: TemplateArray;
} ): void => {
	const currentRegisteredBlocks = useRef( registeredBlocks );
	const currentDefaultTemplate = useRef( defaultTemplate );

	const { insertBlock, replaceInnerBlocks } = useDispatch(
		'core/block-editor'
	);

	const { innerBlocks, registeredBlockTypes } = useSelect(
		( select ) => {
			return {
				innerBlocks: select( 'core/block-editor' ).getBlocks(
					clientId
				),
				registeredBlockTypes: currentRegisteredBlocks.current.map(
					( blockName ) => getBlockType( blockName )
				),
			};
		},
		[ clientId, currentRegisteredBlocks.current ]
	);

	const appendBlock = useCallback(
		( block, position ) => {
			const newBlock = createBlock( block.name );
			insertBlock( newBlock, position, clientId, false );
		},
		[ clientId, insertBlock ]
	);

	const lockedBlockTypes = useMemo(
		() =>
			registeredBlockTypes.filter(
				( block: Block | undefined ) => block && isBlockLocked( block )
			),
		[ registeredBlockTypes ]
	) as Block[];

	/**
	 * If the current inner blocks differ from the registered blocks, push the differences.
	 */
	useLayoutEffect( () => {
		if ( ! clientId ) {
			return;
		}

		// If there are NO inner blocks, sync with the given template.
		if (
			innerBlocks.length === 0 &&
			currentDefaultTemplate.current.length > 0
		) {
			const nextBlocks = synchronizeBlocksWithTemplate(
				innerBlocks,
				currentDefaultTemplate.current
			);
			if ( ! isEqual( nextBlocks, innerBlocks ) ) {
				replaceInnerBlocks( clientId, nextBlocks );
				return;
			}
		}

		// Find registered locked blocks missing from Inner Blocks and append them.
		lockedBlockTypes.forEach( ( block ) => {
			if (
				innerBlocks.find(
					( { name }: { name: string } ) => name === block.name
				)
			) {
				return;
			}

			// Is the forced block part of the default template?
			const defaultTemplatePosition = currentDefaultTemplate.current.findIndex(
				( [ blockName ] ) => blockName === block.name
			);

			// Not part of the default template, so append at the end.
			if ( defaultTemplatePosition === -1 ) {
				appendBlock( block, innerBlocks.length );
				return;
			}

			// If in position 0, just prepend it.
			if ( defaultTemplatePosition === 0 ) {
				appendBlock( block, 0 );
				return;
			}

			// Looking at the default template, whats in the previous position?
			const previousBlock =
				currentDefaultTemplate.current[ defaultTemplatePosition - 1 ];

			// Find the previous block in the current layout and use it's position if possible.
			const previousBlockPosition = innerBlocks.findIndex(
				( { name }: { name: string } ) => name === previousBlock[ 0 ]
			);

			appendBlock(
				block,
				previousBlockPosition > -1
					? previousBlockPosition + 1
					: defaultTemplatePosition
			);
		} );
	}, [
		clientId,
		innerBlocks,
		lockedBlockTypes,
		replaceInnerBlocks,
		appendBlock,
	] );
};
