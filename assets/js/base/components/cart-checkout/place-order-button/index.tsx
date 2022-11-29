/**
 * External dependencies
 */
import { useCheckoutSubmit } from '@woocommerce/base-context/hooks';
import { Icon, check } from '@wordpress/icons';
import Button from '@woocommerce/base-components/button';
import { STORE_NOTICES_STORE_KEY } from '@woocommerce/block-data';
import { useSelect } from '@wordpress/data';

const PlaceOrderButton = (): JSX.Element => {
	const {
		submitButtonText,
		onSubmit,
		isCalculating,
		isDisabled,
		waitingForProcessing,
		waitingForRedirect,
	} = useCheckoutSubmit();

	const hasNoticesVisible = useSelect( ( select ) => {
		const noticeContainers = select(
			STORE_NOTICES_STORE_KEY
		).getContainers();
		const noticeStore = select( 'core/notices' );
		return noticeContainers.some( ( container ) => {
			return (
				noticeStore
					.getNotices( container )
					.filter( ( notice ) => notice.status === 'error' ).length >
				0
			);
		} );
	} );

	return (
		<Button
			className="wc-block-components-checkout-place-order-button"
			onClick={ onSubmit }
			disabled={
				isCalculating ||
				isDisabled ||
				hasNoticesVisible ||
				waitingForProcessing ||
				waitingForRedirect ||
				hasNoticesVisible
			}
			showSpinner={ waitingForProcessing }
		>
			{ waitingForRedirect ? <Icon icon={ check } /> : submitButtonText }
		</Button>
	);
};

export default PlaceOrderButton;
