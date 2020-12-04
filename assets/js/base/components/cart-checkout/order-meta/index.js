/**
 * External dependencies
 */
import { createSlotFill } from 'wordpress-components';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import classnames from 'classnames';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';

const slotName = '__experimentalOrderMeta';
const { Fill, Slot: OrderMetaSlot } = createSlotFill( slotName );

function ExperimentalOrderMeta( { children } ) {
	return (
		<Fill>
			<BlockErrorBoundary
				renderError={ CURRENT_USER_IS_ADMIN ? null : () => null }
			>
				{ children }
			</BlockErrorBoundary>
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
