/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useContext } from '@wordpress/element';
import { useCheckoutAddress } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import { FormStepBlock } from '../../form-step';
import { CheckoutFieldsBlockContext } from '../checkout-fields-block/edit';
import Block from './block';

export const Edit = ( {
	attributes,
	context,
	setAttributes,
}: {
	attributes: {
		title: string;
		description: string;
		showStepNumber: boolean;
	};
	context: {
		'woocommerce/showCompanyField': boolean;
		'woocommerce/showApartmentField': boolean;
		'woocommerce/requireCompanyField': boolean;
		'woocommerce/showPhoneField': boolean;
		'woocommerce/requirePhoneField': boolean;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element | null => {
	const { controls: FieldControls } = useContext(
		CheckoutFieldsBlockContext
	);
	const { showBillingFields } = useCheckoutAddress();

	if ( ! showBillingFields ) {
		return null;
	}

	return (
		<FormStepBlock
			setAttributes={ setAttributes }
			attributes={ attributes }
			className="wc-block-checkout__billing-fields"
		>
			<FieldControls />
			<Block
				showCompanyField={ context[ 'woocommerce/showCompanyField' ] }
				showApartmentField={
					context[ 'woocommerce/showApartmentField' ]
				}
				requireCompanyField={
					context[ 'woocommerce/requireCompanyField' ]
				}
				showPhoneField={ context[ 'woocommerce/showPhoneField' ] }
				requirePhoneField={ context[ 'woocommerce/requirePhoneField' ] }
			/>
		</FormStepBlock>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
