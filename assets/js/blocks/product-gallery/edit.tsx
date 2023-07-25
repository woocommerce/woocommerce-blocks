/**
 * External dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { BlockAttributes, InnerBlockTemplate } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { BlockSettings } from './inner-blocks/product-gallery-thumbnails/block-settings';

interface Props {
	clientId: string;
	attributes: BlockAttributes;
	setAttributes: ( attributes: BlockAttributes ) => void;
}

const TEMPLATE: InnerBlockTemplate[] = [
	[
		'core/group',
		{ layout: { type: 'flex' } },
		[
			[ 'woocommerce/product-gallery-thumbnails' ],
			[ 'woocommerce/product-gallery-large-image' ],
		],
	],
];

function setGroupAttributes( thumbnailsPosition: string ) {
	switch ( thumbnailsPosition ) {
		case 'bottom':
			return { type: 'flex', orientation: 'vertical' };
		default:
			return { type: 'flex', flexWrap: 'nowrap' };
	}
}

export const Edit = ( {
	clientId,
	attributes,
	setAttributes,
}: Props ): JSX.Element => {
	const blockProps = useBlockProps();

	useEffect( () => {
		setAttributes( { clientId } );
	}, [ clientId, setAttributes ] );

	const block = select( 'core/block-editor' ).getBlock( clientId );
	block?.innerBlocks.forEach( ( innerBlock ) => {
		if ( innerBlock.name === 'core/group' ) {
			const updatedBlock = {
				...innerBlock,
				attributes: {
					...innerBlock.attributes,
					layout: setGroupAttributes( attributes.thumbnailsPosition ),
				},
			};
			dispatch( 'core/block-editor' ).updateBlock(
				innerBlock.clientId,
				updatedBlock
			);
		}
	} );

	useEffect( () => {
		const parentBlock = select( 'core/block-editor' ).getBlock( clientId );

		if ( parentBlock?.name === 'woocommerce/product-gallery' ) {
			const groupBlock = parentBlock.innerBlocks.find(
				( innerBlock ) => innerBlock.name === 'core/group'
			);

			if ( groupBlock ) {
				const thumbnailsIndex = groupBlock.innerBlocks.findIndex(
					( innerBlock ) =>
						innerBlock.name ===
						'woocommerce/product-gallery-thumbnails'
				);

				const largeImageIndex = groupBlock.innerBlocks.findIndex(
					( innerBlock ) =>
						innerBlock.name ===
						'woocommerce/product-gallery-large-image'
				);

				if ( thumbnailsIndex !== -1 && largeImageIndex !== -1 ) {
					const { thumbnailsPosition } = attributes;
					const clientIdToMove =
						groupBlock.innerBlocks[ thumbnailsIndex ].clientId;

					if (
						thumbnailsPosition === 'bottom' ||
						thumbnailsPosition === 'right'
					) {
						// @ts-expect-error - Ignoring because `moveBlocksDown` is not yet in the type definitions.
						dispatch( blockEditorStore ).moveBlocksDown(
							[ clientIdToMove ],
							groupBlock.clientId
						);
					} else {
						// @ts-expect-error - Ignoring because `moveBlocksUp` is not yet in the type definitions.
						dispatch( blockEditorStore ).moveBlocksUp(
							[ clientIdToMove ],
							groupBlock.clientId
						);
					}
				}
			}
		}
	}, [ attributes, clientId ] );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<BlockSettings
					attributes={ attributes }
					setAttributes={ setAttributes }
					context={ {
						clientId,
						thumbnailsPosition: attributes.thumbnailsPosition,
						thumbnailsNumberOfThumbnails:
							attributes.thumbnailsNumberOfThumbnails,
					} }
				/>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={ [
					'woocommerce/product-gallery-large-image',
					'woocommerce/product-gallery-thumbnails',
				] }
				template={ TEMPLATE }
			/>
		</div>
	);
};
