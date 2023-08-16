/**
 * External dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { BlockEditProps, InnerBlockTemplate } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	moveInnerBlocksToPosition,
	updateGroupBlockType,
	getInnerBlocksLockAttributes,
} from './utils';
import { ProductGalleryThumbnailsBlockSettings } from './inner-blocks/product-gallery-thumbnails/block-settings';
import { ProductGalleryBlockSettings } from './block-settings/index';
import type {
	ProductGalleryThumbnailsBlockAttributes,
	ProductGalleryBlockAttributes,
} from './types';
import { ProductGalleryNextPreviousBlockSettings } from './inner-blocks/product-gallery-large-image-next-previous/settings';
import { ProductGalleryNextPreviousBlockAttributes } from './inner-blocks/product-gallery-large-image-next-previous/types';

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
}: BlockEditProps<
	ProductGalleryThumbnailsBlockAttributes &
		ProductGalleryBlockAttributes &
		ProductGalleryNextPreviousBlockAttributes
> ) => {
	const blockProps = useBlockProps();

	// Update the Group block type when the thumbnailsPosition attribute changes.
	updateGroupBlockType( attributes, clientId );

	useEffect( () => {
		setAttributes( {
			...attributes,
			productGalleryClientId: clientId,
		} );
		// Move the Thumbnails block to the correct above or below the Large Image based on the thumbnailsPosition attribute.
		moveInnerBlocksToPosition( attributes, clientId );
	}, [ setAttributes, attributes, clientId ] );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<ProductGalleryThumbnailsBlockSettings
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
			<InspectorControls>
				<ProductGalleryBlockSettings
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>
			<InspectorControls>
				<ProductGalleryNextPreviousBlockSettings
					context={ {
						...attributes,
						productGalleryClientId: clientId,
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

export const Save = () => {
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <div { ...innerBlocksProps } />;
};
