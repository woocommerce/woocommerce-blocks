/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Notice } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { STORE_KEY as PAYMENT_STORE_KEY } from '../../data/payment/constants';
import './editor.scss';

export function IncompatibilityPaymentGatewaysNotice() {
	// Everything below works the same for Cart/Checkout
	const { incompatiblePaymentMethods } = useSelect( ( select ) => {
		const { getIncompatiblePaymentMethods } = select( PAYMENT_STORE_KEY );
		return {
			incompatiblePaymentMethods: getIncompatiblePaymentMethods(),
		};
	}, [] );
	const [ settingStatus, setStatus ] = useState( 'pristine' );

	if (
		Object.keys( incompatiblePaymentMethods ).length === 0 ||
		settingStatus === 'dismissed'
	) {
		return null;
	}

	const noticeContent = __(
		'The following payment gateway(s) are not compatible with the Cart & Checkout Blocks:',
		'woo-gutenberg-products-block'
	);

	return (
		<Notice
			className="wc-default-page-notice"
			status={ 'error' }
			onRemove={ () => setStatus( 'dismissed' ) }
			spokenMessage={ noticeContent }
		>
			<p>{ noticeContent }</p>
			<ul>
				{ Object.entries( incompatiblePaymentMethods ).map(
					( [ id, title ] ) => (
						<li key={ id }>
							<strong>- { title }</strong>
						</li>
					)
				) }
			</ul>
		</Notice>
	);
}
