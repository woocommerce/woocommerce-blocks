/**
 * External dependencies
 */
import {
	createSlotFill,
	__experimentalUseSlot as useSlot,
} from 'wordpress-components';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';
import { Children, cloneElement } from 'wordpress-element';

/**
 * Internal dependencies
 */
import BlockErrorBoundary from '../error-boundary';

const slotName = '__experimentalOrderShippingPackages';
const { Fill, Slot: OrderShippingPackagesSlot } = createSlotFill( slotName );

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

function Slot( {
	className,
	collapsibleWhenMultiple,
	collapsible,
	noResultsMessage,
	renderOption,
} ) {
	const { fills } = useSlot( slotName );
	const hasMultiplePackages = fills.length > 1;
	return (
		<OrderShippingPackagesSlot
			bubblesVirtually
			className="wc-block-components-shipping-rates-control"
			fillProps={ {
				className,
				collapsible:
					collapsibleWhenMultiple &&
					( collapsible || hasMultiplePackages ),
				showItems: hasMultiplePackages,
				noResultsMessage,
				renderOption,
			} }
		/>
	);
}

ExperimentalOrderShippingPackages.Slot = Slot;

export default ExperimentalOrderShippingPackages;
