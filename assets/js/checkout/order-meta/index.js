/**
 * External dependencies
 */
import { createSlotFill } from 'wordpress-components';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import classnames from 'classnames';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';

const { Fill, Slot } = createSlotFill( '__experimentalOrderMeta' );

function ExperimentalOrderMeta( { children } ) {
	return (
		<BlockErrorBoundary
			renderError={ CURRENT_USER_IS_ADMIN ? null : () => null }
		>
			<Fill>{ children }</Fill>
		</BlockErrorBoundary>
	);
}

function OrderMetaSlot( { className } ) {
	return (
		<Slot
			bubblesVirtually
			className={ classnames(
				className,
				'wc-block-components-order-meta'
			) }
		/>
	);
}

ExperimentalOrderMeta.Slot = OrderMetaSlot;

export default ExperimentalOrderMeta;
