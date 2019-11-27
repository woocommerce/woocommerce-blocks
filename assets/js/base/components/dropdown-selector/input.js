/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

const DropdownSelectorInput = ( {
	attributeLabel,
	checked,
	getInputProps,
	inputRef,
	isDisabled,
	label,
	onFocus,
	onRemoveItem,
	value,
} ) => {
	return (
		<input
			{ ...getInputProps( {
				ref: inputRef,
				className: 'wc-block-dropdown-selector__input',
				disabled: isDisabled,
				onFocus,
				onKeyDown( event ) {
					if (
						event.key === 'Backspace' &&
						! value &&
						checked.length > 0
					) {
						onRemoveItem( checked[ checked.length - 1 ] );
					}
				},
				placeholder:
					checked.length === 0
						? sprintf(
								// Translators: %s attribute name.
								__( 'Any %s', 'woo-gutenberg-products-block' ),
								attributeLabel
						  )
						: null,
				'aria-label': label,
			} ) }
		/>
	);
};

export default DropdownSelectorInput;
