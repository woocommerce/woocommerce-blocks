/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import PropTypes from 'prop-types';
import { ToggleControl } from '@wordpress/components';

/**
 * A combination of range controls for product grid layout settings.
 */
const GridContentControl = ( { onChange, settings } ) => {
	const { button, price, title } = settings;
	return (
		<Fragment>
			<ToggleControl
				label={ __( 'Product title', 'woo-gutenberg-products-block' ) }
				help={ title ? 'Product title is hidden.' : 'Product title is visible.' }
				checked={ title }
				onChange={ () => onChange( { ...settings, title: ! title } ) }
			/>
			<ToggleControl
				label={ __( 'Product price', 'woo-gutenberg-products-block' ) }
				help={ price ? 'Product price is hidden.' : 'Product price is visible.' }
				checked={ price }
				onChange={ () => onChange( { ...settings, price: ! price } ) }
			/>
			<ToggleControl
				label={ __( 'Add to Cart button', 'woo-gutenberg-products-block' ) }
				help={ button ? 'Add to Cart button is hidden.' : 'Add to Cart button is visible.' }
				checked={ button }
				onChange={ () => onChange( { ...settings, button: ! button } ) }
			/>
		</Fragment>
	);
};

GridContentControl.propTypes = {
	/**
	 * The current title visibility.
	 */
	settings: PropTypes.shape( {
		button: PropTypes.bool.isRequired,
		price: PropTypes.bool.isRequired,
		title: PropTypes.bool.isRequired,
	} ).isRequired,
	/**
	 * Callback to update the layout settings.
	 */
	onChange: PropTypes.func.isRequired,
};

export default GridContentControl;
