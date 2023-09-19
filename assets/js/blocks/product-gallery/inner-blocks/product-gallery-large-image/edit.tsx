/**
 * External dependencies
 */
import { WC_BLOCKS_IMAGE_URL } from '@woocommerce/block-settings';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { memo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import largeImageNextPreviousButtonMetadata from '../product-gallery-large-image-next-previous/block.json';
import pagerMetadata from '../product-gallery-pager/block.json';
import './editor.scss';

const getInnerBlocksTemplate = () => [
	[ largeImageNextPreviousButtonMetadata.name ],
	[ pagerMetadata.name ],
];

const Placeholder = memo( () => {
	return (
		<div className="wc-block-editor-product-gallery-large-image">
			<img
				src={ `${ WC_BLOCKS_IMAGE_URL }block-placeholders/product-image-gallery.svg` }
				alt="Placeholder"
			/>
		</div>
	);
} );

export const Edit = (): JSX.Element => {
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wc-block-product-gallery-large-image__inner-blocks',
		},
		{
			template: getInnerBlocksTemplate(),
			templateInsertUpdatesSelection: true,
		}
	);
	const blockProps = useBlockProps( {
		className: 'wc-block-editor-product-gallery_large-image',
	} );

	return (
		<div { ...blockProps }>
			<Placeholder />
			<div { ...innerBlocksProps } />
		</div>
	);
};
