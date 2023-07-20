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

export const Edit = ( {
	clientId,
	attributes,
	setAttributes,
}: Props ): JSX.Element => {
	const TEMPLATE: InnerBlockTemplate[] = [
		[
			'core/group',
			{ layout: { type: 'flex' } },
			[
				[ 'woocommerce/product-gallery-large-image' ],
				[ 'woocommerce/product-gallery-thumbnails' ],
			],
		],
	];

	const blockProps = useBlockProps();

	useEffect( () => {
		setAttributes( { clientId } );
	}, [ clientId, setAttributes ] );

	function setGroupAttributes() {
		switch ( attributes.thumbnailsPosition ) {
			case 'bottom':
				return { type: 'flex', orientation: 'vertical' };
			default:
				return { type: 'flex', flexWrap: 'nowrap' };
		}
	}

	// Function to update the layout type
	const block = select( 'core/block-editor' ).getBlock( clientId );
	block.innerBlocks.forEach( ( innerBlock ) => {
		if ( innerBlock.name === 'core/group' ) {
			const updatedBlock = {
				...innerBlock,
				attributes: {
					...innerBlock.attributes,
					layout: setGroupAttributes(),
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
						dispatch( blockEditorStore ).moveBlocksDown(
							[ clientIdToMove ],
							groupBlock.clientId
						);
					} else {
						dispatch( blockEditorStore ).moveBlocksUp(
							[ clientIdToMove ],
							groupBlock.clientId
						);
					}
				}
			}
		}
	}, [ attributes.thumbnailsPosition, clientId ] );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<BlockSettings
					attributes={ attributes }
					setAttributes={ setAttributes }
					context={ attributes }
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
