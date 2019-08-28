/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import OrderSelect from '../order-select';

const ProductOrderSelect = ( { defaultValue, onChange, readOnly, value } ) => {
	return (
		<OrderSelect
			className="wc-block-product-order-select"
			defaultValue={ defaultValue }
			onChange={ onChange }
			options={ [
				{ key: 'highest-rating', label: __( 'Highest rating', 'woo-gutenberg-products-block' ) },
				{ key: 'alphabetical', label: __( 'Alphabetical', 'woo-gutenberg-products-block' ) },
				{ key: 'highest-price', label: __( 'Highest price', 'woo-gutenberg-products-block' ) },
				{ key: 'lowest-price', label: __( 'Lowest price', 'woo-gutenberg-products-block' ) },
			] }
			readOnly={ readOnly }
			screenReaderLabel={ __( 'Order products by', 'woo-gutenberg-products-block' ) }
			value={ value }
		/>
	);
};

ProductOrderSelect.propTypes = {
	defaultValue: PropTypes.oneOf( [ 'highest-rating', 'alphabetical', 'highest-price', 'lowest-price' ] ),
	onChange: PropTypes.func,
	readOnly: PropTypes.bool,
	value: PropTypes.oneOf( [ 'highest-rating', 'alphabetical', 'highest-price', 'lowest-price' ] ),
};

export default ProductOrderSelect;
