/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { useSelect, dispatch } from '@wordpress/data';
import { TemplateArray } from '@wordpress/blocks';
import { useState, useEffect } from '@wordpress/element';
import { PanelBody, Button } from '@wordpress/components';

const templateField = {
	name: 'the_default_field_name',
	label: 'The default field',
	size: '',
	required: false,
};

const storedFields = [ templateField, templateField ];

const FieldControls = (): JSX.Element => {
	const { 'data-block': clientId } = useBlockProps();

	const coreEditor = useSelect( ( select ) => select( 'core/editor' ) );

	const blockEditor = useSelect( ( select ) =>
		select( 'core/block-editor' )
	);

	const post = coreEditor?.getCurrentPost();

	const [ fields, setFields ] = useState( post.checkout_custom_fields );

	useEffect( () => {
		dispatch( 'core/editor' ).editPost( {
			checkout_custom_fields: fields,
		} );
	}, [ fields ] );

	const getParsedFields = () => {
		const parentBlock = blockEditor?.getBlock( clientId );
		const innerBlocks = parentBlock?.innerBlocks || [];

		const parsedFields = innerBlocks.map( ( block ) => {
			return block.attributes;
		} );

		const shippingFields = {
			shipping: parsedFields,
		};

		return shippingFields;
	};

	const handleChange = () => {
		const parsedFields = getParsedFields();
		setFields( parsedFields );
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __(
					'Save custom fields',
					'woo-gutenberg-products-block'
				) }
			>
				<p className="wc-block-checkout__controls-text">
					{ __(
						'Quick POC. This would happen when saving the page, not with this button.',
						'woo-gutenberg-products-block'
					) }
				</p>
				<Button variant="primary" onClick={ handleChange }>
					{ __( 'Save', 'woo-gutenberg-products-block' ) }
				</Button>
			</PanelBody>
		</InspectorControls>
	);
};

export const Edit = (): JSX.Element | null => {
	const allowedBlocks = [ 'woocommerce/checkout-custom-field-block' ];
	const section = 'shipping';

	const template = storedFields.map( ( field ) => [
		'woocommerce/checkout-custom-field-block',
		{
			section,
			field,
		},
		[],
	] ) as TemplateArray;

	return (
		<div>
			<FieldControls />
			<div className="wc-block-checkout__custom_fields">
				{ 'Custom Fields section' }

				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					template={ template }
				/>
			</div>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
