/**
 * External dependencies
 */
import {
	usePaymentMethods,
	usePaymentMethodInterface,
	useStoreNotices,
	useEmitResponse,
} from '@woocommerce/base-hooks';
import { cloneElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	useEditorContext,
	usePaymentMethodDataContext,
} from '@woocommerce/base-context';

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
	const { noticeContexts } = useEmitResponse();
	const { removeNotice } = useStoreNotices();
	const { isEditor } = useEditorContext();

	return (
		<Tabs
			className="wc-block-components-checkout-payment-methods"
			onSelect={ ( tabName ) => {
				setActivePaymentMethod( tabName );
				removeNotice( 'wc-payment-error', noticeContexts.PAYMENTS );
			} }
			tabs={ Object.keys( paymentMethods ).map( ( name ) => {
				const {
					ariaLabel,
					edit,
					content,
					label,
					supports,
				} = paymentMethods[ name ];
				const component = isEditor ? edit : content;
				return {
					name,
					title:
						typeof label === 'string'
							? label
							: cloneElement( label, {
									components:
										paymentMethodInterface.components,
							  } ),
					ariaLabel,
					content: (
						<NewPaymentMethodTab
							allowsSaving={ supports.savePaymentInfo }
						>
							{ cloneElement( component, {
								activePaymentMethod,
								...paymentMethodInterface,
							} ) }
						</NewPaymentMethodTab>
					),
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
