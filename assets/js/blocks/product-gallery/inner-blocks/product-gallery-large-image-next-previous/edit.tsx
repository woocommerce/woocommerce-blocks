/**
 * External dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';
import { BlockAttributes } from '@wordpress/blocks';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import {
	NextButtonInsideImage,
	NextButtonOutsideImage,
	PrevButtonInsideImage,
	PrevButtonOutsideImage,
} from './icons';
import './editor.scss';
import { ProductGalleryNextPreviousBlockSettings } from './settings';
import { ProductGalleryContext } from '../../types';

const getAlignmentStyle = ( alignment: string ): string => {
	switch ( alignment ) {
		case 'top':
			return 'flex-start';
		case 'center':
			return 'center';
		case 'bottom':
			return 'flex-end';
		default:
			return 'flex-end';
	}
};

export const Edit = ( {
	attributes,
	context,
}: {
	attributes: BlockAttributes;
	context: ProductGalleryContext;
} ): JSX.Element => {
	const blockProps = useBlockProps( {
		style: {
			width: '100%',
			alignItems: getAlignmentStyle(
				attributes.layout?.verticalAlignment
			),
		},
	} );

	const previousNextImage = useMemo( () => {
		switch ( context.nextPreviousButtonsPosition ) {
			case 'insideTheImage':
				return {
					PrevButtonImage: PrevButtonInsideImage,
					NextButtonImage: NextButtonInsideImage,
					classname: 'inside-image',
				};
			case 'outsideTheImage':
				return {
					PrevButtonImage: PrevButtonOutsideImage,
					NextButtonImage: NextButtonOutsideImage,
					classname: 'outside-image',
				};
			case 'off':
				return null;
			default:
				return null;
		}
	}, [ context.nextPreviousButtonsPosition ] );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<ProductGalleryNextPreviousBlockSettings context={ context } />
			</InspectorControls>
			<div
				className={ classNames(
					'wc-block-product-gallery-large-image-next-previous-container',
					`wc-block-product-gallery-large-image-next-previous--${ previousNextImage?.classname }`
				) }
			>
				{ previousNextImage?.PrevButtonImage && (
					<previousNextImage.PrevButtonImage />
				) }
				{ previousNextImage?.NextButtonImage && (
					<previousNextImage.NextButtonImage />
				) }
			</div>
		</div>
	);
};
