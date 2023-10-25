/**
 * External dependencies
 */
import { sort } from 'fast-sort';
import { __, sprintf, _n } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { Icon, category, external } from '@wordpress/icons';
import { SearchListControl } from '@woocommerce/editor-components/search-list-control';
import { getAdminLink, getSetting } from '@woocommerce/settings';
import BlockTitle from '@woocommerce/editor-components/block-title';
import classnames from 'classnames';
import { SearchListItem } from '@woocommerce/editor-components/search-list-control/types';
import { AttributeSetting } from '@woocommerce/types';
import {
	Placeholder,
	Disabled,
	PanelBody,
	ToggleControl,
	Button,
	ToolbarGroup,
	Notice,
	withSpokenMessages,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block';
import type { EditProps, GetNotice } from './types';
import { UpgradeNotice } from '../filter-wrapper/upgrade';
import { AttributesPlaceholder } from './placeholder';

const ATTRIBUTES = getSetting< AttributeSetting[] >( 'attributes', [] );

type AttributeSelectControlsProps = {
	isCompact: boolean;
	setAttributes: EditProps[ 'setAttributes' ];
	attributeId: number;
};

export const AttributeSelectControls = ( {
	isCompact,
	setAttributes,
	attributeId,
}: AttributeSelectControlsProps ) => {
	const messages = {
		clear: __( 'Clear selected attribute', 'woo-gutenberg-products-block' ),
		list: __( 'Product Attributes', 'woo-gutenberg-products-block' ),
		noItems: __(
			"Your store doesn't have any product attributes.",
			'woo-gutenberg-products-block'
		),
		search: __(
			'Search for a product attribute:',
			'woo-gutenberg-products-block'
		),
		selected: ( n: number ) =>
			sprintf(
				/* translators: %d is the number of attributes selected. */
				_n(
					'%d attribute selected',
					'%d attributes selected',
					n,
					'woo-gutenberg-products-block'
				),
				n
			),
		updated: __(
			'Product attribute search results updated.',
			'woo-gutenberg-products-block'
		),
	};

	const list = sort(
		ATTRIBUTES.map( ( item ) => {
			return {
				id: parseInt( item.attribute_id, 10 ),
				name: item.attribute_label,
			};
		} )
	).asc( 'name' );

	const onChange = ( selected: SearchListItem[] ) => {
		if ( ! selected || ! selected.length ) {
			return;
		}

		const selectedId = selected[ 0 ].id;
		const productAttribute = ATTRIBUTES.find(
			( attribute ) => attribute.attribute_id === selectedId.toString()
		);

		if ( ! productAttribute || attributeId === selectedId ) {
			return;
		}

		setAttributes( {
			attributeId: selectedId as number,
		} );
	};

	return (
		<SearchListControl
			className="woocommerce-product-attributes"
			list={ list }
			selected={ list.filter( ( { id } ) => id === attributeId ) }
			onChange={ onChange }
			messages={ messages }
			isSingle
			isCompact={ isCompact }
		/>
	);
};
