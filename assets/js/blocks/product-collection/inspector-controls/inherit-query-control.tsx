/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { isSiteEditorPage } from '@woocommerce/utils';
import {
	ToggleControl,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ProductCollectionQuery } from '../types';

const ARCHIVE_PRODUCT_TEMPLATES = [
	'woocommerce/woocommerce//archive-product',
	'woocommerce/woocommerce//taxonomy-product_cat',
	'woocommerce/woocommerce//taxonomy-product_tag',
	'woocommerce/woocommerce//taxonomy-product_attribute',
	'woocommerce/woocommerce//product-search-results',
];

interface InheritQueryControlProps {
	setQueryAttribute: ( value: Partial< ProductCollectionQuery > ) => void;
	inherit: boolean | null;
}

const InheritQueryControl = ( {
	setQueryAttribute,
	inherit,
}: InheritQueryControlProps ) => {
	const editSiteStore = select( 'core/edit-site' );
	const isSiteEditor = isSiteEditorPage( editSiteStore );
	const currentTemplateId = editSiteStore?.getEditedPostId() as string;

	/**
	 * Set inherit value when Product Collection block is first added to the page.
	 * We want inherit value to be true when block is added to Product templates
	 * and false when added to somewhere else.
	 */
	if ( inherit === null ) {
		setQueryAttribute( {
			inherit: currentTemplateId
				? ARCHIVE_PRODUCT_TEMPLATES.includes( currentTemplateId )
				: false,
		} );
	}

	// Hide the control if not in site editor.
	if ( ! isSiteEditor ) {
		return null;
	}

	return (
		<ToolsPanelItem
			label={ __(
				'Inherit query from template',
				'woo-gutenberg-products-block'
			) }
			hasValue={ () => inherit !== null }
			isShownByDefault
			onDeselect={ () => {
				setQueryAttribute( {
					inherit: null,
				} );
			} }
		>
			<ToggleControl
				label={ __(
					'Inherit query from template',
					'woo-gutenberg-products-block'
				) }
				help={ __(
					'Toggle to use the global query context that is set with the current template, such as an archive or search. Disable to customize the settings independently.',
					'woo-gutenberg-products-block'
				) }
				checked={ !! inherit }
				onChange={ ( newInherit ) =>
					setQueryAttribute( {
						inherit: newInherit,
					} )
				}
			/>
		</ToolsPanelItem>
	);
};

export default InheritQueryControl;
