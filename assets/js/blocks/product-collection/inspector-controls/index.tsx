/**
 * External dependencies
 */
import type { BlockEditProps } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ProductCollectionAttributes } from '../types';
import ColumnsControl from './columns-control';
import InheritQueryControl from './inherit-query-control';
import OrderByControl from './order-by-control';

const ProductCollectionInspectorControls = (
	props: BlockEditProps< ProductCollectionAttributes >
) => {
	const { inherit } = props.attributes.query;
	const displayQueryControls = ! inherit;

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings', 'woo-gutenberg-products-block' ) }
			>
				<ColumnsControl { ...props } />
				<InheritQueryControl { ...props } />
				{ displayQueryControls ? (
					<>
						{ /** Placeholder for controls modifying the query. */ }
					</>
				) : null }
				<OrderByControl { ...props } />
			</PanelBody>
		</InspectorControls>
	);
};

export default ProductCollectionInspectorControls;
