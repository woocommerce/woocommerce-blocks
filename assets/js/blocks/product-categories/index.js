/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';
import edit from './edit.js';
import { IconFolder } from '../../components/icons';

registerBlockType( 'woocommerce/product-categories', {
	title: __( 'Product Categories List', 'woo-gutenberg-products-block' ),
	icon: {
		src: <IconFolder />,
		foreground: '#96588a',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Show your product categories as a list or dropdown.',
		'woo-gutenberg-products-block'
	),
	supports: {
		align: [ 'wide', 'full' ],
	},

	attributes: {
		/**
		 * Whether to show the product count in each category.
		 */
		hasCount: {
			type: 'boolean',
			default: true,
			source: 'attribute',
			selector: 'ul',
			attribute: 'data-has-count',
		},

		/**
		 * Whether to show empty categories in the list.
		 */
		hasEmpty: {
			type: 'boolean',
			default: false,
			source: 'attribute',
			selector: 'ul',
			attribute: 'data-has-empty',
		},

		/**
		 * Whether to display product categories as a dropdown (true) or list (false).
		 */
		isDropdown: {
			type: 'boolean',
			default: false,
			source: 'attribute',
			selector: 'ul',
			attribute: 'data-is-dropdown',
		},

		/**
		 * Whether the product categories should display with hierarchy.
		 */
		isHierarchical: {
			type: 'boolean',
			default: true,
			source: 'attribute',
			selector: 'ul',
			attribute: 'data-is-hierarchical',
		},
	},

	edit,

	/**
	 * Save the props to post content.
	 */
	save( { attributes } ) {
		const {
			hasCount,
			hasEmpty,
			isDropdown,
			isHierarchical,
		} = attributes;
		return (
			<ul data-has-count={ hasCount } data-has-empty={ hasEmpty } data-is-dropdown={ isDropdown } data-is-hierarchical={ isHierarchical } />
		);
	},
} );
