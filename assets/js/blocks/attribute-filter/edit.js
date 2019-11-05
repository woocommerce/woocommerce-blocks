/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/editor';
import {
	Placeholder,
	Disabled,
	PanelBody,
	ToggleControl,
	Button,
	Toolbar,
	withSpokenMessages,
} from '@wordpress/components';
import Gridicon from 'gridicons';
import { ATTRIBUTES } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import Block from './block.js';
import './editor.scss';
import { IconExternal } from '../../components/icons';
import { ADMIN_URL } from '@woocommerce/settings';
import ToggleButtonControl from '../../components/toggle-button-control';
import ProductAttributeControl from '@woocommerce/block-components/product-attribute-control';

const Edit = ( { attributes, setAttributes, debouncedSpeak } ) => {
	const [ isEditing, setIsEditing ] = useState( ! attributes.attributeId );

	const getBlockControls = () => {
		return (
			<BlockControls>
				<Toolbar
					controls={ [
						{
							icon: 'edit',
							title: __( 'Edit', 'woo-gutenberg-products-block' ),
							onClick: () => setIsEditing( ! isEditing ),
							isActive: isEditing,
						},
					] }
				/>
			</BlockControls>
		);
	};

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

	const renderEditMode = () => {
		const onDone = () => {
			setIsEditing( false );
			debouncedSpeak(
				__(
					'Showing attribute filter block preview.',
					'woo-gutenberg-products-block'
				)
			);
		};

		return (
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
				<div className="wc-block-attribute-filter__selection">
					<ProductAttributeControl onChange={ () => {} } />
					<Button isDefault onClick={ onDone }>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</Placeholder>
		);
	};

	return (
		<Fragment>
			{ 0 === ATTRIBUTES.length ? (
				noAttributesPlaceholder()
			) : (
				<Fragment>
					{ getBlockControls() }
					{ getInspectorControls() }
					{ isEditing ? (
						renderEditMode()
					) : (
						<Disabled>
							<Block attributes={ attributes } isPreview />
						</Disabled>
					) }
				</Fragment>
			) }
		</Fragment>
	);
};

export default withSpokenMessages( Edit );
