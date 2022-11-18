/**
 * External dependencies
 */
import classnames from 'classnames';
import { getSetting } from '@woocommerce/settings';
import {
	PlaceOrderButton,
	ReturnToCartButton,
} from '@woocommerce/base-components/cart-checkout';
import { noticeContexts } from '@woocommerce/base-context';
import { StoreNoticesContainer } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import './style.scss';

const Block = ( {
	cartPageId,
	showReturnToCart,
	className,
}: {
	cartPageId: number;
	showReturnToCart: boolean;
	className?: string;
} ): JSX.Element => {
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
				<PlaceOrderButton />
			</div>
		</div>
	);
};

export default Block;
