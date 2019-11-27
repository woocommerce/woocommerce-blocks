/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { useRef } from '@wordpress/element';
import classNames from 'classnames';
import Downshift from 'downshift';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * State reducer for the downshift component.
 * See: https://github.com/downshift-js/downshift#statereducer
 */
const stateReducer = ( state, changes ) => {
	switch ( changes.type ) {
		case Downshift.stateChangeTypes.keyDownEnter:
		case Downshift.stateChangeTypes.clickItem:
			return {
				...changes,
				highlightedIndex: state.highlightedIndex,
				isOpen: true,
				inputValue: '',
			};
		case Downshift.stateChangeTypes.mouseUp:
			return {
				...changes,
				inputValue: state.inputValue,
			};
		default:
			return changes;
	}
};

/**
 * Component used to show a list of checkboxes in a group.
 */
const CheckboxList = ( {
	attributeLabel = '',
	className,
	checked = [],
	inputLabel = '',
	isDisabled = false,
	isLoading = false,
	onChange = () => {},
	options = [],
} ) => {
	const inputRef = useRef( null );

	const classes = classNames( className, 'wc-block-dropdown-selector', {
		'is-disabled': isDisabled,
		'is-loading': isLoading,
	} );

	return (
		<div className={ classes }>
			<Downshift
				stateReducer={ stateReducer }
				onChange={ onChange }
				selectedItem={ null }
			>
				{ ( {
					getInputProps,
					getItemProps,
					getMenuProps,
					highlightedIndex,
					inputValue,
					isOpen,
					toggleMenu,
				} ) => (
					<div>
						{ /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */ }
						<div
							className="wc-block-dropdown-selector__fake-input"
							onClick={
								isOpen
									? null
									: () => {
											inputRef.current.focus();
									  }
							}
						>
							{ checked.length > 0 &&
								checked.map( ( value ) => {
									const { label, name } = options.find(
										( option ) => option.value === value
									);
									return (
										<button
											key={ value }
											onClick={ ( e ) => {
												e.stopPropagation();
												onChange( value );
											} }
											className="wc-block-dropdown-selector__selected-chip"
											aria-label={ sprintf(
												__(
													'Remove %s filter',
													'woo-gutenberg-products-block'
												),
												name
											) }
										>
											{ label }
											<span className="wc-block-dropdown-selector__selected-chip__remove">
												𝘅
											</span>
										</button>
									);
								} ) }
							<input
								{ ...getInputProps( {
									ref: inputRef,
									className:
										'wc-block-dropdown-selector__input',
									disabled: isDisabled,
									'aria-label': inputLabel,
									onKeyDown( event ) {
										if (
											event.key === 'Backspace' &&
											! inputValue &&
											checked.length > 0
										) {
											onChange(
												checked[ checked.length - 1 ]
											);
										}
									},
									onFocus: isOpen ? null : () => toggleMenu(),
									placeholder:
										checked.length === 0
											? sprintf(
													// Translators: %s attribute name.
													__(
														'Any %s',
														'woo-gutenberg-products-block'
													),
													attributeLabel
											  )
											: null,
								} ) }
							/>
						</div>
						<ul
							{ ...getMenuProps( {
								className: 'wc-block-dropdown-selector__list',
							} ) }
						>
							{ isOpen && ! isDisabled
								? options
										.filter(
											( option ) =>
												! inputValue ||
												option.value.startsWith(
													inputValue
												)
										)
										.map( ( option, index ) => {
											const selected = checked.includes(
												option.value
											);
											return (
												// eslint-disable-next-line react/jsx-key
												<li
													{ ...getItemProps( {
														key: option.value,
														className: classNames(
															'wc-block-dropdown-selector__list-item',
															{
																'is-selected': selected,
																'is-focused':
																	highlightedIndex ===
																	index,
															}
														),
														index,
														item: option.value,
														'aria-label': selected
															? sprintf(
																	__(
																		'Remove %s filter',
																		'woo-gutenberg-products-block'
																	),
																	option.name
															  )
															: null,
													} ) }
												>
													{ option.label }
												</li>
											);
										} )
								: null }
						</ul>
					</div>
				) }
			</Downshift>
		</div>
	);
};

CheckboxList.propTypes = {
	attributeLabel: PropTypes.string,
	checked: PropTypes.array,
	className: PropTypes.string,
	inputLabel: PropTypes.string,
	isLoading: PropTypes.bool,
	isDisabled: PropTypes.bool,
	limit: PropTypes.number,
	onChange: PropTypes.func,
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			value: PropTypes.string.isRequired,
			label: PropTypes.node.isRequired,
		} )
	),
};

export default CheckboxList;
