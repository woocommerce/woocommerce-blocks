/**
 * External dependencies
 */
import {
	BLOCK_ATTRIBUTES,
	INNER_BLOCKS_TEMPLATE,
} from '@woocommerce/blocks/product-query/variations/last-seen-products';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { InnerBlockTemplate } from '@wordpress/blocks';
import { Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.scss';

const Edit = () => {
	const TEMPLATE: InnerBlockTemplate[] = [
		[ 'core/query', BLOCK_ATTRIBUTES, INNER_BLOCKS_TEMPLATE ],
	];
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<Notice
					className={ 'wc-block-editor-last-seen-products__notice' }
					status={ 'warning' }
					isDismissible={ false }
				>
					<p>
						{ __(
							'These products will vary depending on the last visited products by the shopper.',
							'woo-gutenberg-products-block'
						) }
					</p>
				</Notice>
			</InspectorControls>
			<InnerBlocks template={ TEMPLATE } />
		</div>
	);
};

export default Edit;
