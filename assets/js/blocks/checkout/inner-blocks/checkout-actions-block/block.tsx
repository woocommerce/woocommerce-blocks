/**
 * External dependencies
 */
import classnames from 'classnames';
import { getSetting } from '@woocommerce/settings';
import { StoreNoticesContainer } from '@woocommerce/blocks-components';
import { applyCheckoutFilter } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import { useCheckoutSubmit } from '~/base/context/hooks';
import { noticeContexts } from '~/base/context';
import {
	PlaceOrderButton,
	ReturnToCartButton,
} from '~/base/components/cart-checkout';
import { defaultPlaceOrderButtonLabel } from './constants';
import './style.scss';

const Block = ( {
	cartPageId,
	showReturnToCart,
	className,
	placeOrderButtonLabel,
}: {
	cartPageId: number;
	showReturnToCart: boolean;
	className?: string;
	placeOrderButtonLabel: string;
} ): JSX.Element => {
	const { paymentMethodButtonLabel } = useCheckoutSubmit();
	const label = applyCheckoutFilter( {
		filterName: 'placeOrderButtonLabel',
		defaultValue:
			paymentMethodButtonLabel ||
			placeOrderButtonLabel ||
			defaultPlaceOrderButtonLabel,
	} );

	return (
		<div
			className={ classnames( 'wc-block-checkout__actions', className ) }
		>
			<StoreNoticesContainer
				context={ noticeContexts.CHECKOUT_ACTIONS }
			/>
			<div className="wc-block-checkout__actions_row">
				{ showReturnToCart && (
					<ReturnToCartButton
						link={ getSetting( 'page-' + cartPageId, false ) }
					/>
				) }
				<PlaceOrderButton
					label={ label }
					fullWidth={ ! showReturnToCart }
				/>
			</div>
		</div>
	);
};

export default Block;
