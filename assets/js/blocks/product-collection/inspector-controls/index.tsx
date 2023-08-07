/**
 * External dependencies
 */
import type { BlockEditProps } from '@wordpress/blocks';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { type ElementType, useMemo } from '@wordpress/element';
import { EditorBlock } from '@woocommerce/types';
import { addFilter } from '@wordpress/hooks';
import { ProductCollectionFeedbackPrompt } from '@woocommerce/editor-components/feedback-prompt';
import {
	enableAutoUpdate,
	revertMigration,
	getUpgradeStatus,
} from '@woocommerce/blocks/migration-products-to-product-collection';
import {
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanel as ToolsPanel,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import metadata from '../block.json';
import { ProductCollectionAttributes } from '../types';
import { setQueryAttribute } from '../utils';
import { DEFAULT_FILTERS, getDefaultSettings } from '../constants';
import UpgradeNotice from './upgrade-notice';
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

	const displayControlProps = {
		setAttributes: props.setAttributes,
		displayLayout: props.attributes.displayLayout,
	};

	const queryControlProps = {
		setQueryAttribute: setQueryAttributeBind,
		query,
	};

	return (
		<InspectorControls>
			<BlockControls>
				<DisplayLayoutControl { ...displayControlProps } />
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
				<ColumnsControl { ...displayControlProps } />
				<InheritQueryControl { ...queryControlProps } />
				{ displayQueryControls ? (
					<OrderByControl { ...queryControlProps } />
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
					<OnSaleControl { ...queryControlProps } />
					<StockStatusControl { ...queryControlProps } />
					<HandPickedProductsControl { ...queryControlProps } />
					<KeywordControl { ...queryControlProps } />
					<AttributesControl { ...queryControlProps } />
					<TaxonomyControls { ...queryControlProps } />
					<AuthorControl { ...queryControlProps } />
				</ToolsPanel>
			) : null }
			<ProductCollectionFeedbackPrompt />
		</InspectorControls>
	);
};

export default ProductCollectionInspectorControls;

// Trigger Auto Upgrade of Products only once when module is loaded.
// This triggers subscription but only if:
// - auto update is enabled
// - user haven't reverted the migration
// - no other subscription is in place
enableAutoUpdate();

const isProductCollection = ( blockName: string ) =>
	blockName === metadata.name;

const lessThanDaySinceUpdate = ( t: number ) => {
	// 1 day = 24h * 60m * 60s * 1000ms
	const dayFromT = t + 24 * 60 * 60 * 1000;
	return Date.now() < dayFromT;
};

const shouldDisplayUpgradeNotice = ( props ) => {
	const { attributes } = props;
	const { displayUpgradeNotice } = attributes;
	const { status, t } = getUpgradeStatus();

	return (
		displayUpgradeNotice &&
		status === 'notseen' &&
		lessThanDaySinceUpdate( t )
	);
};

export const withUpgradeNoticeControls =
	< T extends EditorBlock< T > >( BlockEdit: ElementType ) =>
	( props: BlockEditProps< ProductCollectionAttributes > ) => {
		if ( ! isProductCollection( props.name ) ) {
			return <BlockEdit { ...props } />;
		}

		const displayUpgradeNotice = shouldDisplayUpgradeNotice( props );
		return (
			<>
				{ displayUpgradeNotice && (
					<InspectorControls>
						{
							<UpgradeNotice
								revertMigration={ revertMigration }
							/>
						}
					</InspectorControls>
				) }
				<BlockEdit { ...props } />
			</>
		);
	};

addFilter(
	'editor.BlockEdit',
	'woocommerce/product-collection',
	withUpgradeNoticeControls
);
