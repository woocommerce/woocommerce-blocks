/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRef, useState, useEffect, useCallback } from '@wordpress/element';

const KEYCODE_UP = 38;
const KEYCODE_DOWN = 40;

/**
 * Internal dependencies
 */
import './style.scss';

const QuantitySelector = ( {
	className,
	quantity = 1,
	onChange = () => null,
} ) => {
	const classes = classNames( 'wc-block-quantity-selector', className );
	const inputRef = useRef( null );
	const [ currentValue, setCurrentValue ] = useState( quantity );

	useEffect( () => {
		if ( currentValue !== inputRef.current.value ) {
			inputRef.current.value = currentValue;
		}
		onChange( currentValue );
	}, [ currentValue, onChange ] );

	/**
	 * Handles keyboard up and down keys to change quantity value.
	 *
	 * @param {Object} event event data.
	 */
	const quantityInputOnKeyDown = useCallback(
		( event ) => {
			if ( event.keyCode === KEYCODE_UP ) {
				event.preventDefault();
				setCurrentValue( currentValue + 1 );
			}

			if ( event.keyCode === KEYCODE_DOWN && currentValue > 0 ) {
				event.preventDefault();
				setCurrentValue( currentValue - 1 );
			}
		},
		[ currentValue, setCurrentValue ]
	);

	return (
		<div className={ classes }>
			<input
				className="wc-block-quantity-selector__input"
				type="number"
				step="1"
				min="0"
				value={ quantity }
				ref={ inputRef }
				onKeyDown={ quantityInputOnKeyDown }
				onChange={ ( event ) => {
					const value =
						isNaN( event.target.value ) || ! event.target.value
							? 0
							: parseInt( event.target.value, 10 );
					setCurrentValue( value );
				} }
			/>
			<button
				aria-label={ __(
					'Reduce quantity',
					'woo-gutenberg-products-block'
				) }
				className="wc-block-quantity-selector__button wc-block-quantity-selector__button--minus"
				disabled={ currentValue <= 0 }
				onClick={ () => {
					setCurrentValue( currentValue - 1 );
				} }
			>
				-
			</button>
			<button
				aria-label={ __(
					'Increase quantity',
					'woo-gutenberg-products-block'
				) }
				className="wc-block-quantity-selector__button wc-block-quantity-selector__button--plus"
				onClick={ () => {
					setCurrentValue( currentValue + 1 );
				} }
			>
				+
			</button>
		</div>
	);
};

QuantitySelector.propTypes = {
	className: PropTypes.string,
	quantity: PropTypes.number,
	onChange: PropTypes.func,
};

export default QuantitySelector;
