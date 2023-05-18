/**
 * External dependencies
 */
import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { isWpVersion } from '@woocommerce/settings';
import { select, subscribe } from '@wordpress/data';
import { isSiteEditorPage } from '@woocommerce/utils';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import icon from './icon';
import './variations';
import { ProductCollectionAttributes } from './types';

const ARCHIVE_PRODUCT_TEMPLATES = [
	'woocommerce/woocommerce//archive-product',
	'woocommerce/woocommerce//taxonomy-product_cat',
	'woocommerce/woocommerce//taxonomy-product_tag',
	'woocommerce/woocommerce//taxonomy-product_attribute',
	'woocommerce/woocommerce//product-search-results',
];

const registerProductCollection = (
	attributes: ProductCollectionAttributes
) => {
	registerBlockType( metadata.name, {
		...metadata,
		icon,
		attributes,
		edit,
		save,
	} );
};

if ( isExperimentalBuild() ) {
	if ( isWpVersion( '6.1', '>=' ) ) {
		const blockName = metadata.name;
		let currentTemplateId: string | undefined;

		subscribe( () => {
			const previousTemplateId = currentTemplateId;
			const store = select( 'core/edit-site' );
			currentTemplateId = store?.getEditedPostId();
			if ( previousTemplateId === currentTemplateId ) {
				return;
			}

			if ( isSiteEditorPage( store ) ) {
				const { attributes } = metadata;
				const productCollectionAttributes = {
					...attributes,
					query: {
						...attributes.query,
						default: {
							...attributes.query.default,
							inherit: ARCHIVE_PRODUCT_TEMPLATES.includes(
								currentTemplateId || ''
							),
						},
					},
				};

				unregisterBlockType( blockName );

				registerProductCollection( productCollectionAttributes );
			}
		}, 'core/edit-site' );

		let isBlockRegistered = false;
		subscribe( () => {
			if ( ! isBlockRegistered ) {
				isBlockRegistered = true;
				registerProductCollection( metadata.attributes );
			}
		}, 'core/edit-post' );
	}
}
