/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

const DropdownSelectorInput = ( {
	attributeLabel,
	checked,
	getInputProps,
	label,
	inputRef,
	value,
	isDisabled,
	onFocus,
	onRemoveItem,
} ) => {
	return (
		<input
			{ ...getInputProps( {
				ref: inputRef,
				className: 'wc-block-dropdown-selector__input',
				disabled: isDisabled,
				'aria-label': label,
				onKeyDown( event ) {
					if (
						event.key === 'Backspace' &&
						! value &&
						checked.length > 0
					) {
						onRemoveItem( checked[ checked.length - 1 ] );
					}
				},
				onFocus,
				placeholder:
					checked.length === 0
						? sprintf(
								// Translators: %s attribute name.
								__( 'Any %s', 'woo-gutenberg-products-block' ),
								attributeLabel
						  )
						: null,
			} ) }
		/>
	);
};

export default DropdownSelectorInput;
