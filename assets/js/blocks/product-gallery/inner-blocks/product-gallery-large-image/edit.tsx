/**
 * External dependencies
 */
import { WC_BLOCKS_IMAGE_URL } from '@woocommerce/block-settings';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { memo, useMemo } from '@wordpress/element';
import classNames from 'classnames';

const getInnerBlocksTemplate = () => {
	return [ [ 'woocommerce/product-gallery-large-image-next-previous' ] ];
};

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

/**
 * Internal dependencies
 */
import './editor.scss';
import { ProductGalleryContext } from '../../types';

export const Edit = ( {
	context,
}: {
	context: ProductGalleryContext;
} ): JSX.Element => {
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wc-block-product-gallery-large-image__inner-blocks',
		},
		{
			template: getInnerBlocksTemplate(),
			templateInsertUpdatesSelection: true,
		}
	);

	const previousNextImage = useMemo( () => {
		switch ( context.nextPreviousButtonsPosition ) {
			case 'insideTheImage':
				return {
					className: 'inside-image',
				};
			case 'outsideTheImage':
				return {
					className: 'outside-image',
				};
			case 'off':
				return {
					className: 'off',
				};
			default:
				return {
					className: 'off',
				};
		}
	}, [ context.nextPreviousButtonsPosition ] );

	const blockProps = useBlockProps( {
		className: classNames(
			'wc-block-editor-product-gallery_large-image',
			`wc-block-editor-product-gallery_large-image-next-previous--${ previousNextImage?.className }`
		),
	} );

	return (
		<div { ...blockProps }>
			<Placeholder />
			<div { ...innerBlocksProps } />
		</div>
	);
};
