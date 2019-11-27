/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useRef } from '@wordpress/element';
import classNames from 'classnames';
import Downshift from 'downshift';

/**
 * Internal dependencies
 */
import DropdownSelectorInput from './input';
import DropdownSelectorInputWrapper from './input-wrapper';
import DropdownSelectorMenu from './menu';
import DropdownSelectorSelectedChip from './selected-chip';
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
 * Component used to show an input box with a dropdown with suggestions.
 */
const DropdownSelector = ( {
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
		<Downshift
			onChange={ onChange }
			selectedItem={ null }
			stateReducer={ stateReducer }
		>
			{ ( {
				getInputProps,
				getItemProps,
				getMenuProps,
				highlightedIndex,
				inputValue,
				isOpen,
				openMenu,
			} ) => (
				<div className={ classes }>
					<DropdownSelectorInputWrapper
						onClick={
							isOpen
								? null
								: () => {
										inputRef.current.focus();
								  }
						}
						isOpen={ isOpen }
						inputRef={ inputRef }
					>
						{ checked.map( ( value ) => {
							const { label, name } = options.find(
								( option ) => option.value === value
							);
							return (
								<DropdownSelectorSelectedChip
									key={ value }
									label={ label }
									name={ name }
									onClick={ onChange }
									value={ value }
								/>
							);
						} ) }
						<DropdownSelectorInput
							attributeLabel={ attributeLabel }
							checked={ checked }
							getInputProps={ getInputProps }
							inputRef={ inputRef }
							isDisabled={ isDisabled }
							label={ inputLabel }
							onRemoveItem={ onChange }
							onFocus={ openMenu }
							value={ inputValue }
						/>
					</DropdownSelectorInputWrapper>
					<DropdownSelectorMenu
						checked={ checked }
						getItemProps={ getItemProps }
						getMenuProps={ getMenuProps }
						highlightedIndex={ highlightedIndex }
						options={
							isOpen && ! isDisabled
								? options.filter(
										( option ) =>
											! inputValue ||
											option.value.startsWith(
												inputValue
											)
								  )
								: []
						}
					/>
				</div>
			) }
		</Downshift>
	);
};

DropdownSelector.propTypes = {
	attributeLabel: PropTypes.string,
	checked: PropTypes.array,
	className: PropTypes.string,
	inputLabel: PropTypes.string,
	isDisabled: PropTypes.bool,
	isLoading: PropTypes.bool,
	limit: PropTypes.number,
	onChange: PropTypes.func,
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			label: PropTypes.node.isRequired,
			value: PropTypes.string.isRequired,
		} )
	),
};

export default DropdownSelector;
