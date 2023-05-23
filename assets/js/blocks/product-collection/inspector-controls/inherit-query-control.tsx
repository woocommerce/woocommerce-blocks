/**
 * External dependencies
 */
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockEditProps } from '@wordpress/blocks';
import { usePrevious } from '@woocommerce/base-hooks';
import { select } from '@wordpress/data';
import { isSiteEditorPage } from '@woocommerce/utils';

/**
 * Internal dependencies
 */
import { ProductCollectionAttributes } from '../types';

const ARCHIVE_PRODUCT_TEMPLATES = [
	'woocommerce/woocommerce//archive-product',
	'woocommerce/woocommerce//taxonomy-product_cat',
	'woocommerce/woocommerce//taxonomy-product_tag',
	'woocommerce/woocommerce//taxonomy-product_attribute',
	'woocommerce/woocommerce//product-search-results',
];

const InheritQueryControl = (
	props: BlockEditProps< ProductCollectionAttributes >
) => {
	const { attributes, setAttributes } = props;
	const { inherit } = attributes.query;

	const queryObjectBeforeInheritEnabled = usePrevious(
		props.attributes.query,
		( value ) => {
			return value.inherit === false;
		}
	);

	const editSiteStore = select( 'core/edit-site' );
	const isSiteEditor = isSiteEditorPage( editSiteStore );
	const currentTemplateId = editSiteStore?.getEditedPostId() as string;

	/**
	 * Set inherit value when Product Collection block is first added to the page.
	 * We want inherit value to be true when block is added to Product templates
	 * and false when added to somewhere else.
	 */
	if ( attributes.query.inherit === undefined ) {
		setAttributes( {
			query: {
				...props.attributes.query,
				inherit: currentTemplateId
					? ARCHIVE_PRODUCT_TEMPLATES.includes( currentTemplateId )
					: false,
			},
		} );
	}

	// Hide the control if not in site editor.
	if ( ! isSiteEditor ) {
		return null;
	}

	return (
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
				setAttributes( {
					query: {
						...props.attributes.query,
						// Restore the query object value
						...( inherit === false && {
							...queryObjectBeforeInheritEnabled,
						} ),
						inherit: newInherit,
					},
				} )
			}
		/>
	);
};

export default InheritQueryControl;
