/**
 * External dependencies
 */
import { createSlotFill } from 'wordpress-components';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import classnames from 'classnames';
const { Fill, Slot } = createSlotFill( '__experimentalOrderReview' );

function OrderReview( { children } ) {
	return <Fill>{ children }</Fill>;
}

function OrderReviewSlot( { className } ) {
	return (
		<Slot
			bubblesVirtually
			className={ classnames(
				className,
				'wc-block-components-order-reviews'
			) }
		>
			{ ( fills ) => {
				fills.map( ( fill, i ) => (
					<BlockErrorBoundary showErrorMessage={ false } key={ i }>
						{ fill }
					</BlockErrorBoundary>
				) );
			} }
		</Slot>
	);
}

OrderReview.Slot = OrderReviewSlot;

export default OrderReview;
