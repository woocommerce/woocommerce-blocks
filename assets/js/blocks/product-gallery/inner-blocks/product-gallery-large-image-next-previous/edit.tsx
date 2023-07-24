/**
 * External dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { BlockSettings } from './settings';
import { BlockAttributes } from './types';
import { NextButton, PrevButton } from './icons';
import './editor.scss';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributes;
	setAttributes: ( newAttributes: BlockAttributes ) => void;
} ): JSX.Element => {
	const blockProps = useBlockProps();

	const suffixClass = useMemo( () => {
		switch ( attributes.buttonPosition ) {
			case 'insideTheImage':
				return 'inside-image';
			case 'outsideTheImage':
				return 'outside-image';
			case 'off':
				return 'off';
			default:
				return 'off';
		}
	}, [ attributes.buttonPosition ] );

	return (
		<div
			{ ...blockProps }
			style={ {
				width: '100%',
				height: '100px',
			} }
		>
			<InspectorControls>
				<BlockSettings
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
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
