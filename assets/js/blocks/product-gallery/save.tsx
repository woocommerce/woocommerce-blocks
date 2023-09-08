/**
 * External dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getClassNameByNextPreviousButtonsPosition } from './utils';
import { ProductGalleryAttributes } from './types';

export const Save = ( {
	attributes,
}: {
	attributes: ProductGalleryAttributes;
} ): JSX.Element => {
	const blockProps = useBlockProps.save( {
		className: getClassNameByNextPreviousButtonsPosition(
			attributes.nextPreviousButtonsPosition
		),
	} );
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <div { ...innerBlocksProps } />;
};
