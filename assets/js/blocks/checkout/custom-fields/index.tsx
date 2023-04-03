/**
 * External dependencies
 */
import { TemplateArray } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { useForcedLayout } from '../../cart-checkout-shared';

export const CustomFields = ( {
	block,
}: {
	// Name of the parent block.
	block: string;
} ): JSX.Element => {
	const templateField = {
		name: 'the_default_field_name',
		label: 'The default field',
		size: '',
		required: false,
	};

	const { 'data-block': clientId } = useBlockProps();
	const allowedBlocks = [ 'woocommerce/checkout-custom-field-block' ];
	const defaultTemplate = [
		[
			'woocommerce/checkout-custom-field-block',
			{
				section: 'shipping',
				field: templateField,
			},
			[],
		],
	] as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );

	return (
		<div className="wc-block-checkout__custom_fields">
			{ `Custom Fields section: ${ block }` }
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				template={ defaultTemplate }
			/>
		</div>
	);
};

export const CustomFieldsContent = (): JSX.Element => <InnerBlocks.Content />;
