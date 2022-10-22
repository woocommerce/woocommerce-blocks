/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { miniCart, miniCartBag, miniCartBasket } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
import { getSettingWithCoercion } from '@woocommerce/settings';
import { isString } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import edit from './edit';

// TODO: Determine if we need to update the inserter icon. If so, we can abstract this out elsewhere because it is repeated in the block.
const getIconSetting: string = getSettingWithCoercion(
	'miniCartIcon',
	'default',
	isString
);
const iconSettings: { [ key: string ]: JSX.Element } = {
	default: miniCart,
	miniCart,
	miniCartBasket,
	miniCartBag,
};

const settings: BlockConfiguration = {
	apiVersion: 2,
	title: __( 'Mini Cart', 'woo-gutenberg-products-block' ),
	icon: {
		src: (
			<Icon
				icon={ iconSettings[ getIconSetting ] }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Display a mini cart widget.',
		'woo-gutenberg-products-block'
	),
	supports: {
		html: false,
		multiple: false,
		color: true,
		typography: {
			fontSize: true,
			...( isFeaturePluginBuild() && {
				__experimentalFontFamily: true,
				__experimentalFontWeight: true,
			} ),
		},
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	attributes: {
		isPreview: {
			type: 'boolean',
			default: false,
			save: false,
		},
		addToCartBehaviour: {
			type: 'string',
			default: 'none',
		},
		hasHiddenPrice: {
			type: 'boolean',
			default: false,
		},
	},

	edit,

	save() {
		return null;
	},
};

registerBlockType( 'woocommerce/mini-cart', settings );
