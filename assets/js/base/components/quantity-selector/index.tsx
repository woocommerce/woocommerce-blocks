/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { speak } from '@wordpress/a11y';
import classNames from 'classnames';
import { useCallback } from '@wordpress/element';
import { DOWN, UP } from '@wordpress/keycodes';
import { isNumber } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import './style.scss';

interface QuantitySelectorProps {
	className?: string;
	quantity?: number;
	resetQuantity?: number;
	step?: number;
	minimum?: number;
	maximum: number;
	onChange: ( newQuantity: number ) => void;
	onInput: ( newQuantity: number ) => void;
	itemName?: string;
	disabled: boolean;
}

const QuantitySelector = ( {
	className,
	quantity = 1,
	resetQuantity = 1,
	step = 1,
	minimum = 1,
	maximum,
	onChange = () => {
		/* Do nothing. */
	},
	onInput = () => {
		/* Do nothing. */
	},
	itemName = '',
	disabled,
}: QuantitySelectorProps ): JSX.Element => {

	const classes = classNames(
		'wc-block-components-quantity-selector',
		className
	);

	// Step must be gte 1.
	step = Math.max( 1, step );
	// Minimum must be gte 1.
	minimum = Math.max( 1, minimum );
	// Minimum must be gte step.
	minimum = Math.max( minimum, step );

	// Now, assuming we can trust min and step to be valid:

	// Make sure that the maximum value is gte minimum.
	maximum = Math.max( minimum, maximum );

	// Make sure that maximum is a multiple of step and gte step.
	if ( maximum > step ) {
		step = Math.min( step, Math.floor( maximum / step ) * step );
	} else if ( maximum < step ) {
		maximum = step;
	}

	const hasMaximum = typeof maximum !== 'undefined';
	const canDecrease = quantity - step >= minimum;
	const canIncrease = ! hasMaximum || quantity + step <= maximum;

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
		[ quantity, onChange, canIncrease, canDecrease ]
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

					let value = ! event.target.value
						? quantity
						: parseInt( event.target.value, 10 );

					value = isNaN( value )
						? quantity
						: value;

					if ( value !== quantity ) {
						onInput( value );
					}
				} }
				onBlur={ ( event ) => {

					let value = ! event.target.value
						? resetQuantity
						: parseInt( event.target.value, 10 );

					value = isNaN( value )
						? resetQuantity
						: value;

					if ( hasMaximum ) {
						value = Math.min( value, maximum );
					}

					if ( step > 1 ) {
						value = value % step ? resetQuantity : value;
					}

					value = Math.max( value, minimum );

					onChange( value );
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
