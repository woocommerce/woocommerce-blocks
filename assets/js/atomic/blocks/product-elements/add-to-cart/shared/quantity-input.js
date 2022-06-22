/**
 * External dependencies
 */
import { useDebouncedCallback } from 'use-debounce';

/**
 * Quantity Input Component.
 *
 * @param {Object}         props          Incoming props for component
 * @param {boolean}        props.disabled Whether input is disabled or not.
 * @param {number}         props.min      Minimum value for input.
 * @param {number}         props.max      Maximum value for input.
 * @param {number}         props.step     Step attribute for input.
 * @param {number}         props.value    Value for input.
 * @param {function():any} props.onChange Function to call on input change event.
 */
const QuantityInput = ( { disabled, min, max, step = 1, value, onChange } ) => {
	const hasMaximum = typeof max !== 'undefined';

	/**
	 * The goal of this function is to normalize what was inserted,
	 * but after the customer has stopped typing.
	 *
	 * It's important to wait before normalizing or we end up with
	 * a frustrating experience, for example, if the minimum is 2 and
	 * the customer is trying to type "10", premature normalizing would
	 * always kick in at "1" and turn that into 2.
	 *
	 * Copied from <QuantitySelector>
	 */
	const normalizeQuantity = useDebouncedCallback( ( initialValue ) => {
		// We copy the starting value.
		let newValue = initialValue;

		// We check if we have a maximum value, and select the lowest between what was inserted and the maximum.
		if ( hasMaximum ) {
			newValue = Math.min(
				newValue,
				// the maximum possible value in step increments.
				Math.floor( max / step ) * step
			);
		}

		// Select the biggest between what's inserted, the the minimum value in steps.
		newValue = Math.max( newValue, Math.ceil( min / step ) * step );

		// We round off the value to our steps.
		newValue = Math.floor( newValue / step ) * step;

		// Only commit if the value has changed
		if ( newValue !== initialValue ) {
			onChange( newValue );
		}
	}, 300 );

	return (
		<input
			className="wc-block-components-product-add-to-cart-quantity"
			type="number"
			value={ value }
			min={ min }
			max={ max }
			step={ step }
			hidden={ max === 1 }
			disabled={ disabled }
			onChange={ ( e ) => {
				onChange( e.target.value );
				normalizeQuantity( e.target.value );
			} }
		/>
	);
};

export default QuantityInput;
