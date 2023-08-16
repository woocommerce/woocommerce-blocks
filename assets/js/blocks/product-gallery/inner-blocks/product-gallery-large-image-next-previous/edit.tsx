/**
 * External dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { NextButton, PrevButton } from './icons';
import './editor.scss';
import { ProductGalleryNextPreviousBlockSettings } from './settings';
import { Context } from '../../types';

export const Edit = ( { context }: { context: Context } ): JSX.Element => {
	const blockProps = useBlockProps();

	const suffixClass = useMemo( () => {
		switch ( context.nextPreviousButtonsPosition ) {
			case 'insideTheImage':
				return 'inside-image';
			case 'outsideTheImage':
				return 'outside-image';
			case 'off':
				return 'off';
			default:
				return 'off';
		}
	}, [ context.nextPreviousButtonsPosition ] );

	return (
		<div
			{ ...blockProps }
			style={ {
				width: '100%',
				height: '100px',
			} }
		>
			<InspectorControls>
				<ProductGalleryNextPreviousBlockSettings context={ context } />
			</InspectorControls>
			<div
				className={ `wc-block-product-gallery-large-image-next-previous-container` }
			>
				<PrevButton suffixClass={ suffixClass } />
				<NextButton suffixClass={ suffixClass } />
			</div>
		</div>
	);
};
