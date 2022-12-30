/**
 * External dependencies
 */
import deprecated from '@wordpress/deprecated';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/settings';
import { Children, cloneElement } from '@wordpress/element';
import {
	createSlotFill as baseCreateSlotFill,
	__experimentalUseSlotFills,
	useSlotFills as __useSlotFills, //eslint-disable-line
	__experimentalUseSlot,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import BlockErrorBoundary from '../components/error-boundary';

/**
 * This function is used in case __experimentalUseSlot is removed and useSlot is not released, it tries to mock
 * the return value of that slot.
 *
 * @return {Object} The hook mocked return, currently:
 *                  fills, a null array of length 2.
 */
const mockedUseSlot = () => {
	/**
	 * If we're here, it means useSlot was never graduated and __experimentalUseSlot is removed, so we should change our code.
	 *
	 */
	deprecated( '__experimentalUseSlot', {
		plugin: 'woocommerce-gutenberg-products-block',
	} );
	// We're going to mock its value
	return {
		fills: new Array( 2 ),
	};
};

/**
 * Checks if this slot has any valid fills. A valid fill is one that isn't falsy.
 *
 * @param {Array} fills The list of fills to check for a valid one in.
 * @return {boolean} True if this slot contains any valid fills.
 */
export const hasValidFills = ( fills ) =>
	Array.isArray( fills ) && fills.filter( Boolean ).length > 0;

/**
 * A hook that is used inside a slotFillProvider to return information on the a slot fills.
 *
 * @param {string} slotName The slot name to be hooked into.
 * @return {Object} slot data.
 */
let useSlotFills;

if ( typeof __useSlotFills === 'function' ) {
	useSlotFills = __useSlotFills;
} else if ( typeof __experimentalUseSlotFills === 'function' ) {
	useSlotFills = __experimentalUseSlotFills;
} else if ( typeof __experimentalUseSlot === 'function' ) {
	// Depends on the version of `@wordpress/components`, there's either
	// __useSlotFills function that returns object containing `fills` property
	// (in older versions) or __experimentalUseSlotFills function that returns
	// `fill` directly, hence it's required to adjust the interface of the
	// `useSlotFills` function exported from this module.
	useSlotFills = ( slotName ) => {
		return __experimentalUseSlot( slotName ).fills;
	};
} else {
	useSlotFills = mockedUseSlot;
}

export { useSlotFills };

/**
 * Abstracts @wordpress/components createSlotFill, wraps Fill in an error boundary and passes down fillProps.
 *
 * @param {string}                         slotName  The generated slotName, based down to createSlotFill.
 * @param {null|function(Element):Element} [onError] Returns an element to display the error if the current use is an admin.
 *
 * @return {Object} Returns a newly wrapped Fill and Slot.
 */
export const createSlotFill = ( slotName, onError = null ) => {
	const { Fill: BaseFill, Slot: BaseSlot } = baseCreateSlotFill( slotName );

	/**
	 * A Fill that will get rendered inside associate slot.
	 * If the code inside has a error, it would be caught and removed.
	 * The error is only visible to admins.
	 *
	 * @param {Object} props          Items props.
	 * @param {Array}  props.children Children to be rendered.
	 */
	const Fill = ( { children } ) => (
		<BaseFill>
			{ ( fillProps ) =>
				Children.map( children, ( fill ) => (
					<BlockErrorBoundary
						/* Returning null would trigger the default error display.
						 * Returning () => null would render nothing.
						 */
						renderError={
							CURRENT_USER_IS_ADMIN ? onError : () => null
						}
					>
						{ cloneElement( fill, fillProps ) }
					</BlockErrorBoundary>
				) )
			}
		</BaseFill>
	);

	/**
	 * A Slot that will get rendered inside our tree.
	 * This forces Slot to use the Portal implementation that allows events to be bubbled to react tree instead of dom tree.
	 *
	 * @param {Object}         [props]         Slot props.
	 * @param {string}         props.className Class name to be used on slot.
	 * @param {Object}         props.fillProps Props to be passed to fills.
	 * @param {Element|string} props.as        Element used to render the slot, defaults to div.
	 *
	 */
	const Slot = ( props ) => <BaseSlot { ...props } bubblesVirtually />;

	return {
		Fill,
		Slot,
	};
};
