/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';
import { TemplateArray } from '@wordpress/blocks';
import { allSettings } from '@woocommerce/settings';

export const Edit = (): JSX.Element | null => {
	const allStoredFields = allSettings.checkoutCustomFields || {};
	const allowedBlocks = [ 'woocommerce/checkout-custom-field-block' ];
	const section = 'shipping';
	const storedFields = allStoredFields[ section ] || [];

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

export const Save = ( { innerBlocks } ): JSX.Element => {
	const getParsedFields = () => {
		// This will contain the fields stored in the DB when the page was loaded.
		// Any changes made to the DB entry after page load won't be reflected here.
		const storedFields = allSettings.checkoutCustomFields || {};

		const parsedFields = innerBlocks.map( ( block ) => {
			return block.attributes;
		} );

		const shippingFields = {
			...storedFields,
			shipping: parsedFields,
		};

		return shippingFields;
	};

	const parsedFields = getParsedFields();

	dispatch( 'core/editor' ).editPost( {
		checkout_custom_fields: parsedFields,
	} );

	return <div { ...useBlockProps.save() }></div>;
};
