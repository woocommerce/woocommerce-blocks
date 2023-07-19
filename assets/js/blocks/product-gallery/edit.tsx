/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { InnerBlockTemplate } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';

export const Edit = ( { clientId, setAttributes } ): JSX.Element => {
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
	}, [ clientId ] );

	return (
		<div { ...blockProps }>
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

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};
