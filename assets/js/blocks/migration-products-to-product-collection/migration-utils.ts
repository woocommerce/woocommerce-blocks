/**
 * External dependencies
 */
import { getSettingWithCoercion } from '@woocommerce/settings';
import { type BlockInstance } from '@wordpress/blocks';
import { select } from '@wordpress/data';
import { isBoolean } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { MIGRATION_STATUS_LS_KEY } from './constants';

type GetBlocksClientIds = ( blocks: BlockInstance[] ) => string[];
export type IsBlockType = ( block: BlockInstance ) => boolean;
export type TransformBlock = (
	block: BlockInstance,
	innerBlock: BlockInstance[]
) => BlockInstance;
export type ProductGridLayoutTypes = 'flex' | 'list';
export type PostTemplateLayoutTypes = 'grid' | 'default';

export type ProductGridLayout = {
	type: ProductGridLayoutTypes;
	columns: number;
};

export type PostTemplateLayout = {
	type: PostTemplateLayoutTypes;
	columnCount: number;
};
export type UpgradeNoticeStatus = {
	status: 'notseen' | 'seen' | 'reverted';
};

const isProductsBlock: IsBlockType = ( block ) =>
	block.name === 'core/query' &&
	block.attributes.namespace === 'woocommerce/product-query';

const isProductCollectionBlock: IsBlockType = ( block ) =>
	block.name === 'woocommerce/product-collection';

const getBlockClientIdsByPredicate = (
	blocks: BlockInstance[],
	predicate: ( block: BlockInstance ) => boolean
): string[] => {
	let clientIds: string[] = [];
	blocks.forEach( ( block ) => {
		if ( predicate( block ) ) {
			clientIds = [ ...clientIds, block.clientId ];
		}
		clientIds = [
			...clientIds,
			...getBlockClientIdsByPredicate( block.innerBlocks, predicate ),
		];
	} );
	return clientIds;
};

const getProductsBlockClientIds: GetBlocksClientIds = ( blocks ) =>
	getBlockClientIdsByPredicate( blocks, isProductsBlock );

const getProductCollectionBlockClientIds: GetBlocksClientIds = ( blocks ) =>
	getBlockClientIdsByPredicate( blocks, isProductCollectionBlock );

const checkIfBlockCanBeInserted = (
	clientId: string,
	blockToBeInserted: string
) => {
	// We need to duplicate checks that are happening within replaceBlocks method
	// as replacement is initially blocked and there's no information returned
	// that would determine if replacement happened or not.
	// https://github.com/WordPress/gutenberg/issues/46740
	const rootClientId =
		select( 'core/block-editor' ).getBlockRootClientId( clientId ) ||
		undefined;
	return select( 'core/block-editor' ).canInsertBlockType(
		blockToBeInserted,
		rootClientId
	);
};

const postTemplateHasSupportForGridView = getSettingWithCoercion(
	'post_template_has_support_for_grid_view',
	false,
	isBoolean
);

const defaultStatus: UpgradeNoticeStatus = {
	status: 'notseen',
};

const getUpgradeStatus = (): UpgradeNoticeStatus => {
	const status = window.localStorage.getItem( MIGRATION_STATUS_LS_KEY );
	return status ? JSON.parse( status ) : defaultStatus;
};

const setUpgradeStatus = ( newStatus: UpgradeNoticeStatus ) => {
	window.localStorage.setItem(
		MIGRATION_STATUS_LS_KEY,
		JSON.stringify( newStatus )
	);
};

export {
	getProductsBlockClientIds,
	getProductCollectionBlockClientIds,
	checkIfBlockCanBeInserted,
	postTemplateHasSupportForGridView,
	getUpgradeStatus,
	setUpgradeStatus,
};
