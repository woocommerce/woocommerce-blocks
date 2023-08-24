/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';

export interface Attributes {
	showLabel: boolean;
}

const Edit = ( props: BlockEditProps< Attributes > ) => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ [
					'woocommerce/attribute-filter',
					'woocommerce/price-filter',
					'woocommerce/rating-filter',
					'woocommerce/stock-filter',
					'woocommerce/filter-wrapper',
				] }
			/>
		</div>
	);
};

export default Edit;
