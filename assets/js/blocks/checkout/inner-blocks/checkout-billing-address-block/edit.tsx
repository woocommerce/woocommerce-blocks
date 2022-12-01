/**
 * External dependencies
 */
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { useCheckoutAddress } from '@woocommerce/base-context/hooks';
import { innerBlockAreas } from '@woocommerce/blocks-checkout';
/**
 * Internal dependencies
 */
import {
	FormStepBlock,
	AdditionalFields,
	AdditionalFieldsContent,
} from '../../form-step';
import {
	useCheckoutBlockContext,
	useCheckoutBlockControlsContext,
} from '../../context';
import Block from './block';
import {
	DEFAULT_TITLE,
	DEFAULT_DESCRIPTION,
	DEFAULT_FORCED_BILLING_DESCRIPTION,
	DEFAULT_FORCED_BILLING_TITLE,
} from './constants';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		title: string;
		description: string;
		showStepNumber: boolean;
		className: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element | null => {
	const {
		showCompanyField,
		showApartmentField,
		requireCompanyField,
		showPhoneField,
		requirePhoneField,
	} = useCheckoutBlockContext();
	const { addressFieldControls: Controls } =
		useCheckoutBlockControlsContext();
	const { showBillingFields, forcedBillingAddress } = useCheckoutAddress();

	if ( ! showBillingFields && ! forcedBillingAddress ) {
		return null;
	}
	if ( forcedBillingAddress ) {
		attributes.title =
			attributes.title === DEFAULT_TITLE
				? DEFAULT_FORCED_BILLING_TITLE
				: attributes.title;
		attributes.description =
			attributes.description === DEFAULT_DESCRIPTION
				? DEFAULT_FORCED_BILLING_DESCRIPTION
				: attributes.description;
	} else {
		attributes.title =
			attributes.title === DEFAULT_FORCED_BILLING_TITLE
				? DEFAULT_TITLE
				: attributes.title;
		attributes.description =
			attributes.description === DEFAULT_FORCED_BILLING_DESCRIPTION
				? DEFAULT_DESCRIPTION
				: attributes.description;
	}
	return (
		<FormStepBlock
			setAttributes={ setAttributes }
			attributes={ attributes }
			className={ classnames(
				'wc-block-checkout__billing-fields',
				attributes?.className
			) }
		>
			<Controls />
			<Block
				showCompanyField={ showCompanyField }
				showApartmentField={ showApartmentField }
				requireCompanyField={ requireCompanyField }
				showPhoneField={ showPhoneField }
				requirePhoneField={ requirePhoneField }
			/>
			<AdditionalFields block={ innerBlockAreas.BILLING_ADDRESS } />
		</FormStepBlock>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<AdditionalFieldsContent />
		</div>
	);
};
