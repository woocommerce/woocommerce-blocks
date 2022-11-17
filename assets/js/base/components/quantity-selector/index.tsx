/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { speak } from '@wordpress/a11y';
import classNames from 'classnames';
import { useCallback, useLayoutEffect } from '@wordpress/element';
import { DOWN, UP } from '@wordpress/keycodes';
import { useDebouncedCallback } from 'use-debounce';
import { ValidationInputError } from '@woocommerce/blocks-checkout';
import { withInstanceId } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { VALIDATION_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import './style.scss';

export interface QuantitySelectorProps {
	/**
	 * Component wrapper classname
	 *
	 * @default 'wc-block-components-quantity-selector'
	 */
	className?: string;
	/**
	 * Current quantity
	 */
	quantity?: number;
	/**
	 * Minimum quantity
	 */
	minimum?: number;
	/**
	 * Maximum quantity
	 */
	maximum: number;
	/**
	 * Input step attribute.
	 */
	step?: number;
	/**
	 * Event handler triggered when the quantity is changed
	 */
	onChange: ( newQuantity: number ) => void;
	/**
	 * Name of the item the quantity selector refers to
	 *
	 * Used for a11y purposes
	 */
	itemName?: string;
	/**
	 * Whether the component should be interactable or not
	 */
	disabled: boolean;
	/**
	 * Whether the component should allow the value to exceed the maximum or minimum. If false, the value can exceed the
	 * limits, but an error will be shown.
	 */
	strictLimits?: boolean | undefined;
	instanceId: string | number;
}

const QuantitySelector = ( {
	className,
	quantity = 1,
	minimum = 1,
	maximum,
	onChange = () => void 0,
	step = 1,
	itemName = '',
	disabled,
	strictLimits = true,
	instanceId,
}: QuantitySelectorProps ): JSX.Element => {
	const errorId = `wc-block-components-quantity-selector-error-${ instanceId }`;

	const hasValidationErrors = useSelect( ( select ) => {
		return !! select( VALIDATION_STORE_KEY ).getValidationError( errorId );
	} );

	const classes = classNames(
		'wc-block-components-quantity-selector',
		hasValidationErrors ? 'has-error' : '',
		className
	);

	const hasMaximum = typeof maximum !== 'undefined';
	const canDecrease = ! strictLimits || quantity - step >= minimum;
	const canIncrease =
		! strictLimits || ! hasMaximum || quantity + step <= maximum;

	/**
	 * The goal of this function is to normalize what was inserted,
	 * but after the customer has stopped typing.
	 */
	const normalizeQuantity = useCallback(
		( initialValue: number ) => {
			// We copy the starting value.
			let value = initialValue;

			// We check if we have a maximum value, and select the lowest between what was inserted and the maximum.
			if ( hasMaximum && strictLimits ) {
				value = Math.min(
					value,
					// the maximum possible value in step increments.
					Math.floor( maximum / step ) * step
				);
			}

			if ( strictLimits ) {
				// Select the biggest between what's inserted, the the minimum value in steps.
				value = Math.max( value, Math.ceil( minimum / step ) * step );

				// We round off the value to our steps.
				value = Math.floor( value / step ) * step;
			}

			// Only commit if the value has changed
			if ( value !== initialValue ) {
				onChange( value );
			}
		},
		[ hasMaximum, maximum, minimum, onChange, step ]
	);

	/*
	 * It's important to wait before normalizing or we end up with
	 * a frustrating experience, for example, if the minimum is 2 and
	 * the customer is trying to type "10", premature normalizing would
	 * always kick in at "1" and turn that into 2.
	 */
	const debouncedNormalizeQuantity = useDebouncedCallback(
		normalizeQuantity,
		// This value is deliberately smaller than what's in useStoreCartItemQuantity so we don't end up with two requests.
		300
	);

	/**
	 * Normalize qty on mount before render.
	 */
	useLayoutEffect( () => {
		normalizeQuantity( quantity );
	}, [ quantity, normalizeQuantity ] );

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

	/**
	 * Creates a string containing errors describing the state of the quantity selector. If the state is valid, an empty
	 * string is returned.
	 */
	const createErrorMessage = useCallback(
		( newQuantity: number ): string => {
			const belowMin = newQuantity < minimum;
			const aboveMax = newQuantity > maximum;
			const wrongMultiple = newQuantity % step !== 0;

			if ( belowMin ) {
				return sprintf(
					/* translators: %d is the minimum quantity allowed. */
					__(
						'The minimum quantity is %d.',
						'woo-gutenberg-products-block'
					),
					minimum
				);
			}

			if ( aboveMax ) {
				return sprintf(
					/* translators: %d is the maximum quantity allowed. */
					__(
						'The maximum quantity is %d.',
						'woo-gutenberg-products-block'
					),
					maximum
				);
			}

			if ( wrongMultiple ) {
				return sprintf(
					/* translators: %d is a number that the quantity must be a multiple of. */
					__(
						'The quantity must be a multiple of %d.',
						'woo-gutenberg-products-block'
					),
					step
				);
			}
			return '';
		},
		[ minimum, maximum, step ]
	);

	const { setValidationErrors, clearValidationError } =
		useDispatch( VALIDATION_STORE_KEY );

	useLayoutEffect( () => {
		const message = createErrorMessage( quantity );
		clearValidationError( errorId );
		if ( message === '' ) {
			return;
		}
		setValidationErrors( {
			[ errorId ]: { message, hidden: false },
		} );
	}, [
		clearValidationError,
		createErrorMessage,
		errorId,
		quantity,
		setValidationErrors,
	] );

	/*
	 * If the current quantity is not a multiple of `step` we should let the user step by 1 until they get to a valid
	 * quantity. Example: User has a quantity of 3 and `step` updates from the API and becomes 2.
	 * The user should be able to step up to 4 or down to 2.
	 */
	const stepToUse = ! strictLimits && quantity % step !== 0 ? 1 : step;

	return (
		<div>
			<div className={ classes }>
				<input
					className="wc-block-components-quantity-selector__input"
					disabled={ disabled }
					type="number"
					step={ stepToUse }
					min={ minimum || 0 }
					max={ maximum }
					value={ quantity }
					onKeyDown={ quantityInputOnKeyDown }
					onChange={ ( event ) => {
						// Inputs values are strings, we parse them here.
						let value = parseInt( event.target.value, 10 );
						// parseInt would throw NaN for anything not a number,
						// so we revert value to the quantity value.
						value = isNaN( value ) ? quantity : value;

						if ( value !== quantity ) {
							// we commit this value immediately.
							onChange( value );
							// but once the customer has stopped typing, we make sure his value is respecting the bounds (maximum value, minimum value, step value), and commit the normalized value.
							debouncedNormalizeQuantity( value );
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
						const newQuantity = quantity - stepToUse;
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
						normalizeQuantity( newQuantity );
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
						const newQuantity = quantity + stepToUse;
						onChange( newQuantity );
						speak(
							sprintf(
								/* translators: %s refers to the quantity of the item in the cart. */
								__(
									'Quantity increased to %s.',
									'woo-gutenberg-products-block'
								),
								newQuantity
							)
						);
						normalizeQuantity( newQuantity );
					} }
				>
					&#65291;
				</button>
			</div>
			{ hasValidationErrors && ! strictLimits && (
				<div>
					<ValidationInputError propertyName={ errorId } />
				</div>
			) }
		</div>
	);
};

export default withInstanceId( QuantitySelector );
