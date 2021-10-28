/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { speak } from '@wordpress/a11y';
import classNames from 'classnames';
import { useCallback } from '@wordpress/element';
import { DOWN, UP } from '@wordpress/keycodes';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';

/**
 * Internal dependencies
 */
import './style.scss';

interface QuantitySelectorProps {
	className?: string;
	quantity?: number;
	minimum?: number;
	maximum: number;
	step?: number;
	onChange: ( newQuantity: number ) => void;
	itemName?: string;
	disabled: boolean;
}

const QuantitySelector = ( {
	className,
	quantity = 1,
	minimum = 1,
	maximum,
	step = 1,
	onChange = () => {
		/* Do nothing. */
	},
	itemName = '',
	disabled,
}: QuantitySelectorProps ): JSX.Element => {
	const classes = classNames(
		'wc-block-components-quantity-selector',
		className
	);

	const hasMaximum = typeof maximum !== 'undefined';
	const canDecrease = quantity - step > minimum;
	const canIncrease = ! hasMaximum || quantity + step < maximum;

	/**
	 * The goal of this function is to normalize what was inserted,
	 * but after the customer has stopped typing.
	 *
	 * It's important to wait before normalizing or we end up with
	 * a frustrating expiernce, for example, if the minimun is 2 and
	 * the customer is trying to type "10", premature normalizing would
	 * always kick in at "1" and turn that into 2.
	 */
	const [ normalizeQuantity ] = useDebouncedCallback(
		( initialValue: number ) => {
			// We copy the starting value.
			let value = initialValue;

			// We check if we have a maximum value, and select the lowest between what was inserted, and the maximum.
			if ( hasMaximum ) {
				value = Math.min(
					value,
					// the maximum possible value in step increments.
					Math.floor( maximum / step ) * step
				);
			}

			// Select the biggest between what's inserted, the the minimum value in steps.
			value = Math.max( value, Math.ceil( minimum / step ) * step );

			// We round off the value to our steps.
			value = Math.floor( value / step ) * step;

			// Only commit if the value has changed
			if ( value !== initialValue ) {
				onChange( value );
			}
		},
		// This value is delibrtly smaller than what's in useStoreCartItemQuantity so we don't end up with two requests.
		300
	);

	/**
	 * Handles keyboard up and down keys to change quantity value.
	 *
	 * @param {Object} event event data.
	 */
	const quantityInputOnKeyDown = useCallback(
		( event ) => {
			const isArrowDown =
				typeof event.key !== undefined
					? event.key === 'ArrowDown'
					: event.keyCode === DOWN;
			const isArrowUp =
				typeof event.key !== undefined
					? event.key === 'ArrowUp'
					: event.keyCode === UP;

			if ( isArrowDown && canDecrease ) {
				event.preventDefault();
				onChange( quantity - step );
			}

			if ( isArrowUp && canIncrease ) {
				event.preventDefault();
				onChange( quantity + step );
			}
		},
		[ quantity, onChange, canIncrease, canDecrease, step ]
	);

	return (
		<div className={ classes }>
			<input
				className="wc-block-components-quantity-selector__input"
				disabled={ disabled }
				type="number"
				step={ step }
				min={ minimum }
				value={ quantity }
				onKeyDown={ quantityInputOnKeyDown }
				onChange={ ( event ) => {
					// Inputs values are strings, we parse them here.
					let value = parseInt( event.target.value, 10 );
					// parseInt would throw NaN for anything not a number,
					// so we revert value to the quantity value.
					value = isNaN( value ) ? quantity : value;

					if ( value !== quantity ) {
						// we commit this value immideatly.
						onChange( value );
						// but once the customer has stopped typing, we make sure his value is respecting the bounds (maximum value, minimum value, step value), and commit the normlized value.
						normalizeQuantity( value );
					}
				} }
				aria-label={ sprintf(
					/* translators: %s refers to the item name in the cart. */
					__(
						'Quantity of %s in your cart.',
						'woo-gutenberg-products-block'
					),
					itemName
				) }
			/>
			<button
				aria-label={ __(
					'Reduce quantity',
					'woo-gutenberg-products-block'
				) }
				className="wc-block-components-quantity-selector__button wc-block-components-quantity-selector__button--minus"
				disabled={ disabled || ! canDecrease }
				onClick={ () => {
					const newQuantity = quantity - step;
					onChange( newQuantity );
					speak(
						sprintf(
							/* translators: %s refers to the item name in the cart. */
							__(
								'Quantity reduced to %s.',
								'woo-gutenberg-products-block'
							),
							newQuantity
						)
					);
				} }
			>
				&#65293;
			</button>
			<button
				aria-label={ __(
					'Increase quantity',
					'woo-gutenberg-products-block'
				) }
				disabled={ disabled || ! canIncrease }
				className="wc-block-components-quantity-selector__button wc-block-components-quantity-selector__button--plus"
				onClick={ () => {
					const newQuantity = quantity + step;
					onChange( newQuantity );
					speak(
						sprintf(
							/* translators: %s refers to the item name in the cart. */
							__(
								'Quantity increased to %s.',
								'woo-gutenberg-products-block'
							),
							newQuantity
						)
					);
				} }
			>
				&#65291;
			</button>
		</div>
	);
};

export default QuantitySelector;
