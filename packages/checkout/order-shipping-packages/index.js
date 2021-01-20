/**
 * External dependencies
 */
import {
	createSlotFill,
	__experimentalUseSlot as useSlot,
} from 'wordpress-components';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';
import classnames from 'classnames';
import { Children, cloneElement } from 'wordpress-element';

/**
 * Internal dependencies
 */
import BlockErrorBoundary from '../error-boundary';

const slotName = '__experimentalOrderShippingPackages';
const { Fill, Slot: SlotComponent } = createSlotFill( slotName );

function ExperimentalOrderShippingPackages( { children } ) {
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

function Slot( { className, collapsibleWhenMultiple, collapsible } ) {
	const { fills } = useSlot( slotName );

	return (
		<SlotComponent
			bubblesVirtually
			className={ classnames(
				className,
				'wc-block-components-order-shipping-packages'
			) }
			fillProps={ {
				collapsible:
					collapsibleWhenMultiple &&
					( collapsible || fills.length > 1 ),
			} }
		/>
	);
}

ExperimentalOrderShippingPackages.Slot = Slot;

export default ExperimentalOrderShippingPackages;
