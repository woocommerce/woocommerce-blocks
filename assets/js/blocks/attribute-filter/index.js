/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock, registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
import { Icon, category } from '@wordpress/icons';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import edit from './edit.js';
import metadata from './block.json';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ category }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	supports: {
		...metadata.supports,
		...( isFeaturePluginBuild() && {
			__experimentalBorder: {
				radius: true,
				color: true,
				width: false,
			},
		} ),
	},
	attributes: {
		...metadata.attributes,
		// make-pot doesn't pick the default value of attribute for i18n.
		heading: {
			type: 'string',
			default: __(
				'Filter by attribute',
				'woo-gutenberg-products-block'
			),
		},
	},
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/legacy-widget' ],
				// We can't transform if raw instance isn't shown in the REST API.
				isMatch: ( { idBase, instance } ) =>
					idBase === 'woocommerce_layered_nav' && !! instance?.raw,
				transform: ( { instance } ) =>
					createBlock( 'woocommerce/attribute-filter', {
						attributeId: 0,
						showCounts: true,
						queryType: instance?.raw?.query_type || 'or',
						heading:
							instance?.raw?.title ||
							__(
								'Filter by attribute',
								'woo-gutenberg-products-block'
							),
						headingLevel: 3,
						displayStyle: instance?.raw?.display_type || 'list',
						showFilterButton: false,
						isPreview: false,
					} ),
			},
		],
	},
	edit,
	// Save the props to post content.
	save( { attributes } ) {
		const {
			className,
			showCounts,
			queryType,
			attributeId,
			heading,
			headingLevel,
			displayStyle,
			showFilterButton,
		} = attributes;
		const data = {
			'data-attribute-id': attributeId,
			'data-show-counts': showCounts,
			'data-query-type': queryType,
			'data-heading': heading,
			'data-heading-level': headingLevel,
		};
		if ( displayStyle !== 'list' ) {
			data[ 'data-display-style' ] = displayStyle;
		}
		if ( showFilterButton ) {
			data[ 'data-show-filter-button' ] = showFilterButton;
		}
		return (
			<div
				{ ...useBlockProps.save( {
					className: classNames( 'is-loading', className ),
				} ) }
				{ ...data }
			>
				<span
					aria-hidden
					className="wc-block-product-attribute-filter__placeholder"
				/>
			</div>
		);
	},
} );
