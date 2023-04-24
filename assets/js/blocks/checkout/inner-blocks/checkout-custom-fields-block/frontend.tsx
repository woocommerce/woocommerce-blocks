/**
 * External dependencies
 */
import { withFilteredAttributes } from '@woocommerce/shared-hocs';
import { allSettings } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import attributes from './attributes';

/**
 * Internal dependencies
 */
import Frontend from '../checkout-custom-field-block/frontend';

interface FieldProps {
	name: string;
	label: string;
	required: boolean;
	type: string;
	size?: string | undefined;
}

interface CustomFields {
	shipping?: FieldProps[] | undefined;
	billing?: FieldProps[] | undefined;
	additional?: FieldProps[] | undefined;
}

const FrontendBlock = ( {
	section = 'shipping',
}: {
	section: string;
} ): JSX.Element => {
	const allCustomFields = allSettings.checkoutCustomFields as CustomFields;
	const sectionFields = allCustomFields[ section as keyof CustomFields ];

	return (
		<div className="wc-block-checkout__custom_fields">
			{ `Custom Fields Block Section` }
			{ sectionFields?.map( ( field, index ) => (
				<Frontend key={ index } field={ field } section={ section } />
			) ) }
		</div>
	);
};

export default withFilteredAttributes( attributes )( FrontendBlock );
