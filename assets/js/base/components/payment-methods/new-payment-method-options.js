/**
 * External dependencies
 */
import {
	usePaymentMethods,
	usePaymentMethodInterface,
	useStoreNotices,
	useEmitResponse,
} from '@woocommerce/base-hooks';
import { cloneElement, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { usePaymentMethodDataContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import Tabs from '../tabs';
import NewPaymentMethodTab from './new-payment-method-tab';

const NewPaymentMethodOptions = () => {
	const { setActivePaymentMethod } = usePaymentMethodDataContext();
	const { paymentMethods } = usePaymentMethods();
	const {
		activePaymentMethod,
		...paymentMethodInterface
	} = usePaymentMethodInterface();
	const currentPaymentMethodInterface = useRef( paymentMethodInterface );
	const { noticeContexts } = useEmitResponse();
	const { removeNotice } = useStoreNotices();

	return (
		<Tabs
			className="wc-block-components-checkout-payment-methods"
			onSelect={ ( tabName ) => {
				setActivePaymentMethod( tabName );
				removeNotice( 'wc-payment-error', noticeContexts.PAYMENTS );
			} }
			tabs={ Object.keys( paymentMethods ).map( ( name ) => {
				const { label, ariaLabel } = paymentMethods[ name ];
				return {
					name,
					title:
						typeof label === 'string'
							? label
							: cloneElement( label, {
									components:
										currentPaymentMethodInterface.current
											.components,
							  } ),
					ariaLabel,
					content: <NewPaymentMethodTab paymentMethodName={ name } />,
				};
			} ) }
			initialTabName={ activePaymentMethod }
			ariaLabel={ __(
				'Payment Methods',
				'woo-gutenberg-products-block'
			) }
			id="wc-block-payment-methods"
		/>
	);
};

export default NewPaymentMethodOptions;
