/**
 * External dependencies
 */
import type { BlockEditProps } from '@wordpress/blocks';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { ProductCollectionFeedbackPrompt } from '@woocommerce/editor-components/feedback-prompt';
import {
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanel as ToolsPanel,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ProductCollectionAttributes } from '../types';
import { setQueryAttribute } from '../utils';
import { DEFAULT_FILTERS, getDefaultSettings } from '../constants';
import ColumnsControl from './columns-control';
import InheritQueryControl from './inherit-query-control';
import OrderByControl from './order-by-control';
import OnSaleControl from './on-sale-control';
import StockStatusControl from './stock-status-control';
import KeywordControl from './keyword-control';
import AttributesControl from './attributes-control';
import TaxonomyControls from './taxonomy-controls';
import HandPickedProductsControl from './hand-picked-products-control';
import AuthorControl from './author-control';
import DisplayLayoutControl from './display-layout-control';

const ProductCollectionInspectorControls = (
	props: BlockEditProps< ProductCollectionAttributes >
) => {
	const query = props.attributes.query;
	const inherit = query?.inherit;
	const displayQueryControls = inherit === false;

	const setQueryAttributeBind = useMemo(
		() => setQueryAttribute.bind( null, props ),
		[ props ]
	);

	return (
		<InspectorControls>
			<BlockControls>
				<DisplayLayoutControl
					displayLayout={ props.attributes.displayLayout }
					setAttributes={ props.setAttributes }
				/>
			</BlockControls>
			<ToolsPanel
				label={ __( 'Settings', 'woo-gutenberg-products-block' ) }
				resetAll={ () => {
					const defaultSettings = getDefaultSettings(
						props.attributes
					);
					props.setAttributes( defaultSettings );
				} }
			>
				<ColumnsControl
					displayLayout={ props.attributes.displayLayout }
					setAttributes={ props.setAttributes }
				/>
				<InheritQueryControl
					setQueryAttribute={ setQueryAttributeBind }
					query={ query }
				/>
				{ displayQueryControls ? (
					<OrderByControl
						setAttributes={ props.setAttributes }
						query={ query }
					/>
				) : null }
			</ToolsPanel>

			{ displayQueryControls ? (
				<ToolsPanel
					label={ __( 'Filters', 'woo-gutenberg-products-block' ) }
					resetAll={ ( resetAllFilters: ( () => void )[] ) => {
						setQueryAttribute( props, DEFAULT_FILTERS );
						resetAllFilters.forEach( ( resetFilter ) =>
							resetFilter()
						);
					} }
					className="wc-block-editor-product-collection-inspector-toolspanel__filters"
				>
					<OnSaleControl
						setAttributes={ props.setAttributes }
						query={ query }
					/>
					<StockStatusControl
						setAttributes={ props.setAttributes }
						query={ query }
					/>
					<HandPickedProductsControl
						setQueryAttribute={ setQueryAttributeBind }
						selectedProductIds={
							query.woocommerceHandPickedProducts
						}
					/>
					<KeywordControl { ...props } />
					<AttributesControl
						woocommerceAttributes={
							query.woocommerceAttributes || []
						}
						setQueryAttribute={ setQueryAttributeBind }
					/>
					<TaxonomyControls
						setQueryAttribute={ setQueryAttributeBind }
						query={ query }
					/>
					<AuthorControl
						value={ query.author }
						setQueryAttribute={ setQueryAttributeBind }
					/>
				</ToolsPanel>
			) : null }
			<ProductCollectionFeedbackPrompt />
		</InspectorControls>
	);
};

export default ProductCollectionInspectorControls;
