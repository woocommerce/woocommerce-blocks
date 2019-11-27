/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

const DropdownSelectorSelectedChip = ( { label, name, onClick, value } ) => {
	return (
		<button
			className="wc-block-dropdown-selector__selected-chip"
			onClick={ ( e ) => {
				e.stopPropagation();
				onClick( value );
			} }
			aria-label={ sprintf(
				__( 'Remove %s filter', 'woo-gutenberg-products-block' ),
				name
			) }
		>
			{ label }
			<span className="wc-block-dropdown-selector__selected-chip__remove">
				𝘅
			</span>
		</button>
	);
};

export default DropdownSelectorSelectedChip;
