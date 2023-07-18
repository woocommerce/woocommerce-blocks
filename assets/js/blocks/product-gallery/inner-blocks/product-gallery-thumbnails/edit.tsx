/**
 * External dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
import type { BlockEditProps } from '@wordpress/blocks';
import { WC_BLOCKS_IMAGE_URL } from '@woocommerce/block-settings';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './editor.scss';
import { BlockSettings } from './block-settings';
// import { Attributes } from './types';

export const Edit = ( {
	attributes,
	setAttributes,
}: BlockEditProps< Attributes > ) => {
	const { layout = 'left', numberOfThumbnails = 3 } = attributes;
	const blockProps = useBlockProps( {
		className: classNames(
			'wc-block-editor-product-gallery-thumbnails',
			`wc-block-editor-product-gallery-thumbnails-${ layout }`
		),
	} );

	const Placeholder = () => {
		return (
			<>
				{ layout !== 'off' && (
					<div className="wc-block-editor-product-gallery-thumbnails">
						{ [ ...Array( numberOfThumbnails ).keys() ].map(
							( index ) => {
								return (
									<img
										key={ index }
										src={ `${ WC_BLOCKS_IMAGE_URL }block-placeholders/product-image-gallery.svg` }
										alt="Placeholder"
									/>
								);
							}
						) }
					</div>
				) }
			</>
		);
	};

	return (
		<>
			<div { ...blockProps }>
				<InspectorControls>
					<BlockSettings
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</InspectorControls>
				<Disabled>
					<Placeholder />
				</Disabled>
			</div>
		</>
	);
};
