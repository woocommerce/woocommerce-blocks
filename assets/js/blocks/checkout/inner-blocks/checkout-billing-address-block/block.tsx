/**
 * External dependencies
 */
import { useMemo, Fragment } from '@wordpress/element';
import { useEffectOnce } from 'usehooks-ts';
import {
	useCheckoutAddress,
	useEditorContext,
	noticeContexts,
} from '@woocommerce/base-context';
import Noninteractive from '@woocommerce/base-components/noninteractive';
import type {
	ShippingAddress,
	AddressField,
	AddressFields,
} from '@woocommerce/settings';
import { StoreNoticesContainer } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import CustomerAddress from './customer-address';

const Block = ( {
	showCompanyField = false,
	showApartmentField = false,
	showPhoneField = false,
	requireCompanyField = false,
	requirePhoneField = false,
}: {
	showCompanyField: boolean;
	showApartmentField: boolean;
	showPhoneField: boolean;
	requireCompanyField: boolean;
	requirePhoneField: boolean;
} ): JSX.Element => {
	const { billingAddress, setShippingAddress, useBillingAsShipping } =
		useCheckoutAddress();
	const { isEditor } = useEditorContext();

	// Syncs shipping address with billing address if "Force shipping to the customer billing address" is enabled.
	useEffectOnce( () => {
		if ( useBillingAsShipping ) {
			setShippingAddress( {
				...billingAddress,
				phone: showPhoneField ? billingAddress.phone : '',
			} as ShippingAddress );
		}
	} );

	const addressFieldsConfig = useMemo( () => {
		return {
			company: {
				hidden: ! showCompanyField,
				required: requireCompanyField,
			},
			address_2: {
				hidden: ! showApartmentField,
			},
		};
	}, [
		showCompanyField,
		requireCompanyField,
		showApartmentField,
	] ) as Record< keyof AddressFields, Partial< AddressField > >;

	const noticeContext = useBillingAsShipping
		? [ noticeContexts.BILLING_ADDRESS, noticeContexts.SHIPPING_ADDRESS ]
		: [ noticeContexts.BILLING_ADDRESS ];

	const WrapperComponent = isEditor ? Noninteractive : Fragment;
	const hasAddress = !! (
		billingAddress.address_1 &&
		( billingAddress.first_name || billingAddress.last_name )
	);

	return (
		<>
			<StoreNoticesContainer context={ noticeContext } />
			<WrapperComponent>
				<CustomerAddress
					addressFieldsConfig={ addressFieldsConfig }
					showPhoneField={ showPhoneField }
					requirePhoneField={ requirePhoneField }
					noticeContext={ noticeContexts.BILLING_ADDRESS }
				/>
			</WrapperComponent>
		</>
	);
};

export default Block;
