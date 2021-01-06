/**
 * External dependencies
 */
import { createSlotFill } from 'wordpress-components';
import classnames from 'classnames';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import CheckoutSlotErrorBoundary from '../error-boundary';

const slotName = '__experimentalOrderMeta';
const { Fill, Slot: OrderMetaSlot } = createSlotFill( slotName );

function ExperimentalOrderMeta( { children } ) {
	return (
		<Fill>
			<CheckoutSlotErrorBoundary
				renderError={ CURRENT_USER_IS_ADMIN ? null : () => null }
			>
				{ children }
			</CheckoutSlotErrorBoundary>
		</Fill>
	);
}

function Slot( { className } ) {
	return (
		<OrderMetaSlot
			bubblesVirtually
			className={ classnames(
				className,
				'wc-block-components-order-meta'
			) }
		/>
	);
}

ExperimentalOrderMeta.Slot = Slot;

export default ExperimentalOrderMeta;
