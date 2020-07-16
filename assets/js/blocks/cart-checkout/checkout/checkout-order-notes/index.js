/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import CheckboxControl from '@woocommerce/base-components/checkbox-control';
import Textarea from '@woocommerce/base-components/textarea';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.scss';

const CheckoutOrderNotes = ( { disabled, onChange, placeholder, value } ) => {
	const [ withOrderNotes, setWithOrderNotes ] = useState( false );

	return (
		<div className="wc-block-checkout__add-note">
			<CheckboxControl
				disabled={ disabled }
				label="Add a note to your order"
				checked={ withOrderNotes }
				onChange={ ( isChecked ) => {
					setWithOrderNotes( isChecked );
					onChange( '' );
				} }
			/>
			{ withOrderNotes && (
				<Textarea
					disabled={ disabled }
					onChange={ onChange }
					placeholder={ placeholder }
					value={ value }
				/>
			) }
		</div>
	);
};

Textarea.propTypes = {
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.string,
};

export default CheckoutOrderNotes;
