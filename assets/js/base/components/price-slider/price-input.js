/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { Fragment } from '@wordpress/element';

const PriceInput = ( { disabled, onBlur, onChange, minPrice, maxPrice } ) => {
	return (
		<Fragment>
			<input
				type="text"
				size="5"
				className="wc-block-price-filter__amount wc-block-price-filter__amount--min wc-block-form-text-input"
				aria-label={ __(
					'Filter products by minimum price',
					'woo-gutenberg-products-block'
				) }
				onChange={ onChange }
				onBlur={ onBlur }
				disabled={ disabled }
				value={ minPrice }
			/>
			<input
				type="text"
				size="5"
				className="wc-block-price-filter__amount wc-block-price-filter__amount--max wc-block-form-text-input"
				aria-label={ __(
					'Filter products by maximum price',
					'woo-gutenberg-products-block'
				) }
				onChange={ onChange }
				onBlur={ onBlur }
				disabled={ disabled }
				value={ maxPrice }
			/>
		</Fragment>
	);
};

PriceInput.propTypes = {
	/**
	 * Is the text input disabled?
	 */
	disabled: PropTypes.bool,
	/**
	 * Callback fired on input.
	 */
	onBlur: PropTypes.func.isRequired,
	/**
	 * Callback fired on input.
	 */
	onChange: PropTypes.func.isRequired,
	/**
	 * Min price to display.
	 */
	minPrice: PropTypes.string.isRequired,
	/**
	 * Max price to display.
	 */
	maxPrice: PropTypes.string.isRequired,
};

PriceInput.defaultProps = {
	disabled: false,
};

export default PriceInput;
