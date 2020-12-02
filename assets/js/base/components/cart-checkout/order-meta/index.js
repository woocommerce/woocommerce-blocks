/**
 * External dependencies
 */
import { createSlotFill } from 'wordpress-components';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import classnames from 'classnames';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';

const { Fill, Slot } = createSlotFill( '__experimentalOrderMeta' );

function ExperimentalOrderMeta( { children } ) {
	return <Fill>{ children }</Fill>;
}

function OrderMetaSlot( { className } ) {
	return (
		<Slot
			bubblesVirtually
			className={ classnames(
				className,
				'wc-block-components-order-meta'
			) }
		>
			{ ( fills ) => {
				fills.map( ( fill, i ) => (
					<BlockErrorBoundary
						render={ CURRENT_USER_IS_ADMIN ? null : () => null }
						key={ i }
					>
						{ fill }
					</BlockErrorBoundary>
				) );
			} }
		</Slot>
	);
}

ExperimentalOrderMeta.Slot = OrderMetaSlot;

export default ExperimentalOrderMeta;
