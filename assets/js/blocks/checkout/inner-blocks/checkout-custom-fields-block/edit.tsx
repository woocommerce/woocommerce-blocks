/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { TemplateArray } from '@wordpress/blocks';

const templateField = {
	name: 'the_default_field_name',
	label: 'The default field',
	size: '',
	required: false,
};

const storedFields = [ templateField, templateField ];

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
