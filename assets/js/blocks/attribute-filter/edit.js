/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import {
	Placeholder,
	Disabled,
	PanelBody,
	ToggleControl,
	Button,
} from '@wordpress/components';
import Gridicon from 'gridicons';
import { ATTRIBUTE_COUNT } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import Block from './block.js';
import './editor.scss';
import { IconExternal } from '../../components/icons';
import { ADMIN_URL } from '@woocommerce/settings';
import ToggleButtonControl from '../../components/toggle-button-control';

export default function( { attributes, setAttributes } ) {
	const getInspectorControls = () => {
		const { showCounts, displayStyle, queryType } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
				>
					<ToggleControl
						label={ __(
							'Product count',
							'woo-gutenberg-products-block'
						) }
						help={
							showCounts
								? __(
										'Product counts are visible.',
										'woo-gutenberg-products-block'
								  )
								: __(
										'Product counts are hidden.',
										'woo-gutenberg-products-block'
								  )
						}
						checked={ showCounts }
						onChange={ () =>
							setAttributes( {
								showCounts: ! showCounts,
							} )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __(
						'Block Settings',
						'woo-gutenberg-products-block'
					) }
				>
					<ToggleButtonControl
						label={ __(
							'Display Style',
							'woo-gutenberg-products-block'
						) }
						value={ displayStyle }
						options={ [
							{
								label: __(
									'List',
									'woo-gutenberg-products-block'
								),
								value: 'list',
							},
							{
								label: __(
									'Dropdown',
									'woo-gutenberg-products-block'
								),
								value: 'dropdown',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( {
								displayStyle: value,
							} )
						}
					/>
					<ToggleButtonControl
						label={ __(
							'Query Type',
							'woo-gutenberg-products-block'
						) }
						value={ queryType }
						options={ [
							{
								label: __(
									'And',
									'woo-gutenberg-products-block'
								),
								value: 'and',
							},
							{
								label: __(
									'Or',
									'woo-gutenberg-products-block'
								),
								value: 'or',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( {
								queryType: value,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
		);
	};

	const noAttributesPlaceholder = () => (
		<Placeholder
			className="wc-block-attribute-filter"
			icon={ <Gridicon icon="menus" /> }
			label={ __(
				'Filter Products by Attribute',
				'woo-gutenberg-products-block'
			) }
			instructions={ __(
				'Display a list of filters based on a chosen product attribute.',
				'woo-gutenberg-products-block'
			) }
		>
			<p>
				{ __(
					"Attributes are needed for filtering your products. You haven't created any products yet.",
					'woo-gutenberg-products-block'
				) }
			</p>
			<Button
				className="wc-block-attribute-filter__add_attribute_button"
				isDefault
				isLarge
				href={
					ADMIN_URL +
					'edit.php?post_type=product&page=product_attributes'
				}
			>
				{ __( 'Add new attribute', 'woo-gutenberg-products-block' ) +
					' ' }
				<IconExternal />
			</Button>
			<Button
				className="wc-block-attribute-filter__read_more_button"
				isTertiary
				href="https://docs.woocommerce.com/document/managing-product-taxonomies/"
			>
				{ __( 'Learn more', 'woo-gutenberg-products-block' ) }
			</Button>
		</Placeholder>
	);

	return (
		<Fragment>
			{ 0 === ATTRIBUTE_COUNT ? (
				noAttributesPlaceholder()
			) : (
				<Fragment>
					{ getInspectorControls() }
					<Disabled>
						<Block attributes={ attributes } isPreview />
					</Disabled>
				</Fragment>
			) }
		</Fragment>
	);
}
