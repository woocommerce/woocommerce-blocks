/**
 * External dependencies
 */
import deprecated from '@wordpress/deprecated';
import {
	createSlotFill as baseCreateSlotFill,
	__experimentalUseSlot,
	useSlot as __useSlot,
} from 'wordpress-components';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';
import { Children, cloneElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BlockErrorBoundary from '../error-boundary';

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
 * A hook that is used inside a slotFillProvider to return information on the a slot.
 *
 * @param {string} slotName The slot name to be hooked into.
 * @return {Object} slot data.
 */
let useSlot = mockedUseSlot;

if ( typeof __useSlot === 'function' ) {
	useSlot = __useSlot;
} else if ( typeof __experimentalUseSlot === 'function' ) {
	useSlot = __experimentalUseSlot;
}

export { useSlot };

/**
 * Abstracts @wordpress/components createSlotFill, wraps Fill in an error boundary and passes down fillProps.
 *
 * @param {string} slotName The generated slotName, based down to createSlotFill.
 *
 * @return {Object} Returns a newly wrapped Fill and Slot.
 */
export const createSlotFill = ( slotName ) => {
	const { Fill: BaseFill, Slot } = baseCreateSlotFill( slotName );

	/**
	 * A Fill that will get rendered inside associate slot.
	 * If the code inside has a error, it would be caught ad removed.
	 * The error is only visible to admins.
	 *
	 * @param {Object} props Items props.
	 * @param {Array}  props.children Children to be rendered.
	 */
	const Fill = ( { children } ) => (
		<BaseFill>
			{ ( fillProps ) =>
				Children.map( children, ( fill ) => (
					<BlockErrorBoundary
						renderError={
							CURRENT_USER_IS_ADMIN ? null : () => null
						}
					>
						{ cloneElement( fill, fillProps ) }
					</BlockErrorBoundary>
				) )
			}
		</BaseFill>
	);
	return {
		Fill,
		Slot,
	};
};
