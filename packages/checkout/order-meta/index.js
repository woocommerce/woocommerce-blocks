/**
 * External dependencies
 */
import { createSlotFill } from 'wordpress-components';
import { Children, cloneElement } from 'wordpress-element';
import classnames from 'classnames';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import BlockErrorBoundary from '../error-boundary';

const slotName = '__experimentalOrderMeta';
const { Fill, Slot: OrderMetaSlot } = createSlotFill( slotName );

function ExperimentalOrderMeta( { children } ) {
	return (
		<Fill>
			{ ( fillProps ) => {
				return Children.map( children, ( fill ) => {
					return (
						<BlockErrorBoundary
							renderError={
								CURRENT_USER_IS_ADMIN ? null : () => null
							}
						>
							{ cloneElement( fill, fillProps ) }
						</BlockErrorBoundary>
					);
				} );
			} }
		</Fill>
	);
}

function Slot( { className, cart } ) {
	const { extensions } = cart;
	return (
		<OrderMetaSlot
			bubblesVirtually
			className={ classnames(
				className,
				'wc-block-components-order-meta'
			) }
			fillProps={ { extensions, cart } }
		/>
	);
}

ExperimentalOrderMeta.Slot = Slot;

export default ExperimentalOrderMeta;
