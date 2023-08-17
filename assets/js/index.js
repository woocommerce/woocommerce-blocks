/**
 * External dependencies
 */
import { getCategories, setCategories } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { woo } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';
import { dispatch } from '@wordpress/data';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import '../css/editor.scss';
import '../css/style.scss';
import './filters/block-list-block';
import './filters/get-block-attributes';
import './base/components/notice-banner/style.scss';

setCategories( [
	...getCategories().filter(
		( { slug } ) =>
			slug !== 'woocommerce' && slug !== 'woocommerce-product-elements'
	),
	{
		slug: 'woocommerce',
		title: __( 'WooCommerce', 'woo-gutenberg-products-block' ),
		icon: <Icon icon={ woo } />,
	},
	{
		slug: 'woocommerce-product-elements',
		title: __(
			'WooCommerce Product Elements',
			'woo-gutenberg-products-block'
		),
		icon: (
			<Icon
				icon={ woo }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
] );

// Gets editor notices injected into the client and dispatches them to the store.
const editorNotices = getSetting( 'editorNotices' );

if ( editorNotices ) {
	editorNotices.forEach( ( notice ) => {
		dispatch( 'core/notices' ).createNotice( notice.type, notice.content, {
			id: notice.id || null,
			isDismissible: notice.dismissible || false,
			actions: notice.actions || null,
		} );
	} );
}
