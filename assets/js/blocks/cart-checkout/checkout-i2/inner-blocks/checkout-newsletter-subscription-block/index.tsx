/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, contact } from '@woocommerce/icons';
import { registerCheckoutBlock } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import { Edit, Save } from './edit';
import FrontendBlock from './frontend';

registerCheckoutBlock( 'woocommerce/checkout-newsletter-subscription-block', {
	component: FrontendBlock,
	areas: [ 'contactInformation' ],
	configuration: {
		title: __( 'Newsletter Subscription', 'woo-gutenberg-products-block' ),
		category: 'woocommerce',
		description: __(
			'Adds a newsletter subscription checkbox to the checkout.',
			'woo-gutenberg-products-block'
		),
		icon: {
			src: <Icon srcElement={ contact } />,
			foreground: '#874FB9',
		},
		supports: {
			align: false,
			html: false,
			multiple: true,
			reusable: false,
		},
		attributes: {},
		edit: Edit,
		save: Save,
	},
} );
