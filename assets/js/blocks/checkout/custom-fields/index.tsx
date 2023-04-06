/**
 * External dependencies
 */
import { TemplateArray } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { useForcedLayout } from '../../cart-checkout-shared';
import Frontend from '../inner-blocks/checkout-custom-field-block/frontend';

const templateField = {
	name: 'the_default_field_name',
	label: 'The default field',
	size: '',
	required: false,
};

const storedFields = [ templateField, templateField ];

export const CustomFields = ( {
	block,
}: {
	// Name of the parent block.
	block: string;
} ): JSX.Element => {
	const { 'data-block': clientId } = useBlockProps();
	const allowedBlocks = [ 'woocommerce/checkout-custom-field-block' ];

	const template = storedFields.map( ( field ) => [
		'woocommerce/checkout-custom-field-block',
		{
			section: 'shipping',
			field,
		},
		[],
	] ) as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate: template,
	} );

	return (
		<div className="wc-block-checkout__custom_fields">
			{ `Custom Fields section: ${ block }` }
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				template={ template }
			/>
		</div>
	);
};

export const CustomFieldsFrontend = ( {
	section,
}: {
	section: string;
} ): JSX.Element => {
	return (
		<div className="wc-block-checkout__custom_fields">
			{ `Custom Fields section` }
			{ storedFields.map( ( field, index ) => (
				<Frontend key={ index } field={ field } section={ section } />
			) ) }
		</div>
	);
};
