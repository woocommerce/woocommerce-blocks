/**
 * External dependencies
 */
import { TotalsFooterItem } from '@woocommerce/base-components/cart-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useStoreCart } from '@woocommerce/base-context/hooks';
import { useCheckoutContext } from '@woocommerce/base-context';
import { dispatch } from '@wordpress/data';
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { OrderMetaSlotFill } from './slotfills';

const FrontendBlock = ( {
	children,
	className = '',
}: {
	children: JSX.Element | JSX.Element[];
	className?: string;
} ): JSX.Element | null => {
	const { cartTotals } = useStoreCart();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );
	const {
		onCheckoutValidationBeforeProcessing,
		onCheckoutAfterProcessingWithSuccess,
		onCheckoutAfterProcessingWithError,
	} = useCheckoutContext();

	return (
		<div className={ className }>
			{ children }
			<div className="wc-block-components-totals-wrapper">
				<TotalsFooterItem
					currency={ totalsCurrency }
					values={ cartTotals }
				/>
			</div>
			<div>
				<button
					onClick={ () => {
						onCheckoutValidationBeforeProcessing( () => ( {
							type: 'error',
							errorMessage:
								'onCheckoutValidationBeforeProcessing error',
							validationErrors: 'nothing',
						} ) );
					} }
				>
					Register an validation observer
				</button>
				<button
					onClick={ () => {
						onCheckoutAfterProcessingWithSuccess( () => ( {
							type: 'success',
						} ) );
					} }
				>
					Register success observer for
					CHECKOUT_AFTER_PROCESSING_WITH_SUCCESS
				</button>

				<button
					onClick={ () => {
						onCheckoutAfterProcessingWithSuccess( () => ( {
							type: 'error',
							message:
								'onCheckoutAfterProcessingWithSuccess error',
							messageContext: 'wc/checkout',
						} ) );
					} }
				>
					Register error observer for
					CHECKOUT_AFTER_PROCESSING_WITH_SUCCESS
				</button>

				<button
					onClick={ () => {
						onCheckoutAfterProcessingWithSuccess( () => ( {
							type: 'error',
						} ) );
					} }
				>
					Register error observer without message for
					CHECKOUT_AFTER_PROCESSING_WITH_SUCCESS
				</button>

				<button
					onClick={ () => {
						onCheckoutAfterProcessingWithError( () => ( {
							type: 'error',
							message: 'onCheckoutAfterProcessingWithError error',
							messageContext: 'wc/checkout',
						} ) );
					} }
				>
					Register error observer for
					CHECKOUT_AFTER_PROCESSING_WITH_ERROR
				</button>

				<button
					onClick={ () => {
						onCheckoutAfterProcessingWithError( () => ( {
							type: 'success',
						} ) );
					} }
				>
					Register success observer for
					CHECKOUT_AFTER_PROCESSING_WITH_ERROR
				</button>

				<button
					onClick={ () => {
						const { setHasError } = dispatch( CHECKOUT_STORE_KEY );
						setHasError( true );
					} }
				>
					Set state error
				</button>
			</div>
			<OrderMetaSlotFill />
		</div>
	);
};

export default FrontendBlock;
