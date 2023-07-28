/**
 * External dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { BlockAttributes, InnerBlockTemplate } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	moveInnerBlocksToPosition,
	updateGroupBlockType,
	getInnerBlocksLockAttributes,
} from './utils';
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
			[
				'woocommerce/product-gallery-thumbnails',
				getInnerBlocksLockAttributes( 'lock' ),
			],
			[
				'woocommerce/product-gallery-large-image',
				getInnerBlocksLockAttributes( 'lock' ),
			],
		],
	],
];

export const Edit = ( {
	clientId,
	attributes,
	setAttributes,
}: Props ): JSX.Element => {
	const blockProps = useBlockProps();

	useEffect( () => {
		setAttributes( {
			productGalleryClientId: clientId,
		} );
		// Move the Thumbnails block to the correct above or below the Large Image based on the thumbnailsPosition attribute.
		moveInnerBlocksToPosition( attributes, clientId );
	}, [ attributes, clientId ] );

	// Update the Group block type when the thumbnailsPosition attribute changes.
	updateGroupBlockType( attributes, clientId );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<BlockSettings
					attributes={ attributes }
					setAttributes={ setAttributes }
					context={ {
						productGalleryClientId: clientId,
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
