/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Placeholder, Button } from 'wordpress-components';
import { Icon, card } from '@woocommerce/icons';
import { ADMIN_URL } from '@woocommerce/settings';
import { useCheckoutContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import './style.scss';

const NoPaymentMethods = () => {
	const { isEditor } = useCheckoutContext();

	return isEditor ? (
		<NoPaymentMethodsPlaceholder />
	) : (
		<NoPaymentMethodsNotice />
	);
};

const NoPaymentMethodsPlaceholder = () => {
	return (
		<Placeholder
			icon={ <Icon srcElement={ card } /> }
			label={ __( 'Payment methods', 'woo-gutenberg-products-block' ) }
			className="wc-block-checkout__no-payment-methods"
		>
			<span className="wc-block-checkout__no-payment-methods-description">
				{ __(
					'Your store does not have any payment methods configured. Once you have configured your payment methods they will appear here.',
					'woo-gutenberg-products-block'
				) }
			</span>
			<Button
				isDefault
				href={ `${ ADMIN_URL }admin.php?page=wc-settings&tab=checkout` }
			>
				{ __(
					'Configure Payment Methods',
					'woo-gutenberg-products-block'
				) }
			</Button>
		</Placeholder>
	);
};

const NoPaymentMethodsNotice = () => {
	return <div>Hello</div>;
};

export default NoPaymentMethods;
