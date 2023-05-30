/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { isSiteEditorPage } from '@woocommerce/utils';
import { usePrevious } from '@woocommerce/base-hooks';
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
import { DEFAULT_QUERY } from '../constants';

const ARCHIVE_PRODUCT_TEMPLATES = [
	'woocommerce/woocommerce//archive-product',
	'woocommerce/woocommerce//taxonomy-product_cat',
	'woocommerce/woocommerce//taxonomy-product_tag',
	'woocommerce/woocommerce//taxonomy-product_attribute',
	'woocommerce/woocommerce//product-search-results',
];

const label = __(
	'Inherit query from template',
	'woo-gutenberg-products-block'
);

interface InheritQueryControlProps {
	setQueryAttribute: ( value: Partial< ProductCollectionQuery > ) => void;
	query: ProductCollectionQuery | undefined;
}

const InheritQueryControl = ( {
	setQueryAttribute,
	query,
}: InheritQueryControlProps ) => {
	const inherit = query?.inherit;
	const editSiteStore = select( 'core/edit-site' );
	const currentTemplateId = editSiteStore?.getEditedPostId() as string;

	const queryObjectBeforeInheritEnabled = usePrevious(
		query,
		( value?: ProductCollectionQuery ) => {
			return value?.inherit === false;
		}
	);

	/**
	 * Set inherit value when Product Collection block is first added to the page.
	 * We want inherit value to be true when block is added to ARCHIVE_PRODUCT_TEMPLATES
	 * and false when added to somewhere else.
	 */
	const initialValue = currentTemplateId
		? ARCHIVE_PRODUCT_TEMPLATES.includes( currentTemplateId )
		: false;
	if ( inherit === null ) {
		setQueryAttribute( {
			inherit: initialValue,
		} );
		return null;
	}

	// Hide the control if not in site editor.
	const isSiteEditor = isSiteEditorPage( editSiteStore );
	if ( ! isSiteEditor ) {
		return null;
	}

	return (
		<ToolsPanelItem
			label={ label }
			hasValue={ () => inherit !== initialValue }
			isShownByDefault
			onDeselect={ () => {
				setQueryAttribute( {
					inherit: null,
				} );
			} }
		>
			<ToggleControl
				label={ label }
				help={ __(
					'Toggle to use the global query context that is set with the current template, such as an archive or search. Disable to customize the settings independently.',
					'woo-gutenberg-products-block'
				) }
				checked={ !! inherit }
				onChange={ ( newInherit ) => {
					if ( newInherit ) {
						setQueryAttribute( {
							...DEFAULT_QUERY,
							inherit: newInherit,
						} );
					} else {
						setQueryAttribute( {
							...DEFAULT_QUERY,
							...queryObjectBeforeInheritEnabled,
							inherit: newInherit,
						} );
					}
				} }
			/>
		</ToolsPanelItem>
	);
};

export default InheritQueryControl;
